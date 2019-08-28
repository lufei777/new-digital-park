import moment from 'moment'
import CommonApi from '../../service/api/commonApi'
const state = {
  showDialog:false,
  startTime:moment(new Date(new Date().getTime()-5*24*60*60*1000)).format('YYYY-MM-DD HH:mm:ss'),
  endTime:moment().format('YYYY-MM-DD HH:mm:ss'),
  monitor1:'',
  monitor2:'',
  curSelect:1,//点击的选择按钮 第一个还是第二个
  filterType:2,
}

const actions={
  async setDefaultNode({commit}){
    let res = await CommonApi.getDefaultNode()
    commit('monitor1', {id:res.monitorIds[0],text:res.captions[0]})
    commit('monitor2', {id:res.monitorIds[1],text:res.captions[1]})
  }
}

const mutations={
  showDialog(state,data){
    state.showDialog=data
  },
  startTime(state,data){
    state.startTime=data
  },
  endTime(state,data){
    state.endTime=data
  },
  monitor1(state,data){
    state.monitor1=data
  },
  monitor2(state,data){
    state.monitor2=data
  },
  curSelect(state,data){
    state.curSelect=data
  },
  filterType(state,data){
    state.filterType=data
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
