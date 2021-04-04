export { enableValidation };

class FormValidator {
    constructor(config, form) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
    }

    _isValid = (formSelector, inputSelector) => {
        if (!inputSelector.validity.valid) {
            this._showInputError(formSelector, inputSelector, inputSelector.validationMessage, config);
        } else {
            this._hideInputError(formSelector, inputSelector, config);
        }
    };

    _showInputError = (formSelector, inputSelector, errorMessage, config) => {
        const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError = (formSelector, inputSelector, config) => {
        const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
        inputSelector.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _setEventListeners = (formSelector, config) => {
        const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
        const buttonElement = formSelector.querySelector(config.submitButtonSelector);
        inputList.forEach((inputElement) => {
            // добавление каждому полю обработчика события input
            inputElement.addEventListener('input', () => {
                // проверка на валидность
                this._isValid(formSelector, inputElement);
                // изменение состояния активности кнопки формы
                this._toggleButtonState(inputList, buttonElement, config);
            });
        });
    };

    enableValidation() {
        // массив форм в DOM
        const formList = Array.from(document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._setEventListeners(formElement, config);
        });
    };

    // Функция принимает массив полей
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            return !inputElement.validity.valid;
        })
    };

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
    _toggleButtonState = (inputList, buttonElement, config) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(config.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(config.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    };
}

const formList = Array.from(document.querySelectorAll(config.formSelector));
formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    const formValidate = new FormValidator(config, formElement);
    console.log(formValidate, formList);
    formValidate.enableValidation();
});

// // const config = {
// //   formSelector: '.popup__form',
// //   inputSelector: '.popup__field',
// //   submitButtonSelector: '.popup__button',
// //   inactiveButtonClass: 'popup__button_disabled',
// //   inputErrorClass: 'popup__field_type_error',
// //   errorClass: 'popup__error_visible'
// // }
//
// const formSelector = document.querySelector(config.formSelector);
// const inputSelector = document.querySelector(config.inputSelector);
// const formError = formSelector.querySelector(`.${inputSelector.id}-error`);
//
// class FormValidator {
//   constructor(config, form) {
//     this._formSelector = config.formSelector;
//     this._inputSelector = config.inputSelector;
//     this._submitButtonSelector = config.submitButtonSelector;
//     this._inactiveButtonClass = config.inactiveButtonClass;
//     this._inputErrorClass = config.inputErrorClass;
//     this._errorClass = config.errorClass;
//     this._form = form;
//   }
//
//   _isValid = (formSelector, inputSelector) => {
//     if (!this._inputSelector.validity.valid) {
//       showInputError(formSelector, inputSelector, inputSelector.validationMessage, config);
//     } else {
//       hideInputError(formSelector, inputSelector, config);
//     }
//   };
//
//   _showInputError = (formSelector, inputSelector, errorMessage, config) => {
//     const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
//     inputSelector.classList.add(config.inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(config.errorClass);
//   };
//
//   _hideInputError = (formSelector, inputSelector, config) => {
//     const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
//     inputSelector.classList.remove(config.inputErrorClass);
//     errorElement.classList.remove(config.errorClass);
//     errorElement.textContent = '';
//   };
//
//
//   _setEventListeners = (formSelector, config) => {
//     const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
//     const buttonElement = formSelector.querySelector(config.submitButtonSelector);
//     inputList.forEach((inputElement) => {
//       // добавление каждому полю обработчика события input
//       inputElement.addEventListener('input', () => {
//         // проверка на валидность
//         isValid(formSelector, inputElement);
//         // изменение состояния активности кнопки формы
//         toggleButtonState(inputList, buttonElement, config);
//       });
//     });
//   };
//
//   enableValidation() {
//     // массив форм в DOM
//     const formList = Array.from(document.querySelectorAll(config.formSelector));
//     formList.forEach((formElement) => {
//       formElement.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//       });
//       setEventListeners(formElement, config);
//     });
//   };
//
//   // Функция принимает массив полей
//   const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//       // Если поле не валидно, колбэк вернёт true
//       return !inputElement.validity.valid;
//     })
//   };
//
// // Функция принимает массив полей ввода
// // и элемент кнопки, состояние которой нужно менять
//   _toggleButtonState = (inputList, buttonElement, config) => {
//     if (hasInvalidInput(inputList)) {
//       buttonElement.classList.add(config.inactiveButtonClass);
//       buttonElement.setAttribute('disabled', true);
//     } else {
//       buttonElement.classList.remove(config.inactiveButtonClass);
//       buttonElement.removeAttribute('disabled');
//     }
//   };
//
//
// }
//
// //
// // // проверка валидности поля
// // const isValid = (formSelector, inputSelector) => {
// //   if (!inputSelector.validity.valid) {
// //     showInputError(formSelector, inputSelector, inputSelector.validationMessage, config);
// //   } else {
// //     hideInputError(formSelector, inputSelector, config);
// //   }
// // };
// //
// // // добавление к элементу класса ошибки
// // const showInputError = (formSelector, inputSelector, errorMessage, config) => {
// //   const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
// //   inputSelector.classList.add(config.inputErrorClass);
// //   errorElement.textContent = errorMessage;
// //   errorElement.classList.add(config.errorClass);
// // };
// //
// // // удаление у элемента класса ошибки
// // const hideInputError = (formSelector, inputSelector, config) => {
// //   const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
// //   inputSelector.classList.remove(config.inputErrorClass);
// //   errorElement.classList.remove(config.errorClass);
// //   errorElement.textContent = '';
// // };
//
// formSelector.addEventListener('submit', function (evt) {
//   evt.preventDefault();
// });
//
// // const setEventListeners = (formSelector, config) => {
// //   const inputList = Array.from(formSelector.querySelectorAll(config.inputSelector));
// //   const buttonElement = formSelector.querySelector(config.submitButtonSelector);
// //   inputList.forEach((inputElement) => {
// //     // добавление каждому полю обработчика события input
// //     inputElement.addEventListener('input', () => {
// //       // проверка на валидность
// //       isValid(formSelector, inputElement);
// //       // изменение состояния активности кнопки формы
// //       toggleButtonState(inputList, buttonElement, config);
// //     });
// //   });
// // };
// //
// // function enableValidation(config) {
// //   // массив форм в DOM
// //   const formList = Array.from(document.querySelectorAll(config.formSelector));
// //   formList.forEach((formElement) => {
// //     formElement.addEventListener('submit', (evt) => {
// //       evt.preventDefault();
// //     });
// //     setEventListeners(formElement, config);
// //   });
// // };
//
// // enableValidation(config);
//
// // // Функция принимает массив полей
// // const hasInvalidInput = (inputList) => {
// //   return inputList.some((inputElement) => {
// //     // Если поле не валидно, колбэк вернёт true
// //     return !inputElement.validity.valid;
// //   })
// // };
//
// // Функция принимает массив полей ввода
// // и элемент кнопки, состояние которой нужно менять
// // const toggleButtonState = (inputList, buttonElement, config) => {
// //   if (hasInvalidInput(inputList)) {
// //     buttonElement.classList.add(config.inactiveButtonClass);
// //     buttonElement.setAttribute('disabled', true);
// //   } else {
// //     buttonElement.classList.remove(config.inactiveButtonClass);
// //     buttonElement.removeAttribute('disabled');
// //   }
// // };