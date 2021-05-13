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

        // console.log(this._popupSelector);

        // const form = document
        //     .querySelector(this._popupSelector)
        //     .content
        //     .querySelector('.popup__container')
        //     .content
        //     .querySelector('.popup__form');
        // console.log(form);
        //
        //         form.reset();

        // this._popup = document
        //     .querySelector(`.${this._popupSelector}`);
        // this._form = this._popup
        //     .querySelector(`.${this._form}`).name;
        //
        // document.forms.`${this._form}`.reset();
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