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
  }

  /**
   * Метод, возвращающий объект с данными пользователя
   */
  getUserInfo() {
    const imgUrl = document.querySelector(this._userAvatarSelector).style.backgroundImage.slice(4, -1).replace(/"/g, "");
    return {
      userName: document.querySelector(this._userNameSelector).textContent,
      userAbout: document.querySelector(this._userAboutSelector).textContent,
      userAvatar: imgUrl
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
      document.querySelector(this._userNameSelector).textContent = name;
    }
    if(about) {
      document.querySelector(this._userAboutSelector).textContent = about;
    }
    if(avatar) {
      document.querySelector(this._userAvatarSelector).style.backgroundImage = `url('${avatar}')`;
    }
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
  }
}
