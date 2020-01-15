import Vue from 'vue'
import Vuex from 'vuex'

import test from './modules/test'
import analysis from './modules/analysis'
import energySavingSelect from './modules/energySavingSelect'
import digitalPark from './modules/digitalPark'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    test,
    analysis,
    energySavingSelect,
    digitalPark
  }
})
