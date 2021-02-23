let userId;

import './index.css';

// constants
import {
  dataForms,
  inputTitleFormEdit,
  inputSubtitleFormEdit,
  buttonOpenPopupEdit,
  buttonOpenPopupAdd,
  userAvatar,
  userName,
  userDescription,
  avatarPhoto,
  sectionCards,
} from '../js/utils/constants.js';

// Class js
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import Card from '../js/components/Card.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWidthForm from '../js/components/PopupWithForm.js';
import PicturePopup from '../js/components/PicturePopup.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/components/Api.js';

// initialize Class Api
function initialApi(url) {
  const api = new Api({
    url: url,
  });

  return api;
}

// api
const api = initialApi(
  'https://mesto.nomoreparties.co/v1/cohort-20/'
);

// initialization class PicturePopup
const classPicturePopup = new PicturePopup('.popup_type_delete-img', api);

// initialization Сlass UserInfo
const userInfo = new UserInfo({
  elemName: '.profile__title',
  elemInfo: '.profile__subtitle',
});

// initialization class PopupWithForm
function initialClassPopupWithForm(popupSelector, handleFormSubmit) {
  const popupWithForm = new PopupWidthForm(popupSelector, handleFormSubmit);

  return popupWithForm;
}

// initialize Сlass Card
function createCard(
  { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
  templateCard,
  api
) {
  const card = new Card(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    templateCard,
    api
  );

  return card;
}

// initialization class PopupWithImage
const classPopupWithImage = new PopupWithImage('.popup_type_img');

// PopupWidthForm for replace UserInfo
const openPopupEdit = new initialClassPopupWithForm(
  '.popup_type_edit-profile',
  handlerSubmitFormEdit
);

// PopupWidthForm for Add Card
const openPopupAdd = new initialClassPopupWithForm(
  '.popup_type_add-cards',
  handlerSubmitFormAdd
);

// PopupWidthForm for user Avatar
const openPopupUser = new initialClassPopupWithForm(
  '.popup_type_edit-avatar',
  handleSubmitFormUser
);

// get data for userInfo
api
  .getUserInfo()
  .then((data) => {
    userId = data._id; // got your id
    userAvatar.src = data.avatar;
    userName.textContent = data.name;
    userDescription.textContent = data.about;
  })
  .catch((err) => {
    console.log(`Ошибка сервера: ${err.status} - ${err.statusText}`);
  });

function initialSection({ items, renderer }, containerSelector) {
  const arrayObjectsDataCards = new Section(
    { items, renderer },
    containerSelector
  );

  return arrayObjectsDataCards;
}

// get Cards from server
api
  .getDataCards()
  .then((data) => {
    const arrayObjectsDataCards = initialSection(
      {
        items: data,
        renderer: (item) => {
          const card = createCard(
            {
              data: {
                link: item.link,
                name: item.name,
                likes: item.likes,
                owner: item.owner._id,
                id: item._id,
              },
              handleCardClick: (evt) => {
                const img = evt.target;
                classPopupWithImage.open(img.src, img.alt);
              },
              handleLikeClick: () => {
              },
              handleDeleteIconClick: (card) => {
                const idCard = item._id;
                classPicturePopup.open(idCard, card);
              },
            },
            '.grid__elements',
            api
          );
          const cardElement = card.generateCard();

          // show sum likes
          const numberLike = cardElement.querySelector('.element__number-like');
          numberLike.textContent = item.likes.length;

          // show button cart
          const buttonCart = cardElement.querySelector(
            '.element__button-delete'
          );
          if (item.owner._id !== userId) {
            buttonCart.classList.add('element__button-delete_inactive');
          }

          arrayObjectsDataCards.addItem(cardElement);
        },
      },
      '.elements'
    );

    arrayObjectsDataCards.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка сервера: ${err.status} - ${err.statusText}`);
  });

// handler submit form Add
function handlerSubmitFormAdd(fieldData ) {
  api
    .postDataCard(
      fieldData
    ) 
    .then((data) => {
      const newCard = createCard(
        {
          data: {
            link: data.link,
            name: data.name,
            likes: data.likes,
            owner: data.owner._id,
            id: data._id,
          },
          handleCardClick: (evt) => {
            const img = evt.target;
            classPopupWithImage.open(img.src, img.alt);
          },
          handleLikeClick: () => {},
          handleDeleteIconClick: (card) => {
            const idCard = data._id;
            classPicturePopup.open(idCard, card);
          },
        },
        '.grid__elements',
        api
      );
      const elemCard = newCard.generateCard();
      sectionCards.prepend(elemCard);
      openPopupAdd.close();
    })
    .catch((err) => {
      console.log(`Ошибка сервера: ${err.status} - ${err.statusText}`);
    })
    .finally(() => {
      this.isLoad(false);
    });
}

// handler submit form Edit
function handlerSubmitFormEdit(fieldData) {
  api
    .patchUserInfo(fieldData)
    .then((data) => {
      userInfo.setUserInfo({
        name: data['name'],
        info: data['about'],
      });
      openPopupEdit.close();
    })
    .catch((err) => {
      console.log(`Ошибка сервера: ${err.status} - ${err.statusText}`);
    })
    .finally(() => {
      this.isLoad(false);
    });
}

// handler submit form User
function handleSubmitFormUser(avatarLink) {
  api
    .patchUserAvatar(avatarLink)
    .then((data) => {
      avatarPhoto.src = data.avatar;
      openPopupUser.close();
    })
    .catch((err) => {
      console.log(`Ошибка отправки аватара: ${err.status} - ${err.statusText}`);
    })
    .finally(() => {
      this.isLoad(false);
    });
}

// open popup User
userAvatar.addEventListener('click', () => {
  openPopupUser.open();
});

// open popup Edit
buttonOpenPopupEdit.addEventListener('click', () => {
  openPopupEdit.open();
  const dataUser = userInfo.getUserInfo();

  inputTitleFormEdit.value = dataUser.name;
  inputSubtitleFormEdit.value = dataUser.info;
});

// open popup Add
buttonOpenPopupAdd.addEventListener('click', () => {
  openPopupAdd.open();
});

// enable validation
document.querySelectorAll(dataForms.form).forEach((form) => {
  new FormValidator(dataForms, form).enableValidation();
});