export default class UserInfo {
  constructor( { userName, userInfo } ) {
    this._userName = document.querySelector(userName);
    this._UserInfo = document.querySelector(userInfo);
  }
  getUserInfo = () => {
    return {'name': this._userName.innerHTML, 'info': this._userInfo.innerHTML};
  }

  setUserInfo = ({name, info}) => {
    this._userName.innerHTML = name;
	this._userInfo.innerHTML = info;
  }
}