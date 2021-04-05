import * as React from "react"
import { Flex, HStack, useColorModeValue } from "@chakra-ui/react"
import { useCategories } from "../../hooks/use-categories"
import { Link } from "../link"

export const WritingSubNavigation: React.FC = () => {
  const categories = useCategories()
  const scrollbarBG = useColorModeValue(`blueGray.200`, `blueGray.700`)
  const thumbBG = useColorModeValue(`blueGray.400`, `blueGray.400`)

  return (
    <Flex
      alignItems="center"
      py="2"
      data-name="subnavigation"
      sx={{
        overflowX: `auto`,
        overflowY: `hidden`,
        scrollbarWidth: `thin`,
        scrollbarColor: `${thumbBG} ${scrollbarBG}`,
        "::-webkit-scrollbar": {
          height: `12px`,
        },
        "::-webkit-scrollbar-track": {
          background: scrollbarBG,
          borderRadius: `6px`,
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: thumbBG,
          borderRadius: `8px`,
          borderWidth: `3px`,
          borderStyle: `solid`,
          borderColor: scrollbarBG,
        },
      }}
    >
      <HStack as="ul" listStyleType="none" spacing="2" ml="-2">
        <li>
          <Link
            to="/writing"
            fontSize="md"
            p="2"
            activeClassName="active"
            sx={{ "&.active": { fontWeight: `semibold` } }}
          >
            Latest
          </Link>
        </li>
        <li>
          <Link
            to="/tutorials"
            fontSize="md"
            p="2"
            activeClassName="active"
            sx={{ "&.active": { fontWeight: `semibold` } }}
          >
            Tutorials
          </Link>
        </li>
        {categories.map((item) => (
          <li key={item.slug}>
            <Link
              to={item.slug}
              fontSize="md"
              p="2"
              activeClassName="active"
              sx={{ "&.active": { fontWeight: `semibold` } }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </HStack>
    </Flex>
  )
}
