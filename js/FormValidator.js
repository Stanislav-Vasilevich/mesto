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
	
	// публичный метод
	enableValidation() {
		this.form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._activeButtonsPopups();
			this._toggleButtonState();
		});
    this._setEventListeners(); // вешает новые события
	};
	
	// слушает элементы формы
	_setEventListeners() {
	  this.inputList = Array.from(this.form.querySelectorAll(this.input)); // Выбирает все инпуты из формы
		this.button = this.form.querySelector(this.submit); // и кнопку из неё
		this._toggleButtonState(); // при первом открытии модальных окон кнопки делает неактивными
	  this.inputList.forEach((input) => { // для каждого инпута
		input.addEventListener('input', () => { // вешает валидацию?
		  this._toggleInputState(input); // разбирается с тем, как выглядят инпуты и отображаются ли ошибки.
			this._toggleButtonState(); // проверяет и изменяет класс, а так же свойство дизейбл у кнопки
		});
	  });
	};
	
	// 1) если хотя бы один input в массиве не валидный, тогда возвращает ошибку
	_hasInvalidInput() {
	  return this.inputList.some((input) => {
			return !input.validity.valid;
	  })
	};
	
	// переключает состояние input
	_toggleInputState(input) { // бывшая isValid
		if (!input.validity.valid) {
			this._showInputError(input);
		} else {
			this._hideInputError(input);
		}
	}
	
	// показать ошибку
	_showInputError(input) {
		const errorElem = this.form.querySelector(`#${input.id}-error`); // нашли куда класть ошибку
		input.classList.add(this.invalidInput); // объявили инпут ошибочным
		errorElem.textContent = input.validationMessage; // в элемент с ошибкой записали текст ошибки
		errorElem.classList.add(this.errorMsg); // добавили элементу с ошибкой класс ошибки
	};
	
	// скрыть ошибку
	_hideInputError(input) {
		const errorElem = this.form.querySelector(`#${input.id}-error`);//нашли куда клали ошибку

		input.classList.remove(this.invalidInput); // убрали инпут из класса ошибочных
		errorElem.classList.remove(this.errorMsg);  // элемент, где лежала ошибка, тоже убрали из класса ошибок
		errorElem.textContent = '';			  // и убрали из него текст
	};
	
	// состояние кнопки
	_toggleButtonState() {
		if (this._hasInvalidInput(this.inputList)) {
			this.button.classList.add(this.inactiveButton);
			this._activeButtonsPopups();    // если хотя бы один инпут в inputList с ошибкой, выключаем кнопку
		} else {
			this.button.classList.remove(this.inactiveButton);
			this._inactiveButtonsPopups();  // всё ок? включаем
		}
	}
	
	// делает кнопку неактивной добавляя disabled
	_activeButtonsPopups() {
		this.button.setAttribute('disabled', true);
	}

	// делает кнопку активной удаляя disabled
	_inactiveButtonsPopups() {
		this.button.removeAttribute('disabled');
	}
};

export default FormValidator;