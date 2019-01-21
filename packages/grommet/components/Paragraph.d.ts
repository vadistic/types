import * as React from 'react'

import { BaseTheme } from 'grommet/themes'
import {
  AlignSelfValue,
  AllProps,
  ColorValue,
  EdgeSizeValue,
  StringIndexed,
} from '../shared'

export type ParagraphSize<T = BaseTheme> = keyof StringIndexed<T>['paragraph']

export interface ParagraphProps<T = BaseTheme> {
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
  responsive?: boolean
  size?: ParagraphSize<T>
  textAlign?: 'start' | 'center' | 'end'
}

export type ParagraphI<T = BaseTheme> = React.ComponentType<
  AllProps<ParagraphProps, T, 'p'>
>

export const Paragraph: ParagraphI
