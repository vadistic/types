// TypeScript Version: 3.0

import { Omit } from 'types-util'
import { FlattenInterpolation, ThemedStyledProps } from 'styled-components'

import { BoxProps } from './components/box'
import { ButtonProps } from './components/button'

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

export type Theme = object
