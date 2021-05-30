import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupText = this._popup.querySelector('.popup__imagetext');
    }

    open(name, link) {
        super.open();
        this._popupImage.src = link;
        this._popupText.textContent = name;
        this._popupImage.setAttribute('alt', name);
    }
}