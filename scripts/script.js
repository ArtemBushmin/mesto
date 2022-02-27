let open = document.querySelector('.profile__button');
let close = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let authorName = document.getElementById('name');
let authorJob = document.getElementById('job');
nameInput.value = authorName.textContent;
jobInput.value = authorJob.textContent;

function Open() {
  formElement.classList.add('popup_opened');
}

function Close() {
  formElement.classList.remove('popup_opened');
  nameInput.value = authorName.textContent;
  jobInput.value = authorJob.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  authorName.textContent = nameInput.value;
  authorJob.textContent = jobInput.value;
  Close();
}

formElement.addEventListener('submit', formSubmitHandler);
open.addEventListener('click', Open);
close.addEventListener('click', Close);
