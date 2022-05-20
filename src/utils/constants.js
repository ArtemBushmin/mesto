export const ESC_CODE = "Escape";
export const profileOpenBtn = document.querySelector(".profile__button");
export const formProfile = document.querySelector(".popup__profile");
export const formCard = document.querySelector(".popup__add");
export const formPhoto = document.querySelector(".popup__photo");
export const nameInput = document.querySelector(".popup__input_type_name");
export const jobInput = document.querySelector(".popup__input_type_job");
export const buttonOpenAddCardPopup = document.querySelector(".profile__add");
export const buttonOpenEditPhoto = document.querySelector(".profile__edit-photo");
const setLike = (id, evt, counter) => {
  api
    .setLike(id)
    .then(() => {
      evt.target.classList.add('element__heart_active');
      evt.target.nextElementSibling.textContent = counter + 1;
    })
    .catch((err) => alert(err));
};

const removeLike = (id, evt, counter) => {
  api
    .removeLike(id)
    .then(() => {
      evt.target.classList.remove('element__heart_active');
      evt.target.nextElementSibling.textContent = counter - 1;
    })
    .catch((err) => alert(err));
};
import Card from "../components/Card.js";
import { imagePopup, popupDelete, api } from "../pages/index.js";
export const createCard = (cardData) => {
  const card = new Card(
    cardData,
    ".card",
    () => imagePopup.open(cardData),
    (data) => {
      popupDelete.open(cardData._id, data);
    },
    setLike, removeLike
  );
  return card.generateCard();
};

export const validationSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
