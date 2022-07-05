
export const bigImgPopup = document.querySelector('.big-img');
export const bigImage = bigImgPopup.querySelector('.big-img__image');
export const bigImgCaption = bigImgPopup.querySelector('.big-img__caption');
const cardTemplate = document.querySelector('#card-template').content;

import PopupWithImage from './PopupWithImage.js';
// import Popup from './popup.js';
// import {myID} from "./index.js";   // перекрестный импорт хз как работает
// import {deleteCard, likeCard} from "./api.js";
// import initialCards from './initialCards.js'

export default class Card {
  constructor(data, selector, userId, myId){
    this._selector = (selector);
    this._name = data.name;
    this._likesLength = data.likes.length; //колличество лайков
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data.owner._id; //owner._id - автор карточки
    this._userId = userId;
    this._myID = myId;
    // console.log(this._cardId)
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__like-count').textContent = this._likesLength;
    this._element.id = this._cardId;
    return this._element;
  }

  handleCardClick() {
    this._element.querySelector('.card__image').addEventListener('click', (evt) => {
        const cardPopup = new PopupWithImage(bigImgPopup, this._link, this._name);
        bigImage.src = this._link;
        bigImgCaption.textContent = this._name;
        cardPopup.open();
    })
  }

  addDefaultLike() {
    this._likes.forEach((item) => {
        if (this._userId === item._id) {
            this._element.querySelector('.card__like').classList.add('card__like_set');
        }
    })
  }

  addDeleteButton() {
    if (this._userId === this._cardId) {
        this._element.querySelector('.card__delete');
    } else {
        this._element.querySelector('.card__delete').style.display = 'none';
    }
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this.Popup.open();
    });
    popupCloseButton.addEventListener('click', () => {
      this.Popup.close();
    });
  }

  // addCard(card, container, beginning = false) {
  //   if(!beginning)
  //     container.append(card);
  //   else
  //     container.prepend(card);
  // }
}






  // refreshLikes(card, json) {
  //   card.querySelector('.card__like-count').textContent = json.likes.length;
  //   card.myLike = json.likes.some(liker => liker._id === myID)
  //   if (card.myLike){
  //     card.querySelector('.card__like').classList.add('card__like_set')
  //   } else {
  //     card.querySelector('.card__like').classList.remove('card__like_set')
  //   }
  // }

  // generate(json) {
  //   const cardImg = _getElement.querySelector('.card__image');
  //   cardImg.alt = json.name;
  //   cardImg.src = json.link;
  //   _getElement._id = json._id;
  //   _getElement.ownerId = json.owner._id;
  //   if (card.ownerId !== myID){
  //     card.querySelector('.card__delete').style.display = 'none';
  //   } else {
  //     const cardDel = card.querySelector('.card__delete');
  //     cardDel.addEventListener('click', (evt) => {
  //       deleteCard(evt)
  //         .then(() => {
  //           evt.target.closest(".card").remove()
  //           console.log('delete card success')
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         })
  //     })
  //   }
  //   refreshLikes(card, json);
  //   card.querySelector('.card__like').addEventListener('click', (evt) => {
  //     likeCard(evt)
  //       .then((json) => {
  //         console.log('put/delete like success');
  //         refreshLikes(card, json);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   })
  //   return card;
  // }




// function refreshLikes(card, json){
//   card.querySelector('.card__like-count').textContent = json.likes.length;
//   card.myLike = json.likes.some(liker => liker._id === myID)
//   if (card.myLike){
//     card.querySelector('.card__like').classList.add('card__like_set')
//   } else {
//     card.querySelector('.card__like').classList.remove('card__like_set')
//   }
// }

// function createCard(json) {
//   const card = cardTemplate.querySelector('.card').cloneNode(true);
//   card.querySelector('.card__name').textContent = json.name;
//   const cardImg = card.querySelector('.card__image');
//   cardImg.alt = json.name;
//   cardImg.src = json.link;
//   card._id = json._id;
//   card.ownerId = json.owner._id;
//   if (card.ownerId !== myID){
//     card.querySelector('.card__delete').style.display = 'none';
//   } else {
//     const cardDel = card.querySelector('.card__delete');
//     // cardDel.addEventListener('click', deleteCard);
//     cardDel.addEventListener('click', (evt) => {
//       deleteCard(evt)
//         .then(() => {
//           evt.target.closest(".card").remove()
//           console.log('delete card success')
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//     })
//   }
//   // const PopupOpenImage = new PopupWithImage('.big-img');

//   // cardImg.addEventListener('click', () => {
//     // bigImage.src = cardImg.src;
//     // bigImage.alt = json.name;
//     // bigImgCaption.textContent = json.name;
//   //   PopupOpenImage.openImage();
//   // })
//   refreshLikes(card, json);
//   // card.querySelector('.card__like').addEventListener('click', likeCard);
//   card.querySelector('.card__like').addEventListener('click', (evt) => {
//     likeCard(evt)
//       .then((json) => {
//         console.log('put/delete like success');
//         refreshLikes(card, json);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   })
//   return card;
// }

// function addCard(card, container, beginning = false) {
//   if(!beginning)
//     container.append(card);
//   else
//     container.prepend(card);
// }

// export {addCard, createCard, refreshLikes};
