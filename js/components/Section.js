export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderSection = () => {
    this._items.forEach(function() {

    })
  }

  addItem = (item) => {
    const templateElem = document.querySelector()
  }
}

/* export default class Section {
  constructor({items, renderer}, containerSelector) {
    this.items = arguments[0]['items'];
    this._renderer = arguments[0]['renderer'];
    this.container = document.querySelector(containerSelector);
  }

  render = () => {
    for (let i in this.items) {
      this._renderer(this.items[i], this.container);
    }
  }

  addItem = (item) => {
    this.items.push(item);
    this.render();
  }
}; */