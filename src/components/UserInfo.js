export default class UserInfo {
    constructor(userInputSelector) {
        this._nameUserSelector = userInputSelector.nameUserSelector;
        this._jobUserSelector = userInputSelector.jobUserSelector;
        this._userData = {};
        this._nameUserElement = document.querySelector(this._nameUserSelector);
        this._jobUserElement = document.querySelector(this._jobUserSelector)
    }

    getUserInfo() {
        this._userData.name = this._nameUserElement.textContent;
        this._userData.job = this._jobUserElement.textContent;
        return this._userData
    }

    setUserInfo(nameValue, jobValue) {
        this._nameUserElement.textContent = nameValue;
        this._jobUserElement.textContent = jobValue;
    }
}