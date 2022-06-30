import { popups } from './index.js';

export class Popup {
  constructor (popup) {
    this.popup = popup;
  };

  open(popup) {
    this.popup.classList.add('popup_opened');
    this. popup.ESChandler = closeOnEscape(popup);
    document.addEventListener('keyup',popup.ESChandler);
  };

  close(popup) {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', popup.ESChandler);
    this.popup.ESChandler = null;
  };

  _handleEscClose(popup){
    return (evt) => {
      if (evt.key === "Escape")
        this.close(popup);
    }
  };

  setEventListeners(){
    popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
          this.close(popup)
        }
      });
    });
  }
}


// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keyup', popup.ESChandler);
//   popup.ESChandler = null;
// }

// слушатель событий, который закрывает модальное окно по нажатию на Esc, добавляется при открытии
// модального окна и удаляется при его закрытии.

// возвращает колбэк для навешивания на нажатие esc
// function closeOnEscape(popup){
//   return (evt) => {
//     if (evt.key === "Escape")
//       closePopup(popup);
//   }
// }

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   popup.ESChandler = closeOnEscape(popup);
//   document.addEventListener('keyup',popup.ESChandler);
// }

// export {openPopup, closePopup}
