<template>
  <div class="inspection-coms">
    <div class="my-chart">
      <div class="ganged-log-header">
        <span style="width:25%">值班日期</span>
        <span style="width:15%">值班人员</span>
        <span>值班地点</span>
        <span>值班内容</span>
        <span>交接人员</span>
      </div>
      <ul>
        <li v-for="(item,index) in tableData" :key="index" class="ganged-log-li">
          <span style="width:25%">{{item.zbrq}}</span>
          <span style="width:15%">{{item.zbry}}</span>
          <span>{{item.zbdd}}</span>
          <span>{{item.zbnr}}</span>
          <span>{{item.jjry}}</span>
        </li>
      </ul>
      <!-- <zTable :ref="tableConfig.ref" :options="tableConfig"></zTable> -->
    </div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import ChartUtils from "@/utils/chartUtils";
import CommonApi from "@/service/api/common";
export default {
  name: "inspection",
  props: ["moduleItem"],
  components: {},
  data() {
    return {
      tableConfig: {
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
            label: "巡检日期"
          },
          {
            prop: "zbry",
            label: "值班人员"
          },
          {
            prop: "zbdd",
            label: "巡检地点"
          },
          {
            prop: "zbnr",
            label: "备注"
          }
        ],
        uiConfig: {
          height: "auto"
        }
      },
      tableData: [
        {
          zbrq: "2019.11.09",
          zbry: "李明",
          zbdd: "c座",
          zbnr: "巡检",
          jjry: "王丽华"
        },
        {
          zbrq: "2020.01.05",
          zbry: "张三",
          zbdd: "A楼一层",
          zbnr: "调试",
          jjry: "郑工"
        },
        {
          zbrq: "2020.03.24",
          zbry: "王丹",
          zbdd: "C座",
          zbnr: "巡视",
          jjry: "王丽华"
        },
        {
          zbrq: "2019.06.23",
          zbry: "巡检",
          zbdd: "C座一层",
          zbnr: "巡视",
          jjry: "李达"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    async getSpectionData() {
      let res = await CommonApi.getHomeInterfaceMonitor({
        homeId: 10
      });
      let tmp = [];
      for (let key in res) {
        tmp.push({
          name: key,
          value: res[key]
        });
      }
      // this.initChart(tmp)
    }
  },
  mounted() {
    this.getSpectionData();
  }
};
</script>

<style lang="less">
.inspection-coms {
  .my-chart {
    margin-top: 20px;
    // background: @white;
    .ganged-log-header {
      width: 100%;
      height: 50px;
      color: #8fd3fa;
      border-bottom: 1px solid #1b2f44;
      font-size: 14px;
      span {
        float: left;
        height: 50px;
        line-height: 50px;
        text-align: left;
        width: 20%;
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
          width: 20%;
        }
      }
    }
  }
}
</style>
