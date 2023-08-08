import { colorValues } from '../../js/constants';

import cssLink from './style.css?url';

/**
 * Enhances an image by adding a changeable background color and download options.
 *
 * The background color will also make the foreground color change from black to white depending on contrast.
 *
 * The image can be downloaded as SVG or PNG, with available controls for width and height.
 *
 * @slot - The image to be displayed and enhanced.
 * @element downloadable-image
 */
export class DownloadableImage extends HTMLElement {
	static get observedAttributes() { return ['color', 'width', 'height', 'file-name']; }

	declare shadowRoot: ShadowRoot;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });

		this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="${cssLink}"/>

			<div id="wrapper">
				<slot></slot>
			</div>

			<div id="controls">
				<label for="background-color">
					Pick a background color:

					<input id="background-color" list="color-suggestion" type="color" value="${colorValues[0]}"/>
					<datalist id="color-suggestion">
						${colorValues.map((color) => `<option>${color}</option>`).join('')}
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
		`;
	}

	/**
	 * The background color of the image.
	 *
	 * @attr color
	 * @type {string}
	 * @default '#ED342F'
	 */
	get color() {
		return this.getAttribute('color') ?? colorValues[0];
	}

	set color(value) {
		this.setAttribute('color', value);
		this.shadowRoot.querySelector('#background-color')?.setAttribute('value', value);

		this.shadowRoot.querySelectorAll('.fill-bg-color').forEach((element) => {
			element.setAttribute('fill', value);
		});

		this.shadowRoot.querySelectorAll('.stroke-bg-color').forEach((element) => {
			element.setAttribute('stroke', value);
		});

		this.shadowRoot.querySelectorAll('.fill-fg-color').forEach((element) => {
			element.setAttribute('fill', this.foregroundColor);
		});

		this.shadowRoot.querySelectorAll('.stroke-fg-color').forEach((element) => {
			element.setAttribute('stroke', this.foregroundColor);
		});
	}

	/**
	 * The foreground color of the image.
	 * This is automatically calculated based on the background color.
	 *
	 * @type {string}
	 * @default '#ffffff'
	 */
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

	/**
	 * The inverted foreground color of the image.
	 * This is automatically calculated based on the background color.
	 * This is the opposite of foregroundColor.
	 *
	 * @type {string}
	 * @default '#000000'
	 */
	get invertedForegroundColor() {
		return this.foregroundColor === '#ffffff'
			? '#000000'
			: '#ffffff';
	}

	/**
	 * The width of the image.
	 *
	 * @attr width
	 * @type {number}
	 * @default 2480
	 */
	get width() {
		const width = Number.parseInt(this.getAttribute('width') ?? '2480');

		return Number.isNaN(width) ? 0 : width;
	}

	set width(value) {
		this.setAttribute('width', value.toString());
	}

	/**
	 * The height of the image.
	 *
	 * @attr height
	 * @type {number}
	 * @default 2480
	 */
	get height() {
		const height = Number.parseInt(this.getAttribute('height') ?? '2480');

		return Number.isNaN(height) ? 0 : height;
	}

	set height(value) {
		this.setAttribute('height', value.toString());
	}

	/**
	 * The file name used when downloading the image.
	 *
	 * @attr file-name
	 * @type {string}
	 * @default 'image'
	 */
	get fileName() {
		const FALLBACK_FILE_NAME = 'image';

		return this.getAttribute('file-name') ?? FALLBACK_FILE_NAME;
	}

	set fileName(value) {
		this.setAttribute('file-name', value);
	}

	#downloadImage(type: 'svg' | 'png') {
		const svg = this.shadowRoot.querySelector('#wrapper svg')?.cloneNode(true) as SVGElement;

		if (type === 'png') {
			svg.setAttribute('width', this.width.toString());
			svg.setAttribute('height', this.height.toString());
		}

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

		this.shadowRoot.querySelector('#width-input')?.addEventListener('input', (evt) => {
			this.width = Number.parseInt((evt.target as HTMLInputElement).value);
		});

		this.shadowRoot.querySelector('#height-input')?.addEventListener('input', (evt) => {
			this.height = Number.parseInt((evt.target as HTMLInputElement).value);
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
				const [imageFileName = ''] = imageFilePath?.split('.') ?? [];

				this.fileName = imageFileName;

				const wrapperDiv = this.shadowRoot.querySelector('#wrapper') as HTMLDivElement;

				const response = await fetch(image.src);
				const svg = await response.text();

				wrapperDiv.innerHTML = svg;

				[this.color] = colorValues;
			}
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (newValue !== oldValue) {
			switch (name) {
				case 'color':
					this.color = newValue;
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
