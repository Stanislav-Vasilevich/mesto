let popupButtonOpen = document.querySelector('.profile__edit-img');
let popupButtonClose = document.querySelector('.popup__close-icon');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let formInputName = document.querySelector('.popup__name');
let formInputJob = document.querySelector('.popup__job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

popupButtonClose.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  formInputName.value.textContent = profileTitle;
  formInputJob.value.textContent = profileSubtitle;
});

popupButtonOpen.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});

popupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  profileTitle.textContent = formInputName.value;
  profileSubtitle.textContent = formInputJob.value;
});