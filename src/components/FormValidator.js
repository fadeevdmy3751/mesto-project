/**
 * Класс валидации полей указанной формы.
 */
export class FormValidator {
  /**
   * Конструктор - на входе объект настроек с селекторами и классами формы, а также вторым параметром элемент
   * той формы, которая валидируется.
   * @param inputSelector - селектор полей ввода данных
   * @param submitButtonSelector - селектор кнпоки отправки данных (submit)
   * @param inactiveButtonClass - класс неактивной кнопки
   * @param inputErrorClass - класс ошибки для поля ввода (красные рамки)
   * @param errorClass - класс сообщения об ошибке для поля ввода
   * @param formElement - валидируемая форма
   */
  constructor({inputSelector, submitButtonSelector,
              inactiveButtonClass, inputErrorClass, errorClass}, formElement) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;
  }

  /**
   * Метод активации валидации формы
   */
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  /**
   * Метод очищения полей формы
   */
  clearPopupInputs() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement, this._inputErrorClass, this._errorClass);
      inputElement.value = ''
    });
    this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
  }

  /**
   * Метод добавления EventListener к элементам формы
   */
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement, this._inputErrorClass, this._errorClass);
        this._toggleButtonState (inputList, buttonElement, this._inactiveButtonClass);
      });
    });
  }

  /**
   * Отключение и включение кнопки submit
   * @param inputList - список всех инпутов формы
   * @param buttonElement - элемент кнопки (submit)
   * @param inactiveButtonClass - класс неактивной кнопки (submit)
   */
  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)){
      buttonElement.classList.add(inactiveButtonClass)
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(inactiveButtonClass)
      buttonElement.disabled = false;
    }
  }

  /**
   * Проверка наличия хотя бы одного инпут-инвалида
   * @param inputList - список инпутов формы
   * @returns {*} - флаг (boolean) наличия хотя бы одного инпут-инвалида
   */
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  /**
   * Валидация инпута и отображение ошибки при наличиию
   * @param inputElement - валидируемый инпут
   * @param inputErrorClass - класс инпута с ошибкой
   * @param errorClass - класс сообщения об ошибке в указанном инпуте
   */
  _isValid(inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(inputElement, inputErrorClass, errorClass);
    }
  };

  /**
   * Метод конфигурирования отображения инпута с ошибкой
   * @param inputElement - инпут с ошибочно введёнными в него данными
   * @param errorMessage - сообщение об ошибке
   * @param inputErrorClass - класс инпута с ошибкой
   * @param errorClass - класс сообщения об ошибке в указанном инпуте
   */
  _showInputError(inputElement, errorMessage, inputErrorClass, errorClass) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  /**
   * Метод конфигурирования отображения инпута без ошибки
   * @param inputElement - инпут с ошибочно введёнными в него данными
   * @param inputErrorClass - класс инпута с ошибкой
   * @param errorClass - класс сообщения об ошибке в указанном инпуте
   */
  _hideInputError(inputElement, inputErrorClass, errorClass) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if(inputElement.classList.contains(inputErrorClass))
      inputElement.classList.remove(inputErrorClass);
    if(errorElement.classList.contains(errorClass))
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
