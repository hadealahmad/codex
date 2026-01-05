import ListComments from './ListComments'
import CreateComment from './CreateComment'
import EditComment from './EditComment'

const Pages = {
    ListComments: Object.assign(ListComments, ListComments),
    CreateComment: Object.assign(CreateComment, CreateComment),
    EditComment: Object.assign(EditComment, EditComment),
}

export default Pages