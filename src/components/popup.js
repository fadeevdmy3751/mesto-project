
export default class Popup {
  constructor (selector) {
    this._handleEscClose = this._handleEscClose.bind(this);
    this.selector = document.querySelector(selector)
  };

  open() {
    this.selector.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  };

  close() {
    this.selector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
    this.setEventListeners()
  };

  _handleEscClose(evt){
    if (evt.key === "Escape")
      this.close();
  };

  setEventListeners(){
    this.selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        this.close()
      }
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


