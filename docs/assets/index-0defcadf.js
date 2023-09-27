(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const b={"Toronto JS Red":"#ED342F","CN Tower at Night":"#5F1513","Breaking News":"#F8ADAB","Raccon Stripes":"#120606","Downtown Street":"#5C5856","Slushy Snow":"#B9B4AD","Wintery Sky":"#FDF7F8"},g=["#ED342F","#5F1513","#F8ADAB","#120606","#5C5856","#B9B4AD","#FDF7F8"],u=["Toronto JS Red","CN Tower at Night","Breaking News","Raccon Stripes","Downtown Street","Slushy Snow","Wintery Sky"],m="data:text/css;base64,Omhvc3QgewoJZGlzcGxheTogYmxvY2s7Cgljb250YWluOiBjb250ZW50Owp9CgpzbG90IHsKCWRpc3BsYXk6IG5vbmU7Cn0KCmZpZWxkc2V0IHsKCWJvcmRlci1yYWRpdXM6IDAuNXJlbTsKCWJvcmRlcjogdGhpbiBzb2xpZCBjdXJyZW50Y29sb3I7Cn0KCmlucHV0IHsKCWJvcmRlcjogdGhpbiBzb2xpZCBjdXJyZW50Y29sb3I7Cglib3JkZXItcmFkaXVzOiAwLjVyZW07CglwYWRkaW5nOiAwLjNyZW0gMC41cmVtOwp9CgppbnB1dFt0eXBlPSJjb2xvciJdIHsKCXBhZGRpbmc6IDA7Cn0KCmJ1dHRvbiB7Cglib3JkZXI6IHRoaW4gc29saWQgY3VycmVudGNvbG9yOwoJYm9yZGVyLXJhZGl1czogMC41cmVtOwoJcGFkZGluZzogMC4zcmVtIDAuNXJlbTsKfQoKI3dyYXBwZXIgewoJZGlzcGxheTogZmxleDsKCXdpZHRoOiBjbGFtcCgxMHJlbSwgMTAwJSwgNTB2bWluKTsKCWhlaWdodDogY2xhbXAoMTByZW0sIDEwMCUsIDUwdm1pbik7CgltYXJnaW4taW5saW5lOiBhdXRvOwoJdGV4dC1hbGlnbjogY2VudGVyOwp9CgojY29udHJvbHMgewoJbWFyZ2luLWJsb2NrLXN0YXJ0OiAxcmVtOwoJdGV4dC1hbGlnbjogY2VudGVyOwp9CgojY29udHJvbHMgPiAqIHsKCW1hcmdpbi1ibG9jay1zdGFydDogMXJlbTsKCWRpc3BsYXk6IGZsZXg7CglnYXA6IDFyZW07CglwbGFjZS1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7CglmbGV4LXdyYXA6IHdyYXA7Cn0KCiNkb3dubG9hZCB7CgltYXJnaW4tYmxvY2stc3RhcnQ6IDFyZW07CglkaXNwbGF5OiBmbGV4OwoJZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKCWdhcDogMXJlbTsKCXBsYWNlLWl0ZW1zOiBjZW50ZXI7Cn0KCiNkb3dubG9hZCBkaXYgewoJZGlzcGxheTogZmxleDsKCWdhcDogMXJlbTsKCXBsYWNlLWl0ZW1zOiBjZW50ZXI7CglqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKCWZsZXgtd3JhcDogd3JhcDsKfQo=";class p extends HTMLElement{static get observedAttributes(){return["color","width","height","file-name"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
			<link rel="stylesheet" href="${m}"/>

			<div id="wrapper">
				<slot></slot>
			</div>

			<div id="controls">
				<label for="background-color">
					Pick a background color:

					<input id="background-color" list="color-suggestion" type="color" value="${g[0]}"/>
					<datalist id="color-suggestion">
						${g.map(t=>`<option>${t}</option>`).join("")}
					</datalist>
				</label>
			</div>

			<div id="download">
				<details>
					<summary>Download options</summary>

					<fieldset>
						<legend>Dimensions</legend>

						<label for="width">Width</label>
						<input name="width" id="width-input" type="number" step="1" value="${this.width}"/>

						<label for="height">Height</label>
						<input name="height" id="height-input" type="number" step="1" value="${this.height}"/>
					</fieldset>
				</details>

				<div>
					<button type="button" id="download-svg">💾 Download SVG</button>
					<button type="button" id="download-png">💾 Download PNG</button>
				</div>
			</div>
		`}get color(){return this.getAttribute("color")??g[0]}set color(t){this.setAttribute("color",t),this.shadowRoot.querySelector("#background-color")?.setAttribute("value",t),this.shadowRoot.querySelectorAll(".fill-bg-color").forEach(e=>{e.setAttribute("fill",t)}),this.shadowRoot.querySelectorAll(".stroke-bg-color").forEach(e=>{e.setAttribute("stroke",t)}),this.shadowRoot.querySelectorAll(".fill-fg-color").forEach(e=>{e.setAttribute("fill",this.foregroundColor)}),this.shadowRoot.querySelectorAll(".stroke-fg-color").forEach(e=>{e.setAttribute("stroke",this.foregroundColor)}),this.shadowRoot.querySelectorAll(".fill-inverted-fg-color").forEach(e=>{e.setAttribute("fill",this.invertedForegroundColor)}),this.shadowRoot.querySelectorAll(".stroke-inverted-fg-color").forEach(e=>{e.setAttribute("stroke",this.invertedForegroundColor)})}get foregroundColor(){const t=parseInt(this.color.slice(1,3),16),e=parseInt(this.color.slice(3,5),16),o=parseInt(this.color.slice(5,7),16);return t*.299+e*.587+o*.114>186?"#000000":"#ffffff"}get invertedForegroundColor(){return this.foregroundColor==="#ffffff"?"#000000":"#ffffff"}get width(){const t=Number.parseInt(this.getAttribute("width")??"2480");return Number.isNaN(t)?0:t}set width(t){this.setAttribute("width",t.toString())}get height(){const t=Number.parseInt(this.getAttribute("height")??"2480");return Number.isNaN(t)?0:t}set height(t){this.setAttribute("height",t.toString())}get fileName(){const t="image";return this.getAttribute("file-name")??t}set fileName(t){this.setAttribute("file-name",t)}#t(t){const e=this.shadowRoot.querySelector("#wrapper svg")?.cloneNode(!0);t==="png"&&(e.setAttribute("width",this.width.toString()),e.setAttribute("height",this.height.toString()));const o=new XMLSerializer().serializeToString(e),s=`data:image/svg+xml;base64,${btoa(o)}`,i=document.createElement("a");if(i.download=`${this.fileName}.${t}`,i.href=s,t==="svg"){i.click();return}const r=document.createElement("canvas"),l=r.getContext("2d");r.width=this.width,r.height=this.height;const n=new Image;n.onload=()=>{l?.drawImage(n,0,0,r.width,r.height),i.href=r.toDataURL("image/png"),i.click()},n.src=s}connectedCallback(){this.shadowRoot.querySelector("#background-color")?.addEventListener("input",t=>{this.color=t.target.value}),this.shadowRoot.querySelector("#width-input")?.addEventListener("input",t=>{this.width=Number.parseInt(t.target.value)}),this.shadowRoot.querySelector("#height-input")?.addEventListener("input",t=>{this.height=Number.parseInt(t.target.value)}),this.shadowRoot.querySelector("#download-svg")?.addEventListener("click",()=>{this.#t("svg")}),this.shadowRoot.querySelector("#download-png")?.addEventListener("click",()=>{this.#t("png")}),this.shadowRoot.addEventListener("slotchange",async t=>{const o=t.target.assignedElements(),[s]=o.filter(i=>i instanceof HTMLImageElement&&i.src.endsWith(".svg"));if(s){const[i]=s.src.split("/").reverse(),[r=""]=i?.split(".")??[];this.fileName=r;const l=this.shadowRoot.querySelector("#wrapper"),a=await(await fetch(s.src)).text();l.innerHTML=a,[this.color]=g}})}attributeChangedCallback(t,e,o){if(o!==e)switch(t){case"color":this.color=o;break;case"width":this.width=Number.parseInt(o);break;case"height":this.height=Number.parseInt(o);break;case"file-name":this.fileName=o;break}}}customElements.get("downloadable-image")||customElements.define("downloadable-image",p);const w="data:text/css;base64,Omhvc3QgewoJLS1jb2xvcjogYmxhY2s7CgktLXRleHQtY29sb3I6IHdoaXRlOwoJLS1zaXplOiAxMnJlbTsKCglib3gtc2l6aW5nOiBib3JkZXItYm94OwoJd2lkdGg6IHZhcigtLXNpemUpOwoJaGVpZ2h0OiB2YXIoLS1zaXplKTsKCgl0ZXh0LWFsaWduOiBjZW50ZXI7CgoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJbWFyZ2luOiB2YXIoLS1tYXJnaW4taW5saW5lKTsKCXBhZGRpbmc6IHZhcigtLXBhZGRpbmctaW5saW5lKTsKCglib3JkZXItcmFkaXVzOiB2YXIoLS1ib3JkZXItcmFkaXVzKTsKCWJvcmRlci13aWR0aDogdmFyKC0tYm9yZGVyLXdpZHRoKTsKCWJvcmRlci1jb2xvcjogdmFyKC0tYm9yZGVyLWNvbG9yKTsKCWJvcmRlci1zdHlsZTogc29saWQ7CgoJYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3IpOwoJY29sb3I6IHZhcigtLXRleHQtY29sb3IpOwp9Cgpjb2RlIHsgdXNlci1zZWxlY3Q6IGFsbDsgfQo=";class C extends HTMLElement{static get observedAttributes(){return["color"]}#t;constructor(){super(),this.#t=this.attachShadow({mode:"open"}),this.#t.innerHTML=`
			<link rel="stylesheet" href="${w}"/>
			<div id="color-box">
				<h4>"<span id="color-name"></span>"</h4>
				<span><code id="hex-code"></code></span>
				<br/>
				<span>HSL: <code id="h"></code>, <code id="s"></code>, <code id="l"></code></span>
				<br/>
				<span>RGB: <code id="r"></code>, <code id="g"></code>, <code id="b"></code></span>
			</div>
		`}#e(t){const e=parseInt(t.slice(1,3),16),o=parseInt(t.slice(3,5),16),s=parseInt(t.slice(5,7),16);return e*.299+o*.587+s*.114>186?"#000000":"#ffffff"}#o(t){const e=parseInt(t.replace(/^#/ui,""),16),o=e>>16&255,s=e>>8&255,i=e&255;return{red:o,green:s,blue:i}}#i(t){const e=this.#o(t),o=e.red/255,s=e.green/255,i=e.blue/255,r=Math.max(o,s,i),l=Math.min(o,s,i),n=r-l;let a=0,d=0,h=(r+l)/2;if(r!==l){switch(h>.5?d=n/(2-r-l):d=n/(r+l),r){case o:a=(s-i)/n+(s<i?6:0);break;case s:a=(i-o)/n+2;break;case i:a=(o-s)/n+4;break}a/=6}return d=Math.round(d*100),h=Math.round(h*100),a=Math.round(a*360),{hue:a,saturation:d,lightness:h}}#s(){const t=this.getAttribute("color")??"",e=b[t]??t,o=this.#o(e??""),s=this.#i(e??"");this.style.setProperty("--color",e),this.style.setProperty("--text-color",this.#e(e)),this.#t.getElementById("color-name").innerText=u[t]??"",this.#t.getElementById("hex-code").innerText=e,this.#t.getElementById("h").innerText=s.hue.toString(),this.#t.getElementById("s").innerText=s.saturation.toString(),this.#t.getElementById("l").innerText=s.lightness.toString(),this.#t.getElementById("r").innerText=o.red.toString(),this.#t.getElementById("g").innerText=o.green.toString(),this.#t.getElementById("b").innerText=o.blue.toString()}connectedCallback(){this.#s()}attributeChangedCallback(t,e,o){e!==o&&t==="color"&&this.#s()}}customElements.get("color-box")||customElements.define("color-box",C);const f="data:text/css;base64,Omhvc3QgewoJZGlzcGxheTogYmxvY2s7Cgljb250YWluOiBjb250ZW50Owp9CgpzbG90IHsKCWRpc3BsYXk6IG5vbmU7Cn0KCmZpZWxkc2V0IHsKCWJvcmRlci1yYWRpdXM6IDAuNXJlbTsKCWJvcmRlcjogdGhpbiBzb2xpZCBjdXJyZW50Y29sb3I7Cn0KCmlucHV0IHsKCWJvcmRlcjogdGhpbiBzb2xpZCBjdXJyZW50Y29sb3I7Cglib3JkZXItcmFkaXVzOiAwLjVyZW07CglwYWRkaW5nOiAwLjNyZW0gMC41cmVtOwp9CgpidXR0b24gewoJYm9yZGVyOiB0aGluIHNvbGlkIGN1cnJlbnRjb2xvcjsKCWJvcmRlci1yYWRpdXM6IDAuNXJlbTsKCXBhZGRpbmc6IDAuM3JlbSAwLjVyZW07Cn0KCiN3cmFwcGVyIHsKCWRpc3BsYXk6IGZsZXg7Cgl3aWR0aDogY2xhbXAoMTByZW0sIDEwMCUsIDUwdm1pbik7CgloZWlnaHQ6IGNsYW1wKDEwcmVtLCAxMDAlLCA1MHZtaW4pOwoJbWFyZ2luLWlubGluZTogYXV0bzsKCXRleHQtYWxpZ246IGNlbnRlcjsKfQoKI2NvbnRyb2xzIHsKCW1hcmdpbi1ibG9jay1zdGFydDogMXJlbTsKCXRleHQtYWxpZ246IGNlbnRlcjsKfQoKI2NvbnRyb2xzIDo6c2xvdHRlZCgqKSB7CgltYXJnaW4tYmxvY2stc3RhcnQ6IDFyZW07CglkaXNwbGF5OiBmbGV4OwoJZ2FwOiAxcmVtOwoJcGxhY2UtaXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJZmxleC13cmFwOiB3cmFwOwp9CgojZG93bmxvYWQgewoJbWFyZ2luLWJsb2NrLXN0YXJ0OiAxcmVtOwoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CglnYXA6IDFyZW07CglwbGFjZS1pdGVtczogY2VudGVyOwp9CgojZG93bmxvYWQgZGl2IHsKCWRpc3BsYXk6IGZsZXg7CglnYXA6IDFyZW07CglwbGFjZS1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7CglmbGV4LXdyYXA6IHdyYXA7Cn0K";class y extends HTMLElement{static get observedAttributes(){return["width","height","file-name"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
			<link rel="stylesheet" href="${f}"/>

			<div id="wrapper">
				<slot></slot>
			</div>

			<div id="controls">
				<slot name="controls"></slot>
			</div>

			<div id="download">
				<details>
					<summary>Download options</summary>

					<fieldset>
						<legend>Dimensions</legend>

						<label for="width">Width</label>
						<input name="width" id="width-input" type="number" step="1" value="${this.width}"/>

						<label for="height">Height</label>
						<input name="height" id="height-input" type="number" step="1" value="${this.height}"/>
					</fieldset>
				</details>

				<div>
					<button type="button" id="download-svg">💾 Download SVG</button>
					<button type="button" id="download-png">💾 Download PNG</button>
				</div>
			</div>
		`}get width(){const t=Number.parseInt(this.getAttribute("width")??"2480");return Number.isNaN(t)?0:t}set width(t){this.setAttribute("width",t.toString())}get height(){const t=Number.parseInt(this.getAttribute("height")??"2480");return Number.isNaN(t)?0:t}set height(t){this.setAttribute("height",t.toString())}get fileName(){const t="image";return this.getAttribute("file-name")??t}set fileName(t){this.setAttribute("file-name",t)}#t(t){const e=this.shadowRoot.querySelector("#wrapper svg")?.cloneNode(!0);t==="png"&&(e.setAttribute("width",this.width.toString()),e.setAttribute("height",this.height.toString()));const o=new XMLSerializer().serializeToString(e),s=`data:image/svg+xml;base64,${btoa(o)}`,i=document.createElement("a");if(i.download=`${this.fileName}.${t}`,i.href=s,t==="svg"){i.click();return}const r=document.createElement("canvas"),l=r.getContext("2d");r.width=this.width,r.height=this.height;const n=new Image;n.onload=()=>{l?.drawImage(n,0,0,r.width,r.height),i.href=r.toDataURL("image/png"),i.click()},n.src=s}#e(t){t.type==="radio"&&t.checked?this.shadowRoot.querySelectorAll(`svg .${t.name}`).forEach(o=>{o.setAttribute("visibility",o.classList.contains(t.value)?"inherit":"hidden")}):t.type==="text"&&this.shadowRoot.querySelectorAll(`svg .${t.name}`).forEach(o=>{o.textContent=t.value})}connectedCallback(){this.shadowRoot.querySelector("#width-input")?.addEventListener("input",t=>{this.width=Number.parseInt(t.target.value)}),this.shadowRoot.querySelector("#height-input")?.addEventListener("input",t=>{this.height=Number.parseInt(t.target.value)}),this.shadowRoot.querySelector("#download-svg")?.addEventListener("click",()=>{this.#t("svg")}),this.shadowRoot.querySelector("#download-png")?.addEventListener("click",()=>{this.#t("png")}),this.shadowRoot.querySelector("slot:not([name])")?.addEventListener("slotchange",async t=>{const o=t.target.assignedElements(),[s]=o.filter(i=>i instanceof HTMLImageElement&&i.src.endsWith(".svg"));if(s){const[i]=s.src.split("/").reverse(),[r=""]=i?.split(".")??[];this.fileName=r;const l=this.shadowRoot.querySelector("#wrapper"),a=await(await fetch(s.src)).text();l.innerHTML=a,this.querySelectorAll("input").forEach(d=>{this.#e(d)})}}),this.shadowRoot.querySelector('slot[name="controls"]')?.addEventListener("input",t=>{const e=t.target;this.#e(e)})}attributeChangedCallback(t,e,o){if(o!==e)switch(t){case"width":this.width=Number.parseInt(o);break;case"height":this.height=Number.parseInt(o);break;case"file-name":this.fileName=o;break}}}customElements.get("editable-image")||customElements.define("editable-image",y);function v(){document.querySelectorAll("#toc a").forEach(c=>{c.addEventListener("click",()=>{document.querySelector("#toc")?.close()})}),document.querySelector("#toc")?.addEventListener("click",c=>{const t=c.target;t.matches("dialog")&&t.close()})}function I(){document.querySelector("#toc-button")?.addEventListener("click",()=>{document.querySelector("#toc")?.showModal()})}window.addEventListener("DOMContentLoaded",()=>{I(),v()});
