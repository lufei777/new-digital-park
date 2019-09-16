import UserManage from '../../pages/commonProject/SystemManage/userManage'
import OperatorLog from '../../pages/commonProject/SystemManage/operatorLog'
import RoleManage from '../../pages/commonProject/SystemManage/roleManage'
import DepartmentManage from '../../pages/commonProject/SystemManage/departmentManage'
import SpaceManage from '../../pages/commonProject/SystemManage/spaceManage'
export default [{
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
