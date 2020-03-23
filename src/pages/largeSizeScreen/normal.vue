<template>
  <div class="large-size-screen-normal">
    <Header fromFlag="2" :headName="headName" />
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
                :class="item?'out-drag-product':'center-show'"
                :list="[item]"
                v-bind="getInnerOptions()"
                v-show="animationFlag"
              >
                {{item && item.id}}
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
  export default {
    name: 'LargeSizeScreenNormal',
    components: {
      Header,
      draggable
    },
    props:['width','height'],
    data () {
      let menuTree = JSON.parse(localStorage.getItem('menuTree'))
      return {
        headName:menuTree[0].name,
        moduleList:[[],[],[],[]],
        animationFlag:false,
        outDisable:false,
        innerDisable:true,
        centerIndex:0,
        styleObj:{
          panelStyle:{},
          centerStyle:{},
          dragStyle:{}
        }
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      getOptions(){
        return {draggable:'.out-drag-product',group:"out-product"}
      },
      getInnerOptions(){
        return {draggable:'.inner-drag-content',group:'inner-product',disable:this.innerDisable}
      },
      async getLargeScreenModuleList(){
        // let res = {
        //   num:9,
        //   xLength:700,
        //   yLength:393,
        //   modules:[{id:1},{id:2},null,{id:3},
        //     {id:4},{id:5},{id:6},{id:7},{id:8},
        //     {id:14},{id:15},{id:16},{id:17},{id:18},{id:19},{id:20},{id:187},{id:197},{id:207},{id:777},{id:888}],
        //   xNum:6,
        //   yNum:4
        //
        // }

        let res = await DigitalParkApi.getLargeScreenModule({
          width:this.width,
          height:this.height
        })
        this.moduleList = res.modules
        this.centerIndex = res.modules.findIndex(item=>JSON.stringify(item)=='null')
        this.drawPageStyle(res)
        setTimeout(()=>{
          $(".drag-panel").css(this.styleObj.panelStyle)
          $(".center-show").css(this.styleObj.centerStyle)
          $(".large-size-screen-normal .out-drag-product").css(this.styleObj.dragStyle)
          this.animationFlag=true
        },500)
      },
      drawPageStyle(res){
        let xLen  = res.xLength+20
        let yLen  = res.yLength+20
        console.log(xLen,yLen)
        let paddingLeft =($(".content").width()-xLen*res.xNum)/2
        let marginTop =($(".large-size-screen-normal").height()-160-yLen*res.yNum)/2

        this.styleObj.panelStyle = {
          "grid-template-columns": "repeat("+res.xNum+","+xLen+"px)",
          "grid-template-rows": "repeat("+res.yNum+","+yLen+"px)",
          // "padding-left":paddingLeft+"px",
          // "margin-top":marginTop+"px"
        }
        console.log(paddingLeft,marginTop)
        this.styleObj.centerStyle = {
          "grid-column-start": this.centerIndex+1,
          "grid-column-end": xLen<960?this.centerIndex+4:this.centerIndex+3,
          "grid-row-start": 1,
          "grid-row-end": xLen<960?4:3
        }
        console.log(  this.styleObj.centerStyle)
        this.styleObj.dragStyle = {
          width:res.xLength+'px',
          height:res.yLength+'px',
          "grid-column":'unset',
          "grid-row":'unset'
        }
      },
      onOutChange(evt){
        console.log("evt",evt,this.moduleList)

        $(".center-show").css(this.styleObj.centerStyle)
        $(".large-size-screen-normal .out-drag-product").css(this.styleObj.dragStyle)
      },
      onOutStart(){

      }
    },
    mounted(){
      this.getLargeScreenModuleList()
      let _this = this
      $(window).resize(function(){
        _this.getLargeScreenModuleList()
      })
    }
  }
</script>

<style lang="less">
  .large-size-screen-normal{
    height: 100%;
    .out-drag-product{
      background:@mainHoverColor;
      font-size: 188px;
      text-align: center;
      color:red;
      /*margin:0 20px 20px 20px;*/
      /*margin:auto;*/
    }
    .drag-panel{
      display: grid;
      width:100%;
      /*padding:20px;*/
      /*grid-template-columns: repeat(auto-fill,700px);*/
      /*grid-template-rows: repeat(auto-fill,400px);*/
    }
    .center-show{
      width:1920px !important;
      height:1080px !important;
      box-sizing: border-box;
      line-height: 1080px;
      background: pink;
      /*grid-row-start: 1;*/
      /*grid-row-end: 4;*/
      /*grid-column-start: 3;*/
      /*grid-column-end: 6;*/
      /*margin:0 20px 20px 20px;*/
    }
  }
</style>
