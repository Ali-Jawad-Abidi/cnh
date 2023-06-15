"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[930],{2040:function(e,t,s){s.d(t,{Z:function(){return c}});var l=s(5531),a=s(3430),r=s(7313),n=s(1881),i=s.n(n),d=s(6417);function c(e){var t=(0,r.useState)(""),s=(0,a.Z)(t,2),n=s[0],c=s[1],o=(0,r.useState)([]),x=(0,a.Z)(o,2),h=x[0],m=x[1];return(0,r.useEffect)((function(){if(void 0!==e.comments&&e.comments.length>0){var t={method:"get",url:"https://thecnh.co.uk/api/getcomments",params:{id:e.comments}};i()(t).then((function(e){200===e.status&&m(e.data)}))}}),[]),"userid"in sessionStorage?(0,d.jsxs)("div",{className:"dark:bg-gray-800 shadow-lg p-4 rounded-lg w-full",children:[(0,d.jsxs)("div",{className:"comments text-left font-bold text-xl text-bold dark:text-white",children:["Discussions(",h.length,")"]}),(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsx)("textarea",{id:"message",rows:"4",class:"bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mt-2",placeholder:"Write a comment...",onChange:function(e,t){return c(e.target.value)}}),(0,d.jsx)("button",{onClick:function(t){!function(t){var s=new Date,a=s.getDay()+" "+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][s.getMonth()]+" "+s.getFullYear();t.preventDefault();var r=Object();r.text=n,r.post=e.post,r.posttype=e.type,r.username=JSON.parse(sessionStorage.getItem("username")),r.user=JSON.parse(sessionStorage.getItem("userid")),r.date=a;var d={method:"post",url:"https://thecnh.co.uk/api/addcomment",data:r};i()(d).then((function(e){200===e.status&&(r.profilephoto=JSON.parse(sessionStorage.getItem("profileImage")),m((function(e){return[].concat((0,l.Z)(e),[r])})))}))}(t)},className:"button mt-2 lg:w-1/5 w-2/5 float-left no-wrap text-xs lg:text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-2",children:"Post Comment"}),(0,d.jsx)("div",{className:"mt-10",children:h.map((function(e){return(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{className:"flex flex-row ml-4",children:[(0,d.jsx)("img",{src:e.profilephoto?e.profilephoto:"https://flowbite.com/docs/images/people/profile-picture-2.jpg",alt:"profile photo",className:"w-8 h-8 rounded-full object-fit"}),(0,d.jsxs)("div",{className:"dark:text-white text-sm object-center m-2",children:[(0,d.jsx)("span",{children:e.username}),(0,d.jsx)("span",{className:"ml-4 dark:text-gray-300",children:e.date||"Feb. 12, 2022"})]})]}),(0,d.jsx)("div",{className:"ml-6 text-left dark:text-gray-300",children:e.text}),(0,d.jsx)("hr",{class:"h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"})]})}))})]})]}):(0,d.jsxs)("div",{className:"dark:bg-gray-800 shadow-lg p-4 rounded-lg w-full",children:[(0,d.jsxs)("div",{className:"comments text-left font-bold text-xl text-bold dark:text-white",children:["Discussions(",h.length,")"]}),(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsxs)("p",{className:"text-sm text-left dark:text-white",children:[(0,d.jsx)("a",{href:"/login",onClick:function(){sessionStorage.setItem("redirectTo",JSON.stringify(window.location.pathname))},className:"text-blue-600 hover:underline",children:"Login or Sign Up"})," ","to post comments..."]}),(0,d.jsx)("div",{className:"mt-4",children:h.map((function(e){return(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{className:"flex flex-row ml-4",children:[(0,d.jsx)("img",{src:e.profilephoto?e.profilephoto:"https://flowbite.com/docs/images/people/profile-picture-2.jpg",alt:"profile photo",className:"w-8 h-8 rounded-full object-fit"}),(0,d.jsxs)("div",{className:"dark:text-white text-sm object-center m-2",children:[(0,d.jsx)("span",{children:e.username}),(0,d.jsx)("span",{className:"ml-4 dark:text-gray-300",children:e.date||"Feb. 12, 2022"})]})]}),(0,d.jsx)("div",{className:"ml-6 text-left dark:text-gray-300",children:e.text}),(0,d.jsx)("hr",{class:"h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"})]})}))})]})]})}},6930:function(e,t,s){s.r(t),s.d(t,{default:function(){return N}});var l=s(3430),a=s(7313),r=s(1113),n=s(3753),i=s(7890),d=s(1881),c=s.n(d),o=s(2040),x=s(3281),h=s(4832),m=s(1927),u=s(1069),f=s(9447),g=s(6417);function p(e){var t=e.con.images,s=(0,a.useState)(t[0]),r=(0,l.Z)(s,2),n=r[0],i=r[1],d=(0,a.useState)(0),o=(0,l.Z)(d,2),x=o[0],h=o[1];return(0,g.jsxs)("div",{className:"bg-gray-200 w-full dark:bg-gray-800 p-4 rounded-lg",children:[(0,g.jsxs)("div",{className:"flex flex-row justify-between",children:[(0,g.jsx)("p",{className:"font-bold text-xl dark:text-white text-left uppercase\t",children:e.con.name}),(0,g.jsxs)("div",{className:"text-right",children:[(0,g.jsx)("button",{className:"bg-blue-600 text-white text-sm rounded-lg px-3 py-2 mr-2",children:"Badge"}),(0,g.jsx)(f.Z,{title:e.red?"Added to Collection":"Add to Collection",placement:"bottom",children:(0,g.jsx)(u.Z,{fontSize:"large",style:{cursor:"pointer",color:e.red?"red":"black"},onClick:function(){e.setIsRed(!e.red);var t={method:"get",url:"https://thecnh.co.uk/api/addtocollection",params:{con:e.con._id,user:JSON.parse(sessionStorage.getItem("userid"))}};c()(t).then((function(e){console.log(e.data)}))}})})]})]}),(0,g.jsxs)("div",{className:"relative",children:[(0,g.jsx)("img",{src:n,alt:"console images",className:"lg:h-96 h-72 lg:w-[50vw] w-[100vw] mx-auto my-2 object-cover rounded-lg mb-2"}),(0,g.jsxs)("div",{className:"directions absolute inset-x-0 top-1/2 flex items-end justify-between",children:[(0,g.jsx)("button",{onClick:function(){var e=x-1<0?t.length-1:x-1;i(t[e]),h(e)},className:"back-arrow w-14 h-14 bg-white rounded-full",children:(0,g.jsx)("i",{className:"flex text-black items-center justify-center text-2xl hover:text-black",children:(0,g.jsx)("ion-icon",{name:"chevron-back-outline"})})}),(0,g.jsx)("button",{onClick:function(){var e=(x+1)%t.length;i(t[e]),h(e)},className:"next-arrow w-14 h-14 bg-white rounded-full",children:(0,g.jsx)("i",{className:"flex items-center text-black justify-center m-auto text-2xl hover:text-black",children:(0,g.jsx)("ion-icon",{name:"chevron-forward-outline"})})})]})]}),(0,g.jsx)("div",{className:"flex flex-row gap-2 items-center justify-center",children:t.map((function(e,s){return(0,g.jsx)("img",{src:e,id:s,onClick:function(e){!function(e){i(t[e%t.length]),h(e%(t.length-1))}(e.target.id)},alt:"console images",className:"lg:h-24 h-12 w-1/5 object-cover rounded-lg cursor-pointer"})}))})]})}function j(e){return(0,g.jsxs)("div",{className:"rounded-lg shadow-lg dark:bg-gray-800 dark:text-white py-2 mb-2",children:[(0,g.jsx)("p",{className:"text-xl font-bold dark:text-white text-center",children:"Where to Buy"}),(0,g.jsx)("ul",{children:e.links&&e.links[0].split(".").map((function(e,t){return(0,g.jsx)("li",{children:(0,g.jsx)("a",{target:"_blank",href:e,style:{textDecoration:"none"},children:(0,g.jsxs)("p",{className:"text-left",children:["Link"," "+t]})})})}))})]})}function b(e){var t=(0,a.useState)([]),s=(0,l.Z)(t,2),n=s[0],i=s[1],d=(0,a.useState)(!1),o=(0,l.Z)(d,2),x=o[0],h=o[1];return(0,a.useEffect)((function(){var t={method:"get",url:"https://thecnh.co.uk/api/getdocuments",params:{ids:e.con.documents}};c()(t).then((function(e){200===e.status?i(e.data):i([])}))}),[]),(0,g.jsx)("div",{className:"p-6 rounded-lg shadow-xl dark:text-white dark:bg-gray-800",children:(0,g.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,g.jsx)("p",{className:"text-xl font-bold dark:text-white text-center",children:"Guides"}),(0,g.jsx)("ul",{className:"list-disc",children:n.slice(0,5).map((function(e,t){return(0,g.jsx)("li",{className:"hover:underline",children:(0,g.jsx)("a",{download:e.name,href:e.content,children:(0,g.jsx)("p",{className:"text-left text-sm",children:e.name})},t)})}))}),(0,g.jsx)("div",{onClick:function(){return h(!0)},className:"mt-1 hover:border-white/40 cursor-pointer flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-1 py-2 text-center text-xs font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300",children:"Show More"}),x&&(0,g.jsx)("div",{id:"authentication-modal",tabIndex:"-1",className:"fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full",children:(0,g.jsx)("div",{className:"relative w-full h-full max-w-2xl max-h-md md:h-auto",children:(0,g.jsxs)("div",{className:"relative bg-white rounded-lg shadow dark:bg-gray-700",children:[(0,g.jsxs)("button",{type:"button",className:"absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white","data-modal-hide":"authentication-modal",onClick:function(){h(!1)},children:[(0,g.jsx)("svg",{"aria-hidden":"true",className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,g.jsx)("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}),(0,g.jsx)("span",{className:"sr-only",children:"Close modal"})]}),(0,g.jsxs)("div",{className:"px-6 py-6 lg:px-8",children:[(0,g.jsx)("h3",{className:"mb-4 text-xl font-medium text-gray-900 dark:text-white",children:"Guides"}),(0,g.jsx)("ul",{className:"list-disc p-4",children:n.map((function(e,t){return(0,g.jsx)("li",{className:"hover:underline",children:(0,g.jsx)("a",{download:e.name,href:e.content,children:(0,g.jsx)(r.Z,{align:"left",noWrap:!0,variant:"inherit",style:{overflow:"none"},children:e.name})},t)})}))})]})]})})})]})})}function v(e){var t=(0,a.useState)(e.con.commonfaults?e.con.commonfaults:[]),s=(0,l.Z)(t,2),n=s[0],i=s[1],d=(0,a.useState)(!1),o=(0,l.Z)(d,2),x=o[0],h=o[1];return(0,a.useEffect)((function(){var t={method:"get",url:"https://thecnh.co.uk/api/getfaults",params:{ids:e.con.commonfaults}};c()(t).then((function(e){200===e.status?i(e.data):i([])}))}),[]),(0,g.jsx)("div",{className:"p-6 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg",children:(0,g.jsxs)("div",{className:"flex flex-col",children:[(0,g.jsx)("p",{className:"text-xl font-bold dark:text-white text-center",children:"Common Faults"}),(0,g.jsx)("ul",{className:"list-disc p-2",children:n.slice(0,5).map((function(e,t){return(0,g.jsx)("li",{className:"hover:underline",children:(0,g.jsx)("a",{download:e.name,href:e.content,children:(0,g.jsx)("p",{className:"text-sm dark:text-white text-left",children:e.name})},t)})}))}),(0,g.jsx)("div",{onClick:function(){return h(!0)},className:"mt-1 hover:border-white/40 cursor-pointer flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-1 py-2 text-center text-xs font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300",children:"Show More"}),x&&(0,g.jsx)("div",{id:"authentication-modal",tabIndex:"-1",className:"fixed z-40 inset-0 flex items-center justify-center w-full p-4 backdrop-blur overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full",children:(0,g.jsx)("div",{className:"relative w-full h-full max-w-2xl max-h-md md:h-auto",children:(0,g.jsxs)("div",{className:"relative bg-white rounded-lg shadow dark:bg-gray-700",children:[(0,g.jsxs)("button",{type:"button",className:"absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white","data-modal-hide":"authentication-modal",onClick:function(){h(!1)},children:[(0,g.jsx)("svg",{"aria-hidden":"true",className:"w-5 h-5",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:(0,g.jsx)("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}),(0,g.jsx)("span",{className:"sr-only",children:"Close modal"})]}),(0,g.jsxs)("div",{className:"px-6 py-6 lg:px-8",children:[(0,g.jsx)("h3",{className:"mb-4 text-xl font-medium text-gray-900 dark:text-white",children:"Common Faults"}),(0,g.jsx)("ul",{className:"list-disc p-4",children:n.map((function(e,t){return(0,g.jsx)("li",{className:"hover:underline",children:(0,g.jsx)("a",{download:e.name,href:e.content,children:(0,g.jsx)(r.Z,{align:"left",noWrap:!0,variant:"inherit",style:{overflow:"none"},children:e.name})},t)})}))})]})]})})})]})})}function w(e){return(0,g.jsxs)("div",{className:"p-5 rounded-lg shadow-xl dark:text-white dark:bg-gray-800",children:[(0,g.jsx)("p",{className:"text-xl font-bold dark:text-white text-center",children:"Where Am I?"}),(0,g.jsxs)("p",{className:"text-sm dark:text-white text-left",children:["At: "," "+e.con.whereami.location]}),(0,g.jsxs)("p",{className:"text-sm  dark:text-white text-left",children:["From: "," "+e.con.whereami.from]}),(0,g.jsxs)("p",{className:"text-sm  dark:text-white text-left",children:["To: "," "+e.con.whereami.to]}),(0,g.jsx)("a",{href:e.con.whereami.link,className:"text-blue-600 hover:underline",children:(0,g.jsxs)("p",{className:"text-sm dark:text-white text-left",children:["Visit:"," Link to console "]})})]})}function k(e){var t=(0,a.useState)(e.links),s=(0,l.Z)(t,2),r=s[0];s[1];return(0,g.jsx)("div",{className:"p-5 rounded-lg shadow-xl dark:text-white dark:bg-gray-800",children:(0,g.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,g.jsx)("p",{className:"text-xl font-bold dark:text-white text-center",children:"External Links"}),(0,g.jsx)("ul",{className:"list-disc",children:r.map((function(e,t){return(0,g.jsx)("li",{children:(0,g.jsx)("a",{href:e,style:{textDecoration:"none"},children:(0,g.jsx)("p",{className:"text-sm text-left dark:text-white",children:"Link "+(t+1)})})})}))})]})})}function N(e){var t=(0,i.UO)().id,s=(0,a.useState)(null),r=(0,l.Z)(s,2),d=r[0],u=r[1],f=(0,a.useState)(null),N=(0,l.Z)(f,2),y=(N[0],N[1],(0,a.useState)(null)),S=(0,l.Z)(y,2),C=(S[0],S[1],(0,a.useState)(!1)),Z=(0,l.Z)(C,2),L=Z[0],I=Z[1];return(0,a.useEffect)((function(){var e={method:"get",url:"https://thecnh.co.uk/api/getconsole",params:{id:t}};c()(e).then((function(s){200===s.status&&(u(s.data),"userid"in sessionStorage&&(e={method:"get",url:"https://thecnh.co.uk/api/getifliked",params:{con:t,user:JSON.parse(sessionStorage.getItem("userid"))}},c()(e).then((function(e){200===e.status&&(console.log(e.data),I(e.data))}))))}))}),[t]),null===d?(0,g.jsx)(x.Z,{}):(0,g.jsxs)("div",{children:[(0,g.jsx)(m.Z,{}),(0,g.jsxs)("div",{className:"flex lg:flex-row flex-col gap-2 my-4 lg:mx-12 mx-4",children:[(0,g.jsxs)("div",{className:"flex flex-col gap-2 lg:w-2/3",children:[(0,g.jsx)(p,{con:d,red:L,setIsRed:I}),(0,g.jsxs)("div",{children:[(0,g.jsxs)("div",{className:"dark:bg-gray-800 rounded-lg p-4 text-left",children:[(0,g.jsx)("p",{className:"font-bold whitespace-pre-wrap text-xl dark:text-white ",children:"Description"}),(0,g.jsx)("p",{className:"text-sm dark:text-white whitespace-pre-wrap\t",children:d.description})]}),(0,g.jsx)("div",{className:"hidden mt-2 lg:block",children:(0,g.jsx)(o.Z,{type:"console",post:d._id,comments:d.comments})})]})]}),(0,g.jsxs)("div",{className:"dark:bg-gray-800 sm:w-full flex flex-col dark:text-white rounded-lg p-5 lg:w-1/3",children:[(0,g.jsx)("div",{className:"flex flex-col gap-2",children:(0,g.jsxs)("dl",{class:"text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700",children:[(0,g.jsxs)("div",{class:"flex flex-col pb-3",children:[(0,g.jsx)("dt",{class:"mb-1 text-gray-500 md:text-lg dark:text-gray-400",children:"Rating"}),(0,g.jsx)("dd",{class:"text-lg font-semibold",children:(0,g.jsx)(h.Z,{value:d.rating,readOnly:!0})})]}),(0,g.jsxs)("div",{class:"flex flex-col pb-3",children:[(0,g.jsx)("dt",{class:"mb-1 text-gray-500 md:text-lg dark:text-gray-400",children:"Release Type"}),(0,g.jsx)("dd",{class:"text-lg font-semibold",children:d.releasetype})]}),(0,g.jsxs)("div",{class:"flex flex-col py-3",children:[(0,g.jsx)("dt",{class:"mb-1 text-gray-500 md:text-lg dark:text-gray-400",children:"Regional Code"}),(0,g.jsx)("dd",{class:"text-lg font-semibold",children:d.regionalcode})]}),(0,g.jsxs)("div",{class:"flex flex-col py-3",children:[(0,g.jsx)("dt",{class:"mb-1 text-gray-500 md:text-lg dark:text-gray-400",children:"Color"}),(0,g.jsx)("dd",{class:"text-lg font-semibold",children:d.color})]}),(0,g.jsxs)("div",{class:"flex flex-col py-3",children:[(0,g.jsx)("dt",{class:"mb-1 text-gray-500 md:text-lg dark:text-gray-400",children:"Desire"}),(0,g.jsx)("dd",{class:"text-lg font-semibold",children:d.desire})]}),(0,g.jsxs)("div",{class:"flex flex-col py-3",children:[(0,g.jsx)("dt",{class:"mb-1 text-gray-500 md:text-lg dark:text-gray-400",children:"Country"}),(0,g.jsx)("dd",{class:"text-lg font-semibold",children:d.country})]})]})}),(0,g.jsx)("hr",{className:"mb-4"}),(0,g.jsxs)("div",{className:"flex flex-col gap-2",children:[!d.links.includes("")&&(0,g.jsx)(k,{links:d.links}),d.whereami.isavailable&&(0,g.jsx)(w,{con:d}),d.commonfaults.length>0&&(0,g.jsx)(v,{con:d}),d.documents.length>0&&(0,g.jsx)(b,{con:d}),(0,g.jsx)(j,{}),(0,g.jsx)("div",{className:"lg:hidden block",children:(0,g.jsx)(o.Z,{type:"console",post:d._id,comments:d.comments})})]})]})]}),(0,g.jsx)(n.Z,{})]})}}}]);