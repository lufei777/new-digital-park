<template>
  <div class="task-ranking" >
    <!--<div ref="pieCharts" class="my-chart" id="task-ranking-chart"></div>-->
    <!--<div class="my-chart">-->
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="my-chart">
      <div class="task-header flex">
        <span>排名</span>
        <span>姓名</span>
        <span>数量</span>
        <span>错误率</span>
        <span>效率</span>
      </div>
      <ul>
        <li v-for="(item,index) in tableData" :key="index" class="yd-ganged-log-li flex"
            :class="isyd?'':'task-li'">
          <span>{{index+1}}</span>
          <span>{{item.name}}</span>
          <span>{{item.num}}</span>
          <span>错误{{item.error}}条</span>
          <span>{{item.effect}}</span>
        </li>
      </ul>
    </div>
    <!--<img-->
      <!--style="width:96%;height:auto;"-->
      <!--src="../../../../../static/image/digitalPark/renwu2_tmp.png" alt="">-->
  <!--</div>-->
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
import { isYD } from "@/utils/project";

export default {
  name: "taskRanking",
  components: {},
  props: ["moduleItem"],
  data() {
    return {
      tableData:[]
    };
  },
  computed:{
    isyd(){
      return isYD()
    }
  },
  methods: {
    getTableData(){
      this.tableData = [{
        name:'刘金',
        num:100,
        error:0,
        effect:'高'
      },{
        name:'刘金',
        num:100,
        error:0,
        effect:'高'
      },{
        name:'刘金',
        num:100,
        error:0,
        effect:'高'
      },{
        name:'刘金',
        num:100,
        error:0,
        effect:'高'
      },{
        name:'刘金',
        num:100,
        error:0,
        effect:'高'
      }]
    }
  },
  mounted() {
    this.getTableData()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.task-ranking {
   .my-chart{
      margin-top: 10px;
      box-sizing: border-box;
   }
  .task-header {
    width: 100%;
    height: 50px;
    font-size: 14px;
    background: rgba(17,29,33,.5);
    text-align: center;
    span {
      width:20%;
      float: left;
      height: 50px;
      line-height: 50px;
    }
  }
  .yd-ganged-log-li{
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: @white;
    text-align: center;
    span{
      width:20%;
      display: block;
      float: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
    }
    span:last-child{
      color:#01EAFE;
    }
  }
  .task-li{
    color:#666;
    span{
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
