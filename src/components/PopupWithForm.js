import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;

    }

    close() {
        super.close();
        this._form.reset();
        document.querySelector(this._popupSelector).classList.remove('popup_opened');
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__field');
        this._formValues = {};
        this._inputList.forEach((input) =>
            this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitFormCallback(this._getInputValues());
        });
    }
}