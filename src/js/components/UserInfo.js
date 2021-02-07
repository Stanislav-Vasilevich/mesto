export default class UserInfo {
  constructor( { elemName, elemInfo } ) {
    this._userName = document.querySelector(elemName);
    this._userInfo = document.querySelector(elemInfo);
  }

  getUserInfo = () => {
    return {'name': this._userName.innerHTML, 'info': this._userInfo.innerHTML};
  }

  setUserInfo = ({name, info}) => {
    this._userName.innerHTML = name;
    this._userInfo.innerHTML = info;
  }
}