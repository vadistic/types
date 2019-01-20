// TypeScript Version: 3.0

/// <reference path="./themes.d.ts"/>
/// <reference path="./utils.d.ts"/>

import * as React from 'react'

import { BoxProps, Box, BoxI } from './components/Box'
import { ButtonProps, Button, ButtonI } from './components/Button'
import { HeadingProps, Heading, HeadingI } from './components/Heading'
import { Paragraph, ParagraphProps, ParagraphI } from './components/Paragraph'
import { Text, TextI, TextProps } from './components/Text'
import { Anchor, AnchorI, AnchorProps } from './components/Anchor'

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
