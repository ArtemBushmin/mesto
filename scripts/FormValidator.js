export default class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
  }

  _showInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._data.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._data.errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._data.inputErrorClass);
    errorElement.classList.remove(this._data.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(){
    this._buttonElement = this._form.querySelector(this._data.submitButtonSelector);
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
  } else {
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', true);

  }
  }

  enableValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector));
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}

/*
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass){
  if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
} else {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);

}
}

function resetErrorForm (closeElement){
  closeElement.querySelectorAll('.popup__error').forEach ((element) => {element.classList.remove('popup__error_visible');});
  closeElement.querySelectorAll('.popup__input').forEach ((element) => {element.classList.remove('popup__input_type_error');});
  //в этом месте функция toggleButtonState() отрабатывает не так как нужно
}

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, ...rest }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
*/
