const content = document.querySelector('.content');
const profileEditPopup = document.querySelector('.popup-profile-edit');// уточнить класс
const profileEditBtn = content.querySelector('.profile__edit-button');
const profileEditForm = profileEditPopup.querySelector('.form[name="popup-profile-edit-form"]');// уточнить класс или name
const profileEditPopupCloseBtn = profileEditPopup.querySelector('.popup-profile-edit-close');// уточнить класс
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const nameInput = profileEditPopup.querySelector('#form__field-name');
const descriptionInput = profileEditPopup.querySelector('#form__field-profession');

const cardAddPopup = document.querySelector('.popup-card-add'); // уточнить класс
const cardAddBtn = content.querySelector('.profile__add-button');
const cardAddForm = cardAddPopup.querySelector('.form[name="popup-card-add-form"]'); // уточнить класс или name
const cardAddPopupCloseBtn = cardAddPopup.querySelector('.popup-card-add-close'); // уточнить класс
const cardNameInput = cardAddPopup.querySelector('#card-add-name');
const cardLinkInput = cardAddPopup.querySelector('#card-add-link');

const initialCards = [
  {
    name: 'Вулканы Камчатки',
    link: 'https://s3.nat-geo.ru/images/2019/8/10/1da96e6d650c4161ba95fd23b8bc73a0.max-2500x1500.jpg'
  },
  {
    name: 'Териберка',
    link: 'https://images.unsplash.com/photo-1624719635330-c03b1ed0c02a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Чарские пески',
    link: 'https://cdn.fishki.net/upload/post/2020/05/30/3331186/464032765c4dfd02da79b370f92da681.jpg'
  },
  {
    name: 'Рускеала',
    link: 'https://images.unsplash.com/photo-1548288242-d454d4648b55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'
  },
  {
    name: 'Ак-кем',
    link: 'https://www.vsedostoprimechatelnosti.ru/assets/cache/images/evropa/rossiya5/altajskij-kraj/akkemskoe-ozero-860x-2e7.jpg'
  },
  {
    name: 'Мурманск',
    link: 'https://images.unsplash.com/photo-1612860640446-3023ebe28e85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'
  },
  /*{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }*/
];
const cardTemplate = document.querySelector('#card-template').content;
const elements = content.querySelector('.elements');
const bigImgPopup = document.querySelector('.big-img');
const bigImgPopupCloseBtn = bigImgPopup.querySelector('.big-img-close');
const bigImage = bigImgPopup.querySelector('img');
const bigImgCaption = bigImgPopup.querySelector('figcaption');


function addCard(name, link, begin = 0) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__name').textContent = name;
  const card_img = card.querySelector('.card__image');
  card_img.alt = name;
  card_img.src = link;
  card_img.addEventListener('click', () => {
    bigImage.src = card_img.src;
    bigImgCaption.textContent = name;
    bigImgPopup.classList.add('popup_opened');
  })
  const cardLike = card.querySelector('.card__like');
  cardLike.addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_set')
  })
  const cardDel = card.querySelector('.card__delete');
  cardDel.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  })
  if (!begin) elements.append(card)
  else elements.prepend(card)
}

initialCards.forEach(el => addCard(el.name, el.link))

profileEditBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  profileEditPopup.classList.add('popup_opened');
})

profileEditPopupCloseBtn.addEventListener('click', () => profileEditPopup.classList.remove('popup_opened'))

profileEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  profileEditPopup.classList.remove('popup_opened');
})

cardAddBtn.addEventListener('click', () => {
  // cardNameInput.value = '';
  // cardLinkInput.value = ''; // не очищать пока не добавили // почему-то само очищается
  cardAddPopup.classList.add('popup_opened');
})

cardAddPopupCloseBtn.addEventListener('click', () => cardAddPopup.classList.remove('popup_opened'))

cardAddForm.addEventListener('submit', evt => {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value, 1);
  cardAddPopup.classList.remove('popup_opened');
  cardNameInput.value = '';
  cardLinkInput.value = '';
})

bigImgPopupCloseBtn.addEventListener('click', () => bigImgPopup.classList.remove('popup_opened'))
