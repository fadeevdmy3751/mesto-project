export const bigImgPopup = document.querySelector('.big-img');
export const bigImage = bigImgPopup.querySelector('.big-img__image');
export const bigImgCaption = bigImgPopup.querySelector('.big-img__caption');
const cardTemplate = document.querySelector('#card-template').content;

export default class Card {
  constructor(data, selector, myId, handleCardClick, handleCardLike, handleCardDelete) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._cardOwnerId = data.owner._id; //owner._id - автор карточки
    this._myID = myId;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike
    this._handleCardDelete = handleCardDelete;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    this._addDefaultLike()
    this._addDeleteButton()
    // this._refreshLikes(this._element, json)
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__like-count').textContent = this._likes.length;
    this._element.id = this._id;
    return this._element;
  }

  _getElement() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  _addDefaultLike() {
    this._likes.forEach((item) => {
        if (this._myID === item._id) {  // проверка, есть ли мой ID в числе тех, кто ставил like карточке
            this._element.querySelector('.card__like').classList.add('card__like_set');
            this._element.myLike = true;
        }
    })
  }

  _addDeleteButton() {
    if (this._myID === this._cardOwnerId) {
        this._element.querySelector('.card__delete');
    } else {
        this._element.querySelector('.card__delete').style.display = 'none';
    }
  }


  _refreshLikes() {
    this._element.querySelector('.card__like-count').textContent = this._likes.length;
    this._element.myLike = this._likes.some(liker => liker._id === this._myID) // определение, ставил ли я лайк до события
    if (this._element.myLike) {
      this._element.querySelector('.card__like').classList.add('card__like_set')
    } else {
      this._element.querySelector('.card__like').classList.remove('card__like_set')
    }
  }


  _setEventListeners() {
    //лайки
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleCardLike(this._element)
        .then((data) => {
          console.log(data)
          this._likes = data.likes;
          this._refreshLikes();
        })
        .catch((err) => {
          console.log(err)
        })
    })
    //удаление
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleCardDelete(this._element)
        .then((data) => {
          console.log(data)
          this._element.remove()
        })
        .catch((err) => {
          console.log(err)
        })
    })
    //попап картинки
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    })
  }
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
