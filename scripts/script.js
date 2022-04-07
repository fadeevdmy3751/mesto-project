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

const cardTemplate = document.querySelector('#card-template').content;
const elements = content.querySelector('.elements');
const bigImgPopup = document.querySelector('.big-img');
const bigImgPopupCloseBtn = bigImgPopup.querySelector('.big-img-close');
const bigImage = bigImgPopup.querySelector('img');
const bigImgCaption = bigImgPopup.querySelector('figcaption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function addCard(name, link) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__name').textContent = name;
  const card_img = card.querySelector('.card__image');
  card_img.alt = name;
  card_img.src = link;
  card_img.addEventListener('click', () => {
    bigImage.src = card_img.src;
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
  elements.prepend(card)
}

initialCards.forEach(el => addCard(el.name, el.link))

profileEditBtn.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(profileEditPopup)
})

profileEditPopupCloseBtn.addEventListener('click', () => closePopup(profileEditPopup))

profileEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditPopup);
})

cardAddBtn.addEventListener('click', () => openPopup(cardAddPopup))

cardAddPopupCloseBtn.addEventListener('click', () => closePopup(cardAddPopup))

cardAddForm.addEventListener('submit', evt => {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value);
  closePopup(cardAddPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
})

bigImgPopupCloseBtn.addEventListener('click', () => closePopup(bigImgPopup))
