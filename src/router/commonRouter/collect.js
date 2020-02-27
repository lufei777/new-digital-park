import ManMadeCollectList from '../../pages/commonProject/collect/manMadeCollectList'
import AutoCollectList from '../../pages/commonProject/collect/autoCollectList'
import AddCollect from '../../pages/commonProject/collect/addCollect'
import TmpRouter from '../../pages/commonProject/coms/tmpRouterBox'
export default [{
  path:'/tmpRouter',
  redirect:'/manMadeCollect',
  component:TmpRouter,
  // name:'TmpRouter',
  meta:{title:'设备采集'},
  children:[{
    path:'/manMadeCollect',
    name:'ManMadeCollectList',
    component:ManMadeCollectList,
    meta:{title:'人工采集'}
  },{
    path:'/addCollect',
    name:'AddCollect',
    component:AddCollect,
    meta:{title:'编辑采集'}
  },{
    path:'/autoCollect',
    name:'AutoCollectList',
    component:AutoCollectList,
    meta:{title:'自动采集'}
  }]
}]
