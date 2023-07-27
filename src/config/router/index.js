import CategoryPage from "../../components/Category";
import MeetingPage from "../../components/Meeting";
import UserPage from "../../components/User";



export const routerMenu = [
    {
        icon: '',
        label: 'User',
        path: '/users',
        layout: 'dashboard',
        component: <UserPage/>,
    },
    {
        icon: '',
        label: 'Category',
        path: '/category',
        layout: 'dashboard',
        component: <CategoryPage/>,
    },
    {
        icon: '',
        label: 'Meeting',
        path: '/meeting',
        layout: 'dashboard',
        component: <MeetingPage/>,
    }
]
