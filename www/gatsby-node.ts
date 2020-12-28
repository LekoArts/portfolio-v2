import { GatsbyNode } from "gatsby"

export const onCreateBabelConfig: GatsbyNode["onCreateBabelConfig"] = ({ actions }) => {
  actions.setBabelPlugin({
    name: `babel-plugin-react-icons`,
    options: {},
  })
}
