<template>
  <div class="hello">
    <!--<img src="../../../static/image/digitalPark/login_bg.png" alt="">-->
    <!--<el-button type="primary" @click="onClickBtn">change</el-button>-->
    <!--<div class="div1"></div>-->
    <!--<div class="div2"></div>-->
    <!--<div id="dv" @mousedown="fun1" @mousemove="fun2" @mouseup="fun3"></div>-->
    <!--<draggable class="drag-box"-->
               <!--v-bind="getOptions()"-->
               <!--@start="onRightStart"-->
               <!--@change="onRightChange"-->
               <!--:move="onRightMove"-->
               <!--@end="onRightEnd"-->
               <!--@update="onUpdate"-->
               <!--:list="proModuleList2"-->
    <!--&gt;-->
      <!--<div v-for="(item,index) in proModuleList2" :key="index" class="item-product">-->
        <!--{{item}}-->
      <!--</div>-->
    <!--</draggable>-->
    <!--<div class="boxList">-->
      <!--<div v-for="(item,index) in proModuleList2" :key="index" class="item-product" :data-id="item.id">-->
         <!--{{item.id}}-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="boxList2">-->
      <!--<div v-for="(item,index) in proModuleList1" :key="index" class="item-product" :data-id="item.id">-->
        <!--{{item.id}}-->
      <!--</div>-->
    <!--</div>-->
    <!--<transition name="el-zoom-in-center" >-->
      <!--<div class="item-product"  v-show="animationFlag"></div>-->
    <!--</transition>-->

    <div class="pieCharts flex-align-between">
      <div class="pieChart box">
        <div ref="pieChart1" class="chart-inner"></div>
      </div>
      <div class="pieChart box">
        <div ref="pieChart2" class="chart-inner"></div>
      </div>
      <!-- <div class="pieChart box"></div> -->
    </div>
  </div>

</template>

<script>
  import echarts from 'echarts'
  import {mapState} from 'vuex'
  import draggable from 'vuedraggable'
  import ChartUtils from '@/utils/chartUtils'
  var dv = document.getElementById('dv');
  var x = 0;
  var y = 0;
  var l = 0;
  var t = 0;
  // var this.isDown = false;
  // let proModuleList2=[1,2,3]
  window.dragVue = {
    name: 'HelloWorld',
    components: {
      draggable
    },
    data () {
      return {
        msg: 'Welcome to my basic vue demo',
        proModuleList2:[{id:1,name:{name2:2}},{id:2,name:{name2:3}},{id:3,name:{name2:4}}],
        isDown:false,
        proModuleList1:[{id:4,name:{name2:2}},{id:5,name:{name2:3}},{id:6,name:{name2:4}}],
        animationFlag:false
      }
    },
    computed:{
      ...mapState({
        articleNew:state=>state.test.articleNew
      })
    },
    watch:{
      articleNew(){
        if(this.articleNew){
          console.log('lalalala')
        }
      }
    },
    methods: {
      onClickBtn(){
        this.$store.commit('test/articleNew',true)
      },
      onRightStart(evt){
        console.log("start-evt",evt)
      },
      onRightMove(evt){
        console.log("move-evt",evt)
      },
      onRightChange(evt){
        console.log("change-evt",evt)
      },
      onRightEnd(evt){
        console.log("end-evt",evt)
      },
      fun1(e){
        dv = document.getElementById('dv');
        x = e.clientX;
        y = e.clientY;

        //获取左部和顶部的偏移量
        l = dv.offsetLeft;
        t = dv.offsetTop;
        //开关打开
        this.isDown = true;
        //设置样式
        dv.style.cursor = 'move';
      },
      fun2(e){
        dv = document.getElementById('dv');
        if (this.isDown == false) {
          return;
        }
        //获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (x - l);
        var nt = ny - (y - t);

        dv.style.left = nl + 'px';
        dv.style.top = nt + 'px';
      },
      fun3(){
        dv = document.getElementById('dv');
        this.isDown = false;
        dv.style.cursor = 'default';
      },
      getOptions(){
        return {draggable:'.item-product',group:"out-product",disabled:false}
      },
      onUpdate(evt){
        console.log("update-evt",evt)
        console.log("this.",this.proModuleList2)
      },
      initChart1(res){
        let dataList =[{
          value:0,
          name:'上升'
        },{
          value:0,
          name:'下降'
        },{
          value:0,
          name:'停止'
        }]
        let myPieChart = this.$echarts.init(this.$refs.pieChart1);
        let legendData = ['上升','下降','停止'];
        let seriesData =dataList
        let legendUi={
          // orient: 'horizontal',
          bottom:20,
          right:20,
          textStyle:{
            color:'#8FD3FA',
            fontSize:14
          }
        }
        let data = {
          legendData,
          seriesData,
          legendUi
        };
        ChartUtils.hollowPieChart(myPieChart,data);
        // myChart.setOption({
        //   legend:{
        //     left:'center'
        //   }
        // })
      },
    },
    mounted(){
      // document.body.ondrop = function (event) {
      //   event.preventDefault();
      //   event.stopPropagation();
      // }
      this.initChart1()
    }
  }

  export default dragVue;

  $(function(){
    // $(".item-product").Tdrag({
    //   scope:".hello",
    //   pos:true,
    //   dragChange:true,
    //   changeMode:"sort",
    //   animation_options:{//运动时的参数
    //     duration:500,//每次运动的时间
    //     easing:"ease-out"//移动时的特效，ease-out、ease-in、linear
    //   },
    //   cbStart:function(evt){
    //     // console.log("start",evt)
    //     // console.log($(".item-product").attr("index"))
    //     // $(".item-product").eq(index)
    //   },
    //   cbEnd:function(evt){
    //     // console.log($(".item-product").length)
    //     let tmp =[]
    //     for(let i=0;i<$(".item-product").length;i++){
    //       // console.log($(".item-product").eq(i).attr("index"))
    //       let index = $(".item-product").eq(i).attr("index")
    //
    //       tmp.push(dragVue.data().proModuleList2[index])
    //     }
    //     // console.log(tmp)
    //   }
    // });
    // $( ".boxList2" ).sortable({
    //   revert: true
    // });
    // $( ".boxList" ).sortable({
    //   revert: true
    // });
    // // $( ".item-product" ).draggable({
    // //   connectToSortable: ".boxList",
    // //   // containment: "boxList"
    // //   // helper: "clone",
    // //   // revert: "invalid"
    // // });
    // $( ".boxList, .item-product" ).disableSelection();
    // $( ".item-product" ).disableSelection();
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .hello{
    height:100%;
    background: @white;
    .item-product{
      width:100px;
      height:100px;
      background: pink;
      margin:20px auto;
    }
    .drag-box{
      background: yellow;
    }
    .boxList,.boxList2{
      float: left;
      width:100px;
      /*width:40%;*/
      margin-right: 10%;
      background: yellowgreen;
    }
    .my-chart{
      width:100%;
      height:90%;
    }
    .pieCharts {
      width: 100%;
      height: 435px;
      /*background: #fff;*/
      box-sizing: border-box;
      margin-bottom: 15px;
      .pieChart {
        width: 49%;
        height: 100%;
        // background: transparent;
        border-radius: 6px;
        box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
        /*padding:10px;*/
        box-sizing: border-box;
        background-color: @white;
      }
    }
    .chart-inner{
      width:100%;
      height:100%;
    }
  }
  #dv {
    width:100px;
    height:100px;
    background-color:blue;
    border-radius:50%;
    /*position:absolute;*/
  }

</style>
