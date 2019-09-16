import DeviceAnalysis from '../../pages/commonProject/statisAnalysis/device'
import CorrelationAnalysis from '../../pages/commonProject/statisAnalysis/correlation'
import StatisCompare from '../../pages/commonProject/statisAnalysis/statisCompare'
import HistoryStatis from '../../pages/commonProject/statisAnalysis/historyStatis'
import ManMadeCollectList from '../../pages/commonProject/collect/manMadeCollectList'
import AutoCollectList from '../../pages/commonProject/collect/autoCollectList'
import DeviceRecord from '../../pages/commonProject/deviceRecord/index'
import UserManage from '../../pages/commonProject/SystemManage/userManage'
import OperatorLog from '../../pages/commonProject/SystemManage/operatorLog'
import RoleManage from '../../pages/commonProject/SystemManage/roleManage'
import DepartmentManage from '../../pages/commonProject/SystemManage/departmentManage'
import SpaceManage from '../../pages/commonProject/SystemManage/spaceManage'
export default [{
  path:'/deviceAnalysis',
  name:'DeviceAnalysis',
  component:DeviceAnalysis
},{
  path:'/correlationAnalysis',
  name:'CorrelationAnalysis',
  component:CorrelationAnalysis
},{
  path:'/statisCompare',
  name:'StatisCompare',
  component:StatisCompare
},{
  path:'/historyStatis',
  name:'HistoryStatis',
  component:HistoryStatis
},{
  path:'/manMadeCollect',
  name:'ManMadeCollectList',
  component:ManMadeCollectList
},{
  path:'/autoCollect',
  name:'AutoCollectList',
  component:AutoCollectList
},{
  path:'/deviceRecord',
  name:'DeviceRecord',
  component:DeviceRecord
},{
    path:'/userManage',
    name:'UserManage',
    component:UserManage
},{
  path:'/operatorLog',
  name:'OperatorLog',
  component:OperatorLog
},{
  path:'/roleManage',
  name:'RoleManage',
  component:RoleManage
},{
  path:'/departmentManage',
  name:'DepartmentManage',
  component:DepartmentManage
},{
  path:'/spaceManage',
  name:'SpaceManage',
  component:SpaceManage
}]
