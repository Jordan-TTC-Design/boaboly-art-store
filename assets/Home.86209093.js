import{P as ee}from"./ProductListItemSquare.772c4d4a.js";import{s as te}from"./statusStore.f4307df1.js";import{_ as se}from"./boabolyLogo.0abddc67.js";import{_ as L}from"./index.8c38c7d6.js";import{K as B,S as W,o as g,q as x,t,H as V,M as j,N as z,r as p,E as n,G as m,F as A,D as q,c as G,y as oe,k as O,A as ae,I as re}from"./vendor.eae21ba8.js";import{n as C,S as F,a as K,A as Y}from"./swiper.min.bbd4122c.js";import{a as ie}from"./artStore.2ad9be7e.js";import{p as ne}from"./productStore.0673bb54.js";import"./cartStore.6125f6e6.js";import"./api.b01730aa.js";var N="/boaboly-art-store/assets/flower-white-pink.9d45035d.svg",D="/boaboly-art-store/assets/flower-white-red.8cb2e9b4.svg",H="/boaboly-art-store/assets/flower-blue.e4f44928.svg",R="/boaboly-art-store/assets/flower-yellow.3d539a17.svg";const ce={setup(){const a=te(),e=B(null),_=B(0);function r(){a.mainContainer.scrollTo({top:_.value+100,behavior:"smooth"})}return W(()=>{setTimeout(()=>{_.value=e.value.clientHeight},100)}),{homeMainBanner:e,goToSection:r}}},X=a=>(j("data-v-d48952cc"),a=a(),z(),a),le={ref:"homeMainBanner",class:"homeMainBanner grid md:grid-cols-3 grid-cols-1 py-36 md:px-0 px-12 relative"},de=V('<img class="homeMainBanner__flower flower-white-pink" src="'+N+'" alt="\u82B1\u74E3" data-v-d48952cc><img class="homeMainBanner__flower flower-white-pink-2" src="'+N+'" alt="\u82B1\u74E3" data-v-d48952cc><img class="homeMainBanner__flower flower-white-red" src="'+D+'" alt="\u82B1\u74E3" data-v-d48952cc><img class="homeMainBanner__flower flower-white-red-2" src="'+D+'" alt="\u82B1\u74E3" data-v-d48952cc><img class="homeMainBanner__flower flower-white-red-3" src="'+D+'" alt="\u82B1\u74E3" data-v-d48952cc><img class="homeMainBanner__flower flower-blue" src="'+H+'" alt="\u82B1\u74E3" data-v-d48952cc><img class="homeMainBanner__flower flower-blue-2" src="'+H+'" alt="\u82B1\u74E3" data-v-d48952cc><img class="homeMainBanner__flower flower-yellow" src="'+R+'" alt="\u82B1\u74E3" data-v-d48952cc><img class="homeMainBanner__flower flower-yellow-2" src="'+R+'" alt="\u82B1\u74E3" data-v-d48952cc><img class="homeMainBanner__flower flower-yellow-3" src="'+R+'" alt="\u82B1\u74E3" data-v-d48952cc><div class="md:col-start-2 col-span-1" data-v-d48952cc><div class="bg-primaryLight" data-v-d48952cc><img class="w-full h-full" src="'+se+'" alt="face" data-v-d48952cc><div class="homeBannerCircle" data-v-d48952cc></div></div></div>',11),me=X(()=>t("div",{class:"arrow arrow-1"},null,-1)),_e=X(()=>t("div",{class:"arrow arrow-2"},null,-1)),ue=[me,_e];function pe(a,e,_,r,M,S){return g(),x("div",le,[de,t("div",{onClick:e[0]||(e[0]=(...i)=>r.goToSection&&r.goToSection(...i)),class:"goToArrowBox"},ue)],512)}var fe=L(ce,[["render",pe],["__scopeId","data-v-d48952cc"]]);function U(a){let{swiper:e,extendParams:_,emit:r,once:M}=a;_({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}});function S(){const c=e.getTranslate();e.setTranslate(c),e.setTransition(0),e.touchEventsData.velocities.length=0,e.freeMode.onTouchEnd({currentPos:e.rtl?e.translate:-e.translate})}function i(){const{touchEventsData:c,touches:l}=e;c.velocities.length===0&&c.velocities.push({position:l[e.isHorizontal()?"startX":"startY"],time:c.touchStartTime}),c.velocities.push({position:l[e.isHorizontal()?"currentX":"currentY"],time:C()})}function b(c){let{currentPos:l}=c;const{params:s,$wrapperEl:w,rtlTranslate:T,snapGrid:f,touchEventsData:h}=e,J=C()-h.touchStartTime;if(l<-e.minTranslate()){e.slideTo(e.activeIndex);return}if(l>-e.maxTranslate()){e.slides.length<f.length?e.slideTo(f.length-1):e.slideTo(e.slides.length-1);return}if(s.freeMode.momentum){if(h.velocities.length>1){const d=h.velocities.pop(),u=h.velocities.pop(),Z=d.position-u.position,I=d.time-u.time;e.velocity=Z/I,e.velocity/=2,Math.abs(e.velocity)<s.freeMode.minimumVelocity&&(e.velocity=0),(I>150||C()-d.time>300)&&(e.velocity=0)}else e.velocity=0;e.velocity*=s.freeMode.momentumVelocityRatio,h.velocities.length=0;let v=1e3*s.freeMode.momentumRatio;const Q=e.velocity*v;let o=e.translate+Q;T&&(o=-o);let E=!1,$;const k=Math.abs(e.velocity)*20*s.freeMode.momentumBounceRatio;let P;if(o<e.maxTranslate())s.freeMode.momentumBounce?(o+e.maxTranslate()<-k&&(o=e.maxTranslate()-k),$=e.maxTranslate(),E=!0,h.allowMomentumBounce=!0):o=e.maxTranslate(),s.loop&&s.centeredSlides&&(P=!0);else if(o>e.minTranslate())s.freeMode.momentumBounce?(o-e.minTranslate()>k&&(o=e.minTranslate()+k),$=e.minTranslate(),E=!0,h.allowMomentumBounce=!0):o=e.minTranslate(),s.loop&&s.centeredSlides&&(P=!0);else if(s.freeMode.sticky){let d;for(let u=0;u<f.length;u+=1)if(f[u]>-o){d=u;break}Math.abs(f[d]-o)<Math.abs(f[d-1]-o)||e.swipeDirection==="next"?o=f[d]:o=f[d-1],o=-o}if(P&&M("transitionEnd",()=>{e.loopFix()}),e.velocity!==0){if(T?v=Math.abs((-o-e.translate)/e.velocity):v=Math.abs((o-e.translate)/e.velocity),s.freeMode.sticky){const d=Math.abs((T?-o:o)-e.translate),u=e.slidesSizesGrid[e.activeIndex];d<u?v=s.speed:d<2*u?v=s.speed*1.5:v=s.speed*2.5}}else if(s.freeMode.sticky){e.slideToClosest();return}s.freeMode.momentumBounce&&E?(e.updateProgress($),e.setTransition(v),e.setTranslate(o),e.transitionStart(!0,e.swipeDirection),e.animating=!0,w.transitionEnd(()=>{!e||e.destroyed||!h.allowMomentumBounce||(r("momentumBounce"),e.setTransition(s.speed),setTimeout(()=>{e.setTranslate($),w.transitionEnd(()=>{!e||e.destroyed||e.transitionEnd()})},0))})):e.velocity?(r("_freeModeNoMomentumRelease"),e.updateProgress(o),e.setTransition(v),e.setTranslate(o),e.transitionStart(!0,e.swipeDirection),e.animating||(e.animating=!0,w.transitionEnd(()=>{!e||e.destroyed||e.transitionEnd()}))):e.updateProgress(o),e.updateActiveIndex(),e.updateSlidesClasses()}else if(s.freeMode.sticky){e.slideToClosest();return}else s.freeMode&&r("_freeModeNoMomentumRelease");(!s.freeMode.momentum||J>=s.longSwipesMs)&&(e.updateProgress(),e.updateActiveIndex(),e.updateSlidesClasses())}Object.assign(e,{freeMode:{onTouchStart:S,onTouchMove:i,onTouchEnd:b}})}var he="/boaboly-art-store/assets/img-charactor-men.69361d5e.svg",ve="/boaboly-art-store/assets/img-charactor-dog.31ffe7d1.svg",ge="/boaboly-art-store/assets/img-charactor-cat.e6a4fa44.svg",be="/boaboly-art-store/assets/img-charactor-panda.bf369679.svg",we="/boaboly-art-store/assets/img-charactor-squirrel.e5174100.svg",xe="/boaboly-art-store/assets/img-charactor-ghost.554337bd.svg";const ye={components:{Swiper:F,SwiperSlide:K},props:["swiper-num"],setup(){return{modules:B([Y,U])}}},Me={class:"sectionCharactor bg-gray-100 grid md:grid-cols-3 grid-cols-1 md:py-36 py-24 gap-y-12 relative"},Se=t("h3",{class:"sectionCharactor__bgWord sectionCharactor__bgWord--top"}," BOABOLY ",-1),Te=t("div",{class:"col-start-1 flex md:justify-start justify-center items-start px-8"},[t("div",{class:"bg-black py-4 md:pl-5 md:pr-12 px-8"},[t("h3",{class:"text-3xl text-white font-bold"},"\u5BF6\u8389\u89D2\u8272")])],-1),Be={class:"md:col-start-2 md:col-span-2"},$e={class:"charactorList"},ke=t("div",{class:"charactorList__item"},[t("p",{class:"charactorList__item__number"},"001"),t("img",{class:"charactorList__item__img",src:he,alt:"\u89D2\u8272\u5BF6\u8389"}),t("p",{class:"charactorList__item__name"},"\u5BF6\u8389")],-1),Le=t("div",{class:"charactorList__item"},[t("p",{class:"charactorList__item__number"},"002"),t("img",{class:"charactorList__item__img",src:ve,alt:"\u89D2\u8272\u6C6A\u4E38"}),t("p",{class:"charactorList__item__name"},"\u6C6A\u4E38")],-1),Ee=t("div",{class:"charactorList__item"},[t("p",{class:"charactorList__item__number"},"003"),t("img",{class:"charactorList__item__img",src:ge,alt:"\u89D2\u8272\u54AA\u62C9"}),t("p",{class:"charactorList__item__name"},"\u54AA\u62C9")],-1),Pe=t("div",{class:"charactorList__item"},[t("p",{class:"charactorList__item__number"},"004"),t("img",{class:"charactorList__item__img",src:be,alt:"\u89D2\u8272\u6F58\u5F1F"}),t("p",{class:"charactorList__item__name"},"\u6F58\u5F1F")],-1),Ce=t("div",{class:"charactorList__item"},[t("p",{class:"charactorList__item__number"},"005"),t("img",{class:"charactorList__item__img",src:we,alt:"\u89D2\u8272\u9F20\u5409"}),t("p",{class:"charactorList__item__name"},"\u9F20\u5409")],-1),De=t("div",{class:"charactorList__item"},[t("p",{class:"charactorList__item__number"},"006"),t("img",{class:"charactorList__item__img",src:xe,alt:"\u89D2\u8272\u6674\u5B50"}),t("p",{class:"charactorList__item__name"},"\u6674\u5B50")],-1),Re=t("h3",{class:"sectionCharactor__bgWord sectionCharactor__bgWord--bottom"}," CHARACTORS ",-1);function Ae(a,e,_,r,M,S){const i=p("Swiper-slide"),b=p("Swiper");return g(),x("div",Me,[Se,Te,t("div",Be,[t("div",$e,[n(b,{"slides-per-view":a.swiperNum,"space-between":50,loop:!0,"free-mode":!0,modules:r.modules,speed:6e3,autoplay:{delay:1,disableOnInteraction:!1}},{default:m(()=>[n(i,null,{default:m(()=>[ke]),_:1}),n(i,null,{default:m(()=>[Le]),_:1}),n(i,null,{default:m(()=>[Ee]),_:1}),n(i,null,{default:m(()=>[Pe]),_:1}),n(i,null,{default:m(()=>[Ce]),_:1}),n(i,null,{default:m(()=>[De]),_:1})]),_:1},8,["slides-per-view","modules"])])]),Re])}var Ie=L(ye,[["render",Ae]]);const Oe={components:{Swiper:F,SwiperSlide:K},props:["swiper-num"],setup(){const a=ie(),e=B([Y,U]);return a.getArts(),{artData:a,modules:e}}},Ne={class:"swiperBox"},He=["src"],We={class:"absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 px-3"},Ve={class:"text-white font-medium text-lg text-center md:inline-block hidden"},je=t("div",{class:"seeMore"},[t("p",{class:"text-white font-medium text-lg text-center mt-2"}," VIEW MORE ")],-1);function ze(a,e,_,r,M,S){const i=p("RouterLink"),b=p("Swiper-slide"),c=p("Swiper");return g(),x("div",Ne,[n(c,{"slides-per-view":a.swiperNum,modules:r.modules,speed:4e3,"free-mode":!0,loop:!0,autoplay:{delay:1,reverseDirection:!0,disableOnInteraction:!1}},{default:m(()=>[(g(!0),x(A,null,q(r.artData.arts,l=>(g(),G(b,{key:l.id,class:"px-8 group"},{default:m(()=>[n(i,{to:`/arts/${l.id}`,class:"flex justify-center relative"},{default:m(()=>[t("img",{class:"w-100",src:l.imagesUrl[0],alt:"face"},null,8,He),t("div",We,[t("p",Ve,oe(l.title),1),je])]),_:2},1032,["to"])]),_:2},1024))),128))]),_:1},8,["slides-per-view","modules"])])}var qe=L(Oe,[["render",ze]]),Ge="/boaboly-art-store/assets/img-boaboly-pen.d0354dbe.svg";const Fe={components:{ProductListItemSquare:ee,HomeMainBanner:fe,CharactorsSlider:Ie,ArtSlider:qe},setup(){const a=ne(),e=B(window.innerWidth);let _=O(()=>e.value>=1280?4:e.value<1280&&e.value>767?3:2),r=O(()=>e.value>=1280?3:2);return W(()=>{window.onresize=()=>{e.value=window.innerWidth}}),a.getHotProducts(),{productsData:a,swiperNum1:_,swiperNum2:r}}},y=a=>(j("data-v-4a0198b2"),a=a(),z(),a),Ke={class:"md:mb-36 mb-24 mt-24 relative"},Ye=y(()=>t("h4",{class:"text-center font-bold text-lg text-black mb-4"},"NEW WORKS",-1)),Xe=y(()=>t("h3",{class:"text-center font-bold text-4xl text-black mb-16"}," \u6700\u65B0\u5716\u6587\u5275\u4F5C ",-1)),Ue={class:"grid grid-cols-5 lg:px-12 px-4 md:py-36 py-24 gap-4 relative bg-white border-b border-gray-300"},Je={class:"col-span-1 relative md:pt-24 xl:px-16 lg:px-8 md:px-4 md:block hidden"},Qe={class:"homeBoabolyPen sticky top-32 flex flex-col justify-center"},Ze=y(()=>t("p",{class:"homeBoabolyPen__txt text-center lg:text-xl text-sm font-medium text-black mb-12"}," \u5E0C\u671B\u4F60\u6703\u559C\u6B61 ",-1)),et=y(()=>t("img",{class:"mb-2",src:Ge,alt:"Boaboly\u5716\u7247"},null,-1)),tt=re("VIEW MORE"),st={class:"md:col-start-2 md:col-span-4 col-span-5"},ot=y(()=>t("h4",{class:"text-center font-bold text-lg text-black mb-4"}," popular Products ",-1)),at=y(()=>t("h3",{class:"text-center font-bold text-4xl text-black mb-16"},"\u71B1\u9580\u5546\u54C1",-1)),rt={class:"grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"},it=V('<div class="lg:px-48 md:px-24 px-8 py-24 grid grid-col-1 gap-y-12" data-v-4a0198b2><div class="flex md:flex-row flex-col justify-end items-center gap-x-8 goBackListBtn" data-v-4a0198b2><a target="_brank" href="https://shopee.tw/boaboly.art" class="xl:text-3xl text-xl font-bold py-8 md:px-0 px-8" data-v-4a0198b2><i class="bi bi-shop mr-2" data-v-4a0198b2></i>GO TO SHOPEE STORE</a><a target="_brank" href="https://shopee.tw/boaboly.art" class="goToArrow" data-v-4a0198b2></a></div><div class="flex md:flex-row flex-col justify-end items-center gap-x-8 goBackListBtn" data-v-4a0198b2><a target="_brank" href="https://www.pinkoi.com/store/boaboly" class="xl:text-3xl text-xl font-bold py-8 md:px-0 px-8" data-v-4a0198b2><i class="bi bi-shop mr-2" data-v-4a0198b2></i>GO TO PINKOI STORE</a><a target="_brank" href="https://www.pinkoi.com/store/boaboly" class="goToArrow" data-v-4a0198b2></a></div></div>',1);function nt(a,e,_,r,M,S){const i=p("HomeMainBanner"),b=p("ArtSlider"),c=p("CharactorsSlider"),l=p("RouterLink"),s=p("ProductListItemSquare");return g(),x(A,null,[n(i),t("div",Ke,[Ye,Xe,n(b,{"swiper-num":r.swiperNum1},null,8,["swiper-num"])]),n(c,{"swiper-num":r.swiperNum2},null,8,["swiper-num"]),t("div",Ue,[t("div",Je,[t("div",Qe,[Ze,et,n(l,{to:{name:"ProductList"},class:"homeBoabolyPen__btn block lg:text-xl text-sm lg:py-6 lg:px-4 px-2 py-4 text-center bg-black text-white font-bold"},{default:m(()=>[tt]),_:1})])]),t("div",st,[ot,at,t("div",rt,[(g(!0),x(A,null,q(r.productsData.hotProducts,(w,T)=>(g(),G(s,{key:w.id,class:ae({"md:border-none border-b border-gray-300":T<r.productsData.hotProducts.length-1}),product:w,"collection-list":r.productsData.collections},null,8,["class","product","collection-list"]))),128))])])]),it],64)}var bt=L(Fe,[["render",nt],["__scopeId","data-v-4a0198b2"]]);export{bt as default};
