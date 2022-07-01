import Popup from './Popup.js'
// import { bigImage, bigImgCaption } from './Card.js'

export default class PopupWithImage extends Popup {
  constructor(selector, cardImg, cardtext){
    super(selector);
    this.cardImg = cardImg;
    this.cardtext = cardtext;

  };
  openImage(){
    super.open();
    this.selector.classList.add('popup_opened');
    document.querySelector('.big-img__image').src = this.cardImg;
    document.querySelector('.big-img__caption').textContent = this.cardtext;
    document.querySelector('.big-img__image').alt = this.cardtext;

    // bigImage.src = this.cardImg.src;
    // this.cardImg.src = bigImage.src;
    // bigImage.alt = json.name;
    // bigImgCaption.textContent = json.name;

    // const elementImag = this.elementImag;
    // const cardElement = elementImag.closest('.card');
    // const elementCaption = cardElement.querySelector('.card__name').textContent;
    // console.log(cardElement);

    // this.bigImage.src = elementImag.src;
    // this.bigImgCaption.textContent = bigImage.alt = elementCaption;
  }
}
