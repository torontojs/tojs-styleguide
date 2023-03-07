import { colors } from './constants';

export class LogoWithBackgroundSelector extends HTMLElement {
	static get observedAttributes() { return ['color']; }

	#root: ShadowRoot;

	constructor() {
		super();

		this.#root = this.attachShadow({ mode: 'open' });
		this.#root.innerHTML = `
			<style>
				:host {
					display: block;
					--logo-background-color: ${Object.values(colors)[0]};
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
				<input id="monochrome-colors" list="monochrome-colors-suggestion" type="color" value="${Object.values(colors)[0]}"/>
				<datalist id="monochrome-colors-suggestion">
					${Object.entries(colors).map(([name, color]) => `<option value="${color}">${name}</option>`).join('')}
				</datalist>
			</div>
			<div id="download">
				<button type="button" id="download-svg">💾 Download SVG</button>
				<button type="button" id="download-png">💾 Download PNG</button>
			</div>
		`;

		this.setAttribute('color', Object.values(colors)[0]);

		if (this.hasAttribute('no-color-picker')) {
			this.style.setProperty('--logo-background-color', 'transparent');
		}
	}

	#getInvertFilterForColor(color: string) {
		/* eslint-disable @typescript-eslint/no-magic-numbers */
		const red = parseInt(color.slice(1, 3), 16);
		const green = parseInt(color.slice(3, 5), 16);
		const blue = parseInt(color.slice(5, 7), 16);

		// https://stackoverflow.com/a/3943023/112731
		return ((red * 0.299) + (green * 0.587) + (blue * 0.114)) > 186
			? 'invert(1)'
			: 'invert(0)';
		/* eslint-enable @typescript-eslint/no-magic-numbers */
	}

	#changeColor(evt: Event) {
		const input = evt.target as HTMLInputElement;

		this.style.setProperty('--logo-background-color', input.value);

		(this.#root.querySelector('slot')?.assignedElements() as HTMLElement[]).forEach((child) => {
			child.style.filter = this.#getInvertFilterForColor(input.value);
		});
	}

	connectedCallback() {
		this.#root.querySelector('input')?.addEventListener('input', (evt) => this.#changeColor(evt));

		(this.#root.querySelector('slot')?.assignedElements() as HTMLElement[]).forEach((child) => {
			child.style.filter = this.#getInvertFilterForColor(this.getAttribute('color') ?? '#ffffff');
		});

		this.#root.querySelector('#download-svg')?.addEventListener('click', () => {
			const img = this.querySelector('img') as HTMLImageElement;
			const link = document.createElement('a');

			link.download = `toronto-js-${this.getAttribute('file-name')}.svg`;
			link.href = img.src;
			link.click();
		});


		this.#root.querySelector('#download-png')?.addEventListener('click', () => {
			const img = this.querySelector('img') as HTMLImageElement;
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const MIN_IMG_SIZE = 1024;

			canvas.width = Math.max(img.naturalWidth, MIN_IMG_SIZE);
			canvas.height = Math.max(img.naturalHeight, MIN_IMG_SIZE);

			ctx?.drawImage(img, 0, 0);

			const link = document.createElement('a');
			const fileName = this.getAttribute('file-name');

			link.download = `toronto-js${fileName ? `-${fileName}` : ''}.png`;
			link.href = canvas.toDataURL('image/png');
			link.click();
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === 'color') {
			if (newValue !== oldValue && newValue in colors) {
				this.style.setProperty('--logo-background-color', newValue);
				this.#root.querySelector('input')?.setAttribute('value', newValue);
			}
		}
	}
}

if (!customElements.get('logo-with-background-selector')) {
	customElements.define('logo-with-background-selector', LogoWithBackgroundSelector);
}
