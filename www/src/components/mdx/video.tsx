import * as React from "react"
import { Box } from "@chakra-ui/react"
import { site } from "../../constants/meta"
import { SVGIcon } from "../primitives/svg-icon"

type VideoProps = {
  src: string
  ariaLabel: string
  description?: string
  maxWidth?: string
}

const FigureWrapper: React.FC<React.PropsWithChildren<{ description: VideoProps["description"] }>> = ({
  description,
  children,
}) => {
  if (description) {
    return (
      <figure>
        {children}
        <figcaption>{description}</figcaption>
      </figure>
    )
  }
  return <>{children}</>
}

export const Video = ({ src, ariaLabel, description, maxWidth = `100%` }: VideoProps) => {
  const videoRef = React.useRef(null)
  const [play, setPlay] = React.useState(true)
  const iconSize = `26px`

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
          background="rgba(0, 0, 0, 0.6)"
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
          {play ? (
            <SVGIcon id="pause" width={iconSize} height={iconSize} style={{ strokeWidth: `2px` }} />
          ) : (
            <SVGIcon id="play" width={iconSize} height={iconSize} style={{ marginLeft: `5px`, strokeWidth: `2px` }} />
          )}
        </Box>
      </Box>
    </FigureWrapper>
  )
}
