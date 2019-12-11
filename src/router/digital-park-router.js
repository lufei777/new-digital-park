import DigitalHomePage from '../pages/digitalPark/home/index'
import DashBoardHomePage from '../pages/digitalPark/home/dashboardNew'
import ModuleConfigure from '../pages/digitalPark/moduleConfigure/index'
import Login from '../pages/digitalPark/login/index'
import HelloWorld from '../pages/helloWorld/helloWorld'
export default [{
  path: '/',
  redirect: '/digitalPark/homePage'
},{
  path: '/login',
  name: 'Login',
  meta:{
    loginCheck:false
  },
  component: Login,
},{
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
  path:'/test',
  name:'HelloWorld',
  component:HelloWorld
}]
