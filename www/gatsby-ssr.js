const PLAUSIBLE_DOMAIN = `plausible.io`
const SCRIPT_URI = `/js/plausible.js`

export const onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === `production`) {
    const scriptProps = {
      async: true,
      defer: true,
      "data-domain": `lekoarts-portfolio-v2.gatsbyjs.io`,
      src: `https://${PLAUSIBLE_DOMAIN}${SCRIPT_URI}`,
    }

    return setHeadComponents([
      <link key="gatsby-plugin-plausible-preconnect" rel="preconnect" href={`https://${PLAUSIBLE_DOMAIN}`} />,
      <script key="gatsby-plugin-plausible-script" {...scriptProps} />,
      // See: https://plausible.io/docs/custom-event-goals#1-trigger-custom-events-with-javascript-on-your-site
      <script
        key="gatsby-plugin-plausible-custom-events"
        dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
          `,
        }}
      />,
    ])
  }
  return null
}
