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
        this._deleteCard();
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
  _deleteCard = () => {
    this._handleDeleteIconClick(this._element);
  };

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

// export default class Card {
//   constructor(name, link, likes, templateCard, handleCardClick) {
//     this._handleCardClick = handleCardClick;
//     this._name = name;
//     this._link = link;
//     this._likes = likes;
//     this._templateCard = templateCard;
//   }

//   _getTemplate() {
//     const elemTemplateCard = document
//       .querySelector(this._templateCard)
//       .content
//       .querySelector('.element')
//       .cloneNode(true);

//     return elemTemplateCard;
//   }

//   generateCard() {
//     this._element = this._getTemplate();
//     this._setEventListeners();

//     const tegImage = this._element.querySelector('.element__img');
//     tegImage.src = this._link;
//     tegImage.alt = this._name;
//     this._element.querySelector('.element__title').textContent = this._name;

//     // return card with data
//     return this._element;
//   }

//   _setEventListeners() {
//     this._element.querySelector('.element__button-delete')
//     .addEventListener('click', () => {
//       this._deleteCard();
//     });

//     this._element.querySelector('.element__button-like')
//     .addEventListener('click', () => {
//       this._likeCard();
//     });

//     this._element.querySelector('.element__img')
//     .addEventListener('click', this._handleCardClick);
//   }

//   // delete template element
//   _deleteCard = () => {
//     this._element.remove();
//   }

//   // like card
//   _likeCard = () => {
//     this._element.querySelector('.element__button-like').classList.toggle('element__button-like_focus');
//   }
// }
