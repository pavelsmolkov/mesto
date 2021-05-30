import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = this._popup.querySelectorAll('.popup__field');
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {
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