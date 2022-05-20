export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleCardDelete,
    setLike,
    removeLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._idCard = data._id;
    this._likes = data.likes;
    this._counter = data.likes.length;
    this._idOwner = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._setLike = setLike;
    this._removeLike = removeLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton(evt) {
    if (!evt.target.classList.contains("element__heart_active")) {
      this._setLike(this._idCard, evt, this._counter);
      this._counter += 1;
    } else {
      this._removeLike(this._idCard, evt, this._counter);
      this._counter -= 1;
    }
  }

  _handleDeleteCard() {
    this._handleCardDelete(this._element);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", (evt) => {
        this._handleDeleteCard(evt);
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", this._handleCardClick);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__heart");
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__name").textContent = this._name;
    this._element.querySelector(".element__heart_counter").textContent =
      this._counter;

    if (!(this._idOwner === "047babc5ed40b0771a9e79c3")) {
      this._element
        .querySelector(".element__delete")
        .classList.add("element__delete_noDelete");
    }

    if (
      this._likes.some(
        (likeAuthor) => likeAuthor._id === "047babc5ed40b0771a9e79c3"
      )
    ) {
      this._likeButton.classList.add("element__heart_active");
    }

    return this._element;
  }
}
