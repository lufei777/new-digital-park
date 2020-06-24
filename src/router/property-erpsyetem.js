// 物业ERP 系统的路由
export default [
    {
        path: '/proerpsystem',
		name: 'proerpsystem',
		// component: () => import('@/pages/commonProject/coms/commonIndex'),
		component:() => import('../pages/propertyErpSystem'),
        redirect: '/proerpsystem/rentContract',
        children:[
            {
                path:'rentContract',
                name:'rentContract',
                meta:{title:'租赁合同'},
                component:() =>import('../pages/propertyErpSystem/rentManagement/originPages/rentContract.vue')
            }
        ]
    }
]