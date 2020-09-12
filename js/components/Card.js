// константы
import { imgModalTitle, imgModalImg } from '../utils/constants.js'
import PopupWithImage from './PopupWithImage.js'

// класс создает карточки для секции grid и заполняет их данными
export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {  // передаем заголовки и ссылки из объекта для карточек и селектор нужной секции тега template
    this._name = name
    this._link = link
    this._cardSelector = cardSelector
	  this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const gridElementCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return gridElementCard
  }

  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners() 

    const classImg = this._element.querySelector('.element__img')
    classImg.src = this._link 
    classImg.alt = this._name
    this._element.querySelector('.element__title').textContent = this._name

    this.card = this._element 
	  return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._deleteCard() 
    })

    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._likeCard()
    })

	  this._element.querySelector('img').addEventListener('click', this.handleCardClick);
  }

  _deleteCard = () => {
    this._element.remove()
  }

  _likeCard = () => {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_focus')
  }

  _fillCardBigImg() {
    imgModalImg.src = this._link
    imgModalImg.alt = this._name
    imgModalTitle.textContent = this._name
  }

}  