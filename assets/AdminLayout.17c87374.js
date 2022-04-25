import{r as i,o as r,q as c,t as e,E as t,G as s,J as u}from"./vendor.eae21ba8.js";import{a as h}from"./api.b01730aa.js";import{_ as a}from"./index.8c38c7d6.js";const _={},f={class:"flex flex-col items-center w-40 min-h-screen text-yellow-500 bg-black shadow-sm"},p=e("a",{class:"flex items-center w-full px-3 py-6",href:"#"},[e("span",{class:"ml-2 text-md font-bold"},"Boaboly Shop")],-1),x={class:"w-full px-2"},g={class:"flex flex-col items-center w-full border-t border-white"},b=e("i",{class:"bi bi-bar-chart-fill text-xl group-hover:text-gray-900"},null,-1),v=e("span",{class:"ml-3 align-middle inline-block text-sm font-medium group-hover:text-gray-900"},"\u7E3D\u89BD",-1),y=e("i",{class:"bi bi-brush-fill text-xl group-hover:text-gray-900"},null,-1),w=e("span",{class:"ml-3 align-middle inline-block text-sm font-medium group-hover:text-gray-900"},"\u6587\u7AE0",-1),k=e("i",{class:"bi bi-folder-fill text-xl group-hover:text-gray-900"},null,-1),A=e("span",{class:"ml-3 align-middle inline-block text-sm font-medium group-hover:text-gray-900"},"\u5546\u54C1",-1),$=e("i",{class:"bi bi-bag-check-fill text-xl group-hover:text-gray-900"},null,-1),L=e("span",{class:"ml-3 align-middle inline-block text-sm font-medium group-hover:text-gray-900"},"\u8A02\u55AE",-1),N=e("a",{class:"flex items-center justify-center w-full h-16 mt-auto text-gray-900 bg-primaryLight hover:bg-opacity-75",href:"#"},[e("i",{class:"bi bi-person-badge-fill text-2xl"}),e("span",{class:"ml-2 text-sm font-medium"},"Account")],-1);function R(l,n){const o=i("RouterLink");return r(),c("div",f,[p,e("div",x,[e("div",g,[t(o,{class:"group flex items-center w-full h-12 px-3 mt-3 rounded hover:bg-opacity-75 hover:bg-yellow-500",to:{name:"AdminHome"}},{default:s(()=>[b,v]),_:1}),t(o,{class:"group flex items-center w-full h-12 px-3 mt-3 rounded hover:bg-opacity-75 hover:bg-yellow-500",to:{name:"AdminArts"}},{default:s(()=>[y,w]),_:1}),t(o,{class:"group flex items-center w-full h-12 px-3 mt-3 rounded hover:bg-opacity-75 hover:bg-yellow-500",to:{name:"AdminProducts"}},{default:s(()=>[k,A]),_:1}),t(o,{class:"group flex items-center w-full h-12 px-3 mt-3 rounded hover:bg-opacity-75 hover:bg-yellow-500",to:{name:"AdminOrders"}},{default:s(()=>[$,L]),_:1})])]),N])}var B=a(_,[["render",R]]);const M={components:{AdminMainNav:B},setup(){const l=u();h.checkLogin().then(n=>{n!==!0&&l.push("/admin-login")})}},V={class:"flex h-screen relative"},C={class:"sticky top-0 left-0 h-screen"},E={class:"flex-1 max-h-screen overflow-y-scroll"};function j(l,n,o,q,G,H){const d=i("AdminMainNav"),m=i("RouterView");return r(),c("div",V,[e("div",C,[t(d)]),e("div",E,[t(m)])])}var S=a(M,[["render",j]]);export{S as default};
