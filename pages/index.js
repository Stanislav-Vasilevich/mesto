// constants
import {
  dataCards,
  dataForms,
  inputTitleFormEdit,
  inputSubtitleFormEdit,
  inputNamePlaceFormAdd,
  inputUrlFormAdd,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd
} from '../js/utils/constants.js';

// Class js
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import Card from '../js/components/Card.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWidthForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';


const cardList = new Section(
  {
    items: dataCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        '.grid__elements',
        handleCardClick
      );
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  '.elements'
);
cardList.renderItems();

// open popup image and push data
function handleCardClick(evt) {
  const img = evt.target;
  const popupImage = new PopupWithImage(
    { src: img.src, alt: img.alt },
    '.popup_type_img'
  );
  popupImage.open();
}

// Class PopupWidthForm for replace UserInfo
const openAndClosePopupEdit = new PopupWidthForm(
  '.popup_type_edit-profile',
  handlerSubmitFormEdit
);

// handler submit form Edit
function handlerSubmitFormEdit(fieldData) {
  const infoUser = new UserInfo({
    elemName: '.profile__title',
    elemInfo: '.profile__subtitle',
  });

  infoUser.setUserInfo({
    name: fieldData['form-title'],
    info: fieldData['form-subtitle'],
  });
}

// open and close popup Edit
buttonOpenPopupEdit.addEventListener('click', () => {
  openAndClosePopupEdit.open();

  const infoUser = new UserInfo({
    elemName: '.profile__title',
    elemInfo: '.profile__subtitle',
  });
  const dataUser = infoUser.getUserInfo();

  inputTitleFormEdit.value = dataUser.name;
  inputSubtitleFormEdit.value = dataUser.info;
});

// Class PopupWidthForm for Add Card
const openAndClosePopupAdd = new PopupWidthForm(
  '.popup_type_add-cards',
  handlerSubmitFormAdd
);

// handler submit form Edit
function handlerSubmitFormAdd(fieldData) {
  console.log(fieldData);
  const card = new Card(
    fieldData['form-title'],
    fieldData['form-subtitle'],
    '.grid__elements',
    handleCardClick
  );

  const newCard = card.generateCard();

  cardList.addItem(newCard);
}

// open and close popup Edit
buttonOpenPopupAdd.addEventListener('click', () => {
  openAndClosePopupAdd.open();

  inputNamePlaceFormAdd.value = '';
  inputUrlFormAdd.value = '';
});

// open and close popup Add
buttonOpenPopupAdd.addEventListener('click', () => {
  openAndClosePopupAdd.open();
});

// listen all forms in document by config and call Class validation
document.querySelectorAll(dataForms.form).forEach((form) => {
  new FormValidator(dataForms, form).enableValidation(); // тут нужно разобраться
});