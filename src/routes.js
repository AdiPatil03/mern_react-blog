import Login from './component/Login';
import PostForm from './component/PostForm';
import SignUp from './component/SignUp';
import Home from './component/Home';
import Post from './component/Post';
import Tag from './component/Tag';
import Archive from './component/Archive';

const routes = () => ([
    {path: '/', component: Home, exact: true},
    {path: '/login', component: Login, exact: false},
    {path: '/post/:slug', component: Post, exact: false},
    {path: '/tags/:tag', component: Tag, exact: false},
    {path: '/archives/:archive', component: Archive, exact: false},
    {path: '/create-post', component: PostForm, exact: false},
    {path: '/signup', component: SignUp, exact: false},
]);

export default routes;
