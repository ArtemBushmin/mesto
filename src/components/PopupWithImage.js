import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(evt) {
    this._link = evt.srcElement.currentSrc;
    this._name = evt.srcElement.alt;
    this._image = this._popupElement.querySelector(".popup__image");
    this._caption = this._popupElement.querySelector(".popup__caption");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._caption.textContent = this._name;
    super.open();
  }
}
