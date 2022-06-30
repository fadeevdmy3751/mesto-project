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
import Popup from './popup.js';
//import { openPopup, closePopup } from './popup.js';
import {addCard, createCard} from './card.js';
import {validationParams, clearPopupInputs, enableValidation} from "./validate.js";
import {getInitialCards, getMe, editProfile, addCardOnServer, editAvatar} from './api.js';
import {refreshProfile} from './utils.js';

Promise.all([getInitialCards(), getMe()])
  .then(([cardsInfo, userInfo]) => {
    console.log('init cards', cardsInfo);
    cardsInfo.forEach(el => addCard(createCard(el), elementsContainer));

    console.log('user', userInfo);
    refreshProfile(userInfo.name, userInfo.about, userInfo.avatar);
    myID = userInfo._id;
  })
  .catch((err) => {
    console.log(err);
  });

export let myID;

//открыть окно добавления карточки
const openPopupCard = new Popup ('.popup-card-add');

 cardAddBtn.addEventListener('click', () => {
   clearPopupInputs(cardAddPopup, validationParams);
   openPopupCard.open();
 })


 //открыть окно редактирования аватарки
const openPopupAvatar = new Popup ('.popup-avatar-edit');

profileAvatar.addEventListener('click', () => {
  clearPopupInputs(avatarEditPopup, validationParams);
  openPopupAvatar.open();
});


//открыть окно редактирования профиля
const openPopupProfile = new Popup ('.popup-profile-edit');

profileEditBtn.addEventListener('click', () => {
  clearPopupInputs(profileEditPopup, validationParams);
  openPopupProfile.open();
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
})

//cardAddBtn.addEventListener('click', () => Popup.open(cardAddPopup));

//закрыть окна
const closePopup = new Popup ('.popup__close');

popupCloseButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    closePopup.close()
  })
})

popups.forEach(popup => {
  popup.addEventListener('click', closePopup.close)
})


avatarEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  avatarEditForm.querySelector('.form__button').textContent = 'Сохранение...'
  editAvatar(avatarInput.value)
    .then((json) => {
      console.log('user avatar updated', json)
      refreshProfile(null, null, json.avatar)
      closePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarEditForm.querySelector('.form__button').textContent = 'Сохранить'
    })
})

profileEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileEditForm.querySelector('.form__button').textContent = 'Сохранение...'
  editProfile(nameInput.value, descriptionInput.value)
    .then((json) => {
      console.log('userinfo updated', json)
      refreshProfile(json.name, json.about)
      closePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditForm.querySelector('.form__button').textContent = 'Сохранить'
    })
})



cardAddForm.addEventListener('submit', evt => {
  evt.preventDefault();
  cardAddForm.querySelector('.form__button').textContent = 'Сохранение...'
  addCardOnServer(cardNameInput.value, cardLinkInput.value)
    .then((json) => {
      addCard(createCard(json), elementsContainer, true);
      closePopup.close();
      cardNameInput.value = '';
      cardLinkInput.value = '';
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      cardAddForm.querySelector('.form__button').textContent = 'Сохранить'
    })
})



enableValidation(validationParams);
