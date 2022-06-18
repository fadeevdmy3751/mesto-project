import {TOKEN, COHORT} from './secret.js';
import {refreshLikes} from "./card.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/' + COHORT,
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json'
    }
}

const URLs = {
  cards: '/cards',
  me: '/users/me',
  like: '/cards/likes/',
  avatar: '/users/me/avatar'
}

export function getInitialCards(){
  return fetch(config.baseUrl + URLs.cards, {headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка getInitialCards: ${res.status}`);
    });
}

export function getMe(){
  return fetch(config.baseUrl + URLs.me,{headers: config.headers})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка getMe: ${res.status}`);
    });
}

export function editAvatar(url){
  return fetch(config.baseUrl + URLs.avatar, {
    method: 'PATCH',
    headers:  config.headers,
    body: JSON.stringify({
      avatar: url,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка editAvatar: ${res.status}`);
    });
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
  .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка editProfile: ${res.status}`);
      });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка addCardOnServer: ${res.status}`);
    });
}

export function deleteCard(event){
  const card = event.target.closest('.card');
  fetch(config.baseUrl + URLs.cards +'/' + card._id, {
    method: 'DELETE',
    headers:  config.headers,
  })
    .then(res => {
      if (res.ok) {
        console.log('delete card success');
        card.remove();
      } else console.log(`Ошибка deleteCard: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(event){
  const card = event.target.closest('.card');
  if (card.myLike){ //удалить
    fetch(config.baseUrl + URLs.like + card._id, {
      method: 'DELETE',
      headers:  config.headers,
    })
      .then(res => {
        if (res.ok) {
          console.log('delete like success');
          return res.json()
        } else console.log(`Ошибка delete like: ${res.status}`);
      })
      .then(json => refreshLikes(card, json))
      .catch((err) => {
        console.log(err);
      });
  } else { // поставить
    fetch(config.baseUrl + URLs.like + card._id, {
      method: 'PUT',
      headers:  config.headers,
    })
      .then(res => {
        if (res.ok) {
          console.log('put like success');
          return res.json()
        } else console.log(`Ошибка put like: ${res.status}`);
      })
      .then(json => refreshLikes(card, json))
      .catch((err) => {
        console.log(err);
      });
  }
}
