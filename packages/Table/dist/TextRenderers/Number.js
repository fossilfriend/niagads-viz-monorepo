import r from"react";import{renderNullValue as e}from"./TextRenderer.js";import{Text as t}from"./BasicText.js";import{_get as o,_isNull as n,_isNA as i,toExponential as s,toFixedWithoutZeros as m}from"@niagads/common";const c=(r,e=2)=>{const t=s(r,e);return e&&!t.toString().includes("e")?m(t,e):t},l=({props:s})=>{let m=o("value",s);if(n(m))return e(o("nullValue",s));if(i(m))return e();const l=o("precision",s,null);return m=c(m,l),r.createElement(t,{props:Object.assign(s,{value:m})})};export{l as Float,c as formatFloat};
//# sourceMappingURL=Number.js.map
