import * as React from 'react'

import { BaseTheme } from 'grommet/themes'
import {
  AlignSelfValue,
  AllProps,
  ColorValue,
  EdgeSizeValue,
  StringIndexed,
} from '../shared'

export type TextSize<T = BaseTheme> = keyof StringIndexed<T>['text']

export interface TextProps<T = BaseTheme> {
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

export type TextI<T = BaseTheme> = React.ComponentType<
  AllProps<TextProps, T, 'span'>
>

export const Text: TextI
