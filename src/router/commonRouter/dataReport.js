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
  }]
}]
