let popupButtonOpen = document.querySelector('.profile__edit-button');
let popupButtonClose = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let form = document.querySelector('.form');
let formInputName = document.querySelector('.form__input_name');
let formInputJob = document.querySelector('.form__input_job');
let popupSubmitSave = document.querySelector('.form__submit');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

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

addCard.addEventListener('click', () => {})