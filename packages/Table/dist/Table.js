import e,{useState as o,useRef as t,useMemo as l,useLayoutEffect as r,useEffect as n}from"react";import{withErrorBoundary as a}from"react-error-boundary";import{createColumnHelper as i,getCoreRowModel as c,getPaginationRowModel as d,getFilteredRowModel as s,getSortedRowModel as m,useReactTable as u,flexRender as b}from"@tanstack/react-table";import{TrashIcon as g}from"@heroicons/react/24/outline";import{errorFallback as v,_get as f,toTitleCase as w}from"@niagads/common";import{validateCellType as p,getCellValue as h,renderCell as E,resolveCell as S}from"./Cell.js";import{getColumn as y}from"./Column.js";import{TableColumnHeader as C}from"./TableColumnHeader.js";import{CustomSortingFunctions as x}from"./TableSortingFunctions.js";import{PaginationControls as k}from"./ControlElements/PaginationControls.js";import{TableToolbar as F}from"./ControlElements/TableToolbar.js";import{Tooltip as R,Button as j,Checkbox as N,RadioButton as T}from"@niagads/ui";const $="block mx-2 max-w-full",M="py-1.5 pr-6 pl-4 text-xs font-roboto border-solid border-slate-200 border-0 border-b-[1px] border-r-[1px]",I="hover:bg-gray-50 bg-white border-b odd:border-gray-700",H=`${"border-collapse border-0 border-t-[4px] border-solid border-black"} ${"w-full overflow-x-scroll"} ${"text-sm text-left rtl:text-right text-gray-700"}`,O=e=>"boolean"===e.type?"boolean":"float"===e.type?"scientific":"alphanumeric",V=(e,o,t)=>{try{return S(e,o)}catch(e){throw Error("Validation Error parsing field value for row "+t+" column `"+o.id+"`.\n"+e.message)}},G=({id:a,columns:v,data:S,options:G})=>{var q,z,L;const[P,A]=o([]),[D,_]=o(""),[B,J]=o((e=>{const o={};return e&&e.forEach((e=>{o[e]=!0})),o})(null===(q=null==G?void 0:G.rowSelect)||void 0===q?void 0:q.selectedValues)),[K,Q]=o(((e,o)=>{const t={};return e&&o.forEach((o=>{t[o.id]=e.includes(o.id)})),t})(null==G?void 0:G.defaultColumns,v)),U=t(!0),W=!!(null==G?void 0:G.rowSelect),X=!!(null==G?void 0:G.disableColumnFilters),Y=l((()=>{var o,t;const l=i(),r=[];if(W){const l=!!(null===(o=null==G?void 0:G.rowSelect)||void 0===o?void 0:o.enableMultiRowSelect);r.push({id:"select-col",header:({table:o})=>{var t,r;return l?e.createElement("div",{className:"inline-flex"},e.createElement("div",{className:"group relative inline-block bottom-[2px]"},e.createElement(R,{message:"Reset selected rows"},e.createElement(j,{size:"sm",variant:"primary",disabled:0===Object.keys(o.getState().rowSelection).length,onClick:()=>{o.resetRowSelection(!0)}},e.createElement(g,{className:"icon-button"})))),e.createElement("span",{className:"ml-4"},null===(t=null==G?void 0:G.rowSelect)||void 0===t?void 0:t.header)):null===(r=null==G?void 0:G.rowSelect)||void 0===r?void 0:r.header},enableHiding:!1,enableSorting:!0,meta:{description:null===(t=null==G?void 0:G.rowSelect)||void 0===t?void 0:t.description},cell:({row:o})=>l?e.createElement(N,{variant:"default",name:`checkbox_r${o.id}`,checked:o.getIsSelected(),disabled:!o.getCanSelect(),onChange:o.getToggleSelectedHandler(),alignCenter:!0}):e.createElement(T,{variant:"default",name:`radiobox r${o.id}`,checked:o.getIsSelected(),disabled:!o.getCanSelect(),onChange:o.getToggleSelectedHandler(),alignCenter:!0})})}return v.forEach((e=>{try{e.type=p(e.type)}catch(o){throw Error("Error processing column definition for `"+e.id+"`.\n"+o.message)}r.push(l.accessor((o=>h(o[e.id])),{id:e.id,header:f("header",e,w(e.id)),enableColumnFilter:f("canFilter",e,!0)&&!X,enableGlobalFilter:!e.disableGlobalFilter,enableSorting:!e.disableSorting,sortingFn:O(e),enableHiding:!f("required",e,!1),meta:{description:f("description",e)},cell:o=>E(o.cell.row.original[e.id])}))})),r}),[]),Z=l((()=>{const e=[],o=v.length;try{S.forEach(((t,l)=>{const r=Object.keys(t).length;if(r>o)throw new Error(`Too many values detected in row ${l}: expected ${o}; found ${r}`);if(r<o)throw new Error(`Missing columns in row ${l}: each row must provide a value for every column`);const n={};for(const[e,o]of Object.entries(t)){const t=y(e,v);if(void 0===t)throw new Error("Invalid column name found in table data definition `"+e+"`");n[e]=V(o,t,l)}e.push(n)}))}catch(e){throw Error(e.message)}return e}),[v]),ee={data:Z,columns:Y,getCoreRowModel:c(),getPaginationRowModel:d(),getFilteredRowModel:s(),globalFilterFn:"includesString",onGlobalFilterChange:_,state:{sorting:P,rowSelection:B,globalFilter:D,columnVisibility:K},onSortingChange:A,onColumnVisibilityChange:Q,getSortedRowModel:m(),sortingFns:x,enableColumnResizing:!0};if(W){const e=!!(null===(z=null==G?void 0:G.rowSelect)||void 0===z?void 0:z.enableMultiRowSelect);Object.assign(ee,{enableMultiRowSelection:e,onRowSelectionChange:J});const o=null===(L=null==G?void 0:G.rowSelect)||void 0===L?void 0:L.rowId;if(o){const e=((e,o)=>{const t=e.map((e=>h(e[o])));return Array.from(new Set(t)).length==e.length})(Z,o);if(!e)throw Error(`The field ${o} does not contain a unique value for each row.  It cannot be used as the 'rowId' for the rowSelect callback.`);Object.assign(ee,{getRowId:e=>h(e[o])})}}const oe=u(ee);return r((()=>{(null==G?void 0:G.onTableLoad)&&oe&&G.onTableLoad(oe)}),[oe]),n((()=>{var e;U.current?U.current=!1:null===(e=null==G?void 0:G.rowSelect)||void 0===e||e.onRowSelect(B)}),[B]),oe?e.createElement("div",{className:$},e.createElement("div",{className:"flex justify-between items-center"},e.createElement(F,{table:oe,tableId:a,enableExport:!(null==G?void 0:G.disableExport)}),e.createElement(k,{table:oe})),e.createElement("div",{className:"overflow-auto"},e.createElement("table",{className:H},(te=oe.getHeaderGroups(),e.createElement("thead",null,te.map((o=>e.createElement("tr",{key:o.id},o.headers.map((o=>e.createElement(C,{key:o.id,header:o})))))))),e.createElement("tbody",null,oe.getRowModel().rows.map((o=>e.createElement("tr",{key:o.id,className:I},o.getVisibleCells().map((o=>e.createElement("td",{className:M,key:o.id},b(o.column.columnDef.cell,o.getContext()))))))))))):e.createElement("div",null,"No data");var te},q=a(G,{FallbackComponent:v,onError(e,o){console.error(e)}});export{G as Table,q as default};
//# sourceMappingURL=Table.js.map
