// нашел в документе класс модального окна из grid-секции и записал в константу
const imageModal = document.querySelector('.popup_type_img');

// нашел в "модальном окне из grid-секции" класс заголовка картинки и записал в константу
// нашел в "модальном окне из grid-секции" класс картинки и записал в константу
const imgModalTitle = imageModal.querySelector('.popup__title-img');
const imgModalImg = imageModal.querySelector('.popup__img');

// нашел в документе класс списка, в который будет помещена разметка из js и записал в константу
// записал объект с новым содержимым для карточек в grid секцию в константу
const gridElements = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// класс для секции grid
export default class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  // возвращает разметку из html
  _getTemplate() {
    // нашел класс template_а в html разметке, далее нашел внутри его контента класс элемента и записал в константу
    const gridElementCard = document
      .querySelector('.grid__elements')
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

    // в этом приватном поле нахожу класс картинки, далее ее ссылку и вставляю в нее ссылки из конструктора, который принимает их из объекта
    // в этом приватном поле нахожу класс картинки, далее ее альтернативное название изображения и вставляю в нее заголовок из конструктора
    // в этом приватном поле нахожу класс заголовка, далее его текст и вставляю в него текст из конструктора, который принимает их из объекта
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__img').alt = this._name;
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

    // находит картинку в template по классу и записавает в переменную
    // прослушивает картинки и по клику вызывает функцию открытия popup
    const elementCardImg = this._element.querySelector('.element__img');
    elementCardImg.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    // находит крестик в открытом модальном окне Img
    // прослушивает крестик и по клику вызывает функцию закрытия popup с картинкой
    const buttonClosePopupImg = imageModal.querySelector('.popup__close-icon');
    buttonClosePopupImg.addEventListener('click', () => {
      this._handleClosePopup();
    });

    // 1) слушает документ на нажатие клавиш клавиатуры
    // 2) если нажали клавишу Esc, тогда вызывает функцию
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this._handleClosePopup();
      }
    });

    // 1) слушает документ на клик
    // 2) если кликнули по элементу с классом 'popup__overlay', тогда вызывает функцию
    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__overlay')) {
        this._handleClosePopup();
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

  // в "модальное окно из grid-секции" добавляет класс, который откроет popup
  // к src картинки в "модальном окне из grid-секции" подставляет путь из конструктора, которые берет этот путь из объекта
  // к alt картинки в "модальном окне из grid-секции" подставляет путь из конструктора, которые берет этот путь из объекта
   // к тексту заголовка в "модальном окне из grid-секции" подставляет текст из конструктора, который берет этот текст из объекта
  _handleOpenPopup() {
    imageModal.classList.add('popup_opened');
    imgModalImg.src = this._link;
    imgModalImg.alt = this._name;
    imgModalTitle.textContent = this._name;
  }

  // функция закрытия popup с картинкой(путем удаления класса)
  _handleClosePopup() {
    imageModal.classList.remove('popup_opened');
  }
}

initialCards.forEach(function ({ name, link }) {
  // Создадим экземпляр карточки
  const card = new Card(name, link);
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  gridElements.append(cardElement);
});







