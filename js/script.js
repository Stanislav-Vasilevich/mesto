//HTML block with section profile
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Popups
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-cards');
const imageModal = document.querySelector('.popup_type_img');

//Form
  //__форма 1-й модалки
const editForm = editProfileModal.querySelector('.form');
  //__форма 2-й модалки
const addForm = addCardModal.querySelector('.form');

  //__inputs edit
    //_1-е поле ввода 1-й popup
const formInputName = editForm.querySelector('.form__input_name');
    //_2-е поле ввода 1-й popup
const formInputJob = editForm.querySelector('.form__input_job');
  //__inputs add
    //_1-е поле ввода 2-го popup
const formInputPlace = addForm.querySelector('.form__input_place');
    //_2-е поле ввода 2-го popup
const formInputUrl = addForm.querySelector('.form__input_url');
  //__buttons
    //_кнопка сохранить 1-й popup
const editPopupButtonSave = editProfileModal.querySelector('.form__submit');
    //_кнопка сохранить 2-й popup
const addPopupButtonSave = addCardModal.querySelector('.form__submit');

//Buttons
  //__open
    //_кнопка редакировать 1-й popup
const profileEditButton = document.querySelector('.profile__edit-button');
    //_кнопка открыть 2-й popup
const addPopupButtonOpen = document.querySelector('.profile__add');

  //__close
    //_кнопка закрыть 1-й popup
const modalCloseButton = editProfileModal.querySelector('.popup__close-icon');
    //_кнопка закрыть 2-й popup
const addPopupButtonClose = addCardModal.querySelector('.popup__close-icon');

//Image
const imageModalTitle = imageModal.querySelector('.element__title');
const imageModalImg = imageModal.querySelector('.element__img');

function toggleModalWindow(modalWindow) {
  formInputName.value = profileTitle.textContent;
  formInputJob.value = profileSubtitle.textContent;
  modalWindow.classList.toggle('popup_opened');
};

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputJob.value;
  toggleModalWindow(editProfileModal);
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({name: formInputPlace.value, link: formInputUrl.value})
  toggleModalWindow(addCardModal);
}

editForm.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', addCardSubmitHandler);

profileEditButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
});

// editPopupButtonSave.addEventListener('click', () => {
//   toggleModalWindow(editProfileModal);
// });

modalCloseButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
});

addPopupButtonOpen.addEventListener('click', () => {
  toggleModalWindow(addCardModal);
});

addPopupButtonClose.addEventListener('click', () => {
  toggleModalWindow(addCardModal);
});

  const initialCards = [
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

const gridElementCard = document.querySelector('.grid__elements').content.querySelector('.element');
const gridElements = document.querySelector('.elements');

// function handleDeleteClick() {
//   /* внутри себя используем e.target, в него попадает тот кусочек, по которому я в данный момнет кликнул, мне надо найти ближайшего родителя
//   с каким-то селектором, а потом его удалить, это можно сделать через .clones, в скобочках указать селектор родителя, которого хочу найти
//   и удалить через .remove */
// };

// function handleImageClick() {
//   imageModalTitle = .textContent
//   toggleModalWindow(imageModal);
//   /* он внутри себя должен открывать модалку, чтобы открыть модалку сначала ее создаем, а потом найти по новому классу, внутри не будет формы, только 
//   popup__container и popup__close-icon и прописываю что туда нужно вставить figure*/
// };

function createCard(element) {
  const elementCard = gridElementCard.cloneNode(true);

  const elementCardImg = elementCard.querySelector('.element__img');
  const elementCardTitle = elementCard.querySelector('.element__title');
  const elementCardButtonLike = elementCard.querySelector('.element__button-like');
  const elementCardButtonDelete = elementCard.querySelector('.element__button-delete');

  elementCardButtonLike.addEventListener('click', () => {
    elementCardButtonLike.classList.toggle('element__button-like_focus');
  });

  // elementCardButtonDelete.addEventListener('click', () => {
  //   //handleDeleteClick()
  // });

  // elementCardImg.addEventListener('click', () => {
  //   //handleImageClick()
  // });

  elementCardTitle.textContent = element.name;
  elementCardImg.src = element.link;
  elementCardImg.alt = element.name;

  return elementCard;
};

function renderCard(element) {
  gridElements.prepend(createCard(element));
};

initialCards.forEach((element) => {
  renderCard(element)
});