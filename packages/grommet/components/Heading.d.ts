import * as React from 'react'

import { BaseTheme } from 'grommet/themes'
import { AllProps, ColorValue, EdgeSizeValue, StringIndexed } from '../shared'

export type HeadingLevelValue<T> = keyof StringIndexed<T>['heading']['level']

// TODO: Omit 'font' prop
export type HeadingSizeValue<T = BaseTheme> = keyof StringIndexed<
  T
>['heading']['level'][HeadingLevelValue<T>]

export interface HeadingProps<T = BaseTheme> {
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

export type HeadingI<T = BaseTheme> = React.ComponentType<
  AllProps<HeadingProps, T, 'h1' | 'h2' | 'h3' | 'h4'>
>

export const Heading: HeadingI
