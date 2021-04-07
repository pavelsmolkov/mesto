export { FormValidator };

// const config = {
//     formSelector: '.popup__form',
//     inputSelector: '.popup__field',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__field_type_error',
//     errorClass: 'popup__error_visible'
// };

class FormValidator {
    constructor(config, form) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
        // использую переменную из конструктора
        // в переменную ниже собираются все поля ввода для текущей формы
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    _isValid = (formSelector, inputSelector) => {
        if (!inputSelector.validity.valid) {
            this._showInputError(formSelector, inputSelector, inputSelector.validationMessage);
        } else {
            this._hideInputError(formSelector, inputSelector);
        }
    };

    _showInputError = (formSelector, inputSelector, errorMessage) => {
        const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError = (formSelector, inputSelector) => {
        const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _setEventListeners = (formSelector) => {
        // const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
        const buttonElement = formSelector.querySelector(this._submitButtonSelector);
        this._inputList.forEach((inputElement) => {
            // добавление каждому полю обработчика события input
            inputElement.addEventListener('input', () => {
                // проверка на валидность
                this._isValid(formSelector, inputElement);
                // изменение состояния активности кнопки формы
                this._toggleButtonState(this._inputList, buttonElement);
            });
        });
    };

    disableSubmitButtonByDefault() {
        this._form.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
        this._form.querySelector(this._submitButtonSelector).setAttribute('disabled', true);    }

    enableValidation() {
        // массив форм в DOM
        // const formList = Array.from(document.querySelectorAll(this._formSelector));

        // formList.forEach((formElement) => {
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(this._form);
            // this._disableSubmitButtonByDefault();
        }


    // Функция принимает массив полей
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            return !inputElement.validity.valid;
        })
    }

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }
}

