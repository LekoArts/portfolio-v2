import * as React from "react"
import { Box, SVGIcon } from "../primitives"
import { site } from "../../constants/meta"
import { groupStyle, marginBottomVariants, playPauseButtonStyle, videoStyle } from "./video.css"
import { composeClassNames } from "../../utils/box"

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
  const iconSize = `30px`
  const mbVariant = description ? `withDescription` : `default`

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
        mx="auto"
        role="group"
        style={{ maxWidth }}
        className={groupStyle}
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
          mx="auto"
          autoPlay
          playsInline
          loop
          muted
          preload="none"
          ref={videoRef}
          aria-label={ariaLabel}
          className={composeClassNames(videoStyle, marginBottomVariants[mbVariant])}
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
          mx="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={playPauseButtonStyle}
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
