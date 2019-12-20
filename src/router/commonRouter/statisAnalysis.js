import DeviceAnalysis from '../../pages/commonProject/statisAnalysis/device'
import CorrelationAnalysis from '../../pages/commonProject/statisAnalysis/correlation'
import StatisCompare from '../../pages/commonProject/statisAnalysis/statisCompare'
import HistoryStatis from '../../pages/commonProject/statisAnalysis/historyStatis'
import TmpRouter from '../../pages/commonProject/coms/tmpRouterBox'
import ZoomCompare from '../../pages/energy/energyCompare/zoomCompare.vue'
import TbhbAnalysis from '../../pages/energy/energyCompare/tbhbAnalysis.vue'
import TypeCompare from '../../pages/energy/energyCompare/typeCompare.vue'
export default [{
  path:'/energy/energyShow',
  redirect:'/deviceAnalysis',
  component:TmpRouter,
  meta:{title:'统计分析'},
  children:[{
    path:'/deviceAnalysis',
    name:'DeviceAnalysis',
    component:DeviceAnalysis,
    meta:{title:'设备状态'}
  },{
    path:'/correlationAnalysis',
    name:'CorrelationAnalysis',
    component:CorrelationAnalysis,
    meta:{title:'相关分析'}
  },{
    path:'/statisCompare',
    name:'StatisCompare',
    component:StatisCompare,
    meta:{title:'统计对比'}
  },{
    path:'/historyStatis',
    name:'HistoryStatis',
    component:HistoryStatis,
    meta:{title:'往期对比'}
  },{
    path: '/tmpRouter2',
    component: TmpRouter,
    meta:{title:'能耗对比分析'},
    redirect:'/energy/zoomCompare',
    children:[{
      path: '/energy/zoomCompare',
      name: 'ZoomCompare',
      component: ZoomCompare,
      meta:{title:'空间对比'},
    },{
      path: '/energy/tbhbAnalysis',
      name: 'TbhbAnalysis',
      component: TbhbAnalysis,
      meta:{title:'同比环比分析'},
    },{
      path: '/energy/typeCompare',
      name: 'TypeCompare',
      component: TypeCompare,
      meta:{title:'能耗类型对比'},
    }]
  },]
}]
