import '../components/downloadable-image/index.js';
import './editable-graphic.ts';
import './simple-graphic.ts';
import './color-box.ts';

import { registerTocLinksActions, registerTocMenuButton } from './toc';

window.addEventListener('DOMContentLoaded', () => {
	registerTocMenuButton();
	registerTocLinksActions();
});
