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
			// 租赁合同审核

			// 租赁合同审核模板

			// 租赁月账单明细查询
			{
				path:'/detailquery',
				name:'leasedetailquery',
				meta:{title:'租赁月账单明细查询'},
				component:() => import('../pages/leaseManage/queryStatistics/detailQuery.vue')
			},
			// 租赁月账单综合查询
			{
				path:'/integratedquery',
				name:'leaseintegratedquery',
				meta:{title:'租赁月账单综合查询'},
				component:() => import('../pages/leaseManage/queryStatistics/integratedQuality.vue')
			}



		]
	}
];
