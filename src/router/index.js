import Vue from 'vue';
import Router from 'vue-router';
import { flattenDeep } from 'utils/czUtils';
import store from '../vuex/store';
import { getToken } from '@/utils/auth'; // get token from cookie

import helloRouter from './hello-router';
// 公共路由
import vibeWeb from './vibeWeb'; // 旧项目

// 项目私有路由
import DigitalParkRouter from './digital-park-router'; 					// 数字园区
import AssetManage from './asset-manage'; 											// 资产管理
import EnergyRouter from './energy-router'; 										// 能源管理
import LeaseManage from './lease-manage'; 											// 租赁管理
import CleaningManage from './cleaning-manage'; 								// 保洁管理
import CostManage from './cost-manage'; 												// 费用管理
// import ReceiveSupportManage from './receive-support-manage'  // 收支管理
import PurchaseManage from './purchase-manage'; 								// 采购管理
import StockManage from './stock-manage'; 											// 库存管理
import taskManage from './task-manage'; 												// 任务管理

import visitorManage from './visitor-manage';										// 访客管理
import ParkingLotManage from './parkinglot-manage'; 						// 停车场管理
import contractManage from './contract-manage'; 								// 合同管理
import NewsManage from './news-manage'; 												// 消息管理
import MessageManage from './message-manage'; 									// 信息发布
import personalManage from './personal-manage'; 								// 人事管理
import thirdParty from './third-party'; 												// 物业管理
import RevenueExpendManage from './revenue-expend-manage'; 			// 收支管理
import ExportData from './commonRouter/exportData'; 						// 导出数据
import MonitoringAlarm from './warning-alarm'; 									// 预警报警
import Norbulingka from './norbulingka'; 												// 罗布林卡
import DeviceManage from './device-manage'; 										// 设备管理

// 数字园区
let DigitalRouters = flattenDeep([
  vibeWeb,
  DigitalParkRouter,
  AssetManage,
  EnergyRouter,
  LeaseManage,
  CleaningManage,
  CostManage,
  PurchaseManage,
  StockManage,
  taskManage,
  visitorManage,
  ParkingLotManage,
  contractManage,
  NewsManage,
  MessageManage,
  personalManage,
  thirdParty,
  RevenueExpendManage,
  ExportData,
  MonitoringAlarm,
  Norbulingka,
  DeviceManage
]);

Vue.use(Router);
const router = new Router({
  routes: DigitalRouters
});

router.beforeEach((to, from, next) => {
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (to.meta.loginCheck === false) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  // if (to.path != '/vibe-web') {
  //   store.commit('digitalPark/activeMenuIndex', to.path);
  // }
  //客户端关闭视频
  window.closeVideoWin && window.closeVideoWin();

  //大屏
  if (window.name === 'largeScreen') {
    store.commit('digitalPark/menuList', JSON.parse(localStorage.menuList));
    store.commit('digitalPark/activeMenuIndex', Cookies.get('activeMenuIndex'));
  }
});
export default router;
