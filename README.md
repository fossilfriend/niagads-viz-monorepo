# NIAGADS Visualization Toolkit

> **NOTE: until `Material-UI` is removed,  `npm install` must be run with the `--legacy-peer-deps` option.**

## Component Library Build for Development

```bash
git clone https://github.com/NIAGADS/niagads-viz-js.git 
cd niagads-viz-js
npm install --legacy-peer-deps
npm run build
```

## Import Component Library into 3rd-Party App

```bash
npm install git+https://github.com/NIAGADS/niagads-viz-js.git --legacy-peer-deps
```

To install a specific branch:

```bash
npm install git+https://github.com/NIAGADS/niagads-viz-js.git#BRANCH --legacy-peer-deps
```

## StoryBook

```bash
git clone https://github.com/NIAGADS/niagads-viz-js.git 
cd niagads-viz-js
npm install --legacy-peer-deps
npm run storybook
```

* TODO: generate story hierarchy from project hierarchy: https://storybook.js.org/docs/configure#configure-story-loading

### Auto-Doc

```bash
npm run storybook-doc
```


## Run `example` app

> NOTE: Requires `next.js`: you may need to pre-install `next` npm package

```bash
git clone https://github.com/NIAGADS/niagads-viz-js.git 
cd niagads-viz-js/example
npm install --legacy-peer-deps
```

### Dev

```bash
npm run dev
```

### Prod

```bash
npm run start
```

## Developer Notes

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
