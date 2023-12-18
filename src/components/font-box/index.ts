import cssLink from './style.css?url';

/**
 * A component to display a font family with a preview and space for a description/filler text.
 *
 * @element font-box
 * @slot - The description/filler text to display.
 */
export class FontBox extends HTMLElement {
	static get observedAttributes() { return ['font-name', 'font-family', 'text-fit']; }

	declare shadowRoot: ShadowRoot;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });

		this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="${cssLink}"/>
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
		`;
	}

	/**
	 * The name of the font to display.
	 *
	 * @attr font-name
	 */
	get fontName() {
		return this.getAttribute('font-name') ?? '';
	}

	set fontName(value) {
		this.setAttribute('font-name', value);

		(this.shadowRoot.querySelector('text') as SVGTextElement).textContent = value;
	}

	/**
	 * The font family to display.
	 *
	 * @attr font-family
	 */
	get fontFamily() {
		return this.getAttribute('font-family') ?? '';
	}

	set fontFamily(value) {
		this.setAttribute('font-family', value);

		this.shadowRoot.querySelector('blockquote')?.style.setProperty('--font-family', value);
	}

	/**
	 * The multiplier to use for text fitting.
	 *
	 * @attr text-fit
	 * @default 0.5
	 */
	get textFit() {
		const valueAsNumber = Number.parseFloat(this.getAttribute('text-fit') ?? '0.5');

		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		return Number.isNaN(valueAsNumber) ? 0.5 : valueAsNumber;
	}

	set textFit(value) {
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		const normalizedValue = Number.isNaN(value) ? 0.5 : value;

		this.setAttribute('text-fit', normalizedValue.toString());

		this.#fitText();
	}

	#fitText() {
		const svg = this.shadowRoot.querySelector('svg') as SVGSVGElement;
		const svgText = this.shadowRoot.querySelector('text') as SVGTextElement;
		const text = svgText.textContent ?? '';
		const textSize = text.length;

		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		const svgWidth = textSize * this.textFit * 10;

		svg.setAttribute('viewBox', `0 0 ${svgWidth} 20`);
	}

	connectedCallback() {
		this.#fitText();

		const resizeObserver = new ResizeObserver(() => {
			this.#fitText();
		});

		resizeObserver.observe(this);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue !== newValue) {
			switch (name) {
				case 'font-name':
					this.fontName = newValue;
					break;
				case 'font-family':
					this.fontFamily = newValue;
					break;
				case 'text-fit':
					this.textFit = Number.parseFloat(newValue);
					break;
				default:
					break;
			}
		}
	}
}

if (!customElements.get('font-box')) {
	customElements.define('font-box', FontBox);
}
