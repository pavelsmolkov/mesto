import Popup from "./Popup.js";
import { popupImage, popupText } from "./script.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
    }

    open(link, name) {
        popupImage.src = link;
        popupText.textContent = name;
        popupImage.setAttribute('alt', name);
        document.querySelector(this._popupSelector).classList.add('popup_opened');
    }
}