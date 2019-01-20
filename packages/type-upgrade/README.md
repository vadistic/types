# type-upgrade

Cli script from easier typings packages updates.

Typings should be shared across multiple-projects with npm-like version control (no update without release) using [gitpkg](https://github.com/ramasilveyra/gitpkg). Since `yarn outdated` and `yarn upgrade` won't work on them - here is replacement: `type-upgrade`. Package manager for gitpkg typings :question:

## Usage
```sh
type-upgrade cli script

type-up [command]

Commands:

outdated
# Shows outdated typings
$ type-upgrade outdated

upgrade
# Install latest typings (like yarn upgrade --latest)
$ type-upgrade upgrade
```

## TODO
[ ] Test & support `@org/name` scoped package names
