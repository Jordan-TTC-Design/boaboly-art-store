import{L as p,n as k,r as m,o as c,t as n,v as t,H as h,I as f,F as v,E as S,c as z,A as r,k as A,w as B,T as I,D as y,x as O,y as R,B as N,N as H,O as U,K as P}from"./vendor.dd24d7c7.js";import{f as j}from"./api.35fab65f.js";import{S as M,a as V,A as W}from"./swiper.min.5f637f1a.js";import{_ as D}from"./index.f473b57b.js";import{p as E}from"./productStore.61c9e0f9.js";import{s as F}from"./statusStore.13921c37.js";import{c as K}from"./cartStore.b403ba74.js";const q={components:{Swiper:M,SwiperSlide:V},props:["swiper-num","product-list"],setup(a){const o=p([W]);return{productList:k(()=>a.productList),modules:o}}},G={class:"relative"},J={class:"swiperBox"},Q=["src","alt"],X={class:"flex justify-between py-3 border-b border-gray-300 gap-x-3 underLineHover"},Y={class:"text-gray-600 group-hover:text-black"},Z={class:"flex justify-between py-3 gap-x-3"},$={class:"text-gray-600 group-hover:text-black"},tt={class:"flex-shrink-0 text-gray-600 group-hover:text-black"};function st(a,o,g,s,u,x){const _=m("RouterLink"),d=m("Swiper-slide"),e=m("Swiper");return c(),n("div",G,[t("div",J,[h(e,{"slides-per-view":a.swiperNum,modules:s.modules,speed:3e3,loop:!0,autoplay:{delay:1,disableOnInteraction:!1}},{default:f(()=>[(c(!0),n(v,null,S(s.productList,l=>(c(),z(d,{key:l.id,class:"px-8 sliderItem group"},{default:f(()=>[h(_,{to:l.id,class:"relative cursor-pointer"},{default:f(()=>[t("img",{class:"w-100",src:l.imageUrl,alt:`${l.title}\u5546\u54C1\u5716\u7247`},null,8,Q),t("div",X,[t("p",Y,r(l.category),1)]),t("div",Z,[t("p",$,r(l.title),1),t("p",tt," NT$ "+r(l.price),1)])]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1},8,["slides-per-view","modules"])])])}var et=D(q,[["render",st],["__scopeId","data-v-e6e344c0"]]);const ot={components:{ProductSlider:et},setup(){const a=E(),o=F(),g=K(),s=A(),u=k(()=>s.params.id),x=p(1),_=p([]),d=p({}),e=p(null),l=p(window.innerWidth);let L=k(()=>l.value>=1280?3:l.value<1280&&l.value>767?2:1);function C(w){o.isLoading=!0,j.getProduct(w).then(b=>{d.value=b,e.value=b.imageUrl,_.value=[b.imageUrl,...b.imagesUrl],o.isLoading=!1,a.getProducts()})}function T(){g.addCart(d.value.id,x.value),x.value=1}return B(u,w=>{w!==void 0&&C(u.value)}),I(()=>{window.onresize=()=>{l.value=window.innerWidth}}),C(u.value),{product:d,productImgArray:_,buyNum:x,mainImg:e,swiperNum1:L,addCart:T,productsData:a}}},i=a=>(H("data-v-4d61d349"),a=a(),U(),a),lt={class:"bg-gray-100 relative md:py-16 pt-4 pb-16 min-h-screen"},rt=i(()=>t("div",{class:"bg-primaryLight w-full h-96 absolute top-0"},null,-1)),it={class:"sm:container sm:mx-auto mx-4 bg-white shadow-sm lg:p-24 md:p-12 p-8 pb-24"},at={class:"grid lg:grid-cols-12 grid-cols-1 gap-8 relative pb-12 border-b border-gray-300"},ct={class:"lg:col-span-5 gap-4"},nt={class:"bg-gray-100 p-2 flex flex-col gap-2"},dt=["src"],_t={key:0,class:"w-full bg-gray-100 overflow-x-auto flex gap-x-2"},pt=["src","alt","onClick"],ut={class:"lg:col-span-7 flex flex-col justify-between"},xt={class:"mb-12"},mt={class:"productTag bg-primaryLight mb-4"},ht={class:"sm:text-3xl text-xl font-bold mb-3"},gt={class:"text-2xl mb-1"},bt={class:"text-sm text-gray-400 mb-1"},ft=P(" \u539F\u50F9 NT$ "),vt={class:"line-through"},wt={class:"flex items-center mb-4 gap-3"},yt=i(()=>t("p",{class:"text-sm text-gray-400 whitespace-nowrap"},"\u5269\u9918\u5EAB\u5B58",-1)),kt={class:"flex md:items-center mb-6 gap-3 md:flex-row flex-col"},St=i(()=>t("p",{class:"text-sm text-gray-400 whitespace-nowrap"},"\u8CFC\u8CB7\u6578\u91CF",-1)),Lt={class:"numberSwitcher"},Ct=i(()=>t("i",{class:"bi bi-dash text-xl"},null,-1)),Nt=[Ct],Pt=["value"],Dt=i(()=>t("i",{class:"bi bi-plus text-xl"},null,-1)),Tt=[Dt],zt={class:"flex gap-x-2"},At=i(()=>t("p",null,"\u52A0\u5165\u8CFC\u7269\u8ECA",-1)),Bt=[At],It=i(()=>t("div",{class:"border-t border-gray-300 pt-6 mt-6"},[t("p",{class:"text-sm"}," \u4ED8\u6B3E\u5F8C\uFF0C\u5F9E\u5099\u8CA8\u5230\u5BC4\u51FA\u5546\u54C1\u70BA 3 \u500B\u5DE5\u4F5C\u5929\u3002\uFF08\u4E0D\u5305\u542B\u5047\u65E5\uFF09 ")],-1)),Ot={class:"grid lg:grid-cols-12 grid-cols-1 gap-8 relative mb-24 py-24 border-b border-gray-300"},Rt={class:"lg:col-span-8"},Ht=i(()=>t("h3",{class:"text-2xl text-black font-bold mb-8"},"\u5546\u54C1\u4ECB\u7D39",-1)),Ut=["innerHTML"],jt={class:"lg:col-span-4"},Mt=i(()=>t("h3",{class:"text-2xl text-black font-bold mb-8"},"\u5546\u54C1\u5176\u4ED6\u8CC7\u8A0A",-1)),Vt={class:"grid gap-y-4"},Wt={class:"flex md:flex-row flex-col gap-x-3 gap-y-1"},Et=i(()=>t("p",{class:"mt-0.5 text-sm text-gray-400 whitespace-nowrap"},"\u6750\u8CEA",-1)),Ft={class:"flex md:flex-row flex-col gap-x-3 gap-y-1"},Kt=i(()=>t("p",{class:"mt-0.5 text-sm text-gray-400 whitespace-nowrap"},"\u63CF\u8FF0",-1)),qt={class:"flex md:flex-row flex-col gap-x-3 gap-y-1"},Gt=i(()=>t("p",{class:"mt-0.5 text-sm text-gray-400 whitespace-nowrap"},"\u5C3A\u5BF8",-1)),Jt={key:0,class:"flex gap-4"},Qt={class:"flex md:flex-row flex-col gap-x-3 gap-y-1"},Xt=i(()=>t("p",{class:"mt-0.5 text-sm text-gray-400 whitespace-nowrap"},"\u6A19\u7C64",-1)),Yt={class:"flex flex-wrap"},Zt={class:"mb-24"},$t=i(()=>t("h3",{class:"text-center font-bold text-3xl text-black mb-12"}," \u5176\u4ED6\u63A8\u85A6\u5546\u54C1 ",-1)),ts={class:"flex md:flex-row flex-col justify-end items-center gap-x-8 px-12"},ss=P("BACK TO PRODUCTS");function es(a,o,g,s,u,x){const _=m("ProductSlider"),d=m("RouterLink");return c(),n("div",lt,[rt,t("div",it,[t("div",at,[t("div",ct,[t("div",nt,[t("img",{class:"w-full",src:s.mainImg,alt:"\u7522\u54C1\u4E3B\u5716"},null,8,dt),s.productImgArray.length>=2?(c(),n("div",_t,[(c(!0),n(v,null,S(s.productImgArray,(e,l)=>(c(),n(v,{key:e},[e!==""?(c(),n("img",{key:0,class:N(["w-20 cursor-pointer hover:brightness-50",{"brightness-50":s.mainImg===e}]),src:e,alt:`\u7522\u54C1\u9644\u5716${l}`,onClick:L=>s.mainImg=e},null,10,pt)):y("",!0)],64))),128))])):y("",!0)])]),t("div",ut,[t("div",xt,[t("p",mt,r(s.product.category),1),t("h2",ht,r(s.product.title),1),t("h4",gt,"NT$ "+r(s.product.price),1),O(t("p",bt,[ft,t("span",vt,r(s.product.origin_price),1)],512),[[R,s.product.origin_price==s.product.price]])]),t("div",null,[t("div",wt,[yt,t("p",null,r(`${s.product.store} ${s.product.unit}`),1)]),t("div",kt,[St,t("div",Lt,[t("button",{type:"button",class:"numberSwitcher__btn",onClick:o[0]||(o[0]=e=>s.buyNum-=1)},Nt),t("input",{class:"numberSwitcher__numBox focus:outline-none flex-grow",type:"number",value:s.buyNum},null,8,Pt),t("button",{type:"button",class:"numberSwitcher__btn",onClick:o[1]||(o[1]=e=>s.buyNum+=1)},Tt)])]),t("div",zt,[t("button",{type:"button",class:"rounded py-2 px-3 bg-white border border-gray-300","data-id":"product.id",onClick:o[2]||(o[2]=e=>s.productsData.addCollection(s.product))},[t("i",{class:N([{"bi-heart":s.productsData.collections.indexOf(s.product.id)<0,"bi-heart-fill":s.productsData.collections.indexOf(s.product.id)>=0},"bi text-xl text-black"])},null,2)]),t("button",{type:"button",class:"bg-black rounded py-2 px-3 hover:bg-gray-800 text-white flex-1",onClick:o[3]||(o[3]=(...e)=>s.addCart&&s.addCart(...e))},Bt)]),It])])]),t("div",Ot,[t("div",Rt,[Ht,t("div",{innerHTML:s.product.content},null,8,Ut)]),t("div",jt,[Mt,t("ul",Vt,[t("li",Wt,[Et,t("p",null,r(s.product.material),1)]),t("li",Ft,[Kt,t("p",null,r(s.product.description),1)]),t("li",qt,[Gt,s.product.size?(c(),n("div",Jt,[t("p",null,"\u9577\uFF1A"+r(s.product.size.sizeLength),1),t("p",null,"\u5BEC\uFF1A"+r(s.product.size.sizeWidth),1),t("p",null,"\u9AD8\uFF1A"+r(s.product.size.sizeHeight),1)])):y("",!0)]),t("li",Qt,[Xt,t("div",Yt,[(c(!0),n(v,null,S(s.product.tags,e=>(c(),n("p",{key:e},"# "+r(e),1))),128))])])])])]),t("div",Zt,[$t,h(_,{"swiper-num":s.swiperNum1,"product-list":s.productsData.products},null,8,["swiper-num","product-list"])]),t("div",ts,[h(d,{to:"/products",class:"lg:text-3xl tex-xl font-bold"},{default:f(()=>[ss]),_:1}),h(d,{to:"/products",class:"arrow"})])])])}var ds=D(ot,[["render",es],["__scopeId","data-v-4d61d349"]]);export{ds as default};