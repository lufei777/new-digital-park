// 物业ERP 系统的路由
export default [
    {
        path: '/proerpsystem',
		name: 'proerpsystem',
		// component: () => import('@/pages/commonProject/coms/commonIndex'),
		component:() => import('../pages/propertyErpSystem'),
		// redirect: '/heritage',
    }
]