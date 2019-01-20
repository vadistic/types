import * as React from 'react'

import { AlignSelfValue, ColorValue, EdgeSizeValue, Theme } from '../shared'
import { TextSize } from './Text'

export interface AnchorProps<T = Theme> {
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

export type AnchorI<T = Theme> = React.ComponentType<
  CssAndIntristicProps<AnchorProps, T, 'a'>
>

export const Anchor: AnchorI
