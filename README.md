# types-yarn

Small cli script from easier gitpkg typings packages updates on top of yarn.

Typings are shared across multiple-projects with npm-like version control (no update without release) using [gitpkg](https://github.com/ramasilveyra/gitpkg). Since `yarn outdated` and `yarn upgrade` won't work on them - here is replacement: `types-yarn`.

## Usage

```sh
types-yarn package upgrade

types-yarn [command]

Commands:

outdated
# Shows outdated typings (like `yarn outdated`)
$ types-yarn outdated

upgrade
# Install latest typings (like `yarn upgrade --latest`)
$ types-yarn upgrade
```

## TODO

[ ] Support any gitpkg, not just typings?
