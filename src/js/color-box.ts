/* eslint-disable no-bitwise, @typescript-eslint/no-magic-numbers, @typescript-eslint/restrict-template-expressions */
import { colorNames, colors } from './constants';

export class ColorBox extends HTMLElement {
	static get observedAttributes() { return ['color']; }

	#root: ShadowRoot;

	constructor() {
		super();

		this.#root = this.attachShadow({ mode: 'open' });
		this.#root.innerHTML = `
			<style>
				:host {
					--color: #000000;
					--text-color: #ffffff;
					--size: 12rem;

					box-sizing: border-box;
					width: var(--size);
					height: var(--size);

					text-align: center;

					display: inline-block;
					margin: var(--margin-inline);
					padding: var(--padding-inline);

					border-radius: var(--border-radius);
					border-width: var(--border-width);
					border-color: var(--border-color);
					border-style: solid;

					background-color: var(--color);
					color: var(--text-color);
				}

				code { user-select: all; }
			</style>
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

	#updateColor() {
		const colorAttribute = this.getAttribute('color');
		// Get either from color name or use the hex value
		const color = colors[colorAttribute ?? ''] ?? colorAttribute ?? '';
		const rgbColor = this.#hexToRgb(color ?? '');
		const hslColor = this.#hexToHsl(color ?? '');

		this.style.setProperty('--color', color);
		this.style.setProperty('--text-color', this.#getTextColorForBgColor(color));

		(this.#root.getElementById('color-name') as HTMLSpanElement).innerText = colorNames[colorAttribute ?? ''] ?? '';
		(this.#root.getElementById('hex-code') as HTMLSpanElement).innerText = color;

		(this.#root.getElementById('h') as HTMLSpanElement).innerText = hslColor.hue.toString();
		(this.#root.getElementById('s') as HTMLSpanElement).innerText = hslColor.saturation.toString();
		(this.#root.getElementById('l') as HTMLSpanElement).innerText = hslColor.lightness.toString();

		(this.#root.getElementById('r') as HTMLSpanElement).innerText = rgbColor.red.toString();
		(this.#root.getElementById('g') as HTMLSpanElement).innerText = rgbColor.green.toString();
		(this.#root.getElementById('b') as HTMLSpanElement).innerText = rgbColor.blue.toString();
	}

	connectedCallback() {
		this.#updateColor();
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			if (name === 'color') {
				this.#updateColor();
			}
		}
	}
}

if (!customElements.get('color-box')) {
  customElements.define('color-box', ColorBox);
}
