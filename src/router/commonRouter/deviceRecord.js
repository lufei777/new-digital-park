import DeviceRecord from '../../pages/commonProject/deviceRecord/index'
import AddDevice from '../../pages/commonProject/deviceRecord/addMeter'
export default [{
  path:'/deviceRecord',
  name:'DeviceRecord',
  component:DeviceRecord,
  meta:{title:'设备表记'},
  children:[{
    path:'/addDevice',
    name:'AddDevice',
    component:AddDevice,
    meta:{title:'表记编辑'},
  }]
}]
