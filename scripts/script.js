const openProfile = document.querySelector('.profile__button');
const closeProfile = document.getElementById('closeProfile');
const formElement = document.getElementById('popupProfile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const authorName = document.getElementById('name');
const authorJob = document.getElementById('job');
const cardTemplate = document.querySelector('.card').content;
const cardsContainer = document.querySelector('.photo-grid');
const openAdd = document.querySelector('.profile__add');
const closeAdd = document.getElementById('closeAdd');
const formAdd = document.getElementById('popupAdd');
const nameAdd = document.querySelector('.popup__input_type_nameCard');
const linkAdd = document.querySelector('.popup__input_type_linkCard');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const closeImage = document.getElementById('closeImage');
const popupImageOpen = document.getElementById('popupImage');
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

function addCard (name, link) {
  const card = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const linkCard = card.querySelector('.photo-grid__image');
  const nameCard = card.querySelector('.photo-grid__name');
  const like = card.querySelector('.photo-grid__heart');
  const cardDelete = card.querySelector('.photo-grid__delete');

  cardsContainer.prepend(card);
  linkCard.src = link;
  linkCard.alt = name;
  nameCard.textContent = name;
  const cardLike = (evt) => {evt.target.classList.toggle('photo-grid__heart_active')};
  like.addEventListener('click', cardLike);
  const cardDeleteAction = (evt) => {evt.target.closest('.photo-grid__item').remove()};
  cardDelete.addEventListener('click', cardDeleteAction);
  const popupImageAction = () => {
    popupImageOpen.classList.add('popup_opened');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
  };
  linkCard.addEventListener('click', popupImageAction);
  const popupImageClose = () => {popupImageOpen.classList.remove('popup_opened')};
  closeImage.addEventListener('click',popupImageClose);
}

function startCards () {
  initialCards.forEach((item) => {addCard(item.name, item.link);});
}

function openProfileFunc() {
  nameInput.value = authorName.textContent;
  jobInput.value = authorJob.textContent;
  formElement.classList.add('popup_opened');
}

function openAddFunc() {
  nameAdd.value = '';
  linkAdd.value = '';
  formAdd.classList.add('popup_opened');
}

function closeProfileFunc() {
  formElement.classList.remove('popup_opened');
}

function closeAddFunc() {
  formAdd.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  authorName.textContent = nameInput.value;
  authorJob.textContent = jobInput.value;
  closeProfileFunc();
}

function formAddSubmitHandler (evt) {
  evt.preventDefault();
  addCard(nameAdd.value, linkAdd.value);
  closeAddFunc();
}

startCards();

formElement.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);
openProfile.addEventListener('click', openProfileFunc);
openAdd.addEventListener('click', openAddFunc);
closeProfile.addEventListener('click', closeProfileFunc);
closeAdd.addEventListener('click', closeAddFunc);
