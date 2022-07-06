import {TOKEN, COHORT} from './secret.js';
// import {refreshLikes} from "./card.js";

class Api {
  constructor() {
    this._config = {
      baseUrl: 'https://nomoreparties.co/v1/' + COHORT,
      headers: {
        authorization: TOKEN,
        'Content-Type': 'application/json'
      }
    }
  }

  // метод выполнения запроса по url-ресурсу
  _makeFetch(fetchResource, requestMethod, errorMes, requestBody = undefined) {
    // формирование тела запроса без body
    const fetchOptions = {
      method: requestMethod,
      headers: this._config.headers
    };

    // проверка на наличие body и включение в тело запроса
    if(requestBody !== undefined) {
      fetchOptions.body = JSON.stringify(requestBody);
    }

    return fetch(fetchResource, fetchOptions)
        .then(res => this._checkResponse(res, errorMes))
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

export class AvatarApi extends Api {
  constructor() {
    super();
    this._avatarBaseUrl = '/users/me/avatar';
  }

  // метод редактирования аватара
  editAvatar(url) {
    return this._makeFetch(this._config.baseUrl + this._avatarBaseUrl,
        'PATCH', 'Ошибка editAvatar: ', {avatar: url});
  }
}

export class ProfileApi extends Api {
  constructor() {
    super();
    this._profileBaseUrl = '/users/me';
  }

  // метод получения данных собственного профиля
  getMe() {
    return this._makeFetch(this._config.baseUrl + this._profileBaseUrl, 'GET',
        'Ошибка getMe: ');
  }

  // метод редактирования собственного профиля
  editProfile(name, about) {
    return this._makeFetch(this._config.baseUrl + this._profileBaseUrl, 'PATCH',
        'Ошибка editProfile: ', {name: name, about: about});
  }
}

export class CardsApi extends Api {
  constructor() {
    super();
    this._cardsBaseUrl = '/cards';
    this._cardsLikeBaseUrl = '/cards/likes/';
  }

  // метод получения текущих карточек с сервера
  getInitialCards() {
    return this._makeFetch(this._config.baseUrl + this._cardsBaseUrl, 'GET',
        'Ошибка getInitialCards: ');
  }

  // метод добавления новой карточки на сервер
  addCardOnServer(name, link) {
    return this._makeFetch(this._config.baseUrl + this._cardsBaseUrl, 'POST',
        'Ошибка addCardOnServer: ', {name: name, link: link});
  }

  // метод удаления выбранной (определяется по event) карточки
  deleteCard(event) {
    const card = event.target.closest('.card');
    return this._makeFetch(this._config.baseUrl + this._cardsBaseUrl +'/' + card._id, 'DELETE',
        'Ошибка deleteCard: ');
  }

  // метод присвоения/удаления лайка карточке
  likeCard(event) {
    const card = event.target.closest('.card');

    // инициализация параметров
    let requestMethod = '';
    let errorMes = '';

    // заполнение параметров значениями в зависимости от требуемого действия с карточкой
    if (card.myLike) { //удалить лайк
      requestMethod = 'DELETE';
      errorMes = 'Ошибка delete like: ';
    } else {  // поставить лайк
      requestMethod = 'PUT';
      errorMes = 'Ошибка put like: ';
    }

    return this._makeFetch(this._config.baseUrl + this._cardsLikeBaseUrl + card._id, requestMethod,
        errorMes);
  }
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '7da4e682-e653-495f-9d74-1a03b7d57194',
    'Content-Type': 'application/json'
  }
});


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

// const api = new Api();
