import DigitalHomePage from '../pages/digitalPark/home/index'
import energyRouter from './energy-router'
import assetManageRouter from './commonRouter/assetManage'
export default [{
  path:'/',
  redirect:'/digitalPark/homePage'
},{
  path: '/digitalPark/homePage',
  name: 'DigitalHomePage',
  component: DigitalHomePage,
},{
  path: '/digitalPark/homePage',
  name: 'DigitalHomePage',
  component: DigitalHomePage,
}].concat(energyRouter).concat(assetManageRouter)
