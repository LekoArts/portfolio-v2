import * as React from "react"
import { Link } from "gatsby"
import { useButton, useToggleButton } from "@react-aria/button"
import { useToggleState } from "@react-stately/toggle"
import { BsArrowRight } from "react-icons/bs"
import { FaTwitter } from "react-icons/fa"
import { FiShare } from "react-icons/fi"
import {
  arrowAnimationStyle,
  iconButtonStyle,
  buttonVariants,
  Sizes,
  sizesVariants,
  subtleButtonStyle,
  VariantNames,
} from "./button.css"
import { Box, IBoxProps } from "./box"
import { composeClassNames } from "../../utils/box"

type ButtonKind = "button" | "internal" | "external"

interface IButtonProps extends IBoxProps {
  kind?: ButtonKind
  to?: string
  variant?: VariantNames
  size?: Sizes
  rightIcon?: React.ReactNode
}

export const ButtonIcon = (props) => {
  const { children, ...rest } = props

  return (
    <span aria-hidden focusable="false" className={iconButtonStyle} {...rest}>
      {children}
    </span>
  )
}

export const ToggleButton = (props) => {
  const ref = React.useRef()
  const state = useToggleState(props)
  const { buttonProps } = useToggleButton(props, state, ref)
  const { children, className } = props

  return (
    // @ts-ignore
    <button {...buttonProps} className={className} ref={ref}>
      {children}
    </button>
  )
}

export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = (props) => {
  const ref = React.useRef()
  const { buttonProps } = useButton(props, ref)
  const {
    children,
    kind = `button`,
    to,
    variant = `primary`,
    size = `brand`,
    rightIcon = undefined,
    className,
    ...rest
  } = props
  let as
  switch (kind) {
    case `button`:
      as = `button`
      break
    case `internal`:
      as = Link
      break
    case `external`:
      as = `a`
      break
    default:
      as = `button`
      break
  }

  return (
    <Box
      as={as}
      // @ts-ignore
      to={kind === `internal` ? to : undefined}
      href={kind === `external` ? to : undefined}
      className={composeClassNames(buttonVariants[variant], sizesVariants[size], className)}
      {...buttonProps}
      {...rest}
    >
      {children} {rightIcon && <ButtonIcon>{rightIcon}</ButtonIcon>}
    </Box>
  )
}

/**
 * Primary buttons for important CTA
 */
export const PrimaryButton: React.FC<React.PropsWithChildren<{ to: string; kind?: ButtonKind }>> = ({
  children,
  to,
  kind = `internal`,
}) => (
  <Button kind={kind} to={to} variant="primary" rightIcon={<BsArrowRight />} className={arrowAnimationStyle}>
    {children}
  </Button>
)

/**
 * Secondary button
 */
export const SubtleButton: React.FC<React.PropsWithChildren<{ to: string; kind?: ButtonKind }>> = ({
  children,
  to,
  kind = `internal`,
}) => (
  <Button
    kind={kind}
    to={to}
    variant="link"
    rightIcon={<BsArrowRight />}
    className={composeClassNames(arrowAnimationStyle, subtleButtonStyle)}
  >
    {children}
  </Button>
)

const getTwitterShareLink = (link, message) =>
  `https://twitter.com/intent/tweet/?text=${encodeURIComponent(message)}&via=lekoarts_de&url=${encodeURIComponent(
    link
  )}`

export const TwitterButton = ({
  link,
  message,
  variant = `primary`,
}: {
  link: string
  message: string
  variant?: VariantNames
}) => (
  <Button
    kind="external"
    to={getTwitterShareLink(link, message)}
    target="_blank"
    rel="noreferrer noopener"
    size="md"
    variant={variant}
    rightIcon={<FaTwitter />}
  >
    Share on Twitter
  </Button>
)

export const ShareAnywhereButton = ({
  link,
  message,
  variant = `primary`,
}: {
  link: string
  message: string
  variant?: VariantNames
}) => {
  const handleSocialShare = (event) => {
    event.preventDefault()

    navigator
      .share({
        title: message,
        text: `${message} by Lennart Jörgens (@lekoarts_de)`,
        url: link,
      })
      // eslint-disable-next-line no-console
      .then(() => console.log(`Successful share of ${link}`))
      // eslint-disable-next-line no-console
      .catch((error) => console.log(`Error sharing ${link}`, error))
  }

  return (
    <Button kind="button" onClick={handleSocialShare} size="md" variant={variant} rightIcon={<FiShare />}>
      Share Anywhere
    </Button>
  )
}
