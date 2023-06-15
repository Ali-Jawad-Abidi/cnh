"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[51],{51:function(e,t,r){r.r(t),r.d(t,{default:function(){return c}});var a=r(885),s=r(7313),l=r(3753),d=r(3217),n=r(1881),o=r.n(n),u=r(6417);function c(){var e=(0,s.useState)(null),t=(0,a.Z)(e,2),r=t[0],n=t[1],c=(0,s.useState)(null),i=(0,a.Z)(c,2),x=i[0],b=i[1],m=(0,s.useState)(!1),g=(0,a.Z)(m,2),h=g[0],f=g[1],k=(0,s.useState)(null),p=(0,a.Z)(k,2),y=p[0],w=p[1];return(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{className:"min-h-screen",children:[(0,u.jsx)(d.Z,{}),(0,u.jsxs)("div",{className:"dark:bg-gray-900 shadow-xl mx-auto lg:w-[40%] w-[80%] p-4 rounded-lg my-[5%]",children:[(0,u.jsx)("p",{className:"text-xl text-center font-bold dark:text-white",children:"Forgot Your Password?"}),(0,u.jsxs)("p",{className:"text-sm text-center text-bold dark:text-white",children:["Please enter the username and email address that is linked to your account. ",(0,u.jsx)("br",{})," You will receive the link to reset password on that email."," "]}),(0,u.jsxs)("form",{children:[(0,u.jsxs)("div",{children:[(0,u.jsx)("label",{for:"username",class:"block mb-2 mt-2 text-xs text-left font-medium text-gray-900 dark:text-white",children:"Username"}),(0,u.jsx)("input",{type:"text",id:"username",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Username",required:!0,onChange:function(e){return b(e.target.value)},disabled:h})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)("label",{for:"first_name",class:"block mb-2 mt-2 text-xs text-left font-medium text-gray-900 dark:text-white",children:"Email"}),(0,u.jsx)("input",{type:"text",id:"first_name",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"user@email.com",required:!0,onChange:function(e){return n(e.target.value)},disabled:h})]}),(0,u.jsx)("button",{type:"submit",onClick:function(e){if(e.preventDefault(),/\S+@\S+\.\S+/.test(r)||""===r){f(!0);var t={url:"https://thecnh.co.uk/api/resetPasswordRequest",method:"get",params:{username:x,email:r}};o()(t).then((function(e){200===e.status?(w(e.data.msg),console.log(e.data.msg),f(!0)):(console.log(e.data),w(e.data),f(!1))}))}else w("Email is not correct")},className:"mx-auto px-2 py-1 mt-2 text-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white",children:"Submit"})]})]}),(0,u.jsx)("p",{className:"text-red-600 text-xl font-bold text-center",children:y})]}),(0,u.jsx)(l.Z,{})]})}}}]);