export function registerTocLinksActions() {
	document.querySelectorAll<HTMLAnchorElement>('#toc a').forEach((link) => {
		link.addEventListener('click', () => {
			document.querySelector<HTMLDialogElement>('#toc')?.close();
		});
	});

	document.querySelector('#toc')?.addEventListener('click', (evt) => {
		const target = evt.target as HTMLDialogElement;

		if (target.matches('dialog')) {
			target.close();
		}
	});
}
