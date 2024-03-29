import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';

const modulesFiles = require.context('./modules', true, /\.js$/)
// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './digitalPark.js' => 'digitalPark'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

Vue.use(Vuex)
export default new Vuex.Store({
  modules,
  getters
})
