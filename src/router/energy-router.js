import EnergyIndex from '../pages/energy/index.vue'
import EnergyCompare from '../pages/energy/energyCompare.vue'
import HomePage from '../pages/energy/homePage.vue'
import TimeEnergy from '../pages/energy/energyShow/timeEnergy.vue'
import CategoryEnergy from '../pages/energy/energyShow/categoryEnergy.vue'
import RankEnergy from '../pages/energy/energyShow/rankEnergy.vue'
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
  },{
    path: '/energy/timeEnergy',
    name: 'TimeEnergy',
    component: TimeEnergy,
  },{
      path: '/energy/categoryEnergy',
      name: 'CategoryEnergy',
      component: CategoryEnergy,
  },{
    path: '/energy/rankEnergy',
    name: 'RankEnergy',
    component: RankEnergy,
  }].concat(CommonRouter)
}]
