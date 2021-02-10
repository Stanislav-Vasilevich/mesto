import './index.css';

// constants
import {
  dataCards,
  dataForms,
  inputTitleFormEdit,
  inputSubtitleFormEdit,
  inputNamePlaceFormAdd,
  inputUrlFormAdd,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
} from '../js/utils/constants.js';

// Class js
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import Card from '../js/components/Card.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWidthForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';

// initialization Сlass Card
function createCard(name, link, templateCard, handleCardClick) {
  const card = new Card(name, link, templateCard, handleCardClick);

  return card;
}

// initialization Сlass PopupWithImage
function createPopupWithImage() {
  const popupImage = new PopupWithImage('.popup_type_img');

  return popupImage;
}

// initialization Сlass UserInfo
function createUserInfo({ elemName, elemInfo }) {
  const userInfo = new UserInfo({ elemName, elemInfo });

  return userInfo;
}

// initialization Сlass Section
const cardList = new Section(
  {
    items: dataCards,
    renderer: (item) => {
      const card = createCard(
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
  const popupImage = createPopupWithImage();
  popupImage.open(img.src, img.alt);
}

// Class PopupWidthForm for replace UserInfo
const openPopupEdit = new PopupWidthForm(
  '.popup_type_edit-profile',
  handlerSubmitFormEdit
);

// handler submit form Edit
function handlerSubmitFormEdit(fieldData) {
  const userInfo = createUserInfo({
    elemName: '.profile__title',
    elemInfo: '.profile__subtitle',
  });

  userInfo.setUserInfo({
    name: fieldData['form-title'],
    info: fieldData['form-subtitle'],
  });
}

// open and close popup Edit
buttonOpenPopupEdit.addEventListener('click', () => {
  openPopupEdit.open();

  const infoUser = createUserInfo({
    elemName: '.profile__title',
    elemInfo: '.profile__subtitle',
  });
  const dataUser = infoUser.getUserInfo();

  inputTitleFormEdit.value = dataUser.name;
  inputSubtitleFormEdit.value = dataUser.info;
});

// Class PopupWidthForm for Add Card
const openPopupAdd = new PopupWidthForm(
  '.popup_type_add-cards',
  handlerSubmitFormAdd
);

// handler submit form Edit
function handlerSubmitFormAdd(fieldData) {
  const newCard = createCard(
    fieldData['form-title'],
    fieldData['form-subtitle'],
    '.grid__elements',
    handleCardClick
  );
  const cardElement = newCard.generateCard(); 
  cardList.addItem(cardElement);
}

// open and close popup Edit
buttonOpenPopupAdd.addEventListener('click', () => {
  openPopupAdd.open();

  inputNamePlaceFormAdd.value = '';
  inputUrlFormAdd.value = '';
});

// open and close popup Add
buttonOpenPopupAdd.addEventListener('click', () => {
  openPopupAdd.open();
});

// listen all forms in document by config and call Class validation
document.querySelectorAll(dataForms.form).forEach((form) => {
  new FormValidator(dataForms, form).enableValidation();
});
