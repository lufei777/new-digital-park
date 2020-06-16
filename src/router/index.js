import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// 插件引入
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
let DigitalRouters = [].concat(
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
)

const router = new Router({
  routes: []
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

// 根据返回情况规划路由
(function (window, document) {
  // 这些菜单必须展示
  let extraPaths = ['/vibe-web', '/login',
    '/digitalPark/homePage', '/digitalPark/dashboardHomePage',
    '/digitalPark/moduleConfigure', '/news',
    '/largeSizeScreen', '/clientOverView',
    '/historyVideo', '/exportData'];

  // 根据后台返回的路由获取拍平后的路由
  let flatMenus = (menu, menus, menupaths) => {
    let flatmenus = menus || [];
    let flatmenupaths = menupaths || [];
    // 挑选字段
    let { id, icon, name, routeAddress: path, clientType } = menu;
    // 放入集合
    flatmenus.push({ id, icon, name, path, clientType });
    flatmenupaths.push(path);
    // 递归处理
    if (Array.isArray(menu.childNode) && menu.childNode.length) {
      menu.childNode.forEach(childrenMenu => {
        flatMenus(childrenMenu, flatmenus, flatmenupaths);
      });
    }
    // 返回字段
    return { flatmenus, flatmenupaths };
  }

  // 根据铺平的路由格式化出菜单
  let formatRoutes = (flatmenupaths, routes) => {
    return routes.map(route => {
      if (flatmenupaths.includes(route.path) || flatmenupaths.includes(route.redirect)) {
        return route
      }
      // 进行递归处理children
      if (route.children && route.children.length) {
        route.children = formatRoutes(flatmenupaths, route.children);
        // 如果递归完还存在children，则重新赋值redirect再返回
        if (route.children && route.children.length) {
          let firstIndex = flatmenupaths.indexOf(route.redirect);
          // 如果不是redirect不存在，则设为子级的某项
          if (firstIndex === -1) {
            // 防止自己没有 / 情况
            let firstPath = route.children[0].path;
            if (!firstPath.startsWith('/')) {
              firstPath = `${route.path}/${firstPath}`;
            }
            route.redirect = firstPath
          }
          return route;
        }

        return false;
      }
    }).filter(item => item);
  }

  store.dispatch('digitalPark/getMenus').then(res => {
    let flat = flatMenus(res[0]);
    // console.log("flatMenus", flat.flatmenus)
    // console.log("flatmenupaths", flat.flatmenupaths)
    let routes = formatRoutes(flat.flatmenupaths.concat(extraPaths), DigitalRouters);
    // console.log("DigitalRouters", DigitalRouters)
    // console.log("routes", routes)
    router.addRoutes(routes);
  })
})(window, document);


export default router;
