import '../components/downloadable-image';
import './editable-graphic.ts';
import './simple-graphic.ts';
import '../components/color-box';

import { registerTocLinksActions, registerTocMenuButton } from './toc';

window.addEventListener('DOMContentLoaded', () => {
	registerTocMenuButton();
	registerTocLinksActions();
});
