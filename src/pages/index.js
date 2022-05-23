import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";
import {
  ESC_CODE,
  profileOpenBtn,
  formProfile,
  formCard,
  nameInput,
  jobInput,
  buttonOpenAddCardPopup,
  validationSetting,
  buttonOpenEditPhoto,
  formPhoto,
} from "../utils/constants.js";
import "./index.css";

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    ".card",
    () => imagePopup.open(cardData),
    (data) => {
      popupDelete.open(cardData._id, data, card);
    },
    (id) => {
      api
        .setLike(id)
        .then((res) => {
          card.changeLike(res.likes.length);
        })
        .catch((err) => alert(err));
    },
    (id) => {
      api
        .removeLike(id)
        .then((res) => {
          card.changeLike(res.likes.length);
        })
        .catch((err) => alert(err));
    },
    userInfo.id
  );
  return card.generateCard();
};

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "4da7a4f9-8e09-46c7-a4cd-db9903075353",
    "content-type": "application/json",
  },
});

const popupEditPhoto = new PopupWithForm("popupEditPhoto", (data) => {
  formPhoto.querySelector(".popup__submit").textContent = "Сохранение...";
  api
    .loadAvatar(data.linkPhoto)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupEditPhoto.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      formPhoto.querySelector(".popup__submit").textContent = "Сохранить";
    });
});
const formValidPhoto = new FormValidator(validationSetting, formPhoto);
const formValidProfile = new FormValidator(validationSetting, formProfile);
const formValidCard = new FormValidator(validationSetting, formCard);
const imagePopup = new PopupWithImage("popupImage");
imagePopup.setEventListeners();

const cardsList = new Section((item) => {
  const element = createCard(item);
  cardsList.addItem(element);
}, ".photo-grid");

const popupDelete = new PopupDelete("popupDelete", (data) =>
  api
    .deleteCard(data)
    .then(() => {
      popupDelete.cardDelete.deleteCard();
      popupDelete.close();
    })
    .catch((err) => alert(err))
);
popupDelete.setEventListeners();

const profilePopup = new PopupWithForm("popupProfile", (data) => {
  formProfile.querySelector(".popup__submit").textContent = "Сохранение...";
  api
    .setUserInfo(data.nameInput, data.jobInput)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar, res._id);
      profilePopup.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      formProfile.querySelector(".popup__submit").textContent = "Сохранить";
    });
});
const popupAddCard = new PopupWithForm("popupAdd", (data) => {
  formCard.querySelector(".popup__submit").textContent = "Сохранение...";
  api
    .setCardInfo(data.place, data.link)
    .then((res) => {
      const newElement = createCard(res);
      cardsList.addItem(newElement);
      popupAddCard.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      formCard.querySelector(".popup__submit").textContent = "Сохранить";
    });
});

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__profession",
  ".profile__photo"
);

Promise.all([api.getUserInfo(), api.getCardInfo()])
  .then(([userData, userCard]) => {
    userInfo.setUserInfo(
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    );
    cardsList.renderItems(userCard);
  })
  .catch((err) => alert(err));

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
buttonOpenEditPhoto.addEventListener("click", () => {
  formValidPhoto.resetValidation();
  popupEditPhoto.open();
});

formValidProfile.enableValidation();
formValidCard.enableValidation();
formValidPhoto.enableValidation();
profilePopup.setEventListeners();
popupAddCard.setEventListeners();
popupEditPhoto.setEventListeners();
