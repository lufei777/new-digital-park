export default [{
        path: '/message',
        name: 'CommonIndex',
        redirect:'/message/device',
        meta:{title:'信息发布'},
        component: () => import('@/pages/commonProject/coms/commonIndex'),
        children: [{
          path: '/message/device',
          name: 'MessageDevice',
          meta:{title:'设备管理'},
          component: () => import('@/pages/messageManage/deviceManage')
        },{
          path: '/message/area',
          name: 'MessageArea',
          meta:{title:'区域管理'},
          component: () => import('@/pages/messageManage/areaManage')
        },{
          path: '/message/material',
          name: 'MessageMaterial',
          meta:{title:'素材管理'},
          component: () => import('@/pages/messageManage/materialManage')
        }]
    }
]
