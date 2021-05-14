import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
    }

    open() {
        document.querySelector(this._popupSelector).classList.add('popup_opened');
    }

    close(formElement) {
        formElement.reset();
        document.querySelector(this._popupSelector).classList.remove('popup_opened');
    }

    _getInputValues() {
        this._element = document.querySelector(this._popupSelector);
        this._inputList = this._element.querySelectorAll('.popup__field');

        this._formValues = {};
        this._inputList.forEach((input) =>
            this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        document.querySelector(this._popupSelector).addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('submit', this._submitFormCallback);
    }
}