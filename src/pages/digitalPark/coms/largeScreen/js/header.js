import CommonApi from '@/service/api/common'
import store from '@/vuex/store';
import { IsCZClient } from '@/utils/auth';
import router from '@/router'
import CommonFun from '@/utils/commonFun'
import {isYDScreen, isNorbulingkaScreen} from "@/utils/project";

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
    if(isNorbulingkaScreen()){
      store.commit("digitalPark/menuList",{
          name: "消息管理",
          id:100000,
          childNode: [
            {
              id: 100001,
              name: "预警报警列表",
              routeAddress: "@/html/alarm/alarm_index.html"
            }
          ]
        })
      store.commit("digitalPark/activeMenuIndex","@/html/alarm/alarm_index.html")
      router.push('/vibe-web')
    }else{
      store.commit("digitalPark/menuList",{
        name: "消息管理",
        id:100000,
        childNode: [
          {
            id: 100001,
            name: "预警报警列表",
            routeAddress: "/warningAlarm"
          }
        ]
      })

      store.commit("digitalPark/activeMenuIndex","/warningAlarm")
      if(isYDScreen()){
        store.commit("digitalPark/largeScreenIframeSrc",
          window.top.location.origin+'/#'+item.routeAddress)
      }else{
        router.push("/warningAlarm");
      }
    }
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
    if(isYDScreen()){
      if(curMenu.routeAddress.indexOf('@')!=-1){
        store.commit("digitalPark/largeScreenIframeSrc",
          window.top.location.origin+'/#/vibe-web?updateId='+_.uniqueId())
      }else{
        store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+item.routeAddress)
      }
    }else{
     CommonFun.loadPage(curMenu)
    }
  }

   onClickUserConfigure(val) { //点击用户
    console.log("user-config")
    if (val == 3) {  //退出
      if (IsCZClient()) {
        goBackClientLogin();
      }
     store.dispatch('user/logout').then(() => {
        router.push("/login");
      })
      // 清空菜单列表
     store.commit("digitalPark/activeMenuIndex", "");
    } else if(val==4){  //最小化
      if (IsCZClient()) {
        minimizeWindow();
      }
    } else {
      this.setSystemMenu()
      if (val == 1) {
       store.commit("digitalPark/activeMenuIndex", "/personalInformation")
        if(isYDScreen()){
          store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+'/personalInformation')
        }else{
          router.push("/personalInformation")
        }
      } else if (val == 2) {
       store.commit("digitalPark/activeMenuIndex", "/modifyPassword")
        if(isYDScreen()){
          store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+'/modifyPassword')
        }else{
          router.push("/modifyPassword")
        }
      }
    }
  }

  setSystemMenu() {
    let menuTree = JSON.parse(localStorage.getItem("menuTree"));
    console.log("menuTree",menuTree)
    let firstLevelTree = menuTree[0].childNode.find(
      item => (item.name == "基础功能")
    );
    console.log("fitst",firstLevelTree)
    let secondLevelTree = firstLevelTree.childNode.find(
      item => (item.name == "系统管理")
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
