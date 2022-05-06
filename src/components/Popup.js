import { ESC_CODE } from "../utils/constants.js";

export default class Popup {
  constructor(selector) {
    this._popupElement = document.getElementById(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByOverlay = this._closeByOverlay.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", this._closeByOverlay);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener("click", this._closeByOverlay);
  }

  setEventListeners() {
    this._popupElementClose = this._popupElement.querySelector(".popup__close");
    this._popupElementClose.addEventListener("click", () => {
      this.close();
    });
  }

  _handleEscClose(evt) {
    if (evt.key === ESC_CODE) {
      this.close();
    }
  }

  _closeByOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }
}
