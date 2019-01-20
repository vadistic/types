import * as React from 'react'

import { Theme, EdgeSizeValue, ColorValue } from '../shared'

type HeadingLevelValue<T> = keyof T['heading']['level']

// TODO: Omit 'font' prop
type HeadingSizeValue<
  T = Theme
> = keyof T['heading']['level'][HeadingLevelValue<T>]

export interface HeadingProps<T = Theme> {
  a11yTitle?: string
  alignSelf?: 'start' | 'center' | 'end' | 'stretch'
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
    | string
  color?: ColorValue<T>
  level?: HeadingLevelValue<T>
  responsive?: boolean
  size?: HeadingSizeValue<T>
  textAlign?: 'start' | 'center' | 'end'
  truncate?: boolean
}

export type HeadingI<T = Theme> = React.ComponentType<
  CssAndIntristicProps<HeadingProps, T, 'h1' | 'h2' | 'h3' | 'h4'>
>

export const Heading: HeadingI
