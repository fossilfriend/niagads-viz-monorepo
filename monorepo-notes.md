# Notes for developing the monorepo

## package.json

### LocusZoom

* locuszoom

### IGVBrowser

* requires ambient_types
* lodash.get, lodash.merge, lodash.noop, lodash.find (& @types for each)
* igv: `https://github.com/NIAGADS/igv.js.git#NIAGADS`

### Gosling

* react > 18 (unsure about 19 support)
* higlass
* gosling.js
* pixi.js

### Table

* export-from-json (also referenced in common-types, but probably should just be moved to Table)
* @tanstack/react-table

### Charting

* highcharts? TBD
