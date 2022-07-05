import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (selector, {handleSubmit}) {
    super(selector);
    this._form = this.selector.querySelector('.form');
    this._inputs = this._form.querySelectorAll('.form__input');
    this._handleSubmit = handleSubmit;

  }

  _getInputValues() {
    this._data = {};
    this._inputs.forEach(input => {
    this._data[input.name] = input.value;
    console.log(_data)
    })
    return this._data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
