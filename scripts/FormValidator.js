export { FormValidator };

class FormValidator {
    constructor(config, form) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }

    _isValid = (inputSelector) => {
        if (!inputSelector.validity.valid) {
            this._showInputError(inputSelector, inputSelector.validationMessage);
        } else {
            this._hideInputError(inputSelector);
        }
    }

    _showInputError = (inputSelector, errorMessage) => {
        const errorElement = this._form.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError = (inputSelector) => {
        const errorElement = this._form.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            // добавление каждому полю обработчика события input
            inputElement.addEventListener('input', () => {
                // проверка на валидность
                this._isValid(inputElement);
                // изменение состояния активности кнопки формы
                this._toggleButtonState();
            });
        });
    }

    // _disableSubmitButtonByDefault() {
    //     this._form.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
    //     this._form.querySelector(this._submitButtonSelector).setAttribute('disabled', true);
    // }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._form);
    }

    // Функция принимает массив полей
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            return !inputElement.validity.valid;
        })
    }

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    disableSubmitButton() {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }
}