<template>
  <div class="large-size-screen-normal">
    <Header fromFlag="2" :headName="headName" />
    <div class="content flex">
        <div class="basic-panel left-panel">
          <draggable
                :list="moduleList[0]"
                v-bind="getOptions()"
                @change="onOutChange"
                @start="onOutStart"
          >
          <transition name="el-zoom-in-center" v-for="(item,index) in moduleList[0]" :key="index">
              <draggable
                class="out-drag-product"
                :list="[item]"
                :id="index"
                v-bind="getInnerOptions()"
                v-show="show"
              >
                {{item && item.id}}
              </draggable>
          </transition>
          </draggable>
        </div>
        <div class="basic-panel  center-panel">
          <transition name="el-zoom-in-center">
             <div class="center-show" v-show="show"></div>
          </transition>
          <draggable
            :list="moduleList[2]"
            v-bind="getOptions()"
            @change="onOutChange"
            @start="onOutStart"
            class="flex-align-around flex-wrap"
          >
            <transition
              name="el-zoom-in-center"
              v-for="(item,index) in moduleList[2]"
              :key="index"
            >
              <draggable
                class="out-drag-product"
                :list="[item]"
                :id="index"
                v-bind="getInnerOptions()"
                v-show="show"
              >
                {{item && item.id}}
              </draggable>
            </transition>
          </draggable>
        </div>

        <div class="basic-panel right-panel">
          <draggable
            :list="moduleList[3]"
            v-bind="getOptions()"
            @change="onOutChange"
            @start="onOutStart"
          >
          <transition name="el-zoom-in-center" v-for="(item,index) in moduleList[3]" :key="index">
            <draggable
              class="out-drag-product"
              :list="[item]"
              v-bind="getInnerOptions()"
              v-show="show"
            >
              {{item&& item.id}}
            </draggable>
          </transition>
          </draggable>
        </div>
        <!--</draggable>-->
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
        moduleList:[[],[],[],[]],
        allList:[],
        show:false,
        headName:menuTree[0].name,
        outDisable:false,
        innerDisable:true
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
        //   yLength:400,
        //   modules:[
        //     [{id:1},{id:2},{id:3},{id:111}],
        //     [],
        //     [{id:4},{id:5},{id:9},{id:99}],
        //     [{id:6},{id:7},{id:8},{id:66}],
        //   ]
        // }

          // [
          // [{id:1},{id:2},{id:3},{id:111},{id:222},{id:333},{id:11},{id:22}],
          //   [],
          //   [{id:4},{id:5},{id:9},{id:99}],
          //   [{id:6},{id:7},{id:8},{id:66},{id:77},{id:88},{id:166},{id:177}],
          // ]


        let res = await DigitalParkApi.getLargeScreenModule({
          width:this.width,
          height:this.height
        })
        let tmp=[]
        res.modules.map((item)=>{
          item.map((child)=>{
            tmp.push(child)
          })
        })
        this.allList = tmp
        this.moduleList = res.modules
        let obj = {
          width:res.xLength+'px',
          height:res.yLength+'px',
        }
        let margin = res.yLength*3-1020
        setTimeout(()=>{
          $(".large-size-screen-normal .out-drag-product").css(obj)
          $(".center-show").css({marginBottom:margin+'px'})
          this.show=true
        },500)
      },
      onOutChange(evt){
        console.log("evt",evt)
      },
      onOutStart(){

      }
    },
    mounted(){
      this.getLargeScreenModuleList()
    }
  }
</script>

<style lang="less">
  .large-size-screen-normal{
    .out-draggable-box{
      flex-wrap: wrap;
    }
    .out-drag-product{
      background:@mainHoverColor;
      /*width:600px;*/
      /*height:380px;*/
      font-size: 188px;
      text-align: center;
      /*line-height: 380px;*/
      color:red;
      margin-bottom:20px;
    }
    .left-panel{
      display: flex;
      .out-drag-product{
        float: right;
        margin-left: 20px;
      }
    }
    .right-panel{
      .out-drag-product{
        float: left;
        margin-right: 20px;
      }
    }
    .center-panel{
      width:1920px;
      padding:0 20px;
      box-sizing: border-box;
      text-align: center;
      .out-drag-product{
        /*float: left;*/
        /*margin-right: 20px;*/
        margin-bottom:20px;
      }
    }
    .center-show{
      width:1880px !important;
      height:1080px !important;
      margin-bottom:20px;
      box-sizing: border-box;
      line-height: 1080px;
      background: pink;
    }
    .one{
      background: yellow;
    }
  }
</style>
