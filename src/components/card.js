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
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLikeCount = this._element.querySelector('.card__like-count');
    this._element.querySelector('.card__name').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikeCount.textContent = this._likes.length;
    this._setEventListeners();
    this._addDefaultLike()
    this._addDeleteButton()
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
            this._cardLike.classList.add('card__like_set');
            this._element.myLike = true;
        }
    })
  }

  _addDeleteButton() {
    if (this._myID === this._cardOwnerId) {
      this._cardDelet;
    } else {
      this._cardDelet.style.display = 'none';
    }
  }


  _refreshLikes() {
    this._cardLikeCount.textContent = this._likes.length;
    this._element.myLike = this._likes.some(liker => liker._id === this._myID) // определение, ставил ли я лайк до события
    if (this._element.myLike) {
      this._cardLike.classList.add('card__like_set')
    } else {
      this._cardLike.classList.remove('card__like_set')
    }
  }


  _setEventListeners() {
    //лайки
    this._cardLike = this._element.querySelector('.card__like');
    this._cardLike.addEventListener('click', () => {
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
    this._cardDelet = this._element.querySelector('.card__delete');
    this._cardDelet.addEventListener('click', () => {
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
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })
  }
}
