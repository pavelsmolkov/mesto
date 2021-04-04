import { arr, sq } from './validate.js';


const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPreview = document.querySelector('.popup_preview');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
const closeButtonPreview = popupPreview.querySelector('.popup__close-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__field_input_name');
const jobInput = document.querySelector('.popup__field_input_job');
const popupImage = document.querySelector('.popup__image'); 
const popupText = document.querySelector('.popup__imagetext');
const editProfileForm = document.forms.editProfileForm;
const addCardForm = document.forms.addCardForm;
const itemTemplate = document.querySelector('.item-template').content;
const cardsContainer = document.querySelector('.cards');
const createButton = document.querySelector('.popup__create-button');
const cardInputName = document.querySelector('.popup__field_input_place');
const cardInputImage = document.querySelector('.popup__field_input_url');
const documentPage = document.querySelector('.page');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};


class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    // this._htmlElementCardImage = this._htmlElement.querySelector('.card__image');
    this._element.querySelector('.card__header').textContent = this._name;
    this._element.querySelector('.card__image').setAttribute('src', this._link);
    this._element.querySelector('.card__image').setAttribute('alt', this._name);
    // this._element.setAttribute('alt', this._name);
    // нужно добавить функции:
    this._handleImageClick(this._element, this._name, this._link);
    this._handleLike();
    this._handleDelete();
    return this._element;
  }

  _handleImageClick(element, name, link) {
    const cardImage = element.querySelector('.card__image');
    cardImage.addEventListener('click', function () {
      popupImage.src = link;
      popupText.textContent = name;
      popupImage.setAttribute('alt', name);
      openPopup(popupPreview);
    });
  }

  _handleLike() {
    const cardLike = this._element.querySelector('.card__like');
    cardLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__like_active');
    });
  }

  _handleDelete() {
    const deleteButton = this._element.querySelector('.card__trash');
    deleteButton.addEventListener('click', function (evt) {
      evt.target.closest('.card').remove();
    })
  }
}

//универсальная функция открытия попапа со слушателями на Esc и клик на оверлее
function openPopup(popup) {
  const submitButton = popup.querySelector('.popup__button');
  if (submitButton) {
    inactiveFormButton(submitButton);
  }
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByClick);
  document.addEventListener('keydown', closePopupEsc);
}

function inactiveFormButton(submitButton) {
  submitButton.setAttribute("disabled", true);
  submitButton.classList.add('popup__button_disabled');
};

function closePopupByClick(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup')) {
    closePopup(popupOpened);
  }
}

function closePopupEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.code === 'Escape') {
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

//отрисовка исходного массива дефолтных карточек
initialCards.forEach( (card) => {
  const newCard = new Card(card, '.item-template');
  const cardElement = newCard.createCard();
  cardsContainer.append(cardElement);
});

// добавление новой карточки в грид
function addCard(card) {
  cardsContainer.prepend(card.createCard());
}

//обработчик добавления новой карточки
function handleAddCard (evt) {
  evt.preventDefault();
  card = {
    name: cardInputName.value,
    link: cardInputImage.value
  };

  const newCard = new Card (card, '.item-template');
  addCard(newCard);
  closePopup(popupAdd);
}

// слушатель кнопки редактирования профиля
editButton.addEventListener('click', () => {
  openPopup(popupEdit)
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

//слушатель кнопки создания новой карточки
addCardForm.addEventListener('submit', handleAddCard);

