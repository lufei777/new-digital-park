<template>
  <div class="cold-and-heat-source-coms">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="my-chart flex-colum-justify">
      <div class="flex-align-center item-progress-group">
        <!--<i class="iconfont iconlengreyuan item-icon"></i>-->
        <div class="item-progress-group-left flex-colum-center">
          <img src="../../../../../static/image/digitalPark/hot.png" alt class="item-icon" />
          <div style="color:#FF5900">热源</div>
        </div>
        <div class="progress-box">
          <div class="flex">
            <el-progress :percentage="35" :stroke-width="12" :format="format"></el-progress>
            <span class="msg-tip">回水温度：35℃</span>
          </div>
          <div class="flex">
            <el-progress :percentage="60" :stroke-width="12" :format="format"></el-progress>
            <span>送水温度：60℃</span>
          </div>
        </div>
      </div>
      <div class="flex-align-center item-progress-group">
        <!--<i class="iconfont iconlengreyuan item-icon"></i>-->
        <div class="item-progress-group-left flex-colum-center">
          <img src="../../../../../static/image/digitalPark/cold.png" alt class="item-icon" />
          <div>冷源</div>
        </div>

        <div class="progress-box">
          <div class="flex">
            <el-progress :percentage="35" :stroke-width="12" :format="format"></el-progress>
            <span>回水温度：35℃</span>
          </div>
          <div class="flex">
            <el-progress :percentage="60" :stroke-width="12" :format="format"></el-progress>
            <span>送水温度：60℃</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonApi from "@/service/api/common";
import ChartUtils from "@/utils/chartUtils";
export default {
  name: "coldAndHeatSource",
  props: ["moduleItem"],
  data() {
    return {
      sourceData: {
        hot: {
          back: 35,
          send: 60
        },
        cold: {
          back: 35,
          send: 60
        }
      }
    };
  },
  computed: {},
  methods: {
    format() {
      return "";
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.cold-and-heat-source-coms {
  .item-progress-group {
    /*padding: 0 5%;*/
    box-sizing: border-box;
    .item-progress-group-left {
      margin-top: -25px;
      color: #01eafe;
    }
  }
  .progress-box {
    flex-grow: 1;
    margin-left: 20px;
    box-sizing: border-box;
    padding: 20px 0;
    .el-progress-bar__outer {
      background: #30475B;
    }
  }
  .el-progress {
    flex-grow: 1;
    /*margin-bottom: 20px;*/
  }
  .item-icon {
    margin-bottom: 5px;
    width: 30px;
    height: 30px;
    padding: 5px;
    border-radius: 50%;
    border: 4px solid rgba(146, 193, 234, 0.3);
    background: rgba(48, 71, 91, 0.5);
  }
  .el-progress-bar {
    padding-right: 10px;
    margin-right: 0;
  }
  .el-progress-bar__inner {
    background: linear-gradient(
      90deg,
      rgba(227, 155, 0, 1),
      rgba(221, 78, 0, 1)
    );
  }
  .item-progress-group:last-child {
    .el-progress-bar__inner {
      background: linear-gradient(
        90deg,
        rgba(0, 113, 240, 1),
        rgba(1, 234, 254, 1)
      );
    }
  }
  .msg-tip{
    flex-shrink: 0;
  }
}
</style>
