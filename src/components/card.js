const cardTemplate = document.querySelector('#card-template').content;
const bigImgPopup = document.querySelector('.big-img');
const bigImage = bigImgPopup.querySelector('img');
const bigImgCaption = bigImgPopup.querySelector('figcaption');

import {openPopup} from "./popup.js";
import {myID} from "./index.js";   // перекрестный импорт хз как работает
import {deleteCard, likeCard} from "./api.js";

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
    cardDel.addEventListener('click', deleteCard);
  }
  cardImg.addEventListener('click', () => {
    bigImage.src = cardImg.src;
    bigImage.alt = json.name;
    bigImgCaption.textContent = json.name;
    openPopup(bigImgPopup);
  })
  refreshLikes(card, json);
  card.querySelector('.card__like').addEventListener('click', likeCard);
  return card;
}

function addCard(card, container, beginning = false) {
  if(!beginning)
    container.append(card);
  else
    container.prepend(card);
}

export {addCard, createCard, refreshLikes};
