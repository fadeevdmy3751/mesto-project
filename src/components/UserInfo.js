/**
 * Класс управления информацией о пользователе на странице
 */
export default class UserInfo {
  // constructor({ nameUser, jobUser, urlAvatarUser }) {
  //   this._nameUser = nameUser;
  //   this._jobUser = jobUser;
  //   this._urlAvatarUser = urlAvatarUser;
  //
  // }
  /**
   * Конструктор класса
   * @param userNameSelector - селектор имени пользователя;
   * @param userAboutSelector - селектор элемента информации о себе;
   * @param userAvatarSelector - селектор аватарки пользователя.
   */
  constructor({userNameSelector, userAboutSelector, userAvatarSelector}) {
    this._userNameSelector = userNameSelector;
    this._userAboutSelector = userAboutSelector;
    this._userAvatarSelector = userAvatarSelector;
  }

  /**
   * Метод, возвращающий объект с данными пользователя
   * @param apiMethod - метод класса Api для получения информации о пользователе (включая аватарку)
   */
  getUserInfo(apiMethod) {
    return apiMethod;
  }

  /**
   * Метод отображения информации о пользователе на странице
   * @param name - имя пользователя из объекта;
   * @param about - информация о пользователе из объекта;
   * @param avatar - аватар пользователя из объекта.
   */
  refreshUserInfo({name=null, about = null, avatar = null}) {
    if(name)
      document.querySelector(this._userNameSelector).textContent = name;
    if(about)
      document.querySelector(this._userAboutSelector).textContent = about;
    if(avatar)
      document.querySelector(this._userAvatarSelector).style.backgroundImage = `url('${avatar}')`;
  }

  /**
   * Метод, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
   * @param name - новое имя пользователя;
   * @param about - новое описание пользователя;
   * @param apiMethod - ссылка на метод класса Api, отправляющий новые данные на сервер.
   */
  setUserInfo({name, about}, apiMethod) {
    apiMethod(name, about)
      .then((json) => {
        console.log('New profile data: ', json);
        this.refreshUserInfo(json);
      })
      .catch((err) => {
        console.log(err);
      });
    // this._nameUser.textContent = data.name;
    // this._jobUser.textContent = data.about;
    // this._urlAvatarUser.src = data.avatar;
  }
}

// getUserInfo() {
//   const userInfo = {
//     name: this._nameUser.textContent,
//     about: this._jobUser.textContent,
//     avatar: this._urlAvatarUser.src
//   }
//
//   return userInfo;
// }
