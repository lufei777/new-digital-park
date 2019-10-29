import Vue from 'vue'
import Vuex from 'vuex'

import test from './modules/test'
import conditionSelect from './modules/conditionSelect'
import analysis from './modules/analysis'
import energySavingSelect from './modules/energySavingSelect'
import assetManage from './modules/assetManage'
import digitalPark from './modules/digitalPark'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    test,
    conditionSelect,
    analysis,
    energySavingSelect,
    assetManage,
    digitalPark
  }
})
