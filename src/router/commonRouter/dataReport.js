import SpaceReport from '../../pages/commonProject/dataReport/spaceReport'
import CategoryReport from '../../pages/commonProject/dataReport/categoryReport'
import TmpRouter from '../../pages/commonProject/coms/tmpRouterBox'
export default [{
  path:'/tmpRouter',
  redirect:'/spaceReport',
  component:TmpRouter,
  meta:{title:'数据报表'},
  children:[{
    path:'/spaceReport',
    name:'SpaceReport',
    component:SpaceReport,
    meta:{title:'空间能耗报表'}
  },{
    path:'/categoryReport',
    name:'CategoryReport',
    component:CategoryReport,
    meta:{title:'分项能耗报表'}
  },{
    path:'/elecReport',
    name:'ElecReport',
    component:()=>import('@/pages/commonProject/dataReport/elecReport'),
    meta:{title:'用电报表'}
  },{
    path:'/waterReport',
    name:'WaterReport',
    component:()=>import('@/pages/commonProject/dataReport/waterReport'),
    meta:{title:'用水报表'}
  },{
    path:'/coldReport',
    name:'ColdReport',
    component:()=>import('@/pages/commonProject/dataReport/coldReport'),
    meta:{title:'用冷报表'}
  }]
}]
