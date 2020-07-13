// 监控报警信息=========================================
const MonitorAlarm = () => import('../pages/warningAlarm/alarminfoManagement/monitoringAlarm.vue');
// 新增newIncreased
const NewIncreased = () => import('../pages/warningAlarm/alarminfoManagement/newIncreased.vue');
// 查看详情
const SeeDetails = () => import('../pages/warningAlarm/alarminfoManagement/seeDetails.vue');
// 报警规则管理=========================================
const AlarmRules = () => import('../pages/warningAlarm/alarmRules');
// addBasicHome// 新增--基本设置
const AddBasicHome = () => import('../pages/warningAlarm/alarmRules/addBasicHome.vue');
// 查看和编辑
const SeeEdit = () =>import('../pages/warningAlarm/alarmRules/seeEdit.vue')
// 报警处理组管理=======================================
const AlarmGrounp = () => import('../pages/warningAlarm/alarmProcess');
// 新增处理组
const NewGrounp = () => import('../pages/warningAlarm/alarmProcess/newGrounp.vue');
// 通知方式管理=========================================
const NotificationManger = () => import('../pages/warningAlarm/notificationWay');
// 新增
const NewAdd = () => import('../pages/warningAlarm/notificationWay/newAdd.vue');
// 编辑
const Edit = ()=> import('../pages/warningAlarm/notificationWay/edit.vue')

// 预警报警的路由
export default [
	{
		path: '/warningAlarm',
		name: 'warningalarm',
		meta: { title: '预警报警' },
		component: () => import('@/pages/commonProject/coms/commonIndex'),
		// component: () => import('@/pages/warningAlarm/index.vue'),
		redirect: '/warningAlarm/monitorAlarm',
		children: [
			// 监控报警信息================================================================
			{
				path: 'monitorAlarm',
				name: 'MonitorAlarm',
				meta: { title: '监控报警信息' },
				component: MonitorAlarm
			},
			// 新增
			{
				path: 'newIncreased',
				name: 'NewIncreased',
				meta: { title: '新增' },
				component: NewIncreased
			},
			// 查看详情
			{
				path: 'seeDetails',
				name: 'SeeDetails',
				meta: { title: '详情' },
				component: SeeDetails
			},
			// 报警规则管理===============================================================
			{
				path: 'alarmRules',
				name: 'AlarmRules',
				meta: { title: '报警规则管理' },
				component: AlarmRules
			},
			{
				path: 'addBasicSettings',
				name: 'AddBasicHome',
				meta: { title: '基本设置' },
				component: AddBasicHome
			},
			// 查看和编辑
			{
				path: 'seeedit',
				name: 'seeedit',
				component: SeeEdit
			},

			// 报警处理组管理=============================================================
			{
				path: 'alarmGrounp',
				name: 'AlarmGrounp',
				meta: { title: '报警处理组管理' },
				component: AlarmGrounp
			},
			// 新增处理组
			{
				path: 'newGrounp',
				name: 'NewGrounp',
				meta: { title: '新增处理组' },
				component: NewGrounp
			},
			// 通知方式管理===============================================================
			{
				path: 'notificationManger',
				name: 'NotificationManger',
				meta: { title: '通知方式管理' },
				component: NotificationManger
			},
			// 新增
			{
				path: 'newAdd',
				name: 'NewAdd',
				meta: { title: '新增' },
				component: NewAdd
			},
			// 编辑
			{
				path:'edit',
				name:'Edit',
				component:Edit
			}

		]
	}
];
