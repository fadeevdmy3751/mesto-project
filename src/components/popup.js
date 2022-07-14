/**
 * Класс, который отвечает за открытие и закрытие попапа
 */
export default class Popup {
  /**
   * Конструктор класса
   * @param selector - селектор попапа.
   */
  constructor(selector) {
    this.selector = selector
    this._handleClosePopup = this._handleClosePopup.bind(this)
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  /**
   * Метод, отвечающий за открытие попапа
   */
  open() {
    this.selector.classList.add('popup_opened');
    this.setEventListeners();
  };

  /**
   * Метод, отвечающий за закрытие попапа
   */
  close() {
    this.selector.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
    document.removeEventListener('mousedown', this._handleClosePopup);
  };

  /**
   * Метод, который добавляет слушатель клика иконке закрытия попапа
   */
  setEventListeners() {
    document.addEventListener('keyup', this._handleEscClose);
    document.addEventListener('mousedown', this._handleClosePopup);
  }

  /**
   * Метод, который содержит логику закрытия попапа клавишей Esc
   * @param evt - event события в EventListener.
   */
  _handleEscClose(evt) {
    if (evt.key === "Escape")
      this.close();
  };

  /**
   * Метод, который содержит логику закрытия попапа
   * @param evt - event события в EventListener.
   */
  _handleClosePopup(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup'))
      this.close();
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


