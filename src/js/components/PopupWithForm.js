import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._submitForm = this._elem.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
    this._buttonSubmit = document.querySelector('.form__submit');
    this._buttonSave = document.querySelector('.form__submit-save');
    this._buttonRetention = document.querySelector('.form__submit-retention');
    this.setEventListeners();
  }

  _getInputValues = () => {
    // get data inputs
    const fieldData = {};

    this._elem.querySelectorAll('input').forEach((input) => {
      fieldData[input.name] = input.value;
    });
    return fieldData;
  };

  isLoad = (isLoading) => {
    if (isLoading === true) {
      // this._buttonSubmit.textContent = 'Сохранение...';
      this._buttonSave.style.display = 'none';
      this._buttonRetention.style.display = 'block';
    } else {
      // this._buttonSubmit.textContent = 'Сохранить';
      this._buttonSave.style.display = 'block';
      this._buttonRetention.style.display = 'none';
    }
  };

  setEventListeners = () => {
    this._submitForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.isLoad(true);
    });
  };

  close = () => {
    super.close();
    this._submitForm.reset();
  };
}
