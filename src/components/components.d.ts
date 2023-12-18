/* eslint-disable @typescript-eslint/consistent-type-imports */

declare global {
	interface HTMLElementTagNameMap {
		'color-box': import('./color-box').ColorBox,
		'downloadable-image': import('./downloadable-image').DownloadableImage,
		'editable-image': import('./editable-image').EditableImage,
		'toc-list': import('./toc').TocList,
		'font-box': import('./font-box').FontBox
	}
}
