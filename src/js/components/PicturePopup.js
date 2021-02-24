import Popup from './Popup.js';

export default class PicturePopup extends Popup {
  constructor(popupSelector, api) {
    super(popupSelector);
    this._api = api;
  }

  open(idCard, card) {
    super.open();
    this.setEventListeners(idCard, card);
  }

  setEventListeners = (id, card) => {
    const buttonDeleteCard = this._elem.querySelector('.submit-delete-card');
    buttonDeleteCard.addEventListener('click', () => {
      this._deleteCard(id);
      card.remove(); 
      console.log('нажал удалить');
    });
  };

  _deleteCard = (id) => {
    this.close();

    this._api
      .deleteCard(id)
      .then(() => {
      })
      .catch((err) => {
        console.log(`Ошибка - ${err}`);
      });
  };
}
