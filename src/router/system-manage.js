import UserManage from '../pages/systemManage/userManage/userManage'
import OperatorLog from '../pages/systemManage/operatorLog'
import RoleManage from '../pages/systemManage/roleManage/roleManage'
import DepartmentManage from '../pages/systemManage/departmentManage'
import SpaceManage from '../pages/systemManage/spaceManage'
import TmpRouter from '../pages/commonProject/coms/tmpRouterBox'
import AddSpace from '../pages/systemManage/addSpace'
import AddUser from '../pages/systemManage/userManage/addUser'
import AddDept from '../pages/systemManage/addDept'
import AddRole from '../pages/systemManage/roleManage/addRole'
import PersonalInformation from '../pages/systemManage/personal/personalInformation'
import ModifyPassword from '../pages/systemManage/personal/modifyPassword'
export default [{
  path: '/tmpRouter',
  redirect: '/userManage',
  component: () => import('@/pages/commonProject/coms/commonIndex'),
  meta: { title: '系统管理' },
  children: [{
    path: '/userManage',
    name: 'UserManage',
    component: UserManage,
    meta: { title: '用户管理' }
  }, {
    path: '/operatorLog',
    name: 'OperatorLog',
    component: OperatorLog,
    meta: { title: '操作日志' }
  }, {
    path: '/roleManage',
    name: 'RoleManage',
    component: RoleManage,
    meta: { title: '角色管理' }
  }, {
    path: '/departmentManage',
    name: 'DepartmentManage',
    component: DepartmentManage,
    meta: { title: '组织机构' }
  }, {
    path: '/spaceManage',
    name: 'SpaceManage',
    component: SpaceManage,
    meta: { title: '空间管理' },
  }, {
    path: '/addSpace',
    name: 'AddSpace',
    component: AddSpace,
    meta: { title: '空间编辑' },
  }, {
    path: '/addUser',
    name: 'AddUser',
    component: AddUser,
    meta: { title: '用户编辑' },
  }, {
    path: '/addDept',
    name: 'AddDept',
    component: AddDept,
    meta: { title: '机构编辑' },
  }, {
    path: '/addRole',
    name: 'AddRole',
    component: AddRole,
    meta: { title: '角色编辑' },
  }, {
    path: '/personalTmpRouter',
    // name:'TmpRouter',
    component: TmpRouter,
    meta: { title: '个人中心' },
    redirect: '/personalInformation',
    children: [{
      path: '/personalInformation',
      name: 'PersonalInformation',
      component: PersonalInformation,
      meta: { title: '个人信息' },
    }, {
      path: '/modifyPassword',
      name: 'ModifyPassword',
      component: ModifyPassword,
      meta: { title: '修改密码' },
    }]
  }]
}]
