//HTML block with data from section profile
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Popups
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-cards');
const imageModal = document.querySelector('.popup_type_img');

//Forms
  //__popup edit
const editForm = editProfileModal.querySelector('.form');
  //__popup add
const addForm = addCardModal.querySelector('.form');

  //__inputs edit
    //_1-й input
const formInputName = editForm.querySelector('.form__input_name');
    //_2-й input
const formInputJob = editForm.querySelector('.form__input_job');

  //__inputs add
    //_1-й input
const formInputPlace = addForm.querySelector('.form__input_place');
    //_2-й input
const formInputUrl = addForm.querySelector('.form__input_url');

//Buttons
  //__open
    //_popup edit
const profileEditButton = document.querySelector('.profile__edit-button');
    //_popup add
const addPopupButtonOpen = document.querySelector('.profile__add');
    //_popup img
const imgPopupButtonOpen = document.querySelector('.element__img');

  //__close
    //_1-й popup
const modalCloseButton = editProfileModal.querySelector('.popup__close-icon');
    //_2-й popup
const addPopupButtonClose = addCardModal.querySelector('.popup__close-icon');
    //_3-й popup
const imgPopupButtonClose = imageModal.querySelector('.popup__close-icon');

//Popup img with data
  //__заголовок
const imgModalTitle = imageModal.querySelector('.popup__title-img');
  //__большая картинка
const imgModalImg = imageModal.querySelector('.popup__img');

//Card items
  //__card item in template for section grid 
const gridElementCard = document.querySelector('.grid__elements').content.querySelector('.element');
  //__section grid for Card item
const gridElements = document.querySelector('.elements');
  //__object with images
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

//open and close popup путем добавления класса popup_opened 
function toggleModalWindow(modalWindow) { 
  modalWindow.classList.toggle('popup_opened'); 
} 
  
 //подставляю данные из section profile в поле ввода формы edit и добавляю метод toggle for open and close popup
function dataFromProfileInInputFormEdit() { 
  formInputName.value = profileTitle.textContent; 
  formInputJob.value = profileSubtitle.textContent;
  toggleModalWindow(editProfileModal); 
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

function imgCardOpenCloseBigImg() {
  imgModalTitle.textContent = elementCardTitle.textContent;
  imgModalImg.src = elementCardImg.src;
  imgModalImg.alt = elementCardTitle.textContent;
  toggleModalWindow(imageModal);
}

function createCard(element) {
  const elementCard = gridElementCard.cloneNode(true);
  const elementCardTitle = elementCard.querySelector('.element__title');
  const elementCardImg = elementCard.querySelector('.element__img');
  const elementCardButtonLike = elementCard.querySelector('.element__button-like');
  const elementCardButtonDelete = elementCard.querySelector('.element__button-delete');

  function imgCardDelete() {
    const listItem = elementCardButtonDelete.closest('.element');
    listItem.remove();
  }

  function imgCardLike() {
    elementCardButtonLike.classList.toggle('element__button-like_focus');
  }

  elementCardImg.addEventListener('click', imgCardOpenCloseBigImg);
  elementCardButtonLike.addEventListener('click', imgCardLike);
  elementCardButtonDelete.addEventListener('click', imgCardDelete);

  elementCardTitle.textContent = element.name;
  elementCardImg.src = element.link;
  elementCardImg.alt = element.name;

  return elementCard;
}

function renderCard(element) {
  gridElements.prepend(createCard(element));
}

editForm.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', addCardSubmitHandler);

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

profileEditButton.addEventListener('click', dataFromProfileInInputFormEdit);