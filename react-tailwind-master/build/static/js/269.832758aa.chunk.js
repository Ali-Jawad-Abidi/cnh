"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[269,536,683],{5269:function(e,a,l){l.r(a),l.d(a,{default:function(){return y}});var o=l(2982),t=l(885),r=l(1600),n=l(7313),d=l(1881),s=l.n(d),c=l(3217),i=l(3753),u=l(6719),b=l.n(u),h=l(3281),p=l(6683),g=l(6417),x=["Red","Black","Orange","Blue","Green","White","Purple","Pink","Yellow","Silver","Gray","Maroon","Aqua","Lime","Navy Blue"],m=["Retail","Prototype","Developement Kit","Test Tool","Unofficial","Prize"],f=["PAL","NTSC-U/C","NTSC-J","NTSC-C","Region Free"];function y(e){var a=(0,n.useState)(null),l=(0,t.Z)(a,2),d=l[0],u=l[1],y=(0,n.useState)(null),k=(0,t.Z)(y,2),S=k[0],v=k[1],j=(0,n.useState)(null),w=(0,t.Z)(j,2),C=w[0],N=w[1],M=(0,n.useState)(null),I=(0,t.Z)(M,2),Z=I[0],T=I[1],A=(0,n.useState)([]),B=(0,t.Z)(A,2),G=B[0],P=B[1],R=(0,n.useState)(),L=(0,t.Z)(R,2),E=L[0],F=L[1];var U=(0,n.useState)(),O=(0,t.Z)(U,2),J=O[0],K=O[1],D=(0,n.useState)(),H=(0,t.Z)(D,2),V=H[0],z=H[1],W=(0,n.useState)(),q=(0,t.Z)(W,2),Y=q[0],_=q[1],Q=(0,n.useState)(),X=(0,t.Z)(Q,2),$=X[0],ee=X[1],ae=(0,n.useState)(),le=(0,t.Z)(ae,2),oe=le[0],te=le[1],re=(0,n.useState)(!1),ne=(0,t.Z)(re,2),de=ne[0],se=ne[1],ce=(0,n.useState)(""),ie=(0,t.Z)(ce,2),ue=ie[0],be=ie[1],he=(0,n.useState)(null),pe=(0,t.Z)(he,2),ge=(V=pe[0],z=pe[1],(0,n.useState)("")),xe=(0,t.Z)(ge,2),me=xe[0],fe=xe[1],ye=(0,n.useState)(""),ke=(0,t.Z)(ye,2),Se=ke[0],ve=ke[1],je=(0,n.useState)(""),we=(0,t.Z)(je,2),Ce=we[0],Ne=we[1],Me=(0,n.useState)([]),Ie=(0,t.Z)(Me,2),Ze=Ie[0],Te=Ie[1],Ae=(0,n.useState)(""),Be=(0,t.Z)(Ae,2),Ge=Be[0],Pe=Be[1],Re=(0,n.useState)(0),Le=(0,t.Z)(Re,2),Ee=Le[0],Fe=Le[1];return(0,n.useEffect)((function(){s()({method:"get",url:"https://thecnh.co.uk/api/allbrands"}).then((function(e){200===e.status&&(v(e.data.Console),N(e.data.Mobile),T(e.data.PC))}))}),[]),console.log(E),null===localStorage.getItem("userid")?(localStorage.setItem("redirectTo",JSON.stringify(window.location.pathname)),(0,g.jsxs)("div",{children:[(0,g.jsx)(c.Z,{}),(0,g.jsx)(p.LoginComponent,{}),(0,g.jsx)(i.Z,{})]})):de?(0,g.jsx)(h.Z,{}):!0===E?(0,g.jsxs)("div",{children:[(0,g.jsx)(c.Z,{}),(0,g.jsx)("div",{className:"min-h-screen",children:(0,g.jsxs)("div",{className:"mx-4 pb-2 rounded-lg dark:bg-gray-800 bg-gray-200",children:[(0,g.jsx)("p",{className:"mt-10 pt-2  dark:text-green-600 text-xl font-bold text-center",children:"Console Added Successfully!"}),(0,g.jsxs)("p",{className:"dark:text-white  text-xl font-bold text-center",children:["Your Console will be reviwed by our team and will be approved in a bit and the you can see it in our database.",(0,g.jsx)("br",{}),"Click below to add another console to the database."]}),(0,g.jsx)("button",{onClick:function(){F(void 0)},className:"bg-blue-600  hover:bg-blue-700 px-2 py-1 text-white rounded-lg",children:"Add Another"})]})}),(0,g.jsx)(i.Z,{})]}):!1===E?(0,g.jsxs)("div",{children:[(0,g.jsx)(c.Z,{}),(0,g.jsx)("div",{className:"min-h-screen",children:(0,g.jsxs)("div",{className:"dark:bg-gray-800 rounded-lg mx-4 pt-2 pb-2",children:[(0,g.jsx)("p",{className:"text-red-600 text-xl font-bold text-center",children:"Error encountered when adding your console."}),(0,g.jsxs)("p",{className:"dark:text-white text-xl font-bold text-center",children:["We regret to inform you that the console you tried to add did not get added to the database.",(0,g.jsx)("br",{}),"Click below to try again."]}),(0,g.jsx)("button",{onClick:function(){F(void 0)},className:"bg-blue-600 hover:bg-blue-700 px-2 py-1 text-white rounded-lg",children:"Add Console"})]})}),(0,g.jsx)(i.Z,{})]}):void 0===E?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(c.Z,{}),(0,g.jsx)("div",{className:"mx-10 md:mx-20 p-4 min-h-screen dark:bg-gray-800 mt-4 rounded-lg shadow-lg",children:(0,g.jsx)("div",{className:"shadow-lg p-4 rounded-lg dark:bg-gray-900",children:(0,g.jsxs)("form",{className:"flex flex-col gap-2",children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"countries",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Select console type"}),(0,g.jsxs)("select",{id:"countries",onChange:function(e){K(e.target.value),function(e){"console"===e?u(S):"mobile"===e?u(C):"pc"===e&&u(Z)}(e.target.value)},class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",children:[(0,g.jsx)("option",{value:"",children:"Select Console Type"}),(0,g.jsx)("option",{value:"console",children:"Console"}),(0,g.jsx)("option",{value:"mobile",children:"Mobile"}),(0,g.jsx)("option",{value:"pc",children:"PC"})]})]}),null!==d&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"countries",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Select Brand"}),(0,g.jsxs)("select",{id:"countries",onChange:function(e){z(e.target.value),function(e){console.log(e);var a={method:"get",url:"https://thecnh.co.uk/api/getsubcats",params:{id:e}};s()(a).then((function(e){console.log(e.data),200===e.status&&P(e.data)}))}(e.target.value)},class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",children:[(0,g.jsx)("option",{value:"",children:"Select Brand"}),d.map((function(e){return(0,g.jsx)("option",{value:e._id,children:e.name})}))]})]}),G.length>0&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"countries",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Select Category"}),(0,g.jsxs)("select",{id:"countries",onChange:function(e){_(e.target.value)},class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",children:[(0,g.jsx)("option",{value:"",children:"Select Category"}),G.map((function(e){return(0,g.jsx)("option",{value:e._id,children:e.name})}))]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"first_name",class:"block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white",children:"Console Name"}),(0,g.jsx)("input",{type:"text",id:"first_name",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Console Name",onChange:function(e){return be(e.target.value)},required:!0})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"small",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Country"}),(0,g.jsxs)("select",{id:"small",class:"block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:function(e){"Choose a country"!==e.target.value?ee(e.target.value):ee("")},children:[(0,g.jsx)("option",{selected:!0,children:"Choose a country"}),r.h.map((function(e){return(0,g.jsx)("option",{value:e.label,children:e.label})}))]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"small",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Color"}),(0,g.jsxs)("select",{id:"small",class:"block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:function(e){"Choose a color"!==e.target.value?te(e.target.value):te("")},children:[(0,g.jsx)("option",{selected:!0,children:"Choose a color"}),x.map((function(e){return(0,g.jsx)("option",{value:e,children:e})}))]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"small",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Regional Code"}),(0,g.jsxs)("select",{id:"small",class:"block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:function(e){Ne(e.target.value)},children:[(0,g.jsx)("option",{selected:!0,children:"Set Regional Code"}),f.map((function(e){return(0,g.jsx)("option",{value:e,children:e})}))]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"small",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Release Type"}),(0,g.jsxs)("select",{id:"small",class:"block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:function(e){ve(e.target.value)},children:[(0,g.jsx)("option",{selected:!0,children:"Set Relase Type"}),m.map((function(e){return(0,g.jsx)("option",{value:e,children:e})}))]})]}),(0,g.jsxs)("div",{class:"relative max-w-sm",children:[(0,g.jsx)("label",{for:"visitors",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Release Date"}),(0,g.jsx)("input",{type:"date",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Select date",onChange:function(e){return Pe(e.target.value)}})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"visitors",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Total Units Released"}),(0,g.jsx)("input",{type:"number",id:"visitors",class:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Units",required:!0,onChange:function(e){return Fe(e.target.value)}})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"message",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Description"}),(0,g.jsx)("textarea",{id:"message",rows:"4",class:"block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Add features and attributes...",onChange:function(e){return fe(e.target.value)}})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("label",{for:"message",class:"block text-left mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Upload Images"}),(0,g.jsxs)("div",{className:"dark:bg-gray-700 rounded-lg p-2",children:[(0,g.jsx)("div",{className:"flex flex-row gap-2 justify-center mb-4",children:Ze.length>0&&Ze.map((function(e){return(0,g.jsx)("img",{src:e,alt:"console image",className:"w-20 h-20 rounded-lg object-fit"})}))}),(0,g.jsxs)("label",{className:"px-5 w-1/2 text-sm cursor-pointer py-2 bg-blue-600 text-white rounded-lg",children:[(0,g.jsx)("input",{accept:"image/*",multiple:!0,type:"file",className:"hidden",onChange:function(e){var a=Array.from(e.target.files);(a=a.slice(0,5)).map((function(e){return new(b())(e,{quality:.8,maxHeight:720,maxWidth:1280,mimeType:["image/webp"],success:function(e){var a=new FileReader;a.readAsDataURL(e),a.onloadend=function(){var e=a.result;Te((function(a){return[].concat((0,o.Z)(a),[e])}))}}})}))},required:!0}),"Upload Images"]})]})]}),(0,g.jsx)("button",{type:"button",onClick:function(e){!function(e){F(!0),se(!0),e.preventDefault();var a={method:"post",url:"https://thecnh.co.uk/api/addconsole",data:{name:ue,type:J,country:$,color:oe,brand:V,description:me,images:Ze,releasetype:Se,totalunits:Ee,releasedate:Ge,regionalcode:Ce,addedby:JSON.parse(localStorage.getItem("userid")),userwhoadded:JSON.parse(localStorage.getItem("username")),subcat:Y}};s()(a).then((function(e){200===e.status?e.data.status&&F(!0):F(!1),se(!1)}))}(e)},className:"text-white text-md bg-blue-600 rounded-lg w-full py-2",children:"Submit"})]})]})]})})}),(0,g.jsx)(i.Z,{})]}):void 0}},1600:function(e,a,l){l.d(a,{h:function(){return o}});var o=[{code:"AD",label:"Andorra",phone:"376"},{code:"AE",label:"United Arab Emirates",phone:"971"},{code:"AF",label:"Afghanistan",phone:"93"},{code:"AG",label:"Antigua and Barbuda",phone:"1-268"},{code:"AI",label:"Anguilla",phone:"1-264"},{code:"AL",label:"Albania",phone:"355"},{code:"AM",label:"Armenia",phone:"374"},{code:"AO",label:"Angola",phone:"244"},{code:"AQ",label:"Antarctica",phone:"672"},{code:"AR",label:"Argentina",phone:"54"},{code:"AS",label:"American Samoa",phone:"1-684"},{code:"AT",label:"Austria",phone:"43"},{code:"AU",label:"Australia",phone:"61",suggested:!0},{code:"AW",label:"Aruba",phone:"297"},{code:"AX",label:"Alland Islands",phone:"358"},{code:"AZ",label:"Azerbaijan",phone:"994"},{code:"BA",label:"Bosnia and Herzegovina",phone:"387"},{code:"BB",label:"Barbados",phone:"1-246"},{code:"BD",label:"Bangladesh",phone:"880"},{code:"BE",label:"Belgium",phone:"32"},{code:"BF",label:"Burkina Faso",phone:"226"},{code:"BG",label:"Bulgaria",phone:"359"},{code:"BH",label:"Bahrain",phone:"973"},{code:"BI",label:"Burundi",phone:"257"},{code:"BJ",label:"Benin",phone:"229"},{code:"BL",label:"Saint Barthelemy",phone:"590"},{code:"BM",label:"Bermuda",phone:"1-441"},{code:"BN",label:"Brunei Darussalam",phone:"673"},{code:"BO",label:"Bolivia",phone:"591"},{code:"BR",label:"Brazil",phone:"55"},{code:"BS",label:"Bahamas",phone:"1-242"},{code:"BT",label:"Bhutan",phone:"975"},{code:"BV",label:"Bouvet Island",phone:"47"},{code:"BW",label:"Botswana",phone:"267"},{code:"BY",label:"Belarus",phone:"375"},{code:"BZ",label:"Belize",phone:"501"},{code:"CA",label:"Canada",phone:"1",suggested:!0},{code:"CC",label:"Cocos (Keeling) Islands",phone:"61"},{code:"CD",label:"Congo, Democratic Republic of the",phone:"243"},{code:"CF",label:"Central African Republic",phone:"236"},{code:"CG",label:"Congo, Republic of the",phone:"242"},{code:"CH",label:"Switzerland",phone:"41"},{code:"CI",label:"Cote d'Ivoire",phone:"225"},{code:"CK",label:"Cook Islands",phone:"682"},{code:"CL",label:"Chile",phone:"56"},{code:"CM",label:"Cameroon",phone:"237"},{code:"CN",label:"China",phone:"86"},{code:"CO",label:"Colombia",phone:"57"},{code:"CR",label:"Costa Rica",phone:"506"},{code:"CU",label:"Cuba",phone:"53"},{code:"CV",label:"Cape Verde",phone:"238"},{code:"CW",label:"Curacao",phone:"599"},{code:"CX",label:"Christmas Island",phone:"61"},{code:"CY",label:"Cyprus",phone:"357"},{code:"CZ",label:"Czech Republic",phone:"420"},{code:"DE",label:"Germany",phone:"49",suggested:!0},{code:"DJ",label:"Djibouti",phone:"253"},{code:"DK",label:"Denmark",phone:"45"},{code:"DM",label:"Dominica",phone:"1-767"},{code:"DO",label:"Dominican Republic",phone:"1-809"},{code:"DZ",label:"Algeria",phone:"213"},{code:"EC",label:"Ecuador",phone:"593"},{code:"EE",label:"Estonia",phone:"372"},{code:"EG",label:"Egypt",phone:"20"},{code:"EH",label:"Western Sahara",phone:"212"},{code:"ER",label:"Eritrea",phone:"291"},{code:"ES",label:"Spain",phone:"34"},{code:"ET",label:"Ethiopia",phone:"251"},{code:"FI",label:"Finland",phone:"358"},{code:"FJ",label:"Fiji",phone:"679"},{code:"FK",label:"Falkland Islands (Malvinas)",phone:"500"},{code:"FM",label:"Micronesia, Federated States of",phone:"691"},{code:"FO",label:"Faroe Islands",phone:"298"},{code:"FR",label:"France",phone:"33",suggested:!0},{code:"GA",label:"Gabon",phone:"241"},{code:"GB",label:"United Kingdom",phone:"44"},{code:"GD",label:"Grenada",phone:"1-473"},{code:"GE",label:"Georgia",phone:"995"},{code:"GF",label:"French Guiana",phone:"594"},{code:"GG",label:"Guernsey",phone:"44"},{code:"GH",label:"Ghana",phone:"233"},{code:"GI",label:"Gibraltar",phone:"350"},{code:"GL",label:"Greenland",phone:"299"},{code:"GM",label:"Gambia",phone:"220"},{code:"GN",label:"Guinea",phone:"224"},{code:"GP",label:"Guadeloupe",phone:"590"},{code:"GQ",label:"Equatorial Guinea",phone:"240"},{code:"GR",label:"Greece",phone:"30"},{code:"GS",label:"South Georgia and the South Sandwich Islands",phone:"500"},{code:"GT",label:"Guatemala",phone:"502"},{code:"GU",label:"Guam",phone:"1-671"},{code:"GW",label:"Guinea-Bissau",phone:"245"},{code:"GY",label:"Guyana",phone:"592"},{code:"HK",label:"Hong Kong",phone:"852"},{code:"HM",label:"Heard Island and McDonald Islands",phone:"672"},{code:"HN",label:"Honduras",phone:"504"},{code:"HR",label:"Croatia",phone:"385"},{code:"HT",label:"Haiti",phone:"509"},{code:"HU",label:"Hungary",phone:"36"},{code:"ID",label:"Indonesia",phone:"62"},{code:"IE",label:"Ireland",phone:"353"},{code:"IL",label:"Israel",phone:"972"},{code:"IM",label:"Isle of Man",phone:"44"},{code:"IN",label:"India",phone:"91"},{code:"IO",label:"British Indian Ocean Territory",phone:"246"},{code:"IQ",label:"Iraq",phone:"964"},{code:"IR",label:"Iran, Islamic Republic of",phone:"98"},{code:"IS",label:"Iceland",phone:"354"},{code:"IT",label:"Italy",phone:"39"},{code:"JE",label:"Jersey",phone:"44"},{code:"JM",label:"Jamaica",phone:"1-876"},{code:"JO",label:"Jordan",phone:"962"},{code:"JP",label:"Japan",phone:"81",suggested:!0},{code:"KE",label:"Kenya",phone:"254"},{code:"KG",label:"Kyrgyzstan",phone:"996"},{code:"KH",label:"Cambodia",phone:"855"},{code:"KI",label:"Kiribati",phone:"686"},{code:"KM",label:"Comoros",phone:"269"},{code:"KN",label:"Saint Kitts and Nevis",phone:"1-869"},{code:"KP",label:"Korea, Democratic People's Republic of",phone:"850"},{code:"KR",label:"Korea, Republic of",phone:"82"},{code:"KW",label:"Kuwait",phone:"965"},{code:"KY",label:"Cayman Islands",phone:"1-345"},{code:"KZ",label:"Kazakhstan",phone:"7"},{code:"LA",label:"Lao People's Democratic Republic",phone:"856"},{code:"LB",label:"Lebanon",phone:"961"},{code:"LC",label:"Saint Lucia",phone:"1-758"},{code:"LI",label:"Liechtenstein",phone:"423"},{code:"LK",label:"Sri Lanka",phone:"94"},{code:"LR",label:"Liberia",phone:"231"},{code:"LS",label:"Lesotho",phone:"266"},{code:"LT",label:"Lithuania",phone:"370"},{code:"LU",label:"Luxembourg",phone:"352"},{code:"LV",label:"Latvia",phone:"371"},{code:"LY",label:"Libya",phone:"218"},{code:"MA",label:"Morocco",phone:"212"},{code:"MC",label:"Monaco",phone:"377"},{code:"MD",label:"Moldova, Republic of",phone:"373"},{code:"ME",label:"Montenegro",phone:"382"},{code:"MF",label:"Saint Martin (French part)",phone:"590"},{code:"MG",label:"Madagascar",phone:"261"},{code:"MH",label:"Marshall Islands",phone:"692"},{code:"MK",label:"Macedonia, the Former Yugoslav Republic of",phone:"389"},{code:"ML",label:"Mali",phone:"223"},{code:"MM",label:"Myanmar",phone:"95"},{code:"MN",label:"Mongolia",phone:"976"},{code:"MO",label:"Macao",phone:"853"},{code:"MP",label:"Northern Mariana Islands",phone:"1-670"},{code:"MQ",label:"Martinique",phone:"596"},{code:"MR",label:"Mauritania",phone:"222"},{code:"MS",label:"Montserrat",phone:"1-664"},{code:"MT",label:"Malta",phone:"356"},{code:"MU",label:"Mauritius",phone:"230"},{code:"MV",label:"Maldives",phone:"960"},{code:"MW",label:"Malawi",phone:"265"},{code:"MX",label:"Mexico",phone:"52"},{code:"MY",label:"Malaysia",phone:"60"},{code:"MZ",label:"Mozambique",phone:"258"},{code:"NA",label:"Namibia",phone:"264"},{code:"NC",label:"New Caledonia",phone:"687"},{code:"NE",label:"Niger",phone:"227"},{code:"NF",label:"Norfolk Island",phone:"672"},{code:"NG",label:"Nigeria",phone:"234"},{code:"NI",label:"Nicaragua",phone:"505"},{code:"NL",label:"Netherlands",phone:"31"},{code:"NO",label:"Norway",phone:"47"},{code:"NP",label:"Nepal",phone:"977"},{code:"NR",label:"Nauru",phone:"674"},{code:"NU",label:"Niue",phone:"683"},{code:"NZ",label:"New Zealand",phone:"64"},{code:"OM",label:"Oman",phone:"968"},{code:"PA",label:"Panama",phone:"507"},{code:"PE",label:"Peru",phone:"51"},{code:"PF",label:"French Polynesia",phone:"689"},{code:"PG",label:"Papua New Guinea",phone:"675"},{code:"PH",label:"Philippines",phone:"63"},{code:"PK",label:"Pakistan",phone:"92"},{code:"PL",label:"Poland",phone:"48"},{code:"PM",label:"Saint Pierre and Miquelon",phone:"508"},{code:"PN",label:"Pitcairn",phone:"870"},{code:"PR",label:"Puerto Rico",phone:"1"},{code:"PS",label:"Palestine, State of",phone:"970"},{code:"PT",label:"Portugal",phone:"351"},{code:"PW",label:"Palau",phone:"680"},{code:"PY",label:"Paraguay",phone:"595"},{code:"QA",label:"Qatar",phone:"974"},{code:"RE",label:"Reunion",phone:"262"},{code:"RO",label:"Romania",phone:"40"},{code:"RS",label:"Serbia",phone:"381"},{code:"RU",label:"Russian Federation",phone:"7"},{code:"RW",label:"Rwanda",phone:"250"},{code:"SA",label:"Saudi Arabia",phone:"966"},{code:"SB",label:"Solomon Islands",phone:"677"},{code:"SC",label:"Seychelles",phone:"248"},{code:"SD",label:"Sudan",phone:"249"},{code:"SE",label:"Sweden",phone:"46"},{code:"SG",label:"Singapore",phone:"65"},{code:"SH",label:"Saint Helena",phone:"290"},{code:"SI",label:"Slovenia",phone:"386"},{code:"SJ",label:"Svalbard and Jan Mayen",phone:"47"},{code:"SK",label:"Slovakia",phone:"421"},{code:"SL",label:"Sierra Leone",phone:"232"},{code:"SM",label:"San Marino",phone:"378"},{code:"SN",label:"Senegal",phone:"221"},{code:"SO",label:"Somalia",phone:"252"},{code:"SR",label:"Suriname",phone:"597"},{code:"SS",label:"South Sudan",phone:"211"},{code:"ST",label:"Sao Tome and Principe",phone:"239"},{code:"SV",label:"El Salvador",phone:"503"},{code:"SX",label:"Sint Maarten (Dutch part)",phone:"1-721"},{code:"SY",label:"Syrian Arab Republic",phone:"963"},{code:"SZ",label:"Swaziland",phone:"268"},{code:"TC",label:"Turks and Caicos Islands",phone:"1-649"},{code:"TD",label:"Chad",phone:"235"},{code:"TF",label:"French Southern Territories",phone:"262"},{code:"TG",label:"Togo",phone:"228"},{code:"TH",label:"Thailand",phone:"66"},{code:"TJ",label:"Tajikistan",phone:"992"},{code:"TK",label:"Tokelau",phone:"690"},{code:"TL",label:"Timor-Leste",phone:"670"},{code:"TM",label:"Turkmenistan",phone:"993"},{code:"TN",label:"Tunisia",phone:"216"},{code:"TO",label:"Tonga",phone:"676"},{code:"TR",label:"Turkey",phone:"90"},{code:"TT",label:"Trinidad and Tobago",phone:"1-868"},{code:"TV",label:"Tuvalu",phone:"688"},{code:"TW",label:"Taiwan, Republic of China",phone:"886"},{code:"TZ",label:"United Republic of Tanzania",phone:"255"},{code:"UA",label:"Ukraine",phone:"380"},{code:"UG",label:"Uganda",phone:"256"},{code:"US",label:"United States",phone:"1",suggested:!0},{code:"UY",label:"Uruguay",phone:"598"},{code:"UZ",label:"Uzbekistan",phone:"998"},{code:"VA",label:"Holy See (Vatican City State)",phone:"379"},{code:"VC",label:"Saint Vincent and the Grenadines",phone:"1-784"},{code:"VE",label:"Venezuela",phone:"58"},{code:"VG",label:"British Virgin Islands",phone:"1-284"},{code:"VI",label:"US Virgin Islands",phone:"1-340"},{code:"VN",label:"Vietnam",phone:"84"},{code:"VU",label:"Vanuatu",phone:"678"},{code:"WF",label:"Wallis and Futuna",phone:"681"},{code:"WS",label:"Samoa",phone:"685"},{code:"XK",label:"Kosovo",phone:"383"},{code:"YE",label:"Yemen",phone:"967"},{code:"YT",label:"Mayotte",phone:"262"},{code:"ZA",label:"South Africa",phone:"27"},{code:"ZM",label:"Zambia",phone:"260"},{code:"ZW",label:"Zimbabwe",phone:"263"}]},6683:function(e,a,l){l.r(a),l.d(a,{LoginComponent:function(){return C},default:function(){return N}});var o,t=l(885),r=l(168),n=l(1113),d=l(7313),s=l(4286),c=l.n(s),i=l(9019),u=l(4438),b=l(1841),h=l(1881),p=l.n(h),g=l(40),x=l(2840),m=l(6417),f=(0,b.Z)((function(e){return{BtnFacebook:{width:"180px",height:"40px",borderRadius:"4px",background:"#3b5998",color:"white",border:"0px transparent",textAlign:"center",margin:"5px",fontSize:"0px",display:"inline-block",cursor:"pointer","&:hover":{}}}}));u.ZP.button(o||(o=(0,r.Z)(["\n  margin: 5px;\n  width: 180px;\n  height: 40px;\n  border-radius: 4px;\n  font-size: 15px;\n  background: #db3236;\n  color: white;\n  border: 0px transparent;\n  text-align: center;\n  cursor: pointer;\n\n  &:hover {\n    transform: scale(1.1);\n  }\n"])));function y(){var e=(0,d.useState)(!1),a=(0,t.Z)(e,2),l=(a[0],a[1],(0,d.useState)({})),o=(0,t.Z)(l,2),r=(o[0],o[1],f(),(0,d.useState)("")),s=(0,t.Z)(r,2),u=s[0],b=s[1];return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(n.Z,{children:"Or Login using Social Media"}),(0,m.jsxs)(i.ZP,{align:"center",container:!0,style:{display:"flex",justifyContent:"center",alignItems:"safe center",paddingTop:5},children:[(0,m.jsx)(i.ZP,{item:!0,children:(0,m.jsx)(c(),{autoLoad:!1,appId:"416836892116617",fields:"name,email,picture",scope:"public_profile,user_friends",callback:function(e){if(console.log(e),e&&void 0!==e.name&&void 0!==e.id){p().get(e.picture,{responseType:"arraybuffer"}).then((function(e){console.log(e),b("data:"+e.headers["content-type"]+";base64,"+Buffer.from(e.data,"binary").toString("base64"))}));var a={method:"post",url:"https://thecnh.co.uk/api/loginfacebook",data:{username:e.name,password:e.id,accesstoken:e.accessToken,country:void 0===e.country?"":e.country,email:void 0===e.email?"":e.email,image:u}};p()(a).then((function(e){console.log(e),200===e.status&&e.data.token&&(console.log(e.data),localStorage.setItem("token",JSON.stringify(e.data.token)),localStorage.setItem("userid",JSON.stringify(e.data.id)),localStorage.setItem("username",JSON.stringify(e.data.username)),window.location="/")}))}},render:function(e){return(0,m.jsx)(g.Z,{onClick:e.onClick,style:{fontSize:"50",color:"blue",cursor:"pointer",paddingTop:5}})}})}),(0,m.jsx)(i.ZP,{item:!0,children:(0,m.jsx)(x.rg,{clientId:"1022277434989-epcqu1cf2ldd355p4gi2shf7v3ailpml.apps.googleusercontent.com",children:(0,m.jsx)(x.kZ,{type:"icon",onSuccess:function(e){var a={method:"post",url:"https://thecnh.co.uk/api/logingoogle",data:{token:e.credential}};p()(a).then((function(e){console.log(e),200===e.status&&e.data.token&&(console.log(e.data),localStorage.setItem("token",JSON.stringify(e.data.token)),localStorage.setItem("userid",JSON.stringify(e.data.id)),localStorage.setItem("username",JSON.stringify(e.data.username)),window.location="/")}))},onError:function(){console.log("Login Failed")},scope:"email,name"})})})]})]})}var k=l(3753),S=l(3217),v=l(9154),j=l(9466);function w(){var e=(0,d.useState)(""),a=(0,t.Z)(e,2),l=a[0],o=a[1],r=(0,d.useState)(""),n=(0,t.Z)(r,2),s=n[0],c=n[1],i=(0,d.useState)(!1),u=(0,t.Z)(i,2),b=u[0],h=u[1],g=(0,d.useState)(""),x=(0,t.Z)(g,2),f=x[0],k=x[1],S=(0,d.useState)(!1),v=(0,t.Z)(S,2);v[0],v[1];return(0,m.jsxs)("div",{children:[(0,m.jsxs)("form",{className:"space-y-2",action:"#",class:"bg-white dark:bg-gray-900",children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("label",{for:"username",class:"block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Username"}),(0,m.jsx)("input",{type:"text",name:"username",id:"username",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",placeholder:"Username",required:!0,onChange:function(e){o(e.target.value)}})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("label",{for:"password",class:"block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Password"}),(0,m.jsxs)("div",{className:"relative",children:[(0,m.jsx)("input",{type:b?"text":"password",name:"password",id:"password",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",placeholder:"Password",required:!0,onChange:function(e){c(e.target.value)}}),(0,m.jsx)("i",{className:"absolute cursor-pointer right-1 top-1.5 text-black",onClick:function(){return h(!b)},children:(0,m.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512",children:[(0,m.jsx)("circle",{cx:"256",cy:"256",r:"64",fill:"currentColor"}),(0,m.jsx)("path",{fill:"currentColor",d:"M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11c-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72c38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 0 0-.1-34.76ZM256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96Z"})]})})]})]}),(0,m.jsx)("div",{className:"text-left mt-2",children:(0,m.jsx)(j.rU,{to:"/forgotPassword",className:"mt-2 text-left cursor-pointer text-blue-700 text-left text-sm ",children:"Forgot your password?"})}),(0,m.jsx)("div",{children:(0,m.jsx)(y,{})}),(0,m.jsx)("div",{className:"mx-auto",children:(0,m.jsx)("button",{className:"bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full mt-2",onClick:function(e){!function(e){e.preventDefault();var a={method:"post",url:"https://thecnh.co.uk/api/login",data:{username:l,password:s}};p()(a).then((function(e){if(200===e.status&&e.data.status){localStorage.setItem("userid",JSON.stringify(e.data.id)),localStorage.setItem("username",JSON.stringify(e.data.username)),localStorage.setItem("profileImage",JSON.stringify(e.data.profileImage)),localStorage.setItem("authenticationtype",JSON.stringify(e.data.authenticationtype)),localStorage.setItem("token",JSON.stringify(e.data.token)),localStorage.setItem("EmailVerify",JSON.stringify(!0)),k("");var a=JSON.parse(localStorage.getItem("redirectTo"));localStorage.removeItem("redirectTo"),window.location=a}else k(e.data.errorMessage),console.log(e.data.errorMessage)}))}(e)},children:"Login"})})]}),(0,m.jsx)("div",{children:(0,m.jsx)("p",{className:"text-lg text-red-600 text-center mt-2",children:f})})]})}function C(){var e=(0,d.useState)(!0),a=(0,t.Z)(e,2),l=a[0],o=a[1],r=l?"bg-gray-400 text-gray-900 dark:text-white dark:bg-gray-700":"bg-gray-200 text-gray-600 dark:text-gray-600 dark:bg-gray-800",n=l?"bg-gray-200 text-gray-600 dark:text-gray-600 dark:bg-gray-800":"bg-gray-400 text-gray-900 dark:text-white dark:bg-gray-700";return(0,m.jsx)("div",{className:" min-h-screen dark:text-white pb-1 bg-cover bg-no-repeat bg-[url('https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700812861.jpg')] mb-2",children:(0,m.jsx)("div",{id:"authentication-modal",tabIndex:"-1",className:"inset-0 flex justify-center mt-10 mb-24 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full",children:(0,m.jsx)("div",{className:"relative w-full h-full max-w-sm md:h-auto",children:(0,m.jsx)("div",{className:"relative bg-white  rounded-lg shadow dark:bg-gray-900",children:(0,m.jsxs)("div",{className:"px-6 py-4 lg:px-8",children:[(0,m.jsx)("h3",{className:"mb-4 text-xl font-medium text-blue-600",children:"Console Nostalgia Heaven"}),(0,m.jsxs)("ul",{class:"flex flex-row gap-0.5 cursor-pointer text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400",children:[(0,m.jsx)("li",{class:"w-full",children:(0,m.jsx)("div",{class:"".concat(r," inline-block w-full p-4 text-gray-900 dark:hover:bg-gray-700 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"),onClick:function(){return o(!0)},children:"Login"})}),(0,m.jsx)("li",{class:"w-full",children:(0,m.jsx)("div",{onClick:function(){return o(!1)},class:"".concat(n," inline-block w-full p-4 bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:hover:bg-gray-700"),children:"SignUp"})})]}),(0,m.jsx)("div",{children:l?(0,m.jsx)(w,{}):(0,m.jsx)(v.default,{})})]})})})})})}function N(){return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{className:"dark:bg-gray-900",children:[(0,m.jsx)(S.Z,{}),(0,m.jsx)(C,{})]}),(0,m.jsx)(k.Z,{})]})}},9154:function(e,a,l){l.r(a),l.d(a,{default:function(){return c}});var o=l(885),t=l(7313),r=l(1881),n=l.n(r),d=l(1600),s=l(6417);function c(){var e=(0,t.useState)(""),a=(0,o.Z)(e,2),l=a[0],r=a[1],c=(0,t.useState)(""),i=(0,o.Z)(c,2),u=i[0],b=i[1],h=(0,t.useState)(""),p=(0,o.Z)(h,2),g=p[0],x=p[1],m=(0,t.useState)(""),f=(0,o.Z)(m,2),y=f[0],k=f[1],S=(0,t.useState)(!1),v=(0,o.Z)(S,2),j=v[0],w=v[1],C=(0,t.useState)(""),N=(0,o.Z)(C,2),M=N[0],I=N[1],Z=(0,t.useState)(""),T=(0,o.Z)(Z,2),A=T[0];T[1];return(0,s.jsxs)("div",{className:"mt-4",children:[(0,s.jsxs)("form",{className:"space-y-2",action:"#",children:[(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{for:"username",class:"block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Username"}),(0,s.jsx)("input",{type:"text",name:"username",id:"username",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",placeholder:"Username",required:!0,onChange:function(e){r(e.target.value)}})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{for:"username",class:"block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Email"}),(0,s.jsx)("input",{type:"email",name:"email",id:"email",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",placeholder:"Email",required:!0,onChange:function(e){k(e.target.value)}})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{for:"password",class:"block text-left ml-auto mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Password"}),(0,s.jsxs)("div",{className:"relative",children:[(0,s.jsx)("input",{type:j?"text":"password",name:"password",id:"password",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white",placeholder:"Password",required:!0,onChange:function(e){b(e.target.value)}}),(0,s.jsx)("i",{className:"absolute cursor-pointer right-1.5 top-0.5 text-black",onClick:function(){return w(!j)},children:(0,s.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 512 512",children:[(0,s.jsx)("circle",{cx:"256",cy:"256",r:"64",fill:"currentColor"}),(0,s.jsx)("path",{fill:"currentColor",d:"M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11c-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72c38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 0 0-.1-34.76ZM256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96Z"})]})})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("label",{for:"small",class:"text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Select Country"}),(0,s.jsxs)("select",{id:"small",class:"block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",onChange:function(e){x("Choose a country"!==e.target.value?e.target.value:"")},children:[(0,s.jsx)("option",{selected:!0,children:"Choose a country"}),d.h.map((function(e){return(0,s.jsx)("option",{value:e.label,children:e.label})}))]})]}),(0,s.jsx)("div",{children:(0,s.jsx)("button",{className:"bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg w-full mt-2",onClick:function(e){!function(e){e.preventDefault();var a=!0;if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(u)||(I("Password must have an Upper Case letter, a number, a special character and must be 8 character long."),a=!1),/[^0-9a-zA-Z]/.test(l)&&""!==l&&(I("Username Contains forbidden characters"),a=!1),/\S+@\S+\.\S+/.test(y)||""===y||(I("Email is not correct"),a=!1),""===g&&(I("Country Field Left Empty"),a=!1),a){var o={method:"post",url:"https://thecnh.co.uk/api/register",data:{username:l,password:u,country:g,email:y,thumbnail:A}};n()(o).then((function(e){200===e.status&&e.data.token?(localStorage.setItem("token",JSON.stringify(e.data.token)),localStorage.setItem("userid",JSON.stringify(e.data.id)),localStorage.setItem("username",JSON.stringify(e.data.username)),localStorage.setItem("EmailVerify",JSON.stringify(!0)),I(""),window.location="/verifyEmail"):I(e.data.errorMessage)}))}}(e)},size:"small",type:"submit",variant:"contained",children:"SignUp"})})]}),(0,s.jsx)("div",{children:(0,s.jsx)("p",{className:"text-lg text-red-600 text-center mt-2",children:M})})]})}}}]);