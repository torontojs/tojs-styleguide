import cssLink from './style.css?url';

/**
 * A table of contents component.
 *
 * It will walk through the document and find all headings to create the table of contents.
 * Also if the heading does not have an id, it will create one based on the text of the heading.
 * Lastly, it will add a link to the heading so that it can be easily linked to.
 *
 * @example
 * If you have a heading like this:
 * ```html
 * <h2>Heading</h2>
 * ```
 *
 * It will be converted to:
 * ```html
 * <h2 id="heading">Heading<a href="#heading">🔗</a></h2>
 * ```
 *
 * @element toc-list
 */

export class TocList extends HTMLElement {
	constructor() {
		super();

		this.innerHTML = `
			<link rel="stylesheet" href="${cssLink}"/>
			<dialog id="toc-container">
				<nav id="toc">
				</nav>
			</dialog>

			<button type="button" id="toc-button">≡</button>
		`;
	}

	#createItem(item: HTMLHeadElement, parentId = '') {
		const text = item.textContent?.trim() ?? 'MISSING TEXT';
		let { id } = item;

		if (!id) {
			id = text.replace(/\s+/iug, '-').replace(/[^a-zA-Z0-9]/iug, '').toLowerCase();

			item.id = id;
		}

		if (parentId !== '') {
			id = `${parentId}--${id}`;
		}

		const selfLink = document.createElement('a');

		selfLink.href = `#${id}`;
		selfLink.textContent = '🔗';
		selfLink.classList.add('header-link');

		item.appendChild(selfLink);

		const link = document.createElement('a');

		link.href = `#${id}`;
		link.textContent = text;

		return {
			link,
			id
		};
	}

	#createList(items: HTMLHeadElement[], currentId = '') {
		const listOfItems = document.createElement('ol');

		for (let index = 0; index < items.length; index += 1) {
			const item = items[index] as HTMLHeadElement;
			const itemLevel = item.tagName;

			const listItem = document.createElement('li');
			const { link, id } = this.#createItem(item, currentId);

			const nextItem = items[index + 1];
			const hasChildren = (nextItem?.tagName ?? 'H1') > itemLevel;

			if (!hasChildren) {
				listItem.appendChild(link);
				listOfItems.appendChild(listItem);
			} else {
				const nextItems = items.slice(index + 1);
				const nextSibling = nextItems.findIndex((i) => i.tagName === itemLevel);
				const lastItem = nextSibling === -1 ? nextItems.length : nextSibling;
				const children = nextItems.slice(0, lastItem);

				const details = document.createElement('details');
				const summary = document.createElement('summary');
				const subList = this.#createList(children, id);

				summary.appendChild(link);
				details.appendChild(summary);
				details.appendChild(subList);
				listItem.appendChild(details);

				listOfItems.appendChild(listItem);

				index += children.length;
			}
		}

		return listOfItems;
	}

	connectedCallback() {
		const tocButton = this.querySelector('#toc-button') as HTMLButtonElement;
		const tocContainer = this.querySelector('#toc-container') as HTMLDialogElement;
		const tocNav = this.querySelector('#toc') as HTMLElement;
		const tocHeader = document.createElement('a');
		const pageHeader = document.querySelector('h1') as HTMLHeadingElement;

		tocHeader.href = `#${pageHeader.id}`;
		tocHeader.textContent = pageHeader.textContent;

		tocNav.appendChild(tocHeader);

		const toc = this.#createList([...document.querySelectorAll('h2, h3, h4, h5, h6')]);

		tocNav.appendChild(toc);

		tocButton.addEventListener('click', () => {
			tocContainer.showModal();
		});

		tocContainer.addEventListener('click', (evt) => {
			const target = evt.target as HTMLElement;

			if (target.matches('a') || target.matches('dialog')) {
				tocContainer.close();
			}
		});
	}
}

if (!customElements.get('toc-list')) {
	customElements.define('toc-list', TocList);
}
