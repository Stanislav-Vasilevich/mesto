const dataForms = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_active',
  inputErrorClass: '.form__input-error',
  errorClass: 'form__input-error_active',
  inputError: 'form__input_type_error'
}

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, inputError }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formSelector, inactiveButtonClass, errorClass, inputError);
  });
};

const setEventListeners = (formSelector, inactiveButtonClass, errorClass, inputError) => {
  const inputList = Array.from(formSelector.querySelectorAll(`.form__input`));
  const buttonElement = formSelector.querySelector('.form__submit');
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      isValid(formSelector, inputSelector, errorClass, inputError);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const isValid = (formSelector, inputSelector, errorClass, inputError) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, errorClass, inputError);
  } else {
    hideInputError(formSelector, inputSelector, errorClass, inputError);
  }
};

const showInputError = (formSelector, inputSelector, errorMessage, errorClass, inputError) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);

  inputSelector.classList.add(inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formSelector, inputSelector, errorClass, inputError) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);

  inputSelector.classList.remove(inputError);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  })
};

const activeButtonsPopups = (button) => {
  button.setAttribute('disabled', true);
};

const inactiveButtonsPopups = (button) => {
  button.removeAttribute('disabled');
};

//validation of data entry
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    activeButtonsPopups(buttonElement);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    inactiveButtonsPopups(buttonElement);
  }
};

enableValidation(dataForms);