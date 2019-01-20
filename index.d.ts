// TypeScript Version: 3.0

import React from 'react'

/// <reference path="themes.d.ts"/>
/// <reference path="utils.d.ts"/>

import { BoxProps } from './components/box'
import { ButtonProps } from './components/button'

declare module 'grommet' {
  export * from './shared'
  export * from './components/box'
  export * from './components/button'
}
