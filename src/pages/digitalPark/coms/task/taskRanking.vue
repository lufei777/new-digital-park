<template>
  <div class="task-ranking" >
    <!--<div ref="pieCharts" class="my-chart" id="task-ranking-chart"></div>-->
    <!--<div class="my-chart">-->
    <div class="tmp-hidden">{{moduleItem.moduleName}}</div>
    <div class="my-chart" v-if="curType!=2">
      <div class="task-header flex" :class="moduleItem.type!=2?'':'task-header-white'">
        <span>排名</span>
        <span>姓名</span>
        <span>任务总量</span>
        <span>完成量</span>
        <span>完成率</span>
      </div>
      <ul class="task-list-ul">
        <li v-for="(item,index) in tableData" :key="index" class="item-task flex"
            :class="moduleItem.type!=2?'':'task-li'">
          <span>{{index+1}}</span>
          <span>{{item.username}}</span>
          <span>{{item.allTaskNum}}条</span>
          <span>{{item.completeNum}}条</span>
          <span>{{item.percent}}%</span>
        </li>
      </ul>
    </div>
    <div class="my-chart" v-if="curType==2">
      <z-table :ref="tableConfig.ref" :options="tableConfig"></z-table>
    </div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
import TaskManageApi from '@/service/api/taskManage'
import { isYDScreen } from "@/utils/project";

export default {
  name: "taskRanking",
  components: {},
  props: ["moduleItem"],
  data() {
    return {
      tableData:[],
      tableConfig: {
        ref: "tableRef",
        data:[],
        columnConfig: [
          {label: "姓名", prop: "username"},
          {label: "任务总量", prop: "allTaskNum"},
          {label: "完成量", prop: "completeNum"},
          {label: "效率", prop: "percent",
            formatter:function(row){
              return row.percent+"%"
            }
          },
        ],
        uiConfig: {
          // height: "auto",
          pagination:false
        },
      },
    };
  },
  computed:{
    isyd(){
      return isYDScreen()
    },
    curType(){
      return this.moduleItem.type
    }
  },
  methods: {
    async getPersonalTaskRanking(){
      let res = await TaskManageApi.getPersonalTaskRanking()
      res.map((item)=>{
        item.allTaskNum = item.allTaskNum?item.allTaskNum:0
        item.percent = item.allTaskNum?(item.completeNum/item.allTaskNum).toFixed(2):0
      })
      if(this.curType!=2){
        this.tableData = res
        this.$nextTick(()=>{
          let height = $(".my-chart").height()/7
          // console.log("height",height,$(".item-task").length,$(".task-header").length)
          $(".task-header span, .item-task").css({
            'height':height+'px',
            'line-height':height+'px'
          })
        })
      }else{
        this.tableConfig.data = res
      }
    }
  },
  mounted() {
    this.getPersonalTaskRanking()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.task-ranking {
   .my-chart{
     margin-top: 10px;
     box-sizing: border-box;
     overflow: hidden;
   }
  .task-header {
    width: 100%;
    font-size: 14px;
    background: rgba(17,29,33,.5);
    text-align: center;
    span {
      width:20%;
      float: left;
    }
  }
  .task-header-white{
    color:@white;
  }
  .item-task{
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
  .task-list-ul{
    overflow: auto;
  }
}
</style>
