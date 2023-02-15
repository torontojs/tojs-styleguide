import './logo.ts';

import { registerTocMenuButton } from './buttons';
import { registerTocLinksActions } from './toc';

window.addEventListener('DOMContentLoaded', () => {
	registerTocMenuButton();
	registerTocLinksActions();
});
