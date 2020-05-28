<template>
  <div class="large-size-screen-normal" :class="getBasicBg">
    <Header fromFlag="2" :headName="headName" v-if="!isydScreen"/>
    <YDHeader v-if="isydScreen"/>
    <div class="content flex">
      <draggable
        class="drag-panel"
        :list="moduleList"
        v-bind="getOptions()"
        @change="onOutChange"
        @start="onOutStart"
      >
        <!--<transition name="el-zoom-in-center" v-for="(item,index) in moduleList" :key="index">-->
          <draggable v-for="(item,index) in moduleList" :key="index"
            :class="getClass(item)"
            :list="[item]"
            :id="item.id"
            v-bind="getInnerOptions()"
            @change="onInnerChange"
          >
            <!--<ItemProModule-->
              <!--class="inner-drag-content"-->
              <!--type="1"-->
              <!--:moduleData="item?{...item,...{largeScreen:true,$index:index}}:{}"-->
              <!--@mouseenter="changeBg(item,1)"-->
              <!--@mouseleave="changeBg(item,-1)"-->
              <!--@click.native="changeBg(item,1)"-->
            <!--/>-->
            <ItemProModule
              class="inner-drag-content"
              type="1"
              :moduleData="item?{...item,...{largeScreen:true,$index:index,type:1}}:{}"
            />
          </draggable>
        <!--</transition>-->
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
  import { isYDScreen } from "@/utils/project";
  import YDHeader from '../digitalPark/coms/largeScreen/ydHeader'

  export default {
    name: 'LargeSizeScreenNormal',
    components: {
      Header,
      draggable,
      ItemProModule,
       YDHeader
    },
    props: ['fullStatus'],  //配置页时是否是全屏状态:full noFull
    data() {
      return {
        headName: '',
        moduleList:[],// CommonFun.largeScreenDefaultData.modules,
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
        headerHeight: 135,   //顶部高度
        innerObj:{}
      }
    },
    computed: {
      getBasicBg(){
        return {
          'haveBg':!isYDScreen(),
        }
      },
      isydScreen(){ //是否是伊甸城
        return isYDScreen()
      }
    },
    watch: {
      fullStatus(){
        this.getLargeScreenModuleList()
      },
      moduleList(){
      }
    },
    methods: {
      getClass(item){
        // console.log(item)
        let centerFlag= item.id==0 && item.moduleList
        return{
         'center-show':centerFlag,
          'out-drag-product':!centerFlag,
          'out-drag-product-normal':!centerFlag && item.bgStatus=='normal' && !isYDScreen(),
          'out-drag-product-hover':!centerFlag && item.bgStatus=='hover' && !isYDScreen(),
          'yd-out-drag-product':!centerFlag && isYDScreen(),
        }
      },
      getOptions() {
        return {draggable: '.out-drag-product', group: "out-product", disabled: this.outDisable}
      },
      getInnerOptions() {
        return {draggable: '.inner-drag-content', group: 'product', disabled: this.innerDisable}
      },
      async getMenuTree() {
        let res = await DigitalParkApi.getMenuTree({
          language: Cookies.get("lang")
        });
        localStorage.setItem('menuTree', JSON.stringify(res))
        this.headName = res[0].name
      },
      async getLargeScreenModuleList(flag) {
        this.setConfigParams(flag)  //配置页时需要缩小或还原

        let res = await DigitalParkApi.getLargeScreenModule({
          width: document.body.offsetWidth,
          height: document.body.offsetHeight,
          widthPercent: this.widthPercent,
          heightPercent: this.heightPercent,
          preview:'ydCity'
        })
        res.modules.map((item)=>{
          item.bgStatus='normal'
        })
        this.moduleList = res.modules || []
        this.centerIndex = res.modules.findIndex(item => item.id == 0 && item.moduleList)
        this.drawPageStyle(res)
        this.$nextTick(()=> {
          // this.styleObj.centerSize = {
          //   "width": parseInt(($(".center-show").width() * this.widthPercent)) + 'px',
          //   "height": parseInt(($(".center-show").height() * this.heightPercent)) + 'px'
          // }
          // $(".center-show").css(this.styleObj.centerSize)
          $(".drag-panel").css(this.styleObj.panelStyle)
          $(".center-show").css(this.styleObj.centerStyle)
          $(".large-size-screen-normal .out-drag-product").css(this.styleObj.dragStyle)
          this.animationFlag = true
        })
      },
      drawPageStyle(res) {
        let xLen = res.xModule.length + this.moduleMargin
        let yLen = res.yModule.length + this.moduleMargin
        let paddingLeft = parseInt(($(".content").width() - xLen * res.xModule.num) / 2)
        let heightOther = ($(".large-size-screen-normal").height() - this.headerHeight - yLen * res.yModule.num)
        let margin = parseInt(heightOther / 2 / (res.xModule.num))
        yLen = yLen + margin
        let marginTop = parseInt(heightOther / 2 / 2)

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
          // visibility:isYDScreen()?"collapse":'unset'
        }

        this.styleObj.dragStyle = {
          width: res.xModule.length + 'px',
          height: res.yModule.length + 'px',
          "grid-column": 'unset',
          "grid-row": 'unset',
          "visibility":'unset'
        }
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
            // width: '1920px',
            // height: '1080px'
            width:'100%',
            height:'100%'
          })
          this.moduleMaxWidth = 960
          this.moduleMargin = 20
          this.headerHeight = 135
        }
        this.heightPercent = this.widthPercent
        this.moduleMaxWidth = parseInt((this.moduleMaxWidth * this.widthPercent))
        this.moduleMargin = parseInt((this.moduleMargin * this.widthPercent))
        this.headerHeight = parseInt((this.headerHeight * this.heightPercent))

        $(".large-size-screen-header").css({
          height: this.headerHeight + 'px'
        })
      },
      async onOutChange(evt) {
        // console.log("evt", evt, this.moduleList)
        $(".center-show").css({...this.styleObj.centerStyle, ...this.styleObj.centerSize})
        $(".large-size-screen-normal .out-drag-product").css(this.styleObj.dragStyle)
        if(!this.fullStatus){  //不是在配置页
          this.updateLargeScreenModule()
        }
        // this.getLargeScreenModuleList()
      },
      onOutStart() {
        // console.log("lalala")
      },
      onInnerChange(evt) {
        console.log("inner lalala",evt)
        if(evt.added){
          this.innerObj={
            id:_.uniqueId(),
            menuId:evt.added.element.pid,
            menuName:evt.added.element.menuName,
            type:1,
            moduleList:[evt.added.element]
          }
        }
      },
      setInnerDisable(val){
         this.innerDisable=val
      },
      updateInnerModule(id){
        if(!id) return ;
        let index = this.moduleList.findIndex((item)=>{
          return item.id == id
        })
        if(index != -1){
          this.moduleList[index] = this.innerObj
          this.$parent.setItemDragFlag &&
          this.$parent.setItemDragFlag(this.moduleList)
        }
      },
      async updateLargeScreenModule(){
        let tmp = _.cloneDeep(this.moduleList)
        let index = tmp.findIndex(item => item.id == 0 && item.moduleList.length)
        tmp.splice(index, 1)
        let obj={
          width: document.body.offsetWidth,
          height: document.body.offsetHeight,
          modules:tmp
        }
        let res = await DigitalParkApi.updateLargeScreenModule(obj)
        if(this.fullStatus){
          this.$message({
            type:'success',
            message:'更新成功'
          })
        }
      },
      changeBg(item,flag){
        console.log(item)
        if(isYDScreen()){
          return;
        }
        // debugger
        this.moduleList.map((item)=>{
          item.bgStatus='normal'
        })
        if(flag==1 && item.menuName!='功能模块入口'){
          item.bgStatus='hover'
        }

        // flag==1?item.bgStatus='hover':'normal'
      }
    },
    mounted() {
      this.getMenuTree()
      this.getLargeScreenModuleList()
      let _this = this
      $(window).resize(async function () {
        await _this.getLargeScreenModuleList()
        // let obj = {
        //   width: "1920px",
        //   height: '1080px'
        // }
        // $(".center-show").css(obj)
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

      .nav-right-item{
        /*width:230px;*/
        text-align: right;
        span{
          width:200px;
        }
      }
      .nav-right-item .el-input__inner {
        // width:150px;
        font-size: @largeScreenFontSize;
        color: @white;
      }

      .avatar-img {
        width: 50px;
        height: 50px;
      }
      .nav-right-item .el-select{
        width:180px;
      }

      .nav-right-item .el-input__suffix {
        width:30px;
        right: 10px;
        .el-input__suffix-inner{
          width:100%;
        }
      }

      .el-select .el-input .el-select__caret {
        font-size: 20px;
      }
    }

    .out-drag-product,.out-drag-product-hover {
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: auto;
      width:940px;
      height:528px;
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
    .out-drag-product-normal{
      background-image: url('../../../static/image/digitalPark/content_bg3.png');
    }
    .out-drag-product-hover{
      background-image: url('../../../static/image/digitalPark/content_bg4.png');
    }

    .yd-out-drag-product{
      /*background:rgba(0,0,0,.7);*/
      /*border-radius: 16px;*/
      background-image: url('../../../static/image/digitalPark/content_bg5.png');
      font-size: 14px;
      width:640px;
      height:366px;
      .single-module-name{
        width:100%;
        padding-left:2.5%;
        line-height: 40px;
        font-size:18px;
        box-sizing: border-box;
        font-weight: bold;
        background:linear-gradient(0deg,rgba(1,234,254,1) 0%, rgba(255,255,255,1) 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
      .module-item-top-name{
        margin-top: 10px;
      }
    }

    .drag-panel {
      display: grid;
      width: 100%;
      overflow: hidden;
      /*padding:20px;*/
      /*grid-template-columns: repeat(auto-fill,700px);*/
      /*grid-template-rows: repeat(auto-fill,400px);*/
    }

    .center-show {
      /*width: 1920px !important;*/
      /*height: 1080px !important;*/
      /*width: 1920px;*/
      /*height: 1080px;*/
      width:100%;
      height:100%;
      /*background: pink;*/
      box-sizing: border-box;
      /*border: 1px solid pink;*/
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

    .haveBg{
      background-image: url('../../../static/image/digitalPark/home.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .el-dropdown {
      font-size: @largeScreenFontSize;
      color: @white;
    }
  }

  @media screen and (max-width: 1920px) {
    .large-size-screen-normal {
      .yd-out-drag-product {
        background-image: url('../../../static/image/digitalPark/content_bg5.png');
        font-size: 12px;
        width: 320px;
        height: 168px;

        .single-module-name {
          width: 100%;
          padding-left: 2.5%;
          line-height: 1.5;
          font-size: 14px;
        }

        .module-item-top-name {
          margin-top: 10px;
        }
      }
    }
  }

</style>
