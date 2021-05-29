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

const addPopup = new PopupWithForm('.popup_add', handleAddCardFormSubmit);
addPopup.setEventListeners();

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item, '.item-template', (name, link) => {
      previewPopup.open(name, link);
    });
    const cardElement = newCard.createCard();
    defaultCardList.addItem(cardElement);
  }}, '.cards');

defaultCardList.renderItems();

function handleAddCardFormSubmit(data) {
  addPopup.close(addCardForm);

  data.name = data.placeValue;
  data.link = data.urlValue;
  defaultCardList.addUserItem(createNewCard(data));
}

const createNewCard = (data) => {
  const cardElement = new Card(data, ".item-template", (name, link) => {
    previewPopup.open(name, link);
  });
  const cardEl = cardElement.createCard();
  return cardEl;
}

const previewPopup = new PopupWithImage('.popup_preview');
previewPopup.setEventListeners();

const userInfo = new UserInfo(userInputSelector);

//обработчик отправки формы профиля
function handleProfileFormSubmit (data) {
  userInfo.setUserInfo(data.nameValue, data.jobValue);
  editPopup.close(editProfileForm);
}

// слушатель кнопки открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  jobInput.value = currentUserInfo.job;
  editPopup.open();
});

//слушатель кнопки добавления новой карточки (Создать)
addButton.addEventListener('click', () => {
  // document.forms.addCardForm.reset();
  addPopup.open();
});

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

const editPopup = new PopupWithForm('.popup_edit', handleProfileFormSubmit);
editPopup.setEventListeners();