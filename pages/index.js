import {
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
  buttonClosePopupEdit,
  buttonClosePopupAdd,
  buttonClosePopupImg,
  titleInPopupImg,
  imageInPopupImg
} from '../js/utils/constants.js';

import {renderCard} from '../js/utils/utils.js';

// Class js
import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
//import Section from '../js/components/Section.js';
//import Popup from '../js/components/Popup.js';
//import PopupWithForm from '../js/components/PopupWithForm.js';
//import PopupWithImage from '../js/components/PopupWithImage.js';

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

///////////////////////////////////////////////////////////////////
// create new array with data cards
/* dataCards.forEach(({name, link}) => {
  renderCard(name, link);
});

// create new Card and add in block for template Cards
function renderCard(name, link) {
  const card = new Card(name, link, '.grid__elements');
  const cardElement = card.generateCard();

  blockForTemplateCards.prepend(cardElement);
} */

// renderCard(name, link);
///////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////

/* отрисовка изначально присутствующих карточек
const cardsSection = new Section({'items': dataCards, 'renderer': renderCard}, '.elements');
cardsSection.render();

// функция добавления новой карточки в grid(сбрасывает дефолтное поведенин кнопки)
const handlerSubmitAddCard = (field_data) => {
  cardsSection.addItem({'name': field_data['form-title'], 'link': field_data['form-subtitle']})
}

// обработчик отправки формы edit
const handlerSubmitForm = (field_data) => {
  titleEdit.textContent = field_data['form-title'];
  subtitleEdit.textContent = field_data['form-subtitle'];
}

// слушает модальное окно Edit и при клике вызывает функцию
const editUserPopup = new PopupWithForm('.popup_type_edit-profile', handlerSubmitForm);
buttonOpenPopupEdit.addEventListener('click', () => {
  editUserPopup.open();
});

// слушает кнопку редактирования данных в profile и при клике вызывает функцию с определенной модалкой
const addCardPopup = new PopupWithForm('.popup_type_add-cards', handlerSubmitAddCard);
buttonOpenPopupAdd.addEventListener('click', () => {
  addCardPopup.open();
});

// находит все наши формы и вызывает новый экземпляр с методом валидации
document.querySelectorAll(dataForms.form).forEach(form => {
  new FormValidator(dataForms, form).enableValidation();
});


// открывает модальное окно с большой картинкой и заголовком
function handleCardClick(evt) {
  const img = evt.target;
  const cardPopup = new PopupWithImage('.popup_type_img', {'src': img.src, 'alt': img.alt});
  cardPopup.open();
}

// рендерит карточки в нужный нам контейнер
function renderCard({name, link}, container) {
  const card = new Card(arguments[0].name, arguments[0].link, '.grid__elements', handleCardClick);
  const cardElement = card.generateCard();

  container.prepend(cardElement);
} */

