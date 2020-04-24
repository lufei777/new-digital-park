<template>
  <div class="large-size-screen-normal">
    <Header fromFlag="2" :headName="headName"/>
    <div class="content flex">
      <draggable
        class="drag-panel"
        :list="moduleList"
        v-bind="getOptions()"
        @change="onOutChange"
        @start="onOutStart"
      >
        <transition name="el-zoom-in-center" v-for="(item,index) in moduleList" :key="index">
          <draggable
            :class="item.id==0 && item.moduleList?'center-show':'out-drag-product'"
            :list="[item]"
            v-bind="getInnerOptions()"
            v-show="animationFlag"
            @change="onInnerChange"
          >
            <ItemProModule
              class="inner-drag-content"
              type="1"
              :moduleData="item?{...item,...{largeScreen:true}}:{}"
            />
          </draggable>
        </transition>
      </draggable>
    </div>
  </div>
</template>

<script>
  import Header from '../digitalPark/coms/header'
  import draggable from 'vuedraggable'
  import DigitalParkApi from '@/service/api/digitalPark'
  import ItemProModule from '@/pages/digitalPark/coms/itemProModule'
  import CommonFun from '@/utils/commonFun'

  export default {
    name: 'LargeSizeScreenNormal',
    components: {
      Header,
      draggable,
      ItemProModule
    },
    props: ['fullStatus'],  //配置页时是否是全屏状态
    data() {
      return {
        headName: '',
        moduleList: CommonFun.modules,
        animationFlag: false,
        outDisable: false,
        innerDisable: true,
        centerIndex: 0,
        styleObj: {
          panelStyle: {}, //面板样式
          centerStyle: {}, //中心样式
          dragStyle: {},  //小模块样式
          centerSize: {}  //中心大小
        },
        moduleMaxWidth: 960, //模块最大的宽度
        widthPercent: 1, //配置页时是原来大屏的百分之多少
        heightPercent: 1, //配置页时是原来大屏的百分之多少
        moduleMargin: 20,  //模块间距
        headerHeight: 160   //顶部高度
      }
    },
    computed: {},
    watch: {
      fullStatus(){
        console.log("this.full",this.fullStatus)
        this.getLargeScreenModuleList()
      }
    },
    methods: {
      getOptions() {
        return {draggable: '.out-drag-product', group: "out-product", disabled: this.outDisable}
      },
      getInnerOptions() {
        return {draggable: '.inner-drag-content', group: 'product', disabled: this.innerDisable}
      },
      async getLargeScreenModuleList(flag) {
        this.setConfigParams(flag)  //配置页时需要缩小或还原

        let res = await DigitalParkApi.getLargeScreenModule({
          width: document.body.offsetWidth,
          height: document.body.offsetHeight,
          widthPercent: this.widthPercent,
          heightPercent: this.heightPercent
        })
        this.moduleList = res.modules || []
        this.centerIndex = res.modules.findIndex(item => item.id == 0 && item.moduleList)
        this.drawPageStyle(res)

        setTimeout(() => {
          this.styleObj.centerSize = {
            "width": parseInt(($(".center-show").width() * this.widthPercent)) + 'px',
            "height": parseInt(($(".center-show").height() * this.heightPercent)) + 'px'
          }
          $(".center-show").css(this.styleObj.centerSize)
          $(".drag-panel").css(this.styleObj.panelStyle)
          $(".center-show").css(this.styleObj.centerStyle)
          $(".large-size-screen-normal .out-drag-product").css(this.styleObj.dragStyle)
          this.animationFlag = true
        }, 500)
      },
      drawPageStyle(res) {
        let xLen = res.xModule.length + this.moduleMargin
        let yLen = res.yModule.length + this.moduleMargin
        let paddingLeft = ($(".content").width() - xLen * res.xModule.num) / 2
        let heightOther = ($(".large-size-screen-normal").height() - this.headerHeight - yLen * res.yModule.num)
        let margin = heightOther / 2 / (res.xModule.num)
        yLen = yLen + margin
        let marginTop = heightOther / 2 / 2

        this.styleObj.panelStyle = {
          "grid-template-columns": "repeat(" + res.xModule.num + "," + xLen + "px)",
          "grid-template-rows": "repeat(" + res.yModule.num + "," + yLen + "px)",
          "padding-left": paddingLeft + "px",
          "margin-top": marginTop + "px"
        }

        this.styleObj.centerStyle = {
          "grid-column-start": this.centerIndex + 1,
          "grid-column-end": xLen < this.moduleMaxWidth ? this.centerIndex + 4 : this.centerIndex + 3,
          "grid-row-start": 1,
          "grid-row-end": xLen < this.moduleMaxWidth ? 4 : 3,
        }

        this.styleObj.dragStyle = {
          width: res.xModule.length + 'px',
          height: res.yModule.length + 'px',
          "grid-column": 'unset',
          "grid-row": 'unset',
        }

      },
      async onOutChange(evt) {
        // console.log("evt", evt, this.moduleList)
        $(".center-show").css({...this.styleObj.centerStyle, ...this.styleObj.centerSize})
        $(".large-size-screen-normal .out-drag-product").css(this.styleObj.dragStyle)
        let tmp = _.cloneDeep(this.moduleList)
        let index = tmp.findIndex(item => item.id == 0 && item.moduleList.length)
        tmp.splice(index, 1)
        let obj={
          width: document.body.offsetWidth,
          height: document.body.offsetHeight,
          modules:tmp
        }
        await DigitalParkApi.updateLargeScreenModule(obj)
        // this.getLargeScreenModuleList()
      },
      onOutStart() {
        // console.log("lalala")
      },
      onInnerChange() {
        // console.log("inner lalala")
      },
      async getMenuTree() {
        let res = await DigitalParkApi.getMenuTree({
          language: Cookies.get("lang")
        });
        localStorage.setItem('menuTree', JSON.stringify(res))
        this.headName = res[0].name
      },
      setConfigParams() {
        if (this.fullStatus == 'noFull') {
          let baseWidth = $(".preview-panel").width() / $(".module-configure").width()
          this.widthPercent = parseFloat((parseInt(baseWidth * 100) / 100).toFixed(2))
          $(".park-logo,.digital-title-text").css({
            "fontSize": "40px"
          })
        }else if(this.fullStatus=="full"){
          this.widthPercent = 1
          $(".park-logo,.digital-title-text").css({
            "fontSize": "76px"
          })
          $(".center-show").css({
            width: '1920px',
            height: '1080px'
          })
          this.moduleMaxWidth = 960
          this.moduleMargin = 20
          this.headerHeight = 160
        }
        this.heightPercent = this.widthPercent
        this.moduleMaxWidth = parseInt((this.moduleMaxWidth * this.widthPercent))
        this.moduleMargin = parseInt((this.moduleMargin * this.widthPercent))
        this.headerHeight = parseInt((this.headerHeight * this.heightPercent))

        $(".large-size-screen-header").css({
          height: this.headerHeight + 'px'
        })
      },
      setInnerDragFlag(val){
         this.innerDisable=val
         console.log(this.innerDisable)
      }
    },
    mounted() {
      this.getMenuTree()
      this.getLargeScreenModuleList()
      let _this = this
      $(window).resize(async function () {
        await _this.getLargeScreenModuleList()
        let obj = {
          width: "1920px",
          height: '1080px'
        }
        $(".center-show").css(obj)
        console.log("sizechange", $(".center-show").length, obj)
      })
    },
    created() {
      let res = CommonFun.largeScreenDefaultData
      this.drawPageStyle(res)
    }
  }
</script>

<style lang="less">
  .large-size-screen-normal {
    height: 100%;
    font-size: @largeScreenFontSize;
    color: @white;

    .large-size-screen-header {
      .digital-title-text {
        font-size: 76px;
      }

      .park-logo {
        font-size: 76px;
        margin-right: 5px;
      }
    }

    .digital-nav-operator {
      font-size: @largeScreenFontSize;

      .nav-right-item .el-input__inner {
        font-size: @largeScreenFontSize;
        color: @white;
      }

      .avatar-img {
        width: 50px;
        height: 50px;
      }

      .nav-right-item span {
        width: 200px;
      }

      .nav-right-item .el-input__suffix {
        right: -85px;
      }

      .el-select .el-input .el-select__caret {
        font-size: 20px;
      }
    }

    .out-drag-product {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('../../../static/image/digitalPark/module_bg.png');
      margin: auto;
      width:690px;
      height:388px;
      overflow: hidden;
      .item-content{
        height:100%;
      }
      /*font-size: 188px;*/
      /*text-align: center;*/
      /*color:red;*/
      /*margin:0 20px 20px 20px;*/
      /*margin:auto;*/
    }

    .drag-panel {
      display: grid;
      width: 100%;
      /*padding:20px;*/
      /*grid-template-columns: repeat(auto-fill,700px);*/
      /*grid-template-rows: repeat(auto-fill,400px);*/
    }

    .center-show {
      /*width: 1920px !important;*/
      /*height: 1080px !important;*/
      width: 1920px;
      height: 1080px;
      box-sizing: border-box;
      border: 1px solid pink;
      /*margin:0 auto;*/
      margin: auto;
      /*grid-row-start: 1;*/
      /*grid-row-end: 4;*/
      /*grid-column-start: 3;*/
      /*grid-column-end: 6;*/
      /*margin:0 20px 20px 20px;*/
    }

    .inner-drag-content {
      height: 100%;
    }

    .single-module-name {
    }

    .el-dropdown {
      font-size: @largeScreenFontSize;
      color: @white;
    }
  }

</style>
