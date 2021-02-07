class FormValidator {
	constructor({
		  input,
		  submit,
		  inactiveButton,
		  errorMsg, 
		  invalidInput
	}, formElem)
	{
		this.input = input;
		this.submit = submit;
		this.inactiveButton = inactiveButton;
		this.errorMsg = errorMsg;
		this.invalidInput = invalidInput;
		this.form = formElem;
	}

	enableValidation() {
		this.form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._toggleButtonState();
			this._inactiveButtonInPopup(); // default button not active
		});
    this._setEventListeners();
	};
	
	// listen elements forms
	_setEventListeners() {
	  this.inputList = Array.from(this.form.querySelectorAll(this.input));
		this.button = this.form.querySelector(this.submit);
		this._toggleButtonState();
	  this.inputList.forEach((input) => {
			input.addEventListener('input', () => {
		  	this._toggleInputState(input);
		  	this._toggleButtonState();
			});
	  });
	};
	
	// if input not valid return error
	_hasInvalidInput() {
	  return this.inputList.some((input) => {
			return !input.validity.valid;
	  })
	};
	
	// toggle status input
	_toggleInputState(input) { // бывшая isValid
		if (!input.validity.valid) {
			this._showInputError(input);
		} else {
			this._hideInputError(input);
		}
	}
	
	// show error
	_showInputError(input) {
		const errorElem = this.form.querySelector(`#${input.id}-error`);
		input.classList.add(this.invalidInput);
		errorElem.textContent = input.validationMessage;
		errorElem.classList.add(this.errorMsg);
	};
	
	// delete error
	_hideInputError(input) {
		const errorElem = this.form.querySelector(`#${input.id}-error`);

		input.classList.remove(this.invalidInput);
		errorElem.classList.remove(this.errorMsg);
		errorElem.textContent = '';
	};

	// status button
	_toggleButtonState() {
		if (this._hasInvalidInput(this.inputList)) {
			this.button.classList.add(this.inactiveButton);
			this._inactiveButtonInPopup();
		} else {
			this.button.classList.remove(this.inactiveButton);
			this._activeButtonInPopup();  // всё ок? включаем
		}
	}
	
	// no click
	_inactiveButtonInPopup() {
		this.button.setAttribute('disabled', true);
	}

	// click
	_activeButtonInPopup() {
		this.button.removeAttribute('disabled');
	}
};

export default FormValidator;