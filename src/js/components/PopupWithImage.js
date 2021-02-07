import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor( { src, alt }, popupSelector ) {
    super( popupSelector );
    this._src = src;
    this._alt = alt;
  }

  open = () => {
    this._elem.classList.add('popup_opened');
    this._img = this._elem.querySelector('.popup__img');
    this._title = this._elem.querySelector('.popup__title-img');
    this._img.src = this._src;
    this._img.alt = this._alt;
    this._title.textContent = this._alt;
  }
}