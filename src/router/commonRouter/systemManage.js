import UserManage from '../../pages/commonProject/SystemManage/userManage'
import OperatorLog from '../../pages/commonProject/SystemManage/operatorLog'
import RoleManage from '../../pages/commonProject/SystemManage/roleManage'
import DepartmentManage from '../../pages/commonProject/SystemManage/departmentManage'
import SpaceManage from '../../pages/commonProject/SystemManage/spaceManage'
import TmpRouter from '../../pages/commonProject/coms/tmpRouterBox'
import AddSpace from '../../pages/commonProject/SystemManage/addSpace'
export default [{
  path:'/tmpRouter',
  redirect:'/userManage',
  component:TmpRouter,
  meta:{title:'系统管理'},
  children:[{
    path:'/userManage',
    name:'UserManage',
    component:UserManage,
    meta:{title:'用户管理'}
  },{
    path:'/operatorLog',
    name:'OperatorLog',
    component:OperatorLog,
    meta:{title:'操作日志'}
  },{
    path:'/roleManage',
    name:'RoleManage',
    component:RoleManage,
    meta:{title:'角色管理'}
  },{
    path:'/departmentManage',
    name:'DepartmentManage',
    component:DepartmentManage,
    meta:{title:'组织机构'}
  },{
      path:'/spaceManage',
      name:'SpaceManage',
      component:SpaceManage,
      meta:{title:'空间管理'},
    },{
      path:'/addSpace',
      name:'AddSpace',
      component:AddSpace,
      meta:{title:'空间编辑'},
    }]
}]
