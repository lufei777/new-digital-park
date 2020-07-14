// 财务管理路由管理文件
export default [
	{
		path: '/finacialmanage',
		name: 'finacialmanage',
		// meta: { title: '收费通知单' },
		// component: () => import('@/pages/financialManage/index.vue'),
		component: () => import('@/pages/commonProject/coms/commonIndex'),
		redirect: '/finacialmanage/chargenote',
		// 收费通知单
		children: [
			// 收费通知单==============================
			{
				path: 'chargenote',
				name: 'chargenote',
				meta: { title: '收费通知单' },
				component: () => import('../pages/financialManage/chargeNote/index.vue')
			},
			// {
			// 	path: '/tz',
			// 	meta: { title: 'tz' },
			// 	component: () => import('../pages/financialManage/chargeNote/comAdjust.vue')
			// },
			// {
			// 	path: '/kp',
			// 	meta: { title: 'kp' },
			// 	component: () => import('../pages/financialManage/chargeNote/comInvoice.vue')
			// },
			// {
			// 	path: '/sf',
			// 	meta: { title: 'sf' },
			// 	component: () => import('../pages/financialManage/chargeNote/comCharge.vue')
			// },
			// {
			// 	path: '/dy',
			// 	meta: { title: 'dy' },
			// 	component: () => import('../pages/financialManage/chargeNote/comPrint.vue')
			// },

			// 收款联系单==============================
			{
				path: 'paymentlist',
				name: 'paymentlist',
				meta: { title: '收款联系单' },
				component: () => import('../pages/financialManage/paymentList/index.vue')
			},
			// 收款联系单的修改和详情
			{
				path:'changedetail',
				name:'changedetail',
				component:() => import('../pages/financialManage/paymentList/public.vue')
			},
			{
				path:'moban',
				name:'moban',
				component:() => import('../pages/financialManage/paymentList/mobu.vue')
			}
		]
	}
];
