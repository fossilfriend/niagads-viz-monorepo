import e,{useState as t,useMemo as a}from"react";import n from"lodash.range";import{ChevronLeftIcon as r,ChevronRightIcon as i}from"@heroicons/react/24/solid";import{Select as o,Button as l}from"@niagads/ui";const s=({table:s})=>{const[g,c]=t(s.getState().pagination.pageSize),m=s.getPrePaginationRowModel().rows.length,u=a((()=>(e=>{const t=10*Math.ceil(e/10);if(t>=500)return[10,20,30,40,50,100,500];if(t>=100)return[10,20,30,40,50,100];if(t>=50)return[10,20,30,40,50,e];if(t>=10&&e>=10){const a=n(10,t+10,10);return a.push(e),a}return[e]})(m)),[m]),p=s.getState().pagination.pageIndex*g+1;let d=p+g-1;d>m&&(d=m);return e.createElement(e.Fragment,null,e.createElement("div",{className:"flex gap-2 m-2"},e.createElement(o,{defaultValue:g.toString(),fields:u,onChange:e=>{var t;t=Number(e.target.value),s.setPageSize(t),c(t)},label:"Results per page",id:"pages",inline:!0,variant:"plain"}),e.createElement("p",{className:"text-sm text-gray-900 px-2"},p," - ",d," of ",m),e.createElement(l,{variant:"white",onClick:()=>s.previousPage(),disabled:!s.getCanPreviousPage()},e.createElement(r,{className:"icon-button stroke-1 "+(s.getCanPreviousPage()?"stroke-black":"icon-disabled")})),e.createElement(l,{variant:"white",onClick:()=>s.nextPage(),disabled:!s.getCanNextPage()},e.createElement(i,{className:"icon-button stroke-1 "+(s.getCanNextPage()?"stroke-black":"icon-disabled")}))))};export{s as PaginationControls};
//# sourceMappingURL=PaginationControls.js.map
