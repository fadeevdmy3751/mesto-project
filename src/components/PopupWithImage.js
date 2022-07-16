import Popup from './popup.js'

/**
 * Класс попапа с картинкой (карточки), наследуется от Popup
 */
export default class PopupWithImage extends Popup {
  /**
   * Конструктор класса PopupWithImage
   * @param selector - селектор попапа
   */
  constructor(selector) {
    super(selector);
    this._bigImgImage = document.querySelector('.big-img__image');
    this._bigImgCaption = document.querySelector('.big-img__caption');
  };

  /**
   * Переопределённый (от родительского в Popup) метод открытия попапа карточки с картинкой и подписью
   */
  open(cardImg, cardText) {
    super.open();
    this._bigImgImage.src = cardImg;
    this._bigImgCaption.textContent = cardText;
    this._bigImgImage.alt = cardText;
  }
}
