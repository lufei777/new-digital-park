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
            @start="onInnerStart"
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

  export default {
    name: 'LargeSizeScreenNormal',
    components: {
      Header,
      draggable,
      ItemProModule
    },
    props: ['fromFlag'],  //fromFlag 1:配置页
    data() {
      return {
        headName: '',
        moduleList: [],
        animationFlag: false,
        outDisable: false,
        innerDisable: true,
        centerIndex: 0,
        styleObj: {
          panelStyle: {}, //面板样式
          centerStyle: {}, //中心样式
          dragStyle: {},  //小模块样式
          centerSize:{}  //中心大小
        },
        moduleMaxWidth: 960, //模块最大的宽度
        widthPercent: 1, //配置页时是原来大屏的百分之多少
        heightPercent: 1, //配置页时是原来大屏的百分之多少
        moduleMargin: 20,  //模块间距
        headerHeight: 160   //顶部高度
      }
    },
    computed: {},
    watch: {},
    methods: {
      getOptions() {
        return {draggable: '.out-drag-product', group: "out-product", disabled: false}
      },
      getInnerOptions() {
        return {draggable: '.inner-drag-content', group: 'inner-product', disabled: true}
      },
      async getLargeScreenModuleList() {
        this.setConfigParams()  //配置页时需要缩小
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
          this.styleObj.centerSize={
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
        let xLen = res.xLength + this.moduleMargin
        let yLen = res.yLength + this.moduleMargin
        let paddingLeft = ($(".content").width() - xLen * res.xNum) / 2
        let heightOther = ($(".large-size-screen-normal").height() - this.headerHeight - yLen * res.yNum)
        let margin = heightOther / 2 / (res.yNum)
        // console.log("margin", margin)
        yLen = yLen + margin
        let marginTop = heightOther / 2 / 2

        this.styleObj.panelStyle = {
          "grid-template-columns": "repeat(" + res.xNum + "," + xLen + "px)",
          "grid-template-rows": "repeat(" + res.yNum + "," + yLen + "px)",
          "padding-left": paddingLeft + "px",
          "margin-top": marginTop + "px"
        }
        // console.log("len", xLen, this.moduleMaxWidth)
        this.styleObj.centerStyle = {
          "grid-column-start": this.centerIndex + 1,
          "grid-column-end": xLen < this.moduleMaxWidth ? this.centerIndex + 4 : this.centerIndex + 3,
          "grid-row-start": 1,
          "grid-row-end": xLen < this.moduleMaxWidth ? 4 : 3,
        }
        // console.log(  this.styleObj.centerStyle)
        this.styleObj.dragStyle = {
          width: res.xLength + 'px',
          height: res.yLength + 'px',
          "grid-column": 'unset',
          "grid-row": 'unset',
        }
        // console.log(this.styleObj.centerStyle)
      },
      onOutChange(evt) {
        // console.log("evt", evt, this.moduleList)
        $(".center-show").css({...this.styleObj.centerStyle,...this.styleObj.centerSize})
        $(".large-size-screen-normal .out-drag-product").css(this.styleObj.dragStyle)
      },
      onOutStart() {
        // console.log("lalala")
      },
      onInnerStart() {
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
        if (this.fromFlag == 1) {
          let baseWidth = $(".preview-panel").width() / $(".module-configure").width()
          let baseHeight = $(".preview-panel").height() / $(".module-configure").height()
          this.widthPercent = parseFloat((parseInt(baseWidth * 100) / 100).toFixed(2))
          this.heightPercent = parseFloat((parseInt(baseHeight * 100) / 100).toFixed(2))
          this.moduleMaxWidth = parseInt((this.moduleMaxWidth * this.widthPercent))
          this.moduleMargin = parseInt((this.moduleMargin * this.widthPercent))
          this.headerHeight = parseInt((this.headerHeight * this.heightPercent))

          $(".large-size-screen-header").css({
            height: this.headerHeight + 'px'
          })
          $(".park-logo,.digital-title-text").css({
            "fontSize": "40px"
          })
        }
      }
    },
    mounted() {
      this.getMenuTree()
      this.getLargeScreenModuleList()
      let _this = this
      $(window).resize(async function () {
       await _this.getLargeScreenModuleList()
        let obj = {
          width:"1920px",
          height:'1080px'
        }
        $(".center-show").css(obj)
        console.log("sizechange", $(".center-show").length,obj)
      })
    },
    created(){

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
      width:1920px;
      height:1080px;
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
