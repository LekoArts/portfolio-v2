import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Flex, HStack } from "@chakra-ui/react"
import Link from "../link"

type CategoryQueryResult = {
  allCategory: {
    nodes: {
      name: string
      slug: string
    }[]
  }
}

const WritingSubNavigation: React.FC = () => {
  const data = useStaticQuery<CategoryQueryResult>(graphql`
    {
      allCategory(sort: { fields: name, order: ASC }) {
        nodes {
          name
          slug
        }
      }
    }
  `)

  return (
    <Flex alignItems="center" justifyContent="space-between" mt="2">
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
        {data.allCategory.nodes.map((item) => (
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
      <div>Search</div>
    </Flex>
  )
}

export default WritingSubNavigation
