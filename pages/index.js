// constants
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

// Class js
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import Card from '../js/components/Card.js';
import Popup from '../js/components/Popup.js';

/////////////////////////////////////////////////////////////////
// Class Section
/////////////////////////////////////////////////////////////////
const cardList = new Section({
  items:dataCards, 
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.grid__elements');
    const cardElement = card.generateCard();
    
    cardList.addItem(cardElement);
  }
}, '.elements');
cardList.renderItems();
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// Class Popup
/////////////////////////////////////////////////////////////////
const openAndClosePopupEdit = new Popup('.popup_type_edit-profile');
const openAndClosePopupAdd = new Popup('.popup_type_add-cards');
const openAndClosePopupImage = new Popup('.popup_type_img');

// open and close popup Edit
buttonOpenPopupEdit.addEventListener('click', () => {
  inputTitleFormEdit.value = titleEdit.textContent;
  inputSubtitleFormEdit.value = subtitleEdit.textContent;
  openAndClosePopupEdit.open();
});

// open and close popup Add
buttonOpenPopupAdd.addEventListener('click', () => {
  openAndClosePopupAdd.open();
});
/////////////////////////////////////////////////////////////////
// open popup Image
function openPopupImage() {
  popupImage.classList.add('popup_opened');
}

// // open popup Image
// export function openPopupImage() {
//   popupImage.classList.add('popup_opened');
// }

// close popup Image
function closePopupImage() {
  popupImage.classList.remove('popup_opened');
}

// listen button close popup Image by click
buttonClosePopupImg.addEventListener('click', () => {
  closePopupImage();
});

// listen form in popup Edit by event 'submit'
// listen form in popup Add by event 'submit'
formEdit.addEventListener('submit', handlerSubmitFormEdit);
formAdd.addEventListener('submit', handlerSubmitAddCard);

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

// handler submit form Edit
function handlerSubmitAddCard(evt) {
  evt.preventDefault();
  // renderCard(inputNamePlaceFormAdd.value, inputUrlFormAdd.value);
  formAdd.reset();
  closePopup(popupAdd);
}

// // listen button close in popup Edit
// buttonClosePopupEdit.addEventListener('click', () => {
//   //closePopup(popupEdit);
//   console.log('привет');
//   //openAndClosePopupEdit.open();
// });

// // listen button close in popup Add
// buttonClosePopupAdd.addEventListener('click', () => {
//   // closePopup(popupAdd);
// });

// // open popup and listen event keydown and click by overlay
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEscape);
//   popup.addEventListener('click', closePopupsByOverlay);
// }

// // close all popups
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEscape);
//   popup.removeEventListener('click', closePopupsByOverlay);
// }

// // close popup by overlay
// function closePopupsByOverlay(evt) {
//   const popup = document.querySelector('.popup_opened');
//   if (evt.target.classList.contains('popup__overlay')) {
//     closePopup(popup);
//   }
// }

// // close popup by escape
// function closePopupByEscape(evt) {
//   const popup = document.querySelector('.popup_opened');
//   if (evt.key === 'Escape') {
//     closePopup(popup);
//   }
// }