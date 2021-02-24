export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  // get data from server
  getUserInfo() {
    return fetch(`${this._url}users/me/`, {
      method: 'GET',
      headers: {
        authorization: '5ba9e6d0-bea2-43fd-97e6-f314993d4839',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  // get data user from server
  getDataCards() {
    return fetch(`${this._url}cards/`, {
      method: 'GET',
      headers: {
        authorization: '5ba9e6d0-bea2-43fd-97e6-f314993d4839',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  // patch data user avatar from server
  patchUserAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: '5ba9e6d0-bea2-43fd-97e6-f314993d4839',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data['form-avatar'],
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  // patch data user from server
  patchUserInfo(data) {
    return fetch(`${this._url}users/me/`, {
      method: 'PATCH',
      headers: {
        authorization: '5ba9e6d0-bea2-43fd-97e6-f314993d4839',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data['form-title'],
        about: data['form-subtitle'],
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  // post data user by server
  postDataCard(data) {
    return fetch(`${this._url}cards/`, {
      method: 'POST',
      headers: {
        authorization: '5ba9e6d0-bea2-43fd-97e6-f314993d4839',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data['form-title'],
        link: data['form-subtitle'],
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  // delete card from server
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '5ba9e6d0-bea2-43fd-97e6-f314993d4839',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  // put like by server
  putLikeCard(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: '5ba9e6d0-bea2-43fd-97e6-f314993d4839',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  // delete like from server
  deleteLikeCard(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: '5ba9e6d0-bea2-43fd-97e6-f314993d4839',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }
}
