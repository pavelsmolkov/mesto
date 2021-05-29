export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__error_visible'
};

export const initialCards = [
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

export const popupEdit = document.querySelector('.popup_edit');
export const popupAdd = document.querySelector('.popup_add');
export const popupPreview = document.querySelector('.popup_preview');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const closeButtonEdit = popupEdit.querySelector('.popup__close-button');
export const closeButtonAdd = popupAdd.querySelector('.popup__close-button');
export const closeButtonPreview = popupPreview.querySelector('.popup__close-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const nameInput = document.querySelector('.popup__field_input_name');
export const jobInput = document.querySelector('.popup__field_input_job');
export const popupImage = document.querySelector('.popup__image');
export const popupText = document.querySelector('.popup__imagetext');
export const editProfileForm = document.forms.editProfileForm;
export const addCardForm = document.forms.addCardForm;
export const itemTemplate = document.querySelector('.item-template').content;
export const cardsContainer = document.querySelector('.cards');
export const createButton = document.querySelector('.popup__create-button');
export const cardInputName = document.querySelector('.popup__field_input_place');
export const cardInputImage = document.querySelector('.popup__field_input_url');
export const documentPage = document.querySelector('.page');
export const userInputSelector = {
    nameUserSelector: '.profile__title',
    jobUserSelector: '.profile__subtitle'
}