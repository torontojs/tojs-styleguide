export class LogoWithBackgroundSelector extends HTMLElement {
	static get observedAttributes() { return ['color']; }

	#root: ShadowRoot;

	#colors = {
		'Toronto JS Red': '#ED342F',
		'CN tower at Night': '#5F1513',
		'Breaking News': '#F8ADAB',
		'Raccon Stripes': '#120606',
		'Downtown street': '#5C5856',
		'Slushy Snow': '#B9B4AD',
		'Wintery Sky': '#FDF7F8'
	};

	constructor() {
		super();

		this.#root = this.attachShadow({ mode: 'open' });
		this.#root.innerHTML = `
			<style>
				:host {
					display: block;
					--logo-background-color: ${Object.values(this.#colors)[0]};
				}

				#wrapper {
					display: inline-flex;
					width: fit-content;
					background-color: var(--logo-background-color);
				}

				#color-picker {
					margin: var(--margin-block) var(--margin-inline);
				}
			</style>
			<div id="wrapper">
				<slot></slot>
			</div>
			<div id="color-picker">
				<label for="monochrome-colors">Pick a background color:</label>
				<input id="monochrome-colors" list="monochrome-colors-suggestion" type="color" value="${Object.values(this.#colors)[0]}"/>
				<datalist id="monochrome-colors-suggestion">
					${Object.entries(this.#colors).map(([name, color]) => `<option value="${color}">${name}</option>`).join('')}
				</datalist>
			</div>
		`;

		this.setAttribute('color', Object.values(this.#colors)[0]);
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
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === 'color') {
			if (newValue !== oldValue && newValue in this.#colors) {
				this.style.setProperty('--logo-background-color', newValue);
				this.#root.querySelector('input')?.setAttribute('value', newValue);
			}
		}
	}
}

if (!customElements.get('logo-with-background-selector')) {
	customElements.define('logo-with-background-selector', LogoWithBackgroundSelector);
}
