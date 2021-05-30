import "./index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import {
  config,
  initialCards,
  userInputSelector,
  editButton,
  addButton,
  nameInput,
  jobInput
} from "../utils/Constants.js";

//функциональность карточек
//универсальная функция создания карточек
const createNewCard = (data) => {
  const cardElement = new Card(data, ".item-template", (name, link) => {
    previewPopup.open(name, link);
  });
  const cardEl = cardElement.createCard();
  return cardEl;
}

//создание и отрисовка дефолтных карточек из массива
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardList.addItem(createNewCard(item));
  }}, '.cards');
defaultCardList.renderItems();

//создание модальных окон
const previewPopup = new PopupWithImage('.popup_preview');
previewPopup.setEventListeners();

const editPopup = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
editPopup.setEventListeners();

const addPopup = new PopupWithForm('.popup_add', handleAddCardFormSubmit);
addPopup.setEventListeners();

//объект с данными о пользователе
const userInfo = new UserInfo(userInputSelector);

//обработчик отправки формы профиля
function handleProfileFormSubmit (data) {
  userInfo.setUserInfo(data.nameValue, data.jobValue);
  editPopup.close();
}

//обработчик создания и отрисовки пользовательской карточки
function handleAddCardFormSubmit(data) {
  addPopup.close();
  data.name = data.placeValue;
  data.link = data.urlValue;
  defaultCardList.addUserItem(createNewCard(data));
}

// обработчики кнопок
// слушатель кнопки открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;
  editPopup.open();
});

//слушатель кнопки Создать (добавление новой карточки)
addButton.addEventListener('click', () => {
  addPopup.open();
});

// валидация форм
const formList = Array.from(document.querySelectorAll('.popup__form'));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    formValidate.disableSubmitButton();
  });
  const formValidate = new FormValidator(config, formElement);
  formValidate.enableValidation();
  formValidate.disableSubmitButton();
});