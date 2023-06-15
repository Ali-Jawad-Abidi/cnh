"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[784],{9988:function(e,t,r){r.d(t,{Z:function(){return s}});var n=r(7890),i=r(9466),a=r(6417);function s(){var e=(0,n.TH)(),t=e.pathname.split("/").filter((function(e){return e})),r=e.search.split("&").filter((function(e){return e}));return(0,a.jsx)("div",{className:"m-4",children:(0,a.jsx)("nav",{class:"flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700","aria-label":"Breadcrumb",children:(0,a.jsxs)("ol",{class:"inline-flex items-center space-x-1 md:space-x-3",children:[(0,a.jsx)("li",{class:"inline-flex items-center",children:(0,a.jsxs)("a",{href:"/",class:"inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white",children:[(0,a.jsx)("svg",{"aria-hidden":"true",class:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{d:"M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"})}),"Home"]})}),t.map((function(e,n){return(0,a.jsx)(i.rU,{to:"/".concat(t.slice(0,n+1).join("/")).concat(r.slice(0,n+1).join("&")),children:(0,a.jsx)("li",{children:(0,a.jsxs)("div",{class:"flex items-center",children:[(0,a.jsx)("svg",{"aria-hidden":"true",class:"w-6 h-6 text-gray-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,a.jsx)("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"})}),(0,a.jsx)("a",{href:"#",class:"ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white",children:decodeURIComponent(e).charAt(0).toUpperCase()+decodeURIComponent(e).slice(1)})]})})})}))]})})})}},3784:function(e,t,r){r.r(t),r.d(t,{EcomCard:function(){return g},ProductsGrid:function(){return p},default:function(){return v}});var n=r(2982),i=r(885),a=r(7313),s=r(9019),c=r(3960),o=r(1881),l=r.n(o),d=r(9466),u=r(3281),m=r(3753),h=r(3217),x=r(9988),f=r(6417);function g(e){var t=e.addCart;return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)("div",{className:"group border-gray-700 dark:border-white max-h-[65vh] shadow flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-white shadow-md dark:bg-gray-700",children:[(0,f.jsx)(d.rU,{className:"relative flex h-44 overflow-hidden rounded-xl",to:{pathname:"/store/".concat(e.item.title),search:"?".concat(e.item.title,"=").concat(e.item._id)},children:(0,f.jsx)("img",{class:"peer absolute top-0 right-0 h-full w-full object-cover hover:z-20",src:e.item.thumbnail,alt:"product image"})}),(0,f.jsxs)("div",{className:"mt-2 px-5 pb-5",children:[(0,f.jsx)(d.rU,{to:{pathname:"/store/".concat(e.item.title),search:"?".concat(e.item.title,"=").concat(e.item._id)},children:(0,f.jsx)("h5",{className:"text-xl tracking-tight line-clamp-1 text-gray-700 h-auto dark:text-white",children:e.item.title})}),(0,f.jsx)("div",{className:" flex flex-col items-center justify-between",children:(0,f.jsxs)("p",{children:[e.item.discount>0?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("span",{className:"grow mt-2 text-3xl font-bold text-gray-700 dark:text-white",children:["$",e.item.price-e.item.price*e.item.discount/100]}),(0,f.jsxs)("sup",{className:"text-sm pt-2 text-gray-700 line-through dark:text-white",children:["$",e.item.price]})]}):(0,f.jsxs)("span",{className:"grow mt-2 text-3xl font-bold text-gray-700 dark:text-white",children:["$",e.item.price-e.item.price*e.item.discount/100]}),(0,f.jsx)("br",{}),e.item.bits&&(0,f.jsxs)("span",{className:"grow text-sm pt-2 text-gray-700 dark:text-white",children:[(10*e.item.price).toFixed(2)," Bits"]}),!e.item.bits&&(0,f.jsx)("span",{className:"grow text-sm pt-2 text-gray-700 dark:text-white",children:"Can't buy with Bits"})]})}),(0,f.jsxs)("div",{onClick:function(){var r={img:e.item.images[0],title:e.item.title,id:e.item._id,price:e.item.price,discount:e.item.discount,quantity:1};t(r)},className:"hover:border-white/40 focus:bg-green-700 cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300",children:[(0,f.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"mr-2 h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:"2",children:(0,f.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})}),"Add to cart"]})]})]})})}function p(e){var t=e.merch,r=function(e){var t=JSON.parse(localStorage.getItem("cart"))||[],r=t.findIndex((function(t){return t.id===e.id}));-1===r?(t.push(e),localStorage.setItem("cart",JSON.stringify(t)),window.dispatchEvent(new Event("storage"))):e.quantity!==t[r]&&(t[r].quantity=e.quantity,localStorage.setItem("cart",JSON.stringify(t)))};return t===[]?(0,f.jsx)(u.Z,{}):(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(s.ZP,{container:!0,spacing:1,children:t.map((function(e,t){return(0,f.jsx)(s.ZP,{item:!0,xs:6,sm:6,md:3,children:(0,f.jsx)(g,{item:e,addCart:r})})}))})})}function v(){var e=(0,a.useState)(null),t=(0,i.Z)(e,2),r=t[0],s=t[1],o=(0,a.useState)(!1),d=(0,i.Z)(o,2),u=d[0],g=d[1],v=(0,a.useState)([]),j=(0,i.Z)(v,2),b=j[0],w=j[1],y=(0,a.useState)([]),k=(0,i.Z)(y,2),N=k[0],Z=k[1];function C(){var e={method:"post",url:"https://thecnh.co.uk/api/getmerch",data:{start:null===r?0:r.length}};l()(e).then((function(e){if(200===e.status){console.log(e.data.items);var t=(null===r?[]:r).concat(e.data.items);g(!e.data.isEnd),s(t)}else g(!1),s([])}))}(0,a.useEffect)((function(){C();l()({url:"https://thecnh.co.uk/api/getmerchcats",method:"get"}).then((function(e){200===e.status&&w(e.data)}))}),[]);var S=null!==r&&r.length>0?r.filter((function(e){return 0===N.length||N.includes(e.category)})):[];return console.log(S),(0,f.jsx)("div",{className:"relative bg-white rounded-lg shadow dark:bg-gray-900",children:(0,f.jsxs)(c.Z,{spacing:2,children:[(0,f.jsx)(h.Z,{}),(0,f.jsx)(x.Z,{}),(0,f.jsxs)("div",{className:"p-4 flex flex-col gap-2 min-h-screen",children:[(0,f.jsx)("h2",{className:"company uppercase text-blue-700 font-bold text-xl sm:text-md tracking-wider",children:"consolenostalgia store"}),(0,f.jsxs)("div",{className:"flex sm:flex-row lg:flex-col gap-2",children:[(0,f.jsxs)("div",{className:"sticky top-2 text-left text-xl z-10",children:[(0,f.jsx)("p",{class:"text-white",children:"Categories"}),(0,f.jsx)("div",{className:"flex flex-row gap-2 p-4 dark:bg-gray-800 bg-gray-200 rounded-lg",children:b.map((function(e,t){return(0,f.jsxs)("div",{class:"flex items-center",children:[(0,f.jsx)("input",{id:t,type:"checkbox",value:e.name,className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",onChange:function(e){console.log(N),e.target.checked?Z((function(t){return[].concat((0,n.Z)(t),[e.target.value])})):Z(N.filter((function(t){return t!==e.target.value})))}}),(0,f.jsx)("label",{htmlfor:e.name,className:"ml-2 text-sm font-medium text-gray-900 dark:text-gray-300",children:e.name})]},t)}))})]}),S.length>0&&(0,f.jsx)(p,{merch:S})]}),u&&(0,f.jsx)("div",{className:"flex pt-3 pb-3 justify-center w-full",children:(0,f.jsx)("div",{onClick:function(){C()},className:"button  w-2/5 ml-10 px-10 py-3 bg-blue-700 rounded-lg lg:rounded-xl shadow-bg-blue-700 shadow-2xl text-white flex justify-center cursor-pointer hover:opacity-60",children:"Show More"})})]}),(0,f.jsx)(m.Z,{})]})})}},3960:function(e,t,r){r.d(t,{Z:function(){return Z}});var n=r(4942),i=r(3366),a=r(7462),s=r(7313),c=r(3061),o=r(3019),l=r(1921),d=r(2298),u=(0,r(6541).ZP)(),m=r(5900),h=r(9028),x=r(9456),f=r(4929),g=r(6886),p=r(6417),v=["component","direction","spacing","divider","children","className","useFlexGap"],j=(0,x.Z)(),b=u("div",{name:"MuiStack",slot:"Root",overridesResolver:function(e,t){return t.root}});function w(e){return(0,m.Z)({props:e,name:"MuiStack",defaultTheme:j})}function y(e,t){var r=s.Children.toArray(e).filter(Boolean);return r.reduce((function(e,n,i){return e.push(n),i<r.length-1&&e.push(s.cloneElement(t,{key:"separator-".concat(i)})),e}),[])}var k=function(e){var t=e.ownerState,r=e.theme,i=(0,a.Z)({display:"flex",flexDirection:"column"},(0,f.k9)({theme:r},(0,f.P$)({values:t.direction,breakpoints:r.breakpoints.values}),(function(e){return{flexDirection:e}})));if(t.spacing){var s=(0,g.hB)(r),c=Object.keys(r.breakpoints.values).reduce((function(e,r){return("object"===typeof t.spacing&&null!=t.spacing[r]||"object"===typeof t.direction&&null!=t.direction[r])&&(e[r]=!0),e}),{}),l=(0,f.P$)({values:t.direction,base:c}),d=(0,f.P$)({values:t.spacing,base:c});"object"===typeof l&&Object.keys(l).forEach((function(e,t,r){if(!l[e]){var n=t>0?l[r[t-1]]:"column";l[e]=n}}));i=(0,o.Z)(i,(0,f.k9)({theme:r},d,(function(e,r){return t.useFlexGap?{gap:(0,g.NA)(s,e)}:{"& > :not(style) + :not(style)":(0,n.Z)({margin:0},"margin".concat((i=r?l[r]:t.direction,{row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"}[i])),(0,g.NA)(s,e))};var i})))}return i=(0,f.dt)(r.breakpoints,i)};var N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.createStyledComponent,r=void 0===t?b:t,n=e.useThemeProps,o=void 0===n?w:n,u=e.componentName,m=void 0===u?"MuiStack":u,x=function(){return(0,l.Z)({root:["root"]},(function(e){return(0,d.Z)(m,e)}),{})},f=r(k),g=s.forwardRef((function(e,t){var r=o(e),n=(0,h.Z)(r),s=n.component,l=void 0===s?"div":s,d=n.direction,u=void 0===d?"column":d,m=n.spacing,g=void 0===m?0:m,j=n.divider,b=n.children,w=n.className,k=n.useFlexGap,N=void 0!==k&&k,Z=(0,i.Z)(n,v),C={direction:u,spacing:g,useFlexGap:N},S=x();return(0,p.jsx)(f,(0,a.Z)({as:l,ownerState:C,ref:t,className:(0,c.Z)(S.root,w)},Z,{children:j?y(b,j):b}))}));return g}(),Z=N}}]);