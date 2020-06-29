<template>
  <div class="attendance-detail">
    <div class="tmp-hidden">{{moduleItem.moduleName}}</div>
    <!--<div class="my-chart" v-if="type!=2">-->
      <!--<div class="task-header flex">-->
        <!--<span>员工ID</span>-->
        <!--<span>姓名</span>-->
        <!--<span>开始时间</span>-->
        <!--<span>结束时间</span>-->
      <!--</div>-->
      <!--<ul class="task-list-ul">-->
        <!--<li v-for="(item,index) in tableData" :key="index" class="item-task flex">-->
          <!--<span>{{item.dutyPeople}}</span>-->
          <!--<span>{{item.dutyPeopleName}}</span>-->
          <!--<span>{{item.startTime}}条</span>-->
          <!--<span>{{item.stopTime}}条</span>-->
        <!--</li>-->
      <!--</ul>-->
    <!--</div>-->
    <div class="my-chart">
      <z-table :ref="tableConfig.ref" :options="tableConfig"></z-table>
    </div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
import CommonApi from '@/service/api/common'
export default {
  name: "AttendanceDetail",
  props: ["moduleItem",'type'],
  data() {
    return {
      tableConfig: {
        ref: "tableConfig",
        serverMode:{
          url:CommonApi.getDutyList,
          data:{
            pageNum:1,
            pageSize:5,
          }
        },
        propsHttp: {
          list: "rows",
          total: "total",
          pageSize: "page",
          pageNum: "pageNum",    //TODO
        },
        columnConfig:[
          {label:'员工ID',prop:'dutyPeople'},
          {label:'姓名',prop:'dutyPeopleName'},
          {label:'开始时间',prop:'startTime'},
          {label:'结束时间',prop:'stopTime'}
        ],
        uiConfig:{
          pagination:{
            pageSize:5
          }
        }
      },
      tableData:[]
    };
  },
  methods: {
     getData(){
       let res = this.$refs[this.tableConfig.ref].allData
       console.log("res",res)
       this.tableData = res
     }
  },
  mounted() {
    // this.getData()
    // this.$refs[this.tableConfig.ref].refreshTable();
    // this.getDutyList()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.attendance-detail {
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
}
</style>
