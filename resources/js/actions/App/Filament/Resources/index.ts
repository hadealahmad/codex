import Posts from './Posts'
import Users from './Users'

const Resources = {
    Posts: Object.assign(Posts, Posts),
    Users: Object.assign(Users, Users),
}

export default Resources