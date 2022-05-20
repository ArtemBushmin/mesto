import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(selector, delFunc) {
    super(selector);
    this._delFunc = delFunc;
  }

  open(id, card) {
    super.open();
    this._idCard = id;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._delFunc(this._idCard);
      this._card.remove();
      this._card = null;
      this.close();
    });
  }
}
