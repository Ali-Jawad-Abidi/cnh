"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[623],{6623:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var a=n(885),r=n(7313),s=n(3217),c=n(3753),o=n(1881),i=n.n(o),u=n(6417);function l(){var e=new URLSearchParams(window.location.search),t=e.get("code"),n=e.get("state"),o=(0,r.useState)(0),l=(0,a.Z)(o,2),d=l[0],h=l[1],f=(0,r.useState)({}),x=(0,a.Z)(f,2),p=x[0],w=x[1];return(0,r.useEffect)((function(){var e={url:"https://thecnh.co.uk/api/patreonlogin",method:"post",data:{code:t,state:n,userid:JSON.parse(localStorage.getItem("userid"))}};i()(e).then((function(e){200===e.status?(h(1),w(e.data.data)):h(2)}))})),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.Z,{}),(0,u.jsx)("div",{className:"min-h-screen",children:0===d?(0,u.jsx)("p",{className:"font-bold font-xl text-center dark:text-white",children:"Please wait while we get your patreon account information..."}):1===d?(0,u.jsxs)("p",{className:"font-bold font-xl text-center dark:text-white",children:["Your Patreon account has been successfully linked!",(0,u.jsx)("br",{}),"Your Account ID: ",p.id]}):(0,u.jsx)("p",{className:"font-bold font-xl text-center dark:text-white",children:"Error Linking your patreon account!!!"})}),(0,u.jsx)(c.Z,{})]})}}}]);