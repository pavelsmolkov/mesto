let popupEdit = document.querySelector('.popup_edit');
let popupAdd = document.querySelector('.popup_add');
let formElement = document.querySelector('.popup__container');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');

let closeButtonEdit = popupEdit.querySelector('.popup__close-button');
let closeButtonAdd = popupAdd.querySelector('.popup__close-button');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__field_input_name');
let jobInput = document.querySelector('.popup__field_input_job');

function openPopup() {
  popupEdit.classList.toggle('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function openAddPopup() {
  resetPopup();
  popupAdd.classList.toggle('popup_opened');
  // nameInput.value = profileTitle.textContent;
  // jobInput.value = profileSubtitle.textContent;
}

function closeAddPopup() {
  popupAdd.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editButton.addEventListener('click', openPopup);
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
formElement.addEventListener('submit', handleFormSubmit);

addButton.addEventListener('click', openAddPopup);
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));


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
  // ,
  // {
  //   name: 'Байкал',
  //   link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  // }
];

const itemTemplate = document.querySelector('.item_template').content;
const cards = document.querySelector('.cards');
const cardImage = itemTemplate.querySelector('.card__image');



function render() {
	initialCards.forEach(renderCard);
}

function renderCard(initialCards) {
  const htmlElement = itemTemplate.cloneNode(true);
  htmlElement.querySelector('.card__header').textContent = initialCards.name;
  htmlElement.querySelector('.card__image').setAttribute('src', initialCards.link);  
  cards.appendChild(htmlElement);
}

render();

const createButton = document.querySelector('.popup__create-button');
const cardInputName = document.querySelector('.popup__field_input_place');
const cardInputImage = document.querySelector('.popup__field_input_url');

function handleAddCard (evt) {
  evt.preventDefault();
  const htmlElement = itemTemplate.cloneNode(true);
  htmlElement.querySelector('.card__header').textContent = cardInputName.value;
  htmlElement.querySelector('.card__image').setAttribute('src', cardInputImage.value);  
  cards.prepend(htmlElement);
  closePopup(popupAdd);
} 

function resetPopup() {
  cardInputName.value = "";
  cardInputImage.value = "";
}

createButton.addEventListener('click', handleAddCard);
