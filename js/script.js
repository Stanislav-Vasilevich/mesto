const popupButtonOpen = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__close-icon');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const formInputName = document.querySelector('.popup__input_name');
const formInputJob = document.querySelector('.popup__input_job');
const popupSubmitClose = document.querySelector('.popup__submit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

popupButtonOpen.addEventListener('click', togglePopup);
popupButtonClose.addEventListener('click', togglePopup);
popupSubmitClose.addEventListener('click', togglePopup);

popupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  formInputName.value.textContent = profileTitle;
  formInputJob.value.textContent = profileSubtitle;

  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputJob.value;
});