import { ESC } from '../scripts/script.js'

export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }


    open() {
        document.querySelector(this._popupSelector).classList.add('popup_opened');
    }

    close() {
        document.querySelector(this._popupSelector).classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.code === ESC) {
            this.close();
        }
    }

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
    }

}