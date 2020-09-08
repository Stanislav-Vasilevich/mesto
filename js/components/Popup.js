export default class Popup {
  constructor( popupSelector ) { // кладем нужный нам popup
    this._popupSelector = popupSelector
  }
  
  open() {
    this._popupSelector.classList.add('popup_opened')
  }

  close() {
    this._popupSelector.classList.remove('popup_opened')
  }

  _handleEscClose() {
    // содержит логику закрытия попапа клавишей Esc
  }

  setEventListeners() {
    // добавляет слушатель клика иконке закрытия попапа
  }

}
