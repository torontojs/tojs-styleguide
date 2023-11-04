(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const g=["#ED342F","#5F1513","#F8ADAB","#120606","#5C5856","#B9B4AD","#FDF7F8"],f="data:text/css;base64,Omhvc3QgewoJZGlzcGxheTogYmxvY2s7Cgljb250YWluOiBjb250ZW50Owp9CgpzbG90IHsKCWRpc3BsYXk6IG5vbmU7Cn0KCmZpZWxkc2V0IHsKCWJvcmRlci1yYWRpdXM6IDAuNXJlbTsKCWJvcmRlcjogdGhpbiBzb2xpZCBjdXJyZW50Q29sb3I7Cn0KCmlucHV0IHsKCWJvcmRlcjogdGhpbiBzb2xpZCBjdXJyZW50Q29sb3I7Cglib3JkZXItcmFkaXVzOiAwLjVyZW07CglwYWRkaW5nOiAwLjNyZW0gMC41cmVtOwp9CgppbnB1dFt0eXBlPSJjb2xvciJdIHsKCXBhZGRpbmc6IDA7Cn0KCmJ1dHRvbiB7Cglib3JkZXI6IHRoaW4gc29saWQgY3VycmVudENvbG9yOwoJYm9yZGVyLXJhZGl1czogMC41cmVtOwoJcGFkZGluZzogMC4zcmVtIDAuNXJlbTsKfQoKI3dyYXBwZXIgewoJZGlzcGxheTogZmxleDsKCXdpZHRoOiBjbGFtcCgxMHJlbSwgMTAwJSwgNTB2bWluKTsKCWhlaWdodDogY2xhbXAoMTByZW0sIDUwdm1pbiwgMzVyZW0pOwoJbWFyZ2luLWlubGluZTogYXV0bzsKCXRleHQtYWxpZ246IGNlbnRlcjsKfQoKI2NvbnRyb2xzIHsKCW1hcmdpbi1ibG9jay1zdGFydDogMXJlbTsKCXRleHQtYWxpZ246IGNlbnRlcjsKfQoKI2NvbnRyb2xzID4gKiB7CgltYXJnaW4tYmxvY2stc3RhcnQ6IDFyZW07CglkaXNwbGF5OiBmbGV4OwoJZ2FwOiAxcmVtOwoJcGxhY2UtaXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJZmxleC13cmFwOiB3cmFwOwp9CgojZG93bmxvYWQgewoJbWFyZ2luLWJsb2NrLXN0YXJ0OiAxcmVtOwoJZGlzcGxheTogZmxleDsKCWZsZXgtZGlyZWN0aW9uOiBjb2x1bW47CglnYXA6IDFyZW07CglwbGFjZS1pdGVtczogY2VudGVyOwp9CgojZG93bmxvYWQgZGl2IHsKCWRpc3BsYXk6IGZsZXg7CglnYXA6IDFyZW07CglwbGFjZS1pdGVtczogY2VudGVyOwoJanVzdGlmeS1jb250ZW50OiBjZW50ZXI7CglmbGV4LXdyYXA6IHdyYXA7Cn0K";class y extends HTMLElement{static get observedAttributes(){return["color","width","height","file-name"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
			<link rel="stylesheet" href="${f}"/>

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
		`}get color(){return this.getAttribute("color")??g[0]}set color(t){this.setAttribute("color",t),this.shadowRoot.querySelector("#background-color")?.setAttribute("value",t),this.shadowRoot.querySelectorAll(".fill-bg-color").forEach(e=>{e.setAttribute("fill",t)}),this.shadowRoot.querySelectorAll(".stroke-bg-color").forEach(e=>{e.setAttribute("stroke",t)}),this.shadowRoot.querySelectorAll(".fill-fg-color").forEach(e=>{e.setAttribute("fill",this.foregroundColor)}),this.shadowRoot.querySelectorAll(".stroke-fg-color").forEach(e=>{e.setAttribute("stroke",this.foregroundColor)}),this.shadowRoot.querySelectorAll(".fill-inverted-fg-color").forEach(e=>{e.setAttribute("fill",this.invertedForegroundColor)}),this.shadowRoot.querySelectorAll(".stroke-inverted-fg-color").forEach(e=>{e.setAttribute("stroke",this.invertedForegroundColor)})}get foregroundColor(){const t=parseInt(this.color.slice(1,3),16),e=parseInt(this.color.slice(3,5),16),o=parseInt(this.color.slice(5,7),16);return t*.299+e*.587+o*.114>186?"#000000":"#ffffff"}get invertedForegroundColor(){return this.foregroundColor==="#ffffff"?"#000000":"#ffffff"}get width(){const t=Number.parseInt(this.getAttribute("width")??"2480");return Number.isNaN(t)?0:t}set width(t){this.setAttribute("width",t.toString())}get height(){const t=Number.parseInt(this.getAttribute("height")??"2480");return Number.isNaN(t)?0:t}set height(t){this.setAttribute("height",t.toString())}get fileName(){const t="image";return this.getAttribute("file-name")??t}set fileName(t){this.setAttribute("file-name",t)}#t(t){const e=this.shadowRoot.querySelector("#wrapper svg")?.cloneNode(!0);t==="png"&&(e.setAttribute("width",this.width.toString()),e.setAttribute("height",this.height.toString()));const o=new XMLSerializer().serializeToString(e),s=`data:image/svg+xml;base64,${btoa(o)}`,i=document.createElement("a");if(i.download=`${this.fileName}.${t}`,i.href=s,t==="svg"){i.click();return}const n=document.createElement("canvas"),l=n.getContext("2d");n.width=this.width,n.height=this.height;const r=new Image;r.onload=()=>{l?.drawImage(r,0,0,n.width,n.height),i.href=n.toDataURL("image/png"),i.click()},r.src=s}connectedCallback(){this.shadowRoot.querySelector("#background-color")?.addEventListener("input",t=>{this.color=t.target.value}),this.shadowRoot.querySelector("#width-input")?.addEventListener("input",t=>{this.width=Number.parseInt(t.target.value)}),this.shadowRoot.querySelector("#height-input")?.addEventListener("input",t=>{this.height=Number.parseInt(t.target.value)}),this.shadowRoot.querySelector("#download-svg")?.addEventListener("click",()=>{this.#t("svg")}),this.shadowRoot.querySelector("#download-png")?.addEventListener("click",()=>{this.#t("png")}),this.shadowRoot.addEventListener("slotchange",async t=>{const o=t.target.assignedElements(),[s]=o.filter(i=>i instanceof HTMLImageElement&&i.src.endsWith(".svg"));if(s){const[i]=s.src.split("/").reverse(),[n=""]=i?.split(".")??[];this.fileName=n;const l=this.shadowRoot.querySelector("#wrapper"),c=await(await fetch(s.src)).text();l.innerHTML=c,[this.color]=g}})}attributeChangedCallback(t,e,o){if(o!==e)switch(t){case"color":this.color=o;break;case"width":this.width=Number.parseInt(o);break;case"height":this.height=Number.parseInt(o);break;case"file-name":this.fileName=o;break}}}customElements.get("downloadable-image")||customElements.define("downloadable-image",y);const v="data:text/css;base64,Omhvc3QgewoJLS1jb2xvcjogYmxhY2s7CgktLXRleHQtY29sb3I6IHdoaXRlOwoJLS1zaXplOiAxMnJlbTsKCglib3gtc2l6aW5nOiBib3JkZXItYm94OwoJd2lkdGg6IHZhcigtLXNpemUpOwoJaGVpZ2h0OiB2YXIoLS1zaXplKTsKCgl0ZXh0LWFsaWduOiBjZW50ZXI7CgoJZGlzcGxheTogaW5saW5lLWJsb2NrOwoJbWFyZ2luOiB2YXIoLS1tYXJnaW4taW5saW5lKTsKCXBhZGRpbmc6IHZhcigtLXBhZGRpbmctaW5saW5lKTsKCglib3JkZXItcmFkaXVzOiB2YXIoLS1ib3JkZXItcmFkaXVzKTsKCWJvcmRlci13aWR0aDogdmFyKC0tYm9yZGVyLXdpZHRoKTsKCWJvcmRlci1jb2xvcjogdmFyKC0tYm9yZGVyLWNvbG9yKTsKCWJvcmRlci1zdHlsZTogc29saWQ7CgoJYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY29sb3IpOwoJY29sb3I6IHZhcigtLXRleHQtY29sb3IpOwp9Cgpjb2RlIHsgdXNlci1zZWxlY3Q6IGFsbDsgfQo=";class I extends HTMLElement{static get observedAttributes(){return["color","colorname"]}#t;constructor(){super(),this.#t=this.attachShadow({mode:"open"}),this.#t.innerHTML=`
			<link rel="stylesheet" href="${v}"/>
			<div id="color-box">
				<h4>"<span id="color-name"></span>"</h4>
				<span><code id="hex-code"></code></span>
				<br/>
				<span>HSL: <code id="h"></code>, <code id="s"></code>, <code id="l"></code></span>
				<br/>
				<span>RGB: <code id="r"></code>, <code id="g"></code>, <code id="b"></code></span>
			</div>
		`}get color(){return this.getAttribute("color")??"#ED342F"}set color(t){this.setAttribute("color",t);const e=this.#o(t??""),o=this.#s(t??"");this.style.setProperty("--color",t),this.style.setProperty("--text-color",this.#e(t)),this.#t.getElementById("hex-code").innerText=t,this.#t.getElementById("h").innerText=o.hue.toString(),this.#t.getElementById("s").innerText=o.saturation.toString(),this.#t.getElementById("l").innerText=o.lightness.toString(),this.#t.getElementById("r").innerText=e.red.toString(),this.#t.getElementById("g").innerText=e.green.toString(),this.#t.getElementById("b").innerText=e.blue.toString()}get colorName(){return this.getAttribute("colorname")??""}set colorName(t){this.setAttribute("colorname",t)}#e(t){const e=parseInt(t.slice(1,3),16),o=parseInt(t.slice(3,5),16),s=parseInt(t.slice(5,7),16);return e*.299+o*.587+s*.114>186?"#000000":"#ffffff"}#o(t){const e=parseInt(t.replace(/^#/ui,""),16),o=e>>16&255,s=e>>8&255,i=e&255;return{red:o,green:s,blue:i}}#s(t){const e=this.#o(t),o=e.red/255,s=e.green/255,i=e.blue/255,n=Math.max(o,s,i),l=Math.min(o,s,i),r=n-l;let c=0,a=0,h=(n+l)/2;if(n!==l){switch(h>.5?a=r/(2-n-l):a=r/(n+l),n){case o:c=(s-i)/r+(s<i?6:0);break;case s:c=(i-o)/r+2;break;case i:c=(o-s)/r+4;break}c/=6}return a=Math.round(a*100),h=Math.round(h*100),c=Math.round(c*360),{hue:c,saturation:a,lightness:h}}attributeChangedCallback(t,e,o){if(e!==o)switch(t){case"color":this.color=o;break;case"colorname":this.colorName=o;break}}}customElements.get("color-box")||customElements.define("color-box",I);const x="data:text/css;base64,Omhvc3QgewoJZGlzcGxheTogYmxvY2s7Cgljb250YWluOiBjb250ZW50Owp9CgpzbG90IHsKCWRpc3BsYXk6IG5vbmU7Cn0KCmZpZWxkc2V0IHsKCWJvcmRlci1yYWRpdXM6IDAuNXJlbTsKCWJvcmRlcjogdGhpbiBzb2xpZCBjdXJyZW50Q29sb3I7Cn0KCmlucHV0IHsKCWJvcmRlcjogdGhpbiBzb2xpZCBjdXJyZW50Q29sb3I7Cglib3JkZXItcmFkaXVzOiAwLjVyZW07CglwYWRkaW5nOiAwLjNyZW0gMC41cmVtOwp9CgpidXR0b24gewoJYm9yZGVyOiB0aGluIHNvbGlkIGN1cnJlbnRDb2xvcjsKCWJvcmRlci1yYWRpdXM6IDAuNXJlbTsKCXBhZGRpbmc6IDAuM3JlbSAwLjVyZW07Cn0KCiN3cmFwcGVyIHsKCWRpc3BsYXk6IGZsZXg7Cgl3aWR0aDogY2xhbXAoMTByZW0sIDEwMCUsIDUwdm1pbik7CgloZWlnaHQ6IGNsYW1wKDEwcmVtLCA1MHZtaW4sIDM1cmVtKTsKCW1hcmdpbi1pbmxpbmU6IGF1dG87Cgl0ZXh0LWFsaWduOiBjZW50ZXI7Cn0KCiNjb250cm9scyB7CgltYXJnaW4tYmxvY2stc3RhcnQ6IDFyZW07Cgl0ZXh0LWFsaWduOiBjZW50ZXI7Cn0KCiNjb250cm9scyA6OnNsb3R0ZWQoKikgewoJbWFyZ2luLWJsb2NrLXN0YXJ0OiAxcmVtOwoJZGlzcGxheTogZmxleDsKCWdhcDogMXJlbTsKCXBsYWNlLWl0ZW1zOiBjZW50ZXI7CglqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKCWZsZXgtd3JhcDogd3JhcDsKfQoKI2Rvd25sb2FkIHsKCW1hcmdpbi1ibG9jay1zdGFydDogMXJlbTsKCWRpc3BsYXk6IGZsZXg7CglmbGV4LWRpcmVjdGlvbjogY29sdW1uOwoJZ2FwOiAxcmVtOwoJcGxhY2UtaXRlbXM6IGNlbnRlcjsKfQoKI2Rvd25sb2FkIGRpdiB7CglkaXNwbGF5OiBmbGV4OwoJZ2FwOiAxcmVtOwoJcGxhY2UtaXRlbXM6IGNlbnRlcjsKCWp1c3RpZnktY29udGVudDogY2VudGVyOwoJZmxleC13cmFwOiB3cmFwOwp9Cg==";class G extends HTMLElement{static get observedAttributes(){return["width","height","file-name"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
			<link rel="stylesheet" href="${x}"/>

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
		`}get width(){const t=Number.parseInt(this.getAttribute("width")??"2480");return Number.isNaN(t)?0:t}set width(t){this.setAttribute("width",t.toString())}get height(){const t=Number.parseInt(this.getAttribute("height")??"2480");return Number.isNaN(t)?0:t}set height(t){this.setAttribute("height",t.toString())}get fileName(){const t="image";return this.getAttribute("file-name")??t}set fileName(t){this.setAttribute("file-name",t)}#t(t){const e=this.shadowRoot.querySelector("#wrapper svg")?.cloneNode(!0);t==="png"&&(e.setAttribute("width",this.width.toString()),e.setAttribute("height",this.height.toString()));const o=new XMLSerializer().serializeToString(e),s=`data:image/svg+xml;base64,${btoa(o)}`,i=document.createElement("a");if(i.download=`${this.fileName}.${t}`,i.href=s,t==="svg"){i.click();return}const n=document.createElement("canvas"),l=n.getContext("2d");n.width=this.width,n.height=this.height;const r=new Image;r.onload=()=>{l?.drawImage(r,0,0,n.width,n.height),i.href=n.toDataURL("image/png"),i.click()},r.src=s}#e(t){t.type==="radio"&&t.checked?this.shadowRoot.querySelectorAll(`svg .${t.name}`).forEach(o=>{o.setAttribute("visibility",o.classList.contains(t.value)?"inherit":"hidden")}):t.type==="text"&&this.shadowRoot.querySelectorAll(`svg .${t.name}`).forEach(o=>{o.textContent=t.value})}connectedCallback(){this.shadowRoot.querySelector("#width-input")?.addEventListener("input",t=>{this.width=Number.parseInt(t.target.value)}),this.shadowRoot.querySelector("#height-input")?.addEventListener("input",t=>{this.height=Number.parseInt(t.target.value)}),this.shadowRoot.querySelector("#download-svg")?.addEventListener("click",()=>{this.#t("svg")}),this.shadowRoot.querySelector("#download-png")?.addEventListener("click",()=>{this.#t("png")}),this.shadowRoot.querySelector("slot:not([name])")?.addEventListener("slotchange",async t=>{const o=t.target.assignedElements(),[s]=o.filter(i=>i instanceof HTMLImageElement&&i.src.endsWith(".svg"));if(s){const[i]=s.src.split("/").reverse(),[n=""]=i?.split(".")??[];this.fileName=n;const l=this.shadowRoot.querySelector("#wrapper"),c=await(await fetch(s.src)).text();l.innerHTML=c,this.querySelectorAll("input").forEach(a=>{this.#e(a)})}}),this.shadowRoot.querySelector('slot[name="controls"]')?.addEventListener("input",t=>{const e=t.target;this.#e(e)})}attributeChangedCallback(t,e,o){if(o!==e)switch(t){case"width":this.width=Number.parseInt(o);break;case"height":this.height=Number.parseInt(o);break;case"file-name":this.fileName=o;break}}}customElements.get("editable-image")||customElements.define("editable-image",G);const X="data:text/css;base64,Omhvc3QgKiB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94Owp9CgphIHsKCWNvbG9yOiB2YXIoLS10aGVtZS1jb2xvcik7Cgl0ZXh0LWRlY29yYXRpb24tc2tpcDogc3BhY2VzOwoJdGV4dC1kZWNvcmF0aW9uLXNraXAtaW5rOiBhdXRvOwoJdGV4dC1kZWNvcmF0aW9uLWNvbG9yOiB2YXIoLS10aGVtZS1jb2xvcik7Cn0KCmE6dmlzaXRlZCB7Cgl0ZXh0LWRlY29yYXRpb24tY29sb3I6IHZhcigtLXNlY29uZGFyeS1jb2xvcik7Cn0KCmE6aG92ZXIgeyBjb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yKTsgfQoKYTpmb2N1cyB7Cgljb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yKTsKCXRleHQtZGVjb3JhdGlvbi1jb2xvcjogdmFyKC0tYWNjZW50LWNvbG9yKTsKCW91dGxpbmU6IHZhcigtLWJvcmRlci13aWR0aCkgZG90dGVkIHZhcigtLXRoZW1lLWNvbG9yKTsKfQoKYTphY3RpdmUgewoJY29sb3I6IHZhcigtLWFjY2VudC1jb2xvcik7Cgl0ZXh0LWRlY29yYXRpb24tY29sb3I6IHZhcigtLWFjY2VudC1jb2xvcik7Cn0KCm5hdiB7Cglwb3NpdGlvbjogZml4ZWQ7CglpbnNldC1pbmxpbmU6IDA7CglpbnNldC1ibG9jay1zdGFydDogMDsKCWluc2V0LWJsb2NrLWVuZDogYXV0bzsKCgl3aWR0aDogY2xhbXAoMjByZW0sIDUwdncsIDQ1cmVtKTsKCWhlaWdodDogMTAwJTsKCW1heC1oZWlnaHQ6IDEwMHZoOwoJYmFja2dyb3VuZDogdmFyKC0tYmctY29sb3IpOwoJYm9yZGVyOiB2YXIoLS1ib3JkZXItd2lkdGgpIHNvbGlkIHZhcigtLWJnLWNvbG9yKTsKCWJvcmRlci1pbmxpbmUtZW5kLWNvbG9yOiB2YXIoLS10aGVtZS1jb2xvcik7CglwYWRkaW5nOiB2YXIoLS1wYWRkaW5nLWJsb2NrKSB2YXIoLS1wYWRkaW5nLWlubGluZSk7CgltYXJnaW46IDA7CgoJb3ZlcmZsb3c6IGF1dG87Cn0KCm5hdjo6YmFja2Ryb3AgewoJYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpOwoJYmFja2Ryb3AtZmlsdGVyOiBibHVyKDVweCk7Cn0KCmJ1dHRvbiB7Cglmb250LWZhbWlseTogaW5oZXJpdDsKCWZvbnQtc2l6ZTogY2FsYyh2YXIoLS1idXR0b24tc2l6ZSkgLyAxLjgpOwoJbGluZS1oZWlnaHQ6IGNhbGModmFyKC0tYnV0dG9uLXNpemUpIC8gMik7Cgljb2xvcjogdmFyKC0tZm9udC1jb2xvcik7Cglib3JkZXI6IHNvbGlkIG1lZGl1bSBjdXJyZW50Q29sb3I7Cglib3JkZXItcmFkaXVzOiAxMDB2bWF4OwoJYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctY29sb3IpOwoJei1pbmRleDogMTsKCXdpZHRoOiB2YXIoLS1idXR0b24tc2l6ZSk7CgloZWlnaHQ6IHZhcigtLWJ1dHRvbi1zaXplKTsKCXRleHQtYWxpZ246IGNlbnRlcjsKCW1hcmdpbjogdmFyKC0tbWFyZ2luLWlubGluZSk7Cglwb3NpdGlvbjogZml4ZWQ7CglpbnNldC1ibG9jay1lbmQ6IDA7CglpbnNldC1pbmxpbmUtc3RhcnQ6IDA7Cn0K";class R extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
			<link rel="stylesheet" href="${X}"/>
			<nav popover id="toc">
			</nav>

			<button type="button" popovertarget="toc">≡</button>
		`}#t(t,e=""){const o=t.textContent?.trim()??"MISSING TEXT";let{id:s}=t;s||(s=o.replace(/\s+/iug,"-").replace(/[^a-zA-Z0-9]/iug,"").toLowerCase(),t.id=s),e!==""&&(s=`${e}--${s}`);const i=document.createElement("a");i.href=`#${s}`,i.textContent="🔗",i.classList.add("header-link"),t.appendChild(i);const n=document.createElement("a");return n.href=`#${s}`,n.textContent=o,{link:n,id:s}}#e(t,e=""){const o=document.createElement("ol");for(let s=0;s<t.length;s+=1){const i=t[s],n=i.tagName,l=document.createElement("li"),{link:r,id:c}=this.#t(i,e);if(!((t[s+1]?.tagName??"H1")>n))l.appendChild(r),o.appendChild(l);else{const b=t.slice(s+1),u=b.findIndex(W=>W.tagName===n),w=u===-1?b.length:u,p=b.slice(0,w),m=document.createElement("details"),C=document.createElement("summary"),Z=this.#e(p,c);C.appendChild(r),m.appendChild(C),m.appendChild(Z),l.appendChild(m),o.appendChild(l),s+=p.length}}return o}connectedCallback(){const t=this.shadowRoot.querySelector("#toc"),e=document.createElement("a"),o=document.querySelector("h1");e.href=`#${o.id}`,e.textContent=o.textContent,t.appendChild(e);const s=this.#e([...document.querySelectorAll("h2, h3, h4, h5, h6")]);t.appendChild(s),t.addEventListener("click",i=>{i.target.matches("a")&&t.hidePopover()})}}customElements.get("toc-list")||customElements.define("toc-list",R);const L="data:text/css;base64,Omhvc3QgKiwgOmhvc3QgKjo6YmVmb3JlLCA6aG9zdCAqOjphZnRlciB7Cglib3gtc2l6aW5nOiBib3JkZXItYm94Owp9CgpibG9ja3F1b3RlIHsKCWZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseSk7Cn0KCmJsb2NrcXVvdGUgc3ZnIHsKCXdpZHRoOiAxMDAlOwoJaGVpZ2h0OiBhdXRvOwoJcGFkZGluZy1pbmxpbmU6IHZhcigtLXBhZGRpbmctaW5saW5lKTsKCXBhZGRpbmctYmxvY2s6IHZhcigtLXBhZGRpbmctYmxvY2spOwoJZmlsbDogY3VycmVudENvbG9yOwp9CgpibG9ja3F1b3RlIDppcygqLCA6OnNsb3R0ZWQoKikpIHsKCWZvbnQtZmFtaWx5OiBpbmhlcml0Owp9Cg==";class N extends HTMLElement{static get observedAttributes(){return["font-name","font-family","text-fit"]}constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
			<link rel="stylesheet" href="${L}"/>
			<blockquote>
				<svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
					<text y="10" textLength="100%" dominant-baseline="middle" text-rendering="optimizeLegibility" font-size="10">
						${this.fontName}
					</text>
				</svg>

				<div>
					<slot></slot>
				</div>
			</blockquote>
		`}get fontName(){return this.getAttribute("font-name")??""}set fontName(t){this.setAttribute("font-name",t),this.shadowRoot.querySelector("text").textContent=t}get fontFamily(){return this.getAttribute("font-family")??""}set fontFamily(t){this.setAttribute("font-family",t),this.shadowRoot.querySelector("blockquote")?.style.setProperty("--font-family",t)}get textFit(){const t=Number.parseFloat(this.getAttribute("text-fit")??"0.5");return Number.isNaN(t)?.5:t}set textFit(t){const e=Number.isNaN(t)?.5:t;this.setAttribute("text-fit",e.toString()),this.#t()}#t(){const t=this.shadowRoot.querySelector("svg"),i=(this.shadowRoot.querySelector("text").textContent??"").length*this.textFit*10;t.setAttribute("viewBox",`0 0 ${i} 20`)}connectedCallback(){this.#t(),new ResizeObserver(()=>{this.#t()}).observe(this)}attributeChangedCallback(t,e,o){if(e!==o)switch(t){case"font-name":this.fontName=o;break;case"font-family":this.fontFamily=o;break;case"text-fit":this.textFit=Number.parseFloat(o);break}}}customElements.get("font-box")||customElements.define("font-box",N);
