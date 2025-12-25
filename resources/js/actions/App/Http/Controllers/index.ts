import FeedController from './FeedController'
import AuthController from './AuthController'
import VerificationController from './VerificationController'
import RepoController from './RepoController'
import PostController from './PostController'
import LikeController from './LikeController'
import CommentController from './CommentController'
import FollowController from './FollowController'
import NotificationController from './NotificationController'
import ProfileController from './ProfileController'
import AdminController from './AdminController'

const Controllers = {
    FeedController: Object.assign(FeedController, FeedController),
    AuthController: Object.assign(AuthController, AuthController),
    VerificationController: Object.assign(VerificationController, VerificationController),
    RepoController: Object.assign(RepoController, RepoController),
    PostController: Object.assign(PostController, PostController),
    LikeController: Object.assign(LikeController, LikeController),
    CommentController: Object.assign(CommentController, CommentController),
    FollowController: Object.assign(FollowController, FollowController),
    NotificationController: Object.assign(NotificationController, NotificationController),
    ProfileController: Object.assign(ProfileController, ProfileController),
    AdminController: Object.assign(AdminController, AdminController),
}

export default Controllers