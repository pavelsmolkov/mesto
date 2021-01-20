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


// открытие попапа профиля
function openPopup() {
  popupEdit.classList.toggle('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

//закрытие попапа профиля
function closePopup(item) {
  item.classList.remove('popup_opened');
}

//открытие попапа добавления места
function openAddPopup() {
  resetPopup();
  popupAdd.classList.toggle('popup_opened');
}

//закрытие попапа добавления места
function closeAddPopup() {
  popupAdd.classList.remove('popup_opened');
}

// Обработчик отправки формы профиля
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

// слушатель кнопки редактирования профиля
editButton.addEventListener('click', openPopup);

//слушатель кнопки закрытия попапа редактирования профиля
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));

//слушатель кнопки Сохранить редактирования профиля
formElement.addEventListener('submit', handleFormSubmit);

//слушатель кнопки Плюс добавления новой карточки
addButton.addEventListener('click', openAddPopup);

//слушатель кнопки закрытия попапа новой карточки
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));

//массив карточек для начального рендера
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

const itemTemplate = document.querySelector('.item_template').content;
const cards = document.querySelector('.cards');
const cardImage = itemTemplate.querySelector('.card__image');


function render() {
  initialCards.forEach(renderCard);
}

function renderAdded() {
  const allCards = document.querySelectorAll('.cards');
}

function renderCard(initialCards) {
  const htmlElement = itemTemplate.cloneNode(true);
  htmlElement.querySelector('.card__header').textContent = initialCards.name;
  htmlElement.querySelector('.card__image').setAttribute('src', initialCards.link); 
  handleLike(htmlElement);
  cards.appendChild(htmlElement);
}

render();

const createButton = document.querySelector('.popup__create-button');
const cardInputName = document.querySelector('.popup__field_input_place');
const cardInputImage = document.querySelector('.popup__field_input_url');

createButton.addEventListener('click', handleAddCard);

function handleAddCard (evt) {
  evt.preventDefault();
  const htmlElement = itemTemplate.cloneNode(true);
  htmlElement.querySelector('.card__header').textContent = cardInputName.value;
  htmlElement.querySelector('.card__image').setAttribute('src', cardInputImage.value);  
  handleLike(htmlElement);
  cards.prepend(htmlElement);
  closePopup(popupAdd);
  renderAdded()

}

function handleLike(htmlElement) {
  const cardLike = htmlElement.querySelector('.card__like');
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
}


function resetPopup() {
  cardInputName.value = "";
  cardInputImage.value = "";
}