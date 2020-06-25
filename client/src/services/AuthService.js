import decode from 'jwt-decode'

export default class AuthService {
  constructor(domain) {
    this.domain = domain || process.env.BASE_URL
    this.fetch = this.fetch.bind(this)
    this.login = this.login.bind(this)
    this.getToken = this.getToken.bind(this)
    this.getUserId = this.getUserId.bind(this)
  }

  login(email, password) {
    return this.fetch(`${this.domain}/user_token`, {
      method: 'POST',
      body: JSON.stringify({
        auth: {
          email,
          password
        }
      })
    }).then(res => {
      console.log("Response from authService.login:", res);
      this.setToken(res.jwt);
      return Promise.resolve(res);
    })
  }

  signup(user) {
    return this.fetch(`${this.domain}/users`, {
      method: 'POST',
      body: JSON.stringify({
        user: user
      })
    }).then(res => {
      console.log("Response from authService.signup:", res);
      this.setToken(res.jwt);
      return Promise.resolve(res);
    })
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token)
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    }
    catch(err) {
      return false;
    }
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  getUserId() {
    const token = decode(this.getToken());
    return token.sub
  }

  fetch(url, options) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if(this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    };

    return fetch(url, {
      headers,
      ...options
    })
    .then(response => {
      console.log("1. response check status: complete");
      return this._checkStatus(response)
    })
    .then(response => {
      console.log("2. response to json: complete");
      return response.json()
    });
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      console.log("1.5", response);
      return response
    } else {
      console.log("1.5 error", response);
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}
