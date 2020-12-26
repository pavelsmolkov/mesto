let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

let nameInput = document.querySelector('.popup__name');
let profileTitle = document.querySelector('.profile__title');
let jobInput = document.querySelector('.popup__job');
let profileSubtitle = document.querySelector('.profile__subtitle');

nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

let formElement = document.querySelector('.popup__container');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__name');
    let jobInput = document.querySelector('.popup__job');

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    togglePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 