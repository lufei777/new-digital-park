import DigitalHomePage from '../pages/digitalPark/home/index'
import DashBoardHomePage from '../pages/digitalPark/home/dashboardNew'
import ModuleConfigure from '../pages/digitalPark/moduleConfigure/index'
import DefaultPage from '../pages/digitalPark/defaultPage/index'

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
},{
  path: '/digitalPark/defaultPage',
  name: 'DefaultPage',
  component: DefaultPage,
}]
