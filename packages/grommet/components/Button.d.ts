// TypeScript Version: 3.0
import * as React from 'react'

import { BaseTheme } from 'grommet/themes'
import { AlignSelfValue, AllProps, ColorValue, EdgeSizeValue } from '../shared'

export interface ButtonProps<T = BaseTheme> {
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
  color?: ColorValue<T>
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
  onClick?: (...args: any[]) => any
  plain?: boolean
  primary?: boolean
  reverse?: boolean
  type?: 'button' | 'reset' | 'submit'
  as?: string
}

export type ButtonI<T = BaseTheme> = React.ComponentType<
  AllProps<ButtonProps, T, 'button'>
>
export const Button: ButtonI
