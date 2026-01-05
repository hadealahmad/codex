import ListPosts from './ListPosts'
import CreatePost from './CreatePost'
import EditPost from './EditPost'

const Pages = {
    ListPosts: Object.assign(ListPosts, ListPosts),
    CreatePost: Object.assign(CreatePost, CreatePost),
    EditPost: Object.assign(EditPost, EditPost),
}

export default Pages