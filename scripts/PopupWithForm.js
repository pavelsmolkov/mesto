import Popup from "./Popup.js";
import { addCardForm, editProfileForm } from "./script.js";

export default class PopupWithForm extends Popup {

    constructor(popupSelector, submitFormCallback) {
        super(popupSelector);
        this._submitFormCallback = submitFormCallback;
    }

    open() {
        document.querySelector(this._popupSelector).classList.add('popup_opened');
    }

    close() {
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
        // document.querySelector(this._popupSelector).addEventListener('click', (evt) => {
        //     if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        //         this.close();
        //     }
        // });
        // document.addEventListener('keydown', this._handleEscClose);
        super.setEventListeners();
        document.querySelector(this._popupSelector).addEventListener('submit', this._submitFormCallback);
/*        document.addEventListener('keydown', (evt) => {
            if (evt.code === ESC) {
                this.close();
            }
        });*/

    }
}