import * as React from 'react'

import { BaseTheme } from 'grommet/themes'

import { AlignSelfValue, AllProps, ColorValue, EdgeSizeValue } from '../shared'
import { TextSize } from './Text'

export interface AnchorProps<T = BaseTheme> {
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
  color?: ColorValue<T>
  href?: string
  icon?: JSX.Element
  label?: React.ReactNode
  onClick?: (...args: any[]) => any
  reverse?: boolean
  size?: TextSize<T>
  as?: string
}

export type AnchorI<T = BaseTheme> = React.ComponentType<
  AllProps<AnchorProps, T, 'a'>
>

export const Anchor: AnchorI
