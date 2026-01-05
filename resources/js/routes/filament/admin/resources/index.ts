import posts from './posts'
import users from './users'

const resources = {
    posts: Object.assign(posts, posts),
    users: Object.assign(users, users),
}

export default resources