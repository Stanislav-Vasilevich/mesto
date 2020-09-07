export {
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
  buttonClosePopupAdd,
  imgModalTitle,
  imgModalImg
}

// для index.js
const imageModal = document.querySelector('.popup_type_img')  // класс модального окна увеличенной картинки
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
]  // объект с содержимым для карточек в grid секцию

const dataForms = {
  form: '.form',
  input: '.form__input',
  submit: '.form__submit',
  inactiveButton: 'form__submit_active',
  errorMsg: 'form__input-error_active',
  invalidInput: 'form__input_type_error'
}  // объект настроек для Card.js

const gridElements = document.querySelector('.elements')  // блок разметки для вставки js кода карточек
const profileTitle = document.querySelector('.profile__title')  // заголовок из секции profile
const profileSubtitle = document.querySelector('.profile__subtitle')  // описание из секции profile
const editProfileModal = document.querySelector('.popup_type_edit-profile')  // модальное окно edit
const addCardModal = document.querySelector('.popup_type_add-cards')  // модальное окно add
const editForm = editProfileModal.querySelector('.form')  // форма в модальном окне edit
const addForm = addCardModal.querySelector('.form')  // форма в модальном окне add
const formInputName = editForm.querySelector('.form__input_name')  // первый input формы в модальном окне edit
const formInputJob = editForm.querySelector('.form__input_job')  // второй input формы в модальном окне edit
const formInputPlace = addForm.querySelector('.form__input_place')  // первый input формы в модальном окне Add
const formInputUrl = addForm.querySelector('.form__input_url')  // второй input формы в модальном окне Add
const buttonProfileEdit = document.querySelector('.profile__edit-button')  // кнопка открытия модального окна edit
const buttonOpenAddPopup = document.querySelector('.profile__add')  // кнопка открытия модального окна add
const buttonCloseModal = editProfileModal.querySelector('.popup__close-icon')  // 1) кнопка-крестик в модальном окне edit
const buttonClosePopupAdd = addCardModal.querySelector('.popup__close-icon')  // 2) кнопка-крестик в модальном окне add

// для Card.js
const imgModalTitle = imageModal.querySelector('.popup__title-img')  // в модальном окне увеличенной картинки класс текста-описания
const imgModalImg = imageModal.querySelector('.popup__img')  // в модальном окне увеличенной картинки класс этой картинки