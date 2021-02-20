export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    templateCard
  ) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._templateCard = templateCard;
  }

  _getTemplate() {
    const elemTemplateCard = document
      .querySelector(this._templateCard)
      .content.querySelector('.element')
      .cloneNode(true);

    return elemTemplateCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const tegImage = this._element.querySelector('.element__img');
    tegImage.src = this._data.link;
    tegImage.alt = this._data.name;
    this._element.querySelector(
      '.element__title'
    ).textContent = this._data.name;

    // return card with data
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__button-delete')
      .addEventListener('click', () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector('.element__button-like')
      .addEventListener('click', () => {
        this._likeCard();
      });

    this._element
      .querySelector('.element__img')
      .addEventListener('click', this._handleCardClick);
  }

  // delete template element
  _handleDeleteCard = () => {
    this._handleDeleteIconClick(this._element);
    // console.log(this._data.id); // 871248871623478681234 - id
  };

  deleteCard() {
    this._element.remove();
  }

  // like card
  _likeCard = () => {
    this._handleLikeClick(this._element);
    this.getDataLikes();
  };

  getDataLikes() {
    // здесь логика добавления лайка 
    // console.log(this._data.likes.length);
  }
}