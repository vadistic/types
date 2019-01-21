import * as React from 'react'

import { Anchor, Box, Button, Heading, Paragraph, Text } from 'grommet'

const Color = React.createElement(Button, { color: 'brand' })
// $ExpectErorr
const ColorError = React.createElement(Button, { color: 'red' })

const Margin = React.createElement(Button, { margin: 'large' })
// $ExpectErorr
const MarginError = React.createElement(Button, { margin: 'red' })

const MarginObject = React.createElement(Button, {
  margin: { vertical: 'large' },
})
// $ExpectErorr
const MarginObjectError = React.createElement(Button, {
  margin: { vertical: 'pico' },
})

// Components

const Components = () => (
  <div>
    <Anchor />
    <Box />
    <Button />
    <Heading />
    <Paragraph />
    <Text />
  </div>
)
