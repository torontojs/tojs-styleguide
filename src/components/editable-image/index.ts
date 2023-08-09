import cssLink from './style.css?url';

/**
 * An element that allows you to edit an SVG image.
 *
 * @element editable-image
 * @slot - The SVG image to edit.
 * @slot controls - The controls inputs to edit the image.
 */
export class EditableImage extends HTMLElement {
	static get observedAttributes() { return ['width', 'height', 'file-name']; }

	declare shadowRoot: ShadowRoot;

	#controlEventsMap = new Map<HTMLElement, EventListener>();

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });

		this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="${cssLink}"/>

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
		`;
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

		this.shadowRoot.querySelector('slot:not([name])')?.addEventListener('slotchange', async (evt) => {
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
			}
		});

		this.shadowRoot.querySelector('slot[name="controls"]')?.addEventListener('slotchange', (slotEvent) => {
			const assignedElements = (slotEvent.target as HTMLSlotElement).assignedElements() as HTMLElement[];
			const newElements = assignedElements.filter((child) => !this.#controlEventsMap.has(child));

			newElements.forEach((element) => {
				const eventListener: EventListener = (evt) => {
					const target = evt.target as HTMLInputElement;

					if (target.type === 'radio') {
						const elementsToUpdate = this.shadowRoot.querySelectorAll<SVGElement>(`.${target.name}`);

						elementsToUpdate.forEach((elementToUpdate) => {
							elementToUpdate.style.visibility = elementToUpdate.classList.contains(target.value) ? 'visible' : 'hidden';
						});
					} else if (target.type === 'text') {
						const elementsToUpdate = this.shadowRoot.querySelectorAll<SVGElement>(`.${target.name}`);

						elementsToUpdate.forEach((elementToUpdate) => {
							elementToUpdate.textContent = target.value;
						});
					}
				};

				element.addEventListener('input', eventListener);

				this.#controlEventsMap.set(element, eventListener);
			});

			const removedElements = Array.from(this.#controlEventsMap.keys()).filter((element) => !assignedElements.includes(element));

			removedElements.forEach((element) => {
				element.removeEventListener('input', this.#controlEventsMap.get(element) as EventListener);

				this.#controlEventsMap.delete(element);
			});
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (newValue !== oldValue) {
			switch (name) {
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

if (!customElements.get('editable-image')) {
	customElements.define('editable-image', EditableImage);
}
