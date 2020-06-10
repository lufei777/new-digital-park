import CommonApi from '@/service/api/common'
import store from '@/vuex/store';
import { IsCZClient } from '@/utils/auth';
import router from '@/router'
import CommonFun from '@/utils/commonFun'
class commonLargeHeader {

  onClickLogoutBtn(){
    if (IsCZClient()) {
      goBackClientLogin();
    }
   store.dispatch('user/logout').then(() => {
     router.push("/login");
    })
  }

  loadNews(flag) {  //点击消息
    localStorage.setItem(
      "menuList",
      JSON.stringify({
        name: "消息管理",
        childNode: [
          {
            id: '1',
            name: "预警报警列表",
            routeAddress: "@/html/alarm/alarm_index.html"
          }
        ]
      })
    );
   store.commit("digitalPark/activeMenuIndex","@/html/alarm/alarm_index.html")

   store.commit("digitalPark/largeScreenIframeSrc",
      window.top.location.origin + '/#/vibe-web?updateId=' + _.uniqueId())
  }

  goToWebPage(item, obj) {
    // console.log("back",item,obj)
    //如果只有第一个参数，渲染的menu就是此对象的childNode；
    //如果有第二个参数,渲染的menu就是当前点击的子菜单所在的二级菜单，obj为当前点击的子菜单
    item = JSON.parse(item)
    let curMenu = item
    if (obj) {
      obj = JSON.parse(obj)
      curMenu = obj
    }
   store.commit("digitalPark/menuList", item)
   store.commit('digitalPark/activeMenuIndex',CommonFun.setMenuIndex(item))
    if(curMenu.routeAddress.indexOf('@')!=-1){
     store.commit("digitalPark/largeScreenIframeSrc",
        window.top.location.origin+'/#/vibe-web?updateId='+_.uniqueId())
    }else{
     store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+item.routeAddress)
    }
  }

   onClickUserConfigure(val) { //点击用户
    if (val == 3) {
      //如果是客户端
      if (IsCZClient()) {
        goBackClientLogin();
      }
     store.dispatch('user/logout').then(() => {
        router.push("/login");
      })
      // 清空菜单列表
     store.commit("digitalPark/activeMenuIndex", "");
    } else {
      this.setSystemMenu()
      if (val == 1) {
       store.commit("digitalPark/activeMenuIndex", "/personalInformation")
       store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+'/personalInformation')
      } else if (val == 2) {
       store.commit("digitalPark/activeMenuIndex", "/modifyPassword")
       store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+'/modifyPassword')
      }
    }
  }

  setSystemMenu() {
    let menuTree = JSON.parse(localStorage.getItem("menuTree"));
    let firstLevelTree = menuTree[0].childNode.find(
      item => item.name == "基础功能"
    );
    let secondLevelTree = firstLevelTree.childNode.find(
      item => item.name == "系统管理"
    );
   store.commit("digitalPark/menuList", secondLevelTree)
  }

  async getAlarmList() {
    let res = await CommonApi.getAlarmMessageList({
      pageNum: 1,
      start: '',
      end: '',
      pageCount: 10,
    })
    let alarmListCount = res.total>99?'99+':res.total
    return alarmListCount
  }

}

export default new commonLargeHeader()
