export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.append(element);
        // cardsContainer.prepend(createCard(card));
    }

    addUserItem(element) {
        this._container.prepend(element);
        // cardsContainer.prepend(createCard(card));
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item))
    }

    renderItem() {
        this._renderer(this._renderedItems);
    }
}