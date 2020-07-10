export default [
	{
		path: '/leasemanage',
		name: 'leasemanage',
		meta: { title: '租赁管理' },
		component: () => import('@/pages/commonProject/coms/commonIndex'),
		redirect: '/housepropertymanage',
		children: [
			{
				path: '/housepropertymanage',
				name: 'housepropertymanage',
				meta: { title: '房产管理' },
				component: () => import('@/pages/leaseManage/houseManage/housePropertyManage')
			},
			{
				path: '/bulkimporthouseproperty',
				name: 'bulkimporthouseproperty',
				meta: { title: '导入房产' },
				component: () => import('@/pages/leaseManage/houseManage/bulkImportHouseProperty')
			},
			{
				path: '/editHouseProperty',
				name: 'editHouseProperty',
				meta: { title: '房产维护' },
				component: () => import('@/pages/leaseManage/houseManage/editHouseProperty')
			},
			{
				path: '/tenantManage',
				name: 'tenantManage',
				meta: { title: '租户管理' },
				component: () => import('@/pages/leaseManage/tenantManage/tenantList')
			},
			{
				path: '/addTenantManage',
				name: 'addTenantManage',
				meta: { title: '编辑租户' },
				component: () => import('@/pages/leaseManage/tenantManage/addTenant')
			},
			{
				path: '/leaseContract',
				name: 'leaseContract',
				meta: { title: '租赁合同' },
				component: () => import('@/pages/leaseManage/leaseContract/leaseContract')
			},
			{
				path: '/addContract',
				name: 'AddContract',
				meta: { title: '新增合同' },
				component: () => import('@/pages/leaseManage/leaseContract/addContract')
			},
			{
				path: '/billManage',
				name: 'billManage',
				meta: { title: '账单管理' },
				component: () => import('@/pages/leaseManage/billManage/billManage')
			},
			// 租赁月账单
			{
				path: '/monthlyrentalbill',
				name: 'rentalbill',
				meta: { title: '租赁月账单' },
				component: () => import('@/pages/leaseManage/monthlyRentalBill/')
			},
			// 租赁月账单模板
			{
				path: '/addmothly',
				name: 'leasaddmothly',
				component: () => import('@/pages/leaseManage/monthlyRentalBill/temmonthrentalbill')
			},
			// 记录详情
			{
				path: '/recordedtaile',
				name: 'leaserecordedtaile',
				meta: { title: '记录详情' },
				component: () => import('../pages/leaseManage/monthlyRentalBill/recordDetails.vue')
			},

			// 租赁月账单审核
			{
				path: '/billReview',
				name: 'billReview',
				meta: { title: '租赁月账单审核' },
				component: () => import('../pages/leaseManage/billReview/index.vue'),
				// redirect: '/cansee',
				// children: [
				// 	// 租赁月账单审核==>待审核
				// 	{
				// 		path: '/auditing',
				// 		name: 'leaseauditing',
				// 		meta: { title: '待审核' },
				// 		component: () => import('../pages/leaseManage/billReview/auditing.vue')
				// 	},
				// 	// 租赁月账单审核==>已审核
				// 	{
				// 		path: '/checked',
				// 		name: 'leasechecked',
				// 		meta: { title: '已审核' },
				// 		component: () => import('../pages/leaseManage/billReview/checked.vue')
				// 	}
				// ]
			},
			{
				path: '/cansee',
				name: 'cansee',
				meta: { title: '查看' },
				component: () => import('../pages/leaseManage/billReview/see.vue'),
			},

			//
			// 租赁合同审核

			// 租赁合同审核模板

			// 租赁月账单明细查询
			{
				path: '/detailquery',
				name: 'leasedetailquery',
				meta: { title: '租赁月账单明细查询' },
				component: () => import('../pages/leaseManage/queryStatistics/detailQuery.vue')
			},
			// 租赁月账单综合查询 - 按租户统计
			{
				path: '/tenantstatistics',
				name: 'leaseintegratedquery',
				meta: { title: '按租户统计' },
				component: () => import('../pages/leaseManage/queryStatistics/integratedQuality/tenantStatistics.vue')
			},
			// 租赁月账单综合查询 - 合同统计
			{
				path: '/contractstatistics',
				name: 'leasecontractStatistics',
				meta: { title: '按合同统计' },
				component: () => import('../pages/leaseManage/queryStatistics/integratedQuality/contractStatistics.vue')
			}
		]
	}
];
