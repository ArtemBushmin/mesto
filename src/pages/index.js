import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  createCard,
  ESC_CODE,
  profileOpenBtn,
  formProfile,
  formCard,
  nameInput,
  jobInput,
  buttonOpenAddCardPopup,
  initialCards,
  validationSetting,
} from "../utils/constants.js";
import "./index.css";

const formValidProfile = new FormValidator(validationSetting, formProfile);
const formValidCard = new FormValidator(validationSetting, formCard);
export const imagePopup = new PopupWithImage("popupImage");
imagePopup.setEventListeners();
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const element = createCard(item);
      cardsList.addItem(element);
    },
  },
  ".photo-grid"
);
const profilePopup = new PopupWithForm("popupProfile", (data) => {
  userInfo.setUserInfo(data.nameInput, data.jobInput);
  profilePopup.close();
});
const popupAddCard = new PopupWithForm("popupAdd", (data) => {
  const newElement = createCard({ name: data.place, link: data.link });
  cardsList.addItem(newElement);
  popupAddCard.close();
});

const userInfo = new UserInfo(".profile__name", ".profile__profession");

cardsList.renderItems();

profileOpenBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = { name, job }.name;
  jobInput.value = { name, job }.job;
  formValidProfile.resetValidation();
  profilePopup.open();
});
buttonOpenAddCardPopup.addEventListener("click", () => {
  formValidCard.resetValidation();
  popupAddCard.open();
});

formValidProfile.enableValidation();
formValidCard.enableValidation();
profilePopup.setEventListeners();
popupAddCard.setEventListeners();
