import * as React from "react"
import { Box } from "@chakra-ui/react"
import { site } from "../../constants/meta"

type VideoProps = {
  src: string
  ariaLabel: string
  description?: string
  maxWidth?: string
}

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
)

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ left: `10px` }}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const FigureWrapper: React.FC<{ description: VideoProps["description"] }> = ({ description, children }) => {
  if (description) {
    return (
      <figure>
        {children}
        <figcaption>{description}</figcaption>
      </figure>
    )
  }
  return <React.Fragment>{children}</React.Fragment>
}

export const Video = ({ src, ariaLabel, description, maxWidth = `100%` }: VideoProps) => {
  const videoRef = React.useRef(null)
  const [play, setPlay] = React.useState(true)

  const playVideo = () => {
    videoRef.current.play()
  }
  const pauseVideo = () => {
    videoRef.current.pause()
  }

  return (
    <FigureWrapper description={description}>
      <Box
        position="relative"
        boxSizing="content-box"
        maxWidth={maxWidth}
        mx="auto"
        role="group"
        onClick={() => {
          if (play) {
            pauseVideo()
            setPlay(!play)
          } else {
            playVideo()
            setPlay(!play)
          }
        }}
      >
        <Box
          as="video"
          position="relative"
          display="block"
          maxW="100%"
          margin="auto"
          cursor="pointer"
          autoPlay
          playsInline
          loop
          muted
          preload="none"
          ref={videoRef}
          aria-label={ariaLabel}
          marginBottom={description ? `0 !important` : undefined}
        >
          <source src={src} type="video/mp4" />
          <p>
            Your browser doesn't support HTML5 video. Here is a <a href={`${site.url}${src}`}>link to the video</a>
            {` `}
            instead.
          </p>
        </Box>
        <Box
          position="absolute"
          inset="0px"
          margin="auto"
          width="64px"
          height="64px"
          background="rgba(0, 0, 0, 0.5)"
          borderRadius="50%"
          color="white"
          display="flex"
          justifyContent="center"
          alignItems="center"
          transition="opacity 500ms ease 0s"
          pointerEvents="none"
          opacity="0"
          _groupHover={{
            opacity: 1,
          }}
        >
          {play ? <PauseIcon /> : <PlayIcon />}
        </Box>
      </Box>
    </FigureWrapper>
  )
}
