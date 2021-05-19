export default class UserInfo {
    constructor(userInputSelector) {
        this._nameUserSelector = userInputSelector.nameUserSelector;
        this._jobUserSelector = userInputSelector.jobUserSelector;
        this._userData = {};
    }

    getUserInfo() {
        this._userData.name = document.querySelector(this._nameUserSelector).textContent;
        this._userData.job = document.querySelector(this._jobUserSelector).textContent;
        return this._userData
    }

    setUserInfo(nameValue, jobValue) {
        document.querySelector(this._nameUserSelector).textContent = nameValue;
        document.querySelector(this._jobUserSelector).textContent = jobValue;
    }
}