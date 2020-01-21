<template>
  <div class="attendance-detail">
    <z-table :ref="leaseManageTable.ref" :tableConfig="leaseManageTable"></z-table>
    <div style="margin-bottom:10px;">{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";

export default {
  name: "AttendanceDetail",
  props: ["moduleItem"],
  data() {
    return {
      leaseManageTable: {
        ref: "leaseManageTable",
        data: [
          {
            zbrq: "2019.11.6",
            zbry: "李逵",
            zbdd: "A座",
            zbnr: "巡视",
            jjry: "宋江"
          },
          {
            zbrq: "2019.11.8",
            zbry: "宋江",
            zbdd: "B座",
            zbnr: "巡视",
            jjry: "李逵"
          }
        ],
        columnConfig: [
          {
            prop: "zbrq",
            label: "值班日期",
            width: 200
          },
          {
            prop: "zbry",
            label: "值班人员"
          },
          {
            prop: "zbdd",
            label: "值班地点"
          },
          {
            prop: "zbnr",
            label: "值班内容"
          },
          {
            prop: "jjry",
            label: "交接人员"
          }
        ],
        uiConfig: {
          height: "260px"
        }
      }
    };
  },
  methods: {},
  mounted() {
    // this.$refs[this.leaseManageTable.ref].refreshTable();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.building-status-proportion {
  .pie-charts {
    height: 95%;
  }
}
</style>
