import { colors } from './constants';

// TODO: add docs

export class DownloadableImage extends HTMLElement {
	static get observedAttributes() { return ['color', 'width', 'height', 'controls', 'file-name']; }

	declare shadowRoot: ShadowRoot;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					contain: content;
				}

				:host([controls="false"]) #controls {
					display: none;
				}

				slot {
					display: none;
				}

				fieldset {
					border-radius: 0.5rem;
					border: thin solid currentColor;
				}

				input {
					border: thin solid currentColor;
					border-radius: 0.5rem;
					padding: 0.3rem 0.5rem;
				}

				input[type="color"] {
					padding: 0;
				}

				button {
					border: thin solid currentColor;
					border-radius: 0.5rem;
					padding: 0.3rem 0.5rem;
				}

				#wrapper {
					display: flex;
					width: clamp(10rem, 100%, 50vmin);
					height: clamp(10rem, 100%, 50vmin);
					margin-inline: auto;
					text-align: center;
				}

				#controls {
					margin-block-start: 1rem;
					text-align: center;
				}

				#controls > * {
					margin-block-start: 1rem;
					display: flex;
					gap: 1rem;
					place-items: center;
					justify-content: center;
					flex-wrap: wrap;
				}

				#download {
					margin-block-start: 1rem;
					display: flex;
					flex-direction: column;
					gap: 1rem;
					place-items: center;
				}

				#download div {
					display: flex;
					gap: 1rem;
					place-items: center;
					justify-content: center;
					flex-wrap: wrap;
				}
			</style>

			<div id="wrapper">
				<slot></slot>
			</div>

			<div id="controls">
				<label for="background-color">
					Pick a background color:

					<input id="background-color" list="color-suggestion" type="color" value="${Object.values(colors)[0]}"/>
					<datalist id="color-suggestion">
						${Object.values(colors).map((color) => `<option>${color}</option>`).join('')}
					</datalist>
				</label>
			</div>

			<div id="download">
				<div>
					<button type="button" id="download-svg">💾 Download SVG</button>
					<button type="button" id="download-png">💾 Download PNG</button>
				</div>

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
			</div>
		`;

		if (!this.controls) {
			this.color = 'transparent';
		}
	}

	get color() {
		return this.getAttribute('color') ?? Object.values(colors)[0];
	}

	set color(value) {
		this.setAttribute('color', value);
		this.shadowRoot.querySelector('#background-color')?.setAttribute('value', value);

		const styleElements = [...this.shadowRoot.querySelectorAll('style')];
		const cssRules = styleElements.map((styleElement) => [...styleElement.sheet?.cssRules ?? []]).flat();
		const [svgStyleRule] = cssRules.filter((rule) => rule instanceof CSSStyleRule && rule.selectorText === 'svg') as [CSSStyleRule?];

		svgStyleRule?.style.setProperty('--background-color', value);
		svgStyleRule?.style.setProperty('--foreground-color', this.foregroundColor);

		// TODO: add a way to change the color of the output SVG
	}

	get foregroundColor() {
		/* eslint-disable @typescript-eslint/no-magic-numbers */
		const red = parseInt(this.color.slice(1, 3), 16);
		const green = parseInt(this.color.slice(3, 5), 16);
		const blue = parseInt(this.color.slice(5, 7), 16);

		// https://stackoverflow.com/a/3943023/112731
		return ((red * 0.299) + (green * 0.587) + (blue * 0.114)) > 186
			? '#000000'
			: '#ffffff';
	}

	get controls() {
		return this.getAttribute('controls') !== 'false';
	}

	set controls(value) {
		this.setAttribute('controls', value ? 'true' : 'false');

		if (!value) {
			this.color = 'transparent';
		}
	}

	get width() {
		const width = Number.parseInt(this.getAttribute('width') ?? '2480');

		return Number.isNaN(width) ? 0 : width;
	}

	set width(value) {
		this.setAttribute('width', value.toString());
	}

	get height() {
		const height = Number.parseInt(this.getAttribute('height') ?? '2480');

		return Number.isNaN(height) ? 0 : height;
	}

	set height(value) {
		this.setAttribute('height', value.toString());
	}

	get fileName() {
		const FALLBACK_FILE_NAME = 'image';

		return this.getAttribute('file-name') ?? FALLBACK_FILE_NAME;
	}

	set fileName(value) {
		this.setAttribute('file-name', value);
	}

	#downloadImage(type: 'svg' | 'png') {
		const svg = this.shadowRoot.querySelector('#wrapper svg')?.cloneNode(true) as SVGElement;

		// TODO: replace css variables with actual values

		svg.setAttribute('width', this.width.toString());
		svg.setAttribute('height', this.height.toString());

		const svgData = new XMLSerializer().serializeToString(svg);
		const dataUrl = `data:image/svg+xml;base64,${btoa(svgData)}`;

		const link = document.createElement('a');

		link.download = `${this.fileName}.${type}`;
		link.href = dataUrl;

		if (type === 'svg') {
			link.click();

			return;
		}

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = this.width;
		canvas.height = this.height;

		const img = new Image();

		img.onload = () => {
			ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

			link.href = canvas.toDataURL('image/png');
			link.click();
		};

		img.src = dataUrl;
	}

	connectedCallback() {
		this.shadowRoot.querySelector('#background-color')?.addEventListener('input', (evt) => {
			this.color = (evt.target as HTMLInputElement).value;
		});

		this.shadowRoot.querySelector('#download-svg')?.addEventListener('click', () => {
			this.#downloadImage('svg');
		});


		this.shadowRoot.querySelector('#download-png')?.addEventListener('click', () => {
			this.#downloadImage('png');
		});

		this.shadowRoot.addEventListener('slotchange', async (evt) => {
			const target = evt.target as HTMLSlotElement;
			const assignedElements = target.assignedElements();
			const [image] = assignedElements.filter((child) => child instanceof HTMLImageElement && child.src.endsWith('.svg')) as [HTMLImageElement?];

			if (image) {
				const [imageFilePath] = (image.src).split('/').reverse();
				const [imageFileName] = imageFilePath.split('.');

				this.fileName = imageFileName;

				const wrapperDiv = this.shadowRoot.querySelector('#wrapper') as HTMLDivElement;

				const response = await fetch(image.src);
				const svg = await response.text();

				wrapperDiv.innerHTML = svg;

				[this.color] = Object.values(colors);
			}
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (newValue !== oldValue) {
			switch (name) {
				case 'color':
					this.color = newValue;
					break;

				case 'controls':
					this.controls = newValue === 'true';
					break;

				case 'width':
					this.width = Number.parseInt(newValue);
					break;

				case 'height':
					this.height = Number.parseInt(newValue);
					break;

				case 'file-name':
					this.fileName = newValue;
					break;

				default:
			}
		}
	}
}

if (!customElements.get('downloadable-image')) {
	customElements.define('downloadable-image', DownloadableImage);
}
