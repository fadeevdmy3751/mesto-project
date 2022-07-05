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
import { CardsApi, ProfileApi, AvatarApi } from './api.js';
import { refreshProfile } from './utils.js';
import PopupWithForm from './PopupWithForm.js' ;
import UserInfo from './UserInfo.js'

const cardsApi = new CardsApi()
const profileApi = new ProfileApi()
const userInfo = new UserInfo({ profileName, profileDescription, profileAvatar });


Promise.all([cardsApi.getInitialCards(), profileApi.getMe()])
  .then(([cardsInfo, userInfo]) => {
    // console.log('init cards', cardsInfo);
    const cardList = new Section({
      data: cardsInfo,
      renderer: (item) => {
        const card = new Card (item, '#card-template');
        const cardElement = card.generate();
        cardList.setItem(cardElement);
        card.addDefaultLike();
        card.addDeleteButton();
        card.handleCardClick();
      }
    }, '.elements');

    cardList.renderItems();
    refreshProfile(userInfo.name, userInfo.about, userInfo.avatar);
    //  myID = userInfo._id;
  })
  .catch((err) => {
    console.log(err);
  });



//открыть окно редактирования профиля
const openPopupProfile = new Popup (profileEditPopup);

profileEditBtn.addEventListener('click', () => {
  clearPopupInputs(profileEditPopup, validationParams);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopupProfile.open();
})


// Редактирование профиля:
  const formEditUser = new PopupWithForm (profileEditPopup, {
    handleSubmit: (data) => {
      console.log(data)
      profileEditForm.querySelector('.form__button').textContent = "Сохранение...";
      profileApi.getMe(data)
      .then((data) => {
      userInfo.setUserInfo(data);
      formEditUser.close();
      openPopupProfile.close();
      new Popup ('.popup-profile-edit').close();
      })
      .catch((err) => {
      console.log(err)})
      .finally(() => {
        profileEditForm.textContent = "Сохранить";
        console.log(data)
      });
    }
  });

  profileEditForm.addEventListener('submit', formEditUser.close(profileEditPopup));

// profileEditForm.addEventListener('submit', evt => {
//   evt.preventDefault();
//   profileEditForm.querySelector('.form__button').textContent = 'Сохранение...'
//   const profileApi = new ProfileApi()
//   profileApi.editProfile(nameInput.value, descriptionInput.value)
//     .then((json) => {
//       console.log('userinfo updated', json)
//       refreshProfile(json.name, json.about)
//       new Popup ('.popup-profile-edit').close();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       profileEditForm.querySelector('.form__button').textContent = 'Сохранить'
//     })
// })

 //открыть окно редактирования аватарки
const openPopupAvatar = new Popup (avatarEditPopup);

profileAvatar.addEventListener('click', () => {
  clearPopupInputs(avatarEditPopup, validationParams);
  openPopupAvatar.open();
});


// Редактирование аватарки:
// const formEditAvatar = new PopupWithForm(profileEditPopup, {
//   handleSubmit: (data) => {
//     avatarEditForm.querySelector('.form__button').textContent = "Сохранение...";
//     profileApi.getMe(data)
//     .then((data) => {
//     userInfo.setUserInfo(data);
//     })
//     .catch((err) => {
//     console.log(err)})
//     .finally(() => {
//       profileEditForm.textContent = "Сохранить";
//     formEditUser.close();
//     });
//   }
// });

// Открыть окно добавления карточки
const openPopupCard = new Popup (cardAddPopup);

cardAddBtn.addEventListener('click', () => {
  clearPopupInputs(cardAddPopup, validationParams);
  openPopupCard.open();
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
