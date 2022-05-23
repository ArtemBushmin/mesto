import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._submitForm = submitForm;
  }

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.id] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
