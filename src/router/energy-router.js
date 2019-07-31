import EnergyIndex from '../pages/energyCompare/energyPage/index.vue'
import EnergyCompare from '../pages/energyCompare/energyPage/energyCompare.vue'
import CommonRouter from './commonRouter/index'
export default [{
  path: '/',
  redirect: 'energyIndex'
},{
  path: '/energyIndex',
  name: 'EnergyIndex',
  component: EnergyIndex,
  children:[{
    path: '/energyIndex/compare',
    name: 'EnergyCompare',
    component: EnergyCompare,
  }].concat(CommonRouter)
}]
