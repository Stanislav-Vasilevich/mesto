import Card from './Card.js';
new Card();

//HTML block with data from section profile
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Popups
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-cards');

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
  
 //data from section profile in fieldset form edit and add toggle for open and close popup
function substitutingDataInInputFormEdit() { 
  formInputName.value = profileTitle.textContent; 
  formInputJob.value = profileSubtitle.textContent;
  openModal(editProfileModal);
} 

function handlerSubmitForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputJob.value;
  closeModal(editProfileModal);
}

//add new card
function handlerSubmitAddCard(evt) {
  evt.preventDefault();
  renderCard({name: formInputPlace.value, link: formInputUrl.value});
  formInputPlace.value = '';
  formInputUrl.value = '';
  activeButtonsPopups(submitAddCard, 'form__submit_active');
  closeModal(addCardModal);
}

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

// 1) добавляет класс открытия модалки необходимой модалке
// 2) слушает документ и при клике на клавиатуру вызывает функцию
// 3) слушает необходимую модалку и при клике вызывает функцию
function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  popup.addEventListener('click', closePopupsByOverlay);
}

// 1)удаляет класс для закрытия модального окна
// 2)удаляет из документа слушатель по клику на клавиатуру и вызывает функцию
// 3)удаляет по клику из той модалки, которую мы подставим слушатель и вызывает функцию
function closeModal(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  popup.removeEventListener('click', closePopupsByOverlay);
}

// 1) находит класс открытия модалки в документе и записывает в переменную popup
// 2) если в свойстве event есть класс overlay, тогда вызывает функцию с необходимой модалкой
function closePopupsByOverlay(evt) {
  const popup = document.querySelector('.popup_opened');
  if(evt.target.classList.contains('popup__overlay')) {
    closeModal(popup);
  }
}

// 1) находит класс открытия модалки в документе и записывает в переменную popup
// 2) если свойство key равно 'Escape', тогда вызывает функцию с переменной popup
function closePopupByEscape(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closeModal(popup);
  }
}

//слушает модальное окно Edit и при клике вызывает функцию
buttonProfileEdit.addEventListener('click', substitutingDataInInputFormEdit);

//слушает кнопку в модальном окне Edit и при клике вызывает функцию
editForm.addEventListener('submit', handlerSubmitForm);

//слушает кнопку-крестик в модальном окне Edit и при клике вызывает функцию с определенной модалкой
buttonCloseModal.addEventListener('click', () => {
  closeModal(editProfileModal);
});

//слушает кнопку редактирования данных в profile и при клике вызывает функцию с определенной модалкой
buttonOpenAddPopup.addEventListener('click', () => {
  openModal(addCardModal);
});

//слушает кнопку сохранения в модалке add и при клике вызывает функцию
addForm.addEventListener('submit', handlerSubmitAddCard);

//слушает кнопку-крестик закрытия модалки add и при клике вызывает функцию с определенной модалкой
buttonClosePopupAdd.addEventListener('click', () => {
  closeModal(addCardModal);
});