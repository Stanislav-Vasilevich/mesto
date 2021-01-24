import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const popupImage = document.querySelector('.popup_type_img');
const blockForTemplateCards = document.querySelector('.elements');
const titleEdit = document.querySelector('.profile__title');
const subtitleEdit = document.querySelector('.profile__subtitle');
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
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close-icon');
const buttonClosePopupAdd = popupAdd.querySelector('.popup__close-icon');
const buttonClosePopupImg = popupImage.querySelector('.popup__close-icon');

// listen button open popup Edit
buttonOpenPopupEdit.addEventListener('click', () => {
  inputTitleFormEdit.value = titleEdit.textContent;
  inputSubtitleFormEdit.value = subtitleEdit.textContent;
  openPopup(popupEdit);
});

// listen button open popup Add
buttonOpenPopupAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// listen form in popup Edit by event 'submit'
// listen form in popup Add by event 'submit'
formEdit.addEventListener('submit', handlerSubmitFormEdit);
formAdd.addEventListener('submit', handlerSubmitAddCard);

// listen button close in popup Edit
buttonClosePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

// listen button close in popup Add
buttonClosePopupAdd.addEventListener('click', () => {
  closePopup(popupAdd);
});

// listen document by event 'keydown' for close popupImage
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopupImage();
  }
});

// listen overlay and by click close popupImage
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__overlay')) {
    closePopupImage();
  }
});

// listen all forms in document by config and call Class validation
document.querySelectorAll(dataForms.form).forEach(form => {
  new FormValidator(dataForms, form).enableValidation(); // тут нужно разобраться
})

// handler submit form Edit
function handlerSubmitFormEdit(evt) {
  evt.preventDefault();
  titleEdit.textContent = inputTitleFormEdit.value;
  subtitleEdit.textContent = inputSubtitleFormEdit.value;
  closePopup(popupEdit);
}

// create new array with data cards
dataCards.forEach(({name, link}) => {
  renderCard(name, link);
});

// create new Card and add in block for template Cards
function renderCard(name, link) {
  const card = new Card(name, link, '.grid__elements');
  const cardElement = card.generateCard(); // разобраться

  blockForTemplateCards.prepend(cardElement);
}

// handler submit form Edit
function handlerSubmitAddCard(evt) {
  evt.preventDefault();
  renderCard(inputNamePlaceFormAdd.value, inputUrlFormAdd.value);
  formAdd.reset();
  closePopup(popupAdd);
}

// open popup and listen event keydown and click by overlay
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  popup.addEventListener('click', closePopupsByOverlay);
}

// close all popups
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  popup.removeEventListener('click', closePopupsByOverlay);
}

// close popup by overlay
function closePopupsByOverlay(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup__overlay')) {
    closePopup(popup);
  }
}

// close popup by escape
function closePopupByEscape(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

// open popup Image
export function openPopupImage() {
  popupImage.classList.add('popup_opened');
}

// close popup Image
function closePopupImage() {
  popupImage.classList.remove('popup_opened');
}

// listen button close popup Image by click
buttonClosePopupImg.addEventListener('click', () => {
  closePopupImage();
});

