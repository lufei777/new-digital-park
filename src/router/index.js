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

import helloRouter from './hello-router'

// 数字园区
let DigitalRouters = flattenDeep([DigitalParkRouter, AssetManage, EnergyRouter, vibeWeb]);

// const routes = flattenDeep([DigitalRouters]);
Vue.use(Router)
const router = new Router({
  "routes": DigitalRouters
})
//
router.beforeEach((to, from, next) => {
  console.log(to,from)
  axois.get('/oaApi/user/login').then(() => {
    // sessionStorage.removeItem('logout')
    next()
  }).catch(() => { })
})
export default router
