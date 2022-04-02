const ESC_CODE = 'Escape';
const openProfileBtn = document.querySelector('.profile__button');
const closeProfileBtn = document.getElementById('closeProfile');
const formProfileElement = document.getElementById('popupProfile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const authorName = document.getElementById('name');
const authorJob = document.getElementById('job');
const cardTemplate = document.querySelector('.card').content;
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

nameInput.value = authorName.textContent;
jobInput.value = authorJob.textContent;

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

function addCard (container, cardElement) {
  container.prepend(cardElement);
}

function startCards () {
  initialCards.forEach((card) => {addCard(cardsContainer, createCard (card.name, card.link));});
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

function openPopup (openElement) {
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
  addCard(cardsContainer, createCard(nameAddCard.value, linkAddCard.value));
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
