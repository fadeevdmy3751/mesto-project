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
    this._inputs = this._form.querySelectorAll('.form__field');
    this._formSubmitButton = this._form.querySelector('.form__button');
    this._handleSubmit = handleSubmit;
    this._functionEventListener = this._functionEventListener.bind(this);
  }

  /**
   * Расширение родительского метода: не только добавляет обработчик клика иконке закрытия, но и за счёт расширения
   * добавляет обработчик сабмита формы (метод класса Api)
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._functionEventListener)
    }

  /**
   * Расширение родительского метода: метод не только закрывает попап, но и сбрасывает форму
   */
  close() {
    super.close();
    this._form.reset();
    this._form.removeEventListener('submit', this._functionEventListener)
  }

  renderLoading(isLoading, buttonText='Сохранить') {
    if(isLoading)
      this._formSubmitButton.textContent = 'Сохранение...';
    else
      this._formSubmitButton.textContent = buttonText;
  }

  _functionEventListener(evt) {
    evt.preventDefault();
    this._handleSubmit(this._getInputValues());
  }

  /**
   * Метод, собирающий данные всех полей формы
   * @returns объект данных со всех полей формы
   */
  _getInputValues() {
    this._data = {};
    this._inputs.forEach(input => {
      this._data[input.name] = input.value;
    })
    return this._data;
  }
}
