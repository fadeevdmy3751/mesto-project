export class FormValidator {
  constructor({formSelector, inputSelector, submitButtonSelector,
              inactiveButtonClass, inputErrorClass, errorClass}) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }

  clearPopupInputs(popup) {
    const formElement = popup.querySelector(this._formSelector);
    const inputList = Array.from(popup.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(formElement, inputElement, this._inputErrorClass, this._errorClass);
      inputElement.value = ''
    });
    this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
  }

  _setEventListeners(formElement) {
    // метод добавления обработчиков всем полям формы
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this.this._isValid(formElement, inputElement, this._inputErrorClass, this._errorClass);
        this.this._toggleButtonState (inputList, buttonElement, this._inactiveButtonClass);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    // отключение и включение кнопки submit
    if (this._hasInvalidInput(inputList)){
      buttonElement.classList.add(inactiveButtonClass)
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass)
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    // проверка наличия хотя бы одного инпут-инвалида
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _isValid(formElement, inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };

  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }
}

export const validationParams = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__field_error',
  errorClass: 'form__error_visible',
}

// функция добавления обработчиков всем полям формы
// const setEventListeners = (formElement, settings) => {
//
//   const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
//   const buttonElement = formElement.querySelector(settings.submitButtonSelector);
//   toggleButtonState (inputList, buttonElement, settings.inactiveButtonClass);
//
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       isValid(formElement, inputElement, settings.inputErrorClass, settings.errorClass);
//       toggleButtonState (inputList, buttonElement, settings.inactiveButtonClass);
//     });
//   });
// };

// const clearPopupInputs = (popup, settings) => {
//   const formElement = popup.querySelector(settings.formSelector);
//   const inputList = Array.from(popup.querySelectorAll(settings.inputSelector));
//   const buttonElement = formElement.querySelector(settings.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     hideInputError(formElement, inputElement, settings.inputErrorClass, settings.errorClass);
//     inputElement.value = ''
//   });
//   toggleButtonState (inputList, buttonElement, settings.inactiveButtonClass);
// }

// отключение и включение кнопки submit
// function toggleButtonState (inputList, buttonElement, inactiveButtonClass){
//   if (hasInvalidInput(inputList)){
//     buttonElement.classList.add(inactiveButtonClass)
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass)
//     buttonElement.disabled = false;
//   }
// }

// проверка наличия хотя бы одного инпут-инвалида
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// };

// const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
//   } else {
//     hideInputError(formElement, inputElement, inputErrorClass, errorClass);
//   }
// };

// const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };

// const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// const enableValidation = (settings) => {
//   const formList = Array.from(document.querySelectorAll(settings.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, settings);
//   });
// };

// export {validationParams, clearPopupInputs, enableValidation};
