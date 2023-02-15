export function registerTocMenuButton() {
	document.querySelector('#toc-button')?.addEventListener('click', () => {
		document.querySelector<HTMLDialogElement>('#toc')?.showModal();
	});
}
