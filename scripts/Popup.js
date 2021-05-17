import { ESC } from '../scripts/script.js'

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
    }

    setEventListeners() {
        document.querySelector(this._popupSelector).addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
        document.addEventListener('keydown', (evt) => {
            if (evt.code === ESC) {
                this.close();
            }
        });
        // document.addEventListener('keydown', this._handleEscClose);
    }

//     _handleEscClose(evt) {
//         if (evt.code === ESC) {
//             this.close();
//         }
//     }
}