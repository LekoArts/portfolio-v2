import * as React from "react"
import { Badges, badgeVariants } from "./badge.css"
import { Box } from "./box"

interface IBadgeProps {
  variant: Badges
}

export const Badge: React.FC<React.PropsWithChildren<IBadgeProps>> = ({ children, variant }) => (
  <Box
    as="span"
    display="inline-block"
    fontWeight="medium"
    fontSize={[`xs`, null, null, `sm`]}
    className={badgeVariants[variant]}
  >
    {children}
  </Box>
)
