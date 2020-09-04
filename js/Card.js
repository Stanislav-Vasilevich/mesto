// нашел в документе класс модального окна из grid-секции и записал в константу
const imageModal = document.querySelector('.popup_type_img');

// нашел в "модальном окне из grid-секции" класс заголовка картинки и записал в константу
// нашел в "модальном окне из grid-секции" класс картинки и записал в константу
const imgModalTitle = imageModal.querySelector('.popup__title-img');
const imgModalImg = imageModal.querySelector('.popup__img');

// в "модальное окно из grid-секции" добавляет класс, который откроет popup
function handleOpenPopup() {
  imageModal.classList.add('popup_opened');
}

// функция закрытия popup с картинкой(путем удаления класса)
function handleClosePopup() {
  imageModal.classList.remove('popup_opened');
}

// класс для секции grid
export default class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  // возвращает разметку из html
  _getTemplate() {
    // нашел класс template_а в html разметке, далее нашел внутри его контента класс элемента и записал в константу
    const gridElementCard = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    // возвращает обратно в DOM-элемент клонируемые карточки(с подставленными данными в будущем)
    return gridElementCard;
  }

  generateCard() {
    // записываю разметку в приватное поле _element, чтобы у других элементов появится доступ к ней
    // прослушивает все необходимые элементы
    this._element = this._getTemplate();
    this._setEventListeners();

    // 1) в этом приватном поле нахожу класс картинки и записываю в константу
    // 2) в ее атрибут src вставляю ссылки из конструктора, который принимает их из объекта
    // 3) в ее атрибут alt вставляю текст из конструктора, который принимает его из объекта
    // 4) в этом приватном поле нахожу класс заголовка, далее его текст и вставляю в него текст из конструктора, который принимает их из объекта
    const classImg = this._element.querySelector('.element__img');
    classImg.src = this._link;
    classImg.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    // возвращает DOM-элемент(клонируемую карточку с подставленными данными) наружу
    return this._element;
  }

  //функция прослушивает все элементы внутри класса
  _setEventListeners() {
    // слушает все кнопки удаления в карточке и при клике подставляет функцию удаления
    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._deleteCard();
    });

    // слушает кнопки лайка и при клике подставляет функцию
    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._likeCard();
    });

    // в приватном элементе находит картинку в template по классу, далее слушает и 
    // по клику вызывает функцию открытия popup
    this._element.querySelector('.element__img').addEventListener('click', () => {
      // this._handleOpenPopup();
      handleOpenPopup();
      this._fillCardBigImg();
    });

    // 1) находит крестик в открытом модальном окне Img
    // 2) прослушивает крестик и по клику вызывает функцию закрытия popup с картинкой
    const buttonClosePopupImg = imageModal.querySelector('.popup__close-icon');
    buttonClosePopupImg.addEventListener('click', () => {
      // this._handleClosePopup();
      handleClosePopup();
    });

    // 1) слушает документ на нажатие клавиш клавиатуры
    // 2) если нажали клавишу Esc, тогда вызывает функцию
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        // this._handleClosePopup();
        handleClosePopup();
      }
    });

    // 1) слушает документ на клик
    // 2) если кликнули по элементу с классом 'popup__overlay', тогда вызывает функцию
    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__overlay')) {
        // this._handleClosePopup();
        handleClosePopup();
      }
    });
  }

  // функция удаления карточки
  _deleteCard = () => {
    this._element.remove();
  }

  // функция лайка, дизлайка карточки
  _likeCard = () => {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_focus');
  }

  //подставляет данные в модальное окно при нажатии на картинку
  _fillCardBigImg() {
    imgModalImg.src = this._link;
    imgModalImg.alt = this._name;
    imgModalTitle.textContent = this._name;
  }
}







