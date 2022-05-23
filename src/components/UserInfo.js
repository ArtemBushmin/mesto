export default class UserInfo {
  constructor(name, job, photo) {
    this._authorName = document.querySelector(name);
    this._authorJob = document.querySelector(job);
    this._authorPhoto = document.querySelector(photo);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._authorName.textContent,
      job: this._authorJob.textContent,
    };
    return this._userInfo;
  }

  setUserInfo(name, job, photo, id) {
    this._authorName.textContent = name;
    this._authorJob.textContent = job;
    this._authorPhoto.src = photo;
    this.id = id;
  }

  setUserAvatar(photo) {
    this._authorPhoto.src = photo;
  }
}
