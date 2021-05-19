import { ESC } from '../pages/index';

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        // this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        document.querySelector(this._popupSelector).classList.add('popup_opened');
    }

    close() {
        document.querySelector(this._popupSelector).classList.remove('popup_opened');
        this._removeEventListenerESC();
    }

    setEventListeners() {
        document.querySelector(this._popupSelector).addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
        this._handleEscClose();
        // document.addEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === ESC) {
                this.close();
            }
        });
    }

    _removeEventListenerESC() {
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }
}