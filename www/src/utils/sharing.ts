const GITHUB_REPO_BASE = `https://github.com/LekoArts/portfolio-v2/edit/main`

export const getGardenEditLink = (relativePath: string) => `${GITHUB_REPO_BASE}/www/content/garden/${relativePath}`

export const getWritingEditLink = (relativePath: string) => `${GITHUB_REPO_BASE}/www/content/writing/${relativePath}`

export const getTwitterShareLink = (link: string, message: string) =>
  `https://twitter.com/intent/tweet/?text=${encodeURIComponent(message)}&via=lekoarts_de&url=${encodeURIComponent(
    link
  )}`

export const getMastodonShareLink = (link: string, message: string) =>
  `https://elk.zone/intent/post?text=${encodeURIComponent(`${message} by @lekoarts@mastodon.social \n\n${link}`)}`
