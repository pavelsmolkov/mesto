export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
        return cardElement;
    }

    createCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__header').textContent = this._name;
        this._element.querySelector('.card__image').setAttribute('src', this._link);
        this._element.querySelector('.card__image').setAttribute('alt', this._name);
        this._handleImageClick(this._element, this._name, this._link);
        this._handleLike();
        this._handleDelete();
        return this._element;
    }

    _handleLike() {
        const cardLike = this._element.querySelector('.card__like');
        cardLike.addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__like_active');
        });
    }

    _handleDelete() {
        const deleteButton = this._element.querySelector('.card__trash');
        deleteButton.addEventListener('click', function (evt) {
            evt.target.closest('.card').remove();
        })
    }
}