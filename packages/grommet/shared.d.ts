// TypeScript Version: 3.0

import { Omit, FilterObjectKeys } from 'types-util'
import { FlattenInterpolation, ThemedStyledProps } from 'styled-components'

import { base } from 'grommet/themes'

export interface CssProps<P, T> {
  css?: FlattenInterpolation<ThemedStyledProps<P, T>>
}

export type OmittedIntristicPropNames = 'color' | 'values'

export type CssAndIntristicProps<
  P,
  T,
  HtmlElementName extends keyof JSX.IntrinsicElements
> = P &
  CssProps<P, T> &
  Omit<JSX.IntrinsicElements[HtmlElementName], OmittedIntristicPropNames>

export type Theme = typeof base

// Themable type values
type ColorNames<T = Theme> = FilterObjectKeys<Theme['global']['colors'], string>

export type ColorValue<T = Theme> =
  | ColorNames<T>
  | {
      dark?: ColorNames<T>
      light?: ColorNames<T>
    }

export type SizeValue<T = Theme> = keyof T['global']['size']

export type EdgeSizeValue<T = Theme> = keyof T['global']['edgeSize']

// ElevationMode = "light" | "dark"
export type ElevationMode<T = Theme> = keyof T['global']['elevation']
export type ElevationValue<
  T = Theme
> = keyof T['global']['elevation'][ElevationMode<T>]

export type BorderSizeValue<T = Theme> = keyof T['global']['borderSize']

// Reusable type values
export type AlignSelfValue = 'start' | 'center' | 'end' | 'stretch'
