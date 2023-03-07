(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))e(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&e(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();class a extends HTMLElement{static get observedAttributes(){return["color"]}#t;#e={"Toronto JS Red":"#ED342F","CN tower at Night":"#5F1513","Breaking News":"#F8ADAB","Raccon Stripes":"#120606","Downtown street":"#5C5856","Slushy Snow":"#B9B4AD","Wintery Sky":"#FDF7F8"};constructor(){super(),this.#t=this.attachShadow({mode:"open"}),this.#t.innerHTML=`
			<style>
				:host {
					display: block;
					--logo-background-color: ${Object.values(this.#e)[0]};
				}

				:host([no-color-picker]) #color-picker {
					display: none;
				}

				#wrapper {
					display: flex;
					width: fit-content;
					height: fit-content;
					margin-inline: auto;
					text-align: center;
					background-color: var(--logo-background-color);
				}

				#color-picker {
					text-align: center;
					margin: var(--margin-block) var(--margin-inline);
				}

				#download {
					margin-block-start: 1rem;
					display: flex;
					place-items: center;
					gap: 1rem;
					justify-content: center;
					flex-wrap: wrap;
				}
			</style>
			<div id="wrapper">
				<slot></slot>
			</div>
			<div id="color-picker">
				<label for="monochrome-colors">Pick a background color:</label>
				<input id="monochrome-colors" list="monochrome-colors-suggestion" type="color" value="${Object.values(this.#e)[0]}"/>
				<datalist id="monochrome-colors-suggestion">
					${Object.entries(this.#e).map(([t,i])=>`<option value="${i}">${t}</option>`).join("")}
				</datalist>
			</div>
			<div id="download">
				<button type="button" id="download-svg">💾 Download SVG</button>
				<button type="button" id="download-png">💾 Download PNG</button>
			</div>
		`,this.setAttribute("color",Object.values(this.#e)[0]),this.hasAttribute("no-color-picker")&&this.style.setProperty("--logo-background-color","transparent")}#i(t){const i=parseInt(t.slice(1,3),16),e=parseInt(t.slice(3,5),16),o=parseInt(t.slice(5,7),16);return i*.299+e*.587+o*.114>186?"invert(1)":"invert(0)"}#o(t){const i=t.target;this.style.setProperty("--logo-background-color",i.value),(this.#t.querySelector("slot")?.assignedElements()).forEach(e=>{e.style.filter=this.#i(i.value)})}connectedCallback(){this.#t.querySelector("input")?.addEventListener("input",t=>this.#o(t)),(this.#t.querySelector("slot")?.assignedElements()).forEach(t=>{t.style.filter=this.#i(this.getAttribute("color")??"#ffffff")}),this.#t.querySelector("#download-svg")?.addEventListener("click",()=>{const t=this.querySelector("img"),i=document.createElement("a");i.download=`toronto-js-${this.getAttribute("file-name")}.svg`,i.href=t.src,i.click()}),this.#t.querySelector("#download-png")?.addEventListener("click",()=>{const t=this.querySelector("img"),i=document.createElement("canvas"),e=i.getContext("2d"),o=1024;i.width=Math.max(t.naturalWidth,o),i.height=Math.max(t.naturalHeight,o),e?.drawImage(t,0,0);const r=document.createElement("a"),s=this.getAttribute("file-name");r.download=`toronto-js${s?`-${s}`:""}.png`,r.href=i.toDataURL("image/png"),r.click()})}attributeChangedCallback(t,i,e){t==="color"&&e!==i&&e in this.#e&&(this.style.setProperty("--logo-background-color",e),this.#t.querySelector("input")?.setAttribute("value",e))}}customElements.get("logo-with-background-selector")||customElements.define("logo-with-background-selector",a);class c extends HTMLElement{static get observedAttributes(){return["text","subtext","side","mode"]}#t;constructor(){super();const t=this.getAttribute("text")??"Code Club",i=this.getAttribute("subtext")??"online",e=this.getAttribute("side")??"right",o=this.getAttribute("mode")??"dark";this.#t=this.attachShadow({mode:"open"}),this.#t.innerHTML=`
			<style>
				:host {
					display: block;
				}

				#controls, #download {
					margin-block-start: 1rem;
					display: flex;
					place-items: center;
					gap: 1rem;
					justify-content: center;
					flex-wrap: wrap;
				}

				fieldset {
					border-radius: 0.5rem;
				}
			</style>
			<div id="wrapper">
				<svg width="100%" height="100%" viewBox="0 0 4000 2480">
					<defs>
						<g id="tower">
							<g fill="#ed342f">
								<path d="M3987.25,-0L3204.25,-0L2898.99,2480.32L3681.99,2480.32L3987.25,-0Z" fill-opacity="0.15"/>
								<path d="M3864.18,0L3081.18,0L2994.75,2480.32L3777.75,2480.32L3864.18,0Z" fill-opacity="0.3"/>
								<path d="M3577.34,0L2794.34,0L3386.75,2480.32L4169.75,2480.32L3577.34,0Z" fill-opacity="0.5"/>
								<path d="M3681.99,0L2797.5,0L3472.68,2480.32L4357.16,2480.32L3681.99,0Z"/>
							</g>

							<circle cx="3385.94" cy="769.233" r="197.524" fill="#9b9ba9"/>
							<path d="M3377.79,481.678C3231.88,481.678 3113.51,596.545 3113.51,737.8C3113.51,879.055 3231.88,993.921 3377.79,993.921C3523.7,993.921 3642.06,879.055 3642.06,737.8C3642.06,596.545 3523.7,481.678 3377.79,481.678ZM3385.94,987.324C3265.64,987.324 3168.23,889.92 3168.23,769.621C3168.23,649.321 3265.64,551.917 3385.94,551.917C3506.24,551.917 3603.64,649.321 3603.64,769.621C3603.64,889.92 3505.85,987.324 3385.94,987.324Z" fill="#fff"/>
							<path d="M3250.11,371.856C3256.71,332.273 3295.13,305.885 3335.88,312.87C3360.32,317.139 3380.12,332.273 3390.2,352.065C3386.71,320.632 3361.88,293.467 3328.11,288.034C3287.37,281.049 3248.95,307.825 3242.35,347.02C3239.64,362.93 3242.74,378.065 3249.73,391.647C3248.95,385.05 3248.95,378.453 3250.11,371.856Z" fill="#9b9ba9"/>
							<path d="M3304.44,329.945L3314.76,397.391L3269.37,409.541L3266.41,364.871L3304.44,329.945Z" fill="#bcb9cd"/>
							<path d="M3304.44,329.945L3362.65,341.587L3376.74,393.004L3314.76,397.391L3304.44,329.945Z" fill="#9b9ba9"/>
							<path d="M3099.16,713.352C3099.16,563.947 3224.11,443.26 3377.79,443.26C3501.19,443.26 3605.97,521.26 3642.45,629.142C3625.37,496.036 3508.18,392.811 3366.14,392.811C3212.08,392.811 3087.51,513.887 3087.51,662.903C3087.51,692.396 3092.56,720.725 3101.49,747.113C3099.93,736.247 3099.16,724.993 3099.16,713.352Z" fill="#bcb9cd"/>
							<path d="M3300.56,742.456L3588.18,3211.32L3245.85,3211.32C3245.85,3211.32 3323.07,981.891 3288.53,808.427L3300.56,742.456Z" fill="#d3d3e3"/>
							<path d="M3385.94,676.486L3358.77,684.247L3300.56,742.456L3588.18,3211.32L3956.48,3211.32L3385.94,676.486Z" fill="#bcb9cd"/>
							<path d="M3385.94,676.486L3475.19,723.053C3475.19,723.053 3758.58,1950.11 4162.17,3211.32L3956.48,3211.32L3385.94,676.486Z" fill="#9b9ba9"/>
							<path d="M3257.88,240.302L3262.14,294.243C3262.14,294.243 3273.01,284.93 3295.13,279.885C3320.35,274.064 3335.49,282.601 3335.49,282.601L3323.85,231.765C3323.85,231.765 3317.25,208.481 3283.88,214.302C3255.16,218.959 3257.88,240.302 3257.88,240.302Z" fill="#fff"/>
							<path d="M3259.82,223.228C3262.92,217.407 3269.52,211.586 3283.49,208.869C3299.79,206.153 3309.88,210.033 3315.7,215.078L3311.82,198.78C3311.82,198.78 3306.77,180.153 3279.61,184.809C3256.32,188.69 3258.65,205.765 3258.65,205.765L3259.82,223.228Z" fill="#fff"/>
							<path d="M3269.91,184.421C3271.07,182.093 3274.17,179.376 3279.99,178.212C3286.98,177.048 3291.25,178.6 3293.58,180.929L3290.08,161.138C3290.08,161.138 3287.76,152.988 3276.5,155.317C3266.41,156.869 3267.58,164.242 3267.58,164.242L3269.91,184.421Z" fill="#fff"/>
							<path d="M3267.19,151.824C3268.35,149.884 3270.29,147.943 3274.95,147.167C3280.38,146.391 3283.88,147.555 3285.82,149.108L3283.49,131.257C3283.49,131.257 3281.93,125.048 3272.62,126.6C3264.86,127.764 3265.64,133.585 3265.64,133.585L3267.19,151.824Z" fill="#fff"/>
						</g>

						<g id="text-container">
							<g id="js" fill="${o==="dark"?"#fff":"#000"}">
								<path d="M222.212,1267.03C296.502,1267.03 331.296,1215.31 331.296,1152.31L331.296,955.767L250.423,955.767L250.423,1145.72C250.423,1186.16 238.198,1197.44 213.748,1197.44C198.702,1197.44 183.656,1188.04 176.133,1173L125.352,1207.79C146.041,1249.17 177.073,1267.03 222.212,1267.03Z"/>
								<path d="M493.982,1267.03C570.153,1267.03 613.41,1220.95 613.41,1169.23C613.41,1126.92 591.782,1100.59 553.696,1085.54L516.551,1070.96C488.81,1060.15 471.413,1054.98 471.413,1040.4C471.413,1026.77 483.638,1019.71 503.386,1019.71C521.253,1019.71 541.941,1027.24 562.63,1041.34L604.947,988.68C577.206,963.29 540.061,950.125 503.386,950.125C436.619,950.125 389.6,992.912 389.6,1045.1C389.6,1089.3 418.281,1117.04 451.195,1130.21L489.28,1146.19C515.141,1156.54 530.657,1161.24 530.657,1175.82C530.657,1189.45 520.313,1197.44 495.863,1197.44C471.413,1197.44 442.261,1188.04 420.632,1170.17L378.315,1222.84C411.228,1253.87 453.546,1267.03 493.982,1267.03Z"/>
							</g>
							<text id="text" x="656.796px" y="1263.23px" font-family="Montserrat, sans-serif" font-weight="normal" font-size="440px" fill="#ed342f">${t}</text>
							<text id="subtext" x="667.384px" y="1541.03px" font-family="'Source Code Pro', monospace" font-size="235px" fill="${o==="dark"?"#F8ADAB":"#821917"}">${i}</text>
						</g>
					</defs>
					<rect id="bg" x="0" y="0" width="4000" height="2480" fill="${o==="dark"?"#000":"#fff"}"/>
					<use id="tower-use" xlink:href="#tower" x="${e==="right"?"0":"-3030"}"/>
					<use id="text-use" xlink:href="#text-container" x="${e==="right"?"0":"950"}"/>
				</svg>
			</div>
			<div id="controls">
				<div>
					<label for="text">Text</label>
					<input name="text" id="text-input" type="text" maxlength="20" value="${t}"/>
				</div>

				<div>
					<label for="subtext">Subtext</label>
					<input name="subtext" id="subtext-input" type="text" maxlength="20" value="${i}"/>
				</div>

				<fieldset>
					<legend>CN Tower Side</legend>

					<input name="side" id="side-left" type="radio" value="left" ${e==="left"?"checked":""}/>
					<label for="side-left">Left</label>

					<input name="side" id="side-right" type="radio" value="right" ${e==="right"?"checked":""}/>
					<label for="side-right">Right</label>
				</fieldset>

				<fieldset>
					<legend>Mode</legend>

					<input name="mode" id="mode-light" type="radio" value="light" ${o==="light"?"checked":""}/>
					<label for="mode-light">Light</label>

					<input name="mode" id="mode-dark" type="radio" value="dark" ${o==="dark"?"checked":""}/>
					<label for="mode-dark">Dark</label>
				</fieldset>
			</div>
			<div id="download">
				<button type="button" id="download-svg">💾 Download SVG</button>
				<button type="button" id="download-png">💾 Download PNG</button>
			</div>
		`,this.setAttribute("text",t),this.setAttribute("subtext",i),this.setAttribute("side",e),this.setAttribute("mode",o)}connectedCallback(){this.#t.querySelector("#text-input")?.addEventListener("input",t=>{this.setAttribute("text",t.target.value)}),this.#t.querySelector("#subtext-input")?.addEventListener("input",t=>{this.setAttribute("subtext",t.target.value)}),this.#t.querySelectorAll('input[name="side"]').forEach(t=>{t.addEventListener("change",i=>{i.target.checked&&this.setAttribute("side",i.target.value)})}),this.#t.querySelectorAll('input[name="mode"]').forEach(t=>{t.addEventListener("change",i=>{i.target.checked&&this.setAttribute("mode",i.target.value)})}),this.#t.querySelector("#download-svg")?.addEventListener("click",()=>{const t=this.#t.querySelector("svg"),i=new XMLSerializer().serializeToString(t),e=document.createElement("a");e.download=`toronto-js-${this.getAttribute("mode")}-${this.getAttribute("side")}.svg`,e.href=`data:image/svg+xml;base64,${btoa(i)}`,e.click()}),this.#t.querySelector("#download-png")?.addEventListener("click",()=>{const t=this.#t.querySelector("svg"),i=new XMLSerializer().serializeToString(t),e=document.createElement("canvas"),o=e.getContext("2d");e.width=4e3,e.height=2480;const r=new Image;r.onload=()=>{o?.drawImage(r,0,0);const s=document.createElement("a");s.download=`toronto-js-${this.getAttribute("mode")}-${this.getAttribute("side")}.png`,s.href=e.toDataURL("image/png"),s.click()},r.src=`data:image/svg+xml;base64,${btoa(i)}`})}attributeChangedCallback(t,i,e){if(t==="text"&&e!==i&&(this.#t.querySelector("#text").textContent=e),t==="subtext"&&e!==i&&(this.#t.querySelector("#subtext").textContent=e),t==="side"&&e!==i&&(e==="left"||e==="right")){const o=this.#t.querySelector("#tower-use"),r=this.#t.querySelector("#text-use");e==="right"?(o.setAttribute("x","0"),r.setAttribute("x","0")):(o.setAttribute("x","-3030"),r.setAttribute("x","950"))}if(t==="mode"&&e!==i&&(e==="light"||e==="dark")){const o=this.#t.querySelector("#bg"),r=this.#t.querySelector("#js"),s=this.#t.querySelector("#text"),n=this.#t.querySelector("#subtext");e==="dark"?(o.setAttribute("fill","#000"),r.setAttribute("fill","#fff"),s.setAttribute("fill","#ed342f"),n.setAttribute("fill","#F8ADAB")):(o.setAttribute("fill","#fff"),r.setAttribute("fill","#000"),s.setAttribute("fill","#ed342f"),n.setAttribute("fill","#821917"))}}}customElements.get("simple-graphic")||customElements.define("simple-graphic",c);function d(){document.querySelectorAll("#toc a").forEach(l=>{l.addEventListener("click",()=>{document.querySelector("#toc")?.close()})}),document.querySelector("#toc")?.addEventListener("click",l=>{const t=l.target;t.matches("dialog")&&t.close()})}function u(){document.querySelector("#toc-button")?.addEventListener("click",()=>{document.querySelector("#toc")?.showModal()})}window.addEventListener("DOMContentLoaded",()=>{u(),d()});