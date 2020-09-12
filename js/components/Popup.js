export default class Popup {
  constructor( popupSelector ) {
    this._elem = document.querySelector(popupSelector);
	  this.setEventListeners();
  }
  
  open = () => {
    this._elem.classList.add('popup_opened')
  }

  close = () => {
    this._elem.classList.remove('popup_opened')
  }
  
  _handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    this.close() 
  }
}

  setEventListeners = () => {
    this._elem.querySelector('.popup__close-icon').addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
	  this._elem.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__overlay')) {
        this.close();
        }
	  }) 
  }

}
