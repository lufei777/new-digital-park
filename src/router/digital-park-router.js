import DigitalHomePage from '../pages/digitalPark/home/index'
import energyRouter from './energy-router'
import assetManageRouter from './commonRouter/assetManage'
import DashBoardHomePage from '../pages/digitalPark/home/dashboard'
export default [{
  path:'/',
  redirect:'/digitalPark/homePage'
},{
  path: '/digitalPark/homePage',
  name: 'DigitalHomePage',
  component: DigitalHomePage,
},{
  path: '/digitalPark/dashboardHomePage',
  name: 'DashBoardHomePage',
  component: DashBoardHomePage,
}].concat(energyRouter).concat(assetManageRouter)
