import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( popupSelector, handleFormSubmit ) {
    super(popupSelector);
    this._submitForm = this._elem.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
  }

  close = () => {
    this._submitForm.reset();
    super.close();
  }

  _getInputValues = () => { // get data inputs
    const fieldData = {};

    this._elem.querySelectorAll("input").forEach(input => {
      fieldData[input.name] = input.value; 
    });
    return fieldData;
  }

  setEventListeners = () => {
    this._submitForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
};