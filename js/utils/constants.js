export {
  popupImage,
  dataCards,
  dataForms,
  blockForTemplateCards,
  titleEdit,
  subtitleEdit,
  popupEdit,
  popupAdd,
  formEdit,
  formAdd,
  inputTitleFormEdit,
  inputSubtitleFormEdit,
  inputNamePlaceFormAdd,
  inputUrlFormAdd,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  elemOpenPopupImg,
  buttonClosePopupEdit,
  buttonClosePopupAdd,
  buttonClosePopupImg,
  titleInPopupImg,
  imageInPopupImg
};

// object with data for Cards
const dataCards = [
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

// config for Card.js
const dataForms = {
  form: '.form',
  input: '.form__input',
  submit: '.form__submit',
  inactiveButton: 'form__submit_active',
  errorMsg: 'form__input-error_active',
  invalidInput: 'form__input_type_error'
};

// for index.js
const blockForTemplateCards = document.querySelector('.elements');
const titleEdit = document.querySelector('.profile__title');
const subtitleEdit = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-cards');
const popupImage = document.querySelector('.popup_type_img');
const formEdit = popupEdit.querySelector('.form');
const formAdd = popupAdd.querySelector('.form');
const inputTitleFormEdit = formEdit.querySelector('.form__input_name');
const inputSubtitleFormEdit = formEdit.querySelector('.form__input_job');
const inputNamePlaceFormAdd = formAdd.querySelector('.form__input_place');
const inputUrlFormAdd = formAdd.querySelector('.form__input_url');
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add');
const elemOpenPopupImg = document.querySelector('.element__img');
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close-icon');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close-icon');
const buttonClosePopupImg = popupImage.querySelector('.popup__close-icon');

// for Card.js
const titleInPopupImg = popupImage.querySelector('.popup__title-img');
const imageInPopupImg = popupImage.querySelector('.popup__img');
