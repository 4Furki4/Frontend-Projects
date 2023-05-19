(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const g=document.querySelector(".switch"),p=document.querySelector(".switch input");function f(){document.body.classList.toggle("dark-mode"),localStorage.setItem("darkMode","enabled")}function S(){document.body.classList.remove("dark-mode"),localStorage.setItem("darkMode","disabled")}const w="https://api.dictionaryapi.dev/api/v2/entries/en/",r=document.querySelector(".definitions"),m=document.querySelector("form.search__form"),a=document.querySelector(".search__input__validation-message"),h=document.querySelector(".lds-dual-ring");m.addEventListener("submit",async e=>{e.preventDefault();const t=e.target.word;t.addEventListener("input",()=>{I(t)});const n=t.value;if(!D(t))return;h.classList.add("active");const i=await E(n);if(x(),h.classList.remove("active"),i.length>1){const{word:o,phonetics:s}=i[0];y(o,s);for(const d of i){const{meanings:c,sourceUrls:L}=d;_(c,L)}}else{const{word:o,meanings:s,phonetics:d,sourceUrls:c}=i[0];y(o,d),_(s,c)}m.reset()});async function E(e){const t=`${w}${e}`;return await(await fetch(t)).json()}function y(e,t){const n=r.querySelector(".definitions__head"),i=document.createElement("h1");t=t.filter(o=>o.audio!==""),i.innerText=e,n.appendChild(i);for(const o of t){const s=T(o);s.classList.add("phonetic-and-audio"),n.appendChild(s)}}function x(){C(),M()}function C(){const e=r.querySelector(".definitions__head");e.innerHTML=""}function M(){const e=r.querySelector(".definitions__body");e.innerHTML=""}function b(e){const t=document.createElement("span");return t.innerText=e,t.classList.add("phonetic-and-audio__text"),t}function q(e){const t=document.createElement("div"),n=document.createElement("div");n.appendChild(t),n.classList.add("play-button--wrapper"),t.classList.add("play-button");const i=document.createElement("audio");return i.src=e,t.addEventListener("click",()=>{i.play()}),n}function T(e){const t=document.createElement("div"),n=b(e.text??"---"),i=q(e.audio);return t.appendChild(n),t.appendChild(i),t}function D(e){return e.value.length<1?(a.innerText="Please enter a word",a.classList.remove("search__input__validation-message--hidden"),a.classList.add("search__input__validation-message--visible"),e.classList.add("search__input--invalid"),!1):!0}function I(e){e.classList.contains("search__input--invalid")&&e.value.length>0&&(a.classList.remove("search__input__validation-message--visible"),a.classList.add("search__input__validation-message--hidden"),e.classList.remove("search__input--invalid"))}function _(e,t){const n=r.querySelector(".definitions__body");for(const i of e){const{partOfSpeech:o,definitions:s,synonyms:d}=i;A(o,n);const c=document.createElement("h3");c.innerText="Meaning",c.classList.add("definitions__title"),n.appendChild(c),P(s,n),H(d,n)}k(t,n),r.appendChild(n)}function k(e,t){const n=document.createElement("div");n.classList.add("sources");for(const i of e){const o=document.createElement("p"),s=document.createElement("a"),d=document.createElement("img");d.src="./icon-new-window.svg",d.alt="new window icon",d.classList.add("new-window-icon"),s.href=i,s.target="_blank",s.appendChild(d),o.innerText=`${i}`,o.classList.add("source"),o.appendChild(s),n.appendChild(o)}t.appendChild(n)}function A(e,t){const n=document.createElement("h2");n.innerText=e,n.classList.add("part-of-speech"),t.appendChild(n)}function P(e,t){const n=document.createElement("ul");n.classList.add("definition-list");for(const i of e){const o=document.createElement("li");if(o.innerText=i.definition,i.example!==void 0){const d=document.createElement("p");d.innerHTML=`<q>${i.example}</q>`,d.classList.add("example"),o.appendChild(d)}n.appendChild(o)}t.appendChild(n)}function H(e,t){let n=e.join(", ");if(n!==""){const i=document.createElement("span");i.innerText=n,i.classList.add("synonym"),t.appendChild(i)}}document.querySelector(".nav__dropdown");const v=document.querySelector(".nav__dropdown__list"),l=document.querySelector("#selected__font"),O=document.querySelectorAll(".nav__dropdown__list__item");for(const e of O)e.addEventListener("click",()=>{e.innerText==="Mono"?(u("Inconsolata"),l.innerText="Mono"):e.innerText==="Sans Serif"?(u("Inter"),l.innerText="Sans Serif"):(u("Lora"),l.innerText="Serif")});function u(e){document.documentElement.style.setProperty("--font-family",e)}document.addEventListener("DOMContentLoaded",()=>{g.addEventListener("click",()=>{p.checked?f():S()}),localStorage.getItem("darkMode")==="enabled"&&(f(),p.checked=!0)});document.addEventListener("click",e=>{const t=e.target.matches("[data-dropdown-selected]");!t&&e.target.closest("[data-dropdown]")!=null||(t&&v.classList.toggle("active"),t||v.classList.remove("active"))});