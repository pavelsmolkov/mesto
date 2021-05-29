export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        // this._handleEscClose = this._handleEscClose.bind(this);
        this._keyEscape  = 'Escape';
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        // this._removeEventListenerESC();
    }

    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });

        // this._handleEscClose();

    }

    _handleEscClose() {
        document.addEventListener('keydown', (evt) => {
            if (evt.code === this._keyEscape) {
                this.close();
            }
        });
    }

    // _removeEventListenerESC() {
    //     document.removeEventListener('keydown', this._handleEscClose.bind(this));
    // }
}