import moment from 'moment'
const state = {
  showDialog:false,
  startTime:moment(new Date(new Date().getTime()-5*24*60*60*1000)).format('YYYY-MM-dd HH:mm:ss'),
  endTime:new Date(),
  monitor1:'',
  monitor2:'',
  curSelect:1//点击的选择按钮 第一个还是第二个
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
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
