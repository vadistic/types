// TypeScript Version: 3.0

/// <reference path="./themes.d.ts"/>

import { FlattenInterpolation, ThemedStyledProps } from 'styled-components'
import { FilterObjectKeys, Omit, SubType } from 'types-util'

import { BaseTheme } from 'grommet/themes'

export interface CssProp<P, T> {
  css?: FlattenInterpolation<ThemedStyledProps<P, T>>
}

export type OmittedIntristicPropNames = 'color' | 'values'

export type AllProps<
  P,
  T,
  HtmlElementName extends keyof JSX.IntrinsicElements
> = P &
  CssProp<P, T> &
  Omit<JSX.IntrinsicElements[HtmlElementName], OmittedIntristicPropNames>

export interface StringIndexSignature<T> {
  [index: string]: any
}

export type StringIndexed<T> = T & StringIndexSignature<T>

// Themable type values
export type ColorNames<T = BaseTheme> = FilterObjectKeys<
  BaseTheme['global']['colors'],
  string
>

export type ColorValue<T = BaseTheme> =
  | ColorNames<T>
  | {
      dark?: ColorNames<T>
      light?: ColorNames<T>
    }

export type SizeValue<T = BaseTheme> = keyof StringIndexed<T>['global']['size']

export type EdgeSizeValue<T = BaseTheme> = keyof StringIndexed<
  T
>['global']['edgeSize']

// ElevationMode = "light" | "dark"
export type ElevationMode<T = BaseTheme> = keyof StringIndexed<
  T
>['global']['elevation']

export type ElevationValue<T = BaseTheme> = keyof StringIndexed<
  T
>['global']['elevation'][ElevationMode<T>]

export type BorderSizeValue<T = BaseTheme> = keyof StringIndexed<
  T
>['global']['borderSize']

// Reusable type values
export type AlignSelfValue = 'start' | 'center' | 'end' | 'stretch'
