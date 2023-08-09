import '../components';

import { registerTocLinksActions, registerTocMenuButton } from './toc';

window.addEventListener('DOMContentLoaded', () => {
	registerTocMenuButton();
	registerTocLinksActions();
});
