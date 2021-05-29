import Popup from "./Popup.js";
import { addCardForm, editProfileForm } from "../pages/index";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
    }

    open() {
        super.open();
        document.querySelector(this._popupSelector).classList.add('popup_opened');
    }

    close() {
        super.close();
        this._data = this._getInputValues();
        editProfileForm.reset();
        addCardForm.reset();
        document.querySelector(this._popupSelector).classList.remove('popup_opened');
        return this._data;
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
        super.setEventListeners();
        document.querySelector(this._popupSelector).addEventListener('submit', this._submitFormCallback);
    }
}