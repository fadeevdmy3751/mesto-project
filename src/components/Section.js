/**
 * Класс генерации секции карточек
 */
export default class Section {
  /**
   * Конструктор класса генерации секции карточек
   * @param items - массив данных, которые нужно добавить на страницу при инициализации класса;
   * @param renderer - функция, которая отвечает за создание и отрисовку данных на странице;
   * @param selector - селектор контейнера, в который нужно добавлять созданные элементы.
   */
  constructor({ items, renderer }, selector) {
      this._data = items;
      this._renderer = renderer;
      this._container = document.querySelector(selector);
  }

  /**
   * Метод, который принимает DOM-элемент и добавляет его в контейнер
   * @param element - DOM-элемент
   * @param beginning - флаг, в начало или конец секции добавлять новую карточку
   */
  addItem(element, beginning=false) {
    if(beginning)
      this._container.prepend(element);
    else
      this._container.append(element);
  }

  /**
   * Метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента осуществляется
   * методом this._renderer
   */
  renderItems() {
      this._data.forEach((item) => {
          this._renderer(item);
      });
  }
}
