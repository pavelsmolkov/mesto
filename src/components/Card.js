export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._element = this._getTemplate(this._cardSelector);
        this._image = this._element.querySelector(".card__image");
        this._cardLike = this._element.querySelector('.card__like');
        this._deleteButton = this._element.querySelector('.card__trash');
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
        this._element.querySelector('.card__header').textContent = this._name;
        this._image.setAttribute('src', this._link);
        this._image.setAttribute('alt', this._name);

        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._image.addEventListener("click", () => {
            this._handleImageClick(this._name, this._link);
        });

        this._cardLike.addEventListener('click', function (evt) {
            evt.target.classList.toggle('card__like_active');
        });

        this._deleteButton.addEventListener('click', function (evt) {
            evt.target.closest('.card').remove();
        })
    }
}