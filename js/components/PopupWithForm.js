import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor( popupSelector, submitCallback ) {
	super(popupSelector);
	this.submitForm = this._elem.querySelector('.form');
	this.submitCallback = submitCallback;
	this.setEventListeners();
  }
  _getInputValues = () => {
	const field_data = {};
	this._elem.querySelectorAll("input").forEach(input => {
		field_data[input.name] = input.value;
	});
	return field_data;
  }

  setEventListeners = () => {
	  this._elem.querySelector('.popup__close-icon').addEventListener('click', this.close);
		document.addEventListener('keydown', this._handleEscClose);
		this._elem.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup__overlay')) {
			this.close();
		  }
		}) 
	  this.submitForm.addEventListener('submit', (evt) => {
			evt.preventDefault() 
			this.submitCallback(this._getInputValues());
			this.close();
		});
  }

  close = () => {
    this._elem.classList.remove('popup_opened');
	this.submitForm.reset();
  }
};