import AuthService from './AuthService'

export default class PostService extends AuthService {
  getPosts(token) {
    return this.fetch(`${this.domain}/posts`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'GET'
    }).then((res) => {
      return Promise.resolve(res)
    })
  }

  createPost(token, post) {
    return this.fetch(`${this.domain}/posts`, {
      headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify({
        post: post
      })
    }).then((res) => {
      return Promise.resolve(res)
    })
  }
}
