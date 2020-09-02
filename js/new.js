const formEdit = document.querySelector('.form__edit');
const formAdd = document.querySelector('.form__add');

const dataForms = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_active',
  inputErrorClass: '.form__input-error',
  errorClass: 'form__input-error_active',
  inputError: 'form__input_type_error'
}

class FormValidator {
  constructor( data, formElement ) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputError = data.inputError;
    this._formElement = formElement;
  } 

  // публичный метод включает проверку валидации
  // 1) слушает кнопку конкретной формы
  // 2) по клику сбратывает дефолтное поведение браузера
  // 3) вызывает функцию слушатель: с нужной формой, неактивной кнопкой отправки, красным текстом ошибки и красной рамкой
  enableValidation() {
    // console.log(this._formElement);
    this._formElement.addEventListener('submit', () => {
      // console.log('hq');
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  // функция слушает элементы формы
  // 1) находит во всех формах все поля ввода, преобразует их в массив и записывает в константу
  // 2) находит кнопку отправки в той форме, которую открыли и записывает в константу
  // 3) обходит все поля ввода конкретной формы
  // 4) слушает, если кликнули по полю ввода, тогда вызывает функцию валидации со стилями ошибки текста и стилями рамки
  // 5) слушает, если кликнули по полю ввода, тогда вызывает функцию активной-неактивной кнопки с параметрами: проверки полей, нужной кнопки и ее активации
  _setEventListeners() {
    const inputList = this._formElement.querySelectorAll(this._inputSelector);
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    // console.log(inputList);
    // console.log(buttonElement);
    inputList.forEach((inputs) => {
      inputs.addEventListener('input', () => {
        // console.log('изменил поле ввода');
        this._isValid(this._inputSelector);
        this._toggleButtonState(buttonElement);
      });
    });
  };

  // функция валидации
  // 1) если данная форма валидна
  // 2) вызывает функцию: конкретной формы, ее полей ввода, сообщением ошибки, стилями ошибки текста, красной рамкой
  // 3) если не валидна
  // 4) вызывает функцию: конкретной формы, ее полей ввода, стилями ошибки текста, стилями рамки
  _isValid(inputSelector, errorClass, inputError) {
    console.log('сработала функция _isValid');
    if (!this._inputSelector.validity.valid) {
      console.log('невалидно, показать ошибку!');
      // this._showInputError();
    } else {
      console.log('валидно, скрыть ошибку!');
      // this._hideInputError();
    }
    console.log(this._inputSelector);
  };

  // функция показывает текст ошибки поля ввода
  // 1) находит форму, внутри находит id текста ошибки
  // 2) к конкретной форме добавляет класс ошибки
  // 3) к конкретному полю ввода добавляет текст дефолтной валидации
  // 4) к конкретному полю ввода добавляет стили текста ошибки
  _showInputError(formSelector, inputSelector, errorMessage, errorClass, inputError) {
    const errorElement = this._formSelector.querySelector(`#${this._inputSelector.id}-error`);
  
    this._inputSelector.classList.add(this._inputError);
    errorElement.textContent = this._errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // функция скрывает текст ошибки поля ввода
  // 1) находит внутри нашей формы id текста ошибки и записывает в константу
  // 2) у этой формы удаляет класс ошибки
  // 3) у конкретного поля ввода удаляет текст дефолтной валидации
  // 4) конкретному полю ввода ставит пустую строку
  _hideInputError(formElement, formSelector, inputSelector, errorClass, inputError) {
    const errorElement = this._formElement.querySelector(`#${this._inputSelector.id}-error`);
  
    this._inputSelector.classList.remove(this._inputError);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // функция допустимого ввода
  // 1) проверяет поля ввода на ошибки в форме и возвращает результат
  // 2) проверяет форму на валидацию, если невалидна возвращает ошибку(false), если валидно, возвращает true
  _hasInvalidInput(inputList) {
    return inputList.some((inputSelector) => {
      return !inputSelector.validity.valid;
    })
  };

  // функция неактивной кнопки
  // 1) кнопке из параметра добавляет атрибут disabled
  // 2) кнопке формы добавляет класс из параметра
  _activeButtonsPopups(button, inactive) {
    button.setAttribute('disabled', true);
    this._submitButtonSelector.classList.add(inactive);
  };

  // функция активной кнопки
  // 1) кнопке из параметра удаляет атрибут disabled
  _inactiveButtonsPopups = (button) => {
    button.removeAttribute('disabled');
  };

  // если поле имеет недопустимый ввод в массиве полей ввода формы
  // 1) добавляет класс 'form__submit_active', который делает кнопку неактивной
  // 2) вызывает функцию: с конкретной кнопкой и ее неактивными стилями
  // 3) иначе удаляет класс 'form__submit_active', который делает кнопку активной
  // 4) вызывает функцию: с конкретной кнопкой и ее активными стилями
  _toggleButtonState() {
    if (hasInvalidInput(inputList, buttonElement, inactiveButtonClass)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      this._activeButtonsPopups(buttonElement, this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      this._inactiveButtonsPopups(buttonElement);
    }
  };
}

const editFormNewClass = new FormValidator(dataForms, formEdit);
editFormNewClass.enableValidation();

// const editFormNewClass = new FormValidator(dataForms, formEdit);
// const addFormNewClass = new FormValidator(dataForms, formAdd);
// const editValidate = editFormNewClass.enableValidation();
// const addValidate = editFormNewClass.enableValidation();