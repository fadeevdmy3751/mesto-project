
const content = document.querySelector('.content');
const avatarEditPopup = document.querySelector('.popup-avatar-edit');
const profileEditPopup = document.querySelector('.popup-profile-edit');
const profileEditBtn = content.querySelector('.profile__edit-button');

const nameInput = profileEditPopup.querySelector('#form__field-name');
const descriptionInput = profileEditPopup.querySelector('#form__field-profession');

const cardAddPopup = document.querySelector('.popup-card-add');
const cardAddBtn = content.querySelector('.profile__add-button');
const bigImgPopup = document.querySelector('.big-img');

const profileName = '.profile__name';
const profileDescription = '.profile__description';
const profileAvatar = '.profile__avatar';
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

import  '../pages/index.css';

import { COHORT, TOKEN } from "./secret.js";
import PopupWithImage from "./PopupWithImage.js";
import Card from './card.js';
import Section from './Section.js'
import {FormValidator} from "./FormValidator.js";
import { CardsApi, ProfileApi, AvatarApi } from './api.js';
import PopupWithForm from './PopupWithForm.js' ;
import UserInfo from './UserInfo.js'


const cardsApi = new CardsApi(apiConfig);
const profileApi = new ProfileApi(apiConfig);
const avatarApi = new AvatarApi(apiConfig);
const cardPopup = new PopupWithImage(bigImgPopup);
const myProfile = new UserInfo(
  {
    userNameSelector: profileName,
    userAboutSelector: profileDescription,
    userAvatarSelector: profileAvatar
  })

  const formValidators = {}

  // Включение валидации
  const enableValidation = (validationParams) => {
    const formList = Array.from(document.querySelectorAll(validationParams.formSelector))
    formList.forEach((formElement) => {
      const validator = new FormValidator(validationParams, formElement)
      const formName = formElement.getAttribute('name');
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };
  enableValidation(validationParams);


function createCard(item, myProfileInfo) {
  const card = new Card(item, '#card-template', myProfileInfo,
  () => cardPopup.open(item.link, item.name),
  (card) => cardsApi.likeCard(card),
  (card) => cardsApi.deleteCard(card));

  return card.generate();
}

Promise.all([cardsApi.getInitialCards(), profileApi.getMe()])
  .then(([cardsInfo, myProfileInfo]) => {
    const cardList = new Section({
      items: cardsInfo,
      renderer: (item) => {
        const card = createCard(item, myProfileInfo._id);
        cardList.addItem(card);
      }
    }, '.elements');

    cardList.renderItems();
    myProfile.refreshUserInfo({name: myProfileInfo.name, about: myProfileInfo.about, avatar: myProfileInfo.avatar});

    //создание попапа добавления карточки
    const openPopupNewCard = new PopupWithForm(cardAddPopup,
      (data) => {
        openPopupNewCard.renderLoading(true)
        cardsApi.addCardOnServer(data["card-name"], data["card-link"])
          .then((json) => {
            console.log('new card added', json);
            const card = createCard(json, json.owner._id);
            cardList.addItem(card, true);
            openPopupNewCard.close();
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            openPopupNewCard.renderLoading(false);
          });
      });

    //навешивание листенера на кнопку открытия попапа добавления карточки
    cardAddBtn.addEventListener('click', () => {
      formValidators['popup-card-add-form'].clearPopupInputs()
      openPopupNewCard.open();
    })
  })
  .catch((err) => {
    console.log(err);
  });


//создание попапа редактирования профиля
const openPopupProfile = new PopupWithForm(profileEditPopup,
  (data) => {
    openPopupProfile.renderLoading(true);
    profileApi.editProfile(data.name, data.profession)
      .then((json) => {
        console.log('profile info updated: ', json);
        myProfile.setUserInfo(json.name, json.about);
        openPopupProfile.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        openPopupProfile.renderLoading(false);
      });
  });

//навешивание листенера на кнопку открытия попапа профиля
profileEditBtn.addEventListener('click', () => {
  formValidators['popup-profile-edit-form'].clearPopupInputs()
  const userInfo = myProfile.getUserInfo();
  nameInput.value = userInfo.userName;
  descriptionInput.value = userInfo.userAbout;
  openPopupProfile.open();
})

//создание попапа редактирования аватарки
const openPopupAvatar = new PopupWithForm(avatarEditPopup,
  (data) => {
    openPopupAvatar.renderLoading(true);
    avatarApi.editAvatar(data.avatar)
      .then((json) => {
        console.log('avatar updated', json);
        myProfile.refreshUserInfo({avatar: json.avatar});
        openPopupAvatar.close();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        openPopupAvatar.renderLoading(false);
      });
  });

//навешивание листенера на кнопку открытия попапа аватарки
document.querySelector(profileAvatar).addEventListener('click', () => {
  formValidators['popup-avatar-edit-form'].clearPopupInputs()
  openPopupAvatar.open();
})

