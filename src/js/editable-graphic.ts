import { DownloadableImage } from './downloadable-image';

export class EditableGraphic extends DownloadableImage {
	static get observedAttributes() { return ['text', 'subtext', 'side', 'mode']; }

	constructor() {
		super();

		this.shadowRoot.querySelector('style')?.insertAdjacentHTML('afterend', `
			<style>
				fieldset {
					display: inline-block;
					min-width: 15rem;
				}

				input[type="text"] {
					width: 15rem;
				}
			</style>
		`);

		this.shadowRoot.querySelector('#controls')?.insertAdjacentHTML('afterbegin', `
			<div>
				<label for="text">
					Text
					<input name="text" id="text" type="text" maxlength="20" value=""/>
				</label>

				<label for="subtext">
					Subtext
					<input name="subtext" id="subtext" type="text" maxlength="20" value=""/>
				</label>
			</div>

			<div>
				<fieldset>
					<legend>CN Tower Side</legend>

					<label for="side-left">
						<input name="side" id="side-left" type="radio" value="left" />
						Left
					</label>

					<label for="side-right">
						<input name="side" id="side-right" type="radio" value="right" />
						Right
					</label>
				</fieldset>

				<fieldset>
					<legend>Mode</legend>

					<label for="mode-light">
						<input name="mode" id="mode-light" type="radio" value="light" />
						Light
					</label>

					<label for="mode-dark">
						<input name="mode" id="mode-dark" type="radio" value="dark" />
						Dark
					</label>
				</fieldset>
			</div>
		`);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		super.attributeChangedCallback(name, oldValue, newValue);

		if (newValue !== oldValue) {
			switch (name) {
				default:
			}
		}
	}
}

if (!customElements.get('editable-graphic')) {
	customElements.define('editable-graphic', EditableGraphic);
}
