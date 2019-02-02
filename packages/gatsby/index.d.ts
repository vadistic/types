import * as React from 'react'

export {
  default as Link,
  GatsbyLinkProps,
  navigate,
  navigateTo,
  push,
  replace,
  withPrefix,
} from 'gatsby-link'

declare module 'gatsby' {
  type RenderCallback<Data> = (data: Data) => React.ReactNode

  interface StaticQueryProps<Data> {
    query: any
    render?: RenderCallback<Data>
    children?: RenderCallback<Data>
  }

  class StaticQuery<Data> extends React.Component<StaticQueryProps<Data>> {}

  const graphql: (query: TemplateStringsArray) => void
}
