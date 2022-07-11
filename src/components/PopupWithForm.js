import Popup from './popup.js';

/**
 * Класс попапа формы
 */
export default class PopupWithForm extends Popup {
  /**
   * Конструктор класса
   * @param selector - селектор попапа
   * @param handleSubmit - колбэк сабмита формы (в этом колбэке содержится метод класса Api!)
   */
  // TODO: что за {} вокруг второго параметра ???
  constructor (selector, handleSubmit) {
    super(selector);
    this._form = this.selector.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__input');
    this._handleSubmit = handleSubmit;
  }

  /**
   * Расширение родительского метода: не только добавляет обработчик клика иконке закрытия, но и за счёт расширения
   * добавляет обработчик сабмита формы (метод класса Api)
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
  }

  /**
   * Расширение родительского метода: метод не только закрывает попап, но и сбрасывает форму
   */
  close() {
    super.close();
    this._form.reset();
  }

  /**
   * Метод, собирающий данные всех полей формы
   * @returns объект данных со всех полей формы
   */
  _getInputValues() {
    this._data = {};
    this._inputs.forEach(input => {
      this._data[input.name] = input.value;
      console.log(this._data);
    })
    return this._data;
  }
}
