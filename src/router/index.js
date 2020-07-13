import Vue from 'vue';
import Router from 'vue-router';
import _ from 'lodash';
Vue.use(Router);
// 插件引入
import store from '../vuex/store';
import { getToken } from 'utils/auth'; // get token from cookie
import { getMenuTree } from 'utils/project';
import { flatMenus, formatRoutes } from 'utils/util';

import helloRouter from './hello-router';
// 公共路由
import vibeWeb from './vibeWeb'; // 旧项目

// 项目私有路由
import DigitalParkRouter from './digital-park-router'; 					// 数字园区
import SystemManage from './system-manage'                      // 系统设置
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
// import PropertyErpsystem from './property-erpsyetem'            // 物业ERP系统
import ElectricityManage from './electricity-manage'; 										// 用电管理
import MaintenanceManage from './maintenance-manage';           //维保管理
import FinancialManage from './financial-manage'

// 数字园区 公共模块
let publicRouters = [].concat(
  vibeWeb,
  DigitalParkRouter,
  ExportData,
  SystemManage
)

// 数字园区 私有模块
let privateRouters = [].concat(
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
  MonitoringAlarm,
  Norbulingka,
  DeviceManage,
  ElectricityManage,
  MaintenanceManage,
  FinancialManage
)
store.commit('digitalPark/setPrivateRouters', privateRouters);
const router = new Router({
  routes: publicRouters
});

router.beforeEach((to, from, next) => {
  // 如果有token
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      // 通过校验后
      // 首页跳转其他页面，需要缓存首页
      if(from.path === '/digitalPark/homePage'){
        from.meta.keepAlive = true;
      }
      // 此处通过路由的params.keepAlive控制首页是否刷新
      if(typeof to.params.keepAlive === 'boolean'){
        to.meta.keepAlive = to.params.keepAlive;
      }
      next();
    }
  } else {
    // 如果没有token
    if (to.meta.loginCheck === false) {
      next();
    } else {
      next({ path: '/login' });
    }
  }

  //客户端关闭视频
  window.closeVideoWin && window.closeVideoWin();

  //大屏
  if (window.name === 'largeScreen') {
    store.commit('digitalPark/menuList', JSON.parse(localStorage.menuList));
    store.commit('digitalPark/activeMenuIndex', Cookies.get('activeMenuIndex'));
  }
});

// 重写addRoutes，避免刷新再次执行addRoutes时报错有重复的路由
router.$addRoutes = (routes) => {
  router.matcher = new Router({
    routes: publicRouters
  }).matcher;
  router.addRoutes(routes)
}

// 如果是刷新，则需要重新addRoutes
if (getToken()) {
  // 活后台返回菜单拍平path
  let flat = flatMenus(getMenuTree()[0]);
  // 将私有路由进行拆分 验证
  let routes = formatRoutes(flat.flatmenupaths, _.cloneDeep(privateRouters));
  // 添加进当前路由中
  router.$addRoutes(routes);
}

export default router;
