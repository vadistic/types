# vadistic/types

> Monorepo experiment for git-powered typescript definitions sharing

## Why

TypeScript ecosystem is great and all, but there are small issues I wanted to fix:

- Typings PRs can take long time to be accepted and you should not push to DefinitelyTyped if package provide own types
- Sometime you just want some typings that probably should not become official API (breaking changes, crazy generics, preferences...)
- Local declarations lack reusability and version control if you want to share across multiple projects.
- Maitaining fork just for some typings fix is a madness
- Publishing every crapy bit of code to npm just to use it as package seems like disservice to community

**Solution:** Create private DefinitelyTyped!

## Package management

With lerna, yarn workspaces, dtslint and few scripts I can have standarised infrastructure for reusing typing packages as I want.

Since [yarn does not allow installing from git subdirectories](https://github.com/yarnpkg/yarn/issues/4725) - I'm using [gitpkg](https://github.com/ramasilveyra/gitpkg) to deploy packages as git tags. Each release has it's separate new tag/ version - just like npm.

### Publishing

```sh
# Standarise package.json across packages
$ yarn lerna run sync

# Sync typings version to original package and version typings as semver prereleases (package: ^1.2.3 => @types/package: 1.2.3-0)
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

#### `declare module 'package_name'` vs `no-declare-single-module`

I've found declaring moduiles is the most straighforward way to disable original typings, if package provide one. Alternatives are tsconfig compiler option `types`, `typesRoots` or playing with `paths`.

## TODO

[] `types-yarn add` to quickly install latest typings
[] Generailise `types-yarn` to detect repo/owner
[] Develop `types-util`
