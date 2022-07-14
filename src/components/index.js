import PopupWithImage from "./PopupWithImage";

const content = document.querySelector('.content');
const avatarEditPopup = document.querySelector('.popup-avatar-edit');
const avatarEditForm = avatarEditPopup.querySelector('.form[name="popup-avatar-edit-form"]');// уточнить класс или name
const profileEditPopup = document.querySelector('.popup-profile-edit');// уточнить класс
const profileEditBtn = content.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form[name="popup-profile-edit-form"]');// уточнить класс или name

const nameInput = profileEditPopup.querySelector('#form__field-name');
const descriptionInput = profileEditPopup.querySelector('#form__field-profession');
const avatarInput = avatarEditForm.querySelector('#form__field-ava');
const cardAddPopup = document.querySelector('.popup-card-add'); // уточнить класс
const cardAddBtn = content.querySelector('.profile__add-button');
const bigImgPopup = document.querySelector('.big-img');
const cardAddForm = cardAddPopup.querySelector('.form[name="popup-card-add-form"]'); // уточнить класс или name
const cardNameInput = cardAddPopup.querySelector('#card-add-name');
const cardLinkInput = cardAddPopup.querySelector('#card-add-link');
const elementsContainer = content.querySelector('.elements');
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close')
const cardTemplate = document.querySelector('#card-template').content;
const card1 = content.querySelector('.card');

const profileName = '.profile__name';
const profileDescription = '.profile__description';
const profileAvatar = '.profile__avatar';

import  '../pages/index.css';
import Popup from './popup.js';
//import { openPopup, closePopup } from './popup.js';
//import {addCard, createCard} from './card.js';
import { COHORT, TOKEN } from "./secret.js";
import Card from './card.js';
import Section from './Section.js'
// import {validationParams, clearPopupInputs, enableValidation} from "./validate.js";
import {FormValidator} from "./FormValidator.js";
import { CardsApi, ProfileApi, AvatarApi } from './api.js';
import { refreshProfile } from './utils.js';
import PopupWithForm from './PopupWithForm.js' ;
import UserInfo from './UserInfo.js'

const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/' + COHORT,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}

const validationParams = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__field_error',
  errorClass: 'form__error_visible',
}

const cardsApi = new CardsApi(apiConfig);
const profileApi = new ProfileApi(apiConfig);
const avatarApi = new AvatarApi(apiConfig);
const myProfile = new UserInfo(
  {
    userNameSelector: profileName,
    userAboutSelector: profileDescription,
    userAvatarSelector: profileAvatar
  })

Promise.all([cardsApi.getInitialCards(), profileApi.getMe()])
  .then(([cardsInfo, myProfileInfo]) => {
    const cardList = new Section({
      items: cardsInfo,
      renderer: (item) => {
        const cardPopup = new PopupWithImage(bigImgPopup, item.link, item.name);
        const card = new Card (item, '#card-template', myProfileInfo._id,
          () => cardPopup.open(),
          (card) => cardsApi.likeCard(card));
        const cardElement = card.generate();
        cardList.addItem(cardElement);
      }
    }, '.elements');

    cardList.renderItems();
    myProfile.refreshUserInfo({name: myProfileInfo.name, about: myProfileInfo.about, avatar: myProfileInfo.avatar});
  })
  .catch((err) => {
    console.log(err);
  });

//создание валидатора профиля
const profileValidator = new FormValidator({
  inputSelector: validationParams.inputSelector,
  submitButtonSelector: validationParams.submitButtonSelector,
  inactiveButtonClass: validationParams.inactiveButtonClass,
  inputErrorClass: validationParams.inputErrorClass,
  errorClass: validationParams.errorClass}, profileEditForm)

//создание попапа редактирования профиля
const openPopupProfile = new PopupWithForm(profileEditPopup,
  (data) => {
    profileEditForm.querySelector('.form__button').textContent = "Сохранение...";
    profileApi.editProfile(data.name, data.profession)
      .then((json) => {
        console.log('userinfo updated', json);
        myProfile.refreshUserInfo({name: json.name, about: json.about});
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        profileEditForm.querySelector('.form__button').textContent = "Сохранить";
        openPopupProfile.close();
      });
  });

//навешивание листенера на кнопку открытия попапа профиля
profileEditBtn.addEventListener('click', () => {
  profileValidator.clearPopupInputs();
  nameInput.value = document.querySelector(profileName).textContent;
  descriptionInput.value = document.querySelector(profileDescription).textContent;
  openPopupProfile.open();
  profileValidator.enableValidation();
})

//создание валидатора аватарки
const avatarValidator = new FormValidator({
  inputSelector: validationParams.inputSelector,
  submitButtonSelector: validationParams.submitButtonSelector,
  inactiveButtonClass: validationParams.inactiveButtonClass,
  inputErrorClass: validationParams.inputErrorClass,
  errorClass: validationParams.errorClass}, avatarEditForm)

//создание попапа редактирования аватарки
const openPopupAvatar = new PopupWithForm(avatarEditPopup,
  (data) => {
    avatarEditForm.querySelector('.form__button').textContent = "Сохранение...";
    avatarApi.editAvatar(data.avatar)
      .then((json) => {
        console.log('avatar updated', json);
        myProfile.refreshUserInfo({avatar: json.avatar});
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        avatarEditForm.querySelector('.form__button').textContent = "Сохранить";
        openPopupAvatar.close();
      });
  });

//навешивание листенера на кнопку открытия попапа аватарки
document.querySelector(profileAvatar).addEventListener('click', () => {
  avatarValidator.clearPopupInputs();
  openPopupAvatar.open();
  avatarValidator.enableValidation();
})

// Открыть окно добавления карточки
// const openPopupCard = new Popup (cardAddPopup);
//
// cardAddBtn.addEventListener('click', () => {
//   clearPopupInputs(cardAddPopup, validationParams);
//   openPopupCard.open();
// })
const newCardPopup = new PopupWithForm()



//закрыть окна
// console.log(closePopup)
// console.log(closePopup.close())

// popupCloseButtons.forEach(btn => {
//   btn.addEventListener('click', closePopup.close())
// })

// popups.forEach(popup => {
//   popup.addEventListener('click', closePopup.close())
// })


// avatarEditForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   avatarEditForm.querySelector('.form__button').textContent = 'Сохранение...'
//   const avatarApi = new AvatarApi()
//   avatarApi.editAvatar(avatarInput.value)
//     .then((json) => {
//       console.log('user avatar updated', json)
//       refreshProfile(null, null, json.avatar)
//       new Popup ('.popup-avatar-edit').close();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       avatarEditForm.querySelector('.form__button').textContent = 'Сохранить'

//     })
// })





// cardAddForm.addEventListener('submit', evt => {
//   evt.preventDefault();
//   cardAddForm.querySelector('.form__button').textContent = 'Сохранение...'
//   addCardOnServer(cardNameInput.value, cardLinkInput.value)
//     .then((json) => {
//       Card.addCard(Card.generate (json), elementsContainer, true);
//       new Popup ('.popup-card-add').close();
//       cardNameInput.value = '';
//       cardLinkInput.value = '';
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       cardAddForm.querySelector('.form__button').textContent = 'Сохранить'
//     })
// })



enableValidation(validationParams);
