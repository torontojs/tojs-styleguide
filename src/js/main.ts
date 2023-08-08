import '../components/downloadable-image';
import '../components/color-box';

import { registerTocLinksActions, registerTocMenuButton } from './toc';

window.addEventListener('DOMContentLoaded', () => {
	registerTocMenuButton();
	registerTocLinksActions();
});
