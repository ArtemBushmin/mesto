const openProfileBtn = document.querySelector('.profile__button');
const closeProfileBtn = document.getElementById('closeProfile');
const formElement = document.getElementById('popupProfile');
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
  openPopup(formElement);
  nameInput.value = authorName.textContent;
  jobInput.value = authorJob.textContent;
}

function openAddFunc() {
  popupFormAdd.reset();
  openPopup(formAddCard);
}

function openPopup (openElement) {
  openElement.classList.add('popup_opened');
  openElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeFunc(openElement);
  }});
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeFunc(openElement);
  }});
}

function closeFunc(closeElement) {
  closeElement.classList.remove('popup_opened');
  closeElement.querySelectorAll('.popup__error').forEach ((element) => {element.classList.remove('popup__error_visible');});
  closeElement.querySelectorAll('.popup__input').forEach ((element) => {element.classList.remove('popup__input_type_error');});
  if(closeElement === formElement){
    closeElement.querySelector('.popup__submit').classList.remove('popup__submit_disabled');
    closeElement.querySelector('.popup__submit').removeAttribute('disabled', true);
  } else{
    closeElement.querySelector('.popup__submit').classList.add('popup__submit_disabled');
    closeElement.querySelector('.popup__submit').setAttribute('disabled', false);
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  authorName.textContent = nameInput.value;
  authorJob.textContent = jobInput.value;
  closeFunc(formElement);
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  addCard(cardsContainer, createCard(nameAddCard.value, linkAddCard.value));
  closeFunc(formAddCard);
}

startCards();

formElement.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', formAddSubmitHandler);
openProfileBtn.addEventListener('click', openProfileFunc);
openAddBtn.addEventListener('click', openAddFunc);
closeProfileBtn.addEventListener('click', () => {closeFunc(formElement)});
closeAddBtn.addEventListener('click', () => {closeFunc(formAddCard)});
closeImageBtn.addEventListener('click',() => {closeFunc(popupImageOpen)});
