(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const s of c.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();const m=document.getElementById("search-form"),h=document.getElementById("search-input"),p=document.querySelector("#today"),d=document.querySelector("#forecast"),a=document.getElementById("history"),y=document.getElementById("search-title"),l=document.getElementById("weather-img"),g=document.getElementById("temp"),w=document.getElementById("wind"),b=document.getElementById("humidity"),f="http://localhost:3001",L=async t=>{try{const e=await fetch(`${f}/api/weather/`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({city:t})});if(!e.ok)throw new Error(`API Error: ${e.statusText}`);const n=await e.json();if(console.log("weatherData:",n),!n.current)throw new Error('Weather data is missing "current" field.');A(n.current),B(n.forecast)}catch(e){console.error("Error fetching weather:",e)}},v=async()=>await fetch(`${f}/api/weather/history`,{method:"GET",headers:{"Content-Type":"application/json"}}),S=async t=>{await fetch(`${f}/api/weather/history/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json"}})},A=t=>{const{city:e,date:n,icon:o,iconDescription:r,tempF:c,windSpeed:s,humidity:i}=t;y.textContent=`${e} (${n})`,l.setAttribute("src",`https://openweathermap.org/img/w/${o}.png`),l.setAttribute("alt",r),l.setAttribute("class","weather-img"),y.append(l),g.textContent=`Temp: ${c}°F`,w.textContent=`Wind: ${s} MPH`,b.textContent=`Humidity: ${i} %`,p&&(p.innerHTML="",p.append(y,g,w,b))},B=t=>{const e=document.createElement("div"),n=document.createElement("h4");e.setAttribute("class","col-12"),n.textContent="5-Day Forecast:",e.append(n),d&&(d.innerHTML="",d.append(e));for(let o=0;o<t.length;o++)T(t[o])},T=t=>{const{date:e,icon:n,iconDescription:o,tempF:r,windSpeed:c,humidity:s}=t,{col:i,cardTitle:C,weatherIcon:E,tempEl:I,windEl:x,humidityEl:H}=D();C.textContent=e,E.setAttribute("src",`https://openweathermap.org/img/w/${n}.png`),E.setAttribute("alt",o),I.textContent=`Temp: ${r} °F`,x.textContent=`Wind: ${c} MPH`,H.textContent=`Humidity: ${s} %`,d&&d.append(i)},$=async t=>{const e=await t.json();if(a){a.innerHTML="",e.length||(a.innerHTML='<p class="text-center">No Previous Search History</p>');for(let n=e.length-1;n>=0;n--){const o=M(e[n]);a.append(o)}}},D=()=>{const t=document.createElement("div"),e=document.createElement("div"),n=document.createElement("div"),o=document.createElement("h5"),r=document.createElement("img"),c=document.createElement("p"),s=document.createElement("p"),i=document.createElement("p");return t.append(e),e.append(n),n.append(o,r,c,s,i),t.classList.add("col-auto"),e.classList.add("forecast-card","card","text-white","bg-primary","h-100"),n.classList.add("card-body","p-2"),o.classList.add("card-title"),c.classList.add("card-text"),s.classList.add("card-text"),i.classList.add("card-text"),{col:t,cardTitle:o,weatherIcon:r,tempEl:c,windEl:s,humidityEl:i}},P=t=>{const e=document.createElement("button");return e.setAttribute("type","button"),e.setAttribute("aria-controls","today forecast"),e.classList.add("history-btn","btn","btn-secondary","col-10"),e.textContent=t,e},F=()=>{const t=document.createElement("button");return t.setAttribute("type","button"),t.classList.add("fas","fa-trash-alt","delete-city","btn","btn-danger","col-2"),t.addEventListener("click",W),t},O=()=>{const t=document.createElement("div");return t.classList.add("display-flex","gap-2","col-12","m-1"),t},M=t=>{const e=P(t.name),n=F();n.dataset.city=JSON.stringify(t);const o=O();return o.append(e,n),o},N=t=>{if(t.preventDefault(),!h.value)throw new Error("City cannot be blank");const e=h.value.trim();L(e).then(()=>{u()}),h.value=""},j=t=>{if(t.target.matches(".history-btn")){const e=t.target.textContent;L(e).then(u)}},W=t=>{t.stopPropagation();const e=JSON.parse(t.target.getAttribute("data-city")).id;S(e).then(u)},u=()=>v().then($);m==null||m.addEventListener("submit",N);a==null||a.addEventListener("click",j);u();
