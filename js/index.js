import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

// 1) первый input формы в модальном окне Add
// 2) второй input формы в модальном окне Add
const formInputPlace = addForm.querySelector('.form__input_place');
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

// нашел в документе класс списка, в который будет помещена разметка из js и записал в константу
// записал объект с новым содержимым для карточек в grid секцию в константу
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

const dataForms = {
  form: '.form',
  input: '.form__input',
  submit: '.form__submit',
  inactiveButton: 'form__submit_active',
  errorMsg: 'form__input-error_active',
  invalidInput: 'form__input_type_error'
}
  
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

// 1) функция обходит объект и получает его свойства
// 2) вызывает функцию и передает в неё свойства
initialCards.forEach(({name, link}) => {
  renderCard(name, link);
});

// 1) в функцию кладу свойства объекта для дальнейшего рендера новой карточки в grid
// 2) возвращает новый объект с необходимыми свойствами при помощью new и записывет в константу card
// 3) берет константу card с данными объекта и добавляет к ней новую сгенерированную карточку из класса Card
// 4) в блок grid из html-DOM, в который необходимо вставить карточки добавляет в начало списка сгенерированную в методе generateCard
function renderCard(name, link) {
  const card = new Card(name, link);
  const cardElement = card.generateCard();

  gridElements.prepend(cardElement);
}

// функция добавления новой карточки в grid(сбрасывает дефолтное поведенин кнопки)
function handlerSubmitAddCard(evt) {
  evt.preventDefault();
  renderCard(formInputPlace.value, formInputUrl.value);
  formInputPlace.value = '';
  formInputUrl.value = '';
  closeModal(addCardModal);
};

// 1) добавляет класс открытия модалки необходимой модалке
// 2) слушает документ и при клике на клавиатуру вызывает функцию
// 3) слушает необходимую модалку и при клике вызывает функцию
function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  popup.addEventListener('click', closePopupsByOverlay);
}

// 1) удаляет класс для закрытия модального окна
// 2) удаляет из документа слушатель по клику на клавиатуру и вызывает функцию
// 3) удаляет по клику из той модалки, которую мы подставим слушатель и вызывает функцию
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

// находит все наши формы и вызывает метод валидации
document.querySelectorAll(dataForms.form).forEach(form => {
	new FormValidator(dataForms, form).enableValidation();
})