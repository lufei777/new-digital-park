import Vue from 'vue'
import Router from 'vue-router'
import { flattenDeep } from '../utils/czUtils'

// 公共路由
import AssetManage from './commonRouter/assetManage'
import Collect from './commonRouter/collect'
import DataReport from './commonRouter/dataReport'
import DeviceRecord from './commonRouter/deviceRecord'
import StatisAnalysis from './commonRouter/statisAnalysis'
import SystemManage from './commonRouter/systemManage'

// 项目私有路由
import EnergyRouter from './energy-router'
import DigitalParkRouter from './digital-park-router'

// 能源管理
let EnergyRouters = flattenDeep([EnergyRouter, Collect, DataReport, DeviceRecord, StatisAnalysis, SystemManage])
// 数字园区
let DigitalRouters = flattenDeep([DigitalParkRouter, AssetManage, EnergyRouters]);

// const routes = flattenDeep([DigitalRouters]);
Vue.use(Router)
export default new Router({
    "routes": DigitalRouters
})
