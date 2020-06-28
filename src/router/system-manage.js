import OperatorLog from '../pages/systemManage/operatorLog'
import TmpRouter from '../pages/commonProject/coms/tmpRouterBox'
import AddSpace from '../pages/systemManage/spaceManage/addSpace'
import AddUser from '../pages/systemManage/userManage/addUser'
import AddDept from '../pages/systemManage/departmentManage/addDept'
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
    component: ()=>import('@/pages/systemManage/userManage/index'),
    meta: { title: '用户管理' }
  }, {
    path: '/operatorLog',
    name: 'OperatorLog',
    component: OperatorLog,
    meta: { title: '操作日志' }
  }, {
    path: '/roleManage',
    name: 'RoleManage',
    component: ()=>import('@/pages/systemManage/roleManage/index'),
    meta: { title: '角色管理' }
  }, {
    path: '/departmentManage',
    name: 'DepartmentManage',
    component: ()=>import('@/pages/systemManage/departmentManage/index'),
    meta: { title: '组织机构' }
  }, {
    path: '/spaceManage',
    name: 'SpaceManage',
    component: ()=>import("@/pages/systemManage/spaceManage/index"),
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
