import{_ as te}from"./CpRadioBtn-2b051b2c.js";import{_ as ne}from"./CpIcon-b6aa29ed.js";import{_ as oe}from"./CpNavBar-24c7bb1a.js";import{d as le,e as se,f as re,h as ie}from"./user-a42e3f4f.js";import{L as ue,d as ce,a as de,u as fe,D as ve,r as F,c as pe,P as _e,v as he,e as g,f as y,g as x,h as f,j as J,J as O,i as p,F as me,B as ge,k as X,w as S,l as z,s as N,n as T,N as ye,t as E,p as be,q as ke}from"./index-29ccb757.js";import{s as we}from"./function-call-3ae30c12.js";import{_ as Ie}from"./_plugin-vue_export-helper-c27b6911.js";import"./request-e9b26d75.js";var H={exports:{}};(function(b){(function(D){var P=typeof window<"u",k=P?window:this;b.exports?b.exports=D(P,k):k.IDValidator=D(P,k)})(function(D,P){var k={error:{longNumber:"长数字存在精度问题，请使用字符串传值！ Long number is not allowed, because the precision of the Number In JavaScript."}},l={checkArg:function(e,a){var t=typeof e;switch(t){case"number":if(e=e.toString(),e.length>15)return this.error(k.error.longNumber),!1;break;case"string":break;default:return!1}if(e=e.toUpperCase(),a&&!isNaN(a)&&(a=parseInt(a),e.length!==a))return!1;var o=null;if(e.length===18)o={body:e.slice(0,17),checkBit:e.slice(-1),type:18};else if(e.length===15)o={body:e,type:15};else return!1;return o},checkAddr:function(e,a){var t=this.getAddrInfo(e,a);return t!==!1},getAddrInfo:function(e,a){if(a=a||null,a===null)return e;if(a.hasOwnProperty(e))return a[e];var t;return t=e.slice(0,4)+"00",a.hasOwnProperty(t)?a[t]+"未知地区":(t=e.slice(0,2)+"0000",a.hasOwnProperty(t)?a[t]+"未知地区":!1)},checkBirth:function(e){var a,t;if(e.length==8)parseInt(e.slice(0,4),10),a=parseInt(e.slice(4,6),10),t=parseInt(e.slice(-2),10);else if(e.length==6)parseInt("19"+e.slice(0,2),10),a=parseInt(e.slice(2,4),10),t=parseInt(e.slice(-2),10);else return!1;return!(a>12||a===0||t>31||t===0)},checkOrder:function(e){return!0},weight:function(e){return Math.pow(2,e-1)%11},rand:function(e,a){return a=a||1,Math.round(Math.random()*(e-a))+a},str_pad:function(e,a,t,o){if(e=e.toString(),a=a||2,t=t||"0",o=o||!1,e.length>=a)return e;for(var n=0,d=a-e.length;n<d;n++)o?e=e+t:e=t+e;return e},error:function(e){var a=new Error;throw a.message="IDValidator: "+e,a}},h=function(e){typeof e<"u"&&(this.GB2260=e),this.cache={}};return h.prototype={isValid:function(e,a){var t=this.GB2260||null,o=l.checkArg(e,a);if(o===!1)return!1;if(this.cache.hasOwnProperty(e)&&typeof this.cache[e].valid<"u")return this.cache[e].valid;this.cache.hasOwnProperty(e)||(this.cache[e]={});var n=o.body.slice(0,6),d=o.type===18?o.body.slice(6,14):o.body.slice(6,12),w=o.body.slice(-3);if(!(l.checkAddr(n,t)&&l.checkBirth(d)&&l.checkOrder(w)))return this.cache[e].valid=!1,!1;if(o.type===15)return this.cache[e].valid=!0,!0;for(var c=[],_=18;_>1;_--){var I=l.weight(_);c[_]=I}for(var V=0,C=o.body.split(""),v=0;v<C.length;v++)V+=parseInt(C[v],10)*c[18-v];var u=12-V%11;return u==10?u="X":u>10&&(u=u%11),u=typeof u=="number"?u.toString():u,u!==o.checkBit?(this.cache[e].valid=!1,!1):(this.cache[e].valid=!0,!0)},getInfo:function(e,a){var t=this.GB2260||null;if(this.isValid(e,a)===!1)return!1;var o=l.checkArg(e);if(typeof this.cache[e].info<"u")return this.cache[e].info;var n=o.body.slice(0,6),d=o.type===18?o.body.slice(6,14):o.body.slice(6,12),w=o.body.slice(-3),c={};return c.addrCode=n,t!==null&&(c.addr=l.getAddrInfo(n,t)),c.birth=o.type===18?[d.slice(0,4),d.slice(4,6),d.slice(-2)].join("-"):["19"+d.slice(0,2),d.slice(2,4),d.slice(-2)].join("-"),c.sex=w%2===0?0:1,c.length=o.type,o.type===18&&(c.checkBit=o.checkBit),this.cache[e].info=c,c},makeID:function(e){var a=this.GB2260||null,t=null;if(a!==null)for(var o=0;t===null;){if(o>10){t=110101;break}var n=l.str_pad(l.rand(50),2,"0"),d=l.str_pad(l.rand(20),2,"0"),w=l.str_pad(l.rand(20),2,"0"),c=[n,d,w].join("");if(a[c]){t=c;break}}else t=110101;var _=l.str_pad(l.rand(99,50),2,"0"),I=l.str_pad(l.rand(12,1),2,"0"),V=l.str_pad(l.rand(28,1),2,"0");if(e)return t+_+I+V+l.str_pad(l.rand(999,1),3,"1");_="19"+_;for(var C=t+_+I+V+l.str_pad(l.rand(999,1),3,"1"),v=[],u=18;u>1;u--){var $=l.weight(u);v[u]=$}for(var A=0,M=C.split(""),B=0;B<M.length;B++)A+=parseInt(M[B],10)*v[18-B];var s=12-A%11;return s==10?s="X":s>10&&(s=s%11),s=typeof s=="number"?s.toString():s,C+s}},h})})(H);var Ve=H.exports;const Ce=ue(Ve),R=b=>(be("data-v-34fba7d2"),b=b(),ke(),b),xe={class:"patient-page"},Se={key:0,class:"patient-change"},Pe=R(()=>p("h3",null,"请选择患者信息",-1)),Be=R(()=>p("p",null,"以便医生给出更准确的治疗，信息仅医生可见",-1)),De=[Pe,Be],Fe={class:"patient-list"},Ne={key:0},Ae=["onClick"],Ue={class:"info"},Le={class:"name"},Oe={class:"id"},Ee={class:"icon"},Re={key:0,class:"tag"},$e=R(()=>p("p",null,"添加killer",-1)),Me=R(()=>p("div",{class:"patient-tip"},"最多可添加 6 人",-1)),We={key:1,class:"patient-next"},qe=ce({__name:"index",setup(b){const D=de(),P=fe(),k=ve(),l=D.query.isSelect,h=F(!1),e=F([]),a=async()=>{const s=await le();if(e.value=s.data.data,!l||!e.value.length)return;const r=e.value.find(m=>m.defaultFlag===1);r?v.value=r.id:v.value=e.value[0].id},t=[{label:"男",value:1},{label:"女",value:0}],o={name:"",idCard:"",gender:1,defaultFlag:0},n=F({...o}),d=pe({get(){return n.value.defaultFlag===1},set(s){n.value.defaultFlag=s?1:0}});_e(h,s=>{s||(n.value={...o})});const w=async()=>{if(!n.value.name)return N("请输入真实姓名");if(!n.value.idCard)return N("请输入身份证号");const s=new Ce;if(!s.isValid(n.value.idCard))return N("身份证格式错误");const{sex:r}=s.getInfo(n.value.idCard);if(n.value.gender!==r)return N("性别和身份证不符");n.value.id?await se(n.value):await re(n.value),h.value=!1,a(),T(n.value.id?"编辑成功":"添加成功")},c=s=>{h.value=!0;const{id:r,gender:m,name:W,idCard:U,defaultFlag:q}=s;n.value={id:r,gender:m,name:W,idCard:U,defaultFlag:q}},_=async()=>{await we({title:"温馨提示",message:`您确认要删除 ${n.value.name} 患者信息吗 ？`,cancelButtonText:"取消",confirmButtonText:"确认"}),await ie(n.value.id),h.value=!1,a(),T("删除成功")};he(()=>{a()});const I=F(""),V=async s=>{const r=e.value.filter(m=>m==null?void 0:m.name.includes(s));e.value=r},C=()=>{a()},v=F(),u=s=>{l&&(v.value=s.id)},$=()=>{if(!v.value)return N("请选择患者");k.setId(v.value),P.push("/consult/pay")},A=new URLSearchParams(window.location.search);console.log(A.get("isSelect"));const B=new URL(window.location.href).searchParams;return console.log(B.get("isSelect")),(s,r)=>{const m=oe,W=g("van-search"),U=ne,q=g("van-empty"),K=g("van-button"),L=g("van-field"),Q=te,Y=g("van-checkbox"),Z=g("van-form"),j=g("van-action-bar-button"),G=g("van-action-bar"),ee=g("van-popup");return y(),x("div",xe,[f(m,{title:J(l)?"选择killer":"killers"},null,8,["title"]),J(l)?(y(),x("div",Se,De)):O("",!0),f(W,{shape:"round",modelValue:I.value,"onUpdate:modelValue":r[0]||(r[0]=i=>I.value=i),onSearch:V,onClear:C,placeholder:"请输入名字搜索"},null,8,["modelValue"]),p("div",Fe,[e.value.length?(y(),x("div",Ne,[(y(!0),x(me,null,ge(e.value,i=>(y(),x("div",{class:ye(["patient-item",{selected:v.value===i.id}]),key:i.id,onClick:ae=>u(i)},[p("div",Ue,[p("span",Le,E(i.name),1),p("span",Oe,E(i.idCard),1),p("span",null,E(i.genderValue),1),p("span",null,E(i.age),1)]),p("div",Ee,[f(U,{name:"user-edit",onClick:ae=>c(i)},null,8,["onClick"])]),i.defaultFlag===1?(y(),x("div",Re,"默认")):O("",!0)],10,Ae))),128))])):(y(),X(q,{key:1,image:"search",description:"暂无数据"})),p("div",{class:"patient-add",onClick:r[1]||(r[1]=i=>h.value=!0)},[f(U,{name:"user-add"}),$e]),Me]),J(l)?(y(),x("div",We,[f(K,{onClick:$,type:"primary",round:"",block:""},{default:S(()=>[z("下一步")]),_:1})])):O("",!0),f(ee,{show:h.value,"onUpdate:show":r[6]||(r[6]=i=>h.value=i),position:"right"},{default:S(()=>[f(m,{title:n.value.id?"编辑killer":"添加killer","right-text":"保存",onClickRight:w},null,8,["title"]),f(Z,{autocomplete:"off"},{default:S(()=>[f(L,{label:"真实姓名",placeholder:"请输入真实姓名",modelValue:n.value.name,"onUpdate:modelValue":r[2]||(r[2]=i=>n.value.name=i)},null,8,["modelValue"]),f(L,{label:"身份证号",placeholder:"请输入身份证号",modelValue:n.value.idCard,"onUpdate:modelValue":r[3]||(r[3]=i=>n.value.idCard=i)},null,8,["modelValue"]),f(L,{label:"性别"},{input:S(()=>[f(Q,{options:t,modelValue:n.value.gender,"onUpdate:modelValue":r[4]||(r[4]=i=>n.value.gender=i)},null,8,["modelValue"])]),_:1}),f(L,{label:"默认就诊人"},{input:S(()=>[f(Y,{round:"",modelValue:d.value,"onUpdate:modelValue":r[5]||(r[5]=i=>d.value=i)},null,8,["modelValue"])]),_:1})]),_:1}),n.value.id?(y(),X(G,{key:0},{default:S(()=>[f(j,{onClick:_},{default:S(()=>[z("删除")]),_:1})]),_:1})):O("",!0)]),_:1},8,["show"])])}}});const Ze=Ie(qe,[["__scopeId","data-v-34fba7d2"]]);export{Ze as default};