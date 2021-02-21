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
  avatarPhoto,
  buttonsForms
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

// get api user info
const apiUserInfo = initialApi(
  'https://mesto.nomoreparties.co/v1/cohort-20/users/me/'
);

// get api cards
const apiCards = initialApi(
  'https://mesto.nomoreparties.co/v1/cohort-20/cards/'
);

// initialization class PopupWithImage
const classPopupWithImage = new PopupWithImage('.popup_type_img');

// initialization class PicturePopup
const classPicturePopup = new PicturePopup('.popup_type_delete-img', apiCards);

// initialization Сlass UserInfo
const userInfo = new UserInfo({
  elemName: '.profile__title',
  elemInfo: '.profile__subtitle',
});

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

// initialize Class Api
function initialApi(url) {
  const api = new Api({
    url: url,
  });

  return api;
}

// data for userInfo
apiUserInfo
  .getUserInfo()
  .then((data) => {
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

// add Cards by page
apiCards
  .getDataCards()
  .then((data) => {
    const arrayObjectsDataCards = initialSection(
      {
        items: data,
        renderer: (item) => {
          const card = createCard(
            {
              data: {
                // ...данные карточки (включая информацию по лайкам)
                link: item.link,
                name: item.name,
                likes: item.likes,
                owner: item.owner._id,
                id: item._id,
              },
              handleCardClick: (evt) => {
                //...что должно произойти при клике на картинку
                const img = evt.target;
                classPopupWithImage.open(img.src, img.alt);
              },
              handleLikeClick: (card) => {
                //...что должно произойти при клике на лайк
              },
              handleDeleteIconClick: (card) => {
                const idCard = item._id;
                classPicturePopup.open(idCard, card);
              },
            },
            '.grid__elements',
            apiCards
          );
          // console.log(card);
          const cardElement = card.generateCard();

          // add sum likes
          const numberLike = cardElement.querySelector('.element__number-like');
          numberLike.textContent = item.likes.length;
          //console.log();

          // add button cart
          const buttonCart = cardElement.querySelector(
            '.element__button-delete'
          );
          if (item.owner._id !== '30ef6c61b529fca018d777f9') {
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
function handlerSubmitFormAdd(fieldData) {
  const newCard = createCard(
    {
      data: {
        name: fieldData['form-title'],
        link: fieldData['form-subtitle'],
      },
      handleCardClick: (evt) => {
        const img = evt.target;
        classPopupWithImage.open(img.src, img.alt);
      },
      handleLikeClick: (card) => {
        const likeCard = card.querySelector('.element__button-like');
        const numberLike = card.querySelector('.element__number-like');

        if (!likeCard.classList.contains('element__button-like_focus')) {
          likeCard.classList.add('element__button-like_focus');
          numberLike.textContent = parseInt(numberLike.textContent) + 1;
        } else {
          likeCard.classList.remove('element__button-like_focus');
          numberLike.textContent = parseInt(numberLike.textContent) - 1;
        }
      },
      handleDeleteIconClick: (card) => {},
    },
    '.grid__elements'
  );

  const cardElement = newCard.generateCard();

  apiCards
    .postDataCard(fieldData)
    .then((data) => {
      openPopupUser.close();
      const newArrayObjectsDataCards = initialSection(
        {
          items: data,
          renderer: (item) => {
            const card = createCard(
              item.name,
              item.link,
              '.grid__elements',
              handleCardClick
            );
            const cardElement = card.generateCard();
            arrayObjectsDataCards.addItem(cardElement);
          },
        },
        '.elements'
      );
      newArrayObjectsDataCards.addItem(cardElement);
    })
    .catch((err) => {
      console.log(`Ошибка сервера: ${err.status} - ${err.statusText}`);
    })
    .finally(() => {
      this.isLoad(false);
      console.log('Как дела?');
    })
}

// Class PopupWidthForm for replace UserInfo
const openPopupEdit = new PopupWidthForm(
  '.popup_type_edit-profile',
  handlerSubmitFormEdit
);

// initial Class PopupWidthForm for Add Card
const openPopupAdd = new PopupWidthForm(
  '.popup_type_add-cards',
  handlerSubmitFormAdd
);

const openPopupUser = new PopupWidthForm(
  '.popup_type_edit-avatar',
  handleSubmitFormUser
);

// handler submit form Edit
function handlerSubmitFormEdit(fieldData) {
  apiUserInfo
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
    })
}

function handleSubmitFormUser(avatarLink) { 
  apiUserInfo
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
  })
}

// open popup Edit
buttonOpenPopupEdit.addEventListener('click', () => {
  openPopupEdit.open();
  const dataUser = userInfo.getUserInfo();

  inputTitleFormEdit.value = dataUser.name;
  inputSubtitleFormEdit.value = dataUser.info;
});

// open popup User
userAvatar.addEventListener('click', () => {
  openPopupUser.open();
});

// open popup Add
buttonOpenPopupAdd.addEventListener('click', () => {
  openPopupAdd.open();
});

// listen all forms in document by config and call Class validation
document.querySelectorAll(dataForms.form).forEach((form) => {
  new FormValidator(dataForms, form).enableValidation();
});