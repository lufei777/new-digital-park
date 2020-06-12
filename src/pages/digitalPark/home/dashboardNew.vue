<template>
  <div class="dashboard-park-home-page-new">
    <Header v-if="!hideHeader"
            from-flag="1"
            :moduleType.sync="moduleType"
            :headName="headName"
            :showGoBack="showGoBack"
    />
    <div class="dashboard-content-panel">
      <div class="dashboard-left">
        <draggable :list="proModuleList1" class="draggable-box1"
                   @change="onLeftChange"
                   v-bind="getOptions()"
                   @start="onLeftStart"
                   :move="onLeftMove"
                   @end="onLeftEnd"
        >
          <draggable v-for="(item,index) in proModuleList1"
                     class="item-drag-product left-item-drag-product"
                     :key="item.id"
                     :list="[item]"
                     :id="index"
                     v-bind="getInnerOptions()"
                     @start="onLeftInnerStart"
                     @end="onLeftInnerEnd"
                     @change="onInnerChange"
          >
            <ItemProModule
              class="inner-drag-content"
              :moduleData="item"
              :type="1"
              :hide-header="hideHeader"
              :fullStatus='fullStatus'
            />
          </draggable>

        </draggable>
      </div>

      <div class="dashboard-center">
        <img v-if="pageFlag==2 && !isyd" src="../../../../static/image/digitalPark/unity_priview.png"
        class="unity_priview"
        alt="">
        <iframe v-if="pageFlag==1 && !isyd"
        src="../../../../static/clientModel/zgHomePage/index.html"
        frameborder="0"
        class="unity-frame"></iframe>
        <iframe v-if="isyd" src="../../../../static/clientModel/ydCityHomePage/index.html"
        frameborder="0"
        class="unity-frame"></iframe>
        <AlertAlarm v-if="pageFlag==1 && !iszg"/>
      </div>
      <div class="dashboard-right">
        <draggable :list="proModuleList2"
                   v-bind="getOptions()"
                   class="draggable-box2"
                   @change="onRightChange"
                   :move="onRightMove"
                   @start="onRightStart"
                   @end="onRightEnd"
        >
          <draggable v-for="(item,index) in proModuleList2"
                     class="item-drag-product right-item-drag-product"
                     :key="item.id"
                     :list="[item]"
                     :id="index"
                     v-bind="getInnerOptions()"
                     @change="onInnerChange"
                     @start="onRightInnerStart"
                     @end="onRightInnerEnd"
          >
            <ItemProModule
              class="inner-drag-content"
              :moduleData="item"
              :type="1"
              :hide-header="hideHeader"
              :fullStatus='fullStatus'
            />
          </draggable>
        </draggable>

        <div class="fixed-prod-module">
          <span>{{$t('proEntry')}}</span>
          <div class="product-list">
            <!--<el-tooltip v-for="(item) in showFixedProList" :key="item.id"-->
            <!--effect="dark" :content="item.name" placement="top-end">-->
            <!---->
            <!--</el-tooltip>-->
            <div class="fixed-pro-item hover-pointer"
                 v-for="(item,index) in showFixedProList"
                 :key="item.id"
                 :style="{backgroundImage:'url('+item.bg+')'}"
                 @click="onClickItemFixPro(item)"
                 @mouseenter="changeItemBg(index,1)"
                 @mouseleave="changeItemBg(index,2)"
            >{{item.name}}
            </div>
          </div>
          <div v-if="fixedProList.length>16" class="flex-align-center turn-page">
            <span class="left-btn hover-pointer iconfont iconzuo"
                  :class="activeBtnIndex==1?'active-btn':''"
                  @click="onClickTurnPageBtn(1)"
            ></span>
            <span class="right-btn hover-pointer iconfont iconyou" :class="activeBtnIndex==2?'active-btn':''"
                  @click="onClickTurnPageBtn(2)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import NavOperator from '../coms/navOperator'
  import DigitalParkApi from '../../../service/api/digitalPark'
  import ItemProModule from '../coms/itemProModule'
  import CommonFun from '../../../utils/commonFun'
  import Header from '../coms/header'
  import AlertAlarm from '../coms/alarm/alertAlarm'
  import {isYD, isZG} from "@/utils/project";

  export default {
    name: 'DashBoardHomePageNew',
    //fullStatus  noFull:不是全屏  full:全屏 （有值就表示在配置页）
    props: ['curProModule', 'hideHeader', 'fullStatus'],
    components: {
      draggable,
      NavOperator,
      ItemProModule,
      Header,
      AlertAlarm
    },
    data() {
      let menuTree = JSON.parse(localStorage.getItem('menuTree'))
      return {
        proModuleList1: [],
        proModuleList2: [],
        changeObj: {},
        fixedProList: [],
        showFixedProList: [],
        moduleType: "1",
        loading: true,
        innerDisable: true,
        outDragFlag: false,
        innerObj: {},
        activeBtnIndex: 2,
        clientMenu: {},
        headName: menuTree[0].name
      }
    },
    computed: {
      pageFlag() {
        return this.$route.path == '/digitalPark/dashboardHomePage' ? 1 : 2
      },
      productId() {
        return this.$route.query.productId
      },
      showGoBack() {
        return this.$route.query.productId ? true : false
      },
      isyd() {
        return isYD()
      },
      iszg() {
        return isZG()
      }
    },
    watch: {
      async productId() {
        await this.getProductList()
        this.getModulesByType()
        let menuTree = JSON.parse(localStorage.getItem('menuTree'))
        if (!this.productId) {
          this.headName = menuTree[0].name
        }
      },
      fullStatus() {
        let dom = $(".item-drag-product,.fixed-prod-module")
        console.log("111", $(".item-drag-product").length)
        if (this.fullStatus == 'full') {
          dom.removeClass('smallFontSize')
        } else if (this.fullStatus == 'noFull') {
          dom.addClass('smallFontSize')
        }
      }
    },
    methods: {
      async getModulesByType() {
        let res = await DigitalParkApi.getModulesByType({
          type: 1,
          language: Cookies.get('lang'),
          menuId: this.productId
        })
        this.proModuleList1 = res.slice(0, 3)
        this.proModuleList2 = res.slice(3)
        this.loading = false
        this.$nextTick(() => {
          if (this.fullStatus == 'noFull') {
            let dom = $(".item-drag-product,.fixed-prod-module")
            dom.addClass('smallFontSize')
          }
        })
      },
      async getProductList() {
        let res = await DigitalParkApi.getProductList({
          language: Cookies.get('lang')
        })
        let tmp = []
        if (this.productId) {
          this.clientMenu = res.find((item) => item.id == this.productId)
          if (this.clientMenu.childNode[0].name == "概览") {
            this.clientMenu.childNode.shift()
          }
          tmp = this.clientMenu.childNode
          this.headName = this.clientMenu.name
        } else {
          tmp = res
        }
        tmp.map((item) => {
          item.bg = '../../../../static/image/digitalPark/tag_large_bg.png'
        })
        this.fixedProList = tmp
        this.showFixedProList = this.fixedProList.length > 16 ? this.fixedProList.slice(0, 16) : this.fixedProList
      },
      async onLeftChange(evt) {
        // console.log('change1', evt)
        if (evt.moved && !this.curProModule) { //只要有curProModule就代表是配置页的拖动
          this.sureUpdateUserProModules()
        } else if (evt.removed) {
          //removed情况为仪表盘内部两组互相拖拽时才会发生，而且顺序是组2先added，组1才removed（反之亦然）
          //因此内部拖拽需要等removed的这一组执行完，才可以调用updateProModule
          this.proModuleList1.splice(evt.removed.oldIndex, 0, this.changeObj)
          this.updateProModule()
        } else if (evt.added) {
          let index = 1;
          if (evt.added.newIndex == 3) {
            index = -1
          }
          this.changeObj = this.proModuleList1.splice(evt.added.newIndex + index, 1)[0]
          if (!evt.added.element.moduleList) {
            this.updateProModule(evt.added, this.proModuleList1)
          }
        }
      },
      onRightChange: function (evt) {
        console.log('change2', evt)
        if (evt.moved && !this.curProModule) { //代表是仪表盘首页拖动而非配置页
          this.sureUpdateUserProModules()
        }
        if (evt.removed) {
          this.proModuleList2.splice(evt.removed.oldIndex, 0, this.changeObj)
          this.updateProModule()
        } else if (evt.added) {
          let index = 1;
          if (evt.added.newIndex == 2) {
            index = -1
          }
          this.changeObj = this.proModuleList2.splice(evt.added.newIndex + index, 1)[0]
          if (!evt.added.element.moduleList) {
            this.updateProModule(evt.added, this.proModuleList2)
          }
        }
      },
      getOptions() {
        return {draggable: '.item-drag-product', group: "out-product", disabled: this.outDragFlag}
      },
      onLeftStart(evt) {
        // console.log("start",evt)
        this.$parent.setContentListDragFlag &&
        this.$parent.setContentListDragFlag(false)
        // this.innerDisable=false
      },
      onLeftMove(evt) {
        // console.log('move',evt)
      },
      onLeftEnd() {
        this.$parent.setContentListDragFlag &&
        this.$parent.setContentListDragFlag(true)
        // this.innerDisable=true
      },
      onRightMove(evt) {
        // console.log('move2',evt)
      },
      onRightStart() {
        this.$parent.setContentListDragFlag &&
        this.$parent.setContentListDragFlag(false)
      },
      onRightEnd() {
        this.$parent.setContentListDragFlag &&
        this.$parent.setContentListDragFlag(true)
      },
      updateProModule(data, list) {
        if (this.curProModule && data && !data.element.moduleList) {
          let index = data.newIndex;
          if (list && list.length == 3 && data.newIndex == 3) {
            index = 2
          }
          if (list && list.length == 2 && data.newIndex == 2) {
            index = 1
          }
          this.curProModule.moduleList.map((item) => {
            if (item.id == data.element.id) {
              let obj = {
                menuName: item.menuName,
                type: 1,
                moduleList: [item],
              }
              // console.log(obj)
              list[index] = obj
              console.log('list', this.proModuleList1, this.proModuleList2)
            }
          })

        }
        if (!this.curProModule) {
          this.sureUpdateUserProModules()
        }
      },
      async sureUpdateUserProModules() {
        await DigitalParkApi.updateUserProModules([...this.proModuleList1, ...this.proModuleList2])
      },
      handleLangChange() {
        this.getModulesByType()
        this.getProductList()
      },
      onClickItemFixPro(item) {
        if (this.hideHeader) return; //配置页不进行后续操作
        if (!this.productId) {
          Cookies.set('moduleType', 1)
        }
        CommonFun.setShortcutList(this.fixedProList)
        this.$store.commit("digitalPark/menuList", item)
        CommonFun.loadPage(item)
      },
      getInnerOptions() {
        return {draggable: '.inner-drag-content', disabled: this.innerDisable, group: 'product'}
      },
      onLeftInnerStart(evt) {
        console.log('left-inner-start', evt)
        this.outDragFlag = false
      },
      onLeftInnerEnd() {
        this.outDragFlag = true
      },
      onInnerChange(evt) {
        console.log("inner-change1", evt)
        this.innerObj = {
          menuId: evt.added.element.pid,
          menuName: evt.added.element.menuName,
          type: 1,
          moduleList: [evt.added.element]
        }
        // this.proModuleList1[evt]
      },
      onRightInnerStart() {
      },
      onRightInnerEnd() {
      },
      setInnerDisable(val) {
        this.innerDisable = val
      },
      updateInnerModule(id, flag) {
        if (flag == 'left') {
          this.proModuleList1[id] = this.innerObj
        } else if (flag == 'right') {
          this.proModuleList2[id] = this.innerObj
        }
        this.$parent.setItemDragFlag &&
        this.$parent.setItemDragFlag([...this.proModuleList1, ...this.proModuleList2])
      },
      onClickTurnPageBtn(flag) {
        if (flag == 1) {
          this.showFixedProList = this.fixedProList.slice(0, 16)
          this.activeBtnIndex = 2
        } else {
          this.showFixedProList = this.fixedProList.slice(16)
          this.activeBtnIndex = 1
        }
      },
      changeItemBg(index, flag) {
        if (flag == 1) {
          this.$set(this.showFixedProList, index,
            {...this.showFixedProList[index], ...{bg: "../../../../static/image/digitalPark/tag_large_bg2.png"}}
          )
        } else {
          this.$set(this.showFixedProList, index,
            {...this.showFixedProList[index], ...{bg: "../../../../static/image/digitalPark/tag_large_bg.png"}}
          )
        }
      }
    },
    mounted() {
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.getModulesByType()
      this.getProductList()
    }
  }
</script>

<style lang="less">
  .dashboard-park-home-page-new {
    color: @white;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background-image: url('../../../../static/image/digitalPark/home.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .dashboard-left, .dashboard-right {
      width: 22%;
      height: 100%;
      color: @white;
      overflow: hidden;
    }

    .dashboard-right {
      /*display: flex;*/
      /*flex-direction: column;*/
    }

    .dashboard-center {
      width: 56%;
      overflow: hidden;
    }

    .draggable-box1 {
      height: 100%;
      overflow: hidden;
      position: relative;

      .item-drag-product:nth-child(3) {
        top: 68%;
        position: absolute;
      }

      .item-drag-product:nth-child(2) {
        top: 34%;
        position: absolute;
      }

      .item-drag-product:nth-child(1) {
        top: 0;
        position: absolute;
      }
    }

    .draggable-box2 {
      height: 67%;
      overflow: hidden;
      position: relative;

      .item-drag-product {
        height: 47.5%;
      }

      .item-drag-product:nth-child(2) {
        top: 50%;
        position: absolute;
      }
    }

    .item-drag-product, .fixed-prod-module {
      width: 100%;
      height: 32%;
      /*margin-bottom:2%;*/
      font-size: 16px;
      text-align: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('../../../../static/image/digitalPark/module_bg.png');
      overflow: hidden;

      .item-content {
        height: 100%;
      }
    }

    .fixed-prod-module {
      margin: 0;
      height: 33%;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;

      span {
        /*margin-bottom: 10px;*/
      }
    }

    .large-size-screen-header {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      height: 60px;
      overflow: hidden;
      background: rgba(255, 255, 255, .1);

      .news-box {
        height: 50px;
        color: #FF7A00;
      }

      .news-list {
        position: relative;
        transition: top 0.5s;
      }

      .news-item {
        line-height: 50px;
      }

      .park-logo {
        font-size: 30px;
        margin-right: 5px;
      }

      .digital-title {
        font-size: 30px;
        font-weight: bold;
        color: @white;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url('../../../../static/image/digitalPark/title_bg.png');
      }

      .news-box, .digital-title, .dashboard-nav-operator {
        flex: 1;
      }

      .digital-nav-operator {
        font-size: 14px;

        .nav-right-item {
          /*width:230px;*/
          text-align: right;

          span {
            width: 120px;
          }
        }

        .nav-right-item .el-input__inner {
          // width:150px;
          font-size: 14px;
          color: @white;
        }

        .avatar-img {
          width: 30px;
          height: 30px;
        }

        .nav-right-item .el-select {
          width: 120px;
        }

        .nav-right-item .el-input__suffix {
          width: 30px;
          right: 10px;

          .el-input__suffix-inner {
            width: 100%;
          }
        }

        .el-select .el-input .el-select__caret {
          font-size: 14px;
        }
      }
    }

    .dashboard-content-panel {
      display: flex;
      flex-grow: 1;
      padding: 10px;
      box-sizing: border-box;
      overflow: hidden;
    }

    .product-list {
      flex-grow: 1;
      box-sizing: border-box;
      padding-top: 10px;
      overflow: hidden;

      &:after {
        width: 40%;
        content: ''
      }
    }

    .fixed-pro-item {
      width: 23%;
      font-size: 12px;
      padding: 10px 0;
      flex-shrink: 0;
      float: left;
      margin: 15px 1% 1%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      /*background-image: url('../../../../static/image/digitalPark/tag_large_bg.png') ;*/
    }

    .carousel-box {
      width: 95%;
      height: 28%;
      margin: 0 auto 2% auto;
      border: 1px solid #ccc;
    }

    .unity-frame {
      width: 100%;
      height: 100%;
    }

    .dashboard-nav-operator {
      .digital-nav-operator {
        float: right;
      }
    }

    .unity_priview {
      width: 100%;
      height: 100%;
    }

    .inner-drag-content {
      height: 100%;
    }

    .turn-page {
      margin-bottom: 10px;

      span {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background: #4F89B2;
        color: #333;
        text-align: center;
        line-height: 20px;
        font-size: 5px;
      }

      .active-btn {
        color: #00bfee;
        background: #012f46;
        border: 1px solid #00bfee;
        box-sizing: border-box;
      }

      .left-btn {
        margin-right: 20px;
      }

      img {
        width: 10px;
        height: 10px;
      }
    }

    .smallFontSize {
      font-size: 12px;
    }
  }
</style>
