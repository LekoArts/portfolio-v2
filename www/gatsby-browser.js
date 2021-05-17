export const onRouteUpdate = () => {
  if (process.env.NODE_ENV === `production` && typeof window.plausible === `object`) {
    window.plausible(`pageview`)
  }
}
