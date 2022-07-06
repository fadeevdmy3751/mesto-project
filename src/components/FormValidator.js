export class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector,
              inactiveButtonClass, inputErrorClass, errorClass}) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;

  }
}

const validationParams = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__field_error',
  errorClass: 'form__error_visible',
}

// функция добавления обработчиков всем полям формы
const setEventListeners = (formElement, settings) => {

  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState (inputList, buttonElement, settings.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, settings.inputErrorClass, settings.errorClass);
      toggleButtonState (inputList, buttonElement, settings.inactiveButtonClass);
    });
  });
};

const clearPopupInputs = (popup, settings) => {
  const formElement = popup.querySelector(settings.formSelector);
  const inputList = Array.from(popup.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings.inputErrorClass, settings.errorClass);
    inputElement.value = ''
  });
  toggleButtonState (inputList, buttonElement, settings.inactiveButtonClass);
}

// отключение и включение кнопки submit
function toggleButtonState (inputList, buttonElement, inactiveButtonClass){
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.disabled = false;
  }
}

// проверка наличия хотя бы одного инпут-инвалида
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

export {validationParams, clearPopupInputs, enableValidation};
