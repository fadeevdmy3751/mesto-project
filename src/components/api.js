// import {TOKEN, COHORT} from './secret.js';
// import {refreshLikes} from "./card.js";
// TODO: возможно, параметрами (вызываемых в других классах) методов дочерних классов (AvatarApi и т.д.) должны
//  быть объекты, соответствующие именам (name) соответствующих инпутов в index.html
/**
 * Абстрактный класс по работе с Api, от которого наследуются классы для соответствующих элементов страницы
 */
class Api {
  /**
   * Конструктор класса
   * @param headers - хедеры, передаваемые в запросах (токен авторизации и Content-Type)
   */
  constructor(headers) {
    this._headers = headers;
  }

  /**
   * Метод выполнения запроса по url-ресурсу
   * @param fetchResource - нужный урл на REST-сервере;
   * @param requestMethod - метод запроса (GET, POST и т.д.) в формате строки;
   * @param errorMes - сообщение, выводимое при ошибке, вернувшейся с сервера;
   * @param requestBody - тело запроса.
   * @returns возвращается или json, или Promise.reject
   */
  _makeFetch(fetchResource, requestMethod, errorMes, requestBody = undefined) {
    const fetchOptions = {
      method: requestMethod,
      headers: this._headers
    };

    // проверка на наличие body и включение в тело запроса
    if(requestBody !== undefined) {
      fetchOptions.body = JSON.stringify(requestBody);
    }

    return fetch(fetchResource, fetchOptions)
        .then(res => this._checkResponse(res, errorMes))
  }

  /**
   * Метод проверки ответа от сервера на наличие ошибки
   * @param res - ответ сервера;
   * @param errorMes - сообщение, выводимое при ошибке, вернувшейся с сервера.
   * @returns возвращается или json, или Promise.reject
   */
  _checkResponse(res, errorMes) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`${errorMes + res.status}`);
  }
}

/**
 * Класс по работе с Api аватарки пользователя
 */
export class AvatarApi extends Api {
  /**
   * Конструктор класса по работе с Api аватарки пользователя
   * @param baseUrl - базовый урл сервера, к которому будет конкатенироваться оставшаяся часть соответствующего адреса
   * REST-сервера;
   * @param headers - хедеры, передаваемые в запросе.
   */
  constructor({baseUrl, headers}) {
    super(headers);
    this._avatarUrl = baseUrl + '/users/me/avatar';
  }

  /**
   * Метод редактирования аватара
   * @param url - урл нового аватара.
   * @returns возвращается или json, или Promise.reject
   */
  editAvatar(url) {
    return this._makeFetch(this._avatarUrl,
        'PATCH', 'Ошибка editAvatar: ', {avatar: url});
  }
}

/**
 * Класс по работе с Api профиля пользователя
 */
export class ProfileApi extends Api {
  /**
   * Конструктор класса по работе с Api профиля пользователя
   * @param baseUrl - базовый урл сервера, к которому будет конкатенироваться оставшаяся часть соответствующего адреса
   * REST-сервера;
   * @param headers - хедеры, передаваемые в запросе.
   */
  constructor({baseUrl, headers}) {
    super(headers);
    this._profileUrl = baseUrl + '/users/me';
  }

  /**
   * Метод получения данных собственного профиля
   * @returns возвращается или json, или Promise.reject
   */
  getMe() {
    return this._makeFetch(this._profileUrl, 'GET',
        'Ошибка getMe: ');
  }

  /**
   * Метод редактирования собственного профиля
   * @param name - имя пользователя
   * @param about - описание пользователя
   * @returns возвращается или json, или Promise.reject
   */
  editProfile(name, about) {
    return this._makeFetch(this._profileUrl, 'PATCH',
        'Ошибка editProfile: ', {name: name, about: about});
  }
}

/**
 * Класс по работе с Api карточек
 */
export class CardsApi extends Api {
  /**
   * Конструктор класса по работе с Api карточек
   * @param baseUrl - базовый урл сервера, к которому будет конкатенироваться оставшаяся часть соответствующего адреса
   * REST-сервера;
   * @param headers - хедеры, передаваемые в запросе.
   */
  constructor({baseUrl, headers}) {
    super(headers);
    this._cardsBaseUrl = baseUrl + '/cards';
    this._cardsLikeUrl = baseUrl + '/cards/likes/';
  }

  /**
   * Метод получения текущих карточек с сервера
   * @returns возвращается или json, или Promise.reject
   */
  getInitialCards() {
    return this._makeFetch(this._cardsBaseUrl, 'GET',
        'Ошибка getInitialCards: ');
  }

  /**
   * Метод добавления новой карточки на сервер
   * @param name - имя новой карточки;
   * @param link - ссылка на картинку для новой карточки.
   * @returns возвращается или json, или Promise.reject
   */
  addCardOnServer(name, link) {
    return this._makeFetch(this._cardsBaseUrl, 'POST',
        'Ошибка addCardOnServer: ', {name: name, link: link});
  }

  /**
   * Метод удаления выбранной (определяется по event) карточки
   * @param card - карточка (html)
   * @returns возвращается или json, или Promise.reject
   */
  deleteCard(card) {
    console.log(card)
    // const card = event.target.closest('.card');
    return this._makeFetch(this._cardsBaseUrl +'/' + card.id, 'DELETE',
        'Ошибка deleteCard: ');
  }

  /**
   * Метод присвоения/удаления лайка карточке
   * @param card - html-элемент карточки
   * @returns возвращается или json, или Promise.reject
   */
  likeCard(card) {
    //const card = event.target.closest('.card');

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

    return this._makeFetch(this._cardsLikeUrl + card.id, requestMethod,
        errorMes);
  }
}

// export const api = new Api({
//   baseUrl: 'https://nomoreparties.co/v1/' + COHORT,
//   headers: {
//     authorization: TOKEN,
//     'Content-Type': 'application/json'
//   }
// });


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
