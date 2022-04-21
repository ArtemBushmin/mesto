import FormValidator from './FormValidator.js';
import Card from './Card.js';

const ESC_CODE = 'Escape';
const profileOpenBtn = document.querySelector('.profile__button');
const profileCloseBtn = document.getElementById('closeProfile');
const formProfileElement = document.getElementById('popupProfile');
const formProfile = document.getElementById('profile-form');
const formCard = document.getElementById('add-form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const authorName = document.getElementById('name');
const authorJob = document.getElementById('job');
const cardsContainer = document.querySelector('.photo-grid');
const addOpenBtn = document.querySelector('.profile__add');
const addCloseBtn = document.getElementById('closeAdd');
const formAddCard = document.getElementById('popupAdd');
const nameAddCard = document.querySelector('.popup__input_type_nameCard');
const linkAddCard = document.querySelector('.popup__input_type_linkCard');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
const imageCloseBtn = document.getElementById('closeImage');
export const popupImageOpen = document.getElementById('popupImage');
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

const formValidProfile = new FormValidator(validationSetting, formProfile);
const formValidCard = new FormValidator(validationSetting, formCard);

function addCard (container, cardElement) {
  container.prepend(cardElement);
}

function createCard (card) {
  addCard(cardsContainer, new Card(card, '.card').generateCard());
}

function startCards () {
  initialCards.forEach((card) => {createCard(card);});
}

function openProfileFunc() {
  nameInput.value = authorName.textContent;
  jobInput.value = authorJob.textContent;
  formValidProfile.toggleButtonState();
  openPopup(formProfileElement);
}

function openAddFunc() {
  popupFormAdd.reset();
  formValidCard.toggleButtonState();
  openPopup(formAddCard);
}

export function openPopup (openElement) {
  openElement.classList.add('popup_opened');
  openElement.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
}

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
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
}

function submitProfileForm (evt) {
  evt.preventDefault();
  authorName.textContent = nameInput.value;
  authorJob.textContent = jobInput.value;
  closePopup(formProfileElement);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  createCard ({name:nameAddCard.value, link:linkAddCard.value});
  closePopup(formAddCard);
}

startCards();

formProfileElement.addEventListener('submit', submitProfileForm);
formAddCard.addEventListener('submit', formAddSubmitHandler);
profileOpenBtn.addEventListener('click', () => {
  resetErrorForm (formProfileElement);
  openProfileFunc();});
addOpenBtn.addEventListener('click', () => {
  resetErrorForm (formAddCard);
  openAddFunc();});
profileCloseBtn.addEventListener('click', () => {closePopup(formProfileElement)});
addCloseBtn.addEventListener('click', () => {closePopup(formAddCard)});
imageCloseBtn.addEventListener('click',() => {closePopup(popupImageOpen)});
formValidProfile.enableValidation();
formValidCard.enableValidation();
