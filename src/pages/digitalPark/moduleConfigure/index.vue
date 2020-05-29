<template>
  <div class="module-configure flex-column" v-loading="loading">
    <div v-show="!isFull">
      <div :class="type==3?'large-set-tip':'set-tip'">模块设置</div>
      <div class="module-change" v-if="type!=3">
        <el-button @click="onClickModuleBtn('2')" :class="type==2?'moduleBtnBg':'defaultBtn'">
          {{$t('homeHeader.waterfall')}}
        </el-button>
        <el-button @click="onClickModuleBtn('1')" :class="type==1?'moduleBtnBg':'defaultBtn'">
          {{$t('homeHeader.dashboard')}}
        </el-button>
      </div>
    </div>
    <div :class="isFull?'full-main-container':'main-container'">
      <div :class="isFull?'hide':'left-module-list'">
        <div v-for="item in proModuleList"
             :key="item.id"
             :class="[type==3?'large-item-left-pro':'item-left-pro','hover-pointer',item.activeFlag?'active-pro':'']"
             @click="onClickItemProModule(item)">{{item.name}}
        </div>
      </div>
      <div class="module-content-list" v-show="!isFull">

        <draggable :list="contentList"
                   v-bind="getOptions()"
                   @start="onDragStart"
                   @end="onDragEnd"
                   class="content-drag-box"

        >
          <component v-for="(item,index) in contentList"
                     :key="index"
                     :is="item.componentName"
                     :moduleItem="{...item,...{type:type}}"
                     :class="['item-content','flex-column-center',item.dragFlag?'item-drag-product':'']"
                     :style="contentBg(item)"
                     :id="item.id"
          />
        </draggable>
      </div>
      <div :class="isFull?'full-right-module-content':'right-module-content'">
        <div :class="isFull?'full-preview-panel':'preview-panel'">
          <DashboardNew v-if="type==1" :curProModule="curProModule"
                        :hideHeader="true" ref="dashboard"
                        :fullStatus='fullStatus'
          />
          <HomePage v-if="type==2" :curProModule="curProModule"
                    :hideHeader="true"
                    ref="homePage"
                    :forceFallback="forceBack"
          />
          <LargeSizeScreen v-if="type==3"
                           :fullStatus="fullStatus"
                           ref="largeSizeScreen"
          />
        </div>
        <div :class="type==3?'large-operator-box':'operator-box'" v-if="!isFull">
          <el-button @click="onClickSureBtn" class="defaultBtn">确认</el-button>
          <el-button @click="onClickFullScreenBtn" class="defaultBtn">预览</el-button>
          <el-button @click="onClickResetBtn" class="defaultBtn">重置</el-button>
          <el-button @click="onClickGoBackBtn" class="defaultBtn">返回</el-button>
        </div>
      </div>
    </div>
    <div v-show='isFull'
         :class="type==3?'large-esc-full-btn':'esc-full-btn'"
          class="hover-pointer"
         @click="onClickEscBtn"
    >
      <img src="../../../../static/image/digitalPark/esc_btn.png" alt="">
      <span>退出</span>
    </div>
  </div>
</template>

<script>
  import DigitalParkApi from '../../../service/api/digitalPark'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import draggable from 'vuedraggable'
  import HomePage from '../home/index'
  import comsImport from '../coms/js/comsImport'
  import {mapState} from 'vuex'
  import DashboardNew from '../home/dashboardNew'
  import LargeSizeScreen from '../../largeSizeScreen/index'

  export default {
    name: 'ModuleConfigure',
    components: {
      ...comsImport.exportComsList,
      draggable,
      HomePage,
      DashboardNew,
      LargeSizeScreen
    },
    data() {
      return {
        proModuleList: [{}],
        contentList: [],
        isFull: false,
        curProModule: {},
        userProModuleList: [],
        contentListDragFlag: true,
        showEsc: false,
        loading: true,
        curDrag: '',
        forceBack: true,
        fullStatus: 'noFull'
      }
    },
    computed: {
      type() {
        return this.$route.query.type  //1仪表盘 2瀑布流 3 大屏
      },
      ...mapState({
        dragFlag: state => state.digitalPark.dragFlag
      }),
      curCom(){
        return this.type==1?'dashboard':this.type==2?'homePage':'largeSizeScreen'
      }
    },
    watch: {
      dragFlag() {
        this.setContentListDragFlag(this.dragFlag)
      },
      async type() {
        await this.getModulesByType()
        this.getProModules()
      },
      isFull() {
        this.fullStatus = this.isFull ? 'full' : 'noFull'
        this.changeFontSize()
      }
    },
    methods: {
      async getProModules() {
        let res = await DigitalParkApi.getProModules({
          language: Cookies.get('lang'),
          chart: this.type == 1 ? 1 : 2 //是否显示非图表类
        })
        this.loading = false
        res[0].activeFlag = true
        let tmp = this.setItemDragFlag(this.userProModuleList, res)
        this.proModuleList = tmp
        this.curProModule = tmp[0]
        this.contentList = tmp[0].moduleList
      },
      onClickItemProModule(item, index) {
        this.contentList = item.moduleList
        this.curProModule = item
        this.proModuleList.map((item) => {
          item.activeFlag = false
        })
        item.activeFlag = true
        if ($('#' + item.id).length) {
          let mainContainer = $('.preview-panel')
          mainContainer.animate({
            scrollTop: $('#' + item.id).offset().top - mainContainer.offset().top + mainContainer.scrollTop()
          }, 500);
        }
      },
      onClickModuleBtn(val) {
        this.$router.push(`/digitalPark/moduleConfigure?type=${val}`)
      },
      async getModulesByType() {
        let res = await DigitalParkApi.getModulesByType({
          type: this.type,
          language: Cookies.get('lang')
        })
        this.userProModuleList = res
        this.changeFontSize()
        // console.log("length",$(".item-drag-product").length)
        // $(".park-home-page .item-module").css({
        //   height:383+'px'
        // })
      },
      async getLargeScreenModuleList() {
        let res = await DigitalParkApi.getLargeScreenModule({
          width: document.body.offsetWidth,
          height: document.body.offsetHeight,
          widthPercent: this.widthPercent,
          heightPercent: this.heightPercent
        })
        this.userProModuleList = res.modules || []
      },
      setItemDragFlag(userList =this.userProModuleList , res = this.proModuleList) {
        res.map((item) => {
          item.moduleList.map((module) => {
            module.dragFlag = true
            userList.map((userItem) => {
              userItem.moduleList.map((userModule) => {
                if (module.id == userModule.id) {
                  module.dragFlag = false
                }
              })
            })
          })
        })
        return res
      },
      setContentListDragFlag(val) {
        this.contentListDragFlag = val
      },
      async onClickSureBtn() {
         await this.$refs[this.curCom].sureUpdateUserProModules()
      },
      onClickGoBackBtn() {
        if (this.type == 1) {
          this.$router.push(`/digitalPark/dashboardHomePage`)
        } else if (this.type == 2) {
          this.$router.push(`/digitalPark/homePage`)
        } else if (this.type == 3) {
          this.$router.push(`/largeSizeScreen`)
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

        // $(".park-home-page .item-module").css({
        //   height:548+'px'
        // })
      },
      async onClickResetBtn(){
        if(this.type==3){
          $(".center-show").css({
            width:'1920px',
            height:'1080px'
          })
          this.$refs.largeSizeScreen.getLargeScreenModuleList()
        }else{
          this.$refs[this.curCom].getModulesByType()
          await this.getModulesByType()
          this.setItemDragFlag()
        }
      },
      onClickEscBtn() {
        this.isFull = false
      },
      contentBg(item) {
        if (this.curDrag == item.id) {
          return {
            backgroundImage: 'url(' + require('../../../../static/image/digitalPark/content_bg.png') + ')',
          }
        } else {
          return {}
        }
      },
      getOptions() {
        return {
          group: {name: 'product', pull: 'clone'},
          draggable: '.item-drag-product',
          disabled: !this.contentListDragFlag,
          ghostClass: 'drag-shadow',
          dragClass: 'drag-shadow',
          chosenClass: 'drag-shadow'
        }
      },
      onDragStart(evt) {
        // console.log("start-evt", evt)
        this.curDrag = evt.item.id
        if (this.type == 2) {
          this.$refs[this.curCom].setItemModuleDragFlag('start')
          this.forceBack = false
        } else{
          this.$refs[this.curCom].setInnerDisable(false)
        }
      },
      onDragEnd(evt) {
        // console.log('end',evt)
        this.curDrag = ''
        if (this.type == 2) {
          this.$refs[this.curCom].setItemModuleDragFlag('end')
          this.forceBack = true
        } else{
          this.$refs[this.curCom].setInnerDisable(true)
          let targetId = $(evt.to).attr('id')
          let flag
          if(this.type==1) {
            let classStr = $(evt.to).attr('class')
            flag = classStr.indexOf('left-item-drag-product') != -1 ? 'left' :
                   classStr.indexOf('right-item-drag-product') != -1 ? 'right' : ''
          }
          this.$refs[this.curCom].updateInnerModule(targetId,flag)
        }
      },
      changeFontSize(){
        let dom = $(".dashboard-park-home-page-new .item-drag-product,.dashboard-park-home-page-new .fixed-prod-module")
        if(this.isFull){
          dom.removeClass('smallFontSize')
        }else{
          dom.addClass('smallFontSize')
        }
      },
    },
    async mounted() {
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      if(this.type==3){
        await this.getLargeScreenModuleList()
      }else{
        await this.getModulesByType()
      }
      this.getProModules()
    }
  }
</script>

<style lang="less">
  .module-configure {
    position: relative;
    height: 100%;
    overflow: hidden;
    background: @white;

    .left-module-list {
      width: 8%;
      height: 100%;
      float: left;
      background: #11163A;
      text-align: center;
      padding: 10px 0;
      /*margin-left:10px;*/
      box-sizing: border-box;
      font-size: 16px;
      overflow: auto;
    }

    .item-left-pro, .large-item-left-pro {
      display: block;
      padding: 12px 0;
      color: #ddeeff;
    }

    .large-item-left-pro {
      font-size: 30px;
      padding: 24px;
    }

    .active-pro {
      background: rgba(2, 87, 255, 1);
    }

    .module-content-list {
      width: 20%;
      height: 100%;
      overflow: auto;
      float: left;
      padding: 10px;
      box-sizing: border-box;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
      border-radius: 2px;
    }

    .right-module-content {
      width: 72%;
      float: left;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
      border-radius: 2px;
      box-sizing: border-box;
      /*margin:0 10px;*/
    }

    .content-drag-box {
      height: 100%;
    }

    .item-content {
      height: 30%;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      margin-bottom: 20px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border: 1px solid #d0d3dc;
    }

    .my-chart {
      width: 100%;
      flex-grow: 1;
    }

    .preview-panel {
      width: 100%;
      /*overflow: auto;*/
      height: 90%;
      /*margin:10px auto;*/
      margin: 5% 0 0 0;
      box-sizing: border-box;
      overflow: auto;
    }

    .hide {
      display: none;
      width: 0;
    }

    .full-right-module-content {
      width: 100%;
      height: 100%;
    }

    .full-preview-panel {
      width: 100%;
      height: 100%;
    }

    .set-tip, .large-set-tip {
      height: 56px;
      width: 100%;
      background: #0D1B27;
      color: #eeddff;
      text-align: center;
      line-height: 56px;
      font-size: 24px;
      font-weight: bold;
    }

    .large-set-tip {
      height: 80px;
      line-height: 80px;
      font-size: 38px;
    }

    .module-change {
      width: 98%;
      margin-left: 1px;
      padding: 10px;
      top: 56px;
      box-sizing: border-box;
    }

    .main-container {
      flex-grow: 1;
      width: 98%;
      margin-left: 1%;
      overflow: hidden;
      box-sizing: border-box;
    }

    .full-main-container {
      flex-grow: 1;
      width: 100%;
      overflow: auto;
    }

    .operator-box, .large-operator-box {
      height: 20%;
      display: flex;
      align-items: center;
      justify-content: center;

      .el-button {
        margin: 0 40px;
      }
    }

    .large-operator-box {
      .el-button {
        width: 198px;
        height: 64px;
        font-size: 30px;
      }
    }

    .esc-full-btn ,.large-esc-full-btn{
      width: 93px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #f2f2f2;
      position: absolute;
      top: 0;
      right: 0;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../../../static/image/digitalPark/full_btn_bg.png');
    }
    .large-esc-full-btn{
      width:253px;
      height:100px;
      line-height: 100px;
      font-size: 34px;
      img{
        width:30px;
        height:30px;
      }
    }

    .drag-shadow {
      background-image: url('../../../../static/image/digitalPark/content_bg.png');
      background-repeat: no-repeat;
    }

    .moduleBtnBg {
      background-image: url('../../../../static/image/digitalPark/module_btn_bg.png');
      color: #fff;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .moduleBtnBg.el-button:focus {
      color: @white;
    }

    .defaultBtn {
      border: 1px solid #0257FF;
      color: #0257FF;
    }

    .module-item-top-name{
      width:100%;
      text-align: left;
      padding-left:5%;
      box-sizing: border-box;
    }

    .dashboard-park-home-page-new{
      /*.item-drag-product,.fixed-prod-module{*/
        /*font-size: 12px;*/
      /*}*/
      /*.smallFontSize{*/
        /*font-size: 12px;*/
      /*}*/
    }

    .left-module-list, .module-content-list, .preview-panel {
      &::-webkit-scrollbar { /*滚动条整体样式*/
        width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }

      &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ccc;
      }

      &::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #EDEDED;
      }
    }

  }

</style>
