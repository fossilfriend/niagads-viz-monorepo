import o from"react";import{_get as n,_isNull as t,_isNA as e,_hasOwnProperty as r}from"@niagads/common";import{renderNullValue as l,buildElementStyle as c,renderStyledText as i,renderWithIcon as s,renderWithInfo as a}from"./TextRenderer.js";const p="px-2 rounded-full py-1",u="size-5 py-1",m="size-5 m-auto",y=({props:o})=>{const y=n("value",o);if(t(y))return l(n("nullValue",o));if(e(y))return l();const f=c(o),d=c(o,"color"),g=r("backgroundColor",f)||r("borderColor",f)?p:"";let b=i(y,d,g);if(r("icon",o)){const t=n("iconOnly",o,!1);n("iconStyle",o,!1);const e=t?m:u;b=s(b,n("icon",o),{iconOnly:t,iconClassName:e,className:g,style:f})}return r("tooltip",o)?a(b,n("tooltip",o),!0):b},f=({props:e})=>{let l=n("displayText",e,n("value",e));t(l)&&(l=n("nullValue",e,"NA"));const i={value:l.toString()};if(!1!==l||r("color",e)||Object.assign(i,{color:"rgb(229, 231, 235)"}),r("icon",e)){const o=c(e,"color");Object.assign(i,{iconOnly:!0,iconStyle:o})}return o.createElement(y,{props:Object.assign(e,i)})};export{y as Badge,f as BooleanBadge};
//# sourceMappingURL=Badge.js.map
