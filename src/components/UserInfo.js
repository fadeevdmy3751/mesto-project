/**
 * Класс управления информацией о пользователе на странице
 */
export default class UserInfo {
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
    this._nameSelector = document.querySelector(this._userNameSelector);
    this._aboutSelector = document.querySelector(this._userAboutSelector);
    this._avatarSelector = document.querySelector(this._userAvatarSelector);
  }

  /**
   * Метод, возвращающий объект с данными пользователя
   */
  getUserInfo() {
    return {
      userName: this._nameSelector.textContent,
      userAbout: this._aboutSelector.textContent,
    };
  }

  /**
   * Метод отображения информации о пользователе на странице
   * @param name - имя пользователя из объекта;
   * @param about - информация о пользователе из объекта;
   * @param avatar - аватар пользователя из объекта.
   */
  refreshUserInfo({name=null, about = null, avatar = null}) {
    if(name) {
      this._nameSelector.textContent = name;
    }
    if(about) {
      this._aboutSelector.textContent = about;
    }
    if(avatar) {
      this._avatarSelector.style.backgroundImage = `url('${avatar}')`;
    }
  }

  /**
   * Метод, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
   * @param name - новое имя пользователя;
   * @param about - новое описание пользователя;
   */
  setUserInfo(name, about) {
    this.refreshUserInfo({name: name, about: about});
  }
}
