const dataForms = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_active',
  inputErrorClass: '.form__input-error', //!Кажется, не используется вовсе?
  errorClass: 'form__input-error_active',
  inputError: 'form__input_type_error'
  //!имена классов то с точками, то без. важна последовательность - либо везде точки, либо нигде нет точек.
  //!Названия ключей мало что могут сказать, особенно errorClass
}

//перебирает каждую форму и отдаёт на обработку
const enableValidation = ({ formSelector, inactiveButtonClass, errorClass, inputError }) => {
  const formList = Array.from(document.querySelectorAll(formSelector)); //делает список форм
  console.log(formList); 
  formList.forEach((formSelector) => { //и для каждой:
	//!Селектор - это всё-таки про имя, даже правильнее было бы сказать "путь". Называть formSelector-ом сначала строчку с именем класса (именно что селектор), а потом в том же модуле элемент этого класса (никак не селектор) = ухудшать читаемость.
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault(); //убивает дефолтное событие кнопки
      console.log('Hi!');
    });
    setEventListeners(formSelector, inactiveButtonClass, errorClass, inputError); //вешает новые события
  });
};

//как конкретно она вешает новые события?
const setEventListeners = (formSelector, inactiveButtonClass, errorClass, inputError) => {
  const inputList = Array.from(formSelector.querySelectorAll(`.form__input`)); //Выбирает все инпуты из формы
  const buttonElement = formSelector.querySelector('.form__submit'); //и кнопку из неё
  //! .form__submit есть в dataForms, но не передано в функцию. У принимаемой на обработку формы таким образом кнопка всегда должна быть класса .form__submit, и передача в submitButtonSelector другого имени класса ничего не изменит.
  //!Аналогичная беда с inputSelector, он же .form__input.
  inputList.forEach((inputSelector) => {//для каждого инпута
    inputSelector.addEventListener('input', () => {//вешает валидацию
      isValid(formSelector, inputSelector, errorClass, inputError); //разбирается с тем, как выглядят инпуты и отображаются ли ошибки
	  //! вводит в заблуждение. isValid звучит как функция, возвращающая true или false
      toggleButtonState(inputList, buttonElement, inactiveButtonClass); //разбирается с кнопками: активны или неактивны?
    });
  });
};

const isValid = (formSelector, inputSelector, errorClass, inputError) => {
	//получила на вход: элемент формы, элемент валидируемого инпута, класс, которому принадлежат спаны с текстом ошибки и класс, в который добавляется инпут с ошибкой
	//и раздаёт инструкции, что делать, если всё хорошо и если всё плохо
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, errorClass, inputError);
  } else {
    hideInputError(formSelector, inputSelector, errorClass, inputError);
  }
};

//если всё плохо
const showInputError = (formSelector, inputSelector, errorMessage, errorClass, inputError) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`); //нашли куда класть ошибку

  inputSelector.classList.add(inputError); //объявили инпут ошибочным
  errorElement.textContent = errorMessage; //в элемент с ошибкой записали текст ошибки
  errorElement.classList.add(errorClass); // добавили элементу с ошибкой класс ошибки
};

//если всё хорошо
const hideInputError = (formSelector, inputSelector, errorClass, inputError) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);//нашли куда клали ошибку

  inputSelector.classList.remove(inputError); //убрали инпут из класса ошибочных
  errorElement.classList.remove(errorClass);  //элемент, где лежала ошибка, тоже убрали из класса ошибок
  errorElement.textContent = '';			  //и убрали из него текст
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
};

const activeButtonsPopups = (button, inactive) => {
  button.setAttribute('disabled', true);
  submitAddCard.classList.add(inactive);
  //!Я хотела написать вот так: "submitAddCard не существует в данном контексте. И вообще в модуле. Что эта строчка должна делать?"
  //!Оказалось, что submitAddCard - глобальная переменная из другого модуля. Очень плохая идея. К тому же, это, похоже, просто сама кнопка, с которой мы работаем? Она же есть у нас в аргументах, зачем брать её из глобальной переменной? Более того, мы разве inactive не добавили под именем inactiveButtonClass перед вызовом activeButtonsPopups?
};

const inactiveButtonsPopups = (button) => {
  button.removeAttribute('disabled');
};

//validation of data entry |<- Ваш комментарий	
//!неправда, валидация входных данных - это весь этот модуль. а это просто кнопку проверяет
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
	//получила на вход список инпутов, как зовут кнопку и какой класс у неактивных кнопок
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    activeButtonsPopups(buttonElement, inactiveButtonClass);
	// если хотя бы один инпут в inputList с ошибкой, выключаем кнопку
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    inactiveButtonsPopups(buttonElement);
	//всё ок? включаем
  }
};

enableValidation(dataForms); //отдаём инфу о форме функции, которая создаст события