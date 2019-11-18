import EnergyIndex from '../pages/energy/index.vue'
import EnergyCompare from '../pages/energy/energyComare/energyCompare.vue'
import HomePage from '../pages/energy/home/homePage.vue'
import TimeEnergy from '../pages/energy/energyShow/timeEnergy.vue'
import CategoryEnergy from '../pages/energy/energyShow/categoryEnergy.vue'
import RankEnergy from '../pages/energy/energyShow/rankEnergy.vue'
import WaterDiffer from '../pages/energy/energySaving/waterDiffer.vue'
import NightWater from '../pages/energy/energySaving/nightWater.vue'
import ElecDiffer from '../pages/energy/energySaving/elecDiffer.vue'
import NightElec from '../pages/energy/energySaving/nightElec.vue'
import EnergyLogin from '../pages/energy/login/index.vue'
import ElecAnalysis from '../pages/energy/energySaving/helloWorld.vue'
import StatisAnalysis from './commonRouter/statisAnalysis'
import SystemManage from './commonRouter/systemManage'
import DeviceRecord from './commonRouter/deviceRecord'
import EnergyShow from '../pages/energy/energyShow/index'



import Collect from './commonRouter/collect'
import DataReport from './commonRouter/dataReport'

export default [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  name: 'EnergyLogin',
  component: EnergyLogin
}, {
  path: '/energy',
  name: 'EnergyIndex',
  component: EnergyIndex,
  children: [{
    path: '/energy/homePage',
    name: 'HomePage',
    component: HomePage,
  }, {
    path: '/energy/compare',
    name: 'EnergyCompare',
    component: EnergyCompare,
  },{
    meta:{title:'能耗展示'},
    path:'/energy/energyShow',
    component:EnergyShow,
    name:'EnergyShow',
    // redirect:'/energy/timeEnergy',
    children:[{
      path: '/energy/timeEnergy',
      name: 'TimeEnergy',
      component: TimeEnergy,
      meta:{title:'分时能耗'}
    }, {
      path: '/energy/categoryEnergy',
      name: 'CategoryEnergy',
      component: CategoryEnergy,
    }, {
      path: '/energy/rankEnergy',
      name: 'RankEnergy',
      component: RankEnergy,
    }]
  },{
    path: '/energy/categoryEnergy',
    name: 'CategoryEnergy',
    component: CategoryEnergy,
  }, {
    path: '/energy/rankEnergy',
    name: 'RankEnergy',
    component: RankEnergy,
  }, {
    path: '/energy/waterDiffer',
    name: 'WaterDiffer',
    component: WaterDiffer,
  }, {
    path: '/energy/nightWater',
    name: 'NightWater',
    component: NightWater,
  }, {
    path: '/energy/elecDiffer',
    name: 'ElecDiffer',
    component: ElecDiffer,
  }, {
    path: '/energy/nightElec',
    name: 'NightElec',
    component: NightElec,
  }, {
    path: '/energy/elecAnalysis',
    name: 'ElecAnalysis',
    component: ElecAnalysis,
  }].concat(StatisAnalysis,DataReport,SystemManage,DeviceRecord,Collect)
}]
