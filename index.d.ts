// TypeScript Version: 3.0

/// <reference path="./themes.d.ts"/>
/// <reference path="./utils.d.ts"/>

import * as React from 'react'

import { BoxProps, Box } from './components/Box'
import { ButtonProps, Button } from './components/Button'

import {
  CssAndIntristicProps,
  CssProps,
  OmittedIntristicPropNames,
  Theme,
} from './shared'

declare module 'grommet' {
  export * from './components/Button'
  export * from './components/Box'

  export * from './shared'

  export { Box, Button, ButtonProps, BoxProps }
}
