class FormValidator {
	constructor({
		  input,
		  submit,
		  inactiveButton,
		  errorMsg, 
		  invalidInput
		  //class names
	}, formElem)
	{
		for (let key in arguments[0]) {
			this[key] = arguments[0][key];
		}
		
		this.form = formElem;
	}
	
	enableValidation = () => {
      this.setEventListeners(); //вешает новые события
	};
	
	setEventListeners = () => {
	  this.inputList = Array.from(this.form.querySelectorAll(this.input)); //Выбирает все инпуты из формы
	  this.button = this.form.querySelector(this.submit); //и кнопку из неё
	  this.inputList.forEach((input) => {//для каждого инпута
	  input.addEventListener('input', () => {//вешает валидацию?
		  this.toggleInputState(input); //разбирается с тем, как выглядят инпуты и отображаются ли ошибки.
		  this.toggleButtonState(); //разбирается с кнопкой: активна или неактивна?
		});
	  });
	};
	
	hasInvalidInput = () => {
	  return this.inputList.some((input) => {
		return !input.validity.valid;
	  })
	};
	
	toggleInputState = (input) => { //бывшая isValid
		if (!input.validity.valid) {
			this.showInputError(input);
		} else {
			this.hideInputError(input);
		}
	}
	
	showInputError = (input) => {
		const errorElem = this.form.querySelector(`#${input.id}-error`); //нашли куда класть ошибку
		console.log('error element:', errorElem);
		input.classList.add(this.invalidInput.slice(1)); //объявили инпут ошибочным
		errorElem.textContent = input.validationMessage; //в элемент с ошибкой записали текст ошибки
		console.log('message:', input.validationMessage);
		errorElem.classList.add(this.errorMsg.slice(1)); // добавили элементу с ошибкой класс ошибки
	};
	
	hideInputError = (input) => {
		const errorElem = this.form.querySelector(`#${input.id}-error`);//нашли куда клали ошибку

		input.classList.remove(this.invalidInput.slice(1)); //убрали инпут из класса ошибочных
		errorElem.classList.remove(this.errorMsg.slice(1));  //элемент, где лежала ошибка, тоже убрали из класса ошибок
		errorElem.textContent = '';			  //и убрали из него текст
	};
	
	toggleButtonState = () => {
		if (this.hasInvalidInput(this.inputList)) {
			this.button.classList.add(this.inactiveButton.slice(1));
			this.activeButtonsPopups();
			// если хотя бы один инпут в inputList с ошибкой, выключаем кнопку
		} else {
			this.button.classList.remove(this.inactiveButton.slice(1));
			this.inactiveButtonsPopups();
			//всё ок? включаем
		}
	}
	
	activeButtonsPopups = () => {
		this.button.setAttribute('disabled', true);
	}
	inactiveButtonsPopups = () => {
		this.button.removeAttribute('disabled');
	}
};

export default FormValidator;
/*
function foo() {};

function foo2(arg){
arg(4, 3);

};

foo2(foo); //передали функцию
foo2(foo()); //передали результат работы функции

function sum(a, b) {
  return a + b;
}

foo2(sum);
foo2(sum(3, 5));

*/