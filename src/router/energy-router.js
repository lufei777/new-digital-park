import EnergyIndex from '../pages/energyCompare/index.vue'
import EnergyCompare from '../pages/energyCompare/energyCompare.vue'
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
