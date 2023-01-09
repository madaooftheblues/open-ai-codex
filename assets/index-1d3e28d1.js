(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const m="/open-ai-codex/assets/bot-61bdb6bf.svg",p="/open-ai-codex/assets/user-bcdeb18e.svg",c=document.getElementById("form"),a=document.getElementById("chat_container");let l;function g(t){t.textContent="",l=setInterval(()=>{t.textContent+=".",t.textContent==="...."&&(t.textContent="")},300)}function h(t,n){let r=0,s=setInterval(()=>{if(r>=n.length){clearInterval(s);return}t.textContent+=n.charAt(r),r++},20)}function v(){const t=Date.now(),r=Math.random().toString(16);return`id-${t}-${r}`}function d(t,n,r){return`
  <div class="wrapper ${t&&"ai"}" >
    <div class="chat">
      <div class="profile"> 
        <img
          src="${t?m:p}" 
          alt="${t?"ai":"user"}"
        /> 
      </div>
      <div class="message" id="${r}">${n}</div>
    </div>
  </div>
  `}const u=async t=>{t.preventDefault();const n=new FormData(c);a.innerHTML+=d(!1,n.get("prompt")),c.reset();const r=v();a.innerHTML+=d(!0," ",r),a.scrollTop=a.scrollHeight;const s=document.getElementById(r);g(s);const e=await fetch("http://localhost:5000",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:n.get("prompt")})});if(clearInterval(l),s.innerHTML="",!e.ok){const f=await e.text();s.innerHTML="Unable to connect...",alert(f);return}const i=(await e.json()).bot.trim();h(s,i)};c.addEventListener("submit",u);c.addEventListener("keyup",t=>{t.key==="Enter"&&u(t)});
