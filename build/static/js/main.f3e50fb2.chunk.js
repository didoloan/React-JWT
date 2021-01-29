(this["webpackJsonpreact-jwt"]=this["webpackJsonpreact-jwt"]||[]).push([[0],{18:function(e){e.exports=JSON.parse('{"a":"https://jwtauth.tk"}')},59:function(e,t,n){},60:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n(0),s=n.n(c),o=n(7),r=n.n(o),i=(n(59),n.p,n(60),n(12)),l=n(15),d=n(18),h=n(14),j="LOGIN",u="LOGOUT",b=function(e){return{type:j,payload:e}},g=function(){return{type:u}},p=n(98),f=function(e){var t=e.interests,n=e.add,s=Object(c.useState)(""),o=Object(l.a)(s,2),r=o[0],i=o[1];return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Interests"}),Object(a.jsx)("div",{style:{width:300,display:"flex",margin:"auto",flexFlow:"row wrap"},children:t.map((function(e,t){return Object(a.jsx)("p",{style:{padding:5,margin:0,marginLeft:5,boxShadow:"0 2px 5px #aaa",borderRadius:5},children:e})}))}),Object(a.jsx)(p.a,{type:"text",placeholder:"Add new Interest",onChange:function(e){i(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&n(r)},value:r})]})},O=function(e){var t=e.interests,n=e.add,s=Object(c.useState)(""),o=Object(l.a)(s,2),r=o[0],i=o[1];return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Hobbies"}),Object(a.jsx)("div",{style:{width:300,display:"flex",margin:"auto",flexFlow:"row wrap"},children:t.map((function(e,t){return Object(a.jsx)("p",{style:{padding:5,margin:0,marginLeft:5,boxShadow:"0 2px 5px #aaa",borderRadius:5},children:e})}))}),Object(a.jsx)(p.a,{type:"text",placeholder:"Add new Hobby",onChange:function(e){i(e.target.value)},onKeyPress:function(e){"Enter"===e.key&&n(r)},value:r})]})},m=function(e){var t=Object(c.useState)({}),n=Object(l.a)(t,2),s=n[0],o=n[1],r=Object(h.c)((function(e){return e.auth})),j=Object(h.b)();Object(c.useEffect)((function(){console.log(r),r.isLoggedIn||Object(i.c)("/login"),fetch("".concat(d.a,"/user"),{method:"GET",headers:{Authorization:"Bearer ".concat(r.tokens.access)}}).then((function(e){return e.json()})).then((function(e){console.log(e),e.error&&j(g),e.result.email&&o(e.result)}))}),[]);return Object(a.jsxs)("div",{children:[Object(a.jsxs)("h1",{style:{color:"#645454"},children:["Welcome ",s.fname]}),s.email&&Object(a.jsx)(f,{interests:s.interests,add:function(e){var t=[];t.push(e),console.log(t),fetch("".concat(d.a,"/user/interests"),{method:"POST",headers:{Authorization:"Bearer ".concat(r.tokens.access),"Content-Type":"application/json"},body:JSON.stringify({interests:t})}).then((function(e){return e.json()})).then((function(t){t.message&&o(s.interests.push(e))}))}}),s.email&&Object(a.jsx)(O,{interests:s.hobbies,add:function(e){var t=[];t.push(e),fetch("".concat(d.a,"/user/hobbies"),{method:"POST",headers:{Authorization:"Bearer ".concat(r.tokens.access),"Content-Type":"application/json"},body:JSON.stringify({hobbies:t})}).then((function(e){return e.json()})).then((function(t){t.message&&o(s.hobbies.push(e))}))}})]})},x=n(24),y=n(29),v=n(99),w=function(e){var t=Object(c.useState)({email:"",password:""}),n=Object(l.a)(t,2),s=n[0],o=n[1],r=Object(h.b)(),j=Object(h.c)((function(e){return e.auth}));Object(c.useEffect)((function(){j.isLoggedIn&&Object(i.c)("/dashboard")}),[]);var u=function(e){e.preventDefault(),console.log("fetching login"),fetch("".concat(d.a,"/auth/login"),{method:"POST",headers:{"Content-Type":"application/json","cache-control":"no-cache"},body:JSON.stringify(s)}).then((function(e){return e.json()})).then((function(e){console.table(e),e.accessToken&&(r(b(e)),Object(i.c)("/dashboard"))}))},g=function(e){var t=e.target.value;o(Object(y.a)(Object(y.a)({},s),{},Object(x.a)({},e.target.name,t)))};return Object(a.jsxs)("div",{style:{width:300,margin:"auto"},children:[Object(a.jsx)("h2",{children:"Login"}),Object(a.jsxs)("form",{onSubmit:u,style:{display:"flex",flexDirection:"column"},children:[Object(a.jsx)(p.a,{style:{marginTop:20},placeholder:"Email",name:"email",value:s.email,onChange:g}),Object(a.jsx)(p.a,{style:{marginTop:20},type:"password",placeholder:"Password",name:"password",value:s.password,onChange:g}),Object(a.jsx)(v.a,{onClick:u,style:{marginTop:20},variant:"contained",color:"primary",children:"Login"})]}),Object(a.jsxs)("p",{children:["Not yet registered ",Object(a.jsx)(i.a,{to:"/login",children:"Register"})]})]})},T=function(e){var t=Object(c.useState)({email:"",fname:"",lname:"",dob:"",password:""}),n=Object(l.a)(t,2),s=n[0],o=n[1],r=Object(h.b)(),j=function(e){e.preventDefault(),u()},u=function(){fetch("".concat(d.a,"/auth/register"),{method:"POST",headers:{"Content-Type":"application/json","cache-control":"no-cache"},body:JSON.stringify(s)}).then((function(e){return e.json()})).then((function(e){console.table(e),e.accessToken&&(r(b(e)),Object(i.c)("/dashboard"))}))},g=function(e){var t=e.target.value;o(Object(y.a)(Object(y.a)({},s),{},Object(x.a)({},e.target.name,t)))};return Object(a.jsxs)("div",{style:{width:300,margin:"auto"},children:[Object(a.jsx)("h2",{children:"Register"}),Object(a.jsxs)("form",{onSubmit:j,style:{display:"flex",flexDirection:"column"},children:[Object(a.jsx)(p.a,{style:{marginTop:20},type:"email",placeholder:"Email",name:"email",value:s.email,onChange:g}),Object(a.jsx)(p.a,{style:{marginTop:20},placeholder:"Firstname",name:"fname",value:s.fname,onChange:g}),Object(a.jsx)(p.a,{style:{marginTop:20},placeholder:"Lastname",name:"lname",value:s.lname,onChange:g}),Object(a.jsx)(p.a,{style:{marginTop:20},label:"Birthday",defaultValue:"2000-01-01",type:"date",name:"dob",value:s.dob,onChange:g}),Object(a.jsx)(p.a,{style:{marginTop:20},type:"password",placeholder:"Password",name:"password",value:s.password,onChange:g,InputLabelProps:{shrink:!1}}),Object(a.jsx)(v.a,{onClick:j,style:{marginTop:20},variant:"contained",color:"primary",children:"Register"})]}),Object(a.jsxs)("p",{children:["Already registered ",Object(a.jsx)(i.a,{to:"/login",children:"Login"})]})]})},S=function(){return Object(a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:20,backgroundColor:"#303f9f",color:"white"},children:[Object(a.jsx)("h2",{children:"ReactJWT"}),Object(a.jsx)("ul",{children:Object(a.jsxs)("li",{children:[Object(a.jsx)(i.a,{to:"/dashboard"}),Object(a.jsx)(i.a,{to:"/login"}),Object(a.jsx)(i.a,{to:"/signout"})]})})]})};var k=function(){return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(S,{}),Object(a.jsxs)(i.b,{children:[Object(a.jsx)(w,{path:"/login"}),Object(a.jsx)(T,{path:"/register"}),Object(a.jsx)(m,{path:"/dashboard"})]})]})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,101)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),s(e),o(e)}))},L=n(31),I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLoggedIn:!1,tokens:{access:"",refresh:""}},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case j:return{tokens:{access:t.payload.accessToken,refresh:t.payload.refreshToken},isLoggedIn:!0};case u:return{tokens:{access:"",refresh:""},isLoggedIn:!1};default:return e}},P=function(){try{var e=localStorage.getItem("ghch8u7");return null===e?{auth:{isLoggedIn:!1,tokens:{access:"",refresh:""}}}:JSON.parse(e)}catch(t){return console.log(t),{auth:{isLoggedIn:!1,tokens:{access:"",refresh:""}}}}}(),J=Object(L.b)({auth:I}),N=Object(L.c)(J,P);N.subscribe((function(){return function(e){try{var t=JSON.stringify(e);localStorage.setItem("ghch8u7",t)}catch(n){console.log(n)}}(N.getState())}));var E=N;r.a.render(Object(a.jsx)(h.a,{store:E,children:Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(k,{})})}),document.getElementById("root")),C()}},[[68,1,2]]]);
//# sourceMappingURL=main.f3e50fb2.chunk.js.map