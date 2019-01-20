import * as React from 'react'

import {
  AlignSelfValue,
  BorderSizeValue,
  ColorValue,
  CssAndIntristicProps,
  EdgeSizeValue,
  ElevationValue,
  SizeValue,
  Theme,
} from '../shared'

export type BoxRoundSizeValue<T> = EdgeSizeValue<T> | boolean | 'full'

export type BoxAnimationType =
  | 'fadeIn'
  | 'fadeOut'
  | 'jiggle'
  | 'pulse'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'zoomIn'
  | 'zoomOut'

export type BoxAnimation =
  | BoxAnimationType
  | {
      type?: BoxAnimationType
      delay?: number
      duration?: number
      size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    }

export type BoxBasisValue =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'full'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '2/4'
  | '3/4'
  | 'auto'
  | string

export type BoxBorderSideValue =
  | boolean
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'horizontal'
  | 'vertical'
  | 'all'

export type BoxBorderStyleValue =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | 'hidden'

export type BoxOverflowValue = 'auto' | 'hidden' | 'scroll' | 'visible'

export interface BoxProps<T = Theme> {
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
    | string
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch'
  animation?: BoxAnimation | BoxAnimation[]
  background?:
    | ColorValue<T>
    | ColorValue<T> & {
        color?: ColorValue<T>
        image?: string
        position?: string
        opacity?: 'weak' | 'medium' | 'strong' | boolean
      }
  basis?: BoxBasisValue
  border?:
    | BoxBorderSideValue
    | {
        color?: ColorValue<T>
        side?: BoxBorderSideValue
        size?: BorderSizeValue<T>
        style?: BoxBorderStyleValue
      }
  direction?: 'row' | 'column' | 'row-responsive'
  elevation?: ElevationValue<T>
  flex?: 'grow' | 'shrink' | boolean | { grow?: number; shrink?: number }
  fill?: 'horizontal' | 'vertical' | boolean
  gap?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string
  height?: SizeValue<T>
  justify?: 'start' | 'center' | 'between' | 'end'
  overflow?:
    | BoxOverflowValue
    | {
        horizontal?: BoxOverflowValue
        vertical?: BoxOverflowValue
      }
  pad?:
    | EdgeSizeValue<T>
    | {
        bottom?: EdgeSizeValue<T>
        horizontal?: EdgeSizeValue<T>
        left?: EdgeSizeValue<T>
        right?: EdgeSizeValue<T>
        top?: EdgeSizeValue<T>
        vertical?: EdgeSizeValue<T>
      }
  responsive?: boolean
  round?:
    | BoxRoundSizeValue
    | {
        corner?:
          | 'top'
          | 'left'
          | 'bottom'
          | 'right'
          | 'top-left'
          | 'top-right'
          | 'bottom-left'
          | 'bottom-right'
        size?: BoxRoundSizeValue
      }
  tag?: string
  as?: string
  width?: SizeValue<T>
  wrap?: boolean
}

export type BoxI<T = Theme> = React.ComponentType<
  CssAndIntristicProps<BoxProps, T, 'button'>
>
export const Button: BoxI
