let open = document.querySelector('.profile__button');
let close = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let authorName = document.getElementById('name');
let authorJob = document.getElementById('job');

function openFunc() {
  nameInput.value = authorName.textContent;
  jobInput.value = authorJob.textContent;
  formElement.classList.add('popup_opened');
}

function closeFunc() {
  formElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  authorName.textContent = nameInput.value;
  authorJob.textContent = jobInput.value;
  closeFunc();
}

formElement.addEventListener('submit', formSubmitHandler);
open.addEventListener('click', openFunc);
close.addEventListener('click', closeFunc);
