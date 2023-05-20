(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const E=document.querySelector(".switch"),h=document.querySelector(".switch input");function _(){document.body.classList.toggle("dark-mode"),localStorage.setItem("darkMode","enabled")}function x(){document.body.classList.remove("dark-mode"),localStorage.setItem("darkMode","disabled")}const T="https://api.dictionaryapi.dev/api/v2/entries/en/";function S(){return window.location.pathname.slice(1)}function C(e){window.history.pushState({},"",`/${e}`)}const r=document.querySelector(".definitions"),y=document.querySelector("form.search__form"),f=r.querySelector(".definitions__head"),M=r.querySelector(".definitions__body"),c=document.querySelector(".search__input__validation-message"),l=document.querySelector(".lds-dual-ring");y.addEventListener("submit",async e=>{e.preventDefault();const t=e.target.word,n=t.value;C(n),t.addEventListener("input",()=>{W(t)}),A(t)&&(m(n),y.reset())});async function m(e){l.classList.add("active");const[t,n]=await q(e);if(n){v(),U(n,f),l.classList.remove("active");return}if(v(),l.classList.remove("active"),t.length>1){const{word:i,phonetics:o}=t[0];L(i,o);for(const s of t){const{meanings:a,sourceUrls:d}=s;g(a,d)}}else{const{word:i,meanings:o,phonetics:s,sourceUrls:a}=t[0];L(i,s),g(o,a)}}async function q(e){const t=`${T}${e}`,n=await fetch(t);return n.status===404?[void 0,await n.json()]:[await n.json(),void 0]}function L(e,t){const n=document.createElement("h1");t=t.filter(i=>i.audio!==""),n.innerText=e,f.appendChild(n);for(const i of t){const o=k(i);o.classList.add("phonetic-and-audio"),f.appendChild(o)}}function v(){b(),D()}function b(){const e=r.querySelector(".definitions__head");e.innerHTML=""}function D(){M.innerHTML=""}function I(e){const t=document.createElement("span");return t.innerText=e,t.classList.add("phonetic-and-audio__text"),t}function P(e){const t=document.createElement("div"),n=document.createElement("div");n.appendChild(t),n.classList.add("play-button--wrapper"),t.classList.add("play-button");const i=document.createElement("audio");return i.src=e,t.addEventListener("click",()=>{i.play()}),n}function k(e){const t=document.createElement("div"),n=I(e.text??"---"),i=P(e.audio);return t.appendChild(n),t.appendChild(i),t}function A(e){return e.value.length<1?(c.innerText="Please enter a word",c.classList.remove("search__input__validation-message--hidden"),c.classList.add("search__input__validation-message--visible"),e.classList.add("search__input--invalid"),!1):!0}function W(e){e.classList.contains("search__input--invalid")&&e.value.length>0&&(c.classList.remove("search__input__validation-message--visible"),c.classList.add("search__input__validation-message--hidden"),e.classList.remove("search__input--invalid"))}function g(e,t){const n=r.querySelector(".definitions__body");for(const i of e){const{partOfSpeech:o,definitions:s,synonyms:a}=i;O(o,n);const d=document.createElement("h3");d.innerText="Meaning",d.classList.add("definitions__title"),n.appendChild(d),F(s,n),B(a,n)}H(t,n),r.appendChild(n)}function H(e,t){const n=document.createElement("div");n.classList.add("sources");for(const i of e){const o=document.createElement("p"),s=document.createElement("a"),a=document.createElement("img");a.src="./icon-new-window.svg",a.alt="new window icon",a.classList.add("new-window-icon"),s.href=i,s.target="_blank",s.appendChild(a),o.innerText=`${i}`,o.classList.add("source"),o.appendChild(s),n.appendChild(o)}t.appendChild(n)}function O(e,t){const n=document.createElement("h2");n.innerText=e,n.classList.add("part-of-speech"),t.appendChild(n)}function F(e,t){const n=document.createElement("ul");n.classList.add("definition-list");for(const i of e){const o=document.createElement("li");if(o.innerText=i.definition,i.example!==void 0){const a=document.createElement("p");a.innerHTML=`<q>${i.example}</q>`,a.classList.add("example"),o.appendChild(a)}n.appendChild(o)}t.appendChild(n)}function B(e,t){let n=e.join(", ");if(n!==""){const i=document.createElement("span");i.innerText=n,i.classList.add("synonym"),t.appendChild(i)}}function U(e,t){const n=document.createElement("div");n.classList.add("not-found");const i=document.createElement("h1");i.classList.add("not-found__title");const o=document.createElement("h2");o.classList.add("not-found__message");const s=document.createElement("p");s.classList.add("not-found__resolution"),o.innerText=e.message,s.innerText=e.resolution,i.innerText=e.title,n.append(i,o,s),t.appendChild(n)}document.querySelector(".nav__dropdown");const w=document.querySelector(".nav__dropdown__list"),u=document.querySelector("#selected__font"),$=document.querySelectorAll(".nav__dropdown__list__item");for(const e of $)e.addEventListener("click",()=>{e.innerText==="Mono"?(p("Inconsolata"),u.innerText="Mono"):e.innerText==="Sans Serif"?(p("Inter"),u.innerText="Sans Serif"):(p("Lora"),u.innerText="Serif")});function p(e){document.documentElement.style.setProperty("--font-family",e)}document.addEventListener("DOMContentLoaded",async()=>{const e=S();e&&await m(e),E.addEventListener("click",()=>{h.checked?_():x()}),localStorage.getItem("darkMode")==="enabled"&&(_(),h.checked=!0)});document.addEventListener("click",e=>{const t=e.target.matches("[data-dropdown-selected]");!t&&e.target.closest("[data-dropdown]")!=null||(t&&w.classList.toggle("active"),t||w.classList.remove("active"))});window.addEventListener("popstate",async e=>{e.currentTarget.location.pathname;const t=S();await m(t)});
