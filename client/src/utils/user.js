import { jwtDecode } from "jwt-decode";

class User {
  _changed = true;
  _cache = {};

  /**
   *
   * @returns {{
   *    _id: string,
   *    username: string,
   *    email: string,
   *    userUpgrades: string,
   *    userSettings: string
   * }}
   */
  getUser() {
    return this.getData()?.data || {};
  }

  getData() {
    console.log(this._changed, this._cache);
    if (!this._changed) return this._cache;
    this._cache = this.getDecodedToken();
    this._changed = false;
    return this._cache;
  }

  isLoggedIn() {
    return !this.isLoggedIn();
  }

  isExpired() {
    const data = this.getData();
    if (!data.exp) return true;
    if (data.exp < Date.now() / 1000) {
      this.logout();
      return true;
    }
    return false;
  }

  setToken(token) {
    this._changed = true;
    localStorage.setItem("auth_token", token);
  }

  getToken() {
    return localStorage.getItem("auth_token");
  }

  getDecodedToken() {
    let token = this.getToken();
    if (token) return jwtDecode(this.getToken());
    return {};
  }

  logout() {
    localStorage.removeItem("auth_token");
  }
}

export default new User();
