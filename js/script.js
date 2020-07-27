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

//Buttons
  //__open
    //_кнопка редакировать 1-й popup
const profileEditButton = document.querySelector('.profile__edit-button');
    //_кнопка открыть 2-й popup
const addPopupButtonOpen = document.querySelector('.profile__add');
    //_кнопка открыть 3-й popup
const imgPopupButtonOpen = document.querySelector('.element__img');

  //__close
    //_кнопка закрыть 1-й popup
const modalCloseButton = editProfileModal.querySelector('.popup__close-icon');
    //_кнопка закрыть 2-й popup
const addPopupButtonClose = addCardModal.querySelector('.popup__close-icon');
    //_кнопка закрыть 3-й popup
const imgPopupButtonClose = imageModal.querySelector('.popup__close-icon');

const imgModalTitle = imageModal.querySelector('.popup__title-img');
const imgModalImg = imageModal.querySelector('.popup__img');

const gridElementCard = document.querySelector('.grid__elements').content.querySelector('.element');
const gridElements = document.querySelector('.elements');

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

function toggleModalWindow(modalWindow) { 
  modalWindow.classList.toggle('popup_opened'); 
} 
 
profileEditButton.addEventListener('click', togglePopupButton); 
 
function togglePopupButton() { 
  formInputName.value = profileTitle.textContent; 
  formInputJob.value = profileSubtitle.textContent; 
} 

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
  formInputPlace.value = '';
  formInputUrl.value = '';
}

function createCard(element) {
  const elementCard = gridElementCard.cloneNode(true);
  const elementCardTitle = elementCard.querySelector('.element__title');
  const elementCardImg = elementCard.querySelector('.element__img');
  const elementCardButtonLike = elementCard.querySelector('.element__button-like');
  const elementCardButtonDelete = elementCard.querySelector('.element__button-delete');

  function imgCardOpenCloseBigImg() {
    imgModalTitle.textContent = elementCardTitle.textContent;
    imgModalImg.src = elementCardImg.src;
    imgModalImg.alt = elementCardTitle.textContent;
    toggleModalWindow(imageModal);
  }

  function imgCardLike() {
    elementCardButtonLike.classList.toggle('element__button-like_focus');
  }

  function imgCardDelete() {
    const listItem = elementCardButtonDelete.closest('.element');
    listItem.remove();
  }

  elementCardImg.addEventListener('click', imgCardOpenCloseBigImg);
  elementCardButtonLike.addEventListener('click', imgCardLike);
  elementCardButtonDelete.addEventListener('click', imgCardDelete);

  elementCardTitle.textContent = element.name;
  elementCardImg.src = element.link;
  elementCardImg.alt = element.name;

  return elementCard;
};

function renderCard(element) {
  gridElements.prepend(createCard(element));
}

editForm.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', addCardSubmitHandler);

profileEditButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
});

modalCloseButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
});

addPopupButtonOpen.addEventListener('click', () => {
  toggleModalWindow(addCardModal);
});

addPopupButtonClose.addEventListener('click', () => {
  toggleModalWindow(addCardModal);
});

imgPopupButtonClose.addEventListener('click', () => {
  toggleModalWindow(imageModal);
});

initialCards.forEach((element) => {
  renderCard(element);
});