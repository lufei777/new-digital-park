<template>
  <div class="father-nav flex-align-around">
    <div class="sys-title">{{sysTitle}}</div>
    <div class="father-nav-list flex-align-around">
      <div v-for="(item,index) in menuData.children" :key="index" class="father-item"
           @mouseenter="changeBg(item,1)" @mouseleave="changeBg(item,-1)"
           @click="clickChangeBg(index)"

           :style="activeBg(item)"
      >
        <span>{{item.caption}}</span>
        <div class="child-nav-list"
             v-if="item.children && item.children.length && item.showChild==1">
          <div v-for="(child,i) in item.children" :key="i" class="child-item"
               @mouseenter="changeBg(child,1)" @mouseleave="changeBg(child,-1)"
               @click.stop="clickChangeChild(index,i)"
               :class="(child.bgFlag==-1 && child.clickFlag!=1)?'':'activeChild'">
            {{child.caption}}
          </div>
        </div>
      </div>
    </div>
    <div class="operator-box">
      <div class="fa fa-bell-o" title="报警信息"></div>
      <div class="fa fa-question-circle-o" title="帮助"></div>
      <div @mouseenter="showLogout(1)"  @mouseleave="showLogout(-1)" class="login-out-box">
        <span>
           <i class="fa fa-user-o" ></i>
           <span>admin</span>
        </span>
        <span v-show="showOut" class="login-out" @click="sureLogOut">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonApi from '../../service/api/commonApi'
  import CommonFun from '../../utils/commonFun'
  import nav1 from '../../../static/image/nav1.png'
  import nav2 from '../../../static/image/nav2.png'
  import hover_bg from '../../../static/image/nav_hover.png'
  export default {
    name: 'navList',
    components: {
    },
    data () {
      return {
        menuData:{},
        sysTitle:{},
        showOut:false,
        fatherBg:nav1,
        childBg:nav2,
        hover_bg:hover_bg,
        ws:''
      }
    },
    computed:{
    },
    methods: {
      onClickNavItem(val){
        console.log(val)
        this.$router.push(val)
      },
      async getMenus(){
        // let res = await CommonApi.getMenus()
        let res = CommonFun.menuData
        res.children.map((item)=>{
          item.bgFlag=-1 //鼠标移入移出背景
          item.clickFlag=-1 //鼠标点击背景
          item.showChild=-1 //是否显示子菜单
          item.children.map((child)=>{
            child.bgFlag=-1
            child.clickFlag=-1
          })
        })
        let activeNav =Cookies.get('activeNav') && JSON.parse(Cookies.get('activeNav'))
        console.log(activeNav)
        if(activeNav){
          if(activeNav.fatherName=="能耗展示"){
            this.$store.commit('conditionSelect/activeIndex',2)
            if(activeNav.childIndex==0){
              this.$store.commit('conditionSelect/curModule',2)
              this.$store.commit('conditionSelect/tbhbEnergy',[{id:44,name:'空调用电'}])
            }else if(activeNav.childIndex==1){
              this.$store.commit('conditionSelect/curModule',3)
              this.$store.commit('conditionSelect/tbhbEnergy',[{id:34,name:'电'}])
            }else{
              this.$store.commit('conditionSelect/activeIndex',1)
            }
          }else if(activeNav.fatherName=="统计分析"){
            this.$store.commit('conditionSelect/activeIndex',1)
            this.$store.commit('conditionSelect/curModule',1)
            this.$store.commit('conditionSelect/tbhbEnergy',[{id:34,name:'电'}])
          }else if(activeNav.fatherName=="节能诊断"){
            if(activeNav.childIndex == 0 || activeNav.childIndex == 1) {
              this.$store.commit('energySavingSelect/energySaveFlag',1)
            } else{
              this.$store.commit('energySavingSelect/energySaveFlag',2)
            }
          }
          let tmp=res.children[activeNav.fatherIndex]
          tmp.clickFlag=1
          tmp.showChild=1
          if(tmp.children.length){
            tmp.children[activeNav.childIndex].clickFlag=1
            this.$router.push(tmp.children[activeNav.childIndex].url)
          }else{
            this.$router.push(tmp.url)
          }
        }else{
          res.children[0].clickFlag=1
          res.children[0].showChild=1
          this.$router.push(res.children[0].url)
        }
        this.menuData = res
      },

      async getSystemSetting(){
        let res = await CommonApi.getSystemSetting()
        res.map((item)=>{
          if(item.name=='home.title'){
            this.sysTitle = item.value
          }
        })
      },
      changeBg(item,flag){
        item.bgFlag=flag
      },
      clickChangeBg(index){ //点击父标题时
        let tmp = this.menuData.children
        tmp.map((item)=>{
          item.clickFlag=-1
          item.bgFlag=-1
          item.showChild=-1
        })
        tmp[index].clickFlag=1
        tmp[index].showChild=1
        if(tmp[index].children.length){
          tmp[index].children.map((item)=>{
            item.clickFlag=-1
          })
          tmp[index].children[0].clickFlag=1
        }
        if(tmp[index].caption=="能耗展示"){
          this.$store.commit('conditionSelect/activeIndex',2)
          this.$store.commit('conditionSelect/curModule',2)
        }else if(tmp[index].caption=="统计分析"){
          this.$store.commit('conditionSelect/activeIndex',1)
          this.$store.commit('conditionSelect/curModule',1)
        }else if(tmp[index].caption=="节能诊断"){
          this.$store.commit('energySavingSelect/energySaveFlag',1)
        }
        Cookies.set('activeNav',{fatherIndex:index,childIndex:0,fatherName:tmp[index].caption})

        this.$router.push(tmp[index].url)
      },
      clickChangeChild(index,i){  //点击子标题时
        let tmp = this.menuData.children
        tmp.map((item)=>{
          item.children.map((child)=>{
            child.clickFlag=-1
            child.bgFlag=-1
          })
        })
        tmp[index].children[i].clickFlag=1
        if(tmp[index].children[i].caption=="分时能耗"){
          this.$store.commit('conditionSelect/curModule',2)
        }else if(tmp[index].children[i].caption=="分项能耗"){
          this.$store.commit('conditionSelect/curModule',3)
        }else if(tmp[index].children[i].caption=="能耗排名"){
          this.$store.commit('conditionSelect/activeIndex',1)
        }else if(tmp[index].children[i].caption=="水量异常突增诊断"){
          this.$store.commit('energySavingSelect/energySaveFlag',1)
        }else if(tmp[index].children[i].caption=="夜间用水跑冒滴漏诊断"){
          this.$store.commit('energySavingSelect/energySaveFlag',1)
        }else if(tmp[index].children[i].caption=="用电量异常突增诊断"){
          this.$store.commit('energySavingSelect/energySaveFlag',2)
        }else if(tmp[index].children[i].caption=="夜间用电浪费诊断"){
          this.$store.commit('energySavingSelect/energySaveFlag',2)
        }
        Cookies.set('activeNav',{fatherIndex:index,childIndex:i,fatherName:tmp[index].caption})
        this.$router.push(tmp[index].children[i].url)
      },
      showLogout(flag){
         this.showOut=flag==1?true:false
      },
      sureLogOut(){
        // Cookies.clear()
        this.$router.push('/login')
      },
      activeBg(item){
        if(item.bgFlag==-1 && item.clickFlag!=1){
          return {}
        }else{
          return {
            backgroundImage:'url('+this.hover_bg+')',
            backgroundPosition: '0 0',
            backgroundSize: '100% 100%'
          }
        }
      },
      alarmWebSocket(){
        let wsUrl=`${window.websocketBaseUrl}/vibe-web/websocket`
        this.ws = new WebSocket(wsUrl);//这里面的this都指向vue
        this.ws.onopen = this.websocketOpen;
        this.ws.onmessage = this.websocketOnMessage;
        this.ws.onclose = this.websocketClose;
        this.ws.onerror = this.websocketError;
      },
      websocketOpen(){
        this.ws.send('alarm');
        console.log('websocket连接成功，alarm已发送');
      },
      websocketOnMessage(data){
        console.log(111,data)
      },
      websocketClose(){
        console.log("websocket连接已断开！");
        this.ws.close();
      },
      websocketError(){
        console.log("WebSocket连接失败");
      }
    },
    async mounted(){
      this.getMenus()
      await this.getSystemSetting()
      // this.alarmWebSocket()
    }
  }
</script>

<style lang="less">
  .father-nav{
    /*:style="{backgroundImage:'url('+fatherBg+')'}"*/
    /*background: url("../../../static/image/nav1.png");*/
    width:100%;
    height: 50px;
    padding: 0 20px;
    position: fixed;
    left:0;
    top:0;
    z-index: 99;
    box-sizing: border-box;
    background: #012030;
    .sys-title{
      flex-shrink: 0;
      font-size: 24px;
      color:@white;
      font-weight: 600;
    }
    .father-nav-list{
      width:100%;
      flex-shrink: 1;
      padding:0 15px;
      .father-item{
        text-align: center;
        color:@navFontColor;
        cursor: pointer;
        font-size: 18px;
        width:100%;
        height:50px;
        line-height: 50px;
      }
      .activeBg{
        /*background-image: var(--hover_bg);*/
        background-position: 0 0;
        background-size: 100% 100%;
      }
    }
    .operator-box{
      flex-shrink: 0;
      color:@navFontColor;
      font-size: 20px;
      height: 100%;
      /*line-height: 50px;*/
      div{
        height: 100%;
        float: left;
        line-height: 50px;
        margin: 0 5px;
      }
      &:hover{
        cursor: pointer;
      }
      .login-out-box{
        position: relative;
      }
      .login-out{
        position: absolute;
        bottom:-50px;
        left:0;
        width:100%;
        background: #e9edf6;
        color:#005773;
        text-align: center;
        font-size: 14px;
        z-index:99;
      }
    }
  }
  .child-nav-list{
    /*background: url('../../../static/image/nav2.png');*/
    /*:style="{backgroundImage:'url('+childBg+')'}"*/
    height: 35px;
    width: 100%;
    position: absolute;
    left:0;
    display: flex;
    justify-content: center;
    background: #005773;
    .child-item{
      float: left;
      line-height: 35px;
      padding:0 20px;
      margin:0 10px;
      font-size: 16px;
      color:@white;
      background: rgba(0,0,0,.3);
      &:hover{
        cursor: pointer;
      }
    }
    .activeChild{
      color:@navChildColor;
    }
  }
</style>
