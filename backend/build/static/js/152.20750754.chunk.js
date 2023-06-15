"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[152],{6152:function(e,t,s){s.r(t),s.d(t,{default:function(){return h}});var a=s(3430),r=s(7313),l=s(3753),o=s(2040),n=s(7890),c=s(1881),i=s.n(c),d=s(1927),m=s(3281),x=s(6417);function h(e){var t=(0,r.useState)(null),s=(0,a.Z)(t,2),c=s[0],h=s[1],g=(0,n.UO)().id;return(0,r.useEffect)((function(){var e={method:"get",url:"https://thecnh.co.uk/api/blog",params:{id:g}};i()(e).then((function(e){200===e.status&&h(e.data[0])}))}),[g]),c?(0,x.jsxs)("div",{className:"dark:bg-gray-900 dark:text-white",children:[(0,x.jsx)(d.Z,{}),(0,x.jsxs)("div",{className:"lg:mx-28 mx-4 mb-4",children:[(0,x.jsxs)("div",{className:"flex flex-col gap-2 shadow-lg my-4 dark:bg-gray-800 rounded-lg p-4 pb-8",children:[(0,x.jsx)("img",{src:c.image,alt:"blog image",className:"w-full h-96 lg:px-12 px-4 object-cover"}),(0,x.jsxs)("div",{className:"shadow-xl p-4 rounded-lg dark:bg-gray-800",children:[(0,x.jsx)("p",{className:"text-2xl font-bold text-center mb-4",children:c.title}),(0,x.jsx)("p",{className:"text-left whitespace-pre-wrap text-lg dark:text-white lg:px-8 px-2",children:c.text})]})]}),(0,x.jsx)(o.Z,{type:"blog",post:c._id,comments:c.comments})]}),(0,x.jsx)(l.Z,{})]}):(0,x.jsx)(m.Z,{})}},2040:function(e,t,s){s.d(t,{Z:function(){return i}});var a=s(5531),r=s(3430),l=s(7313),o=s(1881),n=s.n(o),c=s(6417);function i(e){var t=(0,l.useState)(""),s=(0,r.Z)(t,2),o=s[0],i=s[1],d=(0,l.useState)([]),m=(0,r.Z)(d,2),x=m[0],h=m[1];return(0,l.useEffect)((function(){if(void 0!==e.comments&&e.comments.length>0){var t={method:"get",url:"https://thecnh.co.uk/api/getcomments",params:{id:e.comments}};n()(t).then((function(e){200===e.status&&h(e.data)}))}}),[]),"userid"in sessionStorage?(0,c.jsxs)("div",{className:"dark:bg-gray-800 shadow-lg p-4 rounded-lg w-full",children:[(0,c.jsxs)("div",{className:"comments text-left font-bold text-xl text-bold dark:text-white",children:["Discussions(",x.length,")"]}),(0,c.jsxs)("div",{className:"flex flex-col",children:[(0,c.jsx)("textarea",{id:"message",rows:"4",class:"bg-gray-90 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mt-2",placeholder:"Write a comment...",onChange:function(e,t){return i(e.target.value)}}),(0,c.jsx)("button",{onClick:function(t){!function(t){var s=new Date,r=s.getDay()+" "+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][s.getMonth()]+" "+s.getFullYear();t.preventDefault();var l=Object();l.text=o,l.post=e.post,l.posttype=e.type,l.username=JSON.parse(sessionStorage.getItem("username")),l.user=JSON.parse(sessionStorage.getItem("userid")),l.date=r;var c={method:"post",url:"https://thecnh.co.uk/api/addcomment",data:l};n()(c).then((function(e){200===e.status&&(l.profilephoto=JSON.parse(sessionStorage.getItem("profileImage")),h((function(e){return[].concat((0,a.Z)(e),[l])})))}))}(t)},className:"button mt-2 lg:w-1/5 w-2/5 float-left no-wrap text-xs lg:text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-2",children:"Post Comment"}),(0,c.jsx)("div",{className:"mt-10",children:x.map((function(e){return(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex flex-row ml-4",children:[(0,c.jsx)("img",{src:e.profilephoto?e.profilephoto:"https://flowbite.com/docs/images/people/profile-picture-2.jpg",alt:"profile photo",className:"w-8 h-8 rounded-full object-fit"}),(0,c.jsxs)("div",{className:"dark:text-white text-sm object-center m-2",children:[(0,c.jsx)("span",{children:e.username}),(0,c.jsx)("span",{className:"ml-4 dark:text-gray-300",children:e.date||"Feb. 12, 2022"})]})]}),(0,c.jsx)("div",{className:"ml-6 text-left dark:text-gray-300",children:e.text}),(0,c.jsx)("hr",{class:"h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"})]})}))})]})]}):(0,c.jsxs)("div",{className:"dark:bg-gray-800 shadow-lg p-4 rounded-lg w-full",children:[(0,c.jsxs)("div",{className:"comments text-left font-bold text-xl text-bold dark:text-white",children:["Discussions(",x.length,")"]}),(0,c.jsxs)("div",{className:"flex flex-col",children:[(0,c.jsxs)("p",{className:"text-sm text-left dark:text-white",children:[(0,c.jsx)("a",{href:"/login",onClick:function(){sessionStorage.setItem("redirectTo",JSON.stringify(window.location.pathname))},className:"text-blue-600 hover:underline",children:"Login or Sign Up"})," ","to post comments..."]}),(0,c.jsx)("div",{className:"mt-4",children:x.map((function(e){return(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex flex-row ml-4",children:[(0,c.jsx)("img",{src:e.profilephoto?e.profilephoto:"https://flowbite.com/docs/images/people/profile-picture-2.jpg",alt:"profile photo",className:"w-8 h-8 rounded-full object-fit"}),(0,c.jsxs)("div",{className:"dark:text-white text-sm object-center m-2",children:[(0,c.jsx)("span",{children:e.username}),(0,c.jsx)("span",{className:"ml-4 dark:text-gray-300",children:e.date||"Feb. 12, 2022"})]})]}),(0,c.jsx)("div",{className:"ml-6 text-left dark:text-gray-300",children:e.text}),(0,c.jsx)("hr",{class:"h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"})]})}))})]})]})}}}]);