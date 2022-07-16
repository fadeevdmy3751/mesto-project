
const content = document.querySelector('.content');
const avatarEditPopup = document.querySelector('.popup-avatar-edit');
const avatarEditForm = avatarEditPopup.querySelector('.form[name="popup-avatar-edit-form"]');// уточнить класс или name
const avatarFormButton = avatarEditForm.querySelector('.form__button');
const profileEditPopup = document.querySelector('.popup-profile-edit');// уточнить класс
const profileEditBtn = content.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form[name="popup-profile-edit-form"]');// уточнить класс или name
const profileFormButton = profileEditForm.querySelector('.form__button');

const nameInput = profileEditPopup.querySelector('#form__field-name');
const descriptionInput = profileEditPopup.querySelector('#form__field-profession');

const cardAddPopup = document.querySelector('.popup-card-add'); // уточнить класс
const cardAddBtn = content.querySelector('.profile__add-button');
const bigImgPopup = document.querySelector('.big-img');
const cardAddForm = cardAddPopup.querySelector('.form[name="popup-card-add-form"]'); // уточнить класс или name
const cardFormButton = cardAddForm.querySelector('.form__button');

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

    //создание валидатора добавления карточки
    const newCardValidator = new FormValidator(validationParams, cardAddForm)

    //создание попапа добавления карточки
    const openPopupNewCard = new PopupWithForm(cardAddPopup,
      (data) => {
        cardFormButton.textContent = "Сохранение...";
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
            cardFormButton.textContent = "Сохранить";
          });
      });

    //навешивание листенера на кнопку открытия попапа добавления карточки
    cardAddBtn.addEventListener('click', () => {
      newCardValidator.clearPopupInputs();
      openPopupNewCard.open();
    })
  })
  .catch((err) => {
    console.log(err);
  });

//создание валидатора профиля
const profileValidator = new FormValidator(validationParams, profileEditForm)

//создание попапа редактирования профиля
const openPopupProfile = new PopupWithForm(profileEditPopup,
  (data) => {
    profileFormButton.textContent = "Сохранение...";
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
        profileFormButton.textContent = "Сохранить";
      });
  });

//навешивание листенера на кнопку открытия попапа профиля
profileEditBtn.addEventListener('click', () => {
  profileValidator.clearPopupInputs();
  const userInfo = myProfile.getUserInfo();
  nameInput.value = userInfo.userName;
  descriptionInput.value = userInfo.userAbout;
  openPopupProfile.open();
})

//создание валидатора аватарки
const avatarValidator = new FormValidator(validationParams, avatarEditForm)

//создание попапа редактирования аватарки
const openPopupAvatar = new PopupWithForm(avatarEditPopup,
  (data) => {
    avatarFormButton.textContent = "Сохранение...";
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
        avatarFormButton.textContent = "Сохранить";
      });
  });

//навешивание листенера на кнопку открытия попапа аватарки
document.querySelector(profileAvatar).addEventListener('click', () => {
  avatarValidator.clearPopupInputs();
  openPopupAvatar.open();
})

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(validationParams.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationParams, formElement);
    validator.enableValidation()
  });
}
enableValidation()
