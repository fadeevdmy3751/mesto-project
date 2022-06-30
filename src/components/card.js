const cardTemplate = document.querySelector('#card-template').content;
export const bigImgPopup = document.querySelector('.big-img');
export const bigImage = bigImgPopup.querySelector('img');
export const bigImgCaption = bigImgPopup.querySelector('figcaption');

import Popup from './popup.js';
import {myID} from "./index.js";   // перекрестный импорт хз как работает
import {deleteCard, likeCard} from "./api.js";
import PopupWithImage from './PopupWithImage.js'

function refreshLikes(card, json){
  card.querySelector('.card__like-count').textContent = json.likes.length;
  card.myLike = json.likes.some(liker => liker._id === myID)
  if (card.myLike){
    card.querySelector('.card__like').classList.add('card__like_set')
  } else {
    card.querySelector('.card__like').classList.remove('card__like_set')
  }
}

function createCard(json) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__name').textContent = json.name;
  const cardImg = card.querySelector('.card__image');
  cardImg.alt = json.name;
  cardImg.src = json.link;
  card._id = json._id;
  card.ownerId = json.owner._id;
  if (card.ownerId !== myID){
    card.querySelector('.card__delete').style.display = 'none';
  } else {
    const cardDel = card.querySelector('.card__delete');
    // cardDel.addEventListener('click', deleteCard);
    cardDel.addEventListener('click', (evt) => {
      deleteCard(evt)
        .then(() => {
          evt.target.closest(".card").remove()
          console.log('delete card success')
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }
  const PopupOpenImage = new PopupWithImage('.big-img');

  cardImg.addEventListener('click', () => {
    // bigImage.src = cardImg.src;
    // bigImage.alt = json.name;
    // bigImgCaption.textContent = json.name;
    PopupOpenImage.openImage();
  })
  refreshLikes(card, json);
  // card.querySelector('.card__like').addEventListener('click', likeCard);
  card.querySelector('.card__like').addEventListener('click', (evt) => {
    likeCard(evt)
      .then((json) => {
        console.log('put/delete like success');
        refreshLikes(card, json);
      })
      .catch((err) => {
        console.log(err);
      })
  })
  return card;
}

function addCard(card, container, beginning = false) {
  if(!beginning)
    container.append(card);
  else
    container.prepend(card);
}

export {addCard, createCard, refreshLikes};
