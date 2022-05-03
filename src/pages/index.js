import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {ESC_CODE, profileOpenBtn, formProfile, formCard, nameInput, jobInput, addOpenBtn, initialCards, validationSetting} from '../components/constants.js';
import './index.css';

const formValidProfile = new FormValidator(validationSetting, formProfile);
const formValidCard = new FormValidator(validationSetting, formCard);
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const element = new Card(item, '.card', (evt) => {
      const imagePopup = new PopupWithImage('popupImage', evt);
      imagePopup.open();
      imagePopup.setEventListeners();
    } ).generateCard();
    cardsList.addItem(element);
    },
  },
  '.photo-grid'
);
const profilePopup = new PopupWithForm('popupProfile', (data) => {
  userInfo.setUserInfo(data.nameInput, data.jobInput);
  profilePopup.close();
});
const addCardPopup = new PopupWithForm('popupAdd', (data) => {
  const newElement = new Card({name:data.place, link:data.link}, '.card', (evt) => {
    const imagePopup = new PopupWithImage('popupImage', evt);
    imagePopup.open();
    imagePopup.setEventListeners();
  }).generateCard();
  cardsList.addItem(newElement);
  addCardPopup.close();
});

const userInfo = new UserInfo ('name', 'job');

cardsList.renderItems();

profileOpenBtn.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  formValidProfile.resetValidation();
  profilePopup.open();
  profilePopup.setEventListeners();
});
addOpenBtn.addEventListener('click', () => {
  formValidCard.resetValidation();
  addCardPopup.open();
  addCardPopup.setEventListeners();
});

formValidProfile.enableValidation();
formValidCard.enableValidation();
