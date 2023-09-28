import cssLink from './style.css?url';

/**
 * A component to display a font family with a preview and space for a description/filler text.
 *
 * @element font-box
 * @slot - The description/filler text to display.
 */
export class FontBox extends HTMLElement {
	static get observedAttributes() { return ['font-name', 'font-family']; }

	declare shadowRoot: ShadowRoot;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });

		this.shadowRoot.innerHTML = `
			<link rel="stylesheet" href="${cssLink}"/>
			<blockquote>
				<h1>${this.fontName}</h1>

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
	 * @type {string}
	 */
	get fontName() {
		return this.getAttribute('font-name') ?? '';
	}

	set fontName(value) {
		this.setAttribute('font-name', value);

		(this.shadowRoot.querySelector('h1') as HTMLHeadingElement).textContent = value;
	}

	/**
	 * The font family to display.
	 *
	 * @attr font-family
	 * @type {string}
	 */
	get fontFamily() {
		return this.getAttribute('font-family') ?? '';
	}

	set fontFamily(value) {
		this.setAttribute('font-family', value);

		this.shadowRoot.querySelector('blockquote')?.style.setProperty('--font-family', value);
	}

	connectedCallback() {
		// TODO: fit text to box
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
				default:
					break;
			}
		}
	}
}

if (!customElements.get('font-box')) {
	customElements.define('font-box', FontBox);
}
