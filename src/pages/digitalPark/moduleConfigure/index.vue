<template>
  <div class="module-configure flex-column" v-loading="loading">
    <div v-show="!isFull">
      <div class="set-tip">模式设置</div>
      <div class="module-change">
        <el-button @click="onClickModuleBtn('2')" :style="type==2?moduleBtnBg:defaultBtn" >{{$t('homeHeader.waterfall')}}</el-button>
        <el-button @click="onClickModuleBtn('1')" :style="type==1?moduleBtnBg:defaultBtn" >{{$t('homeHeader.dashboard')}}</el-button>
      </div>
    </div>
    <div :class="isFull?'full-main-container':'main-container'">
      <div :class="isFull?'hide':'left-module-list'">
          <div v-for="item in proModuleList"
             :key="item.id"
             :class="['item-left-pro','hover-pointer',item.activeFlag?'active-pro':'']"
             @click="onClickItemProModule(item)">{{item.name}}</div>
      </div>
      <div class="module-content-list" v-show="!isFull">
        <draggable :list="contentList"
                   v-bind="getOptions()"
                   @change="onDragChange"
                   @start="onDragStart"
                   @end="onDragEnd"
                   :move="onDragMove"
                   class="content-drag-box"

        >
          <component v-for="(item,index) in contentList"
                     :key="index"
                     :is="item.componentName"
                     :moduleItem="item"
                     :class="['item-content','flex-colum-center',item.dragFlag?'item-drag-product':'']"
                     :style="contentBg(item)"
                     :id="item.id"
          />
        </draggable>
      </div>
      <div :class="isFull?'full-right-module-content':'right-module-content'">
        <div :class="isFull?'full-preview-panel':'preview-panel'" >
          <Dashboard v-if="type==1" :curProModule="curProModule" :hideHeader="true" ref="dashboard"/>
          <HomePage v-if="type==2" :curProModule="curProModule" :hideHeader="true" ref="homePage"></HomePage>
        </div>
        <div class="operator-box" v-if="!isFull">
          <el-button  @click="onClickSureBtn" :style="defaultBtn">确认</el-button>
          <el-button  @click="onClickGoBackBtn" :style="defaultBtn">取消</el-button>
          <el-button  @click="onClickFullScreenBtn" :style="defaultBtn">预览</el-button>
        </div>
      </div>
    </div>
    <div v-show='isFull && showEsc'
         class="esc-full-btn hover-pointer"
         :style="escFullBtnBg"
         @click="onClickEscBtn"
    >
      <img src="../../../../static/image/digitalPark/esc_btn.png" alt="">
      <span>退出全屏</span>
    </div>
  </div>
</template>

<script>
  import DigitalParkApi from '../../../service/api/digitalParkApi'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import draggable from 'vuedraggable'
  import HomePage from '../home/index'
  import Dashboard from '../home/dashboard'
  import CommonFun from '../../../utils/commonFun'
  import {mapState} from 'vuex'
  export default {
    name: 'ModuleConfigure',
    components: {
      ...CommonFun.exportComs,
      Dashboard,
      draggable,
      HomePage,
    },
    data() {
      return {
        proModuleList: [],
        contentList: [],
        isFull: false,
        curProModule:{},
        userProModuleList:[],
        contentListDragFlag:true,
        showEsc:false,
        loading:true,
        curDrag:''
      }
    },
    computed:{
      type(){
        return this.$route.query.type
      },
      moduleBtnBg(){
        return {
           backgroundImage:'url('+require('../../../../static/image/digitalPark/module_btn_bg.png')+')',
           color:'#fff',
           'background-repeat':'no-repeat',
           'background-size':'100% 100%'
        }
      },
      defaultBtn(){
        return {
          border:'1px solid #0257FF',
          color:'#0257FF'
        }
      },
      escFullBtnBg(){
        return {
          backgroundImage:'url('+require('../../../../static/image/digitalPark/full_btn_bg.png')+')',
        }
      },
      ...mapState({
        dragFlag:state=>state.digitalPark.dragFlag
      })
    },
    watch:{
      dragFlag(){
        this.setContentListDragFlag(this.dragFlag)
      },
      async type(){
        await this.getModulesByType()
        this.getProModules()
      }
    },
    methods: {
      async getProModules() {
        let res = await DigitalParkApi.getProModules({
          language:Cookies.get('lang'),
          chart:this.type //是否显示非图表类
        })
        this.loading=false
        res[0].activeFlag=true
        let tmp = this.setItemDragFlag(this.userProModuleList,res)
        this.proModuleList = tmp
        this.curProModule=tmp[0]
        this.contentList = tmp[0].moduleList
      },
      onClickItemProModule(item,index) {
        this.contentList = item.moduleList
        this.curProModule=item
        this.proModuleList.map((item)=>{
          item.activeFlag=false
        })
        item.activeFlag=true
        if($('#' + item.id).length){
          let mainContainer = $('.preview-panel')
          mainContainer.animate({
            scrollTop:$('#' + item.id).offset().top-mainContainer.offset().top +mainContainer.scrollTop()
          }, 500);
        }
      },
      onClickFullScreenBtn() {
        this.isFull = !this.isFull
        let erd = elementResizeDetectorMaker()
        let that = this
        erd.listenTo($(".item-product-coms").eq(0), function () {
          that.$nextTick(function () {
            $(window).resize()
          })
        })
      },
      onDragChange(){

      },
      getOptions(){
        return {
          group:{name:'product',pull:'clone'},
          draggable:'.item-drag-product',
          disabled:!this.contentListDragFlag,
          ghostClass:'drag-shadow',
          dragClass:'drag-shadow',
          chosenClass:'drag-shadow'
        }
      },
      async getModulesByType(){
        let res = await DigitalParkApi.getModulesByType({
          type:this.type,
          language:Cookies.get('lang')
        })
        this.userProModuleList=res
      },
      setItemDragFlag(userList,res=this.proModuleList){
        res.map((item)=>{
          item.moduleList.map((module)=>{
            module.dragFlag=true
            userList.map((userItem)=>{
              userItem.moduleList.map((userModule)=>{
                if(module.id==userModule.id){
                  module.dragFlag=false
                }
              })
            })
          })
        })
        return res
      },
      setContentListDragFlag(val){
        this.contentListDragFlag=val
      },
     async onClickSureBtn(){
        if(this.type==1){
          await this.$refs.dashboard.sureUpdateUserProModules()
          // this.$router.push(`/digitalPark/dashboardHomePage`)
        }else{
          await this.$refs.homePage.sureUpdateUserProModules()
          // this.$router.push(`/digitalPark/homePage`)
        }

        // setTimeout(()=>{
        //   if(this.type==1){
        //     this.$router.push(`/digitalPark/dashboardHomePage`)
        //   }else{
        //     this.$router.push(`/digitalPark/homePage`)
        //   }
        // },1000)
      },
      onClickModuleBtn(val){
        this.$router.push(`/digitalPark/moduleConfigure?type=${val}`)
      },
      onClickGoBackBtn(){
        if(this.type==1){
          this.$router.push(`/digitalPark/dashboardHomePage`)
        }else{
          this.$router.push(`/digitalPark/homePage`)
        }

      },
      controlHeader() {
        $("body").mousemove((e) => {
          if(e.clientY<50){
            this.showEsc=true
          }else{
            this.showEsc=false
          }
        })
      },
      onClickEscBtn(){
        this.isFull=false
      },
      onDragStart(evt){
        this.curDrag=evt.item.id
        if(this.type==2) {
          this.$refs.homePage.setItemModuleDragFlag('start')
        }
      },
      onDragEnd(){
        this.curDrag=''
        if(this.type==2) this.$refs.homePage.setItemModuleDragFlag('end')
      },
      onDragMove(evt){

      },
      contentBg(item){
        if(this.curDrag==item.id){
          return {
            backgroundImage:'url('+require('../../../../static/image/digitalPark/content_bg.png')+')',
          }
        }else{
          return {}
        }
      },
    },
    async mounted() {
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      await this.getModulesByType()
      this.getProModules()
      this.controlHeader()
    }
  }
</script>

<style lang="less">
  .module-configure{
    position: relative;
    height: 100%;
    overflow: hidden;
    .left-module-list{
      width:8%;
      height: 100%;
      float: left;
      background: #11163A;
      text-align: center;
      padding:10px 0;
      /*margin-left:10px;*/
      box-sizing: border-box;
    }
    .item-left-pro{
      display: block;
      padding:12px 0;
      color:#ddeeff;
    }
    .active-pro{
      background:rgba(2,87,255,1);
    }
    .module-content-list{
      width:20%;
      height:100%;
      overflow: auto;
      float: left;
      padding:10px;
      box-sizing: border-box;
      box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.15);
      border-radius:2px;
    }
    .right-module-content{
      width: 70%;
      float: left;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.15);
      border-radius:2px;
      box-sizing: border-box;
      /*margin:0 10px;*/
    }
    .content-drag-box{
      height: 100%;
    }
    .item-content{
      height:30%;
      width:100%;
      padding:5px;
      box-sizing: border-box;
      margin-bottom:20px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border:1px solid #d0d3dc;
    }
    .my-chart{
      width:100%;
      flex-grow: 1;
    }
    .preview-panel{
      width:98%;
      height:85%;
      margin:10px auto;
      box-sizing: border-box;
      overflow: auto;
    }
    .hide{
      display: none;
      width:0;
    }
    .full-right-module-content{
      width:100%;
      height: 100%;
    }
    .full-preview-panel{
      width:100%;
      height:100%;
    }
    .set-tip{
      height: 56px;
      width:100%;
      background: #0D1B27;
      color:#eeddff;
      text-align: center;
      line-height: 56px;
      font-size: 24px;
      font-weight: bold;
    }
    .module-change{
      width: 98%;
      margin-left:1px;
      padding:10px;
      top:56px;
      box-sizing: border-box;
    }
    .main-container{
      flex-grow: 1;
      width:98%;
      margin-left: 1%;
      overflow: hidden;
    }
    .full-main-container{
      flex-grow: 1;
      width:100%;
      overflow: auto;
    }
    .operator-box{
      text-align: center;
      .el-button{
        margin: 0 40px;
        width:84px;
      }
    }
    .esc-full-btn{
      width:93px;
      height:30px;
      line-height: 30px;
      text-align: center;
      color:#f2f2f2;
      position: absolute;
      top:0;
      right:0;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .drag-shadow{
      /*color:#fff;*/
      /*border:10px solid red;*/
      background-image: url('../../../../static/image/digitalPark/content_bg.png');
      background-repeat: no-repeat;
    }
  }

</style>
