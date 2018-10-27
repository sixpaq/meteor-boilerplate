import Dashboard from '/imports/ui/layouts/Dashboard/Dashboard.jsx';
import Authentication from '/imports/ui/layouts/Authentication/Authentication.jsx';

const indexRoutes = [
  { path: '/auth', component: Authentication, key: 'authentication' },
  { path: '/', component: Dashboard, key: 'dashboard' },
];

export default indexRoutes;