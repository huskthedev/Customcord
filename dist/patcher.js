// Vencord 275d4f6
// Standalone: false
// Platform: win32
// Updater Disabled: false
"use strict";var Mr=Object.create;var _e=Object.defineProperty;var Lr=Object.getOwnPropertyDescriptor;var Nr=Object.getOwnPropertyNames;var Vr=Object.getPrototypeOf,Ur=Object.prototype.hasOwnProperty;var d=(t,e)=>()=>(t&&(e=t(t=0)),e);var fe=(t,e)=>{for(var n in e)_e(t,n,{get:e[n],enumerable:!0})},Mt=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Nr(e))!Ur.call(t,i)&&i!==n&&_e(t,i,{get:()=>e[i],enumerable:!(r=Lr(e,i))||r.enumerable});return t};var Lt=(t,e,n)=>(n=t!=null?Mr(Vr(t)):{},Mt(e||!t||!t.__esModule?_e(n,"default",{value:t,enumerable:!0}):n,t)),He=t=>Mt(_e({},"__esModule",{value:!0}),t);var c=d(()=>{"use strict"});var he=d(()=>{"use strict";c()});var Ke,Nt,Te,Vt=d(()=>{"use strict";c();Ke=Symbol("SettingsStore.isProxy"),Nt=Symbol("SettingsStore.getRawTarget"),Te=class{pathListeners=new Map;globalListeners=new Set;proxyContexts=new WeakMap;proxyHandler=(()=>{let e=this;return{get(n,r,i){if(r===Ke)return!0;if(r===Nt)return n;let o=Reflect.get(n,r,i),s=e.proxyContexts.get(n);if(s==null)return o;let{root:a,path:l}=s;if(!(r in n)&&e.getDefaultValue!=null&&(o=e.getDefaultValue({target:n,key:r,root:a,path:l})),typeof o=="object"&&o!==null&&!o[Ke]){let m=`${l}${l&&"."}${r}`;return e.makeProxy(o,a,m)}return o},set(n,r,i){if(i?.[Ke]&&(i=i[Nt]),n[r]===i)return!0;if(!Reflect.set(n,r,i))return!1;let o=e.proxyContexts.get(n);if(o==null)return!0;let{root:s,path:a}=o,l=`${a}${a&&"."}${r}`;return e.notifyListeners(l,i,s),!0},deleteProperty(n,r){if(!Reflect.deleteProperty(n,r))return!1;let i=e.proxyContexts.get(n);if(i==null)return!0;let{root:o,path:s}=i,a=`${s}${s&&"."}${r}`;return e.notifyListeners(a,void 0,o),!0}}})();constructor(e,n={}){this.plain=e,this.store=this.makeProxy(e),Object.assign(this,n)}makeProxy(e,n=e,r=""){return this.proxyContexts.set(e,{root:n,path:r}),new Proxy(e,this.proxyHandler)}notifyListeners(e,n,r){let i=e.split(".");if(i.length>3&&i[0]==="plugins"){let o=i.slice(0,3),s=o.join("."),a=o.reduce((l,m)=>l[m],r);this.globalListeners.forEach(l=>l(r,s)),this.pathListeners.get(s)?.forEach(l=>l(a))}else this.globalListeners.forEach(o=>o(r,e));this.pathListeners.get(e)?.forEach(o=>o(n))}setData(e,n){if(this.readOnly)throw new Error("SettingsStore is read-only");if(this.plain=e,this.store=this.makeProxy(e),n){let r=e,i=n.split(".");for(let o of i){if(!r){console.warn(`Settings#setData: Path ${n} does not exist in new data. Not dispatching update`);return}r=r[o]}this.pathListeners.get(n)?.forEach(o=>o(r))}this.markAsChanged()}addGlobalChangeListener(e){this.globalListeners.add(e)}addChangeListener(e,n){let r=this.pathListeners.get(e)??new Set;r.add(n),this.pathListeners.set(e,r)}removeGlobalChangeListener(e){this.globalListeners.delete(e)}removeChangeListener(e,n){let r=this.pathListeners.get(e);r&&(r.delete(n),r.size||this.pathListeners.delete(e))}markAsChanged(){this.globalListeners.forEach(e=>e(this.plain,""))}}});function $e(t,e){for(let n in e){let r=e[n];typeof r=="object"&&!Array.isArray(r)?(t[n]??={},$e(t[n],r)):t[n]??=r}return t}var Ut=d(()=>{"use strict";c()});var Gt,q,Me,ee,J,pe,Ye,qe,zt,Le,ge=d(()=>{"use strict";c();Gt=require("electron"),q=require("path"),Me=process.env.VENCORD_USER_DATA_DIR??(process.env.DISCORD_USER_DATA_DIR?(0,q.join)(process.env.DISCORD_USER_DATA_DIR,"..","VencordData"):(0,q.join)(Gt.app.getPath("userData"),"..","Vencord")),ee=(0,q.join)(Me,"settings"),J=(0,q.join)(Me,"themes"),pe=(0,q.join)(ee,"quickCss.css"),Ye=(0,q.join)(ee,"settings.json"),qe=(0,q.join)(ee,"native-settings.json"),zt=["https:","http:","steam:","spotify:","com.epicgames.launcher:","tidal:","itunes:"],Le=process.argv.includes("--vanilla")});function jt(t,e){try{return JSON.parse((0,te.readFileSync)(e,"utf-8"))}catch(n){return n?.code!=="ENOENT"&&console.error(`Failed to read ${t} settings`,n),{}}}var Je,te,P,Gr,Bt,z,W=d(()=>{"use strict";c();he();Vt();Ut();Je=require("electron"),te=require("fs");ge();(0,te.mkdirSync)(ee,{recursive:!0});P=new Te(jt("renderer",Ye));P.addGlobalChangeListener(()=>{try{(0,te.writeFileSync)(Ye,JSON.stringify(P.plain,null,4))}catch(t){console.error("Failed to write renderer settings",t)}});Je.ipcMain.on("VencordGetSettings",t=>t.returnValue=P.plain);Je.ipcMain.handle("VencordSetSettings",(t,e,n)=>{P.setData(e,n)});Gr={plugins:{},customCspRules:{}},Bt=jt("native",qe);$e(Bt,Gr);z=new Te(Bt);z.addGlobalChangeListener(()=>{try{(0,te.writeFileSync)(qe,JSON.stringify(z.plain,null,4))}catch(t){console.error("Failed to write native settings",t)}})});function Wt(){Xe.session.defaultSession.webRequest.onHeadersReceived(({responseHeaders:t,resourceType:e},n)=>{if(t&&(e==="mainFrame"&&Br(t),e==="stylesheet")){let r=Qe(t,"content-type");r&&(t[r]=["text/css"])}n({cancel:!1,responseHeaders:t})}),Xe.session.defaultSession.webRequest.onHeadersReceived=()=>{}}var Xe,de,M,Zt,w,Ft,et,Qe,zr,jr,Br,tt=d(()=>{"use strict";c();W();Xe=require("electron"),de=["connect-src"],M=[...de,"img-src"],Zt=["style-src","font-src"],w=[...M,...Zt],Ft=[...w,"script-src","worker-src"],et={"http://localhost:*":w,"http://127.0.0.1:*":w,"localhost:*":w,"127.0.0.1:*":w,"*.github.io":w,"github.com":w,"raw.githubusercontent.com":w,"*.gitlab.io":w,"gitlab.com":w,"*.codeberg.page":w,"codeberg.org":w,"*.githack.com":w,"jsdelivr.net":w,"fonts.googleapis.com":Zt,"i.imgur.com":M,"i.ibb.co":M,"i.pinimg.com":M,"*.tenor.com":M,"files.catbox.moe":w,"cdn.discordapp.com":w,"media.discordapp.net":M,"cdnjs.cloudflare.com":Ft,"cdn.jsdelivr.net":Ft,"api.github.com":de,"ws.audioscrobbler.com":de,"translate-pa.googleapis.com":de,"*.vencord.dev":M,"manti.vendicated.dev":M,"decor.fieryflames.dev":de,"ugc.decor.fieryflames.dev":M,"sponsor.ajay.app":de,"dearrow-thumb.ajay.app":M,"usrbg.is-hardly.online":M,"icons.duckduckgo.com":M},Qe=(t,e)=>Object.keys(t).find(n=>n.toLowerCase()===e),zr=t=>{let e={};return t.split(";").forEach(n=>{let[r,...i]=n.trim().split(/\s+/g);r&&!Object.prototype.hasOwnProperty.call(e,r)&&(e[r]=i)}),e},jr=t=>Object.entries(t).filter(([,e])=>e?.length).map(e=>e.flat().join(" ")).join("; "),Br=t=>{let e=Qe(t,"content-security-policy-report-only");e&&delete t[e];let n=Qe(t,"content-security-policy");if(n){let r=zr(t[n][0]),i=(o,...s)=>{r[o]??=[...r["default-src"]??[]],r[o].push(...s)};i("style-src","'unsafe-inline'"),i("script-src","'unsafe-inline'","'unsafe-eval'");for(let o of["style-src","connect-src","img-src","font-src","media-src","worker-src"])i(o,"blob:","data:","vencord:");for(let[o,s]of Object.entries(z.store.customCspRules))for(let a of s)i(a,o);for(let[o,s]of Object.entries(et))for(let a of s)i(a,o);t[n]=[jr(r)]}}});function xe(t){return async function(){try{return{ok:!0,value:await t(...arguments)}}catch(e){return{ok:!1,error:e instanceof Error?{...e,message:e.message,name:e.name,stack:e.stack}:e}}}}var Ht=d(()=>{"use strict";c()});var Kr={};function me(...t){let e={cwd:qt};return rt?nt("flatpak-spawn",["--host","git",...t],e):nt("git",t,e)}async function Fr(){return(await me("remote","get-url","origin")).stdout.trim().replace(/git@(.+):/,"https://$1/").replace(/\.git$/,"")}async function Zr(){await me("fetch");let t=(await me("branch","--show-current")).stdout.trim();if(!((await me("ls-remote","origin",t)).stdout.length>0))return[];let r=(await me("log",`HEAD...origin/${t}`,"--pretty=format:%an/%h/%s")).stdout.trim();return r?r.split(`
`).map(i=>{let[o,s,...a]=i.split("/");return{hash:s,author:o,message:a.join("/").split(`
`)[0]}}):[]}async function Wr(){return(await me("pull")).stdout.includes("Fast-forward")}async function Hr(){return!(await nt(rt?"flatpak-spawn":"node",rt?["--host","node","scripts/build/build.mjs"]:["scripts/build/build.mjs"],{cwd:qt})).stderr.includes("Build failed")}var Kt,Ee,$t,Yt,qt,nt,rt,Jt=d(()=>{"use strict";c();he();Kt=require("child_process"),Ee=require("electron"),$t=require("path"),Yt=require("util");Ht();qt=(0,$t.join)(__dirname,".."),nt=(0,Yt.promisify)(Kt.execFile),rt=!1;Ee.ipcMain.handle("VencordGetRepo",xe(Fr));Ee.ipcMain.handle("VencordGetUpdates",xe(Zr));Ee.ipcMain.handle("VencordUpdate",xe(Wr));Ee.ipcMain.handle("VencordBuild",xe(Hr))});var Xt=d(()=>{"use strict";c();Jt()});function tn(t,e,n,r){return BigInt(t)|BigInt(e)<<16n|BigInt(n)<<32n|BigInt(r)<<48n}function H(t,e){return BigInt(t[e])|BigInt(t[e+1])<<8n|BigInt(t[e+2])<<16n|BigInt(t[e+3])<<24n|BigInt(t[e+4])<<32n|BigInt(t[e+5])<<40n|BigInt(t[e+6])<<48n|BigInt(t[e+7])<<56n}function C(t,e){return t<<e&$r|t>>nn-e}function f(t){return BigInt.asUintN(64,t)}function rn(t,e=0){return new it(e).update(t).digest()}var I,b,Qt,De,en,nn,$r,Yr,it,on=d(()=>{c();I=11400714785074694791n,b=14029467366897019727n,Qt=1609587929392839161n,De=9650029242287828579n,en=2870177450012600261n,nn=64n,$r=2n**nn-1n,Yr=new TextEncoder;it=class{#t;#n;#r;#i;#o;#s;#a;#e;constructor(e=0){this.reset(e)}reset(e=this.#t){return this.#t=BigInt.asUintN(32,BigInt(e)),this.#n=f(this.#t+I+b),this.#r=f(this.#t+b),this.#i=this.#t,this.#o=f(this.#t-I),this.#s=null,this.#a=0,this.#e=0,this}update(e){typeof e=="string"&&(e=Yr.encode(e));let n=0,r=e.length,i=n+r;if(r===0)return this;if(this.#a+=r,this.#e===0&&(this.#s=new Uint8Array(32)),this.#e+r<32)return this.#s.set(e.subarray(0,r),this.#e),this.#e+=r,this;if(this.#e>0){this.#s.set(e.subarray(0,32-this.#e),this.#e);let o=0,s;s=H(this.#s,o),this.#n=f(C(f(this.#n+s*b),31n)*I),o+=8,s=H(this.memory,o),this.#r=f(C(f(this.#r+s*b),31n)*I),o+=8,s=H(this.memory,o),this.#i=f(C(f(this.#i+s*b),31n)*I),o+=8,s=H(this.memory,o),this.#o=f(C(f(this.#o+s*b),31n)*I),n+=32-this.#e,this.#e=0}if(n<=i-32){let o=i-32;do{let s;s=H(e,n),this.#n=f(C(f(this.#n+s*b),31n)*I),n+=8,s=H(e,n),this.#r=f(C(f(this.#r+s*b),31n)*I),n+=8,s=H(e,n),this.#i=f(C(f(this.#i+s*b),31n)*I),n+=8,s=H(e,n),this.#o=f(C(f(this.#o+s*b),31n)*I),n+=8}while(n<=o)}return n<i&&(this.#s.set(e.subarray(n,i),this.#e),this.#e=i-n),this}digest(){let e=this.#s,n=this.#e,r=0,i=0n,o=0n,s=0n;for(this.#a>=32?(i=C(this.#n,1n)+C(this.#r,7n)+C(this.#i,12n)+C(this.#o,18n),i=f(i^C(f(this.#n*b),31n)*I),i=f(i*I+De),i=f(i^C(f(this.#r*b),31n)*I),i=f(i*I+De),i=f(i^C(f(this.#i*b),31n)*I),i=f(i*I+De),i=f(i^C(f(this.#o*b),31n)*I),i=f(i*I+De)):i=f(this.#t+en),i+=BigInt(this.#a);r<=n-8;)s=H(e,r),s=f(C(f(s*b),31n)*I),i=f(C(i^s,27n)*I+De),r+=8;for(r+4<=n&&(s=tn(e[r+1]<<8|e[r],e[r+3]<<8|e[r+2],0,0),i=f(C(i^f(s*I),23n)*b+Qt),r+=4);r<n;)s=tn(e[r++],0,0,0),i=f(C(i^f(s*en),11n)*I);return o=f(i>>33n),i=f((i^o)*b),o=f(i>>29n),i=f((i^o)*Qt),o=f(i>>32n),i=f(i^o),i}}});function Jr(t){t=BigInt(t);let e=[],n=Math.ceil(Math.floor(Math.log2(Number(t))+1)/8);for(let i=0;i<n;i++)e.unshift(Number(t>>BigInt(8*i)&BigInt(255)));let r=new Uint8Array(e);return qr?r:r.reverse()}function sn(t){let e=rn(t,0),n=Jr(e);return[ve[n[0]>>2],ve[(n[0]&3)<<4|n[1]>>4],ve[(n[1]&15)<<2|n[2]>>6],ve[n[2]&63],ve[n[3]>>2],ve[(n[3]&3)<<4|n[3]>>4]].join("")}var ve,qr,an=d(()=>{"use strict";c();on();ve="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),qr=(()=>{let t=new Uint8Array(4),e=new Uint32Array(t.buffer);return!((e[0]=1)&t[0])})()});function cn(t){let e=typeof t=="string"?t:t.source;if(e=e.replaceAll(/#{intl::([\w$+/]*)(?:::(\w+))?}/g,(i,o,s)=>{let a=s==="raw"?o:sn(o),l=typeof t=="string";return!Number.isNaN(Number(a[0]))||a.includes("+")||a.includes("/")?l?`["${a}"]`:String.raw`(?:\["${a}"\])`.replaceAll("+","\\+"):l?`.${a}`:String.raw`(?:\.${a})`}),typeof t=="string")return e;let n=e.replaceAll("\\i",String.raw`(?:[A-Za-z_$][\w$]*)`),r=new RegExp(n,t.flags);return r.toString=t.toString.bind(t),r}var ln=d(()=>{"use strict";c();an()});var at={};fe(at,{fetchTrackData:()=>ni});async function ot(t){let{stdout:e}=await hn("osascript",t.map(n=>["-e",n]).flat());return e}async function ti({id:t,name:e,artist:n,album:r}){if(t===V?.id){if("data"in V)return V.data;if("failures"in V&&V.failures>=5)return null}try{let i=new URL("https://amp-api-edge.music.apple.com/v1/catalog/us/search");i.searchParams.set("platform","web"),i.searchParams.set("l","en-US"),i.searchParams.set("limit","1"),i.searchParams.set("with","serverBubbles"),i.searchParams.set("types","songs"),i.searchParams.set("term",`${e} ${n} ${r}`),i.searchParams.set("include[songs]","artists");let o=await ei(),s=await fetch(i,{headers:{accept:"*/*","accept-language":"en-US,en;q=0.9",authorization:`Bearer ${o}`,"user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",origin:"https://music.apple.com"}}).then(a=>a.json()).then(a=>a.results.song.data[0]);return V={id:t,data:{appleMusicLink:s.attributes.url,songLink:`https://song.link/i/${s.id}`,albumArtwork:s.attributes.artwork.url.replace("{w}x{h}","512x512"),artistArtwork:s.relationships.artists.data[0].attributes.artwork.url.replace("{w}x{h}","512x512")}},V.data}catch(i){return console.error("[AppleMusicRichPresence] Failed to fetch remote data:",i),V={id:t,failures:(t===V?.id&&"failures"in V?V.failures:0)+1},null}}async function ni(){try{await hn("pgrep",["^Music$"])}catch{return null}if(await ot(['tell application "Music"',"get player state","end tell"]).then(g=>g.trim())!=="playing")return null;let e=await ot(['tell application "Music"',"get player position","end tell"]).then(g=>Number.parseFloat(g.trim())),n=await ot(['set output to ""','tell application "Music"',"set t_id to database id of current track","set t_name to name of current track","set t_album to album of current track","set t_artist to artist of current track","set t_duration to duration of current track",'set output to "" & t_id & "\\n" & t_name & "\\n" & t_album & "\\n" & t_artist & "\\n" & t_duration',"end tell","return output"]),[r,i,o,s,a]=n.split(`
`).filter(g=>!!g),l=Number.parseFloat(a),m=await ti({id:r,name:i,artist:s,album:o});return{name:i,album:o,artist:s,playerPosition:e,duration:l,...m}}var un,fn,hn,V,Xr,Qr,st,ei,pn=d(()=>{"use strict";c();ln();un=require("child_process"),fn=require("util"),hn=(0,fn.promisify)(un.execFile);V=null,Xr=/<script type="module" crossorigin src="([a-zA-Z0-9.\-/]+)"><\/script>/,Qr=cn(/\b(\i)="([A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*)"(?=.+?Bearer \$\{\1\})/),ei=async()=>{if(st)return st;let t=await fetch("https://music.apple.com/").then(i=>i.text()),e=new URL(t.match(Xr)[1],"https://music.apple.com/"),r=(await fetch(e).then(i=>i.text())).match(Qr)[2];return st=r,r}});var ct={};fe(ct,{initDevtoolsOpenEagerLoad:()=>ri});function ri(t){let e=()=>t.sender.executeJavaScript("Vencord.Plugins.plugins.ConsoleShortcuts.eagerLoad(true)");t.sender.isDevToolsOpened()?e():t.sender.once("devtools-opened",()=>e())}var gn=d(()=>{"use strict";c()});var mn={};var dn,vn=d(()=>{"use strict";c();W();dn=require("electron");dn.app.on("browser-window-created",(t,e)=>{e.webContents.on("frame-created",(n,{frame:r})=>{r?.once("dom-ready",()=>{if(r.url.startsWith("https://open.spotify.com/embed/")){let i=P.store.plugins?.FixSpotifyEmbeds;if(!i?.enabled)return;r.executeJavaScript(`
                    const original = Audio.prototype.play;
                    Audio.prototype.play = function() {
                        this.volume = ${i.volume/100||.1};
                        return original.apply(this, arguments);
                    }
                `)}})})})});var In={};var yn,An=d(()=>{"use strict";c();W();yn=require("electron");yn.app.on("browser-window-created",(t,e)=>{e.webContents.on("frame-created",(n,{frame:r})=>{r?.once("dom-ready",()=>{if(r.url.startsWith("https://www.youtube.com/")){if(!P.store.plugins?.FixYoutubeEmbeds?.enabled)return;r.executeJavaScript(`
                new MutationObserver(() => {
                    if(
                        document.querySelector('div.ytp-error-content-wrap-subreason a[href*="www.youtube.com/watch?v="]')
                    ) location.reload()
                }).observe(document.body, { childList: true, subtree:true });
                `)}})})})});var lt={};fe(lt,{resolveRedirect:()=>oi});function wn(t){return new Promise((e,n)=>{let r=(0,Cn.request)(new URL(t),{method:"HEAD"},i=>{e(i.headers.location?wn(i.headers.location):t)});r.on("error",n),r.end()})}async function oi(t,e){return ii.test(e)?wn(e):e}var Cn,ii,Sn=d(()=>{"use strict";c();Cn=require("https"),ii=/^https:\/\/(spotify\.link|s\.team)\/.+$/});var ut={};fe(ut,{makeDeeplTranslateRequest:()=>si});async function si(t,e,n,r){let i=e?"https://api.deepl.com/v2/translate":"https://api-free.deepl.com/v2/translate";try{let o=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`DeepL-Auth-Key ${n}`},body:r}),s=await o.text();return{status:o.status,data:s}}catch(o){return{status:-1,data:String(o)}}}var bn=d(()=>{"use strict";c()});var ft={};fe(ft,{readRecording:()=>ai});async function ai(t,e){e=(0,Pe.normalize)(e);let n=(0,Pe.basename)(e),r=(0,Pe.normalize)(Tn.app.getPath("userData")+"/");if(console.log(n,r,e),n!=="recording.ogg"||!e.startsWith(r))return null;try{let i=await(0,xn.readFile)(e);return new Uint8Array(i.buffer)}catch{return null}}var Tn,xn,Pe,En=d(()=>{"use strict";c();Tn=require("electron"),xn=require("fs/promises"),Pe=require("path")});var ht={};fe(ht,{sendToOverlay:()=>ci});function ci(t,e){e.messageType=e.type;let n=JSON.stringify(e);Dn??=(0,Pn.createSocket)("udp4"),Dn.send(n,42069,"127.0.0.1")}var Pn,Dn,Rn=d(()=>{"use strict";c();Pn=require("dgram")});var On,kn=d(()=>{c();On=`/* eslint-disable */

/**
 * This file is part of AdGuard's Block YouTube Ads (https://github.com/AdguardTeam/BlockYouTubeAdsShortcut).
 *
 * Copyright (C) AdGuard Team
 *
 * AdGuard's Block YouTube Ads is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdGuard's Block YouTube Ads is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with AdGuard's Block YouTube Ads.  If not, see <http://www.gnu.org/licenses/>.
 */

const hiddenCSS = [
    "#__ffYoutube1",
    "#__ffYoutube2",
    "#__ffYoutube3",
    "#__ffYoutube4",
    "#feed-pyv-container",
    "#feedmodule-PRO",
    "#homepage-chrome-side-promo",
    "#merch-shelf",
    "#offer-module",
    '#pla-shelf > ytd-pla-shelf-renderer[class="style-scope ytd-watch"]',
    "#pla-shelf",
    "#premium-yva",
    "#promo-info",
    "#promo-list",
    "#promotion-shelf",
    "#related > ytd-watch-next-secondary-results-renderer > #items > ytd-compact-promoted-video-renderer.ytd-watch-next-secondary-results-renderer",
    "#search-pva",
    "#shelf-pyv-container",
    "#video-masthead",
    "#watch-branded-actions",
    "#watch-buy-urls",
    "#watch-channel-brand-div",
    "#watch7-branded-banner",
    "#YtKevlarVisibilityIdentifier",
    "#YtSparklesVisibilityIdentifier",
    ".carousel-offer-url-container",
    ".companion-ad-container",
    ".GoogleActiveViewElement",
    '.list-view[style="margin: 7px 0pt;"]',
    ".promoted-sparkles-text-search-root-container",
    ".promoted-videos",
    ".searchView.list-view",
    ".sparkles-light-cta",
    ".watch-extra-info-column",
    ".watch-extra-info-right",
    ".ytd-carousel-ad-renderer",
    ".ytd-compact-promoted-video-renderer",
    ".ytd-companion-slot-renderer",
    ".ytd-merch-shelf-renderer",
    ".ytd-player-legacy-desktop-watch-ads-renderer",
    ".ytd-promoted-sparkles-text-search-renderer",
    ".ytd-promoted-video-renderer",
    ".ytd-search-pyv-renderer",
    ".ytd-video-masthead-ad-v3-renderer",
    ".ytp-ad-action-interstitial-background-container",
    ".ytp-ad-action-interstitial-slot",
    ".ytp-ad-image-overlay",
    ".ytp-ad-overlay-container",
    ".ytp-ad-progress",
    ".ytp-ad-progress-list",
    '[class*="ytd-display-ad-"]',
    '[layout*="display-ad-"]',
    'a[href^="http://www.youtube.com/cthru?"]',
    'a[href^="https://www.youtube.com/cthru?"]',
    "ytd-action-companion-ad-renderer",
    "ytd-banner-promo-renderer",
    "ytd-compact-promoted-video-renderer",
    "ytd-companion-slot-renderer",
    "ytd-display-ad-renderer",
    "ytd-promoted-sparkles-text-search-renderer",
    "ytd-promoted-sparkles-web-renderer",
    "ytd-search-pyv-renderer",
    "ytd-single-option-survey-renderer",
    "ytd-video-masthead-ad-advertiser-info-renderer",
    "ytd-video-masthead-ad-v3-renderer",
    "YTM-PROMOTED-VIDEO-RENDERER",
];
/**
* Adds CSS to the page
*/
const hideElements = () => {
    const selectors = hiddenCSS;
    if (!selectors) {
        return;
    }
    const rule = selectors.join(", ") + " { display: none!important; }";
    const style = document.createElement("style");
    style.textContent = rule;
    document.head.appendChild(style);
};
/**
* Calls the "callback" function on every DOM change, but not for the tracked events
* @param {Function} callback callback function
*/
const observeDomChanges = callback => {
    const domMutationObserver = new MutationObserver(mutations => {
        callback(mutations);
    });
    domMutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
};
/**
* This function is supposed to be called on every DOM change
*/
const hideDynamicAds = () => {
    const elements = document.querySelectorAll("#contents > ytd-rich-item-renderer ytd-display-ad-renderer");
    if (elements.length === 0) {
        return;
    }
    elements.forEach(el => {
        if (el.parentNode && el.parentNode.parentNode) {
            const parent = el.parentNode.parentNode;
            if (parent.localName === "ytd-rich-item-renderer") {
                parent.style.display = "none";
            }
        }
    });
};
/**
* This function checks if the video ads are currently running
* and auto-clicks the skip button.
*/
const autoSkipAds = () => {
    // If there's a video that plays the ad at this moment, scroll this ad
    if (document.querySelector(".ad-showing")) {
        const video = document.querySelector("video");
        if (video && video.duration) {
            video.currentTime = video.duration;
            // Skip button should appear after that,
            // now simply click it automatically
            setTimeout(() => {
                const skipBtn = document.querySelector("button.ytp-ad-skip-button");
                if (skipBtn) {
                    skipBtn.click();
                }
            }, 100);
        }
    }
};
/**
* This function overrides a property on the specified object.
*
* @param {object} obj object to look for properties in
* @param {string} propertyName property to override
* @param {*} overrideValue value to set
*/
const overrideObject = (obj, propertyName, overrideValue) => {
    if (!obj) {
        return false;
    }
    let overriden = false;
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && key === propertyName) {
            obj[key] = overrideValue;
            overriden = true;
        } else if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
            if (overrideObject(obj[key], propertyName, overrideValue)) {
                overriden = true;
            }
        }
    }
    return overriden;
};
/**
* Overrides JSON.parse and Response.json functions.
* Examines these functions arguments, looks for properties with the specified name there
* and if it exists, changes it's value to what was specified.
*
* @param {string} propertyName name of the property
* @param {*} overrideValue new value for the property
*/
const jsonOverride = (propertyName, overrideValue) => {
    const nativeJSONParse = JSON.parse;
    JSON.parse = (...args) => {
        const obj = nativeJSONParse.apply(this, args);
        // Override it's props and return back to the caller
        overrideObject(obj, propertyName, overrideValue);
        return obj;
    };
    // Override Response.prototype.json
    Response.prototype.json = new Proxy(Response.prototype.json, {
        async apply(...args) {
            // Call the target function, get the original Promise
            const result = await Reflect.apply(...args);
            // Create a new one and override the JSON inside
            overrideObject(result, propertyName, overrideValue);
            return result;
        },
    });
};
// Removes ads metadata from YouTube XHR requests
jsonOverride("adPlacements", []);
jsonOverride("playerAds", []);
// Applies CSS that hides YouTube ad elements
hideElements();
// Some changes should be re-evaluated on every page change
hideDynamicAds();
autoSkipAds();
observeDomChanges(() => {
    hideDynamicAds();
    autoSkipAds();
});`});var Mn={};var _n,Ln=d(()=>{"use strict";c();W();_n=require("electron");kn();_n.app.on("browser-window-created",(t,e)=>{e.webContents.on("frame-created",(n,{frame:r})=>{r?.once("dom-ready",()=>{P.store.plugins?.YoutubeAdblock?.enabled&&(r.url.includes("youtube.com/embed/")||r.url.includes("discordsays")&&r.url.includes("youtube.com"))&&r.executeJavaScript(On)})})})});var Nn,Vn=d(()=>{c();pn();gn();vn();An();Sn();bn();En();Rn();Ln();Nn={AppleMusicRichPresence:at,ConsoleShortcuts:ct,FixSpotifyEmbeds:mn,FixYoutubeEmbeds:In,OpenInApp:lt,Translate:ut,VoiceMessages:ft,XSOverlay:ht,YoutubeAdblock:Mn}});var pt,Un,Gn=d(()=>{"use strict";c();he();pt=require("electron");Vn();Un={};for(let[t,e]of Object.entries(Nn)){let n=Object.entries(e);if(!n.length)continue;let r=Un[t]={};for(let[i,o]of n){let s=`VencordPluginNative_${t}_${i}`;pt.ipcMain.handle(s,o),r[i]=s}}pt.ipcMain.on("VencordGetPluginIpcMethodMap",t=>{t.returnValue=Un})});function gt(t,e=300){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{t(...r)},e)}}var zn=d(()=>{"use strict";c()});var jn,Bn=d(()=>{c();jn="PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KICAgIDxoZWFkPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04IiAvPgogICAgICAgIDx0aXRsZT5WZW5jb3JkIFF1aWNrQ1NTIEVkaXRvcjwvdGl0bGU+CiAgICAgICAgPGxpbmsKICAgICAgICAgICAgcmVsPSJzdHlsZXNoZWV0IgogICAgICAgICAgICBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9lZGl0b3IvZWRpdG9yLm1haW4uY3NzIgogICAgICAgICAgICBpbnRlZ3JpdHk9InNoYTI1Ni10aUpQUTJPMDR6L3BaL0F3ZHlJZ2hyT016ZXdmK1BJdkVsMVlLYlF2c1prPSIKICAgICAgICAgICAgY3Jvc3NvcmlnaW49ImFub255bW91cyIKICAgICAgICAgICAgcmVmZXJyZXJwb2xpY3k9Im5vLXJlZmVycmVyIgogICAgICAgIC8+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICBodG1sLAogICAgICAgICAgICBib2R5LAogICAgICAgICAgICAjY29udGFpbmVyIHsKICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICAgICAgICAgICAgICAgIGxlZnQ6IDA7CiAgICAgICAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsKICAgICAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgICAgICAgICB9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KICAgICAgICA8ZGl2IGlkPSJjb250YWluZXIiPjwvZGl2PgogICAgICAgIDxzY3JpcHQKICAgICAgICAgICAgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21vbmFjby1lZGl0b3JAMC41MC4wL21pbi92cy9sb2FkZXIuanMiCiAgICAgICAgICAgIGludGVncml0eT0ic2hhMjU2LUtjVTQ4VEdyODRyN3VuRjdKNUlnQm85NWFlVnJFYnJHZTA0UzdUY0ZVanM9IgogICAgICAgICAgICBjcm9zc29yaWdpbj0iYW5vbnltb3VzIgogICAgICAgICAgICByZWZlcnJlcnBvbGljeT0ibm8tcmVmZXJyZXIiCiAgICAgICAgPjwvc2NyaXB0PgoKICAgICAgICA8c2NyaXB0PgogICAgICAgICAgICByZXF1aXJlLmNvbmZpZyh7CiAgICAgICAgICAgICAgICBwYXRoczogewogICAgICAgICAgICAgICAgICAgIHZzOiAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tb25hY28tZWRpdG9yQDAuNTAuMC9taW4vdnMiLAogICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgfSk7CgogICAgICAgICAgICByZXF1aXJlKFsidnMvZWRpdG9yL2VkaXRvci5tYWluIl0sICgpID0+IHsKICAgICAgICAgICAgICAgIGdldEN1cnJlbnRDc3MoKS50aGVuKChjc3MpID0+IHsKICAgICAgICAgICAgICAgICAgICB2YXIgZWRpdG9yID0gbW9uYWNvLmVkaXRvci5jcmVhdGUoCiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb250YWluZXIiKSwKICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNzcywKICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiAiY3NzIiwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW1lOiBnZXRUaGVtZSgpLAogICAgICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICAgICAgKTsKICAgICAgICAgICAgICAgICAgICBlZGl0b3Iub25EaWRDaGFuZ2VNb2RlbENvbnRlbnQoKCkgPT4KICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q3NzKGVkaXRvci5nZXRWYWx1ZSgpKQogICAgICAgICAgICAgICAgICAgICk7CiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoInJlc2l6ZSIsICgpID0+IHsKICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBtb25hY28gcmUtbGF5b3V0CiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5sYXlvdXQoKTsKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIH0pOwogICAgICAgICAgICB9KTsKICAgICAgICA8L3NjcmlwdD4KICAgIDwvYm9keT4KPC9odG1sPgo="});function Fn(){ye.ipcMain.handle("VencordCspRemoveOverride",hi),ye.ipcMain.handle("VencordCspRequestAddOverride",fi),ye.ipcMain.handle("VencordCspIsDomainAllowed",pi)}function li(t,e){try{let{host:n}=new URL(t);if(/[;'"\\]/.test(n))return!1}catch{return!1}return!(e.length===0||e.some(n=>!w.includes(n)))}function ui(t,e,n){let r=new URL(t).host,i=`${n} wants to allow connections to ${r}`,o=`Unless you recognise and fully trust ${r}, you should cancel this request!

You will have to fully close and restart Discord for the changes to take effect.`;if(e.length===1&&e[0]==="connect-src")return{message:i,detail:o};let s=e.filter(a=>a!=="connect-src").map(a=>{switch(a){case"img-src":return"Images";case"style-src":return"CSS & Themes";case"font-src":return"Fonts";default:throw new Error(`Illegal CSP directive: ${a}`)}}).sort().join(", ");return o=`The following types of content will be allowed to load from ${r}:
${s}

${o}`,{message:i,detail:o}}async function fi(t,e,n,r){if(!li(e,n))return"invalid";let i=new URL(e).host;if(i in z.store.customCspRules)return"conflict";let{checkboxChecked:o,response:s}=await ye.dialog.showMessageBox({...ui(e,n,r),type:r?"info":"warning",title:"Vencord Host Permissions",buttons:["Cancel","Allow"],defaultId:0,cancelId:0,checkboxLabel:`I fully trust ${i} and understand the risks of allowing connections to it.`,checkboxChecked:!1});return s!==1?"cancelled":o?(z.store.customCspRules[i]=n,"ok"):"unchecked"}function hi(t,e){return e in z.store.customCspRules?(delete z.store.customCspRules[e],!0):!1}function pi(t,e,n){try{let r=new URL(e).host,i=et[r]??z.store.customCspRules[r];return i?n.every(o=>i.includes(o)):!1}catch{return!1}}var ye,Zn=d(()=>{"use strict";c();W();he();ye=require("electron");tt()});function dt(t,e={}){return{fileName:t,name:e.name??t.replace(/\.css$/i,""),author:e.author??"Unknown Author",description:e.description??"A Discord Theme.",version:e.version,license:e.license,source:e.source,website:e.website,invite:e.invite}}function Wn(t){return t.charCodeAt(0)===65279&&(t=t.slice(1)),t}function Hn(t,e){if(!t)return dt(e);let n=t.split("/**",2)?.[1]?.split("*/",1)?.[0];if(!n)return dt(e);let r={},i="",o="";for(let s of n.split(gi))if(s.length!==0)if(s.charAt(0)==="@"&&s.charAt(1)!==" "){r[i]=o.trim();let a=s.indexOf(" ");i=s.substring(1,a),o=s.substring(a+1)}else o+=" "+s.replace("\\n",`
`).replace(di,"@");return r[i]=o.trim(),delete r[""],dt(e,r)}var gi,di,Kn=d(()=>{"use strict";c();gi=/[^\S\r\n]*?\r?(?:\r\n|\n)[^\S\r\n]*?\*[^\S\r\n]?/,di=/^\\@/});function Yn(t){t.webContents.setWindowOpenHandler(({url:e})=>{switch(e){case"about:blank":case"https://discord.com/popout":case"https://ptb.discord.com/popout":case"https://canary.discord.com/popout":return{action:"allow"}}try{var{protocol:n}=new URL(e)}catch{return{action:"deny"}}switch(n){case"http:":case"https:":case"mailto:":case"steam:":case"spotify:":$n.shell.openExternal(e)}return{action:"deny"}})}var $n,qn=d(()=>{"use strict";c();$n=require("electron")});function mt(t,e){let n=(0,Ie.normalize)(t+"/"),r=(0,Ie.join)(t,e),i=(0,Ie.normalize)(r);return i.startsWith(n)?i:null}function Jn(){return(0,re.readFile)(pe,"utf-8").catch(()=>"")}async function mi(){let t=await(0,re.readdir)(J).catch(()=>[]),e=[];for(let n of t){if(!n.endsWith(".css"))continue;let r=await Xn(n).then(Wn).catch(()=>null);r!=null&&e.push(Hn(r,n))}return e}function Xn(t){t=t.replace(/\?v=\d+$/,"");let e=mt(J,t);return e?(0,re.readFile)(e,"utf-8"):Promise.reject(`Unsafe path ${t}`)}function Qn(t){let e;(0,re.open)(pe,"a+").then(r=>{r.close(),e=(0,ne.watch)(pe,{persistent:!1},gt(async()=>{t.webContents.postMessage("VencordQuickCssUpdate",await Jn())},50))}).catch(()=>{});let n=(0,ne.watch)(J,{persistent:!1},gt(()=>{t.webContents.postMessage("VencordThemeUpdate",void 0)}));t.once("closed",()=>{e?.close(),n.close()})}var A,ne,re,Ie,vt=d(()=>{"use strict";c();Xt();Gn();W();zn();he();A=require("electron");Bn();ne=require("fs"),re=require("fs/promises"),Ie=require("path");Zn();Kn();ge();qn();(0,ne.mkdirSync)(J,{recursive:!0});Fn();A.ipcMain.handle("VencordOpenQuickCss",()=>A.shell.openPath(pe));A.ipcMain.handle("VencordOpenExternal",(t,e)=>{try{var{protocol:n}=new URL(e)}catch{throw"Malformed URL"}if(!zt.includes(n))throw"Disallowed protocol.";A.shell.openExternal(e)});A.ipcMain.handle("VencordGetQuickCss",()=>Jn());A.ipcMain.handle("VencordSetQuickCss",(t,e)=>(0,ne.writeFileSync)(pe,e));A.ipcMain.handle("VencordGetThemesList",()=>mi());A.ipcMain.handle("VencordGetThemeData",(t,e)=>Xn(e));A.ipcMain.handle("VencordGetThemeSystemValues",()=>({"os-accent-color":`#${A.systemPreferences.getAccentColor?.()||""}`}));A.ipcMain.handle("VencordOpenThemesFolder",()=>A.shell.openPath(J));A.ipcMain.handle("VencordOpenSettingsFolder",()=>A.shell.openPath(ee));A.ipcMain.handle("VencordOpenMonacoEditor",async()=>{let t="Vencord QuickCSS Editor",e=A.BrowserWindow.getAllWindows().find(r=>r.title===t);if(e&&!e.isDestroyed()){e.focus();return}let n=new A.BrowserWindow({title:t,autoHideMenuBar:!0,darkTheme:!0,webPreferences:{preload:(0,Ie.join)(__dirname,"preload.js"),contextIsolation:!0,nodeIntegration:!1,sandbox:!1}});Yn(n),await n.loadURL(`data:text/html;base64,${jn}`)})});function Sr(t,e,n){let r=e;if(e in t)return void n(t[r]);Object.defineProperty(t,e,{set(i){delete t[r],t[r]=i,n(i)},configurable:!0,enumerable:!1})}var br=d(()=>{"use strict";c()});var zi={};function Ui(t,e){let n=t.slice(4).split(".").map(Number),r=e.slice(4).split(".").map(Number);for(let i=0;i<r.length;i++){if(n[i]>r[i])return!0;if(n[i]<r[i])return!1}return!1}function Gi(){if(!process.env.DISABLE_UPDATER_AUTO_PATCHING)try{let t=(0,N.dirname)(process.execPath),e=(0,N.basename)(t),n=(0,N.join)(t,".."),r=(0,R.readdirSync)(n).reduce((a,l)=>l.startsWith("app-")&&Ui(l,a)?l:a,e);if(r===e)return;let i=(0,N.join)(n,r,"resources"),o=(0,N.join)(i,"app.asar"),s=(0,N.join)(i,"_app.asar");if(!(0,R.existsSync)(o)||(0,R.statSync)(o).isDirectory())return;console.info("[Vencord] Detected Host Update. Repatching..."),(0,R.renameSync)(o,s),(0,R.mkdirSync)(o),(0,R.writeFileSync)((0,N.join)(o,"package.json"),JSON.stringify({name:"discord",main:"index.js"})),(0,R.writeFileSync)((0,N.join)(o,"index.js"),`require(${JSON.stringify((0,N.join)(__dirname,"patcher.js"))});`)}catch(t){console.error("[Vencord] Failed to repatch latest host update",t)}}var Tr,R,N,xr=d(()=>{"use strict";c();Tr=require("electron"),R=require("original-fs"),N=require("path");Tr.app.on("before-quit",Gi)});var Zi={};var T,X,ji,Bi,bt,Fi,Er=d(()=>{"use strict";c();br();T=Lt(require("electron")),X=require("path");vt();W();ge();console.log("[Vencord] Starting up...");ji=require.main.filename,Bi=require.main.path.endsWith("app.asar")?"_app.asar":"app.asar",bt=(0,X.join)((0,X.dirname)(ji),"..",Bi),Fi=require((0,X.join)(bt,"package.json"));require.main.filename=(0,X.join)(bt,Fi.main);T.app.setAppPath(bt);if(Le)console.log("[Vencord] Running in vanilla mode. Not loading Vencord");else{let t=P.store;if(xr(),t.winCtrlQ){let i=T.Menu.buildFromTemplate;T.Menu.buildFromTemplate=function(o){if(o[0]?.label==="&File"){let{submenu:s}=o[0];Array.isArray(s)&&s.push({label:"Quit (Hidden)",visible:!1,acceleratorWorksWhenHidden:!0,accelerator:"Control+Q",click:()=>T.app.quit()})}return i.call(this,o)}}class e extends T.default.BrowserWindow{constructor(o){if(o?.webPreferences?.preload&&o.title){let s=o.webPreferences.preload;o.webPreferences.preload=(0,X.join)(__dirname,"preload.js"),o.webPreferences.sandbox=!1,o.webPreferences.backgroundThrottling=!1,t.frameless?o.frame=!1:t.winNativeTitleBar&&delete o.frame,t.transparent&&(o.transparent=!0,o.backgroundColor="#00000000"),t.disableMinSize&&(o.minWidth=0,o.minHeight=0),!1&&(o.backgroundColor="#00000000",t.macosVibrancyStyle&&(o.vibrancy=t.macosVibrancyStyle)),process.env.DISCORD_PRELOAD=s,super(o),t.disableMinSize&&(this.setMinimumSize=(l,m)=>{}),Qn(this)}else super(o)}}Object.assign(e,T.default.BrowserWindow),Object.defineProperty(e,"name",{value:"BrowserWindow",configurable:!0});let n=require.resolve("electron");delete require.cache[n].exports,require.cache[n].exports={...T.default,BrowserWindow:e},Sr(global,"appSettings",i=>{i.set("DANGEROUS_ENABLE_DEVTOOLS_ONLY_ENABLE_IF_YOU_KNOW_WHAT_YOURE_DOING",!0)}),process.env.DATA_DIR=(0,X.join)(T.app.getPath("userData"),"..","Vencord");let r=T.app.commandLine.appendSwitch;T.app.commandLine.appendSwitch=function(...i){if(i[0]==="disable-features"){let o=new Set((i[1]??"").split(","));o.add("WidgetLayering"),o.add("UseEcoQoSForBackgroundProcess"),i[1]+=[...o].join(",")}return r.apply(this,i)},T.app.commandLine.appendSwitch("disable-renderer-backgrounding"),T.app.commandLine.appendSwitch("disable-background-timer-throttling"),T.app.commandLine.appendSwitch("disable-backgrounding-occluded-windows")}console.log("[Vencord] Loading original Discord app.asar");require(require.main.filename)});c();var oe=require("electron"),Dr=require("path"),Tt=require("url");tt();vt();W();ge();c();var Ar=require("electron");c();var nr=require("module"),vi=(0,nr.createRequire)("/"),Ue,yi=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Ue=vi("worker_threads").Worker}catch{}var Ii=Ue?function(t,e,n,r,i){var o=!1,s=new Ue(t+yi,{eval:!0}).on("error",function(a){return i(a,null)}).on("message",function(a){return i(null,a)}).on("exit",function(a){a&&!o&&i(new Error("exited with code "+a),null)});return s.postMessage(n,r),s.terminate=function(){return o=!0,Ue.prototype.terminate.call(s)},s}:function(t,e,n,r,i){setImmediate(function(){return i(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var o=function(){};return{terminate:o,postMessage:o}},D=Uint8Array,ie=Uint16Array,rr=Int32Array,At=new D([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ct=new D([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ir=new D([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),or=function(t,e){for(var n=new ie(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var i=new rr(n[30]),r=1;r<30;++r)for(var o=n[r];o<n[r+1];++o)i[o]=o-n[r]<<5|r;return{b:n,r:i}},sr=or(At,2),wt=sr.b,Ai=sr.r;wt[28]=258,Ai[258]=28;var ar=or(Ct,0),cr=ar.b,Cs=ar.r,je=new ie(32768);for(v=0;v<32768;++v)K=(v&43690)>>1|(v&21845)<<1,K=(K&52428)>>2|(K&13107)<<2,K=(K&61680)>>4|(K&3855)<<4,je[v]=((K&65280)>>8|(K&255)<<8)>>1;var K,v,Ae=function(t,e,n){for(var r=t.length,i=0,o=new ie(e);i<r;++i)t[i]&&++o[t[i]-1];var s=new ie(e);for(i=1;i<e;++i)s[i]=s[i-1]+o[i-1]<<1;var a;if(n){a=new ie(1<<e);var l=15-e;for(i=0;i<r;++i)if(t[i])for(var m=i<<4|t[i],g=e-t[i],u=s[t[i]-1]++<<g,y=u|(1<<g)-1;u<=y;++u)a[je[u]>>l]=m}else for(a=new ie(r),i=0;i<r;++i)t[i]&&(a[i]=je[s[t[i]-1]++]>>15-t[i]);return a},Re=new D(288);for(v=0;v<144;++v)Re[v]=8;var v;for(v=144;v<256;++v)Re[v]=9;var v;for(v=256;v<280;++v)Re[v]=7;var v;for(v=280;v<288;++v)Re[v]=8;var v,lr=new D(32);for(v=0;v<32;++v)lr[v]=5;var v;var ur=Ae(Re,9,1);var fr=Ae(lr,5,1),Ge=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},L=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},ze=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},hr=function(t){return(t+7)/8|0},Be=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new D(t.subarray(e,n))};var pr=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],E=function(t,e,n){var r=new Error(e||pr[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,E),!n)throw r;return r},gr=function(t,e,n,r){var i=t.length,o=r?r.length:0;if(!i||e.f&&!e.l)return n||new D(0);var s=!n,a=s||e.i!=2,l=e.i;s&&(n=new D(i*3));var m=function(Ot){var kt=n.length;if(Ot>kt){var _t=new D(Math.max(kt*2,Ot));_t.set(n),n=_t}},g=e.f||0,u=e.p||0,y=e.b||0,G=e.l,se=e.d,F=e.m,O=e.n,k=i*8;do{if(!G){g=L(t,u,1);var $=L(t,u+1,3);if(u+=3,$)if($==1)G=ur,se=fr,F=9,O=5;else if($==2){var we=L(t,u,31)+257,Oe=L(t,u+10,15)+4,Q=we+L(t,u+5,31)+1;u+=14;for(var _=new D(Q),ce=new D(19),S=0;S<Oe;++S)ce[ir[S]]=L(t,u+S*3,7);u+=Oe*3;for(var Se=Ge(ce),Pr=(1<<Se)-1,Rr=Ae(ce,Se,1),S=0;S<Q;){var xt=Rr[L(t,u,Pr)];u+=xt&15;var x=xt>>4;if(x<16)_[S++]=x;else{var le=0,ke=0;for(x==16?(ke=3+L(t,u,3),u+=2,le=_[S-1]):x==17?(ke=3+L(t,u,7),u+=3):x==18&&(ke=11+L(t,u,127),u+=7);ke--;)_[S++]=le}}var Et=_.subarray(0,we),Y=_.subarray(we);F=Ge(Et),O=Ge(Y),G=Ae(Et,F,1),se=Ae(Y,O,1)}else E(1);else{var x=hr(u)+4,Z=t[x-4]|t[x-3]<<8,ae=x+Z;if(ae>i){l&&E(0);break}a&&m(y+Z),n.set(t.subarray(x,ae),y),e.b=y+=Z,e.p=u=ae*8,e.f=g;continue}if(u>k){l&&E(0);break}}a&&m(y+131072);for(var Or=(1<<F)-1,kr=(1<<O)-1,Fe=u;;Fe=u){var le=G[ze(t,u)&Or],ue=le>>4;if(u+=le&15,u>k){l&&E(0);break}if(le||E(2),ue<256)n[y++]=ue;else if(ue==256){Fe=u,G=null;break}else{var Dt=ue-254;if(ue>264){var S=ue-257,be=At[S];Dt=L(t,u,(1<<be)-1)+wt[S],u+=be}var Ze=se[ze(t,u)&kr],We=Ze>>4;Ze||E(3),u+=Ze&15;var Y=cr[We];if(We>3){var be=Ct[We];Y+=ze(t,u)&(1<<be)-1,u+=be}if(u>k){l&&E(0);break}a&&m(y+131072);var Pt=y+Dt;if(y<Y){var Rt=o-Y,_r=Math.min(Y,Pt);for(Rt+y<0&&E(3);y<_r;++y)n[y]=r[Rt+y]}for(;y<Pt;++y)n[y]=n[y-Y]}}e.l=G,e.p=Fe,e.b=y,e.f=g,G&&(g=1,e.m=F,e.d=se,e.n=O)}while(!g);return y!=n.length&&s?Be(n,0,y):n.subarray(0,y)};var Ci=new D(0);var wi=function(t,e){var n={};for(var r in t)n[r]=t[r];for(var r in e)n[r]=e[r];return n},er=function(t,e,n){for(var r=t(),i=t.toString(),o=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/\s+/g,"").split(","),s=0;s<r.length;++s){var a=r[s],l=o[s];if(typeof a=="function"){e+=";"+l+"=";var m=a.toString();if(a.prototype)if(m.indexOf("[native code]")!=-1){var g=m.indexOf(" ",8)+1;e+=m.slice(g,m.indexOf("(",g))}else{e+=m;for(var u in a.prototype)e+=";"+l+".prototype."+u+"="+a.prototype[u].toString()}else e+=m}else n[l]=a}return e},Ve=[],Si=function(t){var e=[];for(var n in t)t[n].buffer&&e.push((t[n]=new t[n].constructor(t[n])).buffer);return e},bi=function(t,e,n,r){if(!Ve[n]){for(var i="",o={},s=t.length-1,a=0;a<s;++a)i=er(t[a],i,o);Ve[n]={c:er(t[s],i,o),e:o}}var l=wi({},Ve[n].e);return Ii(Ve[n].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+e.toString()+"}",n,l,Si(l),r)},Ti=function(){return[D,ie,rr,At,Ct,ir,wt,cr,ur,fr,je,pr,Ae,Ge,L,ze,hr,Be,E,gr,St,dr,mr]};var dr=function(t){return postMessage(t,[t.buffer])},mr=function(t){return t&&{out:t.size&&new D(t.size),dictionary:t.dictionary}},xi=function(t,e,n,r,i,o){var s=bi(n,r,i,function(a,l){s.terminate(),o(a,l)});return s.postMessage([t,e],e.consume?[t.buffer]:[]),function(){s.terminate()}};var j=function(t,e){return t[e]|t[e+1]<<8},U=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},yt=function(t,e){return U(t,e)+U(t,e+4)*4294967296};function Ei(t,e,n){return n||(n=e,e={}),typeof n!="function"&&E(7),xi(t,e,[Ti],function(r){return dr(St(r.data[0],mr(r.data[1])))},1,n)}function St(t,e){return gr(t,{i:2},e&&e.out,e&&e.dictionary)}var It=typeof TextDecoder<"u"&&new TextDecoder,Di=0;try{It.decode(Ci,{stream:!0}),Di=1}catch{}var Pi=function(t){for(var e="",n=0;;){var r=t[n++],i=(r>127)+(r>223)+(r>239);if(n+i>t.length)return{s:e,r:Be(t,n-1)};i?i==3?(r=((r&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|r>>10,56320|r&1023)):i&1?e+=String.fromCharCode((r&31)<<6|t[n++]&63):e+=String.fromCharCode((r&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(r)}};function Ri(t,e){if(e){for(var n="",r=0;r<t.length;r+=16384)n+=String.fromCharCode.apply(null,t.subarray(r,r+16384));return n}else{if(It)return It.decode(t);var i=Pi(t),o=i.s,n=i.r;return n.length&&E(8),o}}var Oi=function(t,e){return e+30+j(t,e+26)+j(t,e+28)},ki=function(t,e,n){var r=j(t,e+28),i=Ri(t.subarray(e+46,e+46+r),!(j(t,e+8)&2048)),o=e+46+r,s=U(t,e+20),a=n&&s==4294967295?_i(t,o):[s,U(t,e+24),U(t,e+42)],l=a[0],m=a[1],g=a[2];return[j(t,e+10),l,m,i,o+j(t,e+30)+j(t,e+32),g]},_i=function(t,e){for(;j(t,e)!=1;e+=4+j(t,e+2));return[yt(t,e+12),yt(t,e+4),yt(t,e+20)]};var tr=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(t){t()};function vr(t,e,n){n||(n=e,e={}),typeof n!="function"&&E(7);var r=[],i=function(){for(var O=0;O<r.length;++O)r[O]()},o={},s=function(O,k){tr(function(){n(O,k)})};tr(function(){s=n});for(var a=t.length-22;U(t,a)!=101010256;--a)if(!a||t.length-a>65558)return s(E(13,0,1),null),i;var l=j(t,a+8);if(l){var m=l,g=U(t,a+16),u=g==4294967295||m==65535;if(u){var y=U(t,a-12);u=U(t,y)==101075792,u&&(m=l=U(t,y+32),g=U(t,y+48))}for(var G=e&&e.filter,se=function(O){var k=ki(t,g,u),$=k[0],x=k[1],Z=k[2],ae=k[3],we=k[4],Oe=k[5],Q=Oi(t,Oe);g=we;var _=function(S,Se){S?(i(),s(S,null)):(Se&&(o[ae]=Se),--l||s(null,o))};if(!G||G({name:ae,size:x,originalSize:Z,compression:$}))if(!$)_(null,Be(t,Q,Q+x));else if($==8){var ce=t.subarray(Q,Q+x);if(Z<524288||x>.8*Z)try{_(null,St(ce,{out:new D(Z)}))}catch(S){_(S,null)}else r.push(Ei(ce,{size:Z},_))}else _(E(14,"unknown compression type "+$,1),null);else _(null,null)},F=0;F<m;++F)se(F)}else s(null,{});return i}var Cr=require("fs"),B=require("fs/promises"),Ce=require("path");ge();c();function yr(t){function e(s,a,l,m){let g=0;return g+=s<<0,g+=a<<8,g+=l<<16,g+=m<<24>>>0,g}if(t[0]===80&&t[1]===75&&t[2]===3&&t[3]===4)return t;if(t[0]!==67||t[1]!==114||t[2]!==50||t[3]!==52)throw new Error("Invalid header: Does not start with Cr24");let n=t[4]===3,r=t[4]===2;if(!r&&!n||t[5]||t[6]||t[7])throw new Error("Unexpected crx format version number.");if(r){let s=e(t[8],t[9],t[10],t[11]),a=e(t[12],t[13],t[14],t[15]),l=16+s+a;return t.subarray(l,t.length)}let o=12+e(t[8],t[9],t[10],t[11]);return t.subarray(o,t.length)}c();var Mi=require("original-fs");async function Li(t,e){try{var n=await fetch(t,e)}catch(i){throw i instanceof Error&&i.cause&&(i=i.cause),new Error(`${e?.method??"GET"} ${t} failed: ${i}`)}if(n.ok)return n;let r=`${e?.method??"GET"} ${t}: ${n.status} ${n.statusText}`;try{let i=await n.text();r+=`
${i}`}catch{}throw new Error(r)}async function Ir(t,e){let r=await(await Li(t,e)).arrayBuffer();return Buffer.from(r)}var Ni=(0,Ce.join)(Me,"ExtensionCache");async function Vi(t,e){return await(0,B.mkdir)(e,{recursive:!0}),new Promise((n,r)=>{vr(t,(i,o)=>{if(i)return void r(i);Promise.all(Object.keys(o).map(async s=>{if(s.startsWith("_metadata/"))return;if(s.endsWith("/"))return void(0,B.mkdir)((0,Ce.join)(e,s),{recursive:!0});let a=s.split("/"),l=a.pop(),m=a.join("/"),g=(0,Ce.join)(e,m);m&&await(0,B.mkdir)(g,{recursive:!0}),await(0,B.writeFile)((0,Ce.join)(g,l),o[s])})).then(()=>n()).catch(s=>{(0,B.rm)(e,{recursive:!0,force:!0}),r(s)})})})}async function wr(t){let e=(0,Ce.join)(Ni,`${t}`);try{await(0,B.access)(e,Cr.constants.F_OK)}catch{let r=`https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${t}%26uc&prodversion=${process.versions.chrome}`,i=await Ir(r,{headers:{"User-Agent":`Electron ${process.versions.electron} ~ Vencord (https://github.com/Vendicated/Vencord)`}});await Vi(yr(i),e).catch(o=>console.error(`Failed to extract extension ${t}`,o))}Ar.session.defaultSession.loadExtension(e)}Le||oe.app.whenReady().then(()=>{oe.protocol.handle("vencord",({url:t})=>{let e=decodeURI(t).slice(10).replace(/\?v=\d+$/,"");if(e.endsWith("/")&&(e=e.slice(0,-1)),e.startsWith("/themes/")){let n=e.slice(8),r=mt(J,n);return r?oe.net.fetch((0,Tt.pathToFileURL)(r).toString()):new Response(null,{status:404})}switch(e){case"renderer.js.map":case"vencordDesktopRenderer.js.map":case"preload.js.map":case"vencordDesktopPreload.js.map":case"patcher.js.map":case"vencordDesktopMain.js.map":return oe.net.fetch((0,Tt.pathToFileURL)((0,Dr.join)(__dirname,e)).toString());default:return new Response(null,{status:404})}});try{P.store.enableReactDevtools&&wr("fmkadmapgofadopljbjfkapdkoienihi").then(()=>console.info("[Vencord] Installed React Developer Tools")).catch(t=>console.error("[Vencord] Failed to install React Developer Tools",t))}catch{}Wt()});Er();
//# sourceURL=file:///VencordPatcher
//# sourceMappingURL=vencord://patcher.js.map
/*! For license information please see patcher.js.LEGAL.txt */
