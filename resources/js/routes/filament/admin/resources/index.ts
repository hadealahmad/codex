import comments from './comments'
import posts from './posts'
import users from './users'

const resources = {
    comments: Object.assign(comments, comments),
    posts: Object.assign(posts, posts),
    users: Object.assign(users, users),
}

export default resources