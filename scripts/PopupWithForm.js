import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
    }

    open() {
        document.querySelector(this._popupSelector).classList.add('popup_opened');
    }

    close() {
        document.querySelector(this._popupSelector).classList.remove('popup_opened');
    }

    _getInputValues() {
        this._element = document
            .querySelector(this._popupSelector);

        this._inputList = this._element.querySelectorAll('.popup__field');

        this._formValues = {};
        this._inputList.forEach((input) =>
            this._formValues[input.name] = input.value);
        return this._formValues;
    }
}