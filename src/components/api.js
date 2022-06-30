import {TOKEN, COHORT} from './secret.js';
import {refreshLikes} from "./card.js";

export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;   // url, по которому происходит обращение
    this._headers = headers;   // headers, передаваемые в запросе по урлу
  }

  getInitialCards(){
    return fetch(this._baseUrl + URLs.cards, {headers: this._headers})
      .then(res => this._checkResponse(res, 'Ошибка getInitialCards: '))
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

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
});


// из старого кода - конфиг хедера для подключения к серверу
const config = {
  baseUrl: 'https://nomoreparties.co/v1/' + COHORT,
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    }
}

// из старого кода - окончания урлов для каждого из используемых методов
const URLs = {
  cards: '/cards',
  me: '/users/me',
  like: '/cards/likes/',
  avatar: '/users/me/avatar'
}

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

export function getMe(){
  return fetch(config.baseUrl + URLs.me,{headers: config.headers})
    .then(res => checkResponse(res, 'Ошибка getMe: '))
}

export function editAvatar(url){
  return fetch(config.baseUrl + URLs.avatar, {
    method: 'PATCH',
    headers:  config.headers,
    body: JSON.stringify({
      avatar: url,
    })
  })
    .then(res => checkResponse(res, 'Ошибка editAvatar: '))
}

export function editProfile(name, about){
  return fetch(config.baseUrl + URLs.me, {
    method: 'PATCH',
    headers:  config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => checkResponse(res, 'Ошибка editProfile: '))
}

export function addCardOnServer(name, link){
  return  fetch(config.baseUrl + URLs.cards, {
    method: 'POST',
    headers:  config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => checkResponse(res, 'Ошибка addCardOnServer: '))
}

export function deleteCard(event){
  const card = event.target.closest('.card');
  return fetch(config.baseUrl + URLs.cards +'/' + card._id, {
    method: 'DELETE',
    headers:  config.headers,
  })
    .then(res => checkResponse(res, 'Ошибка deleteCard: '))
}

export function likeCard(event){
  const card = event.target.closest('.card');
  if (card.myLike){ //удалить
    return fetch(config.baseUrl + URLs.like + card._id, {
      method: 'DELETE',
      headers:  config.headers,
    })
      .then(res => checkResponse(res, 'Ошибка delete like: '))
  } else { // поставить
    return fetch(config.baseUrl + URLs.like + card._id, {
      method: 'PUT',
      headers:  config.headers,
    })
      .then(res => checkResponse(res, 'Ошибка put like: '))
  }
}
