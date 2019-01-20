// TypeScript Version: 3.0
import * as React from 'react'

import {
  CssAndIntristicProps,
  Theme,
  EdgeSizeValue,
  AlignSelfValue,
} from '../shared'

export interface ButtonProps<T = Theme> {
  a11yTitle?: string
  alignSelf?: AlignSelfValue
  gridArea?: string
  margin?:
    | EdgeSizeValue<T>
    | {
        bottom?: EdgeSizeValue<T>
        horizontal?: EdgeSizeValue<T>
        left?: EdgeSizeValue<T>
        right?: EdgeSizeValue<T>
        top?: EdgeSizeValue<T>
        vertical?: EdgeSizeValue<T>
      }
  active?: boolean
  color?: string | { dark?: string; light?: string }
  disabled?: boolean
  fill?: boolean
  focusIndicator?: boolean
  hoverIndicator?:
    | boolean
    | string
    | 'background'
    | { background?: boolean | string }
  href?: string
  icon?: JSX.Element
  label?: React.ReactNode
  onClick?: ((...args: any[]) => any)
  plain?: boolean
  primary?: boolean
  reverse?: boolean
  type?: 'button' | 'reset' | 'submit'
  as?: string
}

export type ButtonI<T = Theme> = React.ComponentType<
  CssAndIntristicProps<ButtonProps, T, 'button'>
>
export const Button: ButtonI
