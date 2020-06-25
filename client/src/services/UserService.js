import AuthService from './AuthService'

export default class UserService extends AuthService {
  getUserName(token, id) {
    return this.fetch(`${this.domain}/user_name/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'GET'
    }).then((res) => {
      console.log(res)
      return Promise.resolve(res)
    })
  }
}
