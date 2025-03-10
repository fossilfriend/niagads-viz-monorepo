# NIAGADS Visualization Toolkit

React Component Library for NIAGADS Visualizations: including Tanstack React-Tables with GUI-driven filtering and custom adapters for LocusZoom.js that query NIAGADS APIs

> **WARNING: for third-party developers. This toolkit is still under development and not ready or recommended for general usage**

> **NOTE: until `Material-UI` is removed,  `npm install` must be run with the `--legacy-peer-deps` option.**

## Developing

While developing, you can use the storybook app to see and test your changes in real time.

The following command will run storybook and automatically build packages as you change them:

```bash
npm run storybook
```

## Managing the monorepo using Lerna

### List all packages

```bash
npx lerna list
```

### Building packages

You can build all packages **sequentially** by running the following command:

```bash
npx lerna run build --concurrency 1
```

You can also scope to a specific package using the `--scope` argument

```bash
npx lerna run build --scope=<package>
```

### Running other commands

You can run any npm command for any package using lerna.
For example if a package called `foo` had a script called `bar` defined in
its package.json, you could run it using the following command:

```bash
npx lerna run bar
```

This will run the command `bar` for all packages that have it defined.
If you want to only run it for the package `foo` you can use the `--scope` argument

```bash
npx lerna run bar --scope=foo
```

## Publishing

Right now, packages are published to sam's personal npm repo.
In the future we will set up a niagads npm organization and publish there instead.

To publish first increment the versions using lerna

```bash
npx lerna version
```

Then rebuild the packages using lerna

```bash
npx lerna run build
```

Then you can publish the packages

```bash
npx lerna package from-package
```

## Developer Notes

### Troubleshooting Lerna/NX

* nx causing "Daemon is not running" error

  Try removing `.nx/workspace-data/d/disabled` (<https://github.com/lerna/lerna/issues/4054#issuecomment-2378029441>)

### VSCode Configurations

#### Tailwind

> VSCode will not understand `tailwind` @ directives (`@tailwind`) out of the box. Recommendations are as follows:

* install [Tailwind CSS IntelliSense Extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
* edit `settings.json` as follows:

```json
{
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

* if you do not want to install the extension, there are [other possible solutions](https://byby.dev/at-rule-tailwind).

### JavaScript Configuration

#### CORS

> Storybook needs to query GenomicsDB API for LocusZoom

see [.storybook/middleware.js](.storybook/middleware.js) for proxy configuration

TODOs: proxy for example app

### TODOs/Issues

* `table.js` example throws a runtime error in the `highcharts` `exporting.js` module due to attempting to use `hasOwnProperty` on a `null` -- may go away when filtering is in place; otherwise may need to re-evaluate dependency rollup
