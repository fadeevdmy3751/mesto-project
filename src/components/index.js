const content = document.querySelector('.content');
const profileEditPopup = document.querySelector('.popup-profile-edit');// уточнить класс
const profileEditBtn = content.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form[name="popup-profile-edit-form"]');// уточнить класс или name
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const nameInput = profileEditPopup.querySelector('#form__field-name');
const descriptionInput = profileEditPopup.querySelector('#form__field-profession');

const cardAddPopup = document.querySelector('.popup-card-add'); // уточнить класс
const cardAddBtn = content.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form[name="popup-card-add-form"]'); // уточнить класс или name
const cardNameInput = cardAddPopup.querySelector('#card-add-name');
const cardLinkInput = cardAddPopup.querySelector('#card-add-link');
const elements = content.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close')

import  '../pages/index.css';

import initialCards from './initialCards';
import {openPopup, closePopup} from './popup.js';
import {addCard, createCard} from './card.js';
import {clearPopupInputs, enableValidation} from "./validate.js";

initialCards.forEach(el => addCard(createCard(el.name, el.link), elements))

profileEditBtn.addEventListener('click', () => {
  clearPopupInputs(profileEditPopup);
  openPopup(profileEditPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
})

profileEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditPopup);
})

cardAddBtn.addEventListener('click', () => {
  clearPopupInputs(cardAddPopup);
  openPopup(cardAddPopup);
})

cardAddForm.addEventListener('submit', evt => {
  evt.preventDefault();
  addCard(createCard(cardNameInput.value, cardLinkInput.value), elements);
  closePopup(cardAddPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
})

popupCloseButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    closePopup(btn.closest('.popup'))
  })
})

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) closePopup(popup)
  })
})

enableValidation();
