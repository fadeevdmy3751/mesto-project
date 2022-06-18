const content = document.querySelector('.content');
const profileAvatar = content.querySelector('.profile__avatar');
const avatarEditPopup = document.querySelector('.popup-avatar-edit');
const avatarEditForm = avatarEditPopup.querySelector('.form[name="popup-avatar-edit-form"]');// уточнить класс или name
const profileEditPopup = document.querySelector('.popup-profile-edit');// уточнить класс
const profileEditBtn = content.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form[name="popup-profile-edit-form"]');// уточнить класс или name
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const nameInput = profileEditPopup.querySelector('#form__field-name');
const descriptionInput = profileEditPopup.querySelector('#form__field-profession');
const avatarInput = avatarEditForm.querySelector('#form__field-ava');
const cardAddPopup = document.querySelector('.popup-card-add'); // уточнить класс
const cardAddBtn = content.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form[name="popup-card-add-form"]'); // уточнить класс или name
const cardNameInput = cardAddPopup.querySelector('#card-add-name');
const cardLinkInput = cardAddPopup.querySelector('#card-add-link');
const elementsContainer = content.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close')

import  '../pages/index.css';

import { openPopup, closePopup } from './popup.js';
import {addCard, createCard} from './card.js';
import {validationParams, clearPopupInputs, enableValidation} from "./validate.js";
import {getInitialCards, getMe, editProfile, addCardOnServer, editAvatar} from './api.js';
import {refreshProfile} from './utils.js';

getInitialCards()
  .then((json) => {
    console.log('init cards', json);
    json.forEach(el => addCard(createCard(el), elementsContainer));
  })
  .catch((err) => {
    console.log(err);
  });

export let myID;

getMe()
  .then((json) => {
    console.log('user', json);
    refreshProfile(json.name, json.about, json.avatar);
    myID = json._id;
  })
  .catch((err) => {
    console.log(err);
  });

profileAvatar.addEventListener('click', () => {
  clearPopupInputs(avatarEditPopup, validationParams);
  openPopup(avatarEditPopup);
});
cardAddBtn.addEventListener('click', () => openPopup(cardAddPopup));

profileEditBtn.addEventListener('click', () => {
  clearPopupInputs(profileEditPopup, validationParams);
  openPopup(profileEditPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
})

avatarEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  avatarEditForm.querySelector('.form__button').textContent = 'Сохранение...'
  editAvatar(avatarInput.value)
    .then((json) => {
      console.log('user avatar updated', json)
      refreshProfile(null, null, json.avatar)
    })
    .catch((err) => {
      console.log(err);
    });
  closePopup(avatarEditPopup);
})

profileEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileEditForm.querySelector('.form__button').textContent = 'Сохранение...'
  editProfile(nameInput.value, descriptionInput.value)
    .then((json) => {
      console.log('userinfo updated', json)
      refreshProfile(json.name, json.about)
    })
    .catch((err) => {
      console.log(err);
    });
  closePopup(profileEditPopup);
})

cardAddBtn.addEventListener('click', () => {
  clearPopupInputs(cardAddPopup, validationParams);
  openPopup(cardAddPopup);
})

cardAddForm.addEventListener('submit', evt => {
  evt.preventDefault();
  cardAddForm.querySelector('.form__button').textContent = 'Сохранение...'
  addCardOnServer(cardNameInput.value, cardLinkInput.value)
    .then((json) => {
      addCard(createCard(json), elementsContainer, true);
      closePopup(cardAddPopup);
      cardNameInput.value = '';
      cardLinkInput.value = '';
    })
    .catch((err) => {
      console.log(err);
    });
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

enableValidation(validationParams);
