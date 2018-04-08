!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("react"),require("recharts"));else if("function"==typeof define&&define.amd)define(["react","recharts"],t);else{var n="object"==typeof exports?t(require("react"),require("recharts")):t(e.react,e.recharts);for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};var i=({payload:e,series:t,formatTooltipDate:n})=>{const r=e&&e[0]&&e[0].payload;if(!r)return null;const{dateWhen:i,runningTotals:c}=r;return a.a.createElement("div",{className:"tooltip"},a.a.createElement("p",{className:"when"},(n||(e=>new Date(e).toLocaleDateString()))(i)),t.map(e=>o({},e,{total:c[e.id]||0})).sort((e,t)=>e.total>t.total?-1:e.total<t.total?1:0).map(e=>a.a.createElement("p",{className:"scores",key:e.id},a.a.createElement("span",{className:"score-name"},e.name),a.a.createElement("span",{className:"score-score"},e.total))))},c=n(1);const s=e=>new Date(e).toLocaleDateString();function l(e,t,n={}){if(e)for(let r of t)e[r]=e[r]||n[r]||[0]}var u=e=>{const{formatTick:t,data:n,series:r,endRagged:o,startRagged:u}=e,f=JSON.parse(JSON.stringify(n));return function(e,t,n,r){if(!r){const n=t.slice(-1)[0]||{};l(n.runningTotals,e),l(n.points,e,n.runningTotals)}if(!n){const n=t[0];l(n.runningTotals,e),l(n.points,e)}}(r.map(e=>e.id),f,u,o),a.a.createElement(c.ResponsiveContainer,{height:400},a.a.createElement(c.LineChart,{data:f,margin:{right:100}},a.a.createElement(c.CartesianGrid,{strokeDasharray:"3 3"}),r.map(e=>a.a.createElement(c.Line,{connectNulls:!0,dataKey:t=>e.id in t.points?t.runningTotals[e.id]:null,key:e.id,stroke:`rgb(${e.color})`,type:"linear",name:e.name})),a.a.createElement(c.Legend,null),a.a.createElement(c.Tooltip,{content:a.a.createElement(i,e),active:!0}),a.a.createElement(c.XAxis,{dataKey:"when",tickFormatter:t||s,type:"number",domain:["dataMin","dataMax"],tickCount:999}),a.a.createElement(c.YAxis,{type:"number",domain:["dataMin - 2","dataMax + 2"],tickCount:10}),a.a.createElement(c.ReferenceLine,{y:0,stroke:"black"})))},f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function p(e,t,n){const r=e[t]||[];return r.push(n),f({},e,{[t]:r})}const d=(e,t,n)=>f({},e,{points:e.events.reduce((e,r)=>p(e,r[t],r[n]),{})}),m=(e,t)=>{const{points:n}=e;for(let e of Object.keys(n)){const r=n[e].reduce((e,t)=>e+t,0),a=t[e]||0;t[e]=a+r}return f({},e,{runningTotals:f({},t)})};function y(e,t){t=f({whenKey:"when",valueKey:"score",idKey:"id"},t);const{whenKey:n,valueKey:r,idKey:a}=t,o=e.reduce((e,t)=>p(e,t[n],t),{});let i={};return Object.keys(o).sort().map(e=>m(d({when:new Date(e).valueOf(),dateWhen:new Date(e),events:o[e]},a,r),i))}n.d(t,"TimeSeriesGraph",function(){return u}),n.d(t,"TimeSeriesTooltip",function(){return i}),n.d(t,"accumulate",function(){return y});t.default=u}])});