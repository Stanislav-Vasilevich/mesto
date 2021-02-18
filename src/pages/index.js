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
import PicturePopup from '../js/components/PicturePopup.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/components/Api.js';

// initialization class PopupWithImage
const classPopupWithImage = new PopupWithImage('.popup_type_img');

// initialization class PicturePopup
const classPicturePopup = new PicturePopup('.popup_type_delete-img');

// initialization Сlass UserInfo
const userInfo = new UserInfo({
  elemName: '.profile__title',
  elemInfo: '.profile__subtitle',
});

// initialize Сlass Card
function createCard(
  { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
  templateCard
) {
  const card = new Card(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    templateCard
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

// get api user info
const apiUserInfo = initialApi(
  'https://mesto.nomoreparties.co/v1/cohort-20/users/me'
);

// get api cards
const apiCards = initialApi(
  'https://mesto.nomoreparties.co/v1/cohort-20/cards/'
);

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

apiCards
  .getDataCards()
  .then((data) => {
    // initialization Сlass Section
    const arrayObjectsDataCards = initialSection(
      {
        items: data,
        renderer: (item) => {
          // console.log(item); // обошли объект с сервера и получили его объекты
          const card = createCard(
            {
              data: {
                // ...данные карточки (включая информацию по лайкам)
                link: item.link,
                name: item.name,
                likes: item.likes,
                _id: item._id,
              },
              handleCardClick: (evt) => {
                //...что должно произойти при клике на картинку
                const img = evt.target;
                classPopupWithImage.open(img.src, img.alt);
              },
              handleLikeClick: (card) => {
                //...что должно произойти при клике на лайк
                const likeCard = card.querySelector('.element__button-like');

                const numberLike = card.querySelector('.element__number-like');

                if (
                  !likeCard.classList.contains('element__button-like_focus')
                ) {
                  likeCard.classList.add('element__button-like_focus');
                  numberLike.textContent = parseInt(numberLike.textContent) + 1;
                } else {
                  likeCard.classList.remove('element__button-like_focus');
                  numberLike.textContent = parseInt(numberLike.textContent) - 1;
                }
              },
              handleDeleteIconClick: (card) => {
                //...что должно произойти при клике на удаление
                // classPicturePopup.open()
                card.remove();
              },
            },
            '.grid__elements'
          );
          // console.log(card);
          const cardElement = card.generateCard();

          // колличество лайков
          const numberLike = cardElement.querySelector('.element__number-like');
          numberLike.textContent = item.likes.length;

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
  // данные полей
  const newCard = createCard(
    {
      data: {
        // ...данные карточки (включая информацию по лайкам)
        name: fieldData['form-title'],
        link: fieldData['form-subtitle'],
      },
      handleCardClick: (evt) => {
        //...что должно произойти при клике на картинку
        const img = evt.target;
        classPopupWithImage.open(img.src, img.alt);
      },
      handleLikeClick: (card) => {
        //...что должно произойти при клике на лайк
        const likeCard = card.querySelector('.element__button-like');

                const numberLike = card.querySelector('.element__number-like');

                if (
                  !likeCard.classList.contains('element__button-like_focus')
                ) {
                  likeCard.classList.add('element__button-like_focus');
                  numberLike.textContent = parseInt(numberLike.textContent) + 1;
                } else {
                  likeCard.classList.remove('element__button-like_focus');
                  numberLike.textContent = parseInt(numberLike.textContent) - 1;
                }
      },
      handleDeleteIconClick: (card) => {
        //...что должно произойти при клике на удаление
        card.remove();
      },
    },
    '.grid__elements'
  );

  const cardElement = newCard.generateCard();

  apiCards
    .postDataCard(fieldData)
    .then((data) => {
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
    });
}

// Class PopupWidthForm for replace UserInfo
const openPopupEdit = new PopupWidthForm(
  '.popup_type_edit-profile',
  handlerSubmitFormEdit
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
    })
    .catch((err) => {
      console.log(`Ошибка сервера: ${err.status} - ${err.statusText}`);
    });
}

// initial Class PopupWidthForm for Add Card
const openPopupAdd = new PopupWidthForm(
  '.popup_type_add-cards',
  handlerSubmitFormAdd
);

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
