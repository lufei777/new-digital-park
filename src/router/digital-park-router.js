import DigitalHomePage from '../pages/digitalPark/home/index'
import DashBoardHomePage from '../pages/digitalPark/home/dashboard'
import ModuleConfigure from '../pages/digitalPark/moduleConfigure/index'
export default [{
  path: '/',
  redirect: '/digitalPark/homePage'
}, {
  path: '/digitalPark/homePage',
  name: 'DigitalHomePage',
  component: DigitalHomePage,
}, {
  path: '/digitalPark/dashboardHomePage',
  name: 'DashBoardHomePage',
  component: DashBoardHomePage,
}, {
  path: '/digitalPark/moduleConfigure',
  name: 'ModuleConfigure',
  component: ModuleConfigure,
}]
