export default class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    templateCard,
    api
  ) {
    this._data = data;
    this._id = this._data.id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._templateCard = templateCard;
    this._api = api;
    // console.log(this._data.likes.length);
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

  // showSumLikes() {
  //   const numberLike = this._element.querySelector('.element__number-like');
  //   numberLike.textContent = item.likes.length;
  // }

  // delete template element
  _handleDeleteCard = () => {
    this._handleDeleteIconClick(this._element);
  };

  deleteCard() {
    this._element.remove();
  }

  // like card
  _likeCard = () => {
    this._handleLikeClick(this._element);
    this._dataLikes();
  };

  _dataLikes() {
    const likeCard = this._element.querySelector('.element__button-like');
    const numberLike = this._element.querySelector('.element__number-like');
    console.log(numberLike);

    if (!likeCard.classList.contains('element__button-like_focus')) {
      likeCard.classList.add('element__button-like_focus');
      this._api
        .putLikeCard(this._id)
        .then((data) => {
          numberLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка отправки данных при постановке лайка: ${err}`);
        });
    } else {
      likeCard.classList.remove('element__button-like_focus');
      this._api
        .deleteLikeCard(this._id)
        .then((data) => {
          numberLike.textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(`Ошибка отправки данных при снятии лайка: ${err}`);
        });
    }
  }
}
