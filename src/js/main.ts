import './downloadable-image.ts';
import './simple-graphic.ts';
import './color-box.ts';

import { registerTocLinksActions, registerTocMenuButton } from './toc';

window.addEventListener('DOMContentLoaded', () => {
	registerTocMenuButton();
	registerTocLinksActions();
});
