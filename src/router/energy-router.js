import EnergyIndex from '../pages/energy/index.vue'
import EnergyCompare from '../pages/energy/energyCompare.vue'
import HomePage from '../pages/energy/homePage.vue'
import CommonRouter from './commonRouter/index'
export default [{
  path: '/',
  redirect: 'energy'
},{
  path: '/energy',
  name: 'EnergyIndex',
  component: EnergyIndex,
  children:[{
    path: '/energy/homePage',
    name: 'HomePage',
    component: HomePage,
  },{
    path: '/energy/compare',
    name: 'EnergyCompare',
    component: EnergyCompare,
  }].concat(CommonRouter)
}]
