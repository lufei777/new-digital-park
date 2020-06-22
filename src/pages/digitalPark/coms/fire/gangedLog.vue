<template>
  <div class="ganged-log">
    <div class="module-item-top-name" >{{moduleItem.moduleName}}</div>
    <div class="my-chart">
      <div class="ganged-log-header">
        <span style="width:14%">序号</span>
        <span style="width:50%">事件源</span>
        <span style="width:22%">时间</span>
        <span style="width:14%;text-align:right">事件</span>
      </div>
      <ul>
        <li v-for="(item,index) in tableData" :key="index" class="ganged-log-li">
          <span style="width:14%">{{index+1}}.</span>
          <span style="width:50%">{{item.causeAsset}}</span>
          <span style="width:22%">{{item.time}}</span>
          <span style="width:14%;color:#B26448;text-align:right">{{item.value}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommonApi from "@/service/api/common";
export default {
  name: "gangedLog",
  components: {},
  props: ["moduleItem"],
  data() {
    return {
      tableData: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    async getGangedLog() {
      let res = await CommonApi.getGangedLog({
        pageNum: 1,
        pageCount:5,
        start: "",
        end: ""
      });
      if (res) {
        this.tableData = res.rows;
        this.tableData.map((item, index) => {
          item.numberIndex = index+1
          item.time = item.time.slice(0,10)
        });
      }

      // console.log("res", res);
    }
  },
  mounted() {
    this.getGangedLog();
  }
};
</script>

<style lang="less">
.ganged-log {
  .my-chart {
    .ganged-log-header {
      width: 100%;
      height: 50px;
      color: #8fd3fa;
      border-bottom: 1px solid #1B2F44;
      font-size: 14px;
      span {
        float: left;
        height: 50px;
        line-height: 50px;
        text-align: left;
      }
    }
    ul {
      li {
        width: 100%;
        // float: left;
        height: 30px;
        font-size: 14px;
        color: #8fd3fa;
        span {
          float: left;
          text-align: left;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          height: 30px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
