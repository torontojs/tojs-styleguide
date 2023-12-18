/* eslint-disable no-bitwise, @typescript-eslint/no-magic-numbers */

import cssLink from './style.css?url';

/**
 * An element to display a color and it's value in various formats.
 * It also sets the background color of the element to the selected color.
 * The text color changes based on the background color.
 *
 * @element color-box
 */
export class ColorBox extends HTMLElement {
	static get observedAttributes() { return ['color', 'color-name']; }

	#root: ShadowRoot;

	constructor() {
		super();

		this.#root = this.attachShadow({ mode: 'open' });
		this.#root.innerHTML = `
			<link rel="stylesheet" href="${cssLink}"/>
			<div id="color-box">
				<h4>"<span id="color-name"></span>"</h4>
				<span><code id="hex-code"></code></span>
				<br/>
				<span>HSL: <code id="h"></code>, <code id="s"></code>, <code id="l"></code></span>
				<br/>
				<span>RGB: <code id="r"></code>, <code id="g"></code>, <code id="b"></code></span>
			</div>
		`;
	}

	/**
	 * The background color of the image.
	 *
	 * @attr color
	 * @default '#ED342F'
	 */
	get color() {
		return this.getAttribute('color') ?? '#ED342F';
	}

	set color(value) {
		this.setAttribute('color', value);

		const rgbColor = this.#hexToRgb(value ?? '');
		const hslColor = this.#hexToHsl(value ?? '');

		this.style.setProperty('--color', value);
		this.style.setProperty('--text-color', this.#getTextColorForBgColor(value));

		(this.#root.getElementById('hex-code') as HTMLSpanElement).innerText = value;

		(this.#root.getElementById('h') as HTMLSpanElement).innerText = hslColor.hue.toString();
		(this.#root.getElementById('s') as HTMLSpanElement).innerText = hslColor.saturation.toString();
		(this.#root.getElementById('l') as HTMLSpanElement).innerText = hslColor.lightness.toString();

		(this.#root.getElementById('r') as HTMLSpanElement).innerText = rgbColor.red.toString();
		(this.#root.getElementById('g') as HTMLSpanElement).innerText = rgbColor.green.toString();
		(this.#root.getElementById('b') as HTMLSpanElement).innerText = rgbColor.blue.toString();
	}

	/**
	 * The name of the color.
	 *
	 * @attr color-name
	 * @default ''
	 */
	get colorName() {
		return this.getAttribute('color-name') ?? '';
	}

	set colorName(value) {
		this.setAttribute('color-name', value);

		(this.#root.getElementById('color-name') as HTMLSpanElement).innerText = value;
	}

	#getTextColorForBgColor(color: string) {
		const red = parseInt(color.slice(1, 3), 16);
		const green = parseInt(color.slice(3, 5), 16);
		const blue = parseInt(color.slice(5, 7), 16);

		// https://stackoverflow.com/a/3943023/112731
		return ((red * 0.299) + (green * 0.587) + (blue * 0.114)) > 186
			? '#000000'
			: '#ffffff';
	}

	#hexToRgb(hex: string) {
		const bigint = parseInt(hex.replace(/^#/ui, ''), 16);
		const red = (bigint >> 16) & 255;
		const green = (bigint >> 8) & 255;
		const blue = bigint & 255;

		return { red, green, blue };
	}

	#hexToHsl(hex: string) {
		const rgbColor = this.#hexToRgb(hex);

		const red = rgbColor.red / 255;
		const green = rgbColor.green / 255;
		const blue = rgbColor.blue / 255;

		const max = Math.max(red, green, blue);
		const min = Math.min(red, green, blue);
		const delta = max - min;

		let hue = 0;
		let saturation = 0;
		let lightness = (max + min) / 2;

		if (max !== min) {
			if (lightness > 0.5) {
				saturation = delta / (2 - max - min);
			} else {
				saturation = delta / (max + min);
			}

			switch (max) {
				case red:
					hue = ((green - blue) / delta) + (green < blue ? 6 : 0);
					break;
				case green:
					hue = ((blue - red) / delta) + 2;
					break;
				case blue:
					hue = ((red - green) / delta) + 4;
					break;
				default:
					break;
			}

			hue /= 6;
		}

		saturation = Math.round(saturation * 100);
		lightness = Math.round(lightness * 100);
		hue = Math.round(hue * 360);

		return { hue, saturation, lightness };
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			switch (name) {
				case 'color':
					this.color = newValue;
					break;
				case 'color-name':
					this.colorName = newValue;
					break;
				default:
					break;
			}
		}
	}
}

if (!customElements.get('color-box')) {
  customElements.define('color-box', ColorBox);
}
