// import EnergyIndex from '../pages/energy/index.vue'
import HomePage from '../pages/energyManage/home/homePage.vue'
import TimeEnergy from '../pages/energyManage/energyShow/timeEnergy.vue'
import CategoryEnergy from '../pages/energyManage/energyShow/categoryEnergy.vue'
import RankEnergy from '../pages/energyManage/energyShow/rankEnergy.vue'
import WaterDiffer from '../pages/energyManage/energySaving/waterDiffer.vue'
import NightWater from '../pages/energyManage/energySaving/nightWater.vue'
import ElecDiffer from '../pages/energyManage/energySaving/elecDiffer.vue'
import NightElec from '../pages/energyManage/energySaving/nightElec.vue'
import ElecAnalysis from '../pages/energyManage/energySaving/elecAnalysis.vue'
import StatisAnalysis from './commonRouter/statisAnalysis'
import DeviceRecord from './commonRouter/deviceRecord'
import TmpRouter from '../pages/commonProject/coms/tmpRouterBox'
import Collect from './commonRouter/collect'
import DataReport from './commonRouter/dataReport'

export default [{
  path: '/energyManage',
  name: 'EnergyIndex',
  component: () => import('@/pages/commonProject/coms/commonIndex'),
  children: [{
    path: '/energy/homePage',
    name: 'HomePage',
    component: HomePage,
    meta: { title: '概览' }
  }, {
    meta: { title: '能耗展示' },
    path: '/tmpRouter',
    component: TmpRouter,
    redirect: '/energy/timeEnergy',
    children: [{
      path: '/energy/timeEnergy',
      name: 'TimeEnergy',
      component: TimeEnergy,
      meta: { title: '分时能耗' }
    }, {
      path: '/energy/categoryEnergy',
      name: 'CategoryEnergy',
      component: CategoryEnergy,
      meta: { title: '分项能耗' }
    }, {
      path: '/energy/rankEnergy',
      name: 'RankEnergy',
      component: RankEnergy,
      meta: { title: '能耗排名' }
    }]
  }, {
    path: '/tmpRouter',
    redirect: '/energy/waterDiffer',
    component: TmpRouter,
    meta: { title: '节能诊断' },
    children: [{
      path: '/energy/waterDiffer',
      name: 'WaterDiffer',
      component: WaterDiffer,
      meta: { title: '水量异常突增诊断' },
    }, {
      path: '/energy/nightWater',
      name: 'NightWater',
      component: NightWater,
      meta: { title: '夜间用水跑冒滴漏诊断' },
    }, {
      path: '/energy/elecDiffer',
      name: 'ElecDiffer',
      component: ElecDiffer,
      meta: { title: '用电量异常突增诊断' },
    }, {
      path: '/energy/nightElec',
      name: 'NightElec',
      component: NightElec,
      meta: { title: '夜间用电浪费诊断' },
    }, {
      path: '/energy/elecAnalysis',
      name: 'ElecAnalysis',
      component: ElecAnalysis,
      meta: { title: '电流向及线损分析' },
    },{
      path: '/basicSetting',
      component: ()=>import('@/pages/commonProject/coms/tmpRouterBox'),
      meta: { title: '基础设置' },
      children:[{
        path: '/energy/standardSetting',
        name: 'StandardSetting',
        component: ()=>import('@/pages/energyManage/basicSetting/customStandard/index'),
        meta: { title: '自定义标准' },
      },{
        path: '/energy/buildInfoSetting',
        name: 'BuildInfoSetting',
        component: ()=>import('@/pages/energyManage/basicSetting/buildInfoSetting/index'),
        meta: { title: '建筑信息设置' },
      }]
    }]
  }].concat(StatisAnalysis, DataReport, DeviceRecord, Collect)
}]
