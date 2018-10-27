// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import Group from '@material-ui/icons/Group';
import DashboardPage from '/imports/ui/views/Dashboard';
import Users from '/imports/ui/views/Users/UserList';
import AddUser from '/imports/ui/views/Users/AddUser';
import EditUser from '/imports/ui/views/Users/EditUser';

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Sample Dashboard',
    icon: Dashboard,
    component: DashboardPage,
    key: 'dashboard',
    menu: true,
  },
  {
    path: '/users/add',
    sidebarName: 'Add user',
    navbarName: 'Add new user',
    icon: Person,
    component: AddUser,
    key: 'adduser',
    menu: false,
  },
  {
    path: '/users/edit/:id',
    sidebarName: 'Edit user',
    navbarName: 'Edit an user',
    icon: Person,
    component: EditUser,
    key: 'edituser',
    menu: false,
  },
  {
    path: '/users',
    sidebarName: 'Users',
    navbarName: 'Users',
    icon: Group,
    component: Users,
    key: 'users',
    menu: true,
  },
  {
    redirect: true,
    path: '/',
    to: '/dashboard',
    navbarName: 'Redirect',
    key: 'redirect',
  },
];

export default dashboardRoutes;