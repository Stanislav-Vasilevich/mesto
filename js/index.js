import Card from './Card.js';
import FormValidator from './FormValidator.js';

// нашел в документе класс модального окна из grid-секции и записал в константу
const imageModal = document.querySelector('.popup_type_img');

// объект с содержимым для карточек в grid секцию
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

// объект настроек для Card.js
const dataForms = {
  form: '.form',
  input: '.form__input',
  submit: '.form__submit',
  inactiveButton: 'form__submit_active',
  errorMsg: 'form__input-error_active',
  invalidInput: 'form__input_type_error'
}

// блок разметки для вставки js кода карточек
const gridElements = document.querySelector('.elements');

// 1) заголовок из секции profile
// 2) описание из секции profile
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// 1) модальное окно edit
// 2) модальное окно add
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-cards');

// 1) нашли форму в модальном окне edit
// 2) нашли форму в модальном окне add
const editForm = editProfileModal.querySelector('.form');
const addForm = addCardModal.querySelector('.form');

// 1) нашли первое поле ввода в модальном окне edit
// 2) нашли второе поле ввода в модальном окне edit
const formInputName = editForm.querySelector('.form__input_name');
const formInputJob = editForm.querySelector('.form__input_job');

// 1) первый input формы в модальном окне Add
// 2) второй input формы в модальном окне Add
const formInputPlace = addForm.querySelector('.form__input_place');
const formInputUrl = addForm.querySelector('.form__input_url');

// 1) кнопка открытия модального окна edit
// 2) кнопка открытия модального окна add
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const buttonOpenAddPopup = document.querySelector('.profile__add'); 

// 1) кнопка(крестик) в модальном окне edit
// 2) кнопка(крестик) в модальном окне add
const buttonCloseModal = editProfileModal.querySelector('.popup__close-icon');
const buttonClosePopupAdd = addCardModal.querySelector('.popup__close-icon');

//слушает модальное окно Edit и при клике вызывает функцию
buttonProfileEdit.addEventListener('click', () => {
  formInputName.value = profileTitle.textContent; 
  formInputJob.value = profileSubtitle.textContent;
  openModal(editProfileModal);
});

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

// 1) слушает документ на нажатие клавиш клавиатуры
// 2) если нажали клавишу Esc, тогда вызывает функцию
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    handleClosePopup();
  }
});

// 1) слушает документ на клик
// 2) если кликнули по элементу с классом 'popup__overlay', тогда вызывает функцию
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__overlay')) {
    handleClosePopup();
  }
});

// находит все наши формы и вызывает метод валидации
document.querySelectorAll(dataForms.form).forEach(form => {
	new FormValidator(dataForms, form).enableValidation();
})

// обработчик отправки формы edit
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
  const card = new Card(name, link, '.grid__elements');
  const cardElement = card.generateCard();

  gridElements.prepend(cardElement);
}

// функция добавления новой карточки в grid(сбрасывает дефолтное поведенин кнопки)
function handlerSubmitAddCard(evt) {
  evt.preventDefault();
  renderCard(formInputPlace.value, formInputUrl.value);
  addForm.reset();
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

// в "модальное окно из grid-секции" добавляет класс, который откроет popup
export function handleOpenPopup() {
  imageModal.classList.add('popup_opened');
}

// функция закрытия popup с картинкой(путем удаления класса)
function handleClosePopup() {
  imageModal.classList.remove('popup_opened');
}

// 1) находит крестик в открытом модальном окне Img
// 2) прослушивает крестик и по клику вызывает функцию закрытия popup с картинкой
const buttonClosePopupImg = imageModal.querySelector('.popup__close-icon');
buttonClosePopupImg.addEventListener('click', () => {
  handleClosePopup();
});

