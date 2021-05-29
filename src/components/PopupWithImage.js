import Popup from "./Popup.js";
import { popupImage, popupText } from "../pages/index";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        super.open();
        popupImage.src = link;
        popupText.textContent = name;
        popupImage.setAttribute('alt', name);
        document.querySelector(this._popupSelector).classList.add('popup_opened');
    }
}