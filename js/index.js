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
const buttonProfileEdit = document.querySelector('.profile__edit-button');
    //_popup add
const buttonOpenAddPopup = document.querySelector('.profile__add'); 

  //__save
    //_card add
const submitAddCard = addCardModal.querySelector('.form__submit');

  //__close
    //_popup edit
const buttonCloseModal = editProfileModal.querySelector('.popup__close-icon');
    //_popup add
const buttonClosePopupAdd = addCardModal.querySelector('.popup__close-icon');
    //_popup img
const buttonClosePopupImg = imageModal.querySelector('.popup__close-icon');

//Popup img with data
  //__title
const imgModalTitle = imageModal.querySelector('.popup__title-img');
  //__big image
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
  
 //data from section profile in fieldset form edit and add toggle for open and close popup
function substitutingDataInInputFormEdit() { 
  formInputName.value = profileTitle.textContent; 
  formInputJob.value = profileSubtitle.textContent;
  toggleModalWindow(editProfileModal); 
  closePopupByEscape(editProfileModal);
  closePopupsByOverlay(editProfileModal);
} 

function handlerSubmitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputJob.value;
  toggleModalWindow(editProfileModal);
}

//add new card
function handlerSubmitAddCard(evt) {
  evt.preventDefault();
  renderCard({name: formInputPlace.value, link: formInputUrl.value})
  toggleModalWindow(addCardModal);
  formInputPlace.value = '';
  formInputUrl.value = '';
  submitAddCard.setAttribute('disabled', true);
  submitAddCard.classList.add('form__submit_active');
}

function renderCard(element) {
  gridElements.prepend(createCard(element));
}

//add cards width images, titles, likes and delete buttons by page
function createCard(element) {
  //clone template
  const elementCard = gridElementCard.cloneNode(true);
  //title из template
  const elementCardTitle = elementCard.querySelector('.element__title');
  //img из template
  const elementCardImg = elementCard.querySelector('.element__img');
  //like button из template
  const likeButtonElementCard = elementCard.querySelector('.element__button-like');
  //delete button из template
  const deleteElementCardButton = elementCard.querySelector('.element__button-delete');

  //listen cards, open popup and enters data
  elementCardImg.addEventListener('click', () => { 
    toggleModalWindow(imageModal);
    closePopupByEscape(imageModal);
    closePopupsByOverlay(imageModal);
    fillCardBigImg(elementCardTitle, elementCardImg, elementCardTitle);
  });

  //listen cards, like card in grid Img
  likeButtonElementCard.addEventListener('click', () => {
    likeCard(likeButtonElementCard);
  });

  //listen cards, delete card in grid Img
  deleteElementCardButton.addEventListener('click', () => {
    deleteCard(deleteElementCardButton);
  });

  //fill data card
  elementCardTitle.textContent = element.name;
  elementCardImg.src = element.link;
  elementCardImg.alt = element.name;

  return elementCard;
}

initialCards.forEach((element) => {
  renderCard(element);
});

//fill data card big img
const fillCardBigImg = function(title, img, alt) {
  imgModalTitle.textContent = title.textContent;
  imgModalImg.src = img.src;
  imgModalImg.alt = alt.textContent;
}

//like card in grid Img
const likeCard = function(like) {
  like.classList.toggle('element__button-like_focus');
}

//delete card in grid Img
const deleteCard = function(element) {
  const listItem = element.closest('.element');
  listItem.remove();
}

//open and close popup путем добавления класса popup_opened 
function toggleModalWindow(modalWindow) { 
  modalWindow.classList.toggle('popup_opened'); 
}

//close popups by Escape and overlay
function closeModal(popups) {
  popups.classList.remove('popup_opened');
}

//listen cards, close popups by Escape
function closePopupByEscape(popups) {
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      closeModal(popups);
    }
  });
}

//listen cards, close popups by overlay
function closePopupsByOverlay(popups) {
  popups.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup__overlay')) {
      closeModal(popups);
    }
  })
}

//open popup Edit
buttonProfileEdit.addEventListener('click', substitutingDataInInputFormEdit);

//add data in profile Edit
editForm.addEventListener('submit', handlerSubmitForm);

//close popup Edit
buttonCloseModal.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
});

//open popup Add
buttonOpenAddPopup.addEventListener('click', () => {
  toggleModalWindow(addCardModal);
  closePopupByEscape(addCardModal);
  closePopupsByOverlay(addCardModal);
});

//add data in new card Add
addForm.addEventListener('submit', handlerSubmitAddCard);

//close popup Add
buttonClosePopupAdd.addEventListener('click', () => {
  toggleModalWindow(addCardModal);
});

//close popup Img
buttonClosePopupImg.addEventListener('click', () => {
  toggleModalWindow(imageModal);
});