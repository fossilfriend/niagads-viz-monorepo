import e from"react";import{_isNA as r,_get as o,_hasOwnProperty as n}from"@niagads/common";import{renderTooltip as t}from"@niagads/ui";import{CheckIcon as s,CheckCircleIcon as l,ExclamationCircleIcon as a,ExclamationTriangleIcon as c,UserCircleIcon as i,XCircleIcon as m}from"@heroicons/react/24/solid";import{InformationCircleIcon as f}from"@heroicons/react/24/outline";const d={check:s,solidCheck:l,info:a,warning:c,user:i,infoOutline:f,xMark:m},p=(r,o,n)=>e.createElement("span",{className:n,style:o},r),u=(o="n/a")=>e.createElement("span",{className:"text-gray-200"},r(o)||!o?"n/a":o),y=(r,o,n)=>n?t(r,o):g(r,t(e.createElement(f,{className:"info-bubble size-3 ml-1"}),o),{prefix:!1,iconOnly:!1}),b=e=>{const r=o(e,d);if(null===r)throw Error("Error rendering field: invalid icon `"+e+"`");return r},g=(r,n,t)=>{const s="string"==typeof n?b(n):void 0,l=o("prefix",t,!0),a=o("iconOnly",t,!1),c=o("className",t,""),i=o("iconClassName",t,""),m=o("style",t,{}),f=o("iconStyle",t);return l?e.createElement("div",{className:`flex ${c}`,style:m},s?e.createElement(s,{className:i,style:f}):n,!a&&r):e.createElement("div",{className:`flex ${c}`,style:m},!a&&r,s?e.createElement(s,{className:i,style:f}):n)},E=(e,r=null)=>{const t=r?[r]:["color","backgroundColor","borderColor"],s={};for(const r of t)n(r,e)&&Object.assign(s,{[r]:o(r,e)});return n("borderColor",s)&&Object.assign(s,{border:"1px solid"}),s};export{d as ICONS,E as buildElementStyle,b as getIconElement,u as renderNullValue,p as renderStyledText,g as renderWithIcon,y as renderWithInfo};
//# sourceMappingURL=TextRenderer.js.map
