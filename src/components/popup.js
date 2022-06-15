function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', popup.ESChandler);
  popup.ESChandler = null;
}

// слушатель событий, который закрывает модальное окно по нажатию на Esc, добавляется при открытии
// модального окна и удаляется при его закрытии.

// возвращает колбэк для навешивания на нажатие esc
function closeOnEscape(popup){
  return (evt) => {
    if (evt.key === "Escape")
      closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.ESChandler = closeOnEscape(popup);
  document.addEventListener('keyup',popup.ESChandler);
}

export {openPopup, closePopup}
