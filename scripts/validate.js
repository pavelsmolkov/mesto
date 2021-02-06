let formSelector = document.querySelector('.popup__form')
let inputSelector = document.querySelector('.popup__field')
const formError = formSelector.querySelector(`.${inputSelector.id}-error`);

// проверка валидности поля
const isValid = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

// добавление класса с ошибкой
const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

// удаление класса с ошибкой
const hideInputError = (formSelector, inputSelector) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__field_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};
 
formSelector.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formSelector.querySelectorAll('.popup__field'));
  const buttonElement = formSelector.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    // добавление каждому полю обработчика события input
    inputElement.addEventListener('input', () => {
      // проверка на валидность
      isValid(formSelector, inputElement);
      // изменение состояния активности кнопки формы
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // массив форм в DOM
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
});

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  }
};