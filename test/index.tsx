// TypeScript Version: 3.0

import * as React from 'react'

import { IconI, Menu } from 'grommet-icons'
import { IconBaseTheme } from 'grommet-icons/themes'

const testRef = React.createRef<SVGSVGElement>()
// Default theme
export const Example: React.FC = () => (
  <div>
    {/* No prop */}
    <Menu />
    {/* HTML props */}
    <Menu values="1" />
    {/* React props */}
    <Menu ref={testRef} key="my-key" />
    {/* Color prop - shows only icontheme (it's fine) */}
    <Menu color="icon" />
    {/* Size prop */}
    <Menu size="medium" />
    {/* $ExpectError */}
  </div>
)

// $ExpectError
const ExpectStringSize = React.createElement(Menu, { size: 'customSize' })
// $ExpectError
const ExpectStringColor = React.createElement(Menu, { color: 'customColor' })

// Custom theme
type CustomTheme = IconBaseTheme & {
  global: {
    colors: {
      shiny: string
      glamorous: string
    }
  }
  icon: {
    size: {
      tiny: string
      yuge: string
    }
  }
}

const MyMenu = Menu as IconI<CustomTheme>

export const ThemedExample: React.FC = () => (
  <div>
    {/* No prop */}
    <MyMenu />
    {/* HTML props */}
    <MyMenu values="1" />
    {/* React props */}
    <MyMenu ref={testRef} key="my-key" />
    {/* Custom color prop */}
    <MyMenu color="shiny" />
    {/* Custom size prop */}
    <MyMenu size="yuge" />
  </div>
)

// $ExpectError
const ExpectThemedStringSize = React.createElement(MyMenu, {
  size: 'customSize',
})

// $ExpectError
const ExpectThemedStringColor = React.createElement(MyMenu, {
  color: 'customColor',
})
