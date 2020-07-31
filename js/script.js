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
    //_popup img
const imgPopupButtonOpen = document.querySelector('.element__img');

  //__close
    //_1-й popup
const buttonCloseModal = editProfileModal.querySelector('.popup__close-icon');
    //_2-й popup
const buttonClosePopupAdd = addCardModal.querySelector('.popup__close-icon');
    //_3-й popup
const buttonClosePopupImg = imageModal.querySelector('.popup__close-icon');

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
  
 //подставляет данные из section profile в поле ввода формы edit и добавляю метод toggle for open and close popup
function substitutingDataInInputFormEdit() { 
  formInputName.value = profileTitle.textContent; 
  formInputJob.value = profileSubtitle.textContent;
  toggleModalWindow(editProfileModal); 
} 

function handlerSubmitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputJob.value;
  toggleModalWindow(editProfileModal);
}

function handlerSubmitAddCard(evt) {
  evt.preventDefault();
  renderCard({name: formInputPlace.value, link: formInputUrl.value})
  toggleModalWindow(addCardModal);
  formInputPlace.value = '';
  formInputUrl.value = '';
}

function renderCard(element) {
  gridElements.prepend(createCard(element));
}

//добавляет карточки с изображениями, заголовками, лайками и кнопками удаления на страницу
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

  //прослушивает картинки в card и при клике открывает popup и подставляет данные
  elementCardImg.addEventListener('click', () => { 
    toggleModalWindow(imageModal);
    fillCardBigImg(elementCardTitle, elementCardImg, elementCardTitle);
    // fillCard(/* здесь данные к которым есть доступ из функции createCard */)
  });

  //ставит лайк
  likeButtonElementCard.addEventListener('click', () => {
    likeCard(likeButtonElementCard);
  });

  //удаляет карточку
  deleteElementCardButton.addEventListener('click', () => {
    deleteCard(deleteElementCardButton);
  });

  //fill data card
  elementCardTitle.textContent = element.name;
  elementCardImg.src = element.link;
  elementCardImg.alt = element.name;

  return elementCard;
}

//open and close popup путем добавления класса popup_opened 
function toggleModalWindow(modalWindow) { 
  modalWindow.classList.toggle('popup_opened'); 
}

//fill data card big img
const fillCardBigImg = function(title, img, alt) {
  imgModalTitle.textContent = title.textContent;
  imgModalImg.src = img.src;
  imgModalImg.alt = alt.textContent;
}

//like card
const likeCard = function(like) {
  like.classList.toggle('element__button-like_focus');
}

//delete card
const deleteCard = function(element) {
  const listItem = element.closest('.element');
  listItem.remove();
}

editForm.addEventListener('submit', handlerSubmitForm);
addForm.addEventListener('submit', handlerSubmitAddCard);

buttonCloseModal.addEventListener('click', () => {
  toggleModalWindow(editProfileModal);
});

buttonOpenAddPopup.addEventListener('click', () => {
  toggleModalWindow(addCardModal);
});

buttonClosePopupAdd.addEventListener('click', () => {
  toggleModalWindow(addCardModal);
});

buttonClosePopupImg.addEventListener('click', () => {
  toggleModalWindow(imageModal);
});

initialCards.forEach((element) => {
  renderCard(element);
});

buttonProfileEdit.addEventListener('click', substitutingDataInInputFormEdit);