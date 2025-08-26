import{r as c,j as e,a as o,l as w}from"./index-BgQ-rZWc.js";import"./react-CiW5Bwbg.js";import"./firebase-BRPa3-Bs.js";/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),g=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,l,t)=>t?t.toUpperCase():l.toLowerCase()),x=r=>{const s=g(r);return s.charAt(0).toUpperCase()+s.slice(1)},f=(...r)=>r.filter((s,l,t)=>!!s&&s.trim()!==""&&t.indexOf(s)===l).join(" ").trim(),b=r=>{for(const s in r)if(s.startsWith("aria-")||s==="role"||s==="title")return!0};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var v={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=c.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:l=2,absoluteStrokeWidth:t,className:n="",children:a,iconNode:u,...d},h)=>c.createElement("svg",{ref:h,...v,width:s,height:s,stroke:r,strokeWidth:t?Number(l)*24/Number(s):l,className:f("lucide",n),...!a&&!b(d)&&{"aria-hidden":"true"},...d},[...u.map(([p,j])=>c.createElement(p,j)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(r,s)=>{const l=c.forwardRef(({className:t,...n},a)=>c.createElement(y,{ref:a,iconNode:s,className:f(`lucide-${N(x(r))}`,`lucide-${r}`,t),...n}));return l.displayName=x(r),l};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],k=m("plus",C);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],A=m("user",U);function i(){return e.jsx("div",{className:"bg-charcoal-700 border-charcoal-800 h-5 w-5 rounded-full border-1 not-first:-ml-1"})}function $(){return console.log("current user: ",o.currentUser),e.jsxs("div",{className:"flex w-full flex-col gap-8 p-3",children:[e.jsxs("header",{className:"flex flex-row justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:w,className:"h-9"}),e.jsx("p",{className:"font-outfit text-xl",children:"Keepin' Tabs"})]}),e.jsx("div",{className:"h-7 w-7 cursor-pointer overflow-clip rounded-md bg-white/10",children:o.currentUser&&o.currentUser.photoURL?e.jsx("img",{src:o.currentUser.photoURL,className:"w-full"}):e.jsx("div",{className:"flex h-full w-full items-center justify-center p-0.5",children:e.jsx(A,{className:"w-full"})})})]}),e.jsxs("main",{className:"flex flex-col items-start gap-8",children:[e.jsxs("section",{className:"flex flex-col items-start gap-1",children:[e.jsx("h1",{className:"font-noto-sans text-sand text-4xl font-medium",children:"Debts Clear!"}),e.jsx("p",{children:"No outstanding balance"})]}),e.jsxs("section",{className:"w-full",children:[e.jsxs("div",{className:"mb-4 flex flex-row gap-2",children:[e.jsx("p",{className:"font-normal",children:"Groups"}),e.jsx("div",{className:"bg-accent-600 flex h-7 w-fit cursor-pointer items-center rounded-xl px-3",children:e.jsx(k,{className:"w-4"})})]}),e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"bg-charcoal-800 flex w-full cursor-pointer flex-col gap-2 rounded-xl p-1",children:[e.jsxs("div",{className:"text-sand flex flex-row items-center justify-between px-2",children:[e.jsx("p",{className:"font-medium",children:"Coffee with the Boys"}),e.jsxs("div",{className:"border-charcoal-600 flex flex-row items-center rounded-full border-1 p-1 pl-2",children:[e.jsx("p",{className:"font-noto-sans mr-2 align-top text-base/4",children:"1"}),e.jsx(i,{}),e.jsx(i,{}),e.jsx(i,{})]})]}),e.jsxs("div",{className:"bg-charcoal-700 flex w-full flex-row justify-between gap-2 rounded-lg p-2",children:[e.jsx("div",{className:"bg-accent-200 w-2 rounded-xs"}),e.jsx("p",{className:"grow-1 text-left",children:"You Owe"}),e.jsx("p",{className:"font-noto-sans text-accent-200",children:"PHP 4,260.00"})]})]}),e.jsxs("div",{className:"border-charcoal-700 flex w-full cursor-pointer flex-col gap-2 rounded-xl border-1 p-1",children:[e.jsx("div",{className:"text-sand flex flex-row items-center justify-between px-2",children:e.jsx("p",{className:"font-medium",children:"Non Grouped Expenses"})}),e.jsxs("div",{className:"bg-charcoal-500 flex w-full flex-row justify-between gap-2 rounded-lg p-2",children:[e.jsx("div",{className:"bg-accent-200 w-2 rounded-xs"}),e.jsx("p",{className:"grow-1 text-left",children:"You Owe"}),e.jsx("p",{className:"font-noto-sans text-accent-200",children:"PHP 4,260.00"})]})]})]})]})]})]})}export{$ as default};
