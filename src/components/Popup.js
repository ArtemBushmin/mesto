import {ESC_CODE} from './constants.js';

export default class Popup {
  constructor(selector) {
    this._popupElement = document.getElementById(selector);
  }

  open () {
    this._popupElement.classList.add('popup_opened');
  }

  close () {
    this._popupElement.classList.remove('popup_opened');
  }

  setEventListeners () {
    this._popupElementClose = this._popupElement.querySelector('.popup__close');
    this._popupElementClose.addEventListener('click', () => {this.close();}, { once: true });
    document.addEventListener('keydown', (evt) => {this._handleEscClose(evt);}, { once: true });
    this._popupElement.addEventListener('click', (evt) => {this._closeByOverlay(evt);}, { once: true });
  }

  _handleEscClose (evt) {
    if (evt.key === ESC_CODE) {
      this.close();
    }
  }

  _closeByOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }
}
