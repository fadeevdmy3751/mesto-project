import {TOKEN, COHORT} from './secret.js';
// import {refreshLikes} from "./card.js";

export class Api {
  constructor() {
    this._config = {
      baseUrl: 'https://nomoreparties.co/v1/' + COHORT,
      headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
      }
    }
  }

  // метод проверки ответа от сервера на наличие ошибки
  // при её наличии - возврат Promise.reject
  // если всё ок - возврат полученного сообщения в json
  _checkResponse(res, errorMes) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`${errorMes + res.status}`);
  }

}

// из старого кода - конфиг хедера для подключения к серверу
// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/' + COHORT,
//     headers: {
//       authorization: TOKEN,
//       'Content-Type': 'application/json'
//     }
// }

// из старого кода - окончания урлов для каждого из используемых методов
// const URLs = {
//   cards: '/cards',
//   me: '/users/me',
//   like: '/cards/likes/',
//   avatar: '/users/me/avatar'
// }

// function checkResponse(res, errorMes) {
//   if (res.ok) {
//     return res.json();
//   }
//   // если ошибка, отклоняем промис
//   return Promise.reject(`${errorMes + res.status}`);
// }

// export function getInitialCards(){
//   return fetch(config.baseUrl + URLs.cards, {headers: config.headers})
//     .then(res => checkResponse(res, 'Ошибка getInitialCards: '))
// }

// export function getMe(){
//   return fetch(config.baseUrl + URLs.me,{headers: config.headers})
//     .then(res => checkResponse(res, 'Ошибка getMe: '))
// }
export class AvatarApi extends Api {
  constructor() {
    super();
    this._avatarBaseUrl = '/users/me/avatar';
  }

  editAvatar(url){
    return fetch(this._config.baseUrl + this._avatarBaseUrl, {
      method: 'PATCH',
      headers:  this._config.headers,
      body: JSON.stringify({
        avatar: url,
      })
    })
      .then(res => this._checkResponse(res, 'Ошибка editAvatar: '))
  }
}

// export function editAvatar(url){
//   return fetch(config.baseUrl + URLs.avatar, {
//     method: 'PATCH',
//     headers:  config.headers,
//     body: JSON.stringify({
//       avatar: url,
//     })
//   })
//     .then(res => checkResponse(res, 'Ошибка editAvatar: '))
// }

export class ProfileApi extends Api {
  constructor() {
    super();
    this._profileBaseUrl = '/users/me';
  }

  getMe() {
    return fetch(this._config.baseUrl + this._profileBaseUrl,{headers: this._config.headers})
      .then(res => this._checkResponse(res, 'Ошибка getMe: '))
  }

  editProfile(name, about){
    return fetch(this._config.baseUrl + this._profileBaseUrl, {
      method: 'PATCH',
      headers:  this._config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._checkResponse(res, 'Ошибка editProfile: '))
  }
}

// export function editProfile(name, about){
//   return fetch(config.baseUrl + URLs.me, {
//     method: 'PATCH',
//     headers:  config.headers,
//     body: JSON.stringify({
//       name: name,
//       about: about
//     })
//   })
//     .then(res => checkResponse(res, 'Ошибка editProfile: '))
// }

export class CardsApi extends Api {
  constructor() {
    super();
    this._cardsBaseUrl = '/cards';
    this._cardsLikeBaseUrl = '/cards/likes/';
  }

  getInitialCards(){
    return fetch(this._config.baseUrl + this._cardsBaseUrl, {headers: this._config.headers})
      .then(res => this._checkResponse(res, 'Ошибка getInitialCards: '))
  }

  addCardOnServer(name, link){
    return  fetch(this._config.baseUrl + this._cardsBaseUrl, {
      method: 'POST',
      headers:  this._config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._checkResponse(res, 'Ошибка addCardOnServer: '));
  }

  deleteCard(event){
    const card = event.target.closest('.card');
    return fetch(this._config.baseUrl + this._cardsBaseUrl +'/' + card._id, {
      method: 'DELETE',
      headers:  this._config.headers,
    })
      .then(res => this._checkResponse(res, 'Ошибка deleteCard: '));
  }

  likeCard(event){
    const card = event.target.closest('.card');
    if (card.myLike){ //удалить
      return fetch(this._config.baseUrl + this._cardsLikeBaseUrl + card._id, {
        method: 'DELETE',
        headers:  this._config.headers,
      })
        .then(res => this._checkResponse(res, 'Ошибка delete like: '))
    } else { // поставить
      return fetch(this._config.baseUrl + this._cardsLikeBaseUrl + card._id, {
        method: 'PUT',
        headers:  this._config.headers,
      })
        .then(res => this._checkResponse(res, 'Ошибка put like: '))
    }
  }
}

// export function addCardOnServer(name, link){
//   return  fetch(config.baseUrl + URLs.cards, {
//     method: 'POST',
//     headers:  config.headers,
//     body: JSON.stringify({
//       name: name,
//       link: link
//     })
//   })
//     .then(res => checkResponse(res, 'Ошибка addCardOnServer: '))
// }

// export function deleteCard(event){
//   const card = event.target.closest('.card');
//   return fetch(config.baseUrl + URLs.cards +'/' + card._id, {
//     method: 'DELETE',
//     headers:  config.headers,
//   })
//     .then(res => checkResponse(res, 'Ошибка deleteCard: '))
// }

// export function likeCard(event){
//   const card = event.target.closest('.card');
//   if (card.myLike){ //удалить
//     return fetch(config.baseUrl + URLs.like + card._id, {
//       method: 'DELETE',
//       headers:  config.headers,
//     })
//       .then(res => checkResponse(res, 'Ошибка delete like: '))
//   } else { // поставить
//     return fetch(config.baseUrl + URLs.like + card._id, {
//       method: 'PUT',
//       headers:  config.headers,
//     })
//       .then(res => checkResponse(res, 'Ошибка put like: '))
//   }
// }

const api = new Api();
