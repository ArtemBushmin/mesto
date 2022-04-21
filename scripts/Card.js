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
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupImageOpen);
  }

  _handleLikeButton(evt) {
    this._likeButton.classList.toggle('photo-grid__heart_active');
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._handleLikeButton(evt);
    });

    this._element.querySelector('.photo-grid__delete').addEventListener('click', (evt) => {
      this._element.remove();
      this._element = null;
    });

    this._element.querySelector('.photo-grid__image').addEventListener('click', () => {
      this._popupImageAction();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-grid__heart');
    this._setEventListeners();

    this._element.querySelector('.photo-grid__image').src = this._link;
    this._element.querySelector('.photo-grid__image').alt = this._name;
    this._element.querySelector('.photo-grid__name').textContent = this._name;

    return this._element;
  }
}
