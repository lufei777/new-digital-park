import Vue from 'vue'
import Router from 'vue-router'
import axois from '../service/axios/AxiosInterceptors'
import { flattenDeep } from '../utils/czUtils'

// 公共路由
import AssetManage from './commonRouter/assetManage'
import vibeWeb from './vibeWeb'

// 项目私有路由
import EnergyRouter from './energy-router'
import DigitalParkRouter from './digital-park-router'
import LeaseManage from './lease-manage'
import CleaningManage from './cleaning-manage'
import CostManage from './cost-manage'
import ReceiveSupportManage from './receive-support-manage'


import helloRouter from './hello-router'

// 数字园区
let DigitalRouters = flattenDeep([DigitalParkRouter, AssetManage, EnergyRouter, vibeWeb, LeaseManage,CleaningManage,CostManage,ReceiveSupportManage]);

// const routes = flattenDeep([DigitalRouters]);
Vue.use(Router)
const router = new Router({
  "routes": DigitalRouters
})
//

 router.beforeEach((to, from, next) => {
  if (typeof to.meta.loginCheck === 'boolean' && !to.meta.loginCheck) {
    next()
  } else {
    axois.get('/oaApi/user/login').then(() => {
      next()
    }).catch(() => {

    })
  }
})
export default router
