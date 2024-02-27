import t from"react";import{NASpan as r}from"./NASpan.js";const n=(n,e=null)=>{const l=t.memo(r);return"N/A"===n||null===n||""===n?t.createElement(l,{key:Math.random().toString(36).slice(2)}):null!=e?e:n},e=t=>t instanceof Object,l=t=>{try{t=JSON.parse(t)}catch(r){return e(t)&&null!=t}return e(t)&&null!=t};export{l as isJSON,e as isObject,n as resolveNAs};
//# sourceMappingURL=utils.js.map
