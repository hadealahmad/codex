import Comments from './Comments'
import Posts from './Posts'
import Users from './Users'

const Resources = {
    Comments: Object.assign(Comments, Comments),
    Posts: Object.assign(Posts, Posts),
    Users: Object.assign(Users, Users),
}

export default Resources