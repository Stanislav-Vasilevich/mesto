const object = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: '.form__submit_active',
  inputErrorClass: '.form__input-error',
  errorClass: '.form__input-error_active'
}

const setEventListeners = (formElement) => {
const inputList = Array.from(formElement.querySelectorAll(`.form__input`));
const buttonElement = formElement.querySelector('.form__submit');
inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    isValid(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
});
};

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const formInput = formElement.querySelectorAll(inputSelector);
    const formButton = formElement.querySelectorAll(submitButtonSelector);
    const formError = formElement.querySelectorAll(`#${formInput.id}-error`);

    setEventListeners(formElement);
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_active');
  } else {
    buttonElement.classList.remove('form__submit_active');
  }
};

enableValidation(object);

