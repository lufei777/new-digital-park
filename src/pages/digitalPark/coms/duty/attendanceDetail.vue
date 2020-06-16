<template>
  <div class="attendance-detail">
    <div class="module-item-top-name" >{{moduleItem.moduleName}}</div>
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
  props: ["moduleItem"],
  data() {
    return {
      // tableConfig: {
      //   ref: "tableConfig",
      //   data: [
      //     {
      //       zbrq: "2019.11.6",
      //       zbry: "李逵",
      //       zbdd: "A座",
      //       zbnr: "巡视",
      //       jjry: "宋江"
      //     },
      //     {
      //       zbrq: "2019.11.8",
      //       zbry: "宋江",
      //       zbdd: "B座",
      //       zbnr: "巡视",
      //       jjry: "李逵"
      //     }
      //   ],
      //   columnConfig: [
      //     {
      //       prop: "zbrq",
      //       label: "值班日期",
      //       width: 200
      //     },
      //     {
      //       prop: "zbry",
      //       label: "值班人员"
      //     },
      //     {
      //       prop: "zbdd",
      //       label: "值班地点"
      //     },
      //     {
      //       prop: "zbnr",
      //       label: "值班内容"
      //     },
      //     {
      //       prop: "jjry",
      //       label: "交接人员"
      //     }
      //   ],
      //   uiConfig: {
      //     // height: "260px"
      //   }
      // }
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
      }
    };
  },
  methods: {
    // async getDutyList(){
    //    let res = await CommonApi.getDutyList({
    //      page:1,
    //      pageSize:5,
    //    })
    // }
  },
  mounted() {
    // this.$refs[this.tableConfig.ref].refreshTable();
    // this.getDutyList()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.attendance-detail {
  .module-item-top-name{
    margin-bottom: 10px;
  }
}
</style>
