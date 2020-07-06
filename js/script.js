let popupOpened = document.querySelector('popup_opened');

popupOpened.addEventListener('click', function openEditPopup() {
  console.log(openEditPopup);
  // popupOpened.classList('popup_opened');
});

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__name');
    let jobInput = document.querySelector('.popup__job');

    // Получите значение полей из свойства value
    nameInput.getAttribute('value');
    // Выберите элементы, куда должны быть вставлены значения полей
    jobInput.getAttribute('value');
    // Вставьте новые значения с помощью textContent
    nameInput.textContent = 'Жак-Ив Кусто';

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);