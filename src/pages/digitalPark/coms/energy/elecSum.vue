<template>
  <div class="elec-sum-coms">
    <div class="elec-sum-coms-inner flex-align-center">
      <div class="progress-box flex-colum-center">
        <el-progress type="circle" :percentage="percent"
                     :stroke-width="12" :width="200" color="#00dfff">
          1111
        </el-progress>
        <div class="text-box">
          <div>表计数量：10个</div>
          <div>报警数量：3个</div>
        </div>

      </div>
      <div class="data-info">
        <div class="data-info-module-name">{{moduleItem.moduleName}}</div>
        <div class="elec-data">{{energyData.elecSum}}KWh</div>
        <div class="percent1">
          <span>同比：{{energyData.tbzz}}%</span>
          <i :class="['iconfont',energyData.tbzz<0?'icon052caozuo_jiangxu':'icon053caozuo_shengxu']"></i>
        </div>
        <div class="percent2">
          <span>环比：{{energyData.hbzz}}%</span>
          <i :class="['iconfont',energyData.hbzz<0?'icon052caozuo_jiangxu':'icon053caozuo_shengxu']"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
import EnergyApi from "@/service/api/energy";
export default {
  name: "elecSum",
  components: {},
  props: ["moduleItem"],
  data() {
    return {
      energyData:{},
      percent:0
    };
  },
  methods: {
    async getEnergyData(){
      // let res = {
      //   all:100,
      //   error:30,
      //   elecSum: 100,
      //   tbzz:-10,
      //   hbzz:10,
      // }
      // res.tbzzShow = res.
      let res = await EnergyApi.getEnergyModuleData({
        redioType: 0,
        startTime: moment().format('YYYY-MM-DD'),
        selectType: 3,
        catalogs:'4000,1002',
        // catalog:34,
        // floorId:1
      });  // this.energyData = res
      // $(".el-progress__text").html(`<div class="alarm-num">${res.error}个</div><br />报警数量`)
      //
      // this.percent = parseFloat((res.error / res.all).toFixed(2))

      // this.initChart(res)
    },
  },
  mounted() {
    this.getEnergyData()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.elec-sum-coms {
  .elec-sum-coms-inner{
    width:100%;
    height:100%;
  }
  .progress-box,.data-info{
    width: 50% ;
    /*height:100% ;*/
  }
  .progress-box{
    width:50%;
    text-align: center;
  }
  .data-info-module-name{
    font-size:18px;
    font-weight:bold;
    color:#333;
  }
  .elec-data{
    font-size:36px;
    font-weight: bold;
    color:#00dfff;
    margin:20px 0 10px 0 ;
  }
  .text-box{
    text-align: left;
    font-size:12px;
    font-weight:400;
    color:#666;
    margin-top:20px;
  }
  .alarm-num{
    font-size: 24px;
    color:#00dfff;
    /*margin-bottom:5px;*/
  }
  .percent1,.percent2{
    font-size: 14px;
  }
  .el-progress__text{
    font-size: 12px !important;
  }
}
</style>
