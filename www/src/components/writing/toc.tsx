import * as React from "react"
import { Box, Link } from "@chakra-ui/react"
import { useActiveHash } from "../../hooks/use-active-hash"

export type TocItem = {
  url: string
  title: string
  items?: TocItem[]
}

function getIds(items: TocItem[]): string[] {
  return items.reduce((acc, item) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push(item.url.slice(1))
    }
    if (item.items) {
      acc.push(...getIds(item.items))
    }
    return acc
  }, [])
}

const renderItems = ({
  items,
  activeId,
  level = 0,
  activeColor = `red`,
}: {
  items: TocItem[]
  activeId: string
  level?: number
  activeColor?: string
}): JSX.Element => (
  <>
    {items.map((item) => {
      const itemId = item.url.slice(1)
      const isActive = activeId === itemId

      return (
        <React.Fragment key={item.url}>
          <Link
            fontWeight={isActive ? 500 : 400}
            transition="fontWeight .3s ease-in-out"
            color={isActive ? activeColor : `inherit`}
            mt={level ? 1 : { base: `2`, "2xl": `3` }}
            ml={level ? level * 2 : 0}
            pr={1}
            href={item.url}
          >
            {item.title}
          </Link>
          {item.items && renderItems({ items: item.items, activeId, activeColor, level: level + 1 })}
        </React.Fragment>
      )
    })}
  </>
)

export const Toc = ({ items }: { items: TocItem[] }) => {
  const ids = getIds(items)
  const activeItemHash = useActiveHash(ids)

  return (
    <Box
      as="aside"
      position={{ base: `relative`, "2xl": `sticky` }}
      maxHeight={{ base: `unset`, "2xl": `300px` }}
      top={{ base: `unset`, "2xl": `80px` }}
      mb={{ base: `16`, "2xl": 0 }}
      fontSize={[`0.875rem`, `1rem`]}
    >
      <Box
        as="nav"
        display="flex"
        flexDir="column"
        mt={{ base: `0rem`, "2xl": `1.8em` }}
        minWidth="185px"
        maxWidth={{ base: `100%`, "2xl": `220px` }}
        overflow="auto"
        alignItems="flex-start"
      >
        <Box
          as="h2"
          color="heading"
          textTransform="uppercase"
          fontSize={[`14px`, null, null, `1rem`, null, `14px`]}
          fontWeight="medium"
          letterSpacing="0.075em"
          mb={{ base: `2`, "2xl": `4` }}
        >
          Table of Contents
        </Box>
        {renderItems({ items, activeId: activeItemHash, activeColor: `primary` })}
      </Box>
    </Box>
  )
}

export const WithSidebarWrapper: React.FC<React.PropsWithChildren<{ items: TocItem[] }>> = ({ children, items }) => (
  <Box
    display={{ base: `block`, "2xl": `flex` }}
    flexDirection="row-reverse"
    justifyContent="flex-end"
    sx={{ gap: `5rem` }}
  >
    <Toc items={items} />
    {children}
  </Box>
)
