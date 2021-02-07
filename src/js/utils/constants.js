export {
  dataCards,
  dataForms,
  inputTitleFormEdit,
  inputSubtitleFormEdit,
  inputNamePlaceFormAdd,
  inputUrlFormAdd,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd
};

const arhuz = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabinsk = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatka = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const holmogorskii = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL ('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

// object with data for Cards
const dataCards = [
  {
    name: 'Архыз',
    link: arhuz
  },
  {
    name: 'Челябинская область',
    link: chelyabinsk
  },
  {
    name: 'Иваново',
    link: ivanovo
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Холмогорский район',
    link: holmogorskii
  },
  {
    name: 'Байкал',
    link: baikal
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
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-cards');
const formEdit = popupEdit.querySelector('.form');
const formAdd = popupAdd.querySelector('.form');
const inputTitleFormEdit = formEdit.querySelector('.form__input_name');
const inputSubtitleFormEdit = formEdit.querySelector('.form__input_job');
const inputNamePlaceFormAdd = formAdd.querySelector('.form__input_place');
const inputUrlFormAdd = formAdd.querySelector('.form__input_url');
const buttonOpenPopupEdit = document.querySelector('.profile__edit-button');
const buttonOpenPopupAdd = document.querySelector('.profile__add');