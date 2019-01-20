import * as React from 'react'

import { ColorValue, EdgeSizeValue, Theme, AlignSelfValue } from '../shared'

type ParagraphSize<T = Theme> = keyof T['paragraph']

export interface ParagraphProps<T = Theme> {
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

export type ParagraphI<T = Theme> = React.ComponentType<
  CssAndIntristicProps<ParagraphProps, T, 'p'>
>

export const Paragraph: ParagraphI
