"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[126],{7126:function(e,t,r){r.r(t),r.d(t,{default:function(){return o}});var s=r(3430),a=r(1881),l=r.n(a),n=r(7313),i=r(3281),d=r(6417);function o(e){var t=(0,n.useState)(""),r=(0,s.Z)(t,2),a=r[0],o=r[1],u=(0,n.useState)([]),h=(0,s.Z)(u,2),x=h[0],g=h[1],p=(0,n.useState)(),b=(0,s.Z)(p,2),f=b[0],m=b[1];function y(){var e={method:"get",url:"https://thecnh.co.uk/api/allusers",params:{id:JSON.parse(sessionStorage.getItem("userid")),start:x.length}};l()(e).then((function(e){if(200===e.status){var t=x;t=t.concat(e.data.users),g(t),m(!e.data.isEnd)}else g([]),m(!1)}))}function v(e){var t=x.map((function(t){return t._id===e._id?e:t}));g(t)}(0,n.useEffect)((function(){y()}),[]);var j=null!==x?x.filter((function(e){return e.username.includes(a)})):[];return x?(0,d.jsxs)("div",{class:"relative overflow-x-auto shadow-md sm:rounded-lg",children:[(0,d.jsxs)("div",{class:"flex items-center justify-between pb-4 bg-white dark:bg-gray-900",children:[(0,d.jsx)("label",{for:"table-search",class:"sr-only",children:"Search"}),(0,d.jsxs)("div",{class:"relative",children:[(0,d.jsx)("div",{class:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:(0,d.jsx)("svg",{class:"w-5 h-5 text-gray-500 dark:text-gray-400","aria-hidden":"true",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})})}),(0,d.jsx)("input",{type:"text",id:"table-search-users",class:"block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Search for users",onChange:function(e){return o(e.target.value)}})]})]}),(0,d.jsxs)("table",{class:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[(0,d.jsx)("thead",{class:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{scope:"col",class:"px-6 py-3",children:"Name"}),(0,d.jsx)("th",{scope:"col",class:"px-6 py-3",children:"Position"}),(0,d.jsx)("th",{scope:"col",class:"px-6 py-3",children:"Bits"}),(0,d.jsx)("th",{scope:"col",class:"px-6 py-3",children:"Action"}),(0,d.jsx)("th",{scope:"col",class:"px-6 py-3",children:"Delete"})]})}),(0,d.jsx)("tbody",{children:j.map((function(e){return(0,d.jsxs)("tr",{class:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",children:[(0,d.jsxs)("th",{scope:"row",class:"flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white",children:[(0,d.jsx)("img",{class:"w-10 h-10 rounded-full",src:e.thumbnail,alt:"Jese image"}),(0,d.jsxs)("div",{class:"pl-3",children:[(0,d.jsx)("div",{class:"text-base font-semibold",children:e.username}),(0,d.jsx)("div",{class:"font-normal text-gray-500",children:e.email})]})]}),(0,d.jsx)("td",{class:"px-6 py-4",children:e.isPremium?"Premium User":"Standard User"}),(0,d.jsx)("td",{class:"px-6 py-4",children:(0,d.jsxs)("div",{class:"flex items-center",children:[(0,d.jsx)("div",{class:"h-2.5 w-2.5 rounded-full bg-green-500 mr-2"})," ",e.wallet.bits]})}),(0,d.jsx)("td",{class:"px-6 py-4",children:(0,d.jsx)(c,{onUpdate:v,profile:e})}),(0,d.jsx)("td",{class:"px-6 py-4",children:(0,d.jsx)("button",{onClick:function(){g(x.filter((function(t){return e._id!==t._id})));var t={method:"post",url:"https://thecnh.co.uk/api/removeuser",data:{userid:JSON.parse(sessionStorage.getItem("userid")),id:e._id}};l()(t).then((function(e){200===e.status&&console.log(e.data)}))},class:"font-medium bg-red-600 rounded-xl px-3 py-2 text-white hover:bg-red-700",children:"Delete User"})})]})}))})]}),f&&(0,d.jsx)("button",{onClick:function(){y()},className:"mx-auto rounded-lg px-3 py-2 bg-blue-600 text-white",children:"Show More"})]}):(0,d.jsx)(i.Z,{})}function c(e){var t=(0,n.useState)(!1),r=(0,s.Z)(t,2),a=r[0],i=r[1],o=(0,n.useState)(e.profile.wallet.bits),c=(0,s.Z)(o,2),u=c[0],h=c[1];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("button",{onClick:function(){return i(!0)},class:"font-medium bg-blue-600 rounded-xl px-3 py-2 text-white hover:bg-blue-700",children:"Edit User"}),a&&(0,d.jsx)("div",{id:"authentication-modal",tabIndex:"-1",className:"fixed inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full",children:(0,d.jsx)("div",{className:"relative w-full h-full max-w-md md:h-auto",children:(0,d.jsxs)("div",{className:"relative bg-white rounded-lg shadow dark:bg-gray-700",children:[(0,d.jsxs)("button",{type:"button",className:"absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white","data-modal-hide":"authentication-modal",onClick:function(){i(!1)},children:[(0,d.jsx)("svg",{"aria-hidden":"true",className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,d.jsx)("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}),(0,d.jsx)("span",{className:"sr-only",children:"Close modal"})]}),(0,d.jsxs)("div",{className:"px-6 py-6 lg:px-8",children:[(0,d.jsx)("h3",{className:"mb-4 text-xl font-medium text-gray-900 dark:text-white",children:"Edit Profile"}),(0,d.jsxs)("form",{className:"space-y-2",action:"#",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("label",{for:"email",class:"block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Bits"}),(0,d.jsx)("input",{type:"Number",name:"price",id:"email",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",placeholder:"Bits",required:!0,value:u,onChange:function(e){h(e.target.value)}})]}),(0,d.jsx)("div",{className:"flex justify-evenly",children:(0,d.jsx)("button",{type:"button",onClick:function(t){!function(t){t.preventDefault();var r={method:"post",url:"https://thecnh.co.uk/api/updatebits",data:{id:e.profile._id,bits:u}};l()(r).then((function(t){if(200===t.status){var r=e.profile;r.wallet.bits=u,e.onUpdate(r),console.log(t.data)}})),i(!1)}(t)},className:"w-full ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",children:"Update"})})]})]})]})})})]})}}}]);