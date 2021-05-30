export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._keyEscape  = 'Escape';
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popup = document.querySelector(this._popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }

    _handleEscClose(evt) {
            if (evt.code === this._keyEscape) {
                this.close();
        }
    }
}