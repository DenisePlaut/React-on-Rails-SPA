import React, {Component} from 'react'
import { CardDeck, Card } from 'react-bootstrap'
import AuthService from '../../services/AuthService'
import UserService from '../../services/UserService'
import PostService from '../../services/PostService'
import withAuth from '../../services/withAuth'

const Auth = new AuthService()
const User = new UserService()
const Post = new PostService()

const Timestamp = require('react-timestamp')

class Posts extends Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    Post.getPosts(Auth.getToken())
      .then(posts => {
        const promises = posts.map(post => {
          const { user_id } = post
          return User
            .getUserName(Auth.getToken(), user_id)
            .then(({ user_name }) => ({
              ...post,
              user_name,
            }))
        })
        return Promise.all(promises)
      })
      .then(posts => {
        console.log('Posts:', posts)
        this.setState({ posts })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="center">
        <h2>
          Posts
        </h2>
        <br />
        <CardDeck className="justify-content-center">
          {this.state.posts.map((post, index) =>
            <div className="post-card-container" key={`${post.id}${index}`}>
              <Card className="post-card">
                <Card.Img
                  className="post-card-image"
                  variant="top"
                  src={post.image_url}
                />
                <Card.Body>
                  <Card.Title>
                    {post.comment}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    - {post.user_name}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Uploaded: <Timestamp time={post.created_at} autoUpdate={60} />
                    <br />
                    <Timestamp time={post.created_at} format='full' />
                  </small>
                </Card.Footer>
              </Card>
            </div>
          ).reverse()}
        </CardDeck>
      </div>
    )
  }
}

export default withAuth(Posts)
