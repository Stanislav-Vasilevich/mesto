const dataForms = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_active',
  inputErrorClass: '.form__input-error',
  errorClass: 'form__input-error_active',
  inputError: 'form__input_type_error'
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

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(dataForms.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dataForms.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(dataForms.inputError);
  errorElement.classList.remove(dataForms.errorClass);
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement, errorClass) => {
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

//validation of data entry
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(dataForms.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(dataForms.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

enableValidation(dataForms);
