import * as React from "react"
import { Box, ExternalLink } from "../primitives"
import { asideStyle, headingStyle, navStyle, wrapperStyle } from "./toc.css"
import type { Colors } from "../../styles/tokens/colors"
import { useActiveHash } from "../../hooks/use-active-hash"

export type TocItem = {
  url: string
  title: string
  items?: Array<TocItem>
}

function getIds(items: Array<TocItem>) {
  return items.reduce<Array<string>>((acc, item) => {
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
  activeColor = `primary`,
}: {
  items: Array<TocItem>
  activeId: string
  level?: number
  activeColor?: Colors
}): JSX.Element => (
  <>
    {items.map((item) => {
      const itemId = item.url.slice(1)
      const isActive = activeId === itemId

      return (
        <React.Fragment key={item.url}>
          <ExternalLink
            fontWeight={isActive ? `medium` : `normal`}
            color={isActive ? activeColor : `inherit`}
            marginTop={level ? `1` : { mobile: `2`, "2xl": `3` }}
            marginLeft={level ? `${level * 2}` : `0`}
            paddingRight="1"
            href={item.url}
          >
            {item.title}
          </ExternalLink>
          {item.items && renderItems({ items: item.items, activeId, activeColor, level: level + 1 })}
        </React.Fragment>
      )
    })}
  </>
)

export const Toc = ({ items }: { items: Array<TocItem> }) => {
  const ids = getIds(items)
  const activeItemHash = useActiveHash(ids)

  return (
    <Box as="aside" marginBottom={{ mobile: `16`, "2xl": `0` }} fontSize={[`sm`, `md`]} className={asideStyle}>
      <Box as="nav" display="flex" flexDirection="column" alignItems="flex-start" className={navStyle}>
        <Box
          as="h2"
          color="heading"
          fontWeight="medium"
          marginBottom={{ mobile: `2`, "2xl": `4` }}
          className={headingStyle}
        >
          Table of Contents
        </Box>
        {renderItems({ items, activeId: activeItemHash, activeColor: `primary` })}
      </Box>
    </Box>
  )
}

export const WithSidebarWrapper: React.FC<React.PropsWithChildren<{ items: Array<TocItem> }>> = ({
  children,
  items,
}) => (
  <Box flexDirection="row-reverse" justifyContent="flex-end" gap="20" className={wrapperStyle}>
    <Toc items={items} />
    {children}
  </Box>
)
