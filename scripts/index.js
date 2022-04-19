const ESC_CODE = 'Escape';
const openProfileBtn = document.querySelector('.profile__button');
const closeProfileBtn = document.getElementById('closeProfile');
const formProfileElement = document.getElementById('popupProfile');
const formProfile = document.getElementById('profile-form');
const formCard = document.getElementById('add-form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const authorName = document.getElementById('name');
const authorJob = document.getElementById('job');
//const cardTemplate = document.querySelector('.card').content;
const cardsContainer = document.querySelector('.photo-grid');
const openAddBtn = document.querySelector('.profile__add');
const closeAddBtn = document.getElementById('closeAdd');
const formAddCard = document.getElementById('popupAdd');
const nameAddCard = document.querySelector('.popup__input_type_nameCard');
const linkAddCard = document.querySelector('.popup__input_type_linkCard');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const closeImageBtn = document.getElementById('closeImage');
const popupImageOpen = document.getElementById('popupImage');
const popupFormAdd = document.getElementById('add-form');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

nameInput.value = authorName.textContent;
jobInput.value = authorJob.textContent;

class Card {
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


class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
  }

  _showInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._data.errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(){
    this._buttonElement = this._form.querySelector(this._data.submitButtonSelector);
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
  } else {
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);

  }
  }

  enableValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector));
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}

const formValidProfile = new FormValidator(validationSetting, formProfile);
const formValidCard = new FormValidator(validationSetting, formCard);
/*
function createCard (name, link) {
  const card = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const cardImage = card.querySelector('.photo-grid__image');
  const nameCard = card.querySelector('.photo-grid__name');
  const like = card.querySelector('.photo-grid__heart');
  const cardDelete = card.querySelector('.photo-grid__delete');

  cardImage.src = link;
  cardImage.alt = name;
  nameCard.textContent = name;
  const cardLike = (evt) => {evt.target.classList.toggle('photo-grid__heart_active')};
  like.addEventListener('click', cardLike);
  const cardDeleteAction = (evt) => {evt.target.closest('.photo-grid__item').remove()};
  cardDelete.addEventListener('click', cardDeleteAction);
  const popupImageAction = () => {
    openPopup(popupImageOpen);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
  };
  cardImage.addEventListener('click', popupImageAction);

  return card;
}
*/

function addCard (container, cardElement) {
  container.prepend(cardElement);
}

function startCards () {
  initialCards.forEach((card) => {addCard(cardsContainer, new Card(card, '.card').generateCard());});
}

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass){
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
} else {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);

}
}

function openProfileFunc() {
  openPopup(formProfileElement);
  nameInput.value = authorName.textContent;
  jobInput.value = authorJob.textContent;
  const inputList = Array.from(formProfileElement.querySelectorAll('.popup__input'));
  const buttonElement = formProfileElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement, 'popup__submit_disabled');
}

function openAddFunc() {
  popupFormAdd.reset();
  openPopup(formAddCard);
  const inputList = Array.from(formAddCard.querySelectorAll('.popup__input'));
  const buttonElement = formAddCard.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement, 'popup__submit_disabled');
}

export function openPopup (openElement) {
  openElement.classList.add('popup_opened');
  openElement.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup.getElementsByTagName('form').length>0){
      closePopupForm(openedPopup);
    } else{
      closePopup(openedPopup);
    }
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup.getElementsByTagName('form').length>0){
      closePopupForm(openedPopup);
    } else{
      closePopup(openedPopup);
    }
  }
}

function closePopup(closeElement) {
  closeElement.classList.remove('popup_opened');
  closeElement.removeEventListener('click', closeByOverlay);
  document.removeEventListener('keydown', closeByEsc);
}

function resetErrorForm (closeElement){
  closeElement.querySelectorAll('.popup__error').forEach ((element) => {element.classList.remove('popup__error_visible');});
  closeElement.querySelectorAll('.popup__input').forEach ((element) => {element.classList.remove('popup__input_type_error');});
  //в этом месте функция toggleButtonState() отрабатывает не так как нужно
}

function closePopupForm(closeElement){
  resetErrorForm (closeElement);
  closePopup(closeElement);
}

function submitProfileForm (evt) {
  evt.preventDefault();
  authorName.textContent = nameInput.value;
  authorJob.textContent = jobInput.value;
  closePopupForm(formProfileElement);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  addCard(cardsContainer, new Card({name:nameAddCard.value, link:linkAddCard.value}, '.card').generateCard());
  closePopupForm(formAddCard);
}

startCards();

formProfileElement.addEventListener('submit', submitProfileForm);
formAddCard.addEventListener('submit', formAddSubmitHandler);
openProfileBtn.addEventListener('click', openProfileFunc);
openAddBtn.addEventListener('click', openAddFunc);
closeProfileBtn.addEventListener('click', () => {closePopupForm(formProfileElement)});
closeAddBtn.addEventListener('click', () => {closePopupForm(formAddCard)});
closeImageBtn.addEventListener('click',() => {closePopup(popupImageOpen)});
formValidProfile.enableValidation();
formValidCard.enableValidation();
