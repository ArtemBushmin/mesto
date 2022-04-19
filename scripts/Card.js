import {openPopup, popupImageOpen, popupImage, popupCaption} from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);

    return cardElement;
  }

  _popupImageAction() {
    openPopup(popupImageOpen);
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.photo-grid__heart').addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-grid__heart_active');
    });

    this._element.querySelector('.photo-grid__delete').addEventListener('click', (evt) => {
      evt.target.closest('.photo-grid__item').remove();
    });

    this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
      this._popupImageAction();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__image').alt = this._name;
    this._element.querySelector('.photo-grid__name').textContent = this._name;

    return this._element;
  }
}
