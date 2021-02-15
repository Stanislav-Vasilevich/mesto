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
  userAvatar,
  userName,
  userDescription,
} from '../js/utils/constants.js';

// Class js
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import Card from '../js/components/Card.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWidthForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/components/Api.js';

// initialize Сlass Card
function createCard(name, link, templateCard, handleCardClick) {
  const card = new Card(name, link, templateCard, handleCardClick);

  return card;
}

// initialize Class Api
function initialApi(url) {
  const api = new Api({
    url: url
  });

  return api;
}

// get api user info
const apiUserInfo = initialApi(
  'https://mesto.nomoreparties.co/v1/cohort-20/users/me');

// get api cards
const apiCards = initialApi(
  'https://mesto.nomoreparties.co/v1/cohort-20/cards/');

// data for userInfo
apiUserInfo
  .getUserInfo()
  .then((data) => {
    userAvatar.src = data.avatar;
    userName.textContent = data.name;
    userDescription.textContent = data.about;
  })
  .catch((err) => {
    console.log(err);
  });

// data for Cards
apiCards
  .getDataCards()
  .then((data) => {
    // initialization Сlass Section
    const cardList = new Section(
      {
        items: data,
        renderer: (item) => {
          const card = createCard(
            item.name,
            item.link,
            '.grid__elements',
            handleCardClick,
            apiCards
          );
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        },
      },
      '.elements'
    );

    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// initialization Сlass PopupWithImage
const classPopupWithImage = new PopupWithImage('.popup_type_img');

// initialization Сlass UserInfo
const userInfo = new UserInfo({
  elemName: '.profile__title',
  elemInfo: '.profile__subtitle',
});

// open popup image and push data
function handleCardClick(evt) {
  const img = evt.target;
  classPopupWithImage.open(img.src, img.alt);
}

// Class PopupWidthForm for replace UserInfo
const openPopupEdit = new PopupWidthForm(
  '.popup_type_edit-profile',
  handlerSubmitFormEdit
);

// handler submit form Edit
function handlerSubmitFormEdit(fieldData) {
  userInfo.setUserInfo({
    name: fieldData['form-title'],
    info: fieldData['form-subtitle'],
  });
}

// initial Class PopupWidthForm for Add Card
const openPopupAdd = new PopupWidthForm(
  '.popup_type_add-cards',
  handlerSubmitFormAdd
);

// handler submit form Add
function handlerSubmitFormAdd(fieldData) {
  const newCard = createCard(
    fieldData['form-title'],
    fieldData['form-subtitle'],
    '.grid__elements',
    handleCardClick,
  );
  const cardElement = newCard.generateCard();
  cardList.addItem(cardElement);
}

// open popup Add
buttonOpenPopupAdd.addEventListener('click', () => {
  openPopupAdd.open();
});

// open popup Edit
buttonOpenPopupEdit.addEventListener('click', () => {
  openPopupEdit.open();

  const dataUser = userInfo.getUserInfo();

  inputTitleFormEdit.value = dataUser.name;
  inputSubtitleFormEdit.value = dataUser.info;
});

// listen all forms in document by config and call Class validation
document.querySelectorAll(dataForms.form).forEach((form) => {
  new FormValidator(dataForms, form).enableValidation();
});
