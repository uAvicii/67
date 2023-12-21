import{d as oe,A as ae,r as $,e as O,f as q,g as Q,i as ee,t as re,j as V,h as X,w as Z,F as se,B as le,l as ce,k as te,J as de,C as fe}from"./index-67e5047c.js";import ue from"./index-1afa69ec.js";var A,T,N,R,P,s;(function(o){o.RELEASE="release",o.PRE="pre",o.BETA="beta",o.LOCAL="local"})(s||(s={}));var f,F="J_image_editor_dialog";(function(o){o.imageEditor="image-editor-sdk",o.quality="ai-quality-sdk",o.productShoot="ai-productShoot-sdk",o.poster="ai-poster-sdk",o.model="ai-model-sdk"})(f||(f={}));var k,b={};b[f.imageEditor]=((A={})[s.PRE]="https://prepc.meitu.com/image/edit/",A[s.BETA]="https://betapc.meitu.com/image/edit/",A[s.RELEASE]="https://pc.meitu.com/image/edit/",A[s.LOCAL]="http://localhost:3004/",A),b[f.quality]=((T={})[s.PRE]="https://pre.x-design.com/quality/",T[s.BETA]="https://beta.x-design.com/quality/",T[s.RELEASE]="https://www.x-design.com/quality/",T[s.LOCAL]="http://localhost:3005/",T),b[f.productShoot]=((N={})[s.PRE]="https://pre.x-design.com/product-shoot/",N[s.BETA]="https://beta.x-design.com/product-shoot/",N[s.RELEASE]="https://www.x-design.com/product-shoot/",N[s.LOCAL]="http://localhost:3000/",N),b[f.poster]=((R={})[s.PRE]="https://pre.x-design.com/poster/",R[s.BETA]="https://beta.x-design.com/poster/",R[s.RELEASE]="https://www.x-design.com/poster/",R[s.LOCAL]="http://localhost:3003/poster/",R),b[f.model]=((P={})[s.PRE]="https://pre.x-design.com/model/",P[s.BETA]="https://beta.x-design.com/model/",P[s.RELEASE]="https://www.x-design.com/model/",P[s.LOCAL]="http://localhost:3007/",P),function(o){o.SAVE="save",o.LOADED="loaded",o.LOGOUT="logout",o.LOGIN="login",o.RESULT="result",o.INIT="init"}(k||(k={}));var ie={moduleName:f.imageEditor,accessKey:"",title:"",code:"",env:s.RELEASE,el:"",imageSrc:"",width:1200,height:800},x=function(o){return document.getElementById(o)},ne="mtLoadingComponent",H="_mt_image_editor_ifr",S=!1,y=ie,z="",Y="",J=function(){var o=x(F);o&&(o.style.opacity="1",o.style.visibility="initial")},B=function(o){var l=document.getElementById(H);l&&l.contentWindow.postMessage(o,"*")},U=new(function(){function o(){this.hasSendDebug=!1,this.isOK=!1,this.config=Object.assign({},ie),this.getImageResultFn=function(e,i,a){},this.getOnSavePosterFn=function(e){},this.getOnCreatePosterFn=function(e){},this.onDialogClose=function(){},this.firstInit=!0,this.dialogVisible=!1,this.isInit=!1}var l=o.prototype;return l.init=function(e){var i=this;this.config.width=Math.floor(.95*window.innerWidth),this.config.height=Math.floor(.95*window.innerHeight),this.config=Object.assign({},this.config,e);var a=function(){i.firstInit?(i.validKey(i.config.accessKey||i.config.appKey,function(){i.isOK=!0,i.config.imageSrc&&(i.dialogVisible=!0),i.create(i.dialogVisible)}),i.firstInit=!1):i.openImage(i.config.imageSrc)};document.body?a():window.addEventListener("DOMContentLoaded",function(){a()},!1)},l.create=function(e){var i=this;console.log("【我开始创建了】"),function(a,u){var p;if(u===void 0&&(u=!0),function(n){var r=(y=Object.assign(y,n)).env,c=y.accessKey,d=y.imageSrc,h=y.code,g=f.imageEditor,m="";switch(y.moduleName){case f.productShoot:m=b[g=f.productShoot],S=!0;break;case f.quality:m=b[g=f.quality],S=!0;break;case f.poster:m=b[g=f.poster],S=!0;break;case f.model:m=b[g=f.model],S=!0;break;default:m=b[g=f.imageEditor]}Y=z=function(v,L){var I=Object.keys(L);if(I.length){var E=[];I.forEach(function(C){L[C]&&E.push(C+"="+L[C])}),E.length&&(v.indexOf("?")===-1?v+="?"+E.join("&"):v+="&"+E.join("&"))}return v}(m[r],{origin:g,platform:c,open:d}),S&&(z="https://"+(r!=="release"?"pre":"")+"account.meitu.com/open/silent_login?code="+h+"&access_key="+c+"&redirect_uri="+encodeURIComponent(Y)),console.log("iframe url sdk",z)}(a),y.el){var w=document.createElement("iframe");w.src=z,w.id=H,w.width="100%",w.height="100%",w.frameBorder="0";var M=document.querySelector(y.el);M==null||M.appendChild(w)}else{var K,D=function(n){var r=document.createElement("div");return r.style.position="absolute",r.style.zIndex="999999",r.innerHTML=`<style>
  .mt-image-editor-dialog {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 999;

  }
  .mt-image-editor-dialog-mask{
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgb(0, 0, 0);
    opacity: 0.5;
  }
  .mt-image-editor-dialog-content{
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1000px;
    height: 800px;
    z-index: 1001;
    background:#fff;
    border-radius: 4px;
    transform:translate(-50%,-50%) ;
  }
  .mt-image-editor-dialog-title{
    display: flex;
    justify-content: space-between;
    padding-left:20px;
    height:42px;
    line-height:42px;
    color: #000;
    border-bottom: 1px solid #f1f1f1;
  }
  .mt-image-editor-dialog-title .right{
    display: flex;
    justify-content: flex-end;
    width:80px;
  }
  .mt-image-editor-dialog-title .close{
    width:30px;
    cursor: pointer;
    text-align:center;
    font-size:20px;
    color:#666;
    background:url(https://public.static.meitudata.com/xiuxiu-pc/image-editor-sdk/images/icon-close.png) 50% 50% no-repeat;
    background-size:24px auto;
    margin-right:12px;
    opacity:.8;
  }
  .mt-image-editor-dialog-title .fullscreen{
    width:30px;
    cursor: pointer;
    text-align:center;
    font-size:20px;
    color:#666;
    margin-right:20px;
    background:url(https://public.static.meitudata.com/xiuxiu-pc/image-editor-sdk/images/icon-fullscreen.png) 50% 50% no-repeat;
    background-size:24px auto;
    opacity:.8;
  }
  .mt-image-editor-dialog-title .fullscreen.exit{
    background-image:url(https://public.static.meitudata.com/xiuxiu-pc/image-editor-sdk/images/icon-fullscreen-exit.png);
  }
  .mt-image-editor-dialog-iframe{
    width: 100%;
    height: calc(100% - 35px);
  }
  </style>
  <div class="mt-image-editor-dialog">
<div class="mt-image-editor-dialog-mask"></div>
<div class="mt-image-editor-dialog-content" id="mt-image-editor-dialog-content" style="width:`+y.width+"px;height:"+y.height+`px">
  <div class="mt-image-editor-dialog-title">
    <div>`+y.title+`</div>
    <div class="right">
      `+(y.fullscreen?'<div id="J_image_editor_fullscreen" class="fullscreen"></div>':"")+`
      <div id="J_image_editor_close" class="close"></div>
    </div>
  </div>
  <div class="mt-image-editor-dialog-iframe">
    <iframe src=`+z+' id="'+H+`" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</div>
</div>`,r.id=F,n||(r.style.opacity="0",r.style.visibility="hidden"),r}(u);p=D,(K=document.body)==null||K.appendChild(D),function(){var n,r;(n=x("J_image_editor_close"))==null||n.addEventListener("click",function(){document.fullscreenElement&&document.exitFullscreen(),U.close()});var c,d=x(F);(r=x("J_image_editor_fullscreen"))==null||r.addEventListener("click",function(){document.fullscreenElement?document.exitFullscreen():d==null||d.requestFullscreen()}),d==null||d.addEventListener("fullscreenchange",function(){var h,g;document.fullscreenElement?(h=x("J_image_editor_fullscreen"))==null||h.setAttribute("class","fullscreen exit"):(g=x("J_image_editor_fullscreen"))==null||g.setAttribute("class","fullscreen")}),y.resizeAble&&window.addEventListener("resize",function(){clearTimeout(c),c=this.setTimeout(function(){var h=Math.floor(.95*window.innerWidth),g=Math.floor(.95*window.innerHeight),m=x("mt-image-editor-dialog-content");m&&(m.style.width=h+"px",m.style.height=g+"px")},500)})}()}var j=function(n){n===void 0&&(n=document.body);var r=document.createElement("div");return r.style.position="absolute",r.style.zIndex="999999",r.innerHTML=`<style>
  .mt-component.mt-loading-svg {
    position:fixed;  
    width: 100px;
    height: 96px; 
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
    font-size:14px;
    background:rgba(0,0,0,.6);
    color:#fff;
    border-radius:6px;
    margin-top:24px;
  }
  .mt-component.mt-loading-svg svg{
    width: 50px;
    height: 50px;
  }
  </style>
  <div class="mt-component mt-loading-svg" id="mtLoadingComponent">
  <svg width='120px' height='120px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="loading-svg">
      <rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect>
      <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(0 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/>
      </rect>
      <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(30 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/>
      </rect>
      <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(60 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/>
      </rect>
      <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(90 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/>
      </rect>
      <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(120 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/>
      </rect>
      <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(150 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/>
      </rect>
      <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(180 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/>
      </rect>
      <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(210 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/>
      </rect>
      <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(240 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/>
      </rect>
      <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(270 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/>
      </rect>
      <rect x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(300 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/>
      </rect>
      <rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#ffffff' transform='rotate(330 50 50) translate(0 -30)'>
          <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/>
      </rect>
  </svg>
  <p id="mtLoadingText" class="text">正在初始化</p>
</div>`,n.appendChild(r),{show:function(c){c===void 0&&(c="");var d=x(ne),h=x("mtLoadingText");c&&h?(h.innerHTML=c,d==null||d.classList.add("show-msg")):d==null||d.classList.remove("show-msg"),d&&(d.style.opacity="1",d.style.visibility="visible")},hide:function(){var c=x(ne);c&&(c.style.opacity="0",c.style.visibility="hidden")}}}(p);setTimeout(function(){return j.hide()},S?3e3:1e3)}(this.config,e),window.addEventListener("message",function(a){var u=a.data.type;if(u===k.INIT)console.log("初始化成功"),i.isInit=!0;else if(u===k.SAVE){var p=a.data;i.getImageResultFn==null||i.getImageResultFn(p.url,p.suffix,p.id),i.getOnSavePosterFn==null||i.getOnSavePosterFn(a.data)}else if(u===k.RESULT)i.getOnCreatePosterFn==null||i.getOnCreatePosterFn(a.data);else if(u===k.LOGOUT||u===k.LOGIN){if(document.getElementById(H).src=Y,i.hasSendDebug)return;i.hasSendDebug=!0,i.sendDebugDomain()}})},l.validKey=function(e,i){var a=new XMLHttpRequest;a.onreadystatechange=function(){if(a.readyState==4)try{if(a.status>=200&&a.status<300||a.status==304){var u=JSON.parse(a.responseText);u.data&&u.data.valid?i&&i():console.warn("鉴权失败，请检查accessKey，联系开发人员！")}else console.warn("鉴权失败，请检查accessKey，联系开发人员！")}catch(p){console.warn(p)}},a.open("get","https://"+(this.config.env==="pre"||this.config.env==="local"?"pre":"")+"webapi-pc.meitu.com/editsdk/check_app_key?accessKey="+e+"&target_module="+this.config.moduleName,!0),a.send(null)},l.openImage=function(e){e===void 0&&(e=""),this.dialogVisible=!0,J(),e&&B({url:e,type:"open"})},l.open=function(){this.dialogVisible=!0,J()},l.openPoster=function(e){var i=this;if(e)if(e!=null&&e.mainImage){var a={type:"open",extraInfo:e,appKey:this.config.accessKey||this.config.appKey};this.dialogVisible=!0,J();var u=0;if(this.isInit)B(a);else var p=setInterval(function(){i.isInit?(clearInterval(p),B(a)):++u>20&&(clearInterval(p),console.warn("初始化失败"))},1e3)}else console.warn("主图不能为空");else console.warn("海报参数不能为空")},l.openRecord=function(e){J(),B({id:e,type:"open"})},l.sendDebugDomain=function(){var e=location.hostname;e!=="localhost"&&e!=="127.0.0.1"||B({domain:location.protocol+"//"+location.host,type:"debug"})},l.close=function(){var e;(e=x(F))&&(e.style.opacity="0",e.style.visibility="hidden"),this.onDialogClose()},l.onClose=function(e){e&&(this.onDialogClose=e)},l.destroy=function(){var e;(e=x(F))&&document.body.removeChild(e)},l.saveImage=function(e){e&&typeof e=="function"&&(this.getImageResultFn=e)},l.onSavePoster=function(e){e&&typeof e=="function"&&(this.getOnSavePosterFn=e)},l.onCreatePoster=function(e){e&&typeof e=="function"&&(this.getOnCreatePosterFn=e)},o}());window.MTImageEditor=U;const me={class:"article-page"},ge=["src"],ye=oe({__name:"index",setup(o){const{t:l}=ae(),e=$(""),i=$("aqua"),a=n=>{e.value=n.image},u=()=>{fe({images:[e.value],showIndex:!1})},p=()=>{console.log("onClear")},w=n=>{i.value=`rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`},M=$("https://img.yzcdn.cn/vant/cat.jpeg"),K=()=>{U.init({moduleName:"image-editor-sdk",accessKey:"XHGLzWkbBZ9z87s4My03sT4WDRZSKcRd",title:"web",el:"",imageSrc:M.value,fullscreen:!0,resizeAble:!0})};U.saveImage((n,r,c)=>(console.log(r,c,33333333333),{base64:n,type:r,id:c}));const D=ue;{const n=[1,2,3,4,4,5,555,5,6,63,2,444,123,4321],r=n.reduce((t,_)=>(t[_]?t[_]++:t[_]=1,t),{});console.log(r);const c=n.reduce((t,_)=>(t.includes(_)||t.push(_),t),[]);console.log("reduce",c);const d=n.filter((t,_)=>n.indexOf(t)===_);console.log("filter",d);const h=[...new Set(n)];console.log("Set",h);const g=Array.from(new Set(n));console.log("Array.from",g);const m=[];n.forEach(t=>{m.includes(t)||m.push(t)}),console.log("foreach",m);const v=[];for(let t=0;t<n.length;t++)v.includes(n[t])||v.push(n[t]);console.log("for",v);const L=[];n.map(t=>{L.includes(t)||L.push(t)}),console.log("map",L);const I=[];n.some(t=>{I.includes(t)||I.push(t)}),console.log("some",I);const E=[];n.find(t=>{E.includes(t)||E.push(t)}),console.log("find",E);const C=[];n.findIndex(t=>{C.includes(t)||C.push(t)}),console.log("findIndex",C);const G=[];n.forEach(t=>{G.indexOf(t)===-1&&G.push(t)}),console.log("indexOf",G);const W=[];n.forEach(t=>{W.lastIndexOf(t)===-1&&W.push(t)}),console.log("lastIndexOf",W)}let j={age:18};return j.sex="男",Object.defineProperty(j,"name",{value:"张三"}),(n,r)=>{const c=O("van-signature"),d=O("van-swipe-item"),h=O("van-swipe"),g=O("van-button"),m=O("van-image");return q(),Q("div",me,[ee("header",null,re(V(l)("message.tipsText"))+":",1),X(c,{onSubmit:a,onClear:p,onSigning:w,"clear-button-text":V(l)("message.clearText"),"confirm-button-text":V(l)("message.submitText"),"pen-color":i.value},null,8,["clear-button-text","confirm-button-text","pen-color"]),X(h,{class:"my-swipe",autoplay:3e3,"indicator-color":"white"},{default:Z(()=>[(q(!0),Q(se,null,le(V(D),v=>(q(),te(d,{key:v.id},{default:Z(()=>[ee("img",{src:v.imageUrl,alt:""},null,8,ge)]),_:2},1024))),128))]),_:1}),X(g,{onClick:K,type:"danger",size:"mini"},{default:Z(()=>[ce("打开编辑器")]),_:1}),e.value?(q(),te(m,{key:0,onClick:u,src:e.value},null,8,["src"])):de("",!0)])}}});export{ye as default};
