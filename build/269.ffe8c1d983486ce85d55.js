"use strict";(self.webpackChunkhughes_company_backend=self.webpackChunkhughes_company_backend||[]).push([[269],{8269:(e,t,a)=>{a.r(t),a.d(t,{default:()=>h});var i=a(67294),o=a(16550),l=a(26793),n=a(9980),s=a(28630),d=a(47489),u=a(2143),r=a(29007),c=a(58938),p=a(19826),v=a(40684),f=a(45074),m=a(91455),$=a(30894);const h=e=>{var t,a;const{collection:h,isEditing:g}=e,{slug:k,admin:{components:{views:{Edit:S}={}}={}}={}}=h,[E]=(0,i.useState)((()=>(0,c.Z)(h,g))),[b]=(0,i.useState)((()=>({...h,fields:E}))),[P,Z]=(0,i.useState)(),w=(0,v.bU)(),{serverURL:C,routes:{admin:y,api:_}}=(0,n.Z)(),{params:{id:A}={}}=(0,o.$B)(),{state:L}=(0,o.TH)(),U=(0,o.k6)(),[D,R]=(0,i.useState)(),[x,B]=(0,i.useState)(),{user:G}=(0,s.a)(),{getVersions:H,preferencesKey:K,getDocPermissions:T,docPermissions:V}=(0,f.x)(),{getPreference:j}=(0,m.G)(),{t:q}=(0,l.$)("general"),z=(0,i.useCallback)((async e=>{var t,a;if(H(),T(),B(null===(t=null==e?void 0:e.doc)||void 0===t?void 0:t.updatedAt),g){const t=await(0,p.Z)({fieldSchema:b.fields,data:e.doc,user:G,id:A,operation:"update",locale:w,t:q});R(t)}else Z(`${y}/collections/${b.slug}/${null===(a=null==e?void 0:e.doc)||void 0===a?void 0:a.id}`)}),[y,b,g,H,G,A,q,w,T]),[{data:F,isLoading:I,isError:J}]=(0,d.Z)(g?`${C}${_}/${k}/${A}`:null,{initialParams:{"fallback-locale":"null",depth:0,draft:"true"}}),M=(null==L?void 0:L.data)||F;if((0,i.useEffect)((()=>{if(I)return;(async()=>{B(null==M?void 0:M.updatedAt);const e=await(0,p.Z)({fieldSchema:E,data:M,user:G,operation:g?"update":"create",id:A,locale:w,t:q});await j(K),R(e)})()}),[M,E,g,A,G,w,I,K,j,q]),(0,i.useEffect)((()=>{P&&U.push(P)}),[U,P]),J)return i.createElement(o.l_,{to:`${y}/not-found`});const N=`${C}${_}/${k}/${A}${b.versions.drafts?"?draft=true":""}`,O=`${C}${_}/${k}${g?`/${A}`:""}?locale=${w}&depth=0&fallback-locale=null`,Q=g&&(null===(t=null==V?void 0:V.update)||void 0===t?void 0:t.permission)||!g&&(null===(a=null==V?void 0:V.create)||void 0===a?void 0:a.permission);return i.createElement($.f.Provider,{value:1},i.createElement(u.Z,{DefaultComponent:r.Z,CustomComponent:S,componentProps:{id:A,isLoading:!D||!V,data:M,collection:b,permissions:V,isEditing:g,onSave:z,initialState:D,hasSavePermission:Q,apiURL:N,action:O,updatedAt:x||(null==M?void 0:M.updatedAt)}}))}}}]);