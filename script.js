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
const cards = document.querySelector('.cards');
const createButton = document.querySelector('.popup__create-button');
const cardInputName = document.querySelector('.popup__field_input_place');
const cardInputImage = document.querySelector('.popup__field_input_url');

//универсальная функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//заполнение формы редактирования профиля первоначальными значениями
function fillProfileFormWithPreviousValues() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

//универсальная функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//добавление новой карточки в грид
function addCard(card) {
  cards.prepend(createCard(card));
}

//отрисовка исходного массива дефолтных карточек
function renderInitialCards() {
  initialCards.forEach(function (card) {
      cards.appendChild(createCard(card));
    });
}

//создаем объект карточки
function createCard(card) {
  const htmlElement = itemTemplate.cloneNode(true);
  htmlElement.querySelector('.card__header').textContent = card.name;
  htmlElement.querySelector('.card__image').setAttribute('src', card.link); 
  htmlElement.querySelector('.card__image').setAttribute('alt', card.name); 
  handleImageClick(htmlElement);
  handleLike(htmlElement);
  handleDelete(htmlElement);
  return htmlElement;
}

//обработчик отправки формы профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit);
}

//обработчик добавления новой карточки
function handleAddCard (evt) {
  evt.preventDefault();
  let card = {
    name: null,
    link: null
  };
  card.name = cardInputName.value;
  card.link = cardInputImage.value;
  addCard(card);
  closePopup(popupAdd);
  return card;
}

//обработчик для показа попапа с превью карточки
function handleImageClick(htmlElement) {
  const cardImage = htmlElement.querySelector('.card__image');
  cardImage.addEventListener('click', function (evt) {
  popupImage.setAttribute('src', evt.target.src);
  popupText.textContent = evt.target.closest('.card').querySelector('.card__header').textContent;
  popupImage.setAttribute('alt', evt.target.alt);
  openPopup(popupPreview);
  });
}

//обработчик лайка на карточке
function handleLike(htmlElement) {
  const cardLike = htmlElement.querySelector('.card__like');
  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
}

//обработчик удаления карточки
function handleDelete(htmlElement) {
  const deleteButton = htmlElement.querySelector('.card__trash');
  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  })
}

// слушатель кнопки редактирования профиля
editButton.addEventListener('click', () => {
  openPopup(popupEdit)
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

//слушатель кнопки редактирования профиля (Сохранить)
editProfileForm.addEventListener('submit', handleFormSubmit);

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

renderInitialCards();