// Преобразуйте класс Card
// Свяжите класс Card c попапом.
// Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.

// константы
import { imgModalTitle, imgModalImg } from '../utils/constants.js'
import { handleOpenPopup } from '../index.js'

export default class Card {
  constructor(name, link, cardSelector) { 
    this._name = name
    this._link = link
    this._cardSelector = cardSelector
  }  // передаем заголовки и ссылки из объекта для карточек и селектор нужной секции тега template

  _getTemplate() {
    const gridElementCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return gridElementCard
  }  // находит нужный template в html, клонирует его и возвращает обратно

  generateCard() {
    this._element = this._getTemplate()  // записываю разметку в приватное поле _element, чтобы у других элементов появится доступ к ней
    this._setEventListeners()  // прослушивает все необходимые элементы формы

    const classImg = this._element.querySelector('.element__img')  // в приватном поле находит класс картинки
    classImg.src = this._link  // в ее атрибут src вставляю ссылки из конструктора
    classImg.alt = this._name  // в ее атрибут alt вставляю текст из конструктора
    this._element.querySelector('.element__title').textContent = this._name // находит класс заголовка и вставляет в него текст из конструктора

    return this._element  // возвращает DOM-элемент клонируемую карточку с подставленными данными
  }

  _setEventListeners() {
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._deleteCard() 
    })  // слушает кнопки удаления в карточке и при клике вызывает функцию

    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._likeCard()
    })  // слушает кнопки лайка и при клике вызывает функцию

    this._element.querySelector('.element__img').addEventListener('click', () => {
      handleOpenPopup()
      this._fillCardBigImg()
    })  // в приватном поле находит класс картинки, слушет и по клику вызывает функцию открытия popup и подстановки данных
  }

  _deleteCard = () => {
    this._element.remove()
  }  // функция удаления карточки

  _likeCard = () => {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_focus')
  }  // функция лайка, дизлайка карточки

  _fillCardBigImg() {
    imgModalImg.src = this._link
    imgModalImg.alt = this._name
    imgModalTitle.textContent = this._name
  }  //подставляет данные в модальное окно увеличенной картинки

}  // класс создает карточки для секции grid и заполняет их данными