import Vue from 'vue'
import Router from 'vue-router'
import axois from '../service/axios/AxiosInterceptors'
import { flattenDeep } from '../utils/czUtils'

// 公共路由
import AssetManage from './commonRouter/assetManage'          // 资产管理
import vibeWeb from './vibeWeb'                               // 旧项目

// 项目私有路由
import DigitalParkRouter from './digital-park-router'         // 数字园区
import EnergyRouter from './energy-router'                    // 能源管理
import LeaseManage from './lease-manage'                      // 租赁管理
import CleaningManage from './cleaning-manage'
import CostManage from './cost-manage'
import ReceiveSupportManage from './receive-support-manage'
import PurchaseManage from './purchase-manage'
import StockManage from './stock-manage'
import visitorManage from './visitor-manage'                  // 访客管理
import ParkingLotManage from './parkinglot-manage'            // 停车场管理

import helloRouter from './hello-router'

// 数字园区
let DigitalRouters = flattenDeep(
  [
    DigitalParkRouter, AssetManage,
    EnergyRouter, vibeWeb,
    LeaseManage, CleaningManage,
    CostManage, ReceiveSupportManage,
    PurchaseManage, StockManage,
    visitorManage, ParkingLotManage
  ]
);

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
