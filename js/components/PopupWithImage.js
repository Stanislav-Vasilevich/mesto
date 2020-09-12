import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor( popupSelector, { src, alt } ) {	  
    super( popupSelector );
	  this.img = this._elem.querySelector('img');
	  this.src = arguments[1].src;
	  this.alt = arguments[1].alt;
  }

  open = () => {
	  this.img.setAttribute('src', this.src);
	  this.img.setAttribute('alt', this.alt);
    this._elem.classList.add('popup_opened');
	  this._elem.querySelector('.popup__title-img').innerHTML = this.alt;
  }
}