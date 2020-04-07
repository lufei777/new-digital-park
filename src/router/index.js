import Vue from 'vue'
import Router from 'vue-router'
import axois from '../service/axios/AxiosInterceptors'
import { flattenDeep } from 'utils/czUtils'
import store from '../vuex/store'

// 公共路由
import vibeWeb from './vibeWeb'                               // 旧项目

// 项目私有路由
import AssetManage from './asset-manage'          // 资产管理
import DigitalParkRouter from './digital-park-router'         // 数字园区
import EnergyRouter from './energy-router'                    // 能源管理
import LeaseManage from './lease-manage'                      // 租赁管理
import CleaningManage from './cleaning-manage'                // 保洁管理
import CostManage from './cost-manage'                        // 费用管理
// import ReceiveSupportManage from './receive-support-manage'   // 收支管理
import PurchaseManage from './purchase-manage'                // 采购管理
import StockManage from './stock-manage'                      // 库存管理
import taskManage from './task-manage'                        // 任务管理

import visitorManage from './visitor-manage'                  // 访客管理
import ParkingLotManage from './parkinglot-manage'            // 停车场管理
import contractManage from './contract-manage'                // 合同管理
import NewsManage from './news-manage'                        // 消息管理
import MessageManage from './message-manage'                  // 信息发布
import personalManage from './personal-manage';               // 人事管理
import thirdParty from './third-party';
import RevenueExpendManage from './revenue-expend-manage';    // 收支管理

import helloRouter from './hello-router'

// 数字园区
let DigitalRouters = flattenDeep(
  [
    DigitalParkRouter, AssetManage,
    EnergyRouter, vibeWeb,
    LeaseManage, CleaningManage,
    CostManage,
    PurchaseManage, StockManage,
    visitorManage, ParkingLotManage,
    taskManage, contractManage, NewsManage,
    MessageManage, personalManage,
    thirdParty, RevenueExpendManage
  ]
);

Vue.use(Router)
const router = new Router({
  "routes": DigitalRouters
})

router.beforeEach((to, from, next) => {
  if (to.meta.loginCheck === false) {
    next();
  } else {
    if (!sessionStorage.getItem('token')) {
      router.push('/login');
    } else {
      next();
    }
  }
})
export default router
