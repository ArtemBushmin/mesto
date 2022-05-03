export default class UserInfo {
  constructor(name, job) {
    this._authorName = document.getElementById(name);
    this._authorJob = document.getElementById(job);
  }

  getUserInfo () {
    this._userInfo = {name:this._authorName.textContent, job:this._authorJob.textContent};
    return this._userInfo;
  }

  setUserInfo (name, job) {
    this._authorName.textContent = name;
    this._authorJob.textContent = job;
  }
}
