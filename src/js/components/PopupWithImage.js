import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor( popupSelector ) {
    super( popupSelector );
  }

  open = (link, name) => {
    super.open();
    this._img.src = link;
    this._img.alt = name;
    this._title.textContent = name;
  }
}