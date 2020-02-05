const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions: { createPage } }) => graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`).then(result =>
  result.data.allMarkdownRemark.edges.forEach(({ node }) => createPage({
    path: node.fields.slug,
    component: path.resolve(`./src/templates/blog-post.js`),
    context: {
      slug: node.fields.slug
    }
  })),
)