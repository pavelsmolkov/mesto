import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';

export { ESC };

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


const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item, '.item-template', openPopup, popupImage, popupText, popupPreview);
    const cardElement = newCard.createCard();
    defaultCardList.addItem(cardElement);
  }}, '.cards');

// const data = [
//     {
//       name: 'Архыз!!',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     }];




// const newCard = new Card(data, '.item-template', openPopup, popupImage, popupText, popupPreview);
// const cardElement = newCard.createCard();
// userCard.addItem(cardElement);

// обработчик добавления новой карточки
function handleAddCard () {
  let data = [{
    name: cardInputName.value,
    link: cardInputImage.value
  }];
  closePopup(popupAdd);
  return data;
}

// слушатель кнопки создания новой карточки
addCardForm.addEventListener('submit', () => {
  const data = handleAddCard();

  const userCard = new Section({
    items: data,
    renderer: (data) => {
      const newCard = new Card(data, '.item-template', openPopup, popupImage, popupText, popupPreview);
      const cardElement = newCard.createCard();
      userCard.addItem(cardElement);
    }}, '.cards');

  userCard.renderItems();

});


//универсальная функция открытия попапа со слушателями на Esc и клик на оверлее
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupEsc);
}

function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function closePopupEsc(evt) {
  if (evt.code === ESC) {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupByClick);
  document.removeEventListener('keydown', closePopupEsc);
}

//обработчик отправки формы профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

// function createCard(item) {
//   const newCard = new Card(item, '.item-template', openPopup, popupImage, popupText, popupPreview);
//   return newCard.createCard();
// }



// слушатель кнопки редактирования профиля
editButton.addEventListener('click', () => {
  editPopup.open();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

//слушатель кнопки редактирования профиля (Сохранить)
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

//слушатель кнопки добавления новой карточки (Создать)
addButton.addEventListener('click', () => {
  document.forms.addCardForm.reset();
  openPopup(popupAdd)
});

//слушатель кнопки закрытия попапа редактирования профиля
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));

//слушатель кнопки закрытия попапа новой карточки
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));

//слушатель кнопки закрытия попапа с превью картинки
closeButtonPreview.addEventListener('click', () => closePopup(popupPreview));





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

defaultCardList.renderItems();


const editPopup = new Popup('.popup_add');
// editPopup.close();
editPopup.setEventListeners();

// editPopup.addEventListener('click', closePopupByClick);
// document.addEventListener('keydown', closePopupEsc);