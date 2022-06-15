const cardTemplate = document.querySelector('#card-template').content;
const bigImgPopup = document.querySelector('.big-img');
const bigImage = bigImgPopup.querySelector('img');
const bigImgCaption = bigImgPopup.querySelector('figcaption');

import {openPopup} from "./popup.js";

function createCard(name, link) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__name').textContent = name;
  const cardImg = card.querySelector('.card__image');
  cardImg.alt = name;
  cardImg.src = link;
  cardImg.addEventListener('click', () => {
    bigImage.src = cardImg.src;
    bigImage.alt = name;
    bigImgCaption.textContent = name;
    openPopup(bigImgPopup)
  })
  const cardLike = card.querySelector('.card__like');
  cardLike.addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_set')
  })
  const cardDel = card.querySelector('.card__delete');
  cardDel.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  })
  return card;
}

function addCard(card, container) {
  container.prepend(card);
}

export {addCard, createCard}
