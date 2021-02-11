import * as React from "react"
import { Flex, HStack } from "@chakra-ui/react"
import useCategories from "../../hooks/use-categories"
import Link from "../link"

const WritingSubNavigation: React.FC = () => {
  const categories = useCategories()

  return (
    <Flex alignItems="center" mt="2" data-name="subnavigation">
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

export default WritingSubNavigation
