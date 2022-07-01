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
const cardTemplate = document.querySelector('#card-template').content;
const card1 = content.querySelector('.card');

// import  '../pages/index.css';
import Popup from './popup.js';
//import { openPopup, closePopup } from './popup.js';
//import {addCard, createCard} from './card.js';
import Card from './card.js';
import Section from './Section.js'
import {validationParams, clearPopupInputs, enableValidation} from "./validate.js";
// import { Api, getMe } from './api.js';
// import {refreshProfile} from './utils.js';
import initialCards from './initialCards.js'


const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card (item, '#card-template');
    const cardElement = card.generate();
    cardList.setItem(cardElement);
  }
}, '.elements');

cardList.renderItems();


// const api = new Api({
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
//   headers: {
//     authorization: '7da4e682-e653-495f-9d74-1a03b7d57194',
//     'Content-Type': 'application/json'
//   }
// });

// api.getDefaultItems().then(([data, cards]) => {
//   profileName.textContent = data.name;
//   profileDescription.textContent = data.about;
//   profileAvatar.src = data.avatar;

//   const defaultCardList = new Section({
//       data: cards,
//       renderer: (items) => {
//           const cards = new DefaultCard(items, '#card-templat', data._id);
//           const cardElement = cards.generate();
//           defaultCardList.setItem(cardElement);
//           cards.addDefaultLike();
//           cards.addDeleteButton();
//           cards.handleCardClick();
//       }
//   }, '.elements');
//   defaultCardList.addItems();

// }).catch((err) => { console.log(err) });


// Promise.all([api.getInitialCards(), getMe()])
//   .then(([cardsInfo, userInfo]) => {
//     console.log('init cards', cardsInfo);
//     const Card = new Card (cardsInfo, cardTemplate)
//     cardsInfo.forEach(function (el) {
//       Card.addCard(Card.generate(el), elementsContainer)
//     });

//     console.log('user', userInfo);
//     refreshProfile(userInfo.name, userInfo.about, userInfo.avatar);
//     myID = userInfo._id;
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// export let myID;







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



//закрыть окна
// console.log(closePopup)
// console.log(closePopup.close())

// popupCloseButtons.forEach(btn => {
//   btn.addEventListener('click', closePopup.close())
// })

// popups.forEach(popup => {
//   popup.addEventListener('click', closePopup.close())
// })


avatarEditForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  avatarEditForm.querySelector('.form__button').textContent = 'Сохранение...'
  editAvatar(avatarInput.value)
    .then((json) => {
      console.log('user avatar updated', json)
      refreshProfile(null, null, json.avatar)
      new Popup ('.popup-avatar-edit').close();
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
      new Popup ('.popup-profile-edit').close();
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
      Card.addCard(Card.generate (json), elementsContainer, true);
      new Popup ('.popup-card-add').close();
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
