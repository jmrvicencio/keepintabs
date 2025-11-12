const tg=()=>{};var ol={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},ng=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],a=r[t++],c=r[t++],u=((s&7)<<18|(i&63)<<12|(a&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const i=r[t++],a=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return e.join("")},sd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],a=s+1<r.length,c=a?r[s+1]:0,u=s+2<r.length,h=u?r[s+2]:0,f=i>>2,m=(i&3)<<4|c>>4;let _=(c&15)<<2|h>>6,R=h&63;u||(R=64,a||(_=64)),n.push(t[f],t[m],t[_],t[R])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(rd(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):ng(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],c=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const m=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||c==null||h==null||m==null)throw new rg;const _=i<<2|c>>4;if(n.push(_),h!==64){const R=c<<4&240|h>>2;if(n.push(R),m!==64){const C=h<<6&192|m;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class rg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const sg=function(r){const e=rd(r);return sd.encodeByteArray(e,!0)},id=function(r){return sg(r).replace(/\./g,"")},od=function(r){try{return sd.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ad(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ig=()=>ad().__FIREBASE_DEFAULTS__,og=()=>{if(typeof process>"u"||typeof ol>"u")return;const r=ol.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},ag=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&od(r[1]);return e&&JSON.parse(e)},Zi=()=>{try{return tg()||ig()||og()||ag()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},cg=r=>Zi()?.emulatorHosts?.[r],cd=()=>Zi()?.config,ud=r=>Zi()?.[`_${r}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dr(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ld(r){return(await fetch(r,{credentials:"include"})).ok}const Hr={};function lg(){const r={prod:[],emulator:[]};for(const e of Object.keys(Hr))Hr[e]?r.emulator.push(e):r.prod.push(e);return r}function hg(r){let e=document.getElementById(r),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",r),t=!0),{created:t,element:e}}let al=!1;function dg(r,e){if(typeof window>"u"||typeof document>"u"||!dr(window.location.host)||Hr[r]===e||Hr[r]||al)return;Hr[r]=e;function t(_){return`__firebase__banner__${_}`}const n="__firebase__banner",i=lg().prod.length>0;function a(){const _=document.getElementById(n);_&&_.remove()}function c(_){_.style.display="flex",_.style.background="#7faaf0",_.style.position="fixed",_.style.bottom="5px",_.style.left="5px",_.style.padding=".5em",_.style.borderRadius="5px",_.style.alignItems="center"}function u(_,R){_.setAttribute("width","24"),_.setAttribute("id",R),_.setAttribute("height","24"),_.setAttribute("viewBox","0 0 24 24"),_.setAttribute("fill","none"),_.style.marginLeft="-6px"}function h(){const _=document.createElement("span");return _.style.cursor="pointer",_.style.marginLeft="16px",_.style.fontSize="24px",_.innerHTML=" &times;",_.onclick=()=>{al=!0,a()},_}function f(_,R){_.setAttribute("id",R),_.innerText="Learn more",_.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",_.setAttribute("target","__blank"),_.style.paddingLeft="5px",_.style.textDecoration="underline"}function m(){const _=hg(n),R=t("text"),C=document.getElementById(R)||document.createElement("span"),N=t("learnmore"),D=document.getElementById(N)||document.createElement("a"),$=t("preprendIcon"),q=document.getElementById($)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(_.created){const U=_.element;c(U),f(D,N);const Y=h();u(q,$),U.append(q,C,D,Y),document.body.appendChild(U)}i?(C.innerText="Preview backend disconnected.",q.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(q.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",R)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function fg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(me())}function hd(){const r=Zi()?.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function pg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function mg(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function gg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function _g(){const r=me();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function dd(){return!hd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function fd(){return!hd()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function pd(){try{return typeof indexedDB=="object"}catch{return!1}}function yg(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}function _v(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ig="FirebaseError";class pt extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Ig,Object.setPrototypeOf(this,pt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ts.prototype.create)}}class Ts{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],a=i?Tg(i,n):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new pt(s,c,n)}}function Tg(r,e){return r.replace(Eg,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const Eg=/\{\$([^}]+)}/g;function wg(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function pn(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],a=e[s];if(cl(i)&&cl(a)){if(!pn(i,a))return!1}else if(i!==a)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function cl(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Es(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function vg(r,e){const t=new Ag(r,e);return t.subscribe.bind(t)}class Ag{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Sg(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=Yo),s.error===void 0&&(s.error=Yo),s.complete===void 0&&(s.complete=Yo);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Sg(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Yo(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rg=1e3,bg=2,Pg=14400*1e3,Cg=.5;function yv(r,e=Rg,t=bg){const n=e*Math.pow(t,r),s=Math.round(Cg*n*(Math.random()-.5)*2);return Math.min(Pg,n+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(r){return r&&r._delegate?r._delegate:r}class mn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new ug;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),n=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(kg(e))try{this.getOrInitializeService({instanceIdentifier:Zt})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=Zt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Zt){return this.instances.has(e)}getOptions(e=Zt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);n===c&&a.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Dg(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Zt){return this.component?this.component.multipleInstances?e:Zt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Dg(r){return r===Zt?void 0:r}function kg(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Vg(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var K;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(K||(K={}));const xg={debug:K.DEBUG,verbose:K.VERBOSE,info:K.INFO,warn:K.WARN,error:K.ERROR,silent:K.SILENT},Og=K.INFO,Mg={[K.DEBUG]:"log",[K.VERBOSE]:"log",[K.INFO]:"info",[K.WARN]:"warn",[K.ERROR]:"error"},Lg=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=Mg[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Qa{constructor(e){this.name=e,this._logLevel=Og,this._logHandler=Lg,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in K))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xg[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,K.DEBUG,...e),this._logHandler(this,K.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,K.VERBOSE,...e),this._logHandler(this,K.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,K.INFO,...e),this._logHandler(this,K.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,K.WARN,...e),this._logHandler(this,K.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,K.ERROR,...e),this._logHandler(this,K.ERROR,...e)}}const Fg=(r,e)=>e.some(t=>r instanceof t);let ul,ll;function Ug(){return ul||(ul=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Bg(){return ll||(ll=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const md=new WeakMap,pa=new WeakMap,gd=new WeakMap,Zo=new WeakMap,Ja=new WeakMap;function qg(r){const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",a)},i=()=>{t(kt(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&md.set(t,r)}).catch(()=>{}),Ja.set(e,r),e}function jg(r){if(pa.has(r))return;const e=new Promise((t,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",a),r.removeEventListener("abort",a)},i=()=>{t(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",a),r.addEventListener("abort",a)});pa.set(r,e)}let ma={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return pa.get(r);if(e==="objectStoreNames")return r.objectStoreNames||gd.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return kt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function zg(r){ma=r(ma)}function $g(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(ea(this),e,...t);return gd.set(n,e.sort?e.sort():[e]),kt(n)}:Bg().includes(r)?function(...e){return r.apply(ea(this),e),kt(md.get(this))}:function(...e){return kt(r.apply(ea(this),e))}}function Gg(r){return typeof r=="function"?$g(r):(r instanceof IDBTransaction&&jg(r),Fg(r,Ug())?new Proxy(r,ma):r)}function kt(r){if(r instanceof IDBRequest)return qg(r);if(Zo.has(r))return Zo.get(r);const e=Gg(r);return e!==r&&(Zo.set(r,e),Ja.set(e,r)),e}const ea=r=>Ja.get(r);function Kg(r,e,{blocked:t,upgrade:n,blocking:s,terminated:i}={}){const a=indexedDB.open(r,e),c=kt(a);return n&&a.addEventListener("upgradeneeded",u=>{n(kt(a.result),u.oldVersion,u.newVersion,kt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{i&&u.addEventListener("close",()=>i()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const Wg=["get","getKey","getAll","getAllKeys","count"],Hg=["put","add","delete","clear"],ta=new Map;function hl(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(ta.get(e))return ta.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,s=Hg.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Wg.includes(t)))return;const i=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return n&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return ta.set(e,i),i}zg(r=>({...r,get:(e,t,n)=>hl(e,t)||r.get(e,t,n),has:(e,t)=>!!hl(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qg{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Jg(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Jg(r){return r.getComponent()?.type==="VERSION"}const ga="@firebase/app",dl="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=new Qa("@firebase/app"),Xg="@firebase/app-compat",Yg="@firebase/analytics-compat",Zg="@firebase/analytics",e_="@firebase/app-check-compat",t_="@firebase/app-check",n_="@firebase/auth",r_="@firebase/auth-compat",s_="@firebase/database",i_="@firebase/data-connect",o_="@firebase/database-compat",a_="@firebase/functions",c_="@firebase/functions-compat",u_="@firebase/installations",l_="@firebase/installations-compat",h_="@firebase/messaging",d_="@firebase/messaging-compat",f_="@firebase/performance",p_="@firebase/performance-compat",m_="@firebase/remote-config",g_="@firebase/remote-config-compat",__="@firebase/storage",y_="@firebase/storage-compat",I_="@firebase/firestore",T_="@firebase/ai",E_="@firebase/firestore-compat",w_="firebase",v_="12.1.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a="[DEFAULT]",A_={[ga]:"fire-core",[Xg]:"fire-core-compat",[Zg]:"fire-analytics",[Yg]:"fire-analytics-compat",[t_]:"fire-app-check",[e_]:"fire-app-check-compat",[n_]:"fire-auth",[r_]:"fire-auth-compat",[s_]:"fire-rtdb",[i_]:"fire-data-connect",[o_]:"fire-rtdb-compat",[a_]:"fire-fn",[c_]:"fire-fn-compat",[u_]:"fire-iid",[l_]:"fire-iid-compat",[h_]:"fire-fcm",[d_]:"fire-fcm-compat",[f_]:"fire-perf",[p_]:"fire-perf-compat",[m_]:"fire-rc",[g_]:"fire-rc-compat",[__]:"fire-gcs",[y_]:"fire-gcs-compat",[I_]:"fire-fst",[E_]:"fire-fst-compat",[T_]:"fire-vertex","fire-js":"fire-js",[w_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri=new Map,S_=new Map,ya=new Map;function fl(r,e){try{r.container.addComponent(e)}catch(t){lt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Gn(r){const e=r.name;if(ya.has(e))return lt.debug(`There were multiple attempts to register component ${e}.`),!1;ya.set(e,r);for(const t of Ri.values())fl(t,r);for(const t of S_.values())fl(t,r);return!0}function Xa(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Ge(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Nt=new Ts("app","Firebase",R_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b_{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new mn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Nt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fr=v_;function P_(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:_a,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw Nt.create("bad-app-name",{appName:String(s)});if(t||(t=cd()),!t)throw Nt.create("no-options");const i=Ri.get(s);if(i){if(pn(t,i.options)&&pn(n,i.config))return i;throw Nt.create("duplicate-app",{appName:s})}const a=new Ng(s);for(const u of ya.values())a.addComponent(u);const c=new b_(t,n,a);return Ri.set(s,c),c}function C_(r=_a){const e=Ri.get(r);if(!e&&r===_a&&cd())return P_();if(!e)throw Nt.create("no-app",{appName:r});return e}function xt(r,e,t){let n=A_[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const a=[`Unable to register library "${n}" with version "${e}":`];s&&a.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&a.push("and"),i&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),lt.warn(a.join(" "));return}Gn(new mn(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V_="firebase-heartbeat-database",D_=1,is="firebase-heartbeat-store";let na=null;function _d(){return na||(na=Kg(V_,D_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(is)}catch(t){console.warn(t)}}}}).catch(r=>{throw Nt.create("idb-open",{originalErrorMessage:r.message})})),na}async function k_(r){try{const t=(await _d()).transaction(is),n=await t.objectStore(is).get(yd(r));return await t.done,n}catch(e){if(e instanceof pt)lt.warn(e.message);else{const t=Nt.create("idb-get",{originalErrorMessage:e?.message});lt.warn(t.message)}}}async function pl(r,e){try{const n=(await _d()).transaction(is,"readwrite");await n.objectStore(is).put(e,yd(r)),await n.done}catch(t){if(t instanceof pt)lt.warn(t.message);else{const n=Nt.create("idb-set",{originalErrorMessage:t?.message});lt.warn(n.message)}}}function yd(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_=1024,x_=30;class O_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new L_(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),n=ml();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(s=>s.date===n))return;if(this._heartbeatsCache.heartbeats.push({date:n,agent:t}),this._heartbeatsCache.heartbeats.length>x_){const s=F_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){lt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=ml(),{heartbeatsToSend:t,unsentEntries:n}=M_(this._heartbeatsCache.heartbeats),s=id(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return lt.warn(e),""}}}function ml(){return new Date().toISOString().substring(0,10)}function M_(r,e=N_){const t=[];let n=r.slice();for(const s of r){const i=t.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),gl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),gl(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class L_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return pd()?yg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await k_(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return pl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return pl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function gl(r){return id(JSON.stringify({version:2,heartbeats:r})).length}function F_(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U_(r){Gn(new mn("platform-logger",e=>new Qg(e),"PRIVATE")),Gn(new mn("heartbeat",e=>new O_(e),"PRIVATE")),xt(ga,dl,r),xt(ga,dl,"esm2020"),xt("fire-js","")}U_("");function Id(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const B_=Id,Td=new Ts("auth","Firebase",Id());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi=new Qa("@firebase/auth");function q_(r,...e){bi.logLevel<=K.WARN&&bi.warn(`Auth (${fr}): ${r}`,...e)}function li(r,...e){bi.logLevel<=K.ERROR&&bi.error(`Auth (${fr}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(r,...e){throw Za(r,...e)}function We(r,...e){return Za(r,...e)}function Ya(r,e,t){const n={...B_(),[e]:t};return new Ts("auth","Firebase",n).create(e,{appName:r.name})}function un(r){return Ya(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function j_(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&nt(r,"argument-error"),Ya(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Za(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Td.create(r,...e)}function j(r,e,...t){if(!r)throw Za(e,...t)}function at(r){const e="INTERNAL ASSERTION FAILED: "+r;throw li(e),new Error(e)}function ht(r,e){r||at(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(){return typeof self<"u"&&self.location?.href||""}function z_(){return _l()==="http:"||_l()==="https:"}function _l(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(z_()||mg()||"connection"in navigator)?navigator.onLine:!0}function G_(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(e,t){this.shortDelay=e,this.longDelay=t,ht(t>e,"Short delay should be less than long delay!"),this.isMobile=fg()||gg()}get(){return $_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(r,e){ht(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;at("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;at("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;at("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const K_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],H_=new ws(3e4,6e4);function tc(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function pr(r,e,t,n,s={}){return wd(r,s,async()=>{let i={},a={};n&&(e==="GET"?a=n:i={body:JSON.stringify(n)});const c=Es({key:r.config.apiKey,...a}).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const h={method:e,headers:u,...i};return pg()||(h.referrerPolicy="no-referrer"),r.emulatorConfig&&dr(r.emulatorConfig.host)&&(h.credentials="include"),Ed.fetch()(await vd(r,r.config.apiHost,t,c),h)})}async function wd(r,e,t){r._canInitEmulator=!1;const n={...K_,...e};try{const s=new J_(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await i.json();if("needConfirmation"in a)throw ni(r,"account-exists-with-different-credential",a);if(i.ok&&!("errorMessage"in a))return a;{const c=i.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw ni(r,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw ni(r,"email-already-in-use",a);if(u==="USER_DISABLED")throw ni(r,"user-disabled",a);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Ya(r,f,h);nt(r,f)}}catch(s){if(s instanceof pt)throw s;nt(r,"network-request-failed",{message:String(s)})}}async function Q_(r,e,t,n,s={}){const i=await pr(r,e,t,n,s);return"mfaPendingCredential"in i&&nt(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function vd(r,e,t,n){const s=`${e}${t}?${n}`,i=r,a=i.config.emulator?ec(r.config,s):`${r.config.apiScheme}://${s}`;return W_.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(a).toString():a}class J_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(We(this.auth,"network-request-failed")),H_.get())})}}function ni(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=We(r,e,n);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X_(r,e){return pr(r,"POST","/v1/accounts:delete",e)}async function Pi(r,e){return pr(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qr(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Y_(r,e=!1){const t=ye(r),n=await t.getIdToken(e),s=eo(n);j(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,a=i?.sign_in_provider;return{claims:s,token:n,authTime:Qr(ra(s.auth_time)),issuedAtTime:Qr(ra(s.iat)),expirationTime:Qr(ra(s.exp)),signInProvider:a||null,signInSecondFactor:i?.sign_in_second_factor||null}}function ra(r){return Number(r)*1e3}function eo(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return li("JWT malformed, contained fewer than 3 sections"),null;try{const s=od(t);return s?JSON.parse(s):(li("Failed to decode base64 JWT payload"),null)}catch(s){return li("Caught error parsing JWT payload as JSON",s?.toString()),null}}function yl(r){const e=eo(r);return j(e,"internal-error"),j(typeof e.exp<"u","internal-error"),j(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function os(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof pt&&Z_(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function Z_({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Qr(this.lastLoginAt),this.creationTime=Qr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ci(r){const e=r.auth,t=await r.getIdToken(),n=await os(r,Pi(e,{idToken:t}));j(n?.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=s.providerUserInfo?.length?Ad(s.providerUserInfo):[],a=ny(r.providerData,i),c=r.isAnonymous,u=!(r.email&&s.passwordHash)&&!a?.length,h=c?u:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Ta(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(r,f)}async function ty(r){const e=ye(r);await Ci(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function ny(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function Ad(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ry(r,e){const t=await wd(r,{},async()=>{const n=Es({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,a=await vd(r,s,"/v1/token",`key=${i}`),c=await r._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:c,body:n};return r.emulatorConfig&&dr(r.emulatorConfig.host)&&(u.credentials="include"),Ed.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function sy(r,e){return pr(r,"POST","/v2/accounts:revokeToken",tc(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){j(e.idToken,"internal-error"),j(typeof e.idToken<"u","internal-error"),j(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):yl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){j(e.length!==0,"internal-error");const t=yl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await ry(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,a=new Bn;return n&&(j(typeof n=="string","internal-error",{appName:e}),a.refreshToken=n),s&&(j(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:e}),a.expirationTime=i),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Bn,this.toJSON())}_performRefresh(){return at("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(r,e){j(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class Ke{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new ey(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Ta(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await os(this,this.stsTokenManager.getToken(this.auth,e));return j(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Y_(this,e)}reload(){return ty(this)}_assign(e){this!==e&&(j(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ke({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Ci(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(un(this.auth));const e=await this.getIdToken();return await os(this,X_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,u=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:m,emailVerified:_,isAnonymous:R,providerData:C,stsTokenManager:N}=t;j(m&&N,e,"internal-error");const D=Bn.fromJSON(this.name,N);j(typeof m=="string",e,"internal-error"),wt(n,e.name),wt(s,e.name),j(typeof _=="boolean",e,"internal-error"),j(typeof R=="boolean",e,"internal-error"),wt(i,e.name),wt(a,e.name),wt(c,e.name),wt(u,e.name),wt(h,e.name),wt(f,e.name);const $=new Ke({uid:m,auth:e,email:s,emailVerified:_,displayName:n,isAnonymous:R,photoURL:a,phoneNumber:i,tenantId:c,stsTokenManager:D,createdAt:h,lastLoginAt:f});return C&&Array.isArray(C)&&($.providerData=C.map(q=>({...q}))),u&&($._redirectEventId=u),$}static async _fromIdTokenResponse(e,t,n=!1){const s=new Bn;s.updateFromServerResponse(t);const i=new Ke({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await Ci(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Ad(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!i?.length,c=new Bn;c.updateFromIdToken(n);const u=new Ke({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Ta(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Il=new Map;function ct(r){ht(r instanceof Function,"Expected a class definition");let e=Il.get(r);return e?(ht(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Il.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sd{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Sd.type="NONE";const Tl=Sd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hi(r,e,t){return`firebase:${r}:${e}:${t}`}class qn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=hi(this.userKey,s.apiKey,i),this.fullPersistenceKey=hi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Pi(this.auth,{idToken:e}).catch(()=>{});return t?Ke._fromGetAccountInfoResponse(this.auth,t,e):null}return Ke._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new qn(ct(Tl),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||ct(Tl);const a=hi(n,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){let m;if(typeof f=="string"){const _=await Pi(e,{idToken:f}).catch(()=>{});if(!_)break;m=await Ke._fromGetAccountInfoResponse(e,_,f)}else m=Ke._fromJSON(e,f);h!==i&&(c=m),i=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!u.length?new qn(i,e,n):(i=u[0],c&&await i._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(a)}catch{}})),new qn(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function El(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Cd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Rd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Dd(e))return"Blackberry";if(kd(e))return"Webos";if(bd(e))return"Safari";if((e.includes("chrome/")||Pd(e))&&!e.includes("edge/"))return"Chrome";if(Vd(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function Rd(r=me()){return/firefox\//i.test(r)}function bd(r=me()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Pd(r=me()){return/crios\//i.test(r)}function Cd(r=me()){return/iemobile/i.test(r)}function Vd(r=me()){return/android/i.test(r)}function Dd(r=me()){return/blackberry/i.test(r)}function kd(r=me()){return/webos/i.test(r)}function nc(r=me()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function iy(r=me()){return nc(r)&&!!window.navigator?.standalone}function oy(){return _g()&&document.documentMode===10}function Nd(r=me()){return nc(r)||Vd(r)||kd(r)||Dd(r)||/windows phone/i.test(r)||Cd(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xd(r,e=[]){let t;switch(r){case"Browser":t=El(me());break;case"Worker":t=`${El(me())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${fr}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ay{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((a,c)=>{try{const u=e(i);a(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cy(r,e={}){return pr(r,"GET","/v2/passwordPolicy",tc(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy=6;class ly{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??uy,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hy{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new wl(this),this.idTokenSubscription=new wl(this),this.beforeStateQueue=new ay(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Td,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ct(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await qn.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Pi(this,{idToken:e}),n=await Ke._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(Ge(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,a=n?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===a)&&c?.user&&(n=c.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(i){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ci(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=G_()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ge(this.app))return Promise.reject(un(this));const t=e?ye(e):null;return t&&j(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&j(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(un(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ge(this.app)?Promise.reject(un(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ct(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await cy(this),t=new ly(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ts("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await sy(this,n)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ct(e)||this._popupRedirectResolver;j(t,this,"argument-error"),this.redirectPersistenceManager=await qn.create(this,[ct(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(c,this,"internal-error"),c.then(()=>{a||i(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=xd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){if(Ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&q_(`Error while retrieving App Check token: ${e.error}`),e?.token}}function to(r){return ye(r)}class wl{constructor(e){this.auth=e,this.observer=null,this.addObserver=vg(t=>this.observer=t)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function dy(r){rc=r}function fy(r){return rc.loadJS(r)}function py(){return rc.gapiScript}function my(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gy(r,e){const t=Xa(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(pn(i,e??{}))return s;nt(s,"already-initialized")}return t.initialize({options:e})}function _y(r,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(ct);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}function yy(r,e,t){const n=to(r);j(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=Od(e),{host:a,port:c}=Iy(e),u=c===null?"":`:${c}`,h={url:`${i}//${a}${u}/`},f=Object.freeze({host:a,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){j(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),j(pn(h,n.config.emulator)&&pn(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,dr(a)?(ld(`${i}//${a}${u}`),dg("Auth",!0)):Ty()}function Od(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function Iy(r){const e=Od(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:vl(n.substr(i.length+1))}}else{const[i,a]=n.split(":");return{host:i,port:vl(a)}}}function vl(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function Ty(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return at("not implemented")}_getIdTokenResponse(e){return at("not implemented")}_linkToIdToken(e,t){return at("not implemented")}_getReauthenticationResolver(e){return at("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jn(r,e){return Q_(r,"POST","/v1/accounts:signInWithIdp",tc(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey="http://localhost";class gn extends Md{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new gn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):nt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const a=new gn(n,s);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return jn(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,jn(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,jn(e,t)}buildRequest(){const e={requestUri:Ey,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Es(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs extends sc{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends vs{constructor(){super("facebook.com")}static credential(e){return gn._fromParams({providerId:Rt.PROVIDER_ID,signInMethod:Rt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rt.credentialFromTaggedObject(e)}static credentialFromError(e){return Rt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rt.credential(e.oauthAccessToken)}catch{return null}}}Rt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Rt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt extends vs{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return gn._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return bt.credential(t,n)}catch{return null}}}bt.GOOGLE_SIGN_IN_METHOD="google.com";bt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt extends vs{constructor(){super("github.com")}static credential(e){return gn._fromParams({providerId:Pt.PROVIDER_ID,signInMethod:Pt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Pt.credentialFromTaggedObject(e)}static credentialFromError(e){return Pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Pt.credential(e.oauthAccessToken)}catch{return null}}}Pt.GITHUB_SIGN_IN_METHOD="github.com";Pt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct extends vs{constructor(){super("twitter.com")}static credential(e,t){return gn._fromParams({providerId:Ct.PROVIDER_ID,signInMethod:Ct.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ct.credentialFromTaggedObject(e)}static credentialFromError(e){return Ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Ct.credential(t,n)}catch{return null}}}Ct.TWITTER_SIGN_IN_METHOD="twitter.com";Ct.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await Ke._fromIdTokenResponse(e,n,s),a=Al(n);return new Kn({user:i,providerId:a,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=Al(n);return new Kn({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function Al(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi extends pt{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,Vi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new Vi(e,t,n,s)}}function Ld(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Vi._fromErrorAndOperation(r,i,e,n):i})}async function wy(r,e,t=!1){const n=await os(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Kn._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vy(r,e,t=!1){const{auth:n}=r;if(Ge(n.app))return Promise.reject(un(n));const s="reauthenticate";try{const i=await os(r,Ld(n,s,e,r),t);j(i.idToken,n,"internal-error");const a=eo(i.idToken);j(a,n,"internal-error");const{sub:c}=a;return j(r.uid===c,n,"user-mismatch"),Kn._forOperation(r,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&nt(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ay(r,e,t=!1){if(Ge(r.app))return Promise.reject(un(r));const n="signIn",s=await Ld(r,n,e),i=await Kn._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sy(r){if(!r)return null;const{providerId:e}=r,t=r.rawUserInfo?JSON.parse(r.rawUserInfo):{},n=r.isNewUser||r.kind==="identitytoolkit#SignupNewUserResponse";if(!e&&r?.idToken){const s=eo(r.idToken)?.firebase?.sign_in_provider;if(s){const i=s!=="anonymous"&&s!=="custom"?s:null;return new zn(n,i)}}if(!e)return null;switch(e){case"facebook.com":return new Ry(n,t);case"github.com":return new by(n,t);case"google.com":return new Py(n,t);case"twitter.com":return new Cy(n,t,r.screenName||null);case"custom":case"anonymous":return new zn(n,null);default:return new zn(n,e,t)}}class zn{constructor(e,t,n={}){this.isNewUser=e,this.providerId=t,this.profile=n}}class Fd extends zn{constructor(e,t,n,s){super(e,t,n),this.username=s}}class Ry extends zn{constructor(e,t){super(e,"facebook.com",t)}}class by extends Fd{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class Py extends zn{constructor(e,t){super(e,"google.com",t)}}class Cy extends Fd{constructor(e,t,n){super(e,"twitter.com",t,n)}}function Iv(r){const{user:e,_tokenResponse:t}=r;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:Sy(t)}function Vy(r,e,t,n){return ye(r).onIdTokenChanged(e,t,n)}function Dy(r,e,t){return ye(r).beforeAuthStateChanged(e,t)}function Tv(r,e,t,n){return ye(r).onAuthStateChanged(e,t,n)}function Ev(r){return ye(r).signOut()}const Di="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Di,"1"),this.storage.removeItem(Di),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ky=1e3,Ny=10;class Bd extends Ud{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Nd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(n);!t&&this.localCache[n]===a||this.notifyListeners(n,a)},i=this.storage.getItem(n);oy()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Ny):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},ky)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Bd.type="LOCAL";const xy=Bd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd extends Ud{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}qd.type="SESSION";const jd=qd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oy(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new no(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,a=this.handlersMap[s];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,i)),u=await Oy(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}no.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ic(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class My{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,a;return new Promise((c,u)=>{const h=ic("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);a={messageChannel:s,onMessage(m){const _=m;if(_.data.eventId===h)switch(_.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(_.data.response);break;default:clearTimeout(f),clearTimeout(i),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(){return window}function Ly(r){Ze().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(){return typeof Ze().WorkerGlobalScope<"u"&&typeof Ze().importScripts=="function"}async function Fy(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Uy(){return navigator?.serviceWorker?.controller||null}function By(){return zd()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $d="firebaseLocalStorageDb",qy=1,ki="firebaseLocalStorage",Gd="fbase_key";class As{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function ro(r,e){return r.transaction([ki],e?"readwrite":"readonly").objectStore(ki)}function jy(){const r=indexedDB.deleteDatabase($d);return new As(r).toPromise()}function Ea(){const r=indexedDB.open($d,qy);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(ki,{keyPath:Gd})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(ki)?e(n):(n.close(),await jy(),e(await Ea()))})})}async function Sl(r,e,t){const n=ro(r,!0).put({[Gd]:e,value:t});return new As(n).toPromise()}async function zy(r,e){const t=ro(r,!1).get(e),n=await new As(t).toPromise();return n===void 0?null:n.value}function Rl(r,e){const t=ro(r,!0).delete(e);return new As(t).toPromise()}const $y=800,Gy=3;class Kd{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ea(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>Gy)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return zd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=no._getInstance(By()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await Fy(),!this.activeServiceWorker)return;this.sender=new My(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Uy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ea();return await Sl(e,Di,"1"),await Rl(e,Di),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Sl(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>zy(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Rl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=ro(s,!1).getAll();return new As(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),$y)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Kd.type="LOCAL";const Ky=Kd;new ws(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wd(r,e){return e?ct(e):(j(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc extends Md{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return jn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return jn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return jn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Wy(r){return Ay(r.auth,new oc(r),r.bypassAuthState)}function Hy(r){const{auth:e,user:t}=r;return j(t,e,"internal-error"),vy(t,new oc(r),r.bypassAuthState)}async function Qy(r){const{auth:e,user:t}=r;return j(t,e,"internal-error"),wy(t,new oc(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hd{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Wy;case"linkViaPopup":case"linkViaRedirect":return Qy;case"reauthViaPopup":case"reauthViaRedirect":return Hy;default:nt(this.auth,"internal-error")}}resolve(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy=new ws(2e3,1e4);async function wv(r,e,t){if(Ge(r.app))return Promise.reject(We(r,"operation-not-supported-in-this-environment"));const n=to(r);j_(r,e,sc);const s=Wd(n,t);return new an(n,"signInViaPopup",e,s).executeNotNull()}class an extends Hd{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,an.currentPopupAction&&an.currentPopupAction.cancel(),an.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return j(e,this.auth,"internal-error"),e}async onExecution(){ht(this.filter.length===1,"Popup operations only handle one event");const e=ic();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(We(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(We(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,an.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(We(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Jy.get())};e()}}an.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xy="pendingRedirect",di=new Map;class Yy extends Hd{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=di.get(this.auth._key());if(!e){try{const n=await Zy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}di.set(this.auth._key(),e)}return this.bypassAuthState||di.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Zy(r,e){const t=nI(e),n=tI(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function eI(r,e){di.set(r._key(),e)}function tI(r){return ct(r._redirectPersistence)}function nI(r){return hi(Xy,r.config.apiKey,r.name)}async function rI(r,e,t=!1){if(Ge(r.app))return Promise.reject(un(r));const n=to(r),s=Wd(n,e),a=await new Yy(n,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await n._persistUserIfCurrent(a.user),await n._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sI=600*1e3;class iI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!oI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Qd(e)){const n=e.error.code?.split("auth/")[1]||"internal-error";t.onError(We(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=sI&&this.cachedEventUids.clear(),this.cachedEventUids.has(bl(e))}saveEventToCache(e){this.cachedEventUids.add(bl(e)),this.lastProcessedEventTime=Date.now()}}function bl(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function Qd({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function oI(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Qd(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aI(r,e={}){return pr(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,uI=/^https?/;async function lI(r){if(r.config.emulator)return;const{authorizedDomains:e}=await aI(r);for(const t of e)try{if(hI(t))return}catch{}nt(r,"unauthorized-domain")}function hI(r){const e=Ia(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const a=new URL(r);return a.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===n}if(!uI.test(t))return!1;if(cI.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI=new ws(3e4,6e4);function Pl(){const r=Ze().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function fI(r){return new Promise((e,t)=>{function n(){Pl(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Pl(),t(We(r,"network-request-failed"))},timeout:dI.get()})}if(Ze().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(Ze().gapi?.load)n();else{const s=my("iframefcb");return Ze()[s]=()=>{gapi.load?n():t(We(r,"network-request-failed"))},fy(`${py()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw fi=null,e})}let fi=null;function pI(r){return fi=fi||fI(r),fi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mI=new ws(5e3,15e3),gI="__/auth/iframe",_I="emulator/auth/iframe",yI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},II=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function TI(r){const e=r.config;j(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?ec(e,_I):`https://${r.config.authDomain}/${gI}`,n={apiKey:e.apiKey,appName:r.name,v:fr},s=II.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${Es(n).slice(1)}`}async function EI(r){const e=await pI(r),t=Ze().gapi;return j(t,r,"internal-error"),e.open({where:document.body,url:TI(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:yI,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const a=We(r,"network-request-failed"),c=Ze().setTimeout(()=>{i(a)},mI.get());function u(){Ze().clearTimeout(c),s(n)}n.ping(u).then(u,()=>{i(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},vI=500,AI=600,SI="_blank",RI="http://localhost";class Cl{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function bI(r,e,t,n=vI,s=AI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u={...wI,width:n.toString(),height:s.toString(),top:i,left:a},h=me().toLowerCase();t&&(c=Pd(h)?SI:t),Rd(h)&&(e=e||RI,u.scrollbars="yes");const f=Object.entries(u).reduce((_,[R,C])=>`${_}${R}=${C},`,"");if(iy(h)&&c!=="_self")return PI(e||"",c),new Cl(null);const m=window.open(e||"",c,f);j(m,r,"popup-blocked");try{m.focus()}catch{}return new Cl(m)}function PI(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CI="__/auth/handler",VI="emulator/auth/handler",DI=encodeURIComponent("fac");async function Vl(r,e,t,n,s,i){j(r.config.authDomain,r,"auth-domain-config-required"),j(r.config.apiKey,r,"invalid-api-key");const a={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:fr,eventId:s};if(e instanceof sc){e.setDefaultLanguage(r.languageCode),a.providerId=e.providerId||"",wg(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))a[f]=m}if(e instanceof vs){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(a.scopes=f.join(","))}r.tenantId&&(a.tid=r.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),h=u?`#${DI}=${encodeURIComponent(u)}`:"";return`${kI(r)}?${Es(c).slice(1)}${h}`}function kI({config:r}){return r.emulator?ec(r,VI):`https://${r.authDomain}/${CI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sa="webStorageSupport";class NI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=jd,this._completeRedirectFn=rI,this._overrideRedirectResult=eI}async _openPopup(e,t,n,s){ht(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await Vl(e,t,n,Ia(),s);return bI(e,i,ic())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await Vl(e,t,n,Ia(),s);return Ly(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(ht(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await EI(e),n=new iI(e);return t.register("authEvent",s=>(j(s?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(sa,{type:sa},s=>{const i=s?.[0]?.[sa];i!==void 0&&t(!!i),nt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=lI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Nd()||bd()||nc()}}const xI=NI;var Dl="@firebase/auth",kl="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MI(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function LI(r){Gn(new mn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=n.options;j(a&&!a.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:a,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:xd(r)},h=new hy(n,s,i,u);return _y(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Gn(new mn("auth-internal",e=>{const t=to(e.getProvider("auth").getImmediate());return(n=>new OI(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),xt(Dl,kl,MI(r)),xt(Dl,kl,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FI=300,UI=ud("authIdTokenMaxAge")||FI;let Nl=null;const BI=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>UI)return;const s=t?.token;Nl!==s&&(Nl=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function vv(r=C_()){const e=Xa(r,"auth");if(e.isInitialized())return e.getImmediate();const t=gy(r,{popupRedirectResolver:xI,persistence:[Ky,xy,jd]}),n=ud("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const a=BI(i.toString());Dy(t,a,()=>a(t.currentUser)),Vy(t,c=>a(c))}}const s=cg("auth");return s&&yy(t,`http://${s}`),t}function qI(){return document.getElementsByTagName("head")?.[0]??document}dy({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=We("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",qI().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});LI("Browser");var jI="firebase",zI="12.1.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xt(jI,zI,"app");var xl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ot,Jd;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,g){function I(){}I.prototype=g.prototype,T.D=g.prototype,T.prototype=new I,T.prototype.constructor=T,T.C=function(E,w,S){for(var y=Array(arguments.length-2),st=2;st<arguments.length;st++)y[st-2]=arguments[st];return g.prototype[w].apply(E,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,g,I){I||(I=0);var E=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)E[w]=g.charCodeAt(I++)|g.charCodeAt(I++)<<8|g.charCodeAt(I++)<<16|g.charCodeAt(I++)<<24;else for(w=0;16>w;++w)E[w]=g[I++]|g[I++]<<8|g[I++]<<16|g[I++]<<24;g=T.g[0],I=T.g[1],w=T.g[2];var S=T.g[3],y=g+(S^I&(w^S))+E[0]+3614090360&4294967295;g=I+(y<<7&4294967295|y>>>25),y=S+(w^g&(I^w))+E[1]+3905402710&4294967295,S=g+(y<<12&4294967295|y>>>20),y=w+(I^S&(g^I))+E[2]+606105819&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(g^w&(S^g))+E[3]+3250441966&4294967295,I=w+(y<<22&4294967295|y>>>10),y=g+(S^I&(w^S))+E[4]+4118548399&4294967295,g=I+(y<<7&4294967295|y>>>25),y=S+(w^g&(I^w))+E[5]+1200080426&4294967295,S=g+(y<<12&4294967295|y>>>20),y=w+(I^S&(g^I))+E[6]+2821735955&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(g^w&(S^g))+E[7]+4249261313&4294967295,I=w+(y<<22&4294967295|y>>>10),y=g+(S^I&(w^S))+E[8]+1770035416&4294967295,g=I+(y<<7&4294967295|y>>>25),y=S+(w^g&(I^w))+E[9]+2336552879&4294967295,S=g+(y<<12&4294967295|y>>>20),y=w+(I^S&(g^I))+E[10]+4294925233&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(g^w&(S^g))+E[11]+2304563134&4294967295,I=w+(y<<22&4294967295|y>>>10),y=g+(S^I&(w^S))+E[12]+1804603682&4294967295,g=I+(y<<7&4294967295|y>>>25),y=S+(w^g&(I^w))+E[13]+4254626195&4294967295,S=g+(y<<12&4294967295|y>>>20),y=w+(I^S&(g^I))+E[14]+2792965006&4294967295,w=S+(y<<17&4294967295|y>>>15),y=I+(g^w&(S^g))+E[15]+1236535329&4294967295,I=w+(y<<22&4294967295|y>>>10),y=g+(w^S&(I^w))+E[1]+4129170786&4294967295,g=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(g^I))+E[6]+3225465664&4294967295,S=g+(y<<9&4294967295|y>>>23),y=w+(g^I&(S^g))+E[11]+643717713&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^g&(w^S))+E[0]+3921069994&4294967295,I=w+(y<<20&4294967295|y>>>12),y=g+(w^S&(I^w))+E[5]+3593408605&4294967295,g=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(g^I))+E[10]+38016083&4294967295,S=g+(y<<9&4294967295|y>>>23),y=w+(g^I&(S^g))+E[15]+3634488961&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^g&(w^S))+E[4]+3889429448&4294967295,I=w+(y<<20&4294967295|y>>>12),y=g+(w^S&(I^w))+E[9]+568446438&4294967295,g=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(g^I))+E[14]+3275163606&4294967295,S=g+(y<<9&4294967295|y>>>23),y=w+(g^I&(S^g))+E[3]+4107603335&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^g&(w^S))+E[8]+1163531501&4294967295,I=w+(y<<20&4294967295|y>>>12),y=g+(w^S&(I^w))+E[13]+2850285829&4294967295,g=I+(y<<5&4294967295|y>>>27),y=S+(I^w&(g^I))+E[2]+4243563512&4294967295,S=g+(y<<9&4294967295|y>>>23),y=w+(g^I&(S^g))+E[7]+1735328473&4294967295,w=S+(y<<14&4294967295|y>>>18),y=I+(S^g&(w^S))+E[12]+2368359562&4294967295,I=w+(y<<20&4294967295|y>>>12),y=g+(I^w^S)+E[5]+4294588738&4294967295,g=I+(y<<4&4294967295|y>>>28),y=S+(g^I^w)+E[8]+2272392833&4294967295,S=g+(y<<11&4294967295|y>>>21),y=w+(S^g^I)+E[11]+1839030562&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^g)+E[14]+4259657740&4294967295,I=w+(y<<23&4294967295|y>>>9),y=g+(I^w^S)+E[1]+2763975236&4294967295,g=I+(y<<4&4294967295|y>>>28),y=S+(g^I^w)+E[4]+1272893353&4294967295,S=g+(y<<11&4294967295|y>>>21),y=w+(S^g^I)+E[7]+4139469664&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^g)+E[10]+3200236656&4294967295,I=w+(y<<23&4294967295|y>>>9),y=g+(I^w^S)+E[13]+681279174&4294967295,g=I+(y<<4&4294967295|y>>>28),y=S+(g^I^w)+E[0]+3936430074&4294967295,S=g+(y<<11&4294967295|y>>>21),y=w+(S^g^I)+E[3]+3572445317&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^g)+E[6]+76029189&4294967295,I=w+(y<<23&4294967295|y>>>9),y=g+(I^w^S)+E[9]+3654602809&4294967295,g=I+(y<<4&4294967295|y>>>28),y=S+(g^I^w)+E[12]+3873151461&4294967295,S=g+(y<<11&4294967295|y>>>21),y=w+(S^g^I)+E[15]+530742520&4294967295,w=S+(y<<16&4294967295|y>>>16),y=I+(w^S^g)+E[2]+3299628645&4294967295,I=w+(y<<23&4294967295|y>>>9),y=g+(w^(I|~S))+E[0]+4096336452&4294967295,g=I+(y<<6&4294967295|y>>>26),y=S+(I^(g|~w))+E[7]+1126891415&4294967295,S=g+(y<<10&4294967295|y>>>22),y=w+(g^(S|~I))+E[14]+2878612391&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~g))+E[5]+4237533241&4294967295,I=w+(y<<21&4294967295|y>>>11),y=g+(w^(I|~S))+E[12]+1700485571&4294967295,g=I+(y<<6&4294967295|y>>>26),y=S+(I^(g|~w))+E[3]+2399980690&4294967295,S=g+(y<<10&4294967295|y>>>22),y=w+(g^(S|~I))+E[10]+4293915773&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~g))+E[1]+2240044497&4294967295,I=w+(y<<21&4294967295|y>>>11),y=g+(w^(I|~S))+E[8]+1873313359&4294967295,g=I+(y<<6&4294967295|y>>>26),y=S+(I^(g|~w))+E[15]+4264355552&4294967295,S=g+(y<<10&4294967295|y>>>22),y=w+(g^(S|~I))+E[6]+2734768916&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~g))+E[13]+1309151649&4294967295,I=w+(y<<21&4294967295|y>>>11),y=g+(w^(I|~S))+E[4]+4149444226&4294967295,g=I+(y<<6&4294967295|y>>>26),y=S+(I^(g|~w))+E[11]+3174756917&4294967295,S=g+(y<<10&4294967295|y>>>22),y=w+(g^(S|~I))+E[2]+718787259&4294967295,w=S+(y<<15&4294967295|y>>>17),y=I+(S^(w|~g))+E[9]+3951481745&4294967295,T.g[0]=T.g[0]+g&4294967295,T.g[1]=T.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+S&4294967295}n.prototype.u=function(T,g){g===void 0&&(g=T.length);for(var I=g-this.blockSize,E=this.B,w=this.h,S=0;S<g;){if(w==0)for(;S<=I;)s(this,T,S),S+=this.blockSize;if(typeof T=="string"){for(;S<g;)if(E[w++]=T.charCodeAt(S++),w==this.blockSize){s(this,E),w=0;break}}else for(;S<g;)if(E[w++]=T[S++],w==this.blockSize){s(this,E),w=0;break}}this.h=w,this.o+=g},n.prototype.v=function(){var T=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);T[0]=128;for(var g=1;g<T.length-8;++g)T[g]=0;var I=8*this.o;for(g=T.length-8;g<T.length;++g)T[g]=I&255,I/=256;for(this.u(T),T=Array(16),g=I=0;4>g;++g)for(var E=0;32>E;E+=8)T[I++]=this.g[g]>>>E&255;return T};function i(T,g){var I=c;return Object.prototype.hasOwnProperty.call(I,T)?I[T]:I[T]=g(T)}function a(T,g){this.h=g;for(var I=[],E=!0,w=T.length-1;0<=w;w--){var S=T[w]|0;E&&S==g||(I[w]=S,E=!1)}this.g=I}var c={};function u(T){return-128<=T&&128>T?i(T,function(g){return new a([g|0],0>g?-1:0)}):new a([T|0],0>T?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return m;if(0>T)return D(h(-T));for(var g=[],I=1,E=0;T>=I;E++)g[E]=T/I|0,I*=4294967296;return new a(g,0)}function f(T,g){if(T.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(T.charAt(0)=="-")return D(f(T.substring(1),g));if(0<=T.indexOf("-"))throw Error('number format error: interior "-" character');for(var I=h(Math.pow(g,8)),E=m,w=0;w<T.length;w+=8){var S=Math.min(8,T.length-w),y=parseInt(T.substring(w,w+S),g);8>S?(S=h(Math.pow(g,S)),E=E.j(S).add(h(y))):(E=E.j(I),E=E.add(h(y)))}return E}var m=u(0),_=u(1),R=u(16777216);r=a.prototype,r.m=function(){if(N(this))return-D(this).m();for(var T=0,g=1,I=0;I<this.g.length;I++){var E=this.i(I);T+=(0<=E?E:4294967296+E)*g,g*=4294967296}return T},r.toString=function(T){if(T=T||10,2>T||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(N(this))return"-"+D(this).toString(T);for(var g=h(Math.pow(T,6)),I=this,E="";;){var w=Y(I,g).g;I=$(I,w.j(g));var S=((0<I.g.length?I.g[0]:I.h)>>>0).toString(T);if(I=w,C(I))return S+E;for(;6>S.length;)S="0"+S;E=S+E}},r.i=function(T){return 0>T?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(var g=0;g<T.g.length;g++)if(T.g[g]!=0)return!1;return!0}function N(T){return T.h==-1}r.l=function(T){return T=$(this,T),N(T)?-1:C(T)?0:1};function D(T){for(var g=T.g.length,I=[],E=0;E<g;E++)I[E]=~T.g[E];return new a(I,~T.h).add(_)}r.abs=function(){return N(this)?D(this):this},r.add=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],E=0,w=0;w<=g;w++){var S=E+(this.i(w)&65535)+(T.i(w)&65535),y=(S>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);E=y>>>16,S&=65535,y&=65535,I[w]=y<<16|S}return new a(I,I[I.length-1]&-2147483648?-1:0)};function $(T,g){return T.add(D(g))}r.j=function(T){if(C(this)||C(T))return m;if(N(this))return N(T)?D(this).j(D(T)):D(D(this).j(T));if(N(T))return D(this.j(D(T)));if(0>this.l(R)&&0>T.l(R))return h(this.m()*T.m());for(var g=this.g.length+T.g.length,I=[],E=0;E<2*g;E++)I[E]=0;for(E=0;E<this.g.length;E++)for(var w=0;w<T.g.length;w++){var S=this.i(E)>>>16,y=this.i(E)&65535,st=T.i(w)>>>16,Er=T.i(w)&65535;I[2*E+2*w]+=y*Er,q(I,2*E+2*w),I[2*E+2*w+1]+=S*Er,q(I,2*E+2*w+1),I[2*E+2*w+1]+=y*st,q(I,2*E+2*w+1),I[2*E+2*w+2]+=S*st,q(I,2*E+2*w+2)}for(E=0;E<g;E++)I[E]=I[2*E+1]<<16|I[2*E];for(E=g;E<2*g;E++)I[E]=0;return new a(I,0)};function q(T,g){for(;(T[g]&65535)!=T[g];)T[g+1]+=T[g]>>>16,T[g]&=65535,g++}function U(T,g){this.g=T,this.h=g}function Y(T,g){if(C(g))throw Error("division by zero");if(C(T))return new U(m,m);if(N(T))return g=Y(D(T),g),new U(D(g.g),D(g.h));if(N(g))return g=Y(T,D(g)),new U(D(g.g),g.h);if(30<T.g.length){if(N(T)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var I=_,E=g;0>=E.l(T);)I=ne(I),E=ne(E);var w=Q(I,1),S=Q(E,1);for(E=Q(E,2),I=Q(I,2);!C(E);){var y=S.add(E);0>=y.l(T)&&(w=w.add(I),S=y),E=Q(E,1),I=Q(I,1)}return g=$(T,w.j(g)),new U(w,g)}for(w=m;0<=T.l(g);){for(I=Math.max(1,Math.floor(T.m()/g.m())),E=Math.ceil(Math.log(I)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),S=h(I),y=S.j(g);N(y)||0<y.l(T);)I-=E,S=h(I),y=S.j(g);C(S)&&(S=_),w=w.add(S),T=$(T,y)}return new U(w,T)}r.A=function(T){return Y(this,T).h},r.and=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],E=0;E<g;E++)I[E]=this.i(E)&T.i(E);return new a(I,this.h&T.h)},r.or=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],E=0;E<g;E++)I[E]=this.i(E)|T.i(E);return new a(I,this.h|T.h)},r.xor=function(T){for(var g=Math.max(this.g.length,T.g.length),I=[],E=0;E<g;E++)I[E]=this.i(E)^T.i(E);return new a(I,this.h^T.h)};function ne(T){for(var g=T.g.length+1,I=[],E=0;E<g;E++)I[E]=T.i(E)<<1|T.i(E-1)>>>31;return new a(I,T.h)}function Q(T,g){var I=g>>5;g%=32;for(var E=T.g.length-I,w=[],S=0;S<E;S++)w[S]=0<g?T.i(S+I)>>>g|T.i(S+I+1)<<32-g:T.i(S+I);return new a(w,T.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Jd=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Ot=a}).apply(typeof xl<"u"?xl:typeof self<"u"?self:typeof window<"u"?window:{});var ri=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Xd,zr,Yd,pi,wa,Zd,ef,tf;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,d){return o==Array.prototype||o==Object.prototype||(o[l]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof ri=="object"&&ri];for(var l=0;l<o.length;++l){var d=o[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(o,l){if(l)e:{var d=n;o=o.split(".");for(var p=0;p<o.length-1;p++){var A=o[p];if(!(A in d))break e;d=d[A]}o=o[o.length-1],p=d[o],l=l(p),l!=p&&l!=null&&e(d,o,{configurable:!0,writable:!0,value:l})}}function i(o,l){o instanceof String&&(o+="");var d=0,p=!1,A={next:function(){if(!p&&d<o.length){var b=d++;return{value:l(b,o[b]),done:!1}}return p=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(o){return o||function(){return i(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function h(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function f(o,l,d){return o.call.apply(o.bind,arguments)}function m(o,l,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,p),o.apply(l,A)}}return function(){return o.apply(l,arguments)}}function _(o,l,d){return _=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,_.apply(null,arguments)}function R(o,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function C(o,l){function d(){}d.prototype=l.prototype,o.aa=l.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,A,b){for(var x=Array(arguments.length-2),re=2;re<arguments.length;re++)x[re-2]=arguments[re];return l.prototype[A].apply(p,x)}}function N(o){const l=o.length;if(0<l){const d=Array(l);for(let p=0;p<l;p++)d[p]=o[p];return d}return[]}function D(o,l){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const A=o.length||0,b=p.length||0;o.length=A+b;for(let x=0;x<b;x++)o[A+x]=p[x]}else o.push(p)}}class ${constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function q(o){return/^[\s\xa0]*$/.test(o)}function U(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function Y(o){return Y[" "](o),o}Y[" "]=function(){};var ne=U().indexOf("Gecko")!=-1&&!(U().toLowerCase().indexOf("webkit")!=-1&&U().indexOf("Edge")==-1)&&!(U().indexOf("Trident")!=-1||U().indexOf("MSIE")!=-1)&&U().indexOf("Edge")==-1;function Q(o,l,d){for(const p in o)l.call(d,o[p],p,o)}function T(o,l){for(const d in o)l.call(void 0,o[d],d,o)}function g(o){const l={};for(const d in o)l[d]=o[d];return l}const I="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,l){let d,p;for(let A=1;A<arguments.length;A++){p=arguments[A];for(d in p)o[d]=p[d];for(let b=0;b<I.length;b++)d=I[b],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function w(o){var l=1;o=o.split(":");const d=[];for(;0<l&&o.length;)d.push(o.shift()),l--;return o.length&&d.push(o.join(":")),d}function S(o){c.setTimeout(()=>{throw o},0)}function y(){var o=Po;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class st{constructor(){this.h=this.g=null}add(l,d){const p=Er.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Er=new $(()=>new Tm,o=>o.reset());class Tm{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let wr,vr=!1,Po=new st,ou=()=>{const o=c.Promise.resolve(void 0);wr=()=>{o.then(Em)}};var Em=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(d){S(d)}var l=Er;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}vr=!1};function yt(){this.s=this.s,this.C=this.C}yt.prototype.s=!1,yt.prototype.ma=function(){this.s||(this.s=!0,this.N())},yt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ee(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}Ee.prototype.h=function(){this.defaultPrevented=!0};var wm=(function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return o})();function Ar(o,l){if(Ee.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(ne){e:{try{Y(l.nodeName);var A=!0;break e}catch{}A=!1}A||(l=null)}}else d=="mouseover"?l=o.fromElement:d=="mouseout"&&(l=o.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:vm[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Ar.aa.h.call(this)}}C(Ar,Ee);var vm={2:"touch",3:"pen",4:"mouse"};Ar.prototype.h=function(){Ar.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ls="closure_listenable_"+(1e6*Math.random()|0),Am=0;function Sm(o,l,d,p,A){this.listener=o,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=A,this.key=++Am,this.da=this.fa=!1}function Fs(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Us(o){this.src=o,this.g={},this.h=0}Us.prototype.add=function(o,l,d,p,A){var b=o.toString();o=this.g[b],o||(o=this.g[b]=[],this.h++);var x=Vo(o,l,p,A);return-1<x?(l=o[x],d||(l.fa=!1)):(l=new Sm(l,this.src,b,!!p,A),l.fa=d,o.push(l)),l};function Co(o,l){var d=l.type;if(d in o.g){var p=o.g[d],A=Array.prototype.indexOf.call(p,l,void 0),b;(b=0<=A)&&Array.prototype.splice.call(p,A,1),b&&(Fs(l),o.g[d].length==0&&(delete o.g[d],o.h--))}}function Vo(o,l,d,p){for(var A=0;A<o.length;++A){var b=o[A];if(!b.da&&b.listener==l&&b.capture==!!d&&b.ha==p)return A}return-1}var Do="closure_lm_"+(1e6*Math.random()|0),ko={};function au(o,l,d,p,A){if(Array.isArray(l)){for(var b=0;b<l.length;b++)au(o,l[b],d,p,A);return null}return d=lu(d),o&&o[Ls]?o.K(l,d,h(p)?!!p.capture:!1,A):Rm(o,l,d,!1,p,A)}function Rm(o,l,d,p,A,b){if(!l)throw Error("Invalid event type");var x=h(A)?!!A.capture:!!A,re=xo(o);if(re||(o[Do]=re=new Us(o)),d=re.add(l,d,p,x,b),d.proxy)return d;if(p=bm(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)wm||(A=x),A===void 0&&(A=!1),o.addEventListener(l.toString(),p,A);else if(o.attachEvent)o.attachEvent(uu(l.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function bm(){function o(d){return l.call(o.src,o.listener,d)}const l=Pm;return o}function cu(o,l,d,p,A){if(Array.isArray(l))for(var b=0;b<l.length;b++)cu(o,l[b],d,p,A);else p=h(p)?!!p.capture:!!p,d=lu(d),o&&o[Ls]?(o=o.i,l=String(l).toString(),l in o.g&&(b=o.g[l],d=Vo(b,d,p,A),-1<d&&(Fs(b[d]),Array.prototype.splice.call(b,d,1),b.length==0&&(delete o.g[l],o.h--)))):o&&(o=xo(o))&&(l=o.g[l.toString()],o=-1,l&&(o=Vo(l,d,p,A)),(d=-1<o?l[o]:null)&&No(d))}function No(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[Ls])Co(l.i,o);else{var d=o.type,p=o.proxy;l.removeEventListener?l.removeEventListener(d,p,o.capture):l.detachEvent?l.detachEvent(uu(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=xo(l))?(Co(d,o),d.h==0&&(d.src=null,l[Do]=null)):Fs(o)}}}function uu(o){return o in ko?ko[o]:ko[o]="on"+o}function Pm(o,l){if(o.da)o=!0;else{l=new Ar(l,this);var d=o.listener,p=o.ha||o.src;o.fa&&No(o),o=d.call(p,l)}return o}function xo(o){return o=o[Do],o instanceof Us?o:null}var Oo="__closure_events_fn_"+(1e9*Math.random()>>>0);function lu(o){return typeof o=="function"?o:(o[Oo]||(o[Oo]=function(l){return o.handleEvent(l)}),o[Oo])}function we(){yt.call(this),this.i=new Us(this),this.M=this,this.F=null}C(we,yt),we.prototype[Ls]=!0,we.prototype.removeEventListener=function(o,l,d,p){cu(this,o,l,d,p)};function Ve(o,l){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=l.type||l,typeof l=="string")l=new Ee(l,o);else if(l instanceof Ee)l.target=l.target||o;else{var A=l;l=new Ee(p,o),E(l,A)}if(A=!0,d)for(var b=d.length-1;0<=b;b--){var x=l.g=d[b];A=Bs(x,p,!0,l)&&A}if(x=l.g=o,A=Bs(x,p,!0,l)&&A,A=Bs(x,p,!1,l)&&A,d)for(b=0;b<d.length;b++)x=l.g=d[b],A=Bs(x,p,!1,l)&&A}we.prototype.N=function(){if(we.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var d=o.g[l],p=0;p<d.length;p++)Fs(d[p]);delete o.g[l],o.h--}}this.F=null},we.prototype.K=function(o,l,d,p){return this.i.add(String(o),l,!1,d,p)},we.prototype.L=function(o,l,d,p){return this.i.add(String(o),l,!0,d,p)};function Bs(o,l,d,p){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,b=0;b<l.length;++b){var x=l[b];if(x&&!x.da&&x.capture==d){var re=x.listener,Ie=x.ha||x.src;x.fa&&Co(o.i,x),A=re.call(Ie,p)!==!1&&A}}return A&&!p.defaultPrevented}function hu(o,l,d){if(typeof o=="function")d&&(o=_(o,d));else if(o&&typeof o.handleEvent=="function")o=_(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(o,l||0)}function du(o){o.g=hu(()=>{o.g=null,o.i&&(o.i=!1,du(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Cm extends yt{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:du(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Sr(o){yt.call(this),this.h=o,this.g={}}C(Sr,yt);var fu=[];function pu(o){Q(o.g,function(l,d){this.g.hasOwnProperty(d)&&No(l)},o),o.g={}}Sr.prototype.N=function(){Sr.aa.N.call(this),pu(this)},Sr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Mo=c.JSON.stringify,Vm=c.JSON.parse,Dm=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function Lo(){}Lo.prototype.h=null;function mu(o){return o.h||(o.h=o.i())}function gu(){}var Rr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Fo(){Ee.call(this,"d")}C(Fo,Ee);function Uo(){Ee.call(this,"c")}C(Uo,Ee);var Ht={},_u=null;function qs(){return _u=_u||new we}Ht.La="serverreachability";function yu(o){Ee.call(this,Ht.La,o)}C(yu,Ee);function br(o){const l=qs();Ve(l,new yu(l))}Ht.STAT_EVENT="statevent";function Iu(o,l){Ee.call(this,Ht.STAT_EVENT,o),this.stat=l}C(Iu,Ee);function De(o){const l=qs();Ve(l,new Iu(l,o))}Ht.Ma="timingevent";function Tu(o,l){Ee.call(this,Ht.Ma,o),this.size=l}C(Tu,Ee);function Pr(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},l)}function Cr(){this.g=!0}Cr.prototype.xa=function(){this.g=!1};function km(o,l,d,p,A,b){o.info(function(){if(o.g)if(b)for(var x="",re=b.split("&"),Ie=0;Ie<re.length;Ie++){var J=re[Ie].split("=");if(1<J.length){var ve=J[0];J=J[1];var Ae=ve.split("_");x=2<=Ae.length&&Ae[1]=="type"?x+(ve+"="+J+"&"):x+(ve+"=redacted&")}}else x=null;else x=b;return"XMLHTTP REQ ("+p+") [attempt "+A+"]: "+l+`
`+d+`
`+x})}function Nm(o,l,d,p,A,b,x){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+A+"]: "+l+`
`+d+`
`+b+" "+x})}function Sn(o,l,d,p){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Om(o,d)+(p?" "+p:"")})}function xm(o,l){o.info(function(){return"TIMEOUT: "+l})}Cr.prototype.info=function(){};function Om(o,l){if(!o.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var A=p[1];if(Array.isArray(A)&&!(1>A.length)){var b=A[0];if(b!="noop"&&b!="stop"&&b!="close")for(var x=1;x<A.length;x++)A[x]=""}}}}return Mo(d)}catch{return l}}var js={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Eu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Bo;function zs(){}C(zs,Lo),zs.prototype.g=function(){return new XMLHttpRequest},zs.prototype.i=function(){return{}},Bo=new zs;function It(o,l,d,p){this.j=o,this.i=l,this.l=d,this.R=p||1,this.U=new Sr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new wu}function wu(){this.i=null,this.g="",this.h=!1}var vu={},qo={};function jo(o,l,d){o.L=1,o.v=Ws(it(l)),o.m=d,o.P=!0,Au(o,null)}function Au(o,l){o.F=Date.now(),$s(o),o.A=it(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),Fu(d.i,"t",p),o.C=0,d=o.j.J,o.h=new wu,o.g=nl(o.j,d?l:null,!o.m),0<o.O&&(o.M=new Cm(_(o.Y,o,o.g),o.O)),l=o.U,d=o.g,p=o.ca;var A="readystatechange";Array.isArray(A)||(A&&(fu[0]=A.toString()),A=fu);for(var b=0;b<A.length;b++){var x=au(d,A[b],p||l.handleEvent,!1,l.h||l);if(!x)break;l.g[x.key]=x}l=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),br(),km(o.i,o.u,o.A,o.l,o.R,o.m)}It.prototype.ca=function(o){o=o.target;const l=this.M;l&&ot(o)==3?l.j():this.Y(o)},It.prototype.Y=function(o){try{if(o==this.g)e:{const Ae=ot(this.g);var l=this.g.Ba();const Pn=this.g.Z();if(!(3>Ae)&&(Ae!=3||this.g&&(this.h.h||this.g.oa()||Gu(this.g)))){this.J||Ae!=4||l==7||(l==8||0>=Pn?br(3):br(2)),zo(this);var d=this.g.Z();this.X=d;t:if(Su(this)){var p=Gu(this.g);o="";var A=p.length,b=ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Qt(this),Vr(this);var x="";break t}this.h.i=new c.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,o+=this.h.i.decode(p[l],{stream:!(b&&l==A-1)});p.length=0,this.h.g+=o,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=d==200,Nm(this.i,this.u,this.A,this.l,this.R,Ae,d),this.o){if(this.T&&!this.K){t:{if(this.g){var re,Ie=this.g;if((re=Ie.g?Ie.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(re)){var J=re;break t}}J=null}if(d=J)Sn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,$o(this,d);else{this.o=!1,this.s=3,De(12),Qt(this),Vr(this);break e}}if(this.P){d=!0;let ze;for(;!this.J&&this.C<x.length;)if(ze=Mm(this,x),ze==qo){Ae==4&&(this.s=4,De(14),d=!1),Sn(this.i,this.l,null,"[Incomplete Response]");break}else if(ze==vu){this.s=4,De(15),Sn(this.i,this.l,x,"[Invalid Chunk]"),d=!1;break}else Sn(this.i,this.l,ze,null),$o(this,ze);if(Su(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ae!=4||x.length!=0||this.h.h||(this.s=1,De(16),d=!1),this.o=this.o&&d,!d)Sn(this.i,this.l,x,"[Invalid Chunked Response]"),Qt(this),Vr(this);else if(0<x.length&&!this.W){this.W=!0;var ve=this.j;ve.g==this&&ve.ba&&!ve.M&&(ve.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),Jo(ve),ve.M=!0,De(11))}}else Sn(this.i,this.l,x,null),$o(this,x);Ae==4&&Qt(this),this.o&&!this.J&&(Ae==4?Yu(this.j,this):(this.o=!1,$s(this)))}else Zm(this.g),d==400&&0<x.indexOf("Unknown SID")?(this.s=3,De(12)):(this.s=0,De(13)),Qt(this),Vr(this)}}}catch{}finally{}};function Su(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Mm(o,l){var d=o.C,p=l.indexOf(`
`,d);return p==-1?qo:(d=Number(l.substring(d,p)),isNaN(d)?vu:(p+=1,p+d>l.length?qo:(l=l.slice(p,p+d),o.C=p+d,l)))}It.prototype.cancel=function(){this.J=!0,Qt(this)};function $s(o){o.S=Date.now()+o.I,Ru(o,o.I)}function Ru(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Pr(_(o.ba,o),l)}function zo(o){o.B&&(c.clearTimeout(o.B),o.B=null)}It.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(xm(this.i,this.A),this.L!=2&&(br(),De(17)),Qt(this),this.s=2,Vr(this)):Ru(this,this.S-o)};function Vr(o){o.j.G==0||o.J||Yu(o.j,o)}function Qt(o){zo(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,pu(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function $o(o,l){try{var d=o.j;if(d.G!=0&&(d.g==o||Go(d.h,o))){if(!o.K&&Go(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var A=p;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)Zs(d),Xs(d);else break e;Qo(d),De(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=Pr(_(d.Za,d),6e3));if(1>=Cu(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Xt(d,11)}else if((o.K||d.g==o)&&Zs(d),!q(l))for(A=d.Da.g.parse(l),l=0;l<A.length;l++){let J=A[l];if(d.T=J[0],J=J[1],d.G==2)if(J[0]=="c"){d.K=J[1],d.ia=J[2];const ve=J[3];ve!=null&&(d.la=ve,d.j.info("VER="+d.la));const Ae=J[4];Ae!=null&&(d.Aa=Ae,d.j.info("SVER="+d.Aa));const Pn=J[5];Pn!=null&&typeof Pn=="number"&&0<Pn&&(p=1.5*Pn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const ze=o.g;if(ze){const ti=ze.g?ze.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ti){var b=p.h;b.g||ti.indexOf("spdy")==-1&&ti.indexOf("quic")==-1&&ti.indexOf("h2")==-1||(b.j=b.l,b.g=new Set,b.h&&(Ko(b,b.h),b.h=null))}if(p.D){const Xo=ze.g?ze.g.getResponseHeader("X-HTTP-Session-Id"):null;Xo&&(p.ya=Xo,ie(p.I,p.D,Xo))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var x=o;if(p.qa=tl(p,p.J?p.ia:null,p.W),x.K){Vu(p.h,x);var re=x,Ie=p.L;Ie&&(re.I=Ie),re.B&&(zo(re),$s(re)),p.g=x}else Ju(p);0<d.i.length&&Ys(d)}else J[0]!="stop"&&J[0]!="close"||Xt(d,7);else d.G==3&&(J[0]=="stop"||J[0]=="close"?J[0]=="stop"?Xt(d,7):Ho(d):J[0]!="noop"&&d.l&&d.l.ta(J),d.v=0)}}br(4)}catch{}}var Lm=class{constructor(o,l){this.g=o,this.map=l}};function bu(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Pu(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Cu(o){return o.h?1:o.g?o.g.size:0}function Go(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Ko(o,l){o.g?o.g.add(l):o.h=l}function Vu(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}bu.prototype.cancel=function(){if(this.i=Du(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Du(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const d of o.g.values())l=l.concat(d.D);return l}return N(o.i)}function Fm(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var l=[],d=o.length,p=0;p<d;p++)l.push(o[p]);return l}l=[],d=0;for(p in o)l[d++]=o[p];return l}function Um(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var l=[];o=o.length;for(var d=0;d<o;d++)l.push(d);return l}l=[],d=0;for(const p in o)l[d++]=p;return l}}}function ku(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var d=Um(o),p=Fm(o),A=p.length,b=0;b<A;b++)l.call(void 0,p[b],d&&d[b],o)}var Nu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Bm(o,l){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),A=null;if(0<=p){var b=o[d].substring(0,p);A=o[d].substring(p+1)}else b=o[d];l(b,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Jt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Jt){this.h=o.h,Gs(this,o.j),this.o=o.o,this.g=o.g,Ks(this,o.s),this.l=o.l;var l=o.i,d=new Nr;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),xu(this,d),this.m=o.m}else o&&(l=String(o).match(Nu))?(this.h=!1,Gs(this,l[1]||"",!0),this.o=Dr(l[2]||""),this.g=Dr(l[3]||"",!0),Ks(this,l[4]),this.l=Dr(l[5]||"",!0),xu(this,l[6]||"",!0),this.m=Dr(l[7]||"")):(this.h=!1,this.i=new Nr(null,this.h))}Jt.prototype.toString=function(){var o=[],l=this.j;l&&o.push(kr(l,Ou,!0),":");var d=this.g;return(d||l=="file")&&(o.push("//"),(l=this.o)&&o.push(kr(l,Ou,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(kr(d,d.charAt(0)=="/"?zm:jm,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",kr(d,Gm)),o.join("")};function it(o){return new Jt(o)}function Gs(o,l,d){o.j=d?Dr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Ks(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function xu(o,l,d){l instanceof Nr?(o.i=l,Km(o.i,o.h)):(d||(l=kr(l,$m)),o.i=new Nr(l,o.h))}function ie(o,l,d){o.i.set(l,d)}function Ws(o){return ie(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Dr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function kr(o,l,d){return typeof o=="string"?(o=encodeURI(o).replace(l,qm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function qm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ou=/[#\/\?@]/g,jm=/[#\?:]/g,zm=/[#\?]/g,$m=/[#\?@]/g,Gm=/#/g;function Nr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function Tt(o){o.g||(o.g=new Map,o.h=0,o.i&&Bm(o.i,function(l,d){o.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=Nr.prototype,r.add=function(o,l){Tt(this),this.i=null,o=Rn(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(l),this.h+=1,this};function Mu(o,l){Tt(o),l=Rn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function Lu(o,l){return Tt(o),l=Rn(o,l),o.g.has(l)}r.forEach=function(o,l){Tt(this),this.g.forEach(function(d,p){d.forEach(function(A){o.call(l,A,p,this)},this)},this)},r.na=function(){Tt(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){const A=o[p];for(let b=0;b<A.length;b++)d.push(l[p])}return d},r.V=function(o){Tt(this);let l=[];if(typeof o=="string")Lu(this,o)&&(l=l.concat(this.g.get(Rn(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)l=l.concat(o[d])}return l},r.set=function(o,l){return Tt(this),this.i=null,o=Rn(this,o),Lu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},r.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function Fu(o,l,d){Mu(o,l),0<d.length&&(o.i=null,o.g.set(Rn(o,l),N(d)),o.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];const b=encodeURIComponent(String(p)),x=this.V(p);for(p=0;p<x.length;p++){var A=b;x[p]!==""&&(A+="="+encodeURIComponent(String(x[p]))),o.push(A)}}return this.i=o.join("&")};function Rn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Km(o,l){l&&!o.j&&(Tt(o),o.i=null,o.g.forEach(function(d,p){var A=p.toLowerCase();p!=A&&(Mu(this,p),Fu(this,A,d))},o)),o.j=l}function Wm(o,l){const d=new Cr;if(c.Image){const p=new Image;p.onload=R(Et,d,"TestLoadImage: loaded",!0,l,p),p.onerror=R(Et,d,"TestLoadImage: error",!1,l,p),p.onabort=R(Et,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=R(Et,d,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else l(!1)}function Hm(o,l){const d=new Cr,p=new AbortController,A=setTimeout(()=>{p.abort(),Et(d,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:p.signal}).then(b=>{clearTimeout(A),b.ok?Et(d,"TestPingServer: ok",!0,l):Et(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),Et(d,"TestPingServer: error",!1,l)})}function Et(o,l,d,p,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),p(d)}catch{}}function Qm(){this.g=new Dm}function Jm(o,l,d){const p=d||"";try{ku(o,function(A,b){let x=A;h(A)&&(x=Mo(A)),l.push(p+b+"="+encodeURIComponent(x))})}catch(A){throw l.push(p+"type="+encodeURIComponent("_badmap")),A}}function Hs(o){this.l=o.Ub||null,this.j=o.eb||!1}C(Hs,Lo),Hs.prototype.g=function(){return new Qs(this.l,this.j)},Hs.prototype.i=(function(o){return function(){return o}})({});function Qs(o,l){we.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(Qs,we),r=Qs.prototype,r.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,Or(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,xr(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Or(this)),this.g&&(this.readyState=3,Or(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Uu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Uu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?xr(this):Or(this),this.readyState==3&&Uu(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,xr(this))},r.Qa=function(o){this.g&&(this.response=o,xr(this))},r.ga=function(){this.g&&xr(this)};function xr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Or(o)}r.setRequestHeader=function(o,l){this.u.append(o,l)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=l.next();return o.join(`\r
`)};function Or(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Qs.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Bu(o){let l="";return Q(o,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function Wo(o,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Bu(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):ie(o,l,d))}function ce(o){we.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(ce,we);var Xm=/^https?$/i,Ym=["POST","PUT"];r=ce.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Bo.g(),this.v=this.o?mu(this.o):mu(Bo),this.g.onreadystatechange=_(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(b){qu(this,b);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var A in p)d.set(A,p[A]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const b of p.keys())d.set(b,p.get(b));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(b=>b.toLowerCase()=="content-type"),A=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Ym,l,void 0))||p||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[b,x]of d)this.g.setRequestHeader(b,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$u(this),this.u=!0,this.g.send(o),this.u=!1}catch(b){qu(this,b)}};function qu(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,ju(o),Js(o)}function ju(o){o.A||(o.A=!0,Ve(o,"complete"),Ve(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ve(this,"complete"),Ve(this,"abort"),Js(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Js(this,!0)),ce.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?zu(this):this.bb())},r.bb=function(){zu(this)};function zu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||ot(o)!=4||o.Z()!=2)){if(o.u&&ot(o)==4)hu(o.Ea,0,o);else if(Ve(o,"readystatechange"),ot(o)==4){o.h=!1;try{const x=o.Z();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=x===0){var A=String(o.D).match(Nu)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),p=!Xm.test(A?A.toLowerCase():"")}d=p}if(d)Ve(o,"complete"),Ve(o,"success");else{o.m=6;try{var b=2<ot(o)?o.g.statusText:""}catch{b=""}o.l=b+" ["+o.Z()+"]",ju(o)}}finally{Js(o)}}}}function Js(o,l){if(o.g){$u(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Ve(o,"ready");try{d.onreadystatechange=p}catch{}}}function $u(o){o.I&&(c.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function ot(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<ot(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Vm(l)}};function Gu(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Zm(o){const l={};o=(o.g&&2<=ot(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(q(o[p]))continue;var d=w(o[p]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const b=l[A]||[];l[A]=b,b.push(d)}T(l,function(p){return p.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Mr(o,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||l}function Ku(o){this.Aa=0,this.i=[],this.j=new Cr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Mr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Mr("baseRetryDelayMs",5e3,o),this.cb=Mr("retryDelaySeedMs",1e4,o),this.Wa=Mr("forwardChannelMaxRetries",2,o),this.wa=Mr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new bu(o&&o.concurrentRequestLimit),this.Da=new Qm,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Ku.prototype,r.la=8,r.G=1,r.connect=function(o,l,d,p){De(0),this.W=o,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=tl(this,null,this.W),Ys(this)};function Ho(o){if(Wu(o),o.G==3){var l=o.U++,d=it(o.I);if(ie(d,"SID",o.K),ie(d,"RID",l),ie(d,"TYPE","terminate"),Lr(o,d),l=new It(o,o.j,l),l.L=2,l.v=Ws(it(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=nl(l.j,null),l.g.ea(l.v)),l.F=Date.now(),$s(l)}el(o)}function Xs(o){o.g&&(Jo(o),o.g.cancel(),o.g=null)}function Wu(o){Xs(o),o.u&&(c.clearTimeout(o.u),o.u=null),Zs(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Ys(o){if(!Pu(o.h)&&!o.s){o.s=!0;var l=o.Ga;wr||ou(),vr||(wr(),vr=!0),Po.add(l,o),o.B=0}}function eg(o,l){return Cu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Pr(_(o.Ga,o,l),Zu(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const A=new It(this,this.j,o);let b=this.o;if(this.S&&(b?(b=g(b),E(b,this.S)):b=this.S),this.m!==null||this.O||(A.H=b,b=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Qu(this,A,l),d=it(this.I),ie(d,"RID",o),ie(d,"CVER",22),this.D&&ie(d,"X-HTTP-Session-Id",this.D),Lr(this,d),b&&(this.O?l="headers="+encodeURIComponent(String(Bu(b)))+"&"+l:this.m&&Wo(d,this.m,b)),Ko(this.h,A),this.Ua&&ie(d,"TYPE","init"),this.P?(ie(d,"$req",l),ie(d,"SID","null"),A.T=!0,jo(A,d,null)):jo(A,d,l),this.G=2}}else this.G==3&&(o?Hu(this,o):this.i.length==0||Pu(this.h)||Hu(this))};function Hu(o,l){var d;l?d=l.l:d=o.U++;const p=it(o.I);ie(p,"SID",o.K),ie(p,"RID",d),ie(p,"AID",o.T),Lr(o,p),o.m&&o.o&&Wo(p,o.m,o.o),d=new It(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),l&&(o.i=l.D.concat(o.i)),l=Qu(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ko(o.h,d),jo(d,p,l)}function Lr(o,l){o.H&&Q(o.H,function(d,p){ie(l,p,d)}),o.l&&ku({},function(d,p){ie(l,p,d)})}function Qu(o,l,d){d=Math.min(o.i.length,d);var p=o.l?_(o.l.Na,o.l,o):null;e:{var A=o.i;let b=-1;for(;;){const x=["count="+d];b==-1?0<d?(b=A[0].g,x.push("ofs="+b)):b=0:x.push("ofs="+b);let re=!0;for(let Ie=0;Ie<d;Ie++){let J=A[Ie].g;const ve=A[Ie].map;if(J-=b,0>J)b=Math.max(0,A[Ie].g-100),re=!1;else try{Jm(ve,x,"req"+J+"_")}catch{p&&p(ve)}}if(re){p=x.join("&");break e}}}return o=o.i.splice(0,d),l.D=o,p}function Ju(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;wr||ou(),vr||(wr(),vr=!0),Po.add(l,o),o.v=0}}function Qo(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Pr(_(o.Fa,o),Zu(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,Xu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Pr(_(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,De(10),Xs(this),Xu(this))};function Jo(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Xu(o){o.g=new It(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=it(o.qa);ie(l,"RID","rpc"),ie(l,"SID",o.K),ie(l,"AID",o.T),ie(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&ie(l,"TO",o.ja),ie(l,"TYPE","xmlhttp"),Lr(o,l),o.m&&o.o&&Wo(l,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Ws(it(l)),d.m=null,d.P=!0,Au(d,o)}r.Za=function(){this.C!=null&&(this.C=null,Xs(this),Qo(this),De(19))};function Zs(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Yu(o,l){var d=null;if(o.g==l){Zs(o),Jo(o),o.g=null;var p=2}else if(Go(o.h,l))d=l.D,Vu(o.h,l),p=1;else return;if(o.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var A=o.B;p=qs(),Ve(p,new Tu(p,d)),Ys(o)}else Ju(o);else if(A=l.s,A==3||A==0&&0<l.X||!(p==1&&eg(o,l)||p==2&&Qo(o)))switch(d&&0<d.length&&(l=o.h,l.i=l.i.concat(d)),A){case 1:Xt(o,5);break;case 4:Xt(o,10);break;case 3:Xt(o,6);break;default:Xt(o,2)}}}function Zu(o,l){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*l}function Xt(o,l){if(o.j.info("Error code "+l),l==2){var d=_(o.fb,o),p=o.Xa;const A=!p;p=new Jt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Gs(p,"https"),Ws(p),A?Wm(p.toString(),d):Hm(p.toString(),d)}else De(2);o.G=0,o.l&&o.l.sa(l),el(o),Wu(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),De(2)):(this.j.info("Failed to ping google.com"),De(1))};function el(o){if(o.G=0,o.ka=[],o.l){const l=Du(o.h);(l.length!=0||o.i.length!=0)&&(D(o.ka,l),D(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function tl(o,l,d){var p=d instanceof Jt?it(d):new Jt(d);if(p.g!="")l&&(p.g=l+"."+p.g),Ks(p,p.s);else{var A=c.location;p=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var b=new Jt(null);p&&Gs(b,p),l&&(b.g=l),A&&Ks(b,A),d&&(b.l=d),p=b}return d=o.D,l=o.ya,d&&l&&ie(p,d,l),ie(p,"VER",o.la),Lr(o,p),p}function nl(o,l,d){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new ce(new Hs({eb:d})):new ce(o.pa),l.Ha(o.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function rl(){}r=rl.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function ei(){}ei.prototype.g=function(o,l){return new Me(o,l)};function Me(o,l){we.call(this),this.g=new Ku(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!q(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!q(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new bn(this)}C(Me,we),Me.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Me.prototype.close=function(){Ho(this.g)},Me.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Mo(o),o=d);l.i.push(new Lm(l.Ya++,o)),l.G==3&&Ys(l)},Me.prototype.N=function(){this.g.l=null,delete this.j,Ho(this.g),delete this.g,Me.aa.N.call(this)};function sl(o){Fo.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const d in l){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}C(sl,Fo);function il(){Uo.call(this),this.status=1}C(il,Uo);function bn(o){this.g=o}C(bn,rl),bn.prototype.ua=function(){Ve(this.g,"a")},bn.prototype.ta=function(o){Ve(this.g,new sl(o))},bn.prototype.sa=function(o){Ve(this.g,new il)},bn.prototype.ra=function(){Ve(this.g,"b")},ei.prototype.createWebChannel=ei.prototype.g,Me.prototype.send=Me.prototype.o,Me.prototype.open=Me.prototype.m,Me.prototype.close=Me.prototype.close,tf=function(){return new ei},ef=function(){return qs()},Zd=Ht,wa={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},js.NO_ERROR=0,js.TIMEOUT=8,js.HTTP_ERROR=6,pi=js,Eu.COMPLETE="complete",Yd=Eu,gu.EventType=Rr,Rr.OPEN="a",Rr.CLOSE="b",Rr.ERROR="c",Rr.MESSAGE="d",we.prototype.listen=we.prototype.K,zr=gu,ce.prototype.listenOnce=ce.prototype.L,ce.prototype.getLastError=ce.prototype.Ka,ce.prototype.getLastErrorCode=ce.prototype.Ba,ce.prototype.getStatus=ce.prototype.Z,ce.prototype.getResponseJson=ce.prototype.Oa,ce.prototype.getResponseText=ce.prototype.oa,ce.prototype.send=ce.prototype.ea,ce.prototype.setWithCredentials=ce.prototype.Ha,Xd=ce}).apply(typeof ri<"u"?ri:typeof self<"u"?self:typeof window<"u"?window:{});const Ol="@firebase/firestore",Ml="4.9.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Re.UNAUTHENTICATED=new Re(null),Re.GOOGLE_CREDENTIALS=new Re("google-credentials-uid"),Re.FIRST_PARTY=new Re("first-party-uid"),Re.MOCK_USER=new Re("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mr="12.0.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=new Qa("@firebase/firestore");function On(){return _n.logLevel}function V(r,...e){if(_n.logLevel<=K.DEBUG){const t=e.map(ac);_n.debug(`Firestore (${mr}): ${r}`,...t)}}function he(r,...e){if(_n.logLevel<=K.ERROR){const t=e.map(ac);_n.error(`Firestore (${mr}): ${r}`,...t)}}function as(r,...e){if(_n.logLevel<=K.WARN){const t=e.map(ac);_n.warn(`Firestore (${mr}): ${r}`,...t)}}function ac(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,nf(r,n,t)}function nf(r,e,t){let n=`FIRESTORE (${mr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw he(n),new Error(n)}function F(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||nf(e,s,n)}function L(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends pt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $I{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class GI{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Re.UNAUTHENTICATED)))}shutdown(){}}class KI{constructor(e){this.t=e,this.currentUser=Re.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){F(this.o===void 0,42304);let n=this.i;const s=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let i=new He;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new He,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=i;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new He)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(F(typeof n.accessToken=="string",31837,{l:n}),new $I(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string",2055,{h:e}),new Re(e)}}class WI{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Re.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class HI{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new WI(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(Re.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Ll{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class QI{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Ge(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){F(this.o===void 0,3512);const n=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>n(i)))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new Ll(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(F(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Ll(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function JI(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=JI(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function z(r,e){return r<e?-1:r>e?1:0}function va(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return ia(s)===ia(i)?z(s,i):ia(s)?1:-1}return z(r.length,e.length)}const XI=55296,YI=57343;function ia(r){const e=r.charCodeAt(0);return e>=XI&&e<=YI}function Wn(r,e,t){return r.length===e.length&&r.every(((n,s)=>t(n,e[s])))}function rf(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl="__name__";class Qe{constructor(e,t,n){t===void 0?t=0:t>e.length&&M(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&M(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Qe.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Qe?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=Qe.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return z(e.length,t.length)}static compareSegments(e,t){const n=Qe.isNumericId(e),s=Qe.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?Qe.extractNumericId(e).compare(Qe.extractNumericId(t)):va(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ot.fromString(e.substring(4,e.length-2))}}class X extends Qe{construct(e,t,n){return new X(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new k(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((s=>s.length>0)))}return new X(t)}static emptyPath(){return new X([])}}const ZI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ae extends Qe{construct(e,t,n){return new ae(e,t,n)}static isValidIdentifier(e){return ZI.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ae.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Fl}static keyField(){return new ae([Fl])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new k(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new k(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new k(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(n+=c,s++):(i(),s++)}if(i(),a)throw new k(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ae(t)}static emptyPath(){return new ae([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(X.fromString(e))}static fromName(e){return new O(X.fromString(e).popFirst(5))}static empty(){return new O(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new X(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sf(r,e,t){if(!t)throw new k(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function eT(r,e,t,n){if(e===!0&&n===!0)throw new k(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Ul(r){if(!O.isDocumentKey(r))throw new k(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Bl(r){if(O.isDocumentKey(r))throw new k(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function of(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function so(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function Ue(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new k(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=so(r);throw new k(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(r,e){const t={typeString:r};return e&&(t.value=e),t}function Ss(r,e){if(!of(r))throw new k(P.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new k(P.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ql=-62135596800,jl=1e6;class Z{static now(){return Z.fromMillis(Date.now())}static fromDate(e){return Z.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*jl);return new Z(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new k(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ql)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/jl}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Z._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ss(e,Z._jsonSchema))return new Z(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ql;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Z._jsonSchemaVersion="firestore/timestamp/1.0",Z._jsonSchema={type:pe("string",Z._jsonSchemaVersion),seconds:pe("number"),nanoseconds:pe("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{static fromTimestamp(e){return new B(e)}static min(){return new B(new Z(0,0))}static max(){return new B(new Z(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hn=-1;class Ni{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function Aa(r){return r.fields.find((e=>e.kind===2))}function en(r){return r.fields.filter((e=>e.kind!==2))}Ni.UNKNOWN_ID=-1;class mi{constructor(e,t){this.fieldPath=e,this.kind=t}}class cs{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new cs(0,qe.min())}}function af(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new Z(t+1,0):new Z(t,n));return new qe(s,O.empty(),e)}function cf(r){return new qe(r.readTime,r.key,Hn)}class qe{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new qe(B.min(),O.empty(),Hn)}static max(){return new qe(B.max(),O.empty(),Hn)}}function uc(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(r.documentKey,e.documentKey),t!==0?t:z(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class lf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $t(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==uf)throw r;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new v(((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof v?t:v.resolve(t)}catch(t){return v.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):v.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):v.reject(t)}static resolve(e){return new v(((t,n)=>{t(e)}))}static reject(e){return new v(((t,n)=>{n(e)}))}static waitFor(e){return new v(((t,n)=>{let s=0,i=0,a=!1;e.forEach((c=>{++s,c.next((()=>{++i,a&&i===s&&t()}),(u=>n(u)))})),a=!0,i===s&&t()}))}static or(e){let t=v.resolve(!1);for(const n of e)t=t.next((s=>s?v.resolve(s):n()));return t}static forEach(e,t){const n=[];return e.forEach(((s,i)=>{n.push(t.call(this,s,i))})),this.waitFor(n)}static mapArray(e,t){return new v(((n,s)=>{const i=e.length,a=new Array(i);let c=0;for(let u=0;u<i;u++){const h=u;t(e[h]).next((f=>{a[h]=f,++c,c===i&&n(a)}),(f=>s(f)))}}))}static doWhile(e,t){return new v(((n,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):n()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le="SimpleDb";class io{static open(e,t,n,s){try{return new io(t,e.transaction(s,n))}catch(i){throw new Jr(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new He,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Jr(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=lc(n.target.error);this.S.reject(new Jr(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(V(Le,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new nT(t)}}class Mt{static delete(e){return V(Le,"Removing database:",e),nn(ad().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!pd())return!1;if(Mt.F())return!0;const e=me(),t=Mt.M(e),n=0<t&&t<10,s=hf(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.B=null,Mt.M(me())===12.2&&he("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(V(Le,"Opening database:",this.name),this.db=await new Promise(((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;t(a)},s.onblocked=()=>{n(new Jr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new k(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new k(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new Jr(e,a))},s.onupgradeneeded=i=>{V(Le,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;this.N.k(a,s.transaction,i.oldVersion,this.version).next((()=>{V(Le,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}$(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let a=0;for(;;){++a;try{this.db=await this.L(e);const c=io.open(this.db,e,i?"readonly":"readwrite",n),u=s(c).next((h=>(c.C(),h))).catch((h=>(c.abort(h),v.reject(h)))).toPromise();return u.catch((()=>{})),await c.D,u}catch(c){const u=c,h=u.name!=="FirebaseError"&&a<3;if(V(Le,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function hf(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class tT{constructor(e){this.U=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.U=e}done(){this.K=!0}j(e){this.W=e}delete(){return nn(this.U.delete())}}class Jr extends k{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Gt(r){return r.name==="IndexedDbTransactionError"}class nT{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(V(Le,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(V(Le,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),nn(n)}add(e){return V(Le,"ADD",this.store.name,e,e),nn(this.store.add(e))}get(e){return nn(this.store.get(e)).next((t=>(t===void 0&&(t=null),V(Le,"GET",this.store.name,e,t),t)))}delete(e){return V(Le,"DELETE",this.store.name,e),nn(this.store.delete(e))}count(){return V(Le,"COUNT",this.store.name),nn(this.store.count())}J(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v(((a,c)=>{i.onerror=u=>{c(u.target.error)},i.onsuccess=u=>{a(u.target.result)}}))}{const i=this.cursor(n),a=[];return this.H(i,((c,u)=>{a.push(u)})).next((()=>a))}}Y(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new v(((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}}))}Z(e,t){V(Le,"DELETE ALL",this.store.name);const n=this.options(e,t);n.X=!1;const s=this.cursor(n);return this.H(s,((i,a,c)=>c.delete()))}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.H(s,t)}te(e){const t=this.cursor({});return new v(((n,s)=>{t.onerror=i=>{const a=lc(i.target.error);s(a)},t.onsuccess=i=>{const a=i.target.result;a?e(a.primaryKey,a.value).next((c=>{c?a.continue():n()})):n()}}))}H(e,t){const n=[];return new v(((s,i)=>{e.onerror=a=>{i(a.target.error)},e.onsuccess=a=>{const c=a.target.result;if(!c)return void s();const u=new tT(c),h=t(c.primaryKey,c.value,u);if(h instanceof v){const f=h.catch((m=>(u.done(),v.reject(m))));n.push(f)}u.isDone?s():u.G===null?c.continue():c.continue(u.G)}})).next((()=>v.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.X?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function nn(r){return new v(((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=lc(n.target.error);t(s)}}))}let zl=!1;function lc(r){const e=Mt.M(me());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new k("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return zl||(zl=!0,setTimeout((()=>{throw n}),0)),n}}return r}const Xr="IndexBackfiller";class rT{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){V(Xr,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();V(Xr,`Documents written: ${t}`)}catch(t){Gt(t)?V(Xr,"Ignoring IndexedDB error during index backfill: ",t):await $t(t)}await this.re(6e4)}))}}class sT{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const n=new Set;let s=t,i=!0;return v.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((a=>{if(a!==null&&!n.has(a))return V(Xr,`Processing collection: ${a}`),this.oe(e,a,s).next((c=>{s-=c,n.add(a)}));i=!1})))).next((()=>t-s))}oe(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next((i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(e,a).next((()=>this._e(s,i))).next((c=>(V(Xr,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>a.size))}))))}_e(e,t){let n=e;return t.changes.forEach(((s,i)=>{const a=cf(i);uc(a,n)>0&&(n=a)})),new qe(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ne{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Ne.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ln=-1;function oo(r){return r==null}function us(r){return r===0&&1/r==-1/0}function df(r){return typeof r=="number"&&Number.isInteger(r)&&!us(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xi="";function Ce(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=$l(e)),e=iT(r.get(t),e);return $l(e)}function iT(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case xi:t+="";break;default:t+=i}}return t}function $l(r){return r+xi+""}function Xe(r){const e=r.length;if(F(e>=2,64408,{path:r}),e===2)return F(r.charAt(0)===xi&&r.charAt(1)==="",56145,{path:r}),X.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const a=r.indexOf(xi,i);switch((a<0||a>t)&&M(50515,{path:r}),r.charAt(a+1)){case"":const c=r.substring(i,a);let u;s.length===0?u=c:(s+=c,u=s,s=""),n.push(u);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:M(61167,{path:r})}i=a+2}return new X(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn="remoteDocuments",Rs="owner",Cn="owner",ls="mutationQueues",oT="userId",$e="mutations",Gl="batchId",cn="userMutationsIndex",Kl=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gi(r,e){return[r,Ce(e)]}function ff(r,e,t){return[r,Ce(e),t]}const aT={},Qn="documentMutations",Oi="remoteDocumentsV14",cT=["prefixPath","collectionGroup","readTime","documentId"],_i="documentKeyIndex",uT=["prefixPath","collectionGroup","documentId"],pf="collectionGroupIndex",lT=["collectionGroup","readTime","prefixPath","documentId"],hs="remoteDocumentGlobal",Sa="remoteDocumentGlobalKey",Jn="targets",mf="queryTargetsIndex",hT=["canonicalId","targetId"],Xn="targetDocuments",dT=["targetId","path"],hc="documentTargetsIndex",fT=["path","targetId"],Mi="targetGlobalKey",hn="targetGlobal",ds="collectionParents",pT=["collectionId","parent"],Yn="clientMetadata",mT="clientId",ao="bundles",gT="bundleId",co="namedQueries",_T="name",dc="indexConfiguration",yT="indexId",Ra="collectionGroupIndex",IT="collectionGroup",Yr="indexState",TT=["indexId","uid"],gf="sequenceNumberIndex",ET=["uid","sequenceNumber"],Zr="indexEntries",wT=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],_f="documentKeyIndex",vT=["indexId","uid","orderedDocumentKey"],uo="documentOverlays",AT=["userId","collectionPath","documentId"],ba="collectionPathOverlayIndex",ST=["userId","collectionPath","largestBatchId"],yf="collectionGroupOverlayIndex",RT=["userId","collectionGroup","largestBatchId"],fc="globals",bT="name",If=[ls,$e,Qn,tn,Jn,Rs,hn,Xn,Yn,hs,ds,ao,co],PT=[...If,uo],Tf=[ls,$e,Qn,Oi,Jn,Rs,hn,Xn,Yn,hs,ds,ao,co,uo],Ef=Tf,pc=[...Ef,dc,Yr,Zr],CT=pc,wf=[...pc,fc],VT=wf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa extends lf{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function ge(r,e){const t=L(r);return Mt.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Kt(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function vf(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||Te.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Te.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Te.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new si(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new si(this.root,e,this.comparator,!1)}getReverseIterator(){return new si(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new si(this.root,e,this.comparator,!0)}}class si{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Te{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Te.RED,this.left=s??Te.EMPTY,this.right=i??Te.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Te(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Te.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Te.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Te.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Te.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}}Te.EMPTY=null,Te.RED=!0,Te.BLACK=!1;Te.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Te(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Hl(this.data.getIterator())}getIteratorFrom(e){return new Hl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof te)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new te(this.comparator);return t.data=e,t}}class Hl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Vn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xe{constructor(e){this.fields=e,e.sort(ae.comparator)}static empty(){return new xe([])}unionWith(e){let t=new te(ae.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new xe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Wn(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Af("Invalid base64 string: "+i):i}})(e);return new de(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i})(e);return new de(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}de.EMPTY_BYTE_STRING=new de("");const DT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function dt(r){if(F(!!r,39018),typeof r=="string"){let e=0;const t=DT.exec(r);if(F(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:oe(r.seconds),nanos:oe(r.nanos)}}function oe(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ft(r){return typeof r=="string"?de.fromBase64String(r):de.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf="server_timestamp",Rf="__type__",bf="__previous_value__",Pf="__local_write_time__";function mc(r){return(r?.mapValue?.fields||{})[Rf]?.stringValue===Sf}function lo(r){const e=r.mapValue.fields[bf];return mc(e)?lo(e):e}function fs(r){const e=dt(r.mapValue.fields[Pf].timestampValue);return new Z(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kT{constructor(e,t,n,s,i,a,c,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const Li="(default)";class yn{constructor(e,t){this.projectId=e,this.database=t||Li}static empty(){return new yn("","")}get isDefaultDatabase(){return this.database===Li}isEqual(e){return e instanceof yn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gc="__type__",Cf="__max__",Dt={mapValue:{fields:{__type__:{stringValue:Cf}}}},_c="__vector__",Zn="value",yi={nullValue:"NULL_VALUE"};function Ut(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?mc(r)?4:Vf(r)?9007199254740991:ho(r)?10:11:M(28295,{value:r})}function rt(r,e){if(r===e)return!0;const t=Ut(r);if(t!==Ut(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return fs(r).isEqual(fs(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=dt(s.timestampValue),c=dt(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(s,i){return ft(s.bytesValue).isEqual(ft(i.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(s,i){return oe(s.geoPointValue.latitude)===oe(i.geoPointValue.latitude)&&oe(s.geoPointValue.longitude)===oe(i.geoPointValue.longitude)})(r,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return oe(s.integerValue)===oe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=oe(s.doubleValue),c=oe(i.doubleValue);return a===c?us(a)===us(c):isNaN(a)&&isNaN(c)}return!1})(r,e);case 9:return Wn(r.arrayValue.values||[],e.arrayValue.values||[],rt);case 10:case 11:return(function(s,i){const a=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Wl(a)!==Wl(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!rt(a[u],c[u])))return!1;return!0})(r,e);default:return M(52216,{left:r})}}function ps(r,e){return(r.values||[]).find((t=>rt(t,e)))!==void 0}function Bt(r,e){if(r===e)return 0;const t=Ut(r),n=Ut(e);if(t!==n)return z(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(r.booleanValue,e.booleanValue);case 2:return(function(i,a){const c=oe(i.integerValue||i.doubleValue),u=oe(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(r,e);case 3:return Ql(r.timestampValue,e.timestampValue);case 4:return Ql(fs(r),fs(e));case 5:return va(r.stringValue,e.stringValue);case 6:return(function(i,a){const c=ft(i),u=ft(a);return c.compareTo(u)})(r.bytesValue,e.bytesValue);case 7:return(function(i,a){const c=i.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=z(c[h],u[h]);if(f!==0)return f}return z(c.length,u.length)})(r.referenceValue,e.referenceValue);case 8:return(function(i,a){const c=z(oe(i.latitude),oe(a.latitude));return c!==0?c:z(oe(i.longitude),oe(a.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return Jl(r.arrayValue,e.arrayValue);case 10:return(function(i,a){const c=i.fields||{},u=a.fields||{},h=c[Zn]?.arrayValue,f=u[Zn]?.arrayValue,m=z(h?.values?.length||0,f?.values?.length||0);return m!==0?m:Jl(h,f)})(r.mapValue,e.mapValue);case 11:return(function(i,a){if(i===Dt.mapValue&&a===Dt.mapValue)return 0;if(i===Dt.mapValue)return 1;if(a===Dt.mapValue)return-1;const c=i.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const _=va(u[m],f[m]);if(_!==0)return _;const R=Bt(c[u[m]],h[f[m]]);if(R!==0)return R}return z(u.length,f.length)})(r.mapValue,e.mapValue);default:throw M(23264,{he:t})}}function Ql(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return z(r,e);const t=dt(r),n=dt(e),s=z(t.seconds,n.seconds);return s!==0?s:z(t.nanos,n.nanos)}function Jl(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=Bt(t[s],n[s]);if(i)return i}return z(t.length,n.length)}function er(r){return Ca(r)}function Ca(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=dt(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return ft(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return O.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=Ca(i);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${Ca(t.fields[a])}`;return s+"}"})(r.mapValue):M(61005,{value:r})}function Ii(r){switch(Ut(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=lo(r);return e?16+Ii(e):16;case 5:return 2*r.stringValue.length;case 6:return ft(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return(function(n){return(n.values||[]).reduce(((s,i)=>s+Ii(i)),0)})(r.arrayValue);case 10:case 11:return(function(n){let s=0;return Kt(n.fields,((i,a)=>{s+=i.length+Ii(a)})),s})(r.mapValue);default:throw M(13486,{value:r})}}function ms(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Va(r){return!!r&&"integerValue"in r}function gs(r){return!!r&&"arrayValue"in r}function Xl(r){return!!r&&"nullValue"in r}function Yl(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ti(r){return!!r&&"mapValue"in r}function ho(r){return(r?.mapValue?.fields||{})[gc]?.stringValue===_c}function es(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return Kt(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=es(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=es(r.arrayValue.values[t]);return e}return{...r}}function Vf(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Cf}const Df={mapValue:{fields:{[gc]:{stringValue:_c},[Zn]:{arrayValue:{}}}}};function NT(r){return"nullValue"in r?yi:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?ms(yn.empty(),O.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?ho(r)?Df:{mapValue:{}}:M(35942,{value:r})}function xT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?ms(yn.empty(),O.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Df:"mapValue"in r?ho(r)?{mapValue:{}}:Dt:M(61959,{value:r})}function Zl(r,e){const t=Bt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function eh(r,e){const t=Bt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.value=e}static empty(){return new Pe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Ti(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=es(t)}setAll(e){let t=ae.emptyPath(),n={},s=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,s),n={},s=[],t=c.popLast()}a?n[c.lastSegment()]=es(a):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Ti(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return rt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Ti(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Kt(t,((s,i)=>e[s]=i));for(const s of n)delete e[s]}clone(){return new Pe(es(this.value))}}function kf(r){const e=[];return Kt(r.fields,((t,n)=>{const s=new ae([t]);if(Ti(n)){const i=kf(n.mapValue).fields;if(i.length===0)e.push(s);else for(const a of i)e.push(s.child(a))}else e.push(s)})),new xe(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,t,n,s,i,a,c){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=c}static newInvalidDocument(e){return new ue(e,0,B.min(),B.min(),B.min(),Pe.empty(),0)}static newFoundDocument(e,t,n,s){return new ue(e,1,t,B.min(),n,s,0)}static newNoDocument(e,t){return new ue(e,2,t,B.min(),B.min(),Pe.empty(),0)}static newUnknownDocument(e,t){return new ue(e,3,t,B.min(),B.min(),Pe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Pe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Pe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ue&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ue(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,t){this.position=e,this.inclusive=t}}function th(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],a=r.position[s];if(i.field.isKeyField()?n=O.comparator(O.fromName(a.referenceValue),t.key):n=Bt(a,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function nh(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!rt(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s{constructor(e,t="asc"){this.field=e,this.dir=t}}function OT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{}class W extends Nf{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new MT(e,t,n):t==="array-contains"?new UT(e,n):t==="in"?new Uf(e,n):t==="not-in"?new BT(e,n):t==="array-contains-any"?new qT(e,n):new W(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new LT(e,n):new FT(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Bt(t,this.value)):t!==null&&Ut(this.value)===Ut(t)&&this.matchesComparison(Bt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ee extends Nf{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ee(e,t)}matches(e){return nr(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function nr(r){return r.op==="and"}function Da(r){return r.op==="or"}function yc(r){return xf(r)&&nr(r)}function xf(r){for(const e of r.filters)if(e instanceof ee)return!1;return!0}function ka(r){if(r instanceof W)return r.field.canonicalString()+r.op.toString()+er(r.value);if(yc(r))return r.filters.map((e=>ka(e))).join(",");{const e=r.filters.map((t=>ka(t))).join(",");return`${r.op}(${e})`}}function Of(r,e){return r instanceof W?(function(n,s){return s instanceof W&&n.op===s.op&&n.field.isEqual(s.field)&&rt(n.value,s.value)})(r,e):r instanceof ee?(function(n,s){return s instanceof ee&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce(((i,a,c)=>i&&Of(a,s.filters[c])),!0):!1})(r,e):void M(19439)}function Mf(r,e){const t=r.filters.concat(e);return ee.create(t,r.op)}function Lf(r){return r instanceof W?(function(t){return`${t.field.canonicalString()} ${t.op} ${er(t.value)}`})(r):r instanceof ee?(function(t){return t.op.toString()+" {"+t.getFilters().map(Lf).join(" ,")+"}"})(r):"Filter"}class MT extends W{constructor(e,t,n){super(e,t,n),this.key=O.fromName(n.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class LT extends W{constructor(e,t){super(e,"in",t),this.keys=Ff("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class FT extends W{constructor(e,t){super(e,"not-in",t),this.keys=Ff("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function Ff(r,e){return(e.arrayValue?.values||[]).map((t=>O.fromName(t.referenceValue)))}class UT extends W{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return gs(t)&&ps(t.arrayValue,this.value)}}class Uf extends W{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ps(this.value.arrayValue,t)}}class BT extends W{constructor(e,t){super(e,"not-in",t)}matches(e){if(ps(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ps(this.value.arrayValue,t)}}class qT extends W{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!gs(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>ps(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jT{constructor(e,t=null,n=[],s=[],i=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=c,this.Te=null}}function Na(r,e=null,t=[],n=[],s=null,i=null,a=null){return new jT(r,e,t,n,s,i,a)}function In(r){const e=L(r);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>ka(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(i){return i.field.canonicalString()+i.dir})(n))).join(","),oo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>er(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>er(n))).join(",")),e.Te=t}return e.Te}function bs(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!OT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Of(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!nh(r.startAt,e.startAt)&&nh(r.endAt,e.endAt)}function Fi(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Ui(r,e){return r.filters.filter((t=>t instanceof W&&t.field.isEqual(e)))}function rh(r,e,t){let n=yi,s=!0;for(const i of Ui(r,e)){let a=yi,c=!0;switch(i.op){case"<":case"<=":a=NT(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,c=!1;break;case"!=":case"not-in":a=yi}Zl({value:n,inclusive:s},{value:a,inclusive:c})<0&&(n=a,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const a=t.position[i];Zl({value:n,inclusive:s},{value:a,inclusive:t.inclusive})<0&&(n=a,s=t.inclusive);break}}return{value:n,inclusive:s}}function sh(r,e,t){let n=Dt,s=!0;for(const i of Ui(r,e)){let a=Dt,c=!0;switch(i.op){case">=":case">":a=xT(i.value),c=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,c=!1;break;case"!=":case"not-in":a=Dt}eh({value:n,inclusive:s},{value:a,inclusive:c})>0&&(n=a,s=c)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const a=t.position[i];eh({value:n,inclusive:s},{value:a,inclusive:t.inclusive})>0&&(n=a,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(e,t=null,n=[],s=[],i=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=c,this.endAt=u,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Bf(r,e,t,n,s,i,a,c){return new gr(r,e,t,n,s,i,a,c)}function Ps(r){return new gr(r)}function ih(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function qf(r){return r.collectionGroup!==null}function ts(r){const e=L(r);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new te(ae.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new _s(i,n))})),t.has(ae.keyField().canonicalString())||e.Ie.push(new _s(ae.keyField(),n))}return e.Ie}function Be(r){const e=L(r);return e.Ee||(e.Ee=zT(e,ts(r))),e.Ee}function zT(r,e){if(r.limitType==="F")return Na(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new _s(s.field,i)}));const t=r.endAt?new tr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new tr(r.startAt.position,r.startAt.inclusive):null;return Na(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function xa(r,e){const t=r.filters.concat([e]);return new gr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function Oa(r,e,t){return new gr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function fo(r,e){return bs(Be(r),Be(e))&&r.limitType===e.limitType}function jf(r){return`${In(Be(r))}|lt:${r.limitType}`}function Mn(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((s=>Lf(s))).join(", ")}]`),oo(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((s=>er(s))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((s=>er(s))).join(",")),`Target(${n})`})(Be(r))}; limitType=${r.limitType})`}function Cs(r,e){return e.isFoundDocument()&&(function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):O.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)})(r,e)&&(function(n,s){for(const i of ts(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(r,e)&&(function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0})(r,e)&&(function(n,s){return!(n.startAt&&!(function(a,c,u){const h=th(a,c,u);return a.inclusive?h<=0:h<0})(n.startAt,ts(n),s)||n.endAt&&!(function(a,c,u){const h=th(a,c,u);return a.inclusive?h>=0:h>0})(n.endAt,ts(n),s))})(r,e)}function zf(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function $f(r){return(e,t)=>{let n=!1;for(const s of ts(r)){const i=$T(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function $T(r,e,t){const n=r.field.isKeyField()?O.comparator(e.key,t.key):(function(i,a,c){const u=a.data.field(i),h=c.data.field(i);return u!==null&&h!==null?Bt(u,h):M(42886)})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Kt(this.inner,((t,n)=>{for(const[s,i]of n)e(s,i)}))}isEmpty(){return vf(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GT=new se(O.comparator);function Fe(){return GT}const Gf=new se(O.comparator);function $r(...r){let e=Gf;for(const t of r)e=e.insert(t.key,t);return e}function Kf(r){let e=Gf;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function Ye(){return ns()}function Wf(){return ns()}function ns(){return new mt((r=>r.toString()),((r,e)=>r.isEqual(e)))}const KT=new se(O.comparator),WT=new te(O.comparator);function G(...r){let e=WT;for(const t of r)e=e.add(t);return e}const HT=new te(z);function Ic(){return HT}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tc(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:us(e)?"-0":e}}function Hf(r){return{integerValue:""+r}}function Qf(r,e){return df(e)?Hf(e):Tc(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po{constructor(){this._=void 0}}function QT(r,e,t){return r instanceof rr?(function(s,i){const a={fields:{[Rf]:{stringValue:Sf},[Pf]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&mc(i)&&(i=lo(i)),i&&(a.fields[bf]=i),{mapValue:a}})(t,e):r instanceof sr?Xf(r,e):r instanceof ir?Yf(r,e):(function(s,i){const a=Jf(s,i),c=oh(a)+oh(s.Ae);return Va(a)&&Va(s.Ae)?Hf(c):Tc(s.serializer,c)})(r,e)}function JT(r,e,t){return r instanceof sr?Xf(r,e):r instanceof ir?Yf(r,e):t}function Jf(r,e){return r instanceof or?(function(n){return Va(n)||(function(i){return!!i&&"doubleValue"in i})(n)})(e)?e:{integerValue:0}:null}class rr extends po{}class sr extends po{constructor(e){super(),this.elements=e}}function Xf(r,e){const t=Zf(e);for(const n of r.elements)t.some((s=>rt(s,n)))||t.push(n);return{arrayValue:{values:t}}}class ir extends po{constructor(e){super(),this.elements=e}}function Yf(r,e){let t=Zf(e);for(const n of r.elements)t=t.filter((s=>!rt(s,n)));return{arrayValue:{values:t}}}class or extends po{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function oh(r){return oe(r.integerValue||r.doubleValue)}function Zf(r){return gs(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ec{constructor(e,t){this.field=e,this.transform=t}}function XT(r,e){return r.field.isEqual(e.field)&&(function(n,s){return n instanceof sr&&s instanceof sr||n instanceof ir&&s instanceof ir?Wn(n.elements,s.elements,rt):n instanceof or&&s instanceof or?rt(n.Ae,s.Ae):n instanceof rr&&s instanceof rr})(r.transform,e.transform)}class YT{constructor(e,t){this.version=e,this.transformResults=t}}class Oe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Oe}static exists(e){return new Oe(void 0,e)}static updateTime(e){return new Oe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ei(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class mo{}function ep(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new wc(r.key,Oe.none()):new _r(r.key,r.data,Oe.none());{const t=r.data,n=Pe.empty();let s=new te(ae.comparator);for(let i of e.fields)if(!s.has(i)){let a=t.field(i);a===null&&i.length>1&&(i=i.popLast(),a=t.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new gt(r.key,n,new xe(s.toArray()),Oe.none())}}function ZT(r,e,t){r instanceof _r?(function(s,i,a){const c=s.value.clone(),u=ch(s.fieldTransforms,i,a.transformResults);c.setAll(u),i.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(r,e,t):r instanceof gt?(function(s,i,a){if(!Ei(s.precondition,i))return void i.convertToUnknownDocument(a.version);const c=ch(s.fieldTransforms,i,a.transformResults),u=i.data;u.setAll(tp(s)),u.setAll(c),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(r,e,t):(function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function rs(r,e,t,n){return r instanceof _r?(function(i,a,c,u){if(!Ei(i.precondition,a))return c;const h=i.value.clone(),f=uh(i.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null})(r,e,t,n):r instanceof gt?(function(i,a,c,u){if(!Ei(i.precondition,a))return c;const h=uh(i.fieldTransforms,u,a),f=a.data;return f.setAll(tp(i)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((m=>m.field)))})(r,e,t,n):(function(i,a,c){return Ei(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(r,e,t)}function eE(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=Jf(n.transform,s||null);i!=null&&(t===null&&(t=Pe.empty()),t.set(n.field,i))}return t||null}function ah(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Wn(n,s,((i,a)=>XT(i,a)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class _r extends mo{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class gt extends mo{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function tp(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function ch(r,e,t){const n=new Map;F(r.length===t.length,32656,{Re:t.length,Ve:r.length});for(let s=0;s<t.length;s++){const i=r[s],a=i.transform,c=e.data.field(i.field);n.set(i.field,JT(a,c,t[s]))}return n}function uh(r,e,t){const n=new Map;for(const s of r){const i=s.transform,a=t.data.field(s.field);n.set(s.field,QT(i,a,e))}return n}class wc extends mo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class np extends mo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&ZT(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=rs(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=rs(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Wf();return this.mutations.forEach((s=>{const i=e.get(s.key),a=i.overlayedDocument;let c=this.applyToLocalView(a,i.mutatedFields);c=t.has(s.key)?null:c;const u=ep(a,c);u!==null&&n.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(B.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),G())}isEqual(e){return this.batchId===e.batchId&&Wn(this.mutations,e.mutations,((t,n)=>ah(t,n)))&&Wn(this.baseMutations,e.baseMutations,((t,n)=>ah(t,n)))}}class Ac{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){F(e.mutations.length===n.length,58842,{me:e.mutations.length,fe:n.length});let s=(function(){return KT})();const i=e.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new Ac(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var fe,H;function nE(r){switch(r){case P.OK:return M(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function rp(r){if(r===void 0)return he("GRPC error has no .code"),P.UNKNOWN;switch(r){case fe.OK:return P.OK;case fe.CANCELLED:return P.CANCELLED;case fe.UNKNOWN:return P.UNKNOWN;case fe.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case fe.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case fe.INTERNAL:return P.INTERNAL;case fe.UNAVAILABLE:return P.UNAVAILABLE;case fe.UNAUTHENTICATED:return P.UNAUTHENTICATED;case fe.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case fe.NOT_FOUND:return P.NOT_FOUND;case fe.ALREADY_EXISTS:return P.ALREADY_EXISTS;case fe.PERMISSION_DENIED:return P.PERMISSION_DENIED;case fe.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case fe.ABORTED:return P.ABORTED;case fe.OUT_OF_RANGE:return P.OUT_OF_RANGE;case fe.UNIMPLEMENTED:return P.UNIMPLEMENTED;case fe.DATA_LOSS:return P.DATA_LOSS;default:return M(39323,{code:r})}}(H=fe||(fe={}))[H.OK=0]="OK",H[H.CANCELLED=1]="CANCELLED",H[H.UNKNOWN=2]="UNKNOWN",H[H.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",H[H.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",H[H.NOT_FOUND=5]="NOT_FOUND",H[H.ALREADY_EXISTS=6]="ALREADY_EXISTS",H[H.PERMISSION_DENIED=7]="PERMISSION_DENIED",H[H.UNAUTHENTICATED=16]="UNAUTHENTICATED",H[H.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",H[H.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",H[H.ABORTED=10]="ABORTED",H[H.OUT_OF_RANGE=11]="OUT_OF_RANGE",H[H.UNIMPLEMENTED=12]="UNIMPLEMENTED",H[H.INTERNAL=13]="INTERNAL",H[H.UNAVAILABLE=14]="UNAVAILABLE",H[H.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rE(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sE=new Ot([4294967295,4294967295],0);function lh(r){const e=rE().encode(r),t=new Jd;return t.update(e),new Uint8Array(t.digest())}function hh(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Ot([t,n],0),new Ot([s,i],0)]}class Rc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Gr(`Invalid padding: ${t}`);if(n<0)throw new Gr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Gr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Gr(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=Ot.fromNumber(this.ge)}ye(e,t,n){let s=e.add(t.multiply(Ot.fromNumber(n)));return s.compare(sE)===1&&(s=new Ot([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=lh(e),[n,s]=hh(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);if(!this.we(a))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),a=new Rc(i,s,t);return n.forEach((c=>a.insert(c))),a}insert(e){if(this.ge===0)return;const t=lh(e),[n,s]=hh(t);for(let i=0;i<this.hashCount;i++){const a=this.ye(n,s,i);this.Se(a)}}Se(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Gr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e,t,n,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,Ds.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Vs(B.min(),s,new se(z),Fe(),G())}}class Ds{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Ds(n,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e,t,n,s){this.be=e,this.removedTargetIds=t,this.key=n,this.De=s}}class sp{constructor(e,t){this.targetId=e,this.Ce=t}}class ip{constructor(e,t,n=de.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class dh{constructor(){this.ve=0,this.Fe=fh(),this.Me=de.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=G(),t=G(),n=G();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:M(38017,{changeType:i})}})),new Ds(this.Me,this.xe,e,t,n)}qe(){this.Oe=!1,this.Fe=fh()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,F(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class iE{constructor(e){this.Ge=e,this.ze=new Map,this.je=Fe(),this.Je=ii(),this.He=ii(),this.Ye=new se(z)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const n=this.nt(t);switch(e.state){case 0:this.rt(t)&&n.Le(e.resumeToken);break;case 1:n.Ke(),n.Ne||n.qe(),n.Le(e.resumeToken);break;case 2:n.Ke(),n.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(n.We(),n.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),n.Le(e.resumeToken));break;default:M(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((n,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,n=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(Fi(i))if(n===0){const a=new O(i.path);this.et(t,a,ue.newNoDocument(a,B.min()))}else F(n===1,20013,{expectedCount:n});else{const a=this._t(t);if(a!==n){const c=this.ut(e),u=c?this.ct(c,e,a):1;if(u!==0){this.it(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let a,c;try{a=ft(n).toUint8Array()}catch(u){if(u instanceof Af)return as("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Rc(a,s,i)}catch(u){return as(u instanceof Gr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.ge===0?null:c}ct(e,t,n){return t.Ce.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.Ge.getRemoteKeysForTarget(t);let s=0;return n.forEach((i=>{const a=this.Ge.ht(),c=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,a)=>{const c=this.ot(a);if(c){if(i.current&&Fi(c.target)){const u=new O(c.target.path);this.It(u).has(a)||this.Et(a,u)||this.et(a,u,ue.newNoDocument(u,e))}i.Be&&(t.set(a,i.ke()),i.qe())}}));let n=G();this.He.forEach(((i,a)=>{let c=!0;a.forEachWhile((u=>{const h=this.ot(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(i))})),this.je.forEach(((i,a)=>a.setReadTime(e)));const s=new Vs(e,t,this.Ye,this.je,n);return this.je=Fe(),this.Je=ii(),this.He=ii(),this.Ye=new se(z),s}Xe(e,t){if(!this.rt(e))return;const n=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,n),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,n){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),n&&(this.je=this.je.insert(t,n))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new dh,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new te(z),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new te(z),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new dh),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function ii(){return new se(O.comparator)}function fh(){return new se(O.comparator)}const oE={asc:"ASCENDING",desc:"DESCENDING"},aE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},cE={and:"AND",or:"OR"};class uE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Ma(r,e){return r.useProto3Json||oo(e)?e:{value:e}}function ar(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function op(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function lE(r,e){return ar(r,e.toTimestamp())}function ke(r){return F(!!r,49232),B.fromTimestamp((function(t){const n=dt(t);return new Z(n.seconds,n.nanos)})(r))}function bc(r,e){return La(r,e).canonicalString()}function La(r,e){const t=(function(s){return new X(["projects",s.projectId,"databases",s.database])})(r).child("documents");return e===void 0?t:t.child(e)}function ap(r){const e=X.fromString(r);return F(gp(e),10190,{key:e.toString()}),e}function Bi(r,e){return bc(r.databaseId,e.path)}function dn(r,e){const t=ap(e);if(t.get(1)!==r.databaseId.projectId)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new k(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new O(lp(t))}function cp(r,e){return bc(r.databaseId,e)}function up(r){const e=ap(r);return e.length===4?X.emptyPath():lp(e)}function Fa(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function lp(r){return F(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function ph(r,e,t){return{name:Bi(r,e),fields:t.value.mapValue.fields}}function hE(r,e,t){const n=dn(r,e.name),s=ke(e.updateTime),i=e.createTime?ke(e.createTime):B.min(),a=new Pe({mapValue:{fields:e.fields}}),c=ue.newFoundDocument(n,s,i,a);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function dE(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:M(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(F(f===void 0||typeof f=="string",58123),de.fromBase64String(f||"")):(F(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),de.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(h){const f=h.code===void 0?P.UNKNOWN:rp(h.code);return new k(f,h.message||"")})(a);t=new ip(n,s,i,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=dn(r,n.document.name),i=ke(n.document.updateTime),a=n.document.createTime?ke(n.document.createTime):B.min(),c=new Pe({mapValue:{fields:n.document.fields}}),u=ue.newFoundDocument(s,i,a,c),h=n.targetIds||[],f=n.removedTargetIds||[];t=new wi(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=dn(r,n.document),i=n.readTime?ke(n.readTime):B.min(),a=ue.newNoDocument(s,i),c=n.removedTargetIds||[];t=new wi([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=dn(r,n.document),i=n.removedTargetIds||[];t=new wi([],i,s,null)}else{if(!("filter"in e))return M(11601,{Rt:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new tE(s,i),c=n.targetId;t=new sp(c,a)}}return t}function qi(r,e){let t;if(e instanceof _r)t={update:ph(r,e.key,e.value)};else if(e instanceof wc)t={delete:Bi(r,e.key)};else if(e instanceof gt)t={update:ph(r,e.key,e.data),updateMask:yE(e.fieldMask)};else{if(!(e instanceof np))return M(16599,{Vt:e.type});t={verify:Bi(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(i,a){const c=a.transform;if(c instanceof rr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof sr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ir)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof or)return{fieldPath:a.field.canonicalString(),increment:c.Ae};throw M(20930,{transform:a.transform})})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:lE(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)})(r,e.precondition)),t}function Ua(r,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?Oe.updateTime(ke(i.updateTime)):i.exists!==void 0?Oe.exists(i.exists):Oe.none()})(e.currentDocument):Oe.none(),n=e.updateTransforms?e.updateTransforms.map((s=>(function(a,c){let u=null;if("setToServerValue"in c)F(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),u=new rr;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new sr(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new ir(f)}else"increment"in c?u=new or(a,c.increment):M(16584,{proto:c});const h=ae.fromServerFormat(c.fieldPath);return new Ec(h,u)})(r,s))):[];if(e.update){e.update.name;const s=dn(r,e.update.name),i=new Pe({mapValue:{fields:e.update.fields}});if(e.updateMask){const a=(function(u){const h=u.fieldPaths||[];return new xe(h.map((f=>ae.fromServerFormat(f))))})(e.updateMask);return new gt(s,i,a,t,n)}return new _r(s,i,t,n)}if(e.delete){const s=dn(r,e.delete);return new wc(s,t)}if(e.verify){const s=dn(r,e.verify);return new np(s,t)}return M(1463,{proto:e})}function fE(r,e){return r&&r.length>0?(F(e!==void 0,14353),r.map((t=>(function(s,i){let a=s.updateTime?ke(s.updateTime):ke(i);return a.isEqual(B.min())&&(a=ke(i)),new YT(a,s.transformResults||[])})(t,e)))):[]}function hp(r,e){return{documents:[cp(r,e.path)]}}function dp(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=cp(r,s);const i=(function(h){if(h.length!==0)return mp(ee.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const a=(function(h){if(h.length!==0)return h.map((f=>(function(_){return{field:Ln(_.field),direction:mE(_.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Ma(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function fp(r){let e=up(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){F(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(m){const _=pp(m);return _ instanceof ee&&yc(_)?_.getFilters():[_]})(t.where));let a=[];t.orderBy&&(a=(function(m){return m.map((_=>(function(C){return new _s(Fn(C.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(C.direction))})(_)))})(t.orderBy));let c=null;t.limit&&(c=(function(m){let _;return _=typeof m=="object"?m.value:m,oo(_)?null:_})(t.limit));let u=null;t.startAt&&(u=(function(m){const _=!!m.before,R=m.values||[];return new tr(R,_)})(t.startAt));let h=null;return t.endAt&&(h=(function(m){const _=!m.before,R=m.values||[];return new tr(R,_)})(t.endAt)),Bf(e,s,a,i,c,"F",u,h)}function pE(r,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function pp(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Fn(t.unaryFilter.field);return W.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Fn(t.unaryFilter.field);return W.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Fn(t.unaryFilter.field);return W.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Fn(t.unaryFilter.field);return W.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}})(r):r.fieldFilter!==void 0?(function(t){return W.create(Fn(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ee.create(t.compositeFilter.filters.map((n=>pp(n))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}})(t.compositeFilter.op))})(r):M(30097,{filter:r})}function mE(r){return oE[r]}function gE(r){return aE[r]}function _E(r){return cE[r]}function Ln(r){return{fieldPath:r.canonicalString()}}function Fn(r){return ae.fromServerFormat(r.fieldPath)}function mp(r){return r instanceof W?(function(t){if(t.op==="=="){if(Yl(t.value))return{unaryFilter:{field:Ln(t.field),op:"IS_NAN"}};if(Xl(t.value))return{unaryFilter:{field:Ln(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Yl(t.value))return{unaryFilter:{field:Ln(t.field),op:"IS_NOT_NAN"}};if(Xl(t.value))return{unaryFilter:{field:Ln(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ln(t.field),op:gE(t.op),value:t.value}}})(r):r instanceof ee?(function(t){const n=t.getFilters().map((s=>mp(s)));return n.length===1?n[0]:{compositeFilter:{op:_E(t.op),filters:n}}})(r):M(54877,{filter:r})}function yE(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function gp(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t,n,s,i=B.min(),a=B.min(),c=de.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new ut(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new ut(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new ut(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new ut(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(e){this.yt=e}}function IE(r,e){let t;if(e.document)t=hE(r.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=O.fromSegments(e.noDocument.path),s=En(e.noDocument.readTime);t=ue.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return M(56709);{const n=O.fromSegments(e.unknownDocument.path),s=En(e.unknownDocument.version);t=ue.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime((function(s){const i=new Z(s[0],s[1]);return B.fromTimestamp(i)})(e.readTime)),t}function mh(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:ji(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(i,a){return{name:Bi(i,a.key),fields:a.data.value.mapValue.fields,updateTime:ar(i,a.version.toTimestamp()),createTime:ar(i,a.createTime.toTimestamp())}})(r.yt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Tn(e.version)};else{if(!e.isUnknownDocument())return M(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Tn(e.version)}}return n}function ji(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Tn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function En(r){const e=new Z(r.seconds,r.nanoseconds);return B.fromTimestamp(e)}function rn(r,e){const t=(e.baseMutations||[]).map((i=>Ua(r.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const a=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];a.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map((i=>Ua(r.yt,i))),s=Z.fromMillis(e.localWriteTimeMs);return new vc(e.batchId,s,t,n)}function Kr(r){const e=En(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?En(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=(function(i){return i.documents!==void 0})(r.query)?(function(i){const a=i.documents.length;return F(a===1,1966,{count:a}),Be(Ps(up(i.documents[0])))})(r.query):(function(i){return Be(fp(i))})(r.query),new ut(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,de.fromBase64String(r.resumeToken))}function yp(r,e){const t=Tn(e.snapshotVersion),n=Tn(e.lastLimboFreeSnapshotVersion);let s;s=Fi(e.target)?hp(r.yt,e.target):dp(r.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:In(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Ip(r){const e=fp({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?Oa(e,e.limit,"L"):e}function oa(r,e){return new Sc(e.largestBatchId,Ua(r.yt,e.overlayMutation))}function gh(r,e){const t=e.path.lastSegment();return[r,Ce(e.path.popLast()),t]}function _h(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Tn(n.readTime),documentKey:Ce(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TE{getBundleMetadata(e,t){return yh(e).get(t).next((n=>{if(n)return(function(i){return{id:i.bundleId,createTime:En(i.createTime),version:i.version}})(n)}))}saveBundleMetadata(e,t){return yh(e).put((function(s){return{bundleId:s.id,createTime:Tn(ke(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return Ih(e).get(t).next((n=>{if(n)return(function(i){return{name:i.name,query:Ip(i.bundledQuery),readTime:En(i.readTime)}})(n)}))}saveNamedQuery(e,t){return Ih(e).put((function(s){return{name:s.name,readTime:Tn(ke(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function yh(r){return ge(r,ao)}function Ih(r){return ge(r,co)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const n=t.uid||"";return new go(e,n)}getOverlay(e,t){return Fr(e).get(gh(this.userId,t)).next((n=>n?oa(this.serializer,n):null))}getOverlays(e,t){const n=Ye();return v.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){const s=[];return n.forEach(((i,a)=>{const c=new Sc(t,a);s.push(this.St(e,c))})),v.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach((a=>s.add(Ce(a.getCollectionPath()))));const i=[];return s.forEach((a=>{const c=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(Fr(e).Z(ba,c))})),v.waitFor(i)}getOverlaysForCollection(e,t,n){const s=Ye(),i=Ce(t),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return Fr(e).J(ba,a).next((c=>{for(const u of c){const h=oa(this.serializer,u);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(e,t,n,s){const i=Ye();let a;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Fr(e).ee({index:yf,range:c},((u,h,f)=>{const m=oa(this.serializer,h);i.size()<s||m.largestBatchId===a?(i.set(m.getKey(),m),a=m.largestBatchId):f.done()})).next((()=>i))}St(e,t){return Fr(e).put((function(s,i,a){const[c,u,h]=gh(i,a.mutation.key);return{userId:i,collectionPath:u,documentId:h,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:qi(s.yt,a.mutation)}})(this.serializer,this.userId,t))}}function Fr(r){return ge(r,uo)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EE{bt(e){return ge(e,fc)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const n=t?.value;return n?de.fromUint8Array(n):de.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(oe(e.integerValue));else if("doubleValue"in e){const n=oe(e.doubleValue);isNaN(n)?this.Ft(t,13):(this.Ft(t,15),us(n)?t.Mt(0):t.Mt(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ft(t,20),typeof n=="string"&&(n=dt(n)),t.xt(`${n.seconds||""}`),t.Mt(n.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(ft(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ft(t,45),t.Mt(n.latitude||0),t.Mt(n.longitude||0)}else"mapValue"in e?Vf(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):ho(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Qt(e.arrayValue,t),this.Nt(t)):M(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){const n=e.fields||{};this.Ft(t,55);for(const s of Object.keys(n))this.Ot(s,t),this.Ct(n[s],t)}kt(e,t){const n=e.fields||{};this.Ft(t,53);const s=Zn,i=n[s].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(oe(i)),this.Ot(s,t),this.Ct(n[s],t)}Qt(e,t){const n=e.values||[];this.Ft(t,50);for(const s of n)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),O.fromName(e).path.forEach((n=>{this.Ft(t,60),this.Ut(n,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}sn.Kt=new sn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn=255;function wE(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function Th(r){const e=64-(function(n){let s=0;for(let i=0;i<8;++i){const a=wE(255&n[i]);if(s+=a,a!==8)break}return s})(r);return Math.ceil(e/8)}class vE{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Gt(n.value),n=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Jt(n.value),n=t.next();this.Ht()}Yt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Gt(n);else if(n<2048)this.Gt(960|n>>>6),this.Gt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|n>>>12),this.Gt(128|63&n>>>6),this.Gt(128|63&n);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Zt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Jt(n);else if(n<2048)this.Jt(960|n>>>6),this.Jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|n>>>12),this.Jt(128|63&n>>>6),this.Jt(128|63&n);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Xt(e){const t=this.en(e),n=Th(t);this.tn(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),n=Th(t);this.tn(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(Dn),this.sn(255)}_n(){this.an(Dn),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)})(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===Dn?(this.sn(Dn),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===Dn?(this.an(Dn),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class AE{constructor(e){this.cn=e}Bt(e){this.cn.Wt(e)}xt(e){this.cn.Yt(e)}Mt(e){this.cn.Xt(e)}vt(){this.cn.rn()}}class SE{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class Ur{constructor(){this.cn=new vE,this.ln=new AE(this.cn),this.hn=new SE(this.cn)}seed(e){this.cn.seed(e)}Pn(e){return e===0?this.ln:this.hn}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(e,t,n,s){this.Tn=e,this.In=t,this.En=n,this.dn=s}An(){const e=this.dn.length,t=e===0||this.dn[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.dn,0),t!==e?n.set([0],this.dn.length):++n[n.length-1],new on(this.Tn,this.In,this.En,n)}Rn(e,t,n){return{indexId:this.Tn,uid:e,arrayValue:vi(this.En),directionalValue:vi(this.dn),orderedDocumentKey:vi(t),documentKey:n.path.toArray()}}Vn(e,t,n){const s=this.Rn(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function vt(r,e){let t=r.Tn-e.Tn;return t!==0?t:(t=Eh(r.En,e.En),t!==0?t:(t=Eh(r.dn,e.dn),t!==0?t:O.comparator(r.In,e.In)))}function Eh(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function vi(r){return fd()?(function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n})(r):r}function wh(r){return typeof r!="string"?r:(function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n})(r)}class vh{constructor(e){this.mn=new te(((t,n)=>ae.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.fn=e.orderBy,this.gn=[];for(const t of e.filters){const n=t;n.isInequality()?this.mn=this.mn.add(n):this.gn.push(n)}}get pn(){return this.mn.size>1}yn(e){if(F(e.collectionGroup===this.collectionId,49279),this.pn)return!1;const t=Aa(e);if(t!==void 0&&!this.wn(t))return!1;const n=en(e);let s=new Set,i=0,a=0;for(;i<n.length&&this.wn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.mn.size>0){const c=this.mn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const u=n[i];if(!this.Sn(c,u)||!this.bn(this.fn[a++],u))return!1}++i}for(;i<n.length;++i){const c=n[i];if(a>=this.fn.length||!this.bn(this.fn[a++],c))return!1}return!0}Dn(){if(this.pn)return null;let e=new te(ae.comparator);const t=[];for(const n of this.gn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new mi(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new mi(n.field,0))}for(const n of this.fn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new mi(n.field,n.dir==="asc"?0:1)));return new Ni(Ni.UNKNOWN_ID,this.collectionId,t,cs.empty())}wn(e){for(const t of this.gn)if(this.Sn(t,e))return!0;return!1}Sn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}bn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tp(r){if(F(r instanceof W||r instanceof ee,20012),r instanceof W){if(r instanceof Uf){const t=r.value.arrayValue?.values?.map((n=>W.create(r.field,"==",n)))||[];return ee.create(t,"or")}return r}const e=r.filters.map((t=>Tp(t)));return ee.create(e,r.op)}function RE(r){if(r.getFilters().length===0)return[];const e=ja(Tp(r));return F(Ep(e),7391),Ba(e)||qa(e)?[e]:e.getFilters()}function Ba(r){return r instanceof W}function qa(r){return r instanceof ee&&yc(r)}function Ep(r){return Ba(r)||qa(r)||(function(t){if(t instanceof ee&&Da(t)){for(const n of t.getFilters())if(!Ba(n)&&!qa(n))return!1;return!0}return!1})(r)}function ja(r){if(F(r instanceof W||r instanceof ee,34018),r instanceof W)return r;if(r.filters.length===1)return ja(r.filters[0]);const e=r.filters.map((n=>ja(n)));let t=ee.create(e,r.op);return t=zi(t),Ep(t)?t:(F(t instanceof ee,64498),F(nr(t),40251),F(t.filters.length>1,57927),t.filters.reduce(((n,s)=>Pc(n,s))))}function Pc(r,e){let t;return F(r instanceof W||r instanceof ee,38388),F(e instanceof W||e instanceof ee,25473),t=r instanceof W?e instanceof W?(function(s,i){return ee.create([s,i],"and")})(r,e):Ah(r,e):e instanceof W?Ah(e,r):(function(s,i){if(F(s.filters.length>0&&i.filters.length>0,48005),nr(s)&&nr(i))return Mf(s,i.getFilters());const a=Da(s)?s:i,c=Da(s)?i:s,u=a.filters.map((h=>Pc(h,c)));return ee.create(u,"or")})(r,e),zi(t)}function Ah(r,e){if(nr(e))return Mf(e,r.getFilters());{const t=e.filters.map((n=>Pc(r,n)));return ee.create(t,"or")}}function zi(r){if(F(r instanceof W||r instanceof ee,11850),r instanceof W)return r;const e=r.getFilters();if(e.length===1)return zi(e[0]);if(xf(r))return r;const t=e.map((s=>zi(s))),n=[];return t.forEach((s=>{s instanceof W?n.push(s):s instanceof ee&&(s.op===r.op?n.push(...s.filters):n.push(s))})),n.length===1?n[0]:ee.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bE{constructor(){this.Cn=new Cc}addToCollectionParentIndex(e,t){return this.Cn.add(t),v.resolve()}getCollectionParents(e,t){return v.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return v.resolve()}deleteFieldIndex(e,t){return v.resolve()}deleteAllFieldIndexes(e){return v.resolve()}createTargetIndexes(e,t){return v.resolve()}getDocumentsMatchingTarget(e,t){return v.resolve(null)}getIndexType(e,t){return v.resolve(0)}getFieldIndexes(e,t){return v.resolve([])}getNextCollectionGroupToUpdate(e){return v.resolve(null)}getMinOffset(e,t){return v.resolve(qe.min())}getMinOffsetFromCollectionGroup(e,t){return v.resolve(qe.min())}updateCollectionGroup(e,t,n){return v.resolve()}updateIndexEntries(e,t){return v.resolve()}}class Cc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new te(X.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new te(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sh="IndexedDbIndexManager",oi=new Uint8Array(0);class PE{constructor(e,t){this.databaseId=t,this.vn=new Cc,this.Fn=new mt((n=>In(n)),((n,s)=>bs(n,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.vn.add(t)}));const i={collectionId:n,parent:Ce(s)};return Rh(e).put(i)}return v.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[rf(t),""],!1,!0);return Rh(e).J(s).next((i=>{for(const a of i){if(a.collectionId!==t)break;n.push(Xe(a.parent))}return n}))}addFieldIndex(e,t){const n=Br(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete s.indexId;const i=n.add(s);if(t.indexState){const a=Nn(e);return i.next((c=>{a.put(_h(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const n=Br(e),s=Nn(e),i=kn(e);return n.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Br(e),n=kn(e),s=Nn(e);return t.Z().next((()=>n.Z())).next((()=>s.Z()))}createTargetIndexes(e,t){return v.forEach(this.Mn(t),(n=>this.getIndexType(e,n).next((s=>{if(s===0||s===1){const i=new vh(n).Dn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const n=kn(e);let s=!0;const i=new Map;return v.forEach(this.Mn(t),(a=>this.xn(e,a).next((c=>{s&&(s=!!c),i.set(a,c)})))).next((()=>{if(s){let a=G();const c=[];return v.forEach(i,((u,h)=>{V(Sh,`Using index ${(function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map((Y=>`${Y.fieldPath}:${Y.kind}`)).join(",")}`})(u)} to execute ${In(t)}`);const f=(function(U,Y){const ne=Aa(Y);if(ne===void 0)return null;for(const Q of Ui(U,ne.fieldPath))switch(Q.op){case"array-contains-any":return Q.value.arrayValue.values||[];case"array-contains":return[Q.value]}return null})(h,u),m=(function(U,Y){const ne=new Map;for(const Q of en(Y))for(const T of Ui(U,Q.fieldPath))switch(T.op){case"==":case"in":ne.set(Q.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return ne.set(Q.fieldPath.canonicalString(),T.value),Array.from(ne.values())}return null})(h,u),_=(function(U,Y){const ne=[];let Q=!0;for(const T of en(Y)){const g=T.kind===0?rh(U,T.fieldPath,U.startAt):sh(U,T.fieldPath,U.startAt);ne.push(g.value),Q&&(Q=g.inclusive)}return new tr(ne,Q)})(h,u),R=(function(U,Y){const ne=[];let Q=!0;for(const T of en(Y)){const g=T.kind===0?sh(U,T.fieldPath,U.endAt):rh(U,T.fieldPath,U.endAt);ne.push(g.value),Q&&(Q=g.inclusive)}return new tr(ne,Q)})(h,u),C=this.On(u,h,_),N=this.On(u,h,R),D=this.Nn(u,h,m),$=this.Bn(u.indexId,f,C,_.inclusive,N,R.inclusive,D);return v.forEach($,(q=>n.Y(q,t.limit).next((U=>{U.forEach((Y=>{const ne=O.fromSegments(Y.documentKey);a.has(ne)||(a=a.add(ne),c.push(ne))}))}))))})).next((()=>c))}return v.resolve(null)}))}Mn(e){let t=this.Fn.get(e);return t||(e.filters.length===0?t=[e]:t=RE(ee.create(e.filters,"and")).map((n=>Na(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.Fn.set(e,t),t)}Bn(e,t,n,s,i,a,c){const u=(t!=null?t.length:1)*Math.max(n.length,i.length),h=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){const _=t?this.Ln(t[m/h]):oi,R=this.kn(e,_,n[m%h],s),C=this.qn(e,_,i[m%h],a),N=c.map((D=>this.kn(e,_,D,!0)));f.push(...this.createRange(R,C,N))}return f}kn(e,t,n,s){const i=new on(e,O.empty(),t,n);return s?i:i.An()}qn(e,t,n,s){const i=new on(e,O.empty(),t,n);return s?i.An():i}xn(e,t){const n=new vh(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let a=null;for(const c of i)n.yn(c)&&(!a||c.fields.length>a.fields.length)&&(a=c);return a}))}getIndexType(e,t){let n=2;const s=this.Mn(t);return v.forEach(s,(i=>this.xn(e,i).next((a=>{a?n!==0&&a.fields.length<(function(u){let h=new te(ae.comparator),f=!1;for(const m of u.filters)for(const _ of m.getFlattenedFilters())_.field.isKeyField()||(_.op==="array-contains"||_.op==="array-contains-any"?f=!0:h=h.add(_.field));for(const m of u.orderBy)m.field.isKeyField()||(h=h.add(m.field));return h.size+(f?1:0)})(i)&&(n=1):n=0})))).next((()=>(function(a){return a.limit!==null})(t)&&s.length>1&&n===2?1:n))}Qn(e,t){const n=new Ur;for(const s of en(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const a=n.Pn(s.kind);sn.Kt.Dt(i,a)}return n.un()}Ln(e){const t=new Ur;return sn.Kt.Dt(e,t.Pn(0)),t.un()}$n(e,t){const n=new Ur;return sn.Kt.Dt(ms(this.databaseId,t),n.Pn((function(i){const a=en(i);return a.length===0?0:a[a.length-1].kind})(e))),n.un()}Nn(e,t,n){if(n===null)return[];let s=[];s.push(new Ur);let i=0;for(const a of en(e)){const c=n[i++];for(const u of s)if(this.Un(t,a.fieldPath)&&gs(c))s=this.Kn(s,a,c);else{const h=u.Pn(a.kind);sn.Kt.Dt(c,h)}}return this.Wn(s)}On(e,t,n){return this.Nn(e,t,n.position)}Wn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].un();return t}Kn(e,t,n){const s=[...e],i=[];for(const a of n.arrayValue.values||[])for(const c of s){const u=new Ur;u.seed(c.un()),sn.Kt.Dt(a,u.Pn(t.kind)),i.push(u)}return i}Un(e,t){return!!e.filters.find((n=>n instanceof W&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=Br(e),s=Nn(e);return(t?n.J(Ra,IDBKeyRange.bound(t,t)):n.J()).next((i=>{const a=[];return v.forEach(i,(c=>s.get([c.indexId,this.uid]).next((u=>{a.push((function(f,m){const _=m?new cs(m.sequenceNumber,new qe(En(m.readTime),new O(Xe(m.documentKey)),m.largestBatchId)):cs.empty(),R=f.fields.map((([C,N])=>new mi(ae.fromServerFormat(C),N)));return new Ni(f.indexId,f.collectionGroup,R,_)})(c,u))})))).next((()=>a))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:z(n.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const s=Br(e),i=Nn(e);return this.Gn(e).next((a=>s.J(Ra,IDBKeyRange.bound(t,t)).next((c=>v.forEach(c,(u=>i.put(_h(u.indexId,this.uid,a,n))))))))}updateIndexEntries(e,t){const n=new Map;return v.forEach(t,((s,i)=>{const a=n.get(s.collectionGroup);return(a?v.resolve(a):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(n.set(s.collectionGroup,c),v.forEach(c,(u=>this.zn(e,s,u).next((h=>{const f=this.jn(i,u);return h.isEqual(f)?v.resolve():this.Jn(e,i,u,h,f)})))))))}))}Hn(e,t,n,s){return kn(e).put(s.Rn(this.uid,this.$n(n,t.key),t.key))}Yn(e,t,n,s){return kn(e).delete(s.Vn(this.uid,this.$n(n,t.key),t.key))}zn(e,t,n){const s=kn(e);let i=new te(vt);return s.ee({index:_f,range:IDBKeyRange.only([n.indexId,this.uid,vi(this.$n(n,t))])},((a,c)=>{i=i.add(new on(n.indexId,t,wh(c.arrayValue),wh(c.directionalValue)))})).next((()=>i))}jn(e,t){let n=new te(vt);const s=this.Qn(t,e);if(s==null)return n;const i=Aa(t);if(i!=null){const a=e.data.field(i.fieldPath);if(gs(a))for(const c of a.arrayValue.values||[])n=n.add(new on(t.indexId,e.key,this.Ln(c),s))}else n=n.add(new on(t.indexId,e.key,oi,s));return n}Jn(e,t,n,s,i){V(Sh,"Updating index entries for document '%s'",t.key);const a=[];return(function(u,h,f,m,_){const R=u.getIterator(),C=h.getIterator();let N=Vn(R),D=Vn(C);for(;N||D;){let $=!1,q=!1;if(N&&D){const U=f(N,D);U<0?q=!0:U>0&&($=!0)}else N!=null?q=!0:$=!0;$?(m(D),D=Vn(C)):q?(_(N),N=Vn(R)):(N=Vn(R),D=Vn(C))}})(s,i,vt,(c=>{a.push(this.Hn(e,t,n,c))}),(c=>{a.push(this.Yn(e,t,n,c))})),v.waitFor(a)}Gn(e){let t=1;return Nn(e).ee({index:gf,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((a,c)=>vt(a,c))).filter(((a,c,u)=>!c||vt(a,u[c-1])!==0));const s=[];s.push(e);for(const a of n){const c=vt(a,e),u=vt(a,t);if(c===0)s[0]=e.An();else if(c>0&&u<0)s.push(a),s.push(a.An());else if(u>0)break}s.push(t);const i=[];for(let a=0;a<s.length;a+=2){if(this.Zn(s[a],s[a+1]))return[];const c=s[a].Vn(this.uid,oi,O.empty()),u=s[a+1].Vn(this.uid,oi,O.empty());i.push(IDBKeyRange.bound(c,u))}return i}Zn(e,t){return vt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(bh)}getMinOffset(e,t){return v.mapArray(this.Mn(t),(n=>this.xn(e,n).next((s=>s||M(44426))))).next(bh)}}function Rh(r){return ge(r,ds)}function kn(r){return ge(r,Zr)}function Br(r){return ge(r,dc)}function Nn(r){return ge(r,Yr)}function bh(r){F(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;uc(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new qe(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ph={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},wp=41943040;class be{static withCacheSize(e){return new be(e,be.DEFAULT_COLLECTION_PERCENTILE,be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vp(r,e,t){const n=r.store($e),s=r.store(Qn),i=[],a=IDBKeyRange.only(t.batchId);let c=0;const u=n.ee({range:a},((f,m,_)=>(c++,_.delete())));i.push(u.next((()=>{F(c===1,47070,{batchId:t.batchId})})));const h=[];for(const f of t.mutations){const m=ff(e,f.key.path,t.batchId);i.push(s.delete(m)),h.push(f.key)}return v.waitFor(i).next((()=>h))}function $i(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw M(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */be.DEFAULT_COLLECTION_PERCENTILE=10,be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,be.DEFAULT=new be(wp,be.DEFAULT_COLLECTION_PERCENTILE,be.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),be.DISABLED=new be(-1,0,0);class _o{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.Xn={}}static wt(e,t,n,s){F(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new _o(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return At(e).ee({index:cn,range:n},((s,i,a)=>{t=!1,a.done()})).next((()=>t))}addMutationBatch(e,t,n,s){const i=Un(e),a=At(e);return a.add({}).next((c=>{F(typeof c=="number",49019);const u=new vc(c,t,n,s),h=(function(R,C,N){const D=N.baseMutations.map((q=>qi(R.yt,q))),$=N.mutations.map((q=>qi(R.yt,q)));return{userId:C,batchId:N.batchId,localWriteTimeMs:N.localWriteTime.toMillis(),baseMutations:D,mutations:$}})(this.serializer,this.userId,u),f=[];let m=new te(((_,R)=>z(_.canonicalString(),R.canonicalString())));for(const _ of s){const R=ff(this.userId,_.key.path,c);m=m.add(_.key.path.popLast()),f.push(a.put(h)),f.push(i.put(R,aT))}return m.forEach((_=>{f.push(this.indexManager.addToCollectionParentIndex(e,_))})),e.addOnCommittedListener((()=>{this.Xn[c]=u.keys()})),v.waitFor(f).next((()=>u))}))}lookupMutationBatch(e,t){return At(e).get(t).next((n=>n?(F(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),rn(this.serializer,n)):null))}er(e,t){return this.Xn[t]?v.resolve(this.Xn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const s=n.keys();return this.Xn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return At(e).ee({index:cn,range:s},((a,c,u)=>{c.userId===this.userId&&(F(c.batchId>=n,47524,{tr:n}),i=rn(this.serializer,c)),u.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=ln;return At(e).ee({index:cn,range:t,reverse:!0},((s,i,a)=>{n=i.batchId,a.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,ln],[this.userId,Number.POSITIVE_INFINITY]);return At(e).J(cn,t).next((n=>n.map((s=>rn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=gi(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return Un(e).ee({range:s},((a,c,u)=>{const[h,f,m]=a,_=Xe(f);if(h===this.userId&&t.path.isEqual(_))return At(e).get(m).next((R=>{if(!R)throw M(61480,{nr:a,batchId:m});F(R.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:R.userId,batchId:m}),i.push(rn(this.serializer,R))}));u.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(z);const s=[];return t.forEach((i=>{const a=gi(this.userId,i.path),c=IDBKeyRange.lowerBound(a),u=Un(e).ee({range:c},((h,f,m)=>{const[_,R,C]=h,N=Xe(R);_===this.userId&&i.path.isEqual(N)?n=n.add(C):m.done()}));s.push(u)})),v.waitFor(s).next((()=>this.rr(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=gi(this.userId,n),a=IDBKeyRange.lowerBound(i);let c=new te(z);return Un(e).ee({range:a},((u,h,f)=>{const[m,_,R]=u,C=Xe(_);m===this.userId&&n.isPrefixOf(C)?C.length===s&&(c=c.add(R)):f.done()})).next((()=>this.rr(e,c)))}rr(e,t){const n=[],s=[];return t.forEach((i=>{s.push(At(e).get(i).next((a=>{if(a===null)throw M(35274,{batchId:i});F(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(rn(this.serializer,a))})))})),v.waitFor(s).next((()=>n))}removeMutationBatch(e,t){return vp(e.le,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.ir(t.batchId)})),v.forEach(n,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}ir(e){delete this.Xn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return v.resolve();const n=IDBKeyRange.lowerBound((function(a){return[a]})(this.userId)),s=[];return Un(e).ee({range:n},((i,a,c)=>{if(i[0]===this.userId){const u=Xe(i[1]);s.push(u)}else c.done()})).next((()=>{F(s.length===0,56720,{sr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return Ap(e,this.userId,t)}_r(e){return Sp(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:ln,lastStreamToken:""}))}}function Ap(r,e,t){const n=gi(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return Un(r).ee({range:i,X:!0},((c,u,h)=>{const[f,m,_]=c;f===e&&m===s&&(a=!0),h.done()})).next((()=>a))}function At(r){return ge(r,$e)}function Un(r){return ge(r,Qn)}function Sp(r){return ge(r,ls)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new wn(0)}static cr(){return new wn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CE{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.lr(e).next((t=>{const n=new wn(t.highestTargetId);return t.highestTargetId=n.next(),this.hr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.lr(e).next((t=>B.fromTimestamp(new Z(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.lr(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.lr(e).next((s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.hr(e,s))))}addTargetData(e,t){return this.Pr(e,t).next((()=>this.lr(e).next((n=>(n.targetCount+=1,this.Tr(t,n),this.hr(e,n))))))}updateTargetData(e,t){return this.Pr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>xn(e).delete(t.targetId))).next((()=>this.lr(e))).next((n=>(F(n.targetCount>0,8065),n.targetCount-=1,this.hr(e,n))))}removeTargets(e,t,n){let s=0;const i=[];return xn(e).ee(((a,c)=>{const u=Kr(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(s++,i.push(this.removeTargetData(e,u)))})).next((()=>v.waitFor(i))).next((()=>s))}forEachTarget(e,t){return xn(e).ee(((n,s)=>{const i=Kr(s);t(i)}))}lr(e){return Ch(e).get(Mi).next((t=>(F(t!==null,2888),t)))}hr(e,t){return Ch(e).put(Mi,t)}Pr(e,t){return xn(e).put(yp(this.serializer,t))}Tr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.lr(e).next((t=>t.targetCount))}getTargetData(e,t){const n=In(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return xn(e).ee({range:s,index:mf},((a,c,u)=>{const h=Kr(c);bs(t,h.target)&&(i=h,u.done())})).next((()=>i))}addMatchingKeys(e,t,n){const s=[],i=Vt(e);return t.forEach((a=>{const c=Ce(a.path);s.push(i.put({targetId:n,path:c})),s.push(this.referenceDelegate.addReference(e,n,a))})),v.waitFor(s)}removeMatchingKeys(e,t,n){const s=Vt(e);return v.forEach(t,(i=>{const a=Ce(i.path);return v.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(e,n,i)])}))}removeMatchingKeysForTargetId(e,t){const n=Vt(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=Vt(e);let i=G();return s.ee({range:n,X:!0},((a,c,u)=>{const h=Xe(a[1]),f=new O(h);i=i.add(f)})).next((()=>i))}containsKey(e,t){const n=Ce(t.path),s=IDBKeyRange.bound([n],[rf(n)],!1,!0);let i=0;return Vt(e).ee({index:hc,X:!0,range:s},(([a,c],u,h)=>{a!==0&&(i++,h.done())})).next((()=>i>0))}At(e,t){return xn(e).get(t).next((n=>n?Kr(n):null))}}function xn(r){return ge(r,Jn)}function Ch(r){return ge(r,hn)}function Vt(r){return ge(r,Xn)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vh="LruGarbageCollector",Rp=1048576;function Dh([r,e],[t,n]){const s=z(r,t);return s===0?z(e,n):s}class VE{constructor(e){this.Ir=e,this.buffer=new te(Dh),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Dh(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class bp{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){V(Vh,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Gt(t)?V(Vh,"Ignoring IndexedDB error during garbage collection: ",t):await $t(t)}await this.Vr(3e5)}))}}class DE{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return v.resolve(Ne.ce);const n=new VE(t);return this.mr.forEachTarget(e,(s=>n.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>n.Ar(s))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.mr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(Ph)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Ph):this.yr(e,t)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let n,s,i,a,c,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((m=>(m>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),s=this.params.maximumSequenceNumbersToCollect):s=m,a=Date.now(),this.nthSequenceNumber(e,s)))).next((m=>(n=m,c=Date.now(),this.removeTargets(e,n,t)))).next((m=>(i=m,u=Date.now(),this.removeOrphanedDocuments(e,n)))).next((m=>(h=Date.now(),On()<=K.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${s} in `+(c-a)+`ms
	Removed ${i} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:m}))))}}function Pp(r,e){return new DE(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(e,t){this.db=e,this.garbageCollector=Pp(this,t)}gr(e){const t=this.wr(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}wr(e){let t=0;return this.pr(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}pr(e,t){return this.Sr(e,((n,s)=>t(s)))}addReference(e,t,n){return ai(e,n)}removeReference(e,t,n){return ai(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return ai(e,t)}br(e,t){return(function(s,i){let a=!1;return Sp(s).te((c=>Ap(s,c,i).next((u=>(u&&(a=!0),v.resolve(!u)))))).next((()=>a))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Sr(e,((a,c)=>{if(c<=t){const u=this.br(e,a).next((h=>{if(!h)return i++,n.getEntry(e,a).next((()=>(n.removeEntry(a,B.min()),Vt(e).delete((function(m){return[0,Ce(m.path)]})(a)))))}));s.push(u)}})).next((()=>v.waitFor(s))).next((()=>n.apply(e))).next((()=>i))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return ai(e,t)}Sr(e,t){const n=Vt(e);let s,i=Ne.ce;return n.ee({index:hc},(([a,c],{path:u,sequenceNumber:h})=>{a===0?(i!==Ne.ce&&t(new O(Xe(s)),i),i=h,s=u):i=Ne.ce})).next((()=>{i!==Ne.ce&&t(new O(Xe(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function ai(r,e){return Vt(r).put((function(n,s){return{targetId:0,path:Ce(n.path),sequenceNumber:s}})(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(){this.changes=new mt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ue.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?v.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NE{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Yt(e).put(n)}removeEntry(e,t,n){return Yt(e).delete((function(i,a){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],ji(a),c[c.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.Dr(e,n))))}getEntry(e,t){let n=ue.newInvalidDocument(t);return Yt(e).ee({index:_i,range:IDBKeyRange.only(qr(t))},((s,i)=>{n=this.Cr(t,i)})).next((()=>n))}vr(e,t){let n={size:0,document:ue.newInvalidDocument(t)};return Yt(e).ee({index:_i,range:IDBKeyRange.only(qr(t))},((s,i)=>{n={document:this.Cr(t,i),size:$i(i)}})).next((()=>n))}getEntries(e,t){let n=Fe();return this.Fr(e,t,((s,i)=>{const a=this.Cr(s,i);n=n.insert(s,a)})).next((()=>n))}Mr(e,t){let n=Fe(),s=new se(O.comparator);return this.Fr(e,t,((i,a)=>{const c=this.Cr(i,a);n=n.insert(i,c),s=s.insert(i,$i(a))})).next((()=>({documents:n,Or:s})))}Fr(e,t,n){if(t.isEmpty())return v.resolve();let s=new te(xh);t.forEach((u=>s=s.add(u)));const i=IDBKeyRange.bound(qr(s.first()),qr(s.last())),a=s.getIterator();let c=a.getNext();return Yt(e).ee({index:_i,range:i},((u,h,f)=>{const m=O.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&xh(c,m)<0;)n(c,null),c=a.getNext();c&&c.isEqual(m)&&(n(c,h),c=a.hasNext()?a.getNext():null),c?f.j(qr(c)):f.done()})).next((()=>{for(;c;)n(c,null),c=a.hasNext()?a.getNext():null}))}getDocumentsMatchingQuery(e,t,n,s,i){const a=t.path,c=[a.popLast().toArray(),a.lastSegment(),ji(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Yt(e).J(IDBKeyRange.bound(c,u,!0)).next((h=>{i?.incrementDocumentReadCount(h.length);let f=Fe();for(const m of h){const _=this.Cr(O.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);_.isFoundDocument()&&(Cs(t,_)||s.has(_.key))&&(f=f.insert(_.key,_))}return f}))}getAllFromCollectionGroup(e,t,n,s){let i=Fe();const a=Nh(t,n),c=Nh(t,qe.max());return Yt(e).ee({index:pf,range:IDBKeyRange.bound(a,c,!0)},((u,h,f)=>{const m=this.Cr(O.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(m.key,m),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new xE(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return kh(e).get(Sa).next((t=>(F(!!t,20021),t)))}Dr(e,t){return kh(e).put(Sa,t)}Cr(e,t){if(t){const n=IE(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return ue.newInvalidDocument(e)}}function Vp(r){return new NE(r)}class xE extends Cp{constructor(e,t){super(),this.Nr=e,this.trackRemovals=t,this.Br=new mt((n=>n.toString()),((n,s)=>n.isEqual(s)))}applyChanges(e){const t=[];let n=0,s=new te(((i,a)=>z(i.canonicalString(),a.canonicalString())));return this.changes.forEach(((i,a)=>{const c=this.Br.get(i);if(t.push(this.Nr.removeEntry(e,i,c.readTime)),a.isValidDocument()){const u=mh(this.Nr.serializer,a);s=s.add(i.path.popLast());const h=$i(u);n+=h-c.size,t.push(this.Nr.addEntry(e,i,u))}else if(n-=c.size,this.trackRemovals){const u=mh(this.Nr.serializer,a.convertToNoDocument(B.min()));t.push(this.Nr.addEntry(e,i,u))}})),s.forEach((i=>{t.push(this.Nr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Nr.updateMetadata(e,n)),v.waitFor(t)}getFromCache(e,t){return this.Nr.vr(e,t).next((n=>(this.Br.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.Nr.Mr(e,t).next((({documents:n,Or:s})=>(s.forEach(((i,a)=>{this.Br.set(i,{size:a,readTime:n.get(i).readTime})})),n)))}}function kh(r){return ge(r,hs)}function Yt(r){return ge(r,Oi)}function qr(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Nh(r,e){const t=e.documentKey.path.toArray();return[r,ji(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function xh(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=z(t[i],n[i]),s)return s;return s=z(t.length,n.length),s||(s=z(t[t.length-2],n[n.length-2]),s||z(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dp{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(n=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(n!==null&&rs(n.mutation,s,xe.empty(),Z.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,G()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=G()){const s=Ye();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,n).next((i=>{let a=$r();return i.forEach(((c,u)=>{a=a.insert(c,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const n=Ye();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,G())))}populateOverlays(e,t,n){const s=[];return n.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,n,s){let i=Fe();const a=ns(),c=(function(){return ns()})();return t.forEach(((u,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof gt)?i=i.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),rs(f.mutation,h,f.mutation.getFieldMask(),Z.now())):a.set(h.key,xe.empty())})),this.recalculateAndSaveOverlays(e,i).next((u=>(u.forEach(((h,f)=>a.set(h,f))),t.forEach(((h,f)=>c.set(h,new OE(f,a.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const n=ns();let s=new se(((a,c)=>a-c)),i=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||xe.empty();f=c.applyToLocalView(h,f),n.set(u,f);const m=(s.get(c.batchId)||G()).add(u);s=s.insert(c.batchId,m)}))})).next((()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,m=Wf();f.forEach((_=>{if(!i.has(_)){const R=ep(t.get(_),n.get(_));R!==null&&m.set(_,R),i=i.add(_)}})),a.push(this.documentOverlayCache.saveOverlays(e,h,m))}return v.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,s){return(function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):qf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next((i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):v.resolve(Ye());let c=Hn,u=i;return a.next((h=>v.forEach(h,((f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),i.get(f)?v.resolve():this.remoteDocumentCache.getEntry(e,f).next((_=>{u=u.insert(f,_)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,u,h,G()))).next((f=>({batchId:c,changes:Kf(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next((n=>{let s=$r();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let a=$r();return this.indexManager.getCollectionParents(e,i).next((c=>v.forEach(c,(u=>{const h=(function(m,_){return new gr(_,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)})(t,u.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next((f=>{f.forEach(((m,_)=>{a=a.insert(m,_)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s)))).next((a=>{i.forEach(((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,ue.newInvalidDocument(f)))}));let c=$r();return a.forEach(((u,h)=>{const f=i.get(u);f!==void 0&&rs(f.mutation,h,xe.empty(),Z.now()),Cs(t,h)&&(c=c.insert(u,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ME{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return v.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:ke(s.createTime)}})(t)),v.resolve()}getNamedQuery(e,t){return v.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,(function(s){return{name:s.name,query:Ip(s.bundledQuery),readTime:ke(s.readTime)}})(t)),v.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LE{constructor(){this.overlays=new se(O.comparator),this.qr=new Map}getOverlay(e,t){return v.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Ye();return v.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&n.set(s,i)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((s,i)=>{this.St(e,t,i)})),v.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.qr.get(n);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(n)),v.resolve()}getOverlaysForCollection(e,t,n){const s=Ye(),i=t.length+1,a=new O(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&u.largestBatchId>n&&s.set(u.getKey(),u)}return v.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new se(((h,f)=>h-f));const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=Ye(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Ye(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return v.resolve(c)}St(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(n.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Sc(t,n));let i=this.qr.get(t);i===void 0&&(i=G(),this.qr.set(t,i)),this.qr.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FE{constructor(){this.sessionToken=de.EMPTY_BYTE_STRING}getSessionToken(e){return v.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,v.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(){this.Qr=new te(_e.$r),this.Ur=new te(_e.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const n=new _e(e,t);this.Qr=this.Qr.add(n),this.Ur=this.Ur.add(n)}Wr(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Gr(new _e(e,t))}zr(e,t){e.forEach((n=>this.removeReference(n,t)))}jr(e){const t=new O(new X([])),n=new _e(t,e),s=new _e(t,e+1),i=[];return this.Ur.forEachInRange([n,s],(a=>{this.Gr(a),i.push(a.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new O(new X([])),n=new _e(t,e),s=new _e(t,e+1);let i=G();return this.Ur.forEachInRange([n,s],(a=>{i=i.add(a.key)})),i}containsKey(e){const t=new _e(e,0),n=this.Qr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class _e{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return O.comparator(e.key,t.key)||z(e.Yr,t.Yr)}static Kr(e,t){return z(e.Yr,t.Yr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new te(_e.$r)}checkEmpty(e){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new vc(i,t,n,s);this.mutationQueue.push(a);for(const c of s)this.Zr=this.Zr.add(new _e(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return v.resolve(a)}lookupMutationBatch(e,t){return v.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.ei(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?ln:this.tr-1)}getAllMutationBatches(e){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new _e(t,0),s=new _e(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([n,s],(a=>{const c=this.Xr(a.Yr);i.push(c)})),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(z);return t.forEach((s=>{const i=new _e(s,0),a=new _e(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,a],(c=>{n=n.add(c.Yr)}))})),v.resolve(this.ti(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;O.isDocumentKey(i)||(i=i.child(""));const a=new _e(new O(i),0);let c=new te(z);return this.Zr.forEachWhile((u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.Yr)),!0)}),a),v.resolve(this.ti(c))}ti(e){const t=[];return e.forEach((n=>{const s=this.Xr(n);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){F(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Zr;return v.forEach(t.mutations,(s=>{const i=new _e(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=n}))}ir(e){}containsKey(e,t){const n=new _e(t,0),s=this.Zr.firstAfterOrEqual(n);return v.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,v.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(e){this.ri=e,this.docs=(function(){return new se(O.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return v.resolve(n?n.document.mutableCopy():ue.newInvalidDocument(t))}getEntries(e,t){let n=Fe();return t.forEach((s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ue.newInvalidDocument(s))})),v.resolve(n)}getDocumentsMatchingQuery(e,t,n,s){let i=Fe();const a=t.path,c=new O(a.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||uc(cf(f),n)<=0||(s.has(f.key)||Cs(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(e,t,n,s){M(9500)}ii(e,t){return v.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new qE(this)}getSize(e){return v.resolve(this.size)}}class qE extends Cp{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(n)})),v.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jE{constructor(e){this.persistence=e,this.si=new mt((t=>In(t)),bs),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.oi=0,this._i=new Vc,this.targetCount=0,this.ai=wn.ur()}forEachTarget(e,t){return this.si.forEach(((n,s)=>t(s))),v.resolve()}getLastRemoteSnapshotVersion(e){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return v.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.oi&&(this.oi=t),v.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new wn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,v.resolve()}updateTargetData(e,t){return this.Pr(t),v.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,v.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.si.forEach(((a,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.si.delete(a),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),v.waitFor(i).next((()=>s))}getTargetCount(e){return v.resolve(this.targetCount)}getTargetData(e,t){const n=this.si.get(t)||null;return v.resolve(n)}addMatchingKeys(e,t,n){return this._i.Wr(t,n),v.resolve()}removeMatchingKeys(e,t,n){this._i.zr(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((a=>{i.push(s.markPotentiallyOrphaned(e,a))})),v.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),v.resolve()}getMatchingKeysForTargetId(e,t){const n=this._i.Hr(t);return v.resolve(n)}containsKey(e,t){return v.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e,t){this.ui={},this.overlays={},this.ci=new Ne(0),this.li=!1,this.li=!0,this.hi=new FE,this.referenceDelegate=e(this),this.Pi=new jE(this),this.indexManager=new bE,this.remoteDocumentCache=(function(s){return new BE(s)})((n=>this.referenceDelegate.Ti(n))),this.serializer=new _p(t),this.Ii=new ME(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new LE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ui[e.toKey()];return n||(n=new UE(t,this.referenceDelegate),this.ui[e.toKey()]=n),n}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,n){V("MemoryPersistence","Starting transaction:",e);const s=new zE(this.ci.next());return this.referenceDelegate.Ei(),n(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,t){return v.or(Object.values(this.ui).map((n=>()=>n.containsKey(e,t))))}}class zE extends lf{constructor(e){super(),this.currentSequenceNumber=e}}class yo{constructor(e){this.persistence=e,this.Ri=new Vc,this.Vi=null}static mi(e){return new yo(e)}get fi(){if(this.Vi)return this.Vi;throw M(60996)}addReference(e,t,n){return this.Ri.addReference(n,t),this.fi.delete(n.toString()),v.resolve()}removeReference(e,t,n){return this.Ri.removeReference(n,t),this.fi.add(n.toString()),v.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),v.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach((s=>this.fi.add(s.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>n.removeTargetData(e,t)))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.fi,(n=>{const s=O.fromPath(n);return this.gi(e,s).next((i=>{i||t.removeEntry(s,B.min())}))})).next((()=>(this.Vi=null,t.apply(e))))}updateLimboDocument(e,t){return this.gi(e,t).next((n=>{n?this.fi.delete(t.toString()):this.fi.add(t.toString())}))}Ti(e){return 0}gi(e,t){return v.or([()=>v.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Gi{constructor(e,t){this.persistence=e,this.pi=new mt((n=>Ce(n.path)),((n,s)=>n.isEqual(s))),this.garbageCollector=Pp(this,t)}static mi(e,t){return new Gi(e,t)}Ei(){}di(e){return v.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((n=>t.next((s=>n+s))))}wr(e){let t=0;return this.pr(e,(n=>{t++})).next((()=>t))}pr(e,t){return v.forEach(this.pi,((n,s)=>this.br(e,n,s).next((i=>i?v.resolve():t(s)))))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(a=>this.br(e,a,t).next((c=>{c||(n++,i.removeEntry(a,B.min()))})))).next((()=>i.apply(e))).next((()=>n))}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),v.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),v.resolve()}removeReference(e,t,n){return this.pi.set(n,e.currentSequenceNumber),v.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),v.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ii(e.data.value)),t}br(e,t,n){return v.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e){this.serializer=e}k(e,t,n,s){const i=new io("createOrUpgrade",t);n<1&&s>=1&&((function(u){u.createObjectStore(Rs)})(e),(function(u){u.createObjectStore(ls,{keyPath:oT}),u.createObjectStore($e,{keyPath:Gl,autoIncrement:!0}).createIndex(cn,Kl,{unique:!0}),u.createObjectStore(Qn)})(e),Oh(e),(function(u){u.createObjectStore(tn)})(e));let a=v.resolve();return n<3&&s>=3&&(n!==0&&((function(u){u.deleteObjectStore(Xn),u.deleteObjectStore(Jn),u.deleteObjectStore(hn)})(e),Oh(e)),a=a.next((()=>(function(u){const h=u.store(hn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return h.put(Mi,f)})(i)))),n<4&&s>=4&&(n!==0&&(a=a.next((()=>(function(u,h){return h.store($e).J().next((m=>{u.deleteObjectStore($e),u.createObjectStore($e,{keyPath:Gl,autoIncrement:!0}).createIndex(cn,Kl,{unique:!0});const _=h.store($e),R=m.map((C=>_.put(C)));return v.waitFor(R)}))})(e,i)))),a=a.next((()=>{(function(u){u.createObjectStore(Yn,{keyPath:mT})})(e)}))),n<5&&s>=5&&(a=a.next((()=>this.yi(i)))),n<6&&s>=6&&(a=a.next((()=>((function(u){u.createObjectStore(hs)})(e),this.wi(i))))),n<7&&s>=7&&(a=a.next((()=>this.Si(i)))),n<8&&s>=8&&(a=a.next((()=>this.bi(e,i)))),n<9&&s>=9&&(a=a.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&s>=10&&(a=a.next((()=>this.Di(i)))),n<11&&s>=11&&(a=a.next((()=>{(function(u){u.createObjectStore(ao,{keyPath:gT})})(e),(function(u){u.createObjectStore(co,{keyPath:_T})})(e)}))),n<12&&s>=12&&(a=a.next((()=>{(function(u){const h=u.createObjectStore(uo,{keyPath:AT});h.createIndex(ba,ST,{unique:!1}),h.createIndex(yf,RT,{unique:!1})})(e)}))),n<13&&s>=13&&(a=a.next((()=>(function(u){const h=u.createObjectStore(Oi,{keyPath:cT});h.createIndex(_i,uT),h.createIndex(pf,lT)})(e))).next((()=>this.Ci(e,i))).next((()=>e.deleteObjectStore(tn)))),n<14&&s>=14&&(a=a.next((()=>this.Fi(e,i)))),n<15&&s>=15&&(a=a.next((()=>(function(u){u.createObjectStore(dc,{keyPath:yT,autoIncrement:!0}).createIndex(Ra,IT,{unique:!1}),u.createObjectStore(Yr,{keyPath:TT}).createIndex(gf,ET,{unique:!1}),u.createObjectStore(Zr,{keyPath:wT}).createIndex(_f,vT,{unique:!1})})(e)))),n<16&&s>=16&&(a=a.next((()=>{t.objectStore(Yr).clear()})).next((()=>{t.objectStore(Zr).clear()}))),n<17&&s>=17&&(a=a.next((()=>{(function(u){u.createObjectStore(fc,{keyPath:bT})})(e)}))),n<18&&s>=18&&fd()&&(a=a.next((()=>{t.objectStore(Yr).clear()})).next((()=>{t.objectStore(Zr).clear()}))),a}wi(e){let t=0;return e.store(tn).ee(((n,s)=>{t+=$i(s)})).next((()=>{const n={byteSize:t};return e.store(hs).put(Sa,n)}))}yi(e){const t=e.store(ls),n=e.store($e);return t.J().next((s=>v.forEach(s,(i=>{const a=IDBKeyRange.bound([i.userId,ln],[i.userId,i.lastAcknowledgedBatchId]);return n.J(cn,a).next((c=>v.forEach(c,(u=>{F(u.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=rn(this.serializer,u);return vp(e,i.userId,h).next((()=>{}))}))))}))))}Si(e){const t=e.store(Xn),n=e.store(tn);return e.store(hn).get(Mi).next((s=>{const i=[];return n.ee(((a,c)=>{const u=new X(a),h=(function(m){return[0,Ce(m)]})(u);i.push(t.get(h).next((f=>f?v.resolve():(m=>t.put({targetId:0,path:Ce(m),sequenceNumber:s.highestListenSequenceNumber}))(u))))})).next((()=>v.waitFor(i)))}))}bi(e,t){e.createObjectStore(ds,{keyPath:pT});const n=t.store(ds),s=new Cc,i=a=>{if(s.add(a)){const c=a.lastSegment(),u=a.popLast();return n.put({collectionId:c,parent:Ce(u)})}};return t.store(tn).ee({X:!0},((a,c)=>{const u=new X(a);return i(u.popLast())})).next((()=>t.store(Qn).ee({X:!0},(([a,c,u],h)=>{const f=Xe(c);return i(f.popLast())}))))}Di(e){const t=e.store(Jn);return t.ee(((n,s)=>{const i=Kr(s),a=yp(this.serializer,i);return t.put(a)}))}Ci(e,t){const n=t.store(tn),s=[];return n.ee(((i,a)=>{const c=t.store(Oi),u=(function(m){return m.document?new O(X.fromString(m.document.name).popFirst(5)):m.noDocument?O.fromSegments(m.noDocument.path):m.unknownDocument?O.fromSegments(m.unknownDocument.path):M(36783)})(a).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(c.put(h))})).next((()=>v.waitFor(s)))}Fi(e,t){const n=t.store($e),s=Vp(this.serializer),i=new Dc(yo.mi,this.serializer.yt);return n.J().next((a=>{const c=new Map;return a.forEach((u=>{let h=c.get(u.userId)??G();rn(this.serializer,u).keys().forEach((f=>h=h.add(f))),c.set(u.userId,h)})),v.forEach(c,((u,h)=>{const f=new Re(h),m=go.wt(this.serializer,f),_=i.getIndexManager(f),R=_o.wt(f,this.serializer,_,i.referenceDelegate);return new Dp(s,R,m,_).recalculateAndSaveOverlaysForDocumentKeys(new Pa(t,Ne.ce),u).next()}))}))}}function Oh(r){r.createObjectStore(Xn,{keyPath:dT}).createIndex(hc,fT,{unique:!0}),r.createObjectStore(Jn,{keyPath:"targetId"}).createIndex(mf,hT,{unique:!0}),r.createObjectStore(hn)}const St="IndexedDbPersistence",aa=18e5,ca=5e3,ua="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",GE="main";class kc{constructor(e,t,n,s,i,a,c,u,h,f,m=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Mi=i,this.window=a,this.document=c,this.xi=h,this.Oi=f,this.Ni=m,this.ci=null,this.li=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Bi=null,this.inForeground=!1,this.Li=null,this.ki=null,this.qi=Number.NEGATIVE_INFINITY,this.Qi=_=>Promise.resolve(),!kc.v())throw new k(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new kE(this,s),this.$i=t+GE,this.serializer=new _p(u),this.Ui=new Mt(this.$i,this.Ni,new $E(this.serializer)),this.hi=new EE,this.Pi=new CE(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Vp(this.serializer),this.Ii=new TE,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,f===!1&&he(St,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Wi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new k(P.FAILED_PRECONDITION,ua);return this.Gi(),this.zi(),this.ji(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Pi.getHighestSequenceNumber(e)))})).then((e=>{this.ci=new Ne(e,this.xi)})).then((()=>{this.li=!0})).catch((e=>(this.Ui&&this.Ui.close(),Promise.reject(e))))}Ji(e){return this.Qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ui.$((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Mi.enqueueAndForget((async()=>{this.started&&await this.Wi()})))}Wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>ci(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.Hi(e).next((t=>{t||(this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))))}))})).next((()=>this.Yi(e))).next((t=>this.isPrimary&&!t?this.Zi(e).next((()=>!1)):!!t&&this.Xi(e).next((()=>!0)))))).catch((e=>{if(Gt(e))return V(St,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return V(St,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Mi.enqueueRetryable((()=>this.Qi(e))),this.isPrimary=e}))}Hi(e){return jr(e).get(Cn).next((t=>v.resolve(this.es(t))))}ts(e){return ci(e).delete(this.clientId)}async ns(){if(this.isPrimary&&!this.rs(this.qi,aa)){this.qi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=ge(t,Yn);return n.J().next((s=>{const i=this.ss(s,aa),a=s.filter((c=>i.indexOf(c)===-1));return v.forEach(a,(c=>n.delete(c.clientId))).next((()=>a))}))})).catch((()=>[]));if(this.Ki)for(const t of e)this.Ki.removeItem(this._s(t.clientId))}}ji(){this.ki=this.Mi.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.Wi().then((()=>this.ns())).then((()=>this.ji()))))}es(e){return!!e&&e.ownerId===this.clientId}Yi(e){return this.Oi?v.resolve(!0):jr(e).get(Cn).next((t=>{if(t!==null&&this.rs(t.leaseTimestampMs,ca)&&!this.us(t.ownerId)){if(this.es(t)&&this.networkEnabled)return!0;if(!this.es(t)){if(!t.allowTabSynchronization)throw new k(P.FAILED_PRECONDITION,ua);return!1}}return!(!this.networkEnabled||!this.inForeground)||ci(e).J().next((n=>this.ss(n,ca).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||a&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&V(St,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.li=!1,this.cs(),this.ki&&(this.ki.cancel(),this.ki=null),this.ls(),this.hs(),await this.Ui.runTransaction("shutdown","readwrite",[Rs,Yn],(e=>{const t=new Pa(e,Ne.ce);return this.Zi(t).next((()=>this.ts(t)))})),this.Ui.close(),this.Ps()}ss(e,t){return e.filter((n=>this.rs(n.updateTimeMs,t)&&!this.us(n.clientId)))}Ts(){return this.runTransaction("getActiveClients","readonly",(e=>ci(e).J().next((t=>this.ss(t,aa).map((n=>n.clientId))))))}get started(){return this.li}getGlobalsCache(){return this.hi}getMutationQueue(e,t){return _o.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new PE(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return go.wt(this.serializer,e)}getBundleCache(){return this.Ii}runTransaction(e,t,n){V(St,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(u){return u===18?VT:u===17?wf:u===16?CT:u===15?pc:u===14?Ef:u===13?Tf:u===12?PT:u===11?If:void M(60245)})(this.Ni);let a;return this.Ui.runTransaction(e,s,i,(c=>(a=new Pa(c,this.ci?this.ci.next():Ne.ce),t==="readwrite-primary"?this.Hi(a).next((u=>!!u||this.Yi(a))).next((u=>{if(!u)throw he(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))),new k(P.FAILED_PRECONDITION,uf);return n(a)})).next((u=>this.Xi(a).next((()=>u)))):this.Is(a).next((()=>n(a)))))).then((c=>(a.raiseOnCommittedEvent(),c)))}Is(e){return jr(e).get(Cn).next((t=>{if(t!==null&&this.rs(t.leaseTimestampMs,ca)&&!this.us(t.ownerId)&&!this.es(t)&&!(this.Oi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new k(P.FAILED_PRECONDITION,ua)}))}Xi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return jr(e).put(Cn,t)}static v(){return Mt.v()}Zi(e){const t=jr(e);return t.get(Cn).next((n=>this.es(n)?(V(St,"Releasing primary lease."),t.delete(Cn)):v.resolve()))}rs(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(he(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Gi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Li=()=>{this.Mi.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.Wi())))},this.document.addEventListener("visibilitychange",this.Li),this.inForeground=this.document.visibilityState==="visible")}ls(){this.Li&&(this.document.removeEventListener("visibilitychange",this.Li),this.Li=null)}zi(){typeof this.window?.addEventListener=="function"&&(this.Bi=()=>{this.cs();const e=/(?:Version|Mobile)\/1[456]/;dd()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Mi.enterRestrictedMode(!0),this.Mi.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Bi))}hs(){this.Bi&&(this.window.removeEventListener("pagehide",this.Bi),this.Bi=null)}us(e){try{const t=this.Ki?.getItem(this._s(e))!==null;return V(St,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(t){return he(St,"Failed to get zombied client id.",t),!1}}cs(){if(this.Ki)try{this.Ki.setItem(this._s(this.clientId),String(Date.now()))}catch(e){he("Failed to set zombie client id.",e)}}Ps(){if(this.Ki)try{this.Ki.removeItem(this._s(this.clientId))}catch{}}_s(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function jr(r){return ge(r,Rs)}function ci(r){return ge(r,Yn)}function kp(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Es=n,this.ds=s}static As(e,t){let n=G(),s=G();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Nc(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return dd()?8:hf(me())>0?6:4})()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.ys(e,t).next((a=>{i.result=a})).next((()=>{if(!i.result)return this.ws(e,t,s,n).next((a=>{i.result=a}))})).next((()=>{if(i.result)return;const a=new KE;return this.Ss(e,t,a).next((c=>{if(i.result=c,this.Vs)return this.bs(e,t,a,c.size)}))})).next((()=>i.result))}bs(e,t,n,s){return n.documentReadCount<this.fs?(On()<=K.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Mn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),v.resolve()):(On()<=K.DEBUG&&V("QueryEngine","Query:",Mn(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.gs*s?(On()<=K.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Mn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Be(t))):v.resolve())}ys(e,t){if(ih(t))return v.resolve(null);let n=Be(t);return this.indexManager.getIndexType(e,n).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=Oa(t,null,"F"),n=Be(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((i=>{const a=G(...i);return this.ps.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,n).next((u=>{const h=this.Ds(t,c);return this.Cs(t,h,a,u.readTime)?this.ys(e,Oa(t,null,"F")):this.vs(e,h,t,u)}))))})))))}ws(e,t,n,s){return ih(t)||s.isEqual(B.min())?v.resolve(null):this.ps.getDocuments(e,n).next((i=>{const a=this.Ds(t,i);return this.Cs(t,a,n,s)?v.resolve(null):(On()<=K.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Mn(t)),this.vs(e,a,t,af(s,Hn)).next((c=>c)))}))}Ds(e,t){let n=new te($f(e));return t.forEach(((s,i)=>{Cs(e,i)&&(n=n.add(i))})),n}Cs(e,t,n,s){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,n){return On()<=K.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Mn(t)),this.ps.getDocumentsMatchingQuery(e,t,qe.min(),n)}vs(e,t,n,s){return this.ps.getDocumentsMatchingQuery(e,n,s).next((i=>(t.forEach((a=>{i=i.insert(a.key,a)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xc="LocalStore",WE=3e8;class HE{constructor(e,t,n,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new se(z),this.xs=new mt((i=>In(i)),bs),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(n)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Dp(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ms)))}}function xp(r,e,t,n){return new HE(r,e,t,n)}async function Op(r,e){const t=L(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next((i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(n)))).next((i=>{const a=[],c=[];let u=G();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next((h=>({Ls:h,removedBatchIds:a,addedBatchIds:c})))}))}))}function QE(r,e){const t=L(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,u,h,f){const m=h.batch,_=m.keys();let R=v.resolve();return _.forEach((C=>{R=R.next((()=>f.getEntry(u,C))).next((N=>{const D=h.docVersions.get(C);F(D!==null,48541),N.version.compareTo(D)<0&&(m.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))}))})),R.next((()=>c.mutationQueue.removeMutationBatch(u,m)))})(t,n,e,i).next((()=>i.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let u=G();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(n,s)))}))}function Mp(r){const e=L(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Pi.getLastRemoteSnapshotVersion(t)))}function JE(r,e){const t=L(r),n=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const c=[];e.targetChanges.forEach(((f,m)=>{const _=s.get(m);if(!_)return;c.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,m).next((()=>t.Pi.addMatchingKeys(i,f.addedDocuments,m))));let R=_.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(m)!==null?R=R.withResumeToken(de.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):f.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(f.resumeToken,n)),s=s.insert(m,R),(function(N,D,$){return N.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=WE?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0})(_,R,f)&&c.push(t.Pi.updateTargetData(i,R))}));let u=Fe(),h=G();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(XE(i,a,e.documentUpdates).next((f=>{u=f.ks,h=f.qs}))),!n.isEqual(B.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next((m=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,n)));c.push(f)}return v.waitFor(c).next((()=>a.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,u,h))).next((()=>u))})).then((i=>(t.Ms=s,i)))}function XE(r,e,t){let n=G(),s=G();return t.forEach((i=>n=n.add(i))),e.getEntries(r,n).next((i=>{let a=Fe();return t.forEach(((c,u)=>{const h=i.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(B.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):V(xc,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)})),{ks:a,qs:s}}))}function YE(r,e){const t=L(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=ln),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function Ki(r,e){const t=L(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let s;return t.Pi.getTargetData(n,e).next((i=>i?(s=i,v.resolve(s)):t.Pi.allocateTargetId(n).next((a=>(s=new ut(e,a,"TargetPurposeListen",n.currentSequenceNumber),t.Pi.addTargetData(n,s).next((()=>s)))))))})).then((n=>{const s=t.Ms.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(n.targetId,n),t.xs.set(e,n.targetId)),n}))}async function cr(r,e,t){const n=L(r),s=n.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,(a=>n.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Gt(a))throw a;V(xc,`Failed to update sequence numbers for target ${e}: ${a}`)}n.Ms=n.Ms.remove(e),n.xs.delete(s.target)}function Wi(r,e,t){const n=L(r);let s=B.min(),i=G();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,h,f){const m=L(u),_=m.xs.get(f);return _!==void 0?v.resolve(m.Ms.get(_)):m.Pi.getTargetData(h,f)})(n,a,Be(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,n.Pi.getMatchingKeysForTargetId(a,c.targetId).next((u=>{i=u}))})).next((()=>n.Fs.getDocumentsMatchingQuery(a,e,t?s:B.min(),t?i:G()))).next((c=>(Up(n,zf(e),c),{documents:c,Qs:i})))))}function Lp(r,e){const t=L(r),n=L(t.Pi),s=t.Ms.get(e);return s?Promise.resolve(s.target):t.persistence.runTransaction("Get target data","readonly",(i=>n.At(i,e).next((a=>a?a.target:null))))}function Fp(r,e){const t=L(r),n=t.Os.get(e)||B.min();return t.persistence.runTransaction("Get new document changes","readonly",(s=>t.Ns.getAllFromCollectionGroup(s,e,af(n,Hn),Number.MAX_SAFE_INTEGER))).then((s=>(Up(t,e,s),s)))}function Up(r,e,t){let n=r.Os.get(e)||B.min();t.forEach(((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)})),r.Os.set(e,n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp="firestore_clients";function Mh(r,e){return`${Bp}_${r}_${e}`}const qp="firestore_mutations";function Lh(r,e,t){let n=`${qp}_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const jp="firestore_targets";function la(r,e){return`${jp}_${r}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je="SharedClientState";class Hi{constructor(e,t,n,s){this.user=e,this.batchId=t,this.state=n,this.error=s}static Ws(e,t,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new k(s.error.code,s.error.message))),a?new Hi(e,t,s.state,i):(he(Je,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Gs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ss{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Ws(e,t){const n=JSON.parse(t);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new k(n.error.code,n.error.message))),i?new ss(e,n.state,s):(he(Je,`Failed to parse target state for ID '${e}': ${t}`),null)}Gs(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Qi{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Ws(e,t){const n=JSON.parse(t);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=Ic();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=df(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new Qi(e,i):(he(Je,`Failed to parse client data for instance '${e}': ${t}`),null)}}class Oc{constructor(e,t){this.clientId=e,this.onlineState=t}static Ws(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new Oc(t.clientId,t.onlineState):(he(Je,`Failed to parse online state: ${e}`),null)}}class za{constructor(){this.activeTargetIds=Ic()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class ha{constructor(e,t,n,s,i){this.window=e,this.Mi=t,this.persistenceKey=n,this.Js=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Hs=this.Ys.bind(this),this.Zs=new se(z),this.started=!1,this.Xs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.eo=Mh(this.persistenceKey,this.Js),this.no=(function(u){return`firestore_sequence_number_${u}`})(this.persistenceKey),this.Zs=this.Zs.insert(this.Js,new za),this.ro=new RegExp(`^${Bp}_${a}_([^_]*)$`),this.io=new RegExp(`^${qp}_${a}_(\\d+)(?:_(.*))?$`),this.so=new RegExp(`^${jp}_${a}_(\\d+)$`),this.oo=(function(u){return`firestore_online_state_${u}`})(this.persistenceKey),this._o=(function(u){return`firestore_bundle_loaded_v2_${u}`})(this.persistenceKey),this.window.addEventListener("storage",this.Hs)}static v(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Ts();for(const n of e){if(n===this.Js)continue;const s=this.getItem(Mh(this.persistenceKey,n));if(s){const i=Qi.Ws(n,s);i&&(this.Zs=this.Zs.insert(i.clientId,i))}}this.ao();const t=this.storage.getItem(this.oo);if(t){const n=this.uo(t);n&&this.co(n)}for(const n of this.Xs)this.Ys(n);this.Xs=[],this.window.addEventListener("pagehide",(()=>this.shutdown())),this.started=!0}writeSequenceNumber(e){this.setItem(this.no,JSON.stringify(e))}getAllActiveQueryTargets(){return this.lo(this.Zs)}isActiveQueryTarget(e){let t=!1;return this.Zs.forEach(((n,s)=>{s.activeTargetIds.has(e)&&(t=!0)})),t}addPendingMutation(e){this.ho(e,"pending")}updateMutationState(e,t,n){this.ho(e,t,n),this.Po(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const s=this.storage.getItem(la(this.persistenceKey,e));if(s){const i=ss.Ws(e,s);i&&(n=i.state)}}return t&&this.To.zs(e),this.ao(),n}removeLocalQueryTarget(e){this.To.js(e),this.ao()}isLocalQueryTarget(e){return this.To.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(la(this.persistenceKey,e))}updateQueryState(e,t,n){this.Io(e,t,n)}handleUserChange(e,t,n){t.forEach((s=>{this.Po(s)})),this.currentUser=e,n.forEach((s=>{this.addPendingMutation(s)}))}setOnlineState(e){this.Eo(e)}notifyBundleLoaded(e){this.Ao(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Hs),this.removeItem(this.eo),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return V(Je,"READ",e,t),t}setItem(e,t){V(Je,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){V(Je,"REMOVE",e),this.storage.removeItem(e)}Ys(e){const t=e;if(t.storageArea===this.storage){if(V(Je,"EVENT",t.key,t.newValue),t.key===this.eo)return void he("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Mi.enqueueRetryable((async()=>{if(this.started){if(t.key!==null){if(this.ro.test(t.key)){if(t.newValue==null){const n=this.Ro(t.key);return this.Vo(n,null)}{const n=this.mo(t.key,t.newValue);if(n)return this.Vo(n.clientId,n)}}else if(this.io.test(t.key)){if(t.newValue!==null){const n=this.fo(t.key,t.newValue);if(n)return this.po(n)}}else if(this.so.test(t.key)){if(t.newValue!==null){const n=this.yo(t.key,t.newValue);if(n)return this.wo(n)}}else if(t.key===this.oo){if(t.newValue!==null){const n=this.uo(t.newValue);if(n)return this.co(n)}}else if(t.key===this.no){const n=(function(i){let a=Ne.ce;if(i!=null)try{const c=JSON.parse(i);F(typeof c=="number",30636,{So:i}),a=c}catch(c){he(Je,"Failed to read sequence number from WebStorage",c)}return a})(t.newValue);n!==Ne.ce&&this.sequenceNumberHandler(n)}else if(t.key===this._o){const n=this.bo(t.newValue);await Promise.all(n.map((s=>this.syncEngine.Do(s))))}}}else this.Xs.push(t)}))}}get To(){return this.Zs.get(this.Js)}ao(){this.setItem(this.eo,this.To.Gs())}ho(e,t,n){const s=new Hi(this.currentUser,e,t,n),i=Lh(this.persistenceKey,this.currentUser,e);this.setItem(i,s.Gs())}Po(e){const t=Lh(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Eo(e){const t={clientId:this.Js,onlineState:e};this.storage.setItem(this.oo,JSON.stringify(t))}Io(e,t,n){const s=la(this.persistenceKey,e),i=new ss(e,t,n);this.setItem(s,i.Gs())}Ao(e){const t=JSON.stringify(Array.from(e));this.setItem(this._o,t)}Ro(e){const t=this.ro.exec(e);return t?t[1]:null}mo(e,t){const n=this.Ro(e);return Qi.Ws(n,t)}fo(e,t){const n=this.io.exec(e),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return Hi.Ws(new Re(i),s,t)}yo(e,t){const n=this.so.exec(e),s=Number(n[1]);return ss.Ws(s,t)}uo(e){return Oc.Ws(e)}bo(e){return JSON.parse(e)}async po(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Co(e.batchId,e.state,e.error);V(Je,`Ignoring mutation for non-active user ${e.user.uid}`)}wo(e){return this.syncEngine.vo(e.targetId,e.state,e.error)}Vo(e,t){const n=t?this.Zs.insert(e,t):this.Zs.remove(e),s=this.lo(this.Zs),i=this.lo(n),a=[],c=[];return i.forEach((u=>{s.has(u)||a.push(u)})),s.forEach((u=>{i.has(u)||c.push(u)})),this.syncEngine.Fo(a,c).then((()=>{this.Zs=n}))}co(e){this.Zs.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}lo(e){let t=Ic();return e.forEach(((n,s)=>{t=t.unionWith(s.activeTargetIds)})),t}}class zp{constructor(){this.Mo=new za,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,n){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new za,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZE{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fh="ConnectivityMonitor";class Uh{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){V(Fh,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){V(Fh,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ui=null;function $a(){return ui===null?ui=(function(){return 268435456+Math.round(2147483648*Math.random())})():ui++,"0x"+ui.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const da="RestConnection",ew={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class tw{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${n}/databases/${s}`,this.Wo=this.databaseId.database===Li?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Go(e,t,n,s,i){const a=$a(),c=this.zo(e,t.toUriEncodedString());V(da,`Sending RPC '${e}' ${a}:`,c,n);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(u,s,i);const{host:h}=new URL(c),f=dr(h);return this.Jo(e,c,u,n,f).then((m=>(V(da,`Received RPC '${e}' ${a}: `,m),m)),(m=>{throw as(da,`RPC '${e}' ${a} failed with error: `,m,"url: ",c,"request:",n),m}))}Ho(e,t,n,s,i,a){return this.Go(e,t,n,s,i)}jo(e,t,n){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+mr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),n&&n.headers.forEach(((s,i)=>e[i]=s))}zo(e,t){const n=ew[e];return`${this.Uo}/v1/${t}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="WebChannelConnection";class rw extends tw{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,n,s,i){const a=$a();return new Promise(((c,u)=>{const h=new Xd;h.setWithCredentials(!0),h.listenOnce(Yd.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case pi.NO_ERROR:const m=h.getResponseJson();V(Se,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(m)),c(m);break;case pi.TIMEOUT:V(Se,`RPC '${e}' ${a} timed out`),u(new k(P.DEADLINE_EXCEEDED,"Request time out"));break;case pi.HTTP_ERROR:const _=h.getStatus();if(V(Se,`RPC '${e}' ${a} failed with status:`,_,"response text:",h.getResponseText()),_>0){let R=h.getResponseJson();Array.isArray(R)&&(R=R[0]);const C=R?.error;if(C&&C.status&&C.message){const N=(function($){const q=$.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(q)>=0?q:P.UNKNOWN})(C.status);u(new k(N,C.message))}else u(new k(P.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new k(P.UNAVAILABLE,"Connection failed."));break;default:M(9055,{l_:e,streamId:a,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{V(Se,`RPC '${e}' ${a} completed.`)}}));const f=JSON.stringify(s);V(Se,`RPC '${e}' ${a} sending request:`,s),h.send(t,"POST",f,n,15)}))}T_(e,t,n){const s=$a(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=tf(),c=ef(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.jo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const f=i.join("");V(Se,`Creating RPC '${e}' stream ${s}: ${f}`,u);const m=a.createWebChannel(f,u);this.I_(m);let _=!1,R=!1;const C=new nw({Yo:D=>{R?V(Se,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(_||(V(Se,`Opening RPC '${e}' stream ${s} transport.`),m.open(),_=!0),V(Se,`RPC '${e}' stream ${s} sending:`,D),m.send(D))},Zo:()=>m.close()}),N=(D,$,q)=>{D.listen($,(U=>{try{q(U)}catch(Y){setTimeout((()=>{throw Y}),0)}}))};return N(m,zr.EventType.OPEN,(()=>{R||(V(Se,`RPC '${e}' stream ${s} transport opened.`),C.o_())})),N(m,zr.EventType.CLOSE,(()=>{R||(R=!0,V(Se,`RPC '${e}' stream ${s} transport closed`),C.a_(),this.E_(m))})),N(m,zr.EventType.ERROR,(D=>{R||(R=!0,as(Se,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),C.a_(new k(P.UNAVAILABLE,"The operation could not be completed")))})),N(m,zr.EventType.MESSAGE,(D=>{if(!R){const $=D.data[0];F(!!$,16349);const q=$,U=q?.error||q[0]?.error;if(U){V(Se,`RPC '${e}' stream ${s} received error:`,U);const Y=U.status;let ne=(function(g){const I=fe[g];if(I!==void 0)return rp(I)})(Y),Q=U.message;ne===void 0&&(ne=P.INTERNAL,Q="Unknown error status: "+Y+" with message "+U.message),R=!0,C.a_(new k(ne,Q)),m.close()}else V(Se,`RPC '${e}' stream ${s} received:`,$),C.u_($)}})),N(c,Zd.STAT_EVENT,(D=>{D.stat===wa.PROXY?V(Se,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===wa.NOPROXY&&V(Se,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{C.__()}),0),C}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((t=>t===e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $p(){return typeof window<"u"?window:null}function Ai(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Io(r){return new uE(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=n,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),n=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-n);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bh="PersistentStream";class Kp{constructor(e,t,n,s,i,a,c,u){this.Mi=e,this.S_=n,this.b_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Gp(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(he(t.toString()),he("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,s])=>{this.D_===t&&this.G_(n,s)}),(n=>{e((()=>{const s=new k(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.z_(s)}))}))}G_(e,t){const n=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo((()=>{n((()=>this.listener.Xo()))})),this.stream.t_((()=>{n((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{n((()=>this.z_(s)))})),this.stream.onMessage((s=>{n((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return V(Bh,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget((()=>this.D_===e?t():(V(Bh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class sw extends Kp{constructor(e,t,n,s,i,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,a),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=dE(this.serializer,e),n=(function(i){if(!("targetChange"in i))return B.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?ke(a.readTime):B.min()})(e);return this.listener.H_(t,n)}Y_(e){const t={};t.database=Fa(this.serializer),t.addTarget=(function(i,a){let c;const u=a.target;if(c=Fi(u)?{documents:hp(i,u)}:{query:dp(i,u).ft},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=op(i,a.resumeToken);const h=Ma(i,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(B.min())>0){c.readTime=ar(i,a.snapshotVersion.toTimestamp());const h=Ma(i,a.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const n=pE(this.serializer,e);n&&(t.labels=n),this.q_(t)}Z_(e){const t={};t.database=Fa(this.serializer),t.removeTarget=e,this.q_(t)}}class iw extends Kp{constructor(e,t,n,s,i,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,a),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return F(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,F(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){F(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=fE(e.writeResults,e.commitTime),n=ke(e.commitTime);return this.listener.na(n,t)}ra(){const e={};e.database=Fa(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>qi(this.serializer,n)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ow{}class aw extends ow{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,n,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.Go(e,La(t,n),s,i,a))).catch((i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new k(P.UNKNOWN,i.toString())}))}Ho(e,t,n,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.Ho(e,La(t,n),s,a,c,i))).catch((a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new k(P.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class cw{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(he(t),this.aa=!1):V("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vn="RemoteStore";class uw{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((a=>{n.enqueueAndForget((async()=>{An(this)&&(V(vn,"Restarting streams for network reachability change."),await(async function(u){const h=L(u);h.Ea.add(4),await ks(h),h.Ra.set("Unknown"),h.Ea.delete(4),await To(h)})(this))}))})),this.Ra=new cw(n,s)}}async function To(r){if(An(r))for(const e of r.da)await e(!0)}async function ks(r){for(const e of r.da)await e(!1)}function Eo(r,e){const t=L(r);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),Fc(t)?Lc(t):Ir(t).O_()&&Mc(t,e))}function ur(r,e){const t=L(r),n=Ir(t);t.Ia.delete(e),n.O_()&&Wp(t,e),t.Ia.size===0&&(n.O_()?n.L_():An(t)&&t.Ra.set("Unknown"))}function Mc(r,e){if(r.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(B.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ir(r).Y_(e)}function Wp(r,e){r.Va.Ue(e),Ir(r).Z_(e)}function Lc(r){r.Va=new iE({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),At:e=>r.Ia.get(e)||null,ht:()=>r.datastore.serializer.databaseId}),Ir(r).start(),r.Ra.ua()}function Fc(r){return An(r)&&!Ir(r).x_()&&r.Ia.size>0}function An(r){return L(r).Ea.size===0}function Hp(r){r.Va=void 0}async function lw(r){r.Ra.set("Online")}async function hw(r){r.Ia.forEach(((e,t)=>{Mc(r,e)}))}async function dw(r,e){Hp(r),Fc(r)?(r.Ra.ha(e),Lc(r)):r.Ra.set("Unknown")}async function fw(r,e,t){if(r.Ra.set("Online"),e instanceof ip&&e.state===2&&e.cause)try{await(async function(s,i){const a=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.Ia.delete(c),s.Va.removeTarget(c))})(r,e)}catch(n){V(vn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Ji(r,n)}else if(e instanceof wi?r.Va.Ze(e):e instanceof sp?r.Va.st(e):r.Va.tt(e),!t.isEqual(B.min()))try{const n=await Mp(r.localStore);t.compareTo(n)>=0&&await(function(i,a){const c=i.Va.Tt(a);return c.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(u.resumeToken,a))}})),c.targetMismatches.forEach(((u,h)=>{const f=i.Ia.get(u);if(!f)return;i.Ia.set(u,f.withResumeToken(de.EMPTY_BYTE_STRING,f.snapshotVersion)),Wp(i,u);const m=new ut(f.target,u,h,f.sequenceNumber);Mc(i,m)})),i.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){V(vn,"Failed to raise snapshot:",n),await Ji(r,n)}}async function Ji(r,e,t){if(!Gt(e))throw e;r.Ea.add(1),await ks(r),r.Ra.set("Offline"),t||(t=()=>Mp(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{V(vn,"Retrying IndexedDB access"),await t(),r.Ea.delete(1),await To(r)}))}function Qp(r,e){return e().catch((t=>Ji(r,t,e)))}async function yr(r){const e=L(r),t=qt(e);let n=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:ln;for(;pw(e);)try{const s=await YE(e.localStore,n);if(s===null){e.Ta.length===0&&t.L_();break}n=s.batchId,mw(e,s)}catch(s){await Ji(e,s)}Jp(e)&&Xp(e)}function pw(r){return An(r)&&r.Ta.length<10}function mw(r,e){r.Ta.push(e);const t=qt(r);t.O_()&&t.X_&&t.ea(e.mutations)}function Jp(r){return An(r)&&!qt(r).x_()&&r.Ta.length>0}function Xp(r){qt(r).start()}async function gw(r){qt(r).ra()}async function _w(r){const e=qt(r);for(const t of r.Ta)e.ea(t.mutations)}async function yw(r,e,t){const n=r.Ta.shift(),s=Ac.from(n,e,t);await Qp(r,(()=>r.remoteSyncer.applySuccessfulWrite(s))),await yr(r)}async function Iw(r,e){e&&qt(r).X_&&await(async function(n,s){if((function(a){return nE(a)&&a!==P.ABORTED})(s.code)){const i=n.Ta.shift();qt(n).B_(),await Qp(n,(()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s))),await yr(n)}})(r,e),Jp(r)&&Xp(r)}async function qh(r,e){const t=L(r);t.asyncQueue.verifyOperationInProgress(),V(vn,"RemoteStore received new credentials");const n=An(t);t.Ea.add(3),await ks(t),n&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await To(t)}async function Ga(r,e){const t=L(r);e?(t.Ea.delete(2),await To(t)):e||(t.Ea.add(2),await ks(t),t.Ra.set("Unknown"))}function Ir(r){return r.ma||(r.ma=(function(t,n,s){const i=L(t);return i.sa(),new sw(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Xo:lw.bind(null,r),t_:hw.bind(null,r),r_:dw.bind(null,r),H_:fw.bind(null,r)}),r.da.push((async e=>{e?(r.ma.B_(),Fc(r)?Lc(r):r.Ra.set("Unknown")):(await r.ma.stop(),Hp(r))}))),r.ma}function qt(r){return r.fa||(r.fa=(function(t,n,s){const i=L(t);return i.sa(),new iw(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(r.datastore,r.asyncQueue,{Xo:()=>Promise.resolve(),t_:gw.bind(null,r),r_:Iw.bind(null,r),ta:_w.bind(null,r),na:yw.bind(null,r)}),r.da.push((async e=>{e?(r.fa.B_(),await yr(r)):(await r.fa.stop(),r.Ta.length>0&&(V(vn,`Stopping write stream with ${r.Ta.length} pending writes`),r.Ta=[]))}))),r.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new He,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const a=Date.now()+n,c=new Uc(e,t,a,s,i);return c.start(n),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wo(r,e){if(he("AsyncQueue",`${e}: ${r}`),Gt(r))return new k(P.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $n{static emptySet(e){return new $n(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||O.comparator(t.key,n.key):(t,n)=>O.comparator(t.key,n.key),this.keyedMap=$r(),this.sortedSet=new se(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof $n)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new $n;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(){this.ga=new se(O.comparator)}track(e){const t=e.doc.key,n=this.ga.get(t);n?e.type!==0&&n.type===3?this.ga=this.ga.insert(t,e):e.type===3&&n.type!==1?this.ga=this.ga.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.ga=this.ga.remove(t):e.type===1&&n.type===2?this.ga=this.ga.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):M(63341,{Rt:e,pa:n}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,n)=>{e.push(n)})),e}}class lr{constructor(e,t,n,s,i,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new lr(e,t,$n.emptySet(t),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&fo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tw{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class Ew{constructor(){this.queries=zh(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,n){const s=L(t),i=s.queries;s.queries=zh(),i.forEach(((a,c)=>{for(const u of c.Sa)u.onError(n)}))})(this,new k(P.ABORTED,"Firestore shutting down"))}}function zh(){return new mt((r=>jf(r)),fo)}async function Bc(r,e){const t=L(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(n=2):(i=new Tw,n=e.Da()?0:1);try{switch(n){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=wo(a,`Initialization of query '${Mn(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&jc(t)}async function qc(r,e){const t=L(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const a=i.Sa.indexOf(e);a>=0&&(i.Sa.splice(a,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function ww(r,e){const t=L(r);let n=!1;for(const s of e){const i=s.query,a=t.queries.get(i);if(a){for(const c of a.Sa)c.Fa(s)&&(n=!0);a.wa=s}}n&&jc(t)}function vw(r,e,t){const n=L(r),s=n.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);n.queries.delete(e)}function jc(r){r.Ca.forEach((e=>{e.next()}))}var Ka,$h;($h=Ka||(Ka={})).Ma="default",$h.Cache="cache";class zc{constructor(e,t,n){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=n||{}}Fa(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new lr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const n=t!=="Offline";return(!this.options.qa||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=lr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ka.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(e){this.key=e}}class Zp{constructor(e){this.key=e}}class em{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=G(),this.mutatedKeys=G(),this.eu=$f(e),this.tu=new $n(this.eu)}get nu(){return this.Ya}ru(e,t){const n=t?t.iu:new jh,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,m)=>{const _=s.get(f),R=Cs(this.query,m)?m:null,C=!!_&&this.mutatedKeys.has(_.key),N=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let D=!1;_&&R?_.data.isEqual(R.data)?C!==N&&(n.track({type:3,doc:R}),D=!0):this.su(_,R)||(n.track({type:2,doc:R}),D=!0,(u&&this.eu(R,u)>0||h&&this.eu(R,h)<0)&&(c=!0)):!_&&R?(n.track({type:0,doc:R}),D=!0):_&&!R&&(n.track({type:1,doc:_}),D=!0,(u||h)&&(c=!0)),D&&(R?(a=a.add(R),i=N?i.add(f):i.delete(f)):(a=a.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),i=i.delete(f.key),n.track({type:1,doc:f})}return{tu:a,iu:n,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort(((f,m)=>(function(R,C){const N=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{Rt:D})}};return N(R)-N(C)})(f.type,m.type)||this.eu(f.doc,m.doc))),this.ou(n),s=s??!1;const c=t&&!s?this._u():[],u=this.Xa.size===0&&this.current&&!s?1:0,h=u!==this.Za;return this.Za=u,a.length!==0||h?{snapshot:new lr(this.query,e.tu,i,a,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new jh,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Ya=this.Ya.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ya=this.Ya.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=G(),this.tu.forEach((n=>{this.uu(n.key)&&(this.Xa=this.Xa.add(n.key))}));const t=[];return e.forEach((n=>{this.Xa.has(n)||t.push(new Zp(n))})),this.Xa.forEach((n=>{e.has(n)||t.push(new Yp(n))})),t}cu(e){this.Ya=e.Qs,this.Xa=G();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return lr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Tr="SyncEngine";class Aw{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class Sw{constructor(e){this.key=e,this.hu=!1}}class Rw{constructor(e,t,n,s,i,a){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new mt((c=>jf(c)),fo),this.Iu=new Map,this.Eu=new Set,this.du=new se(O.comparator),this.Au=new Map,this.Ru=new Vc,this.Vu={},this.mu=new Map,this.fu=wn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function bw(r,e,t=!0){const n=vo(r);let s;const i=n.Tu.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await tm(n,e,t,!0),s}async function Pw(r,e){const t=vo(r);await tm(t,e,!0,!1)}async function tm(r,e,t,n){const s=await Ki(r.localStore,Be(e)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,t);let c;return n&&(c=await $c(r,e,i,a==="current",s.resumeToken)),r.isPrimaryClient&&t&&Eo(r.remoteStore,s),c}async function $c(r,e,t,n,s){r.pu=(m,_,R)=>(async function(N,D,$,q){let U=D.view.ru($);U.Cs&&(U=await Wi(N.localStore,D.query,!1).then((({documents:T})=>D.view.ru(T,U))));const Y=q&&q.targetChanges.get(D.targetId),ne=q&&q.targetMismatches.get(D.targetId)!=null,Q=D.view.applyChanges(U,N.isPrimaryClient,Y,ne);return Wa(N,D.targetId,Q.au),Q.snapshot})(r,m,_,R);const i=await Wi(r.localStore,e,!0),a=new em(e,i.Qs),c=a.ru(i.documents),u=Ds.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=a.applyChanges(c,r.isPrimaryClient,u);Wa(r,t,h.au);const f=new Aw(e,t,a);return r.Tu.set(e,f),r.Iu.has(t)?r.Iu.get(t).push(e):r.Iu.set(t,[e]),h.snapshot}async function Cw(r,e,t){const n=L(r),s=n.Tu.get(e),i=n.Iu.get(s.targetId);if(i.length>1)return n.Iu.set(s.targetId,i.filter((a=>!fo(a,e)))),void n.Tu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await cr(n.localStore,s.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(s.targetId),t&&ur(n.remoteStore,s.targetId),hr(n,s.targetId)})).catch($t)):(hr(n,s.targetId),await cr(n.localStore,s.targetId,!0))}async function Vw(r,e){const t=L(r),n=t.Tu.get(e),s=t.Iu.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),ur(t.remoteStore,n.targetId))}async function Dw(r,e,t){const n=Hc(r);try{const s=await(function(a,c){const u=L(a),h=Z.now(),f=c.reduce(((R,C)=>R.add(C.key)),G());let m,_;return u.persistence.runTransaction("Locally write mutations","readwrite",(R=>{let C=Fe(),N=G();return u.Ns.getEntries(R,f).next((D=>{C=D,C.forEach((($,q)=>{q.isValidDocument()||(N=N.add($))}))})).next((()=>u.localDocuments.getOverlayedDocuments(R,C))).next((D=>{m=D;const $=[];for(const q of c){const U=eE(q,m.get(q.key).overlayedDocument);U!=null&&$.push(new gt(q.key,U,kf(U.value.mapValue),Oe.exists(!0)))}return u.mutationQueue.addMutationBatch(R,h,$,c)})).next((D=>{_=D;const $=D.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(R,D.batchId,$)}))})).then((()=>({batchId:_.batchId,changes:Kf(m)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),(function(a,c,u){let h=a.Vu[a.currentUser.toKey()];h||(h=new se(z)),h=h.insert(c,u),a.Vu[a.currentUser.toKey()]=h})(n,s.batchId,t),await Wt(n,s.changes),await yr(n.remoteStore)}catch(s){const i=wo(s,"Failed to persist write");t.reject(i)}}async function nm(r,e){const t=L(r);try{const n=await JE(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const a=t.Au.get(i);a&&(F(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?F(a.hu,14607):s.removedDocuments.size>0&&(F(a.hu,42227),a.hu=!1))})),await Wt(t,n,e)}catch(n){await $t(n)}}function Gh(r,e,t){const n=L(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.Tu.forEach(((i,a)=>{const c=a.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(a,c){const u=L(a);u.onlineState=c;let h=!1;u.queries.forEach(((f,m)=>{for(const _ of m.Sa)_.va(c)&&(h=!0)})),h&&jc(u)})(n.eventManager,e),s.length&&n.Pu.H_(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function kw(r,e,t){const n=L(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.Au.get(e),i=s&&s.key;if(i){let a=new se(O.comparator);a=a.insert(i,ue.newNoDocument(i,B.min()));const c=G().add(i),u=new Vs(B.min(),new Map,new se(z),a,c);await nm(n,u),n.du=n.du.remove(i),n.Au.delete(e),Wc(n)}else await cr(n.localStore,e,!1).then((()=>hr(n,e,t))).catch($t)}async function Nw(r,e){const t=L(r),n=e.batch.batchId;try{const s=await QE(t.localStore,e);Kc(t,n,null),Gc(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Wt(t,s)}catch(s){await $t(s)}}async function xw(r,e,t){const n=L(r);try{const s=await(function(a,c){const u=L(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next((m=>(F(m!==null,37113),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m)))).next((()=>u.mutationQueue.performConsistencyCheck(h))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>u.localDocuments.getDocuments(h,f)))}))})(n.localStore,e);Kc(n,e,t),Gc(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Wt(n,s)}catch(s){await $t(s)}}function Gc(r,e){(r.mu.get(e)||[]).forEach((t=>{t.resolve()})),r.mu.delete(e)}function Kc(r,e,t){const n=L(r);let s=n.Vu[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.Vu[n.currentUser.toKey()]=s}}function hr(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Iu.get(e))r.Tu.delete(n),t&&r.Pu.yu(n,t);r.Iu.delete(e),r.isPrimaryClient&&r.Ru.jr(e).forEach((n=>{r.Ru.containsKey(n)||rm(r,n)}))}function rm(r,e){r.Eu.delete(e.path.canonicalString());const t=r.du.get(e);t!==null&&(ur(r.remoteStore,t),r.du=r.du.remove(e),r.Au.delete(t),Wc(r))}function Wa(r,e,t){for(const n of t)n instanceof Yp?(r.Ru.addReference(n.key,e),Ow(r,n)):n instanceof Zp?(V(Tr,"Document no longer in limbo: "+n.key),r.Ru.removeReference(n.key,e),r.Ru.containsKey(n.key)||rm(r,n.key)):M(19791,{wu:n})}function Ow(r,e){const t=e.key,n=t.path.canonicalString();r.du.get(t)||r.Eu.has(n)||(V(Tr,"New document in limbo: "+t),r.Eu.add(n),Wc(r))}function Wc(r){for(;r.Eu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const e=r.Eu.values().next().value;r.Eu.delete(e);const t=new O(X.fromString(e)),n=r.fu.next();r.Au.set(n,new Sw(t)),r.du=r.du.insert(t,n),Eo(r.remoteStore,new ut(Be(Ps(t.path)),n,"TargetPurposeLimboResolution",Ne.ce))}}async function Wt(r,e,t){const n=L(r),s=[],i=[],a=[];n.Tu.isEmpty()||(n.Tu.forEach(((c,u)=>{a.push(n.pu(u,e,t).then((h=>{if((h||t)&&n.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(u.targetId)?.current;n.sharedClientState.updateQueryState(u.targetId,f?"current":"not-current")}if(h){s.push(h);const f=Nc.As(u.targetId,h);i.push(f)}})))})),await Promise.all(a),n.Pu.H_(s),await(async function(u,h){const f=L(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(m=>v.forEach(h,(_=>v.forEach(_.Es,(R=>f.persistence.referenceDelegate.addReference(m,_.targetId,R))).next((()=>v.forEach(_.ds,(R=>f.persistence.referenceDelegate.removeReference(m,_.targetId,R)))))))))}catch(m){if(!Gt(m))throw m;V(xc,"Failed to update sequence numbers: "+m)}for(const m of h){const _=m.targetId;if(!m.fromCache){const R=f.Ms.get(_),C=R.snapshotVersion,N=R.withLastLimboFreeSnapshotVersion(C);f.Ms=f.Ms.insert(_,N)}}})(n.localStore,i))}async function Mw(r,e){const t=L(r);if(!t.currentUser.isEqual(e)){V(Tr,"User change. New user:",e.toKey());const n=await Op(t.localStore,e);t.currentUser=e,(function(i,a){i.mu.forEach((c=>{c.forEach((u=>{u.reject(new k(P.CANCELLED,a))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Wt(t,n.Ls)}}function Lw(r,e){const t=L(r),n=t.Au.get(e);if(n&&n.hu)return G().add(n.key);{let s=G();const i=t.Iu.get(e);if(!i)return s;for(const a of i){const c=t.Tu.get(a);s=s.unionWith(c.view.nu)}return s}}async function Fw(r,e){const t=L(r),n=await Wi(t.localStore,e.query,!0),s=e.view.cu(n);return t.isPrimaryClient&&Wa(t,e.targetId,s.au),s}async function Uw(r,e){const t=L(r);return Fp(t.localStore,e).then((n=>Wt(t,n)))}async function Bw(r,e,t,n){const s=L(r),i=await(function(c,u){const h=L(c),f=L(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",(m=>f.er(m,u).next((_=>_?h.localDocuments.getDocuments(m,_):v.resolve(null)))))})(s.localStore,e);i!==null?(t==="pending"?await yr(s.remoteStore):t==="acknowledged"||t==="rejected"?(Kc(s,e,n||null),Gc(s,e),(function(c,u){L(L(c).mutationQueue).ir(u)})(s.localStore,e)):M(6720,"Unknown batchState",{Su:t}),await Wt(s,i)):V(Tr,"Cannot apply mutation batch with id: "+e)}async function qw(r,e){const t=L(r);if(vo(t),Hc(t),e===!0&&t.gu!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),s=await Kh(t,n.toArray());t.gu=!0,await Ga(t.remoteStore,!0);for(const i of s)Eo(t.remoteStore,i)}else if(e===!1&&t.gu!==!1){const n=[];let s=Promise.resolve();t.Iu.forEach(((i,a)=>{t.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then((()=>(hr(t,a),cr(t.localStore,a,!0)))),ur(t.remoteStore,a)})),await s,await Kh(t,n),(function(a){const c=L(a);c.Au.forEach(((u,h)=>{ur(c.remoteStore,h)})),c.Ru.Jr(),c.Au=new Map,c.du=new se(O.comparator)})(t),t.gu=!1,await Ga(t.remoteStore,!1)}}async function Kh(r,e,t){const n=L(r),s=[],i=[];for(const a of e){let c;const u=n.Iu.get(a);if(u&&u.length!==0){c=await Ki(n.localStore,Be(u[0]));for(const h of u){const f=n.Tu.get(h),m=await Fw(n,f);m.snapshot&&i.push(m.snapshot)}}else{const h=await Lp(n.localStore,a);c=await Ki(n.localStore,h),await $c(n,sm(h),a,!1,c.resumeToken)}s.push(c)}return n.Pu.H_(i),s}function sm(r){return Bf(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function jw(r){return(function(t){return L(L(t).persistence).Ts()})(L(r).localStore)}async function zw(r,e,t,n){const s=L(r);if(s.gu)return void V(Tr,"Ignoring unexpected query state notification.");const i=s.Iu.get(e);if(i&&i.length>0)switch(t){case"current":case"not-current":{const a=await Fp(s.localStore,zf(i[0])),c=Vs.createSynthesizedRemoteEventForCurrentChange(e,t==="current",de.EMPTY_BYTE_STRING);await Wt(s,a,c);break}case"rejected":await cr(s.localStore,e,!0),hr(s,e,n);break;default:M(64155,t)}}async function $w(r,e,t){const n=vo(r);if(n.gu){for(const s of e){if(n.Iu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){V(Tr,"Adding an already active target "+s);continue}const i=await Lp(n.localStore,s),a=await Ki(n.localStore,i);await $c(n,sm(i),a.targetId,!1,a.resumeToken),Eo(n.remoteStore,a)}for(const s of t)n.Iu.has(s)&&await cr(n.localStore,s,!1).then((()=>{ur(n.remoteStore,s),hr(n,s)})).catch($t)}}function vo(r){const e=L(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=nm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Lw.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=kw.bind(null,e),e.Pu.H_=ww.bind(null,e.eventManager),e.Pu.yu=vw.bind(null,e.eventManager),e}function Hc(r){const e=L(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Nw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=xw.bind(null,e),e}class ys{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Io(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return xp(this.persistence,new Np,e.initialUser,this.serializer)}Cu(e){return new Dc(yo.mi,this.serializer)}Du(e){return new zp}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ys.provider={build:()=>new ys};class Gw extends ys{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){F(this.persistence.referenceDelegate instanceof Gi,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new bp(n,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?be.withCacheSize(this.cacheSizeBytes):be.DEFAULT;return new Dc((n=>Gi.mi(n,t)),this.serializer)}}class im extends ys{constructor(e,t,n){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Hc(this.xu.syncEngine),await yr(this.xu.remoteStore),await this.persistence.Ji((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return xp(this.persistence,new Np,e.initialUser,this.serializer)}Fu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new bp(n,e.asyncQueue,t)}Mu(e,t){const n=new sT(t,this.persistence);return new rT(e.asyncQueue,n)}Cu(e){const t=kp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?be.withCacheSize(this.cacheSizeBytes):be.DEFAULT;return new kc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,$p(),Ai(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new zp}}class Kw extends im{constructor(e,t){super(e,t,!1),this.xu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.xu.syncEngine;this.sharedClientState instanceof ha&&(this.sharedClientState.syncEngine={Co:Bw.bind(null,t),vo:zw.bind(null,t),Fo:$w.bind(null,t),Ts:jw.bind(null,t),Do:Uw.bind(null,t)},await this.sharedClientState.start()),await this.persistence.Ji((async n=>{await qw(this.xu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())}))}Du(e){const t=$p();if(!ha.v(t))throw new k(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=kp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new ha(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Is{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Gh(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=Mw.bind(null,this.syncEngine),await Ga(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Ew})()}createDatastore(e){const t=Io(e.databaseInfo.databaseId),n=(function(i){return new rw(i)})(e.databaseInfo);return(function(i,a,c,u){return new aw(i,a,c,u)})(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,s,i,a,c){return new uw(n,s,i,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Gh(this.syncEngine,t,0)),(function(){return Uh.v()?new Uh:new ZE})())}createSyncEngine(e,t){return(function(s,i,a,c,u,h,f){const m=new Rw(s,i,a,c,u,h);return f&&(m.gu=!0),m})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const n=L(t);V(vn,"RemoteStore shutting down."),n.Ea.add(5),await ks(n),n.Aa.shutdown(),n.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Is.provider={build:()=>new Is};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):he("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt="FirestoreClient";class Ww{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=Re.UNAUTHENTICATED,this.clientId=cc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,(async a=>{V(jt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(V(jt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new He;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=wo(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function fa(r,e){r.asyncQueue.verifyOperationInProgress(),V(jt,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async s=>{n.isEqual(s)||(await Op(e.localStore,s),n=s)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function Wh(r,e){r.asyncQueue.verifyOperationInProgress();const t=await om(r);V(jt,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>qh(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,s)=>qh(e.remoteStore,s))),r._onlineComponents=e}async function om(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){V(jt,"Using user provided OfflineComponentProvider");try{await fa(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;as("Error using user provided cache. Falling back to memory cache: "+t),await fa(r,new ys)}}else V(jt,"Using default OfflineComponentProvider"),await fa(r,new Gw(void 0));return r._offlineComponents}async function am(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(V(jt,"Using user provided OnlineComponentProvider"),await Wh(r,r._uninitializedComponentsProvider._online)):(V(jt,"Using default OnlineComponentProvider"),await Wh(r,new Is))),r._onlineComponents}function Hw(r){return om(r).then((e=>e.localStore))}function Qw(r){return am(r).then((e=>e.syncEngine))}async function Xi(r){const e=await am(r),t=e.eventManager;return t.onListen=bw.bind(null,e.syncEngine),t.onUnlisten=Cw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Pw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Vw.bind(null,e.syncEngine),t}function Jw(r,e,t={}){const n=new He;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new Qc({next:_=>{f.Nu(),a.enqueueAndForget((()=>qc(i,m)));const R=_.docs.has(c);!R&&_.fromCache?h.reject(new k(P.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&_.fromCache&&u&&u.source==="server"?h.reject(new k(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(_)},error:_=>h.reject(_)}),m=new zc(Ps(c.path),f,{includeMetadataChanges:!0,qa:!0});return Bc(i,m)})(await Xi(r),r.asyncQueue,e,t,n))),n.promise}function Xw(r,e){const t=new He;return r.asyncQueue.enqueueAndForget((async()=>(async function(s,i,a){try{const c=await Wi(s,i,!0),u=new em(i,c.Qs),h=u.ru(c.documents),f=u.applyChanges(h,!1);a.resolve(f.snapshot)}catch(c){const u=wo(c,`Failed to execute query '${i} against cache`);a.reject(u)}})(await Hw(r),e,t))),t.promise}function Yw(r,e,t={}){const n=new He;return r.asyncQueue.enqueueAndForget((async()=>(function(i,a,c,u,h){const f=new Qc({next:_=>{f.Nu(),a.enqueueAndForget((()=>qc(i,m))),_.fromCache&&u.source==="server"?h.reject(new k(P.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(_)},error:_=>h.reject(_)}),m=new zc(c,f,{includeMetadataChanges:!0,qa:!0});return Bc(i,m)})(await Xi(r),r.asyncQueue,e,t,n))),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cm(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hh=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zw="firestore.googleapis.com",Qh=!0;class Jh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new k(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Zw,this.ssl=Qh}else this.host=e.host,this.ssl=e.ssl??Qh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=wp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Rp)throw new k(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}eT("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=cm(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new k(P.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,s){return n.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Jc{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Jh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Jh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new GI;switch(n.type){case"firstParty":return new HI(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new k(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=Hh.get(t);n&&(V("ComponentProvider","Removing Datastore"),Hh.delete(t),n.terminate())})(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new _t(this.firestore,e,this._query)}}class le{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new le(this.firestore,e,this._key)}toJSON(){return{type:le._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Ss(t,le._jsonSchema))return new le(e,n||null,new O(X.fromString(t.referencePath)))}}le._jsonSchemaVersion="firestore/documentReference/1.0",le._jsonSchema={type:pe("string",le._jsonSchemaVersion),referencePath:pe("string")};class Lt extends _t{constructor(e,t,n){super(e,t,Ps(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new le(this.firestore,null,new O(e))}withConverter(e){return new Lt(this.firestore,e,this._path)}}function Sv(r,e,...t){if(r=ye(r),sf("collection","path",e),r instanceof Jc){const n=X.fromString(e,...t);return Bl(n),new Lt(r,null,n)}{if(!(r instanceof le||r instanceof Lt))throw new k(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return Bl(n),new Lt(r.firestore,null,n)}}function Rv(r,e,...t){if(r=ye(r),arguments.length===1&&(e=cc.newId()),sf("doc","path",e),r instanceof Jc){const n=X.fromString(e,...t);return Ul(n),new le(r,null,new O(n))}{if(!(r instanceof le||r instanceof Lt))throw new k(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return Ul(n),new le(r.firestore,r instanceof Lt?r.converter:null,new O(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh="AsyncQueue";class Yh{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Gp(this,"async_queue_retry"),this._c=()=>{const n=Ai();n&&V(Xh,"Visibility state changed to "+n.visibilityState),this.M_.w_()},this.ac=e;const t=Ai();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=Ai();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new He;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!Gt(e))throw e;V(Xh,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((n=>{throw this.nc=n,this.rc=!1,he("INTERNAL UNHANDLED ERROR: ",Zh(n)),n})).then((n=>(this.rc=!1,n))))));return this.ac=t,t}enqueueAfterDelay(e,t,n){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Uc.createAndSchedule(this,e,t,n,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&M(47125,{Pc:Zh(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Zh(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ed(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const s=t;for(const i of n)if(i in s&&typeof s[i]=="function")return!0;return!1})(r,["next","error","complete"])}class zt extends Jc{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Yh,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Yh(e),this._firestoreClient=void 0,await e}}}function bv(r,e,t){t||(t=Li);const n=Xa(r,"firestore");if(n.isInitialized(t)){const s=n.getImmediate({identifier:t}),i=n.getOptions(t);if(pn(i,e))return s;throw new k(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new k(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Rp)throw new k(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&dr(e.host)&&ld(e.host),n.initialize({options:e,instanceIdentifier:t})}function Ns(r){if(r._terminated)throw new k(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||ev(r),r._firestoreClient}function ev(r){const e=r._freezeSettings(),t=(function(s,i,a,c){return new kT(s,i,a,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,cm(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)})(r._databaseId,r._app?.options.appId||"",r._persistenceKey,e);r._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new Ww(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je{constructor(e){this._byteString=e}static fromBase64String(e){try{return new je(de.fromBase64String(e))}catch(t){throw new k(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new je(de.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:je._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ss(e,je._jsonSchema))return je.fromBase64String(e.bytes)}}je._jsonSchemaVersion="firestore/bytes/1.0",je._jsonSchema={type:pe("string",je._jsonSchemaVersion),bytes:pe("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new k(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ae(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new k(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new k(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:et._jsonSchemaVersion}}static fromJSON(e){if(Ss(e,et._jsonSchema))return new et(e.latitude,e.longitude)}}et._jsonSchemaVersion="firestore/geoPoint/1.0",et._jsonSchema={type:pe("string",et._jsonSchemaVersion),latitude:pe("number"),longitude:pe("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:tt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ss(e,tt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new tt(e.vectorValues);throw new k(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}tt._jsonSchemaVersion="firestore/vectorValue/1.0",tt._jsonSchema={type:pe("string",tt._jsonSchemaVersion),vectorValues:pe("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tv=/^__.*__$/;class nv{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new gt(e,this.data,this.fieldMask,t,this.fieldTransforms):new _r(e,this.data,t,this.fieldTransforms)}}class um{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new gt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function lm(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ac:r})}}class Xc{constructor(e,t,n,s,i,a){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Xc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.gc(e),n}yc(e){const t=this.path?.child(e),n=this.Vc({path:t,fc:!1});return n.Rc(),n}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Yi(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(lm(this.Ac)&&tv.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class rv{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Io(e)}Cc(e,t,n,s=!1){return new Xc({Ac:e,methodName:t,Dc:n,path:ae.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Yc(r){const e=r._freezeSettings(),t=Io(r._databaseId);return new rv(r._databaseId,!!e.ignoreUndefinedProperties,t)}function sv(r,e,t,n,s,i={}){const a=r.Cc(i.merge||i.mergeFields?2:0,e,t,s);tu("Data must be an object, but it was:",a,n);const c=hm(n,a);let u,h;if(i.merge)u=new xe(a.fieldMask),h=a.fieldTransforms;else if(i.mergeFields){const f=[];for(const m of i.mergeFields){const _=Ha(e,m,t);if(!a.contains(_))throw new k(P.INVALID_ARGUMENT,`Field '${_}' is specified in your field mask but missing from your input data.`);fm(f,_)||f.push(_)}u=new xe(f),h=a.fieldTransforms.filter((m=>u.covers(m.field)))}else u=null,h=a.fieldTransforms;return new nv(new Pe(c),u,h)}class Os extends xs{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Os}}class Zc extends xs{_toFieldTransform(e){return new Ec(e.path,new rr)}isEqual(e){return e instanceof Zc}}class eu extends xs{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new or(e.serializer,Qf(e.serializer,this.Fc));return new Ec(e.path,t)}isEqual(e){return e instanceof eu&&this.Fc===e.Fc}}function iv(r,e,t,n){const s=r.Cc(1,e,t);tu("Data must be an object, but it was:",s,n);const i=[],a=Pe.empty();Kt(n,((u,h)=>{const f=nu(e,u,t);h=ye(h);const m=s.yc(f);if(h instanceof Os)i.push(f);else{const _=Ms(h,m);_!=null&&(i.push(f),a.set(f,_))}}));const c=new xe(i);return new um(a,c,s.fieldTransforms)}function ov(r,e,t,n,s,i){const a=r.Cc(1,e,t),c=[Ha(e,n,t)],u=[s];if(i.length%2!=0)throw new k(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let _=0;_<i.length;_+=2)c.push(Ha(e,i[_])),u.push(i[_+1]);const h=[],f=Pe.empty();for(let _=c.length-1;_>=0;--_)if(!fm(h,c[_])){const R=c[_];let C=u[_];C=ye(C);const N=a.yc(R);if(C instanceof Os)h.push(R);else{const D=Ms(C,N);D!=null&&(h.push(R),f.set(R,D))}}const m=new xe(h);return new um(f,m,a.fieldTransforms)}function av(r,e,t,n=!1){return Ms(t,r.Cc(n?4:3,e))}function Ms(r,e){if(dm(r=ye(r)))return tu("Unsupported field value:",e,r),hm(r,e);if(r instanceof xs)return(function(n,s){if(!lm(s.Ac))throw s.Sc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(n,s){const i=[];let a=0;for(const c of n){let u=Ms(c,s.wc(a));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),a++}return{arrayValue:{values:i}}})(r,e)}return(function(n,s){if((n=ye(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Qf(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Z.fromDate(n);return{timestampValue:ar(s.serializer,i)}}if(n instanceof Z){const i=new Z(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:ar(s.serializer,i)}}if(n instanceof et)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof je)return{bytesValue:op(s.serializer,n._byteString)};if(n instanceof le){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:bc(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof tt)return(function(a,c){return{mapValue:{fields:{[gc]:{stringValue:_c},[Zn]:{arrayValue:{values:a.toArray().map((h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return Tc(c.serializer,h)}))}}}}}})(n,s);throw s.Sc(`Unsupported field value: ${so(n)}`)})(r,e)}function hm(r,e){const t={};return vf(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Kt(r,((n,s)=>{const i=Ms(s,e.mc(n));i!=null&&(t[n]=i)})),{mapValue:{fields:t}}}function dm(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Z||r instanceof et||r instanceof je||r instanceof le||r instanceof xs||r instanceof tt)}function tu(r,e,t){if(!dm(t)||!of(t)){const n=so(t);throw n==="an object"?e.Sc(r+" a custom object"):e.Sc(r+" "+n)}}function Ha(r,e,t){if((e=ye(e))instanceof Ao)return e._internalPath;if(typeof e=="string")return nu(r,e);throw Yi("Field path arguments must be of type string or ",r,!1,void 0,t)}const cv=new RegExp("[~\\*/\\[\\]]");function nu(r,e,t){if(e.search(cv)>=0)throw Yi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Ao(...e.split("."))._internalPath}catch{throw Yi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Yi(r,e,t,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(i||a)&&(u+=" (found",i&&(u+=` in field ${n}`),a&&(u+=` in document ${s}`),u+=")"),new k(P.INVALID_ARGUMENT,c+r+u)}function fm(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pm{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new le(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new uv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(So("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class uv extends pm{data(){return super.data()}}function So(r,e){return typeof e=="string"?nu(r,e):e instanceof Ao?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mm(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new k(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ru{}class gm extends ru{}function Pv(r,e,...t){let n=[];e instanceof ru&&n.push(e),n=n.concat(t),(function(i){const a=i.filter((u=>u instanceof su)).length,c=i.filter((u=>u instanceof Ro)).length;if(a>1||a>0&&c>0)throw new k(P.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const s of n)r=s._apply(r);return r}class Ro extends gm{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Ro(e,t,n)}_apply(e){const t=this._parse(e);return _m(e._query,t),new _t(e.firestore,e.converter,xa(e._query,t))}_parse(e){const t=Yc(e.firestore);return(function(i,a,c,u,h,f,m){let _;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new k(P.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){nd(m,f);const C=[];for(const N of m)C.push(td(u,i,N));_={arrayValue:{values:C}}}else _=td(u,i,m)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||nd(m,f),_=av(c,a,m,f==="in"||f==="not-in");return W.create(h,f,_)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Cv(r,e,t){const n=e,s=So("where",r);return Ro._create(s,n,t)}class su extends ru{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new su(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:ee.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let a=s;const c=i.getFlattenedFilters();for(const u of c)_m(a,u),a=xa(a,u)})(e._query,t),new _t(e.firestore,e.converter,xa(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class iu extends gm{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new iu(e,t)}_apply(e){const t=(function(s,i,a){if(s.startAt!==null)throw new k(P.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new k(P.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new _s(i,a)})(e._query,this._field,this._direction);return new _t(e.firestore,e.converter,(function(s,i){const a=s.explicitOrderBy.concat([i]);return new gr(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)})(e._query,t))}}function Vv(r,e="asc"){const t=e,n=So("orderBy",r);return iu._create(n,t)}function td(r,e,t){if(typeof(t=ye(t))=="string"){if(t==="")throw new k(P.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!qf(e)&&t.indexOf("/")!==-1)throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(X.fromString(t));if(!O.isDocumentKey(n))throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return ms(r,new O(n))}if(t instanceof le)return ms(r,t._key);throw new k(P.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${so(t)}.`)}function nd(r,e){if(!Array.isArray(r)||r.length===0)throw new k(P.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function _m(r,e){const t=(function(s,i){for(const a of s)for(const c of a.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(r.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new k(P.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new k(P.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class lv{convertValue(e,t="none"){switch(Ut(e)){case 0:return null;case 1:return e.booleanValue;case 2:return oe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(ft(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Kt(e,((s,i)=>{n[s]=this.convertValue(i,t)})),n}convertVectorValue(e){const t=e.fields?.[Zn].arrayValue?.values?.map((n=>oe(n.doubleValue)));return new tt(t)}convertGeoPoint(e){return new et(oe(e.latitude),oe(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=lo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(fs(e));default:return null}}convertTimestamp(e){const t=dt(e);return new Z(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=X.fromString(e);F(gp(n),9688,{name:e});const s=new yn(n.get(1),n.get(3)),i=new O(n.popFirst(5));return s.isEqual(t)||he(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hv(r,e,t){let n;return n=r?r.toFirestore(e):e,n}class Wr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class fn extends pm{constructor(e,t,n,s,i,a){super(e,t,n,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Si(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(So("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=fn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}fn._jsonSchemaVersion="firestore/documentSnapshot/1.0",fn._jsonSchema={type:pe("string",fn._jsonSchemaVersion),bundleSource:pe("string","DocumentSnapshot"),bundleName:pe("string"),bundle:pe("string")};class Si extends fn{data(e={}){return super.data(e)}}class Ft{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Wr(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new Si(this._firestore,this._userDataWriter,n.key,n,new Wr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new k(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((c=>{const u=new Si(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Wr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const u=new Si(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Wr(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:dv(c.type),doc:u,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ft._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=cc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function dv(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dv(r){r=Ue(r,le);const e=Ue(r.firestore,zt);return Jw(Ns(e),r._key).then((t=>Im(e,r,t)))}Ft._jsonSchemaVersion="firestore/querySnapshot/1.0",Ft._jsonSchema={type:pe("string",Ft._jsonSchemaVersion),bundleSource:pe("string","QuerySnapshot"),bundleName:pe("string"),bundle:pe("string")};class bo extends lv{constructor(e){super(),this.firestore=e}convertBytes(e){return new je(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new le(this.firestore,null,t)}}function kv(r){r=Ue(r,_t);const e=Ue(r.firestore,zt),t=Ns(e),n=new bo(e);return mm(r._query),Yw(t,r._query).then((s=>new Ft(e,n,r,s)))}function Nv(r){r=Ue(r,_t);const e=Ue(r.firestore,zt),t=Ns(e),n=new bo(e);return Xw(t,r._query).then((s=>new Ft(e,n,r,s)))}function xv(r,e,t){r=Ue(r,le);const n=Ue(r.firestore,zt),s=hv(r.converter,e);return ym(n,[sv(Yc(n),"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,Oe.none())])}function Ov(r,e,t,...n){r=Ue(r,le);const s=Ue(r.firestore,zt),i=Yc(s);let a;return a=typeof(e=ye(e))=="string"||e instanceof Ao?ov(i,"updateDoc",r._key,e,t,n):iv(i,"updateDoc",r._key,e),ym(s,[a.toMutation(r._key,Oe.exists(!0))])}function Mv(r,...e){r=ye(r);let t={includeMetadataChanges:!1,source:"default"},n=0;typeof e[n]!="object"||ed(e[n])||(t=e[n++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(ed(e[n])){const u=e[n];e[n]=u.next?.bind(u),e[n+1]=u.error?.bind(u),e[n+2]=u.complete?.bind(u)}let i,a,c;if(r instanceof le)a=Ue(r.firestore,zt),c=Ps(r._key.path),i={next:u=>{e[n]&&e[n](Im(a,r,u))},error:e[n+1],complete:e[n+2]};else{const u=Ue(r,_t);a=Ue(u.firestore,zt),c=u._query;const h=new bo(a);i={next:f=>{e[n]&&e[n](new Ft(a,h,u,f))},error:e[n+1],complete:e[n+2]},mm(r._query)}return(function(h,f,m,_){const R=new Qc(_),C=new zc(f,R,m);return h.asyncQueue.enqueueAndForget((async()=>Bc(await Xi(h),C))),()=>{R.Nu(),h.asyncQueue.enqueueAndForget((async()=>qc(await Xi(h),C)))}})(Ns(a),c,s,i)}function ym(r,e){return(function(n,s){const i=new He;return n.asyncQueue.enqueueAndForget((async()=>Dw(await Qw(n),s,i))),i.promise})(Ns(r),e)}function Im(r,e,t){const n=t.docs.get(e._key),s=new bo(r);return new fn(r,s,e._key,n,new Wr(t.hasPendingWrites,t.fromCache),e.converter)}class fv{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=gv(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function Lv(r){return new fv(r)}class pv{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Is.provider,this._offlineComponentProvider={build:t=>new im(t,e?.cacheSizeBytes,this.forceOwnership)}}}class mv{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Is.provider,this._offlineComponentProvider={build:t=>new Kw(t,e?.cacheSizeBytes)}}}function gv(r){return new pv(r?.forceOwnership)}function Fv(){return new mv}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uv(){return new Os("deleteField")}function Bv(){return new Zc("serverTimestamp")}function qv(r){return new eu("increment",r)}(function(e,t=!0){(function(s){mr=s})(fr),Gn(new mn("firestore",((n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),c=new zt(new KI(n.getProvider("auth-internal")),new QI(a,n.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new k(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new yn(h.options.projectId,f)})(a,s),a);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),xt(Ol,Ml,e),xt(Ol,Ml,"esm2020")})();export{Uv as A,Sv as B,mn as C,Pv as D,Ts as E,pt as F,bt as G,Cv as H,Vv as I,Nv as J,kv as K,Qa as L,qv as M,Gn as _,Xa as a,pd as b,yv as c,C_ as d,pn as e,_v as f,ye as g,P_ as h,mg as i,vv as j,bv as k,Fv as l,Tv as m,Iv as n,Kg as o,Lv as p,Rv as q,xt as r,wv as s,Dv as t,xv as u,yg as v,Ev as w,Mv as x,Bv as y,Ov as z};
