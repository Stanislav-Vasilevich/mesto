//4-я практическая работа
const popupButtonOpen = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__close-icon');
const popup = document.querySelector('.popup');
const form = document.querySelector('.form');
const formInputName = document.querySelector('.form__input_name');
const formInputJob = document.querySelector('.form__input_job');
const popupSubmitSave = document.querySelector('.form__submit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

popupButtonOpen.addEventListener('click', togglePopup);
popupButtonClose.addEventListener('click', togglePopup);
popupSubmitSave.addEventListener('click', togglePopup);

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

popupButtonOpen.addEventListener('click', togglePopupButton);

function togglePopupButton() {
  formInputName.value = profileTitle.textContent;
  formInputJob.value = profileSubtitle.textContent;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputJob.value;
});


//5-я проектная работа
//Сначала необходимо создать модальное окно по заданию из терминала, основные действия: 
// 1. копирую модальное окно в html и меняю классы, также прописываю их в файлах css
// 2. подключаю класс модального окна в js для поиска и отслеживания добавления и удаления класса открытия popup
// 3. подключаю класс кнопки открытия модального окна для добавления новых карточек к js и записываю в константу
// 4. подключаю класс кнопки закрытия модального окна для добавления новых карточек к js и записываю в константу
// 5. подключаю класс кнопки создания новых карточек в popup к js и записываю в константу
// 6. ставлю прослушку на константы кнопки открытия, закрытия модального окна и создания новых карточек из popup
// 7. создаю функцию открытия и закрытия модального окна с методом toggle
const modal = document.querySelector('.modal');
const modalButtonOpen = document.querySelector('.profile__add');
const modalButtonClose = document.querySelector('.modal__close-icon');
const modalSubmitCreate = document.querySelector('.signboard__submit');
modalButtonOpen.addEventListener('click', toggleModalEdit);
modalButtonClose.addEventListener('click', toggleModalEdit);
modalSubmitCreate.addEventListener('click', toggleModalEdit);
function toggleModalEdit() {
  modal.classList.toggle('modal_opened');
}









