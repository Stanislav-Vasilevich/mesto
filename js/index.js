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
import Section from './components/Section.js'
import Popup from './components/Popup.js'
import PopupWithForm from './components/PopupWithForm.js'
import PopupWithImage from './components/PopupWithImage.js'


// отрисовка изначально присутствующих карточек 
const cardsSection = new Section({'items': initialCards, 'renderer': renderCard}, '.elements');
cardsSection.render();

// функция добавления новой карточки в grid(сбрасывает дефолтное поведенин кнопки)
const handlerSubmitAddCard = (field_data) => {
  cardsSection.addItem({'name': field_data['form-title'], 'link': field_data['form-subtitle']}) 
} 

// обработчик отправки формы edit
const handlerSubmitForm = (field_data) => {
  proficonstitle.textContent = field_data['form-title']; 
  profileSubtitle.textContent = field_data['form-subtitle'];
}

// слушает модальное окно Edit и при клике вызывает функцию
const editUserPopup = new PopupWithForm('.popup_type_edit-profile', handlerSubmitForm);
buttonProfileEdit.addEventListener('click', () => {
  editUserPopup.open();
}); 

// слушает кнопку редактирования данных в profile и при клике вызывает функцию с определенной модалкой
const addCardPopup = new PopupWithForm('.popup_type_add-cards', handlerSubmitAddCard);
buttonOpenAddPopup.addEventListener('click', () => {
	addCardPopup.open();
});

// находит все наши формы и вызывает новый экземпляр с методом валидации
document.querySelectorAll(dataForms.form).forEach(form => {
  new FormValidator(dataForms, form).enableValidation();
});


// открывает модальное окно с большой картинкой и заголовком
function handleCardClick(evt) {
  const img = evt.target;
  const cardPopup = new PopupWithImage('.popup_type_img', {'src': img.src, 'alt': img.alt});
  cardPopup.open();
}

// рендерит карточки в нужный нам контейнер
function renderCard({name, link}, container) {
  const card = new Card(arguments[0].name, arguments[0].link, '.grid__elements', handleCardClick);
  const cardElement = card.generateCard();

  container.prepend(cardElement);
}
