import "./index.css";

import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

export { ESC, addCardForm, editProfileForm };

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  }
  ,
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
export const popupPreview = document.querySelector('.popup_preview');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
const closeButtonPreview = popupPreview.querySelector('.popup__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__field_input_name');
const jobInput = document.querySelector('.popup__field_input_job');
export const popupImage = document.querySelector('.popup__image');
export const popupText = document.querySelector('.popup__imagetext');
const editProfileForm = document.forms.editProfileForm;
const addCardForm = document.forms.addCardForm;
const itemTemplate = document.querySelector('.item-template').content;
const cardsContainer = document.querySelector('.cards');
const createButton = document.querySelector('.popup__create-button');
const cardInputName = document.querySelector('.popup__field_input_place');
const cardInputImage = document.querySelector('.popup__field_input_url');
const documentPage = document.querySelector('.page');
const ESC = 'Escape';
const userInputSelector = {
  nameUserSelector: '.profile__title',
  jobUserSelector: '.profile__subtitle'
}

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

function handleAddCardFormSubmit() {
  const data = addPopup.close(addCardForm);

  data.name = data.placeValue;
  data.link = data.urlValue;

  const userCard = new Section({
    items: data,
    renderer: (data) => {
      const newCard = new Card(data, '.item-template', (link, name) => {
          previewPopup.open(name, link);
        });
      const cardElement = newCard.createCard();
      userCard.addUserItem(cardElement);
    }}, '.cards');
  userCard.renderItem();
}

const previewPopup = new PopupWithImage('.popup_preview');
previewPopup.setEventListeners();

const userInfo = new UserInfo(userInputSelector);

//обработчик отправки формы профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  userInfo.setUserInfo(nameInput.value, jobInput.value);
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

//слушатель кнопки закрытия попапа редактирования профиля
closeButtonEdit.addEventListener('click', () => editPopup.close());

//слушатель кнопки закрытия попапа новой карточки
closeButtonAdd.addEventListener('click', () => addPopup.close());

//слушатель кнопки закрытия попапа с превью картинки
closeButtonPreview.addEventListener('click', () => {
  previewPopup.close()
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
