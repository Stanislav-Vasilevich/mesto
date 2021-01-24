import {openPopupImage} from './index.js';

const popupImage = document.querySelector('.popup_type_img');
const titleInPopupImg = popupImage.querySelector('.popup__title-img');
const imageInPopupImg = popupImage.querySelector('.popup__img');

// Class for grid-section
export default class Card {
  constructor(name, link, templateCard) {
    this._name = name;
    this._link = link;
    this._templateCard = templateCard;
  }

  _getTemplate() {
    const elemTemplateCard = document
      .querySelector(this._templateCard)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return elemTemplateCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const tegImage = this._element.querySelector('.element__img');
    tegImage.src = this._link;
    tegImage.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    // return card with data
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.element__img').addEventListener('click', () => {
      openPopupImage();
      this._replaceDataInPopupImg();
    });
  }

  // delete template element
  _deleteCard = () => {
    this._element.remove();
  }

  // like card
  _likeCard = () => {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_focus');
  }

  //подставляет данные в модальное окно при нажатии на картинку
  _replaceDataInPopupImg() {
    imageInPopupImg.src = this._link;
    imageInPopupImg.alt = this._name;
    titleInPopupImg.textContent = this._name;
  }
}







