const validationParams = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  // inputErrorClass: 'popup__input_type_error', // нет необходимости, полностью покрывается .form__field:invalid
  errorClass: 'form__error_visible',
}

// функция добавления обработчиков всем полям формы
const setEventListeners = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);
  toggleButtonState (inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement);
      toggleButtonState (inputList, buttonElement)
    });
  });
};

const clearPopupInputs = (popup) => {
  const formElement = popup.querySelector(validationParams.formSelector);
  const inputList = Array.from(popup.querySelectorAll(validationParams.inputSelector));
  const buttonElement = formElement.querySelector(validationParams.submitButtonSelector)
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
    inputElement.value = ''
  });
  toggleButtonState (inputList, buttonElement)
}

// отключение и включение кнопки submit
function toggleButtonState (inputList, buttonElement){
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(validationParams.inactiveButtonClass)
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationParams.inactiveButtonClass)
    buttonElement.disabled = false;
  }
}

// проверка наличия хотя бы одного инпут-инвалида
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationParams.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(validationParams.errorClass);
  errorElement.textContent = '';
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

export {clearPopupInputs, enableValidation};
