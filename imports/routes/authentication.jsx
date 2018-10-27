// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Login from '/imports/ui/views/Authentication/Login';

const authenticationRoutes = [
  {
    path: '/auth/login',
    navbarName: 'Login',
    icon: Person,
    component: Login,
    key: 'login',
    menu: true,
  },
];

export default authenticationRoutes;