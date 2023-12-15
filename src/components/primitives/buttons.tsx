import * as React from "react"
import { Link } from "gatsby"
import { useButton, useToggleButton, AriaToggleButtonProps, AriaButtonProps } from "@react-aria/button"
import { useToggleState } from "@react-stately/toggle"
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
import { SVGIcon } from "./svg-icon"
import { VisuallyHidden } from "../a11y/visually-hidden"

type ButtonKind = "button" | "internal" | "external"

interface IButtonProps extends IBoxProps {
  kind?: ButtonKind
  to?: string
  variant?: VariantNames
  size?: Sizes
  rightIcon?: React.ReactNode
}

interface IToggleButtonProps extends AriaToggleButtonProps {
  className?: string
}

interface IUnstyledButtonProps extends AriaButtonProps<"button"> {
  className?: string
  style?: React.CSSProperties
}

interface IIconButtonProps extends AriaButtonProps<"button"> {
  className?: string
  title: string
  description: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export const ToggleButton: React.FC<React.PropsWithChildren<IToggleButtonProps>> = (props) => {
  const ref = React.useRef<HTMLButtonElement>(null!)
  const state = useToggleState(props)
  const { buttonProps } = useToggleButton(props, state, ref)
  const { children, className } = props

  return (
    <button {...buttonProps} className={className} ref={ref}>
      {children}
    </button>
  )
}

export const UnstyledButton = (props: IUnstyledButtonProps) => {
  const ref = React.useRef<HTMLButtonElement>(null!)
  const { buttonProps } = useButton(props, ref)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, className, onPress, ...rest } = props

  return (
    <button {...buttonProps} className={className} ref={ref} {...rest}>
      {children}
    </button>
  )
}

export const IconButton = (props: IIconButtonProps) => {
  const { className, description, children, ...rest } = props

  return (
    <UnstyledButton className={className} {...rest}>
      {children}
      <VisuallyHidden>{description}</VisuallyHidden>
    </UnstyledButton>
  )
}

const ButtonIcon = (props) => {
  const { children, ...rest } = props

  return (
    <span aria-hidden className={iconButtonStyle} {...rest}>
      {children}
    </span>
  )
}

export const Button: React.FC<React.PropsWithChildren<IButtonProps>> = (props) => {
  const ref = React.useRef()
  // @ts-ignore
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
  ...rest
}) => (
  <Button
    kind={kind}
    to={to}
    variant="primary"
    rightIcon={<SVGIcon id="arrow-right" />}
    className={arrowAnimationStyle}
    {...rest}
  >
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
  ...rest
}) => (
  <Button
    kind={kind}
    to={to}
    variant="link"
    rightIcon={<SVGIcon id="arrow-right" />}
    className={composeClassNames(arrowAnimationStyle, subtleButtonStyle)}
    {...rest}
  >
    {children}
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
        text: `${message} by Lennart Jörgens`,
        url: link,
      })
      // eslint-disable-next-line no-console
      .then(() => console.log(`Successful share of ${link}`))
      // eslint-disable-next-line no-console
      .catch((error) => console.log(`Error sharing ${link}`, error))
  }

  return (
    <Button
      kind="button"
      onClick={handleSocialShare}
      size="md"
      variant={variant}
      rightIcon={<SVGIcon id="share" height="1em" width="1em" />}
    >
      Share Anywhere
    </Button>
  )
}
