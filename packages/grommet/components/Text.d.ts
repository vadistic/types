import * as React from 'react'

import {
  AlignSelfValue,
  ColorValue,
  CssAndIntristicProps,
  EdgeSizeValue,
  Theme,
} from '../shared'

export type TextSize<T = Theme> = keyof T['text']

export interface TextProps<T = Theme> {
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
  size?: TextSize
  tag?: string
  as?: string
  textAlign?: 'start' | 'center' | 'end'
  truncate?: boolean
  weight?: 'normal' | 'bold' | number
}

export type TextI<T = Theme> = React.ComponentType<
  CssAndIntristicProps<TextProps, T, 'span'>
>

export const Text: TextI
