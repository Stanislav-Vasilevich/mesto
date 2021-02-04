import Card from "./Card.js";

export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderSection = () => {
    this._items.forEach(function() {
      const card = new Card({name, link}, '.grid__elements');
      const cardElement = card.generateCard(); // разобраться

      this.addItem(cardElement);
    })
  }

  addItem = (data) => {
    this._container.append(data);
  }
}
