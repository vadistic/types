# vadistic/types

> Monorepo experiment for git-powered typescript definitions sharing

## Why

- Typings PRs can take long time to be accepted and you should not push to DefinitelyTyped if package provide own types
- Sometime you just want some typings that probably should not become official API (breaking changes, weird preferences, crazy generics...)
- Local declarations lack reusability and version control for sharing across porojects
- Fork just for some typings fix is hard to maintain
- Publishing every random bit of code to npm just to install it as package is disservice to the community

**Solution:** Create private, git-powered DefinitelyTyped!

## Package management

With lerna, yarn workspaces, dtslint and few scripts I can have standarised infrastructure for reusing typing packages as I want.

Since [yarn does not allow installing from git subdirectories](https://github.com/yarnpkg/yarn/issues/4725) - I'm using [gitpkg](https://github.com/ramasilveyra/gitpkg) to deploy packages as git tags. Each release has separate new tag & version - just like npm.

### Publishing

```sh
# Standarise package.json across packages
$ yarn lerna run sync

# Sync typings version to original package
# Versioning convention as prereleases (package: ^1.2.3 => @types/package: 1.2.3-0[1,2,...])
$ /packages/X yarn bump

# Deploy
$ /packages/X yarn gitpkg
$ Package deployed as: types-gatsby-v2.0.91-2-gitpkg
```

### Usage

[`types-yarn`](https://github.com/vadistic/types/tree/master/packages/types-yarn#readme) is a tiny cli util to suplement yarn in managing gitpkgs.

```sh
# Install
$ yarn add -D https://github.com/vadistic/types#types-gatsby-v2.0.91-2-gitpkg

# List outdated types packages
$ types-yarn outdated

# Upgrade them
$ types-yarn upgrade
```

### How it works

Packages are named `@types/X` and get installed in `node_modules/@types` so it works exactly like DefinitelyTyped

#### `declare module 'package_name'` vs `no-declare-single-module` dtslint rule

I've found declaring modules is the most straighforward way to disable original typings, if original package provide one. Alternatively I can use tsconfig compiler options `types`, `typesRoots` or play with `paths`.

## TODO

[ ] `types-yarn add` to quickly install latest typings

[ ] Generailise `types-yarn` to detect repo/owner

[ ] Develop `types-util`
