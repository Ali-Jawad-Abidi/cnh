"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[83,728],{3728:function(e,t,s){s.r(t),s.d(t,{BlogItem:function(){return u},BlogsGrid:function(){return m},default:function(){return x}});var a=s(3430),r=s(7313),n=s(9019),l=s(3753),c=s(1881),i=s.n(c),d=s(9466),o=s(1927),h=(s(3281),s(6417));function u(e){return(0,h.jsx)(d.rU,{to:"/blog/".concat(e.item._id),children:(0,h.jsxs)("div",{class:"max-w-sm min-h-[60vh] bg-white border hover:scale-105 items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",children:[(0,h.jsx)("img",{class:"object-cover w-full h-[25vh] cursor-pointer  ",src:e.item.thumbnail,alt:""}),(0,h.jsxs)("div",{class:"p-2 h-[30vh]",children:[(0,h.jsx)("a",{href:"#",children:(0,h.jsx)("h5",{class:"mb-2 line-clamp-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white",children:e.item.title})}),(0,h.jsx)("p",{class:"mb-2 line-clamp-3 font-normal text-gray-700 dark:text-gray-400",children:e.item.info}),(0,h.jsxs)("a",{href:"#",class:"inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:["Read more",(0,h.jsx)("svg",{"aria-hidden":"true",class:"w-4 h-4 ml-2 -mr-1",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,h.jsx)("path",{fillRule:"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",clipRule:"evenodd"})})]})]})]})})}function m(e){var t=e.blogs;return(0,h.jsx)("div",{className:"mx-3 p-2 min-h-screen border-2 mb-4",children:(0,h.jsx)(n.ZP,{container:!0,columnSpacing:2,rowSpacing:2,children:t.map((function(e){return(0,h.jsx)(n.ZP,{item:!0,xs:6,sm:6,md:3,children:(0,h.jsx)(u,{item:e})})}))})})}function x(){var e=(0,r.useState)([]),t=(0,a.Z)(e,2),s=t[0],n=t[1],c=(0,r.useState)(!0),d=(0,a.Z)(c,2),u=d[0],x=d[1];function g(){var e={method:"get",url:"https://thecnh.co.uk/api/blogs",params:{start:s.length}};i()(e).then((function(e){if(200===e.status){var t=s;t=t.concat(e.data.blogs||[]),n(t),x(!e.data.isEnd)}else n([])}))}return(0,r.useEffect)((function(){g()}),[]),(0,h.jsxs)("div",{className:"dark:bg-gray-900",children:[(0,h.jsx)(o.Z,{}),(0,h.jsx)("p",{className:"text-4xl dark:text-emerald-400 p-2",children:"Blogs and Articles"}),(0,h.jsxs)("div",{className:"min-h-screen",children:[(0,h.jsx)(m,{blogs:s}),u&&(0,h.jsx)("div",{className:"flex pt-3 pb-3 justify-center w-full",children:(0,h.jsx)("div",{onClick:function(){g()},className:"button  w-2/5 ml-10 px-10 py-3 bg-blue-700 rounded-lg lg:rounded-xl shadow-bg-blue-700 shadow-2xl text-white flex justify-center cursor-pointer hover:opacity-60",children:"Show More"})})]}),(0,h.jsx)(l.Z,{})]})}},6083:function(e,t,s){s.r(t),s.d(t,{default:function(){return m}});var a=s(3430),r=s(7313),n=s(1927),l=s(7890),c=s(1881),i=s.n(c),d=s(9019),o=s(3246),h=s(3728),u=s(6417);function m(e){var t=(0,r.useState)([]),s=(0,a.Z)(t,2),c=s[0],m=s[1],x=(0,r.useState)([]),g=(0,a.Z)(x,2),f=g[0],p=g[1],b=(0,r.useState)([]),j=(0,a.Z)(b,2),v=j[0],w=j[1],k=(0,r.useState)([]),y=(0,a.Z)(k,2),Z=y[0],S=y[1],N=(0,l.UO)().search;return(0,r.useEffect)((function(){var e={method:"get",url:"https://thecnh.co.uk/api/searchbrands",params:{search:N}};i()(e).then((function(e){200===e.status&&(m(e.data.data),console.log(e.data.data))})),e={method:"get",url:"https://thecnh.co.uk/api/searchblogs",params:{search:N}},i()(e).then((function(e){200===e.status&&p(e.data.data)})),e={method:"get",url:"https://thecnh.co.uk/api/searchsubcats",params:{search:N}},i()(e).then((function(e){200===e.status&&(S(e.data.data),console.log(e.data))})),e={method:"get",url:"https://thecnh.co.uk/api/searchconsoles",params:{search:N}},i()(e).then((function(e){200===e.status&&w(e.data.data)}))}),[N]),(0,u.jsxs)("div",{children:[(0,u.jsx)(n.Z,{}),(0,u.jsxs)("div",{className:"min-h-screen mx-4",children:[(0,u.jsxs)("div",{className:"dark:bg-gray-800 bg-gray-200 shadow-lg rounded-lg mb-4 p-2",children:[(0,u.jsx)("p",{className:"text-2xl font-bold dark:text-white text-left",children:"Brands"}),(0,u.jsx)(d.ZP,{container:!0,columnSpacing:1,rowSpacing:1,children:Array.from(c).map((function(e,t){return(0,u.jsx)(d.ZP,{item:!0,xs:6,sm:6,md:3,children:(0,u.jsx)(o.$q,{brand:e})},t)}))})]}),(0,u.jsxs)("div",{className:"dark:bg-gray-800 bg-gray-200 shadow-lg rounded-lg mb-4 p-2",children:[(0,u.jsx)("p",{className:"text-2xl font-bold dark:text-white text-left",children:"Blogs"}),(0,u.jsx)(d.ZP,{container:!0,columnSpacing:1,rowSpacing:1,children:f.map((function(e){return(0,u.jsx)(d.ZP,{item:!0,xs:6,sm:6,md:3,children:(0,u.jsx)(h.BlogItem,{item:e})})}))})]}),(0,u.jsxs)("div",{className:"dark:bg-gray-800 bg-gray-200 shadow-lg rounded-lg mb-4 p-2",children:[(0,u.jsx)("p",{className:"text-2xl font-bold dark:text-white text-left",children:"Console Categories"}),(0,u.jsx)(d.ZP,{container:!0,columnSpacing:1,rowSpacing:1,children:Array.from(Z).map((function(e,t){return(0,u.jsx)(d.ZP,{item:!0,xs:6,sm:6,md:3,children:(0,u.jsx)(o.w6,{subcat:e})},t)}))})]}),(0,u.jsxs)("div",{className:"dark:bg-gray-800 bg-gray-200 shadow-lg rounded-lg mb-4 p-2",children:[(0,u.jsx)("p",{className:"text-2xl font-bold dark:text-white text-left",children:"Consoles"}),(0,u.jsx)(d.ZP,{container:!0,columnSpacing:1,children:v.map((function(e,t){return(0,u.jsx)(d.ZP,{item:!0,xs:6,sm:6,md:3,children:(0,u.jsx)(o.tm,{con:e})})}))})]})]})]})}}}]);