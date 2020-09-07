// константы
import { 
  imageModal, 
  initialCards, 
  dataForms, 
  gridElements, 
  profileTitle, 
  profileSubtitle, 
  editProfileModal, 
  addCardModal, 
  editForm, 
  addForm, 
  formInputName, 
  formInputJob, 
  formInputPlace, 
  formInputUrl, 
  buttonProfileEdit, 
  buttonOpenAddPopup, 
  buttonCloseModal, 
  buttonClosePopupAdd 
} 
from './utils/constants.js'

// классы js
import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js'

//слушает модальное окно Edit и при клике вызывает функцию
buttonProfileEdit.addEventListener('click', () => {
  formInputName.value = profileTitle.textContent  
  formInputJob.value = profileSubtitle.textContent 
  openModal(editProfileModal) 
}) 

//слушает кнопку в модальном окне Edit и при клике вызывает функцию
editForm.addEventListener('submit', handlerSubmitForm) 

//слушает кнопку-крестик в модальном окне Edit и при клике вызывает функцию с определенной модалкой
buttonCloseModal.addEventListener('click', () => {
  closeModal(editProfileModal) 
}) 

//слушает кнопку редактирования данных в profile и при клике вызывает функцию с определенной модалкой
buttonOpenAddPopup.addEventListener('click', () => {
  openModal(addCardModal) 
}) 

//слушает кнопку сохранения в модалке add и при клике вызывает функцию
addForm.addEventListener('submit', handlerSubmitAddCard) 

//слушает кнопку-крестик закрытия модалки add и при клике вызывает функцию с определенной модалкой
buttonClosePopupAdd.addEventListener('click', () => {
  closeModal(addCardModal) 
}) 

// 1) слушает документ на нажатие клавиш клавиатуры
// 2) если нажали клавишу Esc, тогда вызывает функцию
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    handleClosePopup() 
  }
}) 

// 1) слушает документ на клик
// 2) если кликнули по элементу с классом 'popup__overlay', тогда вызывает функцию
document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__overlay')) {
    handleClosePopup() 
  }
}) 

// находит все наши формы и вызывает новый экземпляр с методом валидации
document.querySelectorAll(dataForms.form).forEach(form => {
	new FormValidator(dataForms, form).enableValidation() 
})

// обработчик отправки формы edit
function handlerSubmitForm(evt) {
  evt.preventDefault() 
  profileTitle.textContent = formInputName.value 
  profileSubtitle.textContent = formInputJob.value 
  closeModal(editProfileModal) 
}

// 1) функция обходит объект и получает его свойства
// 2) вызывает функцию и передает в неё свойства
initialCards.forEach(({name, link}) => {
  renderCard(name, link) 
}) 

// 1) в функцию кладу свойства объекта для дальнейшего рендера новой карточки в grid
// 2) создаю экземпляр новой карточки и подставляю необходимые данные, вызывая публичный метод
// 3) вставляю в секцию grid в конец этот экземпляр карточки
function renderCard(name, link) {
  const card = new Card(name, link, '.grid__elements');
  const cardElement = card.generateCard();

  gridElements.prepend(cardElement);
}

// функция добавления новой карточки в grid(сбрасывает дефолтное поведенин кнопки)
function handlerSubmitAddCard(evt) {
  evt.preventDefault() 
  renderCard(formInputPlace.value, formInputUrl.value) 
  addForm.reset() 
  closeModal(addCardModal) 
} 

// 1) добавляет класс открытия модалки необходимой модалке
// 2) слушает документ и при клике на клавиатуру вызывает функцию
// 3) слушает необходимую модалку и при клике вызывает функцию
function openModal(popup) {
  popup.classList.add('popup_opened') 
  document.addEventListener('keydown', closePopupByEscape) 
  popup.addEventListener('click', closePopupsByOverlay) 
}

// 1) удаляет класс для закрытия модального окна
// 2) удаляет из документа слушатель по клику на клавиатуру и вызывает функцию
// 3) удаляет по клику из той модалки, которую мы подставим слушатель и вызывает функцию
function closeModal(popup) {
  popup.classList.remove('popup_opened') 
  document.removeEventListener('keydown', closePopupByEscape) 
  popup.removeEventListener('click', closePopupsByOverlay) 
}

// 1) находит класс открытия модалки в документе и записывает в переменную popup
// 2) если в свойстве event есть класс overlay, тогда вызывает функцию с необходимой модалкой
function closePopupsByOverlay(evt) {
  const popup = document.querySelector('.popup_opened') 
  if(evt.target.classList.contains('popup__overlay')) {
    closeModal(popup) 
  }
}

// 1) находит класс открытия модалки в документе и записывает в переменную popup
// 2) если свойство key равно 'Escape', тогда вызывает функцию с переменной popup
function closePopupByEscape(evt) {
  const popup = document.querySelector('.popup_opened') 
  if (evt.key === 'Escape') {
    closeModal(popup) 
  }
}

// в "модальное окно из grid-секции" добавляет класс, который откроет popup
export function handleOpenPopup() {
  imageModal.classList.add('popup_opened') 
}

// функция закрытия popup с картинкой(путем удаления класса)
function handleClosePopup() {
  imageModal.classList.remove('popup_opened') 
}

// 1) находит крестик в открытом модальном окне Img
// 2) прослушивает крестик и по клику вызывает функцию закрытия popup с картинкой
const buttonClosePopupImg = imageModal.querySelector('.popup__close-icon') 
buttonClosePopupImg.addEventListener('click', () => {
  handleClosePopup() 
}) 

