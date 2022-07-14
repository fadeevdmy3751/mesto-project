import Popup from './popup.js'
// import { bigImage, bigImgCaption } from './Card.js'

/**
 * Класс попапа с картинкой (карточки), наследуется от Popup
 */
export default class PopupWithImage extends Popup {
  /**
   * Конструктор класса PopupWithImage
   * @param selector - селектор попапа
   * @param cardImg - урл картинки
   * @param cardText - текст описания карточки
   */
  constructor(selector, cardImg, cardText) {
    super(selector);
    this.cardImg = cardImg;
    this.cardText = cardText;

  };

  /**
   * Переопределённый (от родительского в Popup) метод открытия попапа карточки с картинкой и подписью
   */
  open() {
    super.open();
    // this.selector.classList.add('popup_opened');
    document.querySelector('.big-img__image').src = this.cardImg;
    document.querySelector('.big-img__caption').textContent = this.cardText;
    document.querySelector('.big-img__image').alt = this.cardText;
  }
}
