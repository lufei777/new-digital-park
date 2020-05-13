import DeviceRecord from '../../pages/commonProject/deviceRecord/index'
import AddDevice from '../../pages/commonProject/deviceRecord/addMeter'
import EditDevice from '../../pages/commonProject/deviceRecord/editMeter'
import ImportDevice from '../../pages/commonProject/deviceRecord/importMeter'
import TmpRouter from '../../pages/commonProject/coms/tmpRouterBox'
export default [{
  path:'/tmpRouter',
  name: 'TmpRouter',
  component:TmpRouter,
  meta:{title: '设备表计'},
  redirect:"/deviceRecord",
  children:[{
    path: '/deviceRecord',
    name: 'DeviceRecord',
    component: DeviceRecord,
  },{
    path:'/addDevice',
    name:'AddDevice',
    component:AddDevice,
    meta:{title:'表计编辑'},
  },{
    path:'/editDevice',
    name:'EditDevice',
    component:EditDevice,
    meta:{title:'表计编辑'},
  },{
    path:'/importDevice',
    name:'ImportDevice',
    component:ImportDevice,
    meta:{title:'表计导入'},
  }]
}]
