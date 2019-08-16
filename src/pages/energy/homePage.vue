<template>
  <div class="home-page">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>能耗总览</span>
    </div>
    <div class="overview-list flex-align-between">
      <div class="overview-item">
        <div class="numTitle">
          <span>A3当年总用电量</span>
        </div>
        <p class="num">
          <span>{{energyOverview.elecSum}}</span>
          <i>kwh</i>
        </p>
      </div>
      <div class="overview-item">
       <div class="numTitle">
          <span>A3当年总用电量</span>
        </div>
        <p class="num">
          <span>{{energyOverview.elecSum}}</span>
          <i>m³</i>
        </p>
      </div>
      <div class="overview-item">
       <div class="numTitle">
          <span>A3当年总用电量</span>
        </div>
        <p class="num">
          <span>{{energyOverview.elecSum}}</span>
         <i>人</i>
        </p>
      </div>
      <div class="overview-item">
        <div class="numTitle">
          <span>A3当年总用电量</span>
        </div>
        <p class="num">
          <span>{{energyOverview.elecSum}}</span>
          <i>kwh/人</i>
        </p>
      </div>
      <div class="overview-item">
        <div class="numTitle">
          <span>A3当年总用电量</span>
        </div>
        <p class="num">
          <span>{{energyOverview.elecSum}}</span>
          <i>m³/人</i>
        </p>
      </div>
      <div class="overview-item">
        <div class="numTitle">
          <span>A3当年总用电量</span>
        </div>
        <p class="num">
          <span>{{energyOverview.elecSum}}</span>
         <i>㎡</i>
        </p>
      </div>
      <div class="overview-item">
        <div class="numTitle">
          <span>A3当年总用电量</span>
        </div>
        <p class="num">
          <span>{{energyOverview.elecSum}}</span>
          <i>kwh/㎡</i>
        </p>
      </div>
      <div class="overview-item">
        <div class="numTitle">
          <span>A3当年总用电量</span>
        </div>
        <p class="num">
          <span>{{energyOverview.elecSum}}</span>
          <i>m³/㎡</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import EnergyApi from "../../service/api/energyApi";
export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      energyOverview: {}
    };
  },
  methods: {
    async getEnergyOverView() {
      this.energyOverview = await EnergyApi.getEnergyOverView({
        redioType: 0,
        startTime: 2019,
        selectType: 1
      });
    }
  },
  mounted() {
    this.getEnergyOverView();
    
  }
};
</script>

<style lang="less">
.home-page {
  margin-top: 85px;
  padding: 0 20px;
  .tip {
    .icon {
      width: 4px;
      height: 16px;
      background: #4d7cfeff;
      border-radius: 2px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      color: #4d7cfeff;
    }
  }
  .overview-list {
    flex-wrap: wrap;
  }
  .overview-item {
    width: 24%;
    height: 100px;
    border-radius: 6px;
    color: @white;
    margin-bottom: 20px;
  }
  .overview-item:nth-child(1),
  .overview-item:nth-child(6) {
    background: linear-gradient(
      120deg,
      rgba(234, 111, 233, 1),
      rgba(141, 100, 248, 1)
    );
    box-shadow: 0px 4px 12px 0px rgba(141, 100, 248, 0.5) !important;
  }
  .overview-item:nth-child(2),
  .overview-item:nth-child(5) {
    background: linear-gradient(
      120deg,
      rgba(95, 176, 255, 1),
      rgba(106, 136, 254, 1)
    );
    box-shadow: 0px 4px 12px 0px rgba(106, 138, 254, 0.5) !important;
  }
  .overview-item:nth-child(3),
  .overview-item:nth-child(8) {
    background: linear-gradient(
      120deg,
      rgba(255, 133, 96, 1),
      rgba(255, 113, 152, 1)
    );
    box-shadow: 0px 4px 12px 0px rgba(255, 113, 152, 0.5) !important;
  }
  .overview-item:nth-child(4),
  .overview-item:nth-child(7) {
    background: linear-gradient(
      120deg,
      rgba(57, 206, 192, 1),
      rgba(19, 159, 209, 1)
    );
    box-shadow: 0px 4px 12px 0px rgba(19, 159, 209, 0.5) !important;
  }
}
</style>
