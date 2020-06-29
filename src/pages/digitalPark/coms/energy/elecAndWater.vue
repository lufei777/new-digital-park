<template>
  <div class="elec-and-water-coms">
    <div class="elec-sum-coms-inner flex-align-center">
      <div class="progress-box flex-column-center" :class="fromFlag==1?'elec-progress-box':'water-progress-box'">
        <el-progress type="circle" :percentage="percent"
                     :stroke-width="12" :width="getProgressWidth" :color="progressColor">
        </el-progress>
        <div class="text-box">
          <div>表计数量：{{totalNum}}个</div>
          <div>报警数量：{{alarm.length?alarm[0].number:0}}个</div>
        </div>

      </div>
      <div class="data-info">
        <div class="data-info-module-name">{{moduleItem.moduleName}}</div>
        <div :class="fromFlag==1?'elec-data':'water-data'">{{energy}} <span class="unit">{{unit}}</span></div>
        <!--<div class="percent1">-->
          <!--<span>同比：{{Math.abs(tbzz)}}%</span>-->
          <!--<i v-if="tbzz!=0" :class="['iconfont',tbzz<0?'icon052caozuo_jiangxu desc-icon':'icon053caozuo_shengxu asc-icon']"></i>-->
        <!--</div>-->
        <!--<div class="percent2">-->
          <!--<span>环比：{{Math.abs(hbzz)}}%</span>-->
          <!--<i v-if="tbzz!=0" :class="['iconfont',hbzz<0?'icon052caozuo_jiangxu desc-icon':'icon053caozuo_shengxu asc-icon']"></i>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import EnergyApi from "@/service/api/energy";
  export default {
    name: "elecAndWater",
    components: {},
    props: ["moduleItem","fromFlag",'type'],
    data() {
      return {
        energy:0,
        percent:0,
        alarm:[],
        tbzz:0,
        hbzz:0,
        totalNum:0,
        unit:'',
        getProgressWidth:200
      };
    },
    computed:{
      progressColor(){
        return this.fromFlag==1?'#00dfff':'#03C281'
      },
    },
    methods: {
      async getEnergyData(){
        let res = await EnergyApi.getEnergyModuleData({
          redioType: 0,
          startTime:moment().subtract(1, 'days').format('YYYY-MM-DD'),
          selectType: 3,
          catalogs:'4000,1002',
        });
        this.alarm=res.alarm
        this.prop = res.prop
        if(this.fromFlag==1){
          this.totalNum = res.num.elecNum
          this.energy =res.energy.elecSum
          this.unit = 'KWh'
          this.alarm=res.alarm.length?res.alarm[0]:[]
          if(res.num.elecNum && res.alarm.length){
            this.percent = parseFloat((res.alarm[0].number /res.num.elecNum).toFixed(2))
          }else{
            this.percent = 0
          }
          this.tbzz=res.elecProp.value[0].tbzz
          this.hbzz=res.elecProp.value[0].hbzz
          $(".elec-progress-box .el-progress__text").html(
            `<div class="elec-alarm-num">${res.alarm.length?res.alarm.number:0}个</div><br />报警数量`)
        }else{
          this.totalNum = res.num.waterNum
          this.energy =res.energy.waterSum
          this.unit = 'm³'
          this.alarm=res.alarm.length &&res.alarm.length ==2?res.alarm[1]:[]
          if(res.num.waterNum && res.alarm.length){
            this.percent = parseFloat((res.alarm[0].number /res.num.waterNum).toFixed(2))
          }else{
            this.percent = 0
          }
          this.tbzz=res.waterProp.value[0].tbzz
          this.hbzz=res.waterProp.value[0].hbzz
          $(".water-progress-box .el-progress__text").html(
            `<div class="water-alarm-num">${res.alarm.length?res.alarm.number:0}个</div><br />报警数量`)
        }
      }

    },
    mounted() {
      this.getEnergyData()
      $(".elec-and-water-coms .el-progress__text").css({
        color:this.moduleItem.fontColor
      })
      this.getProgressWidth = $(".elec-sum-coms-inner").width()*0.4
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .elec-and-water-coms {
    width:100%;
    height:100%;
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
      /*color:#333;*/
    }
    .elec-data,.water-data{
      font-size:36px;
      font-weight: bold;
      color:#00dfff;
      margin:20px 0 10px 0 ;
    }
    .text-box{
      text-align: left;
      font-size:12px;
      font-weight:400;
      /*color:#666;*/
      margin-top:20px;
    }
    .elec-alarm-num,.water-alarm-num{
      font-size: 24px;
      color:#00dfff;
      /*margin-bottom:5px;*/
    }
    .water-data,.water-alarm-num,.desc-icon{
      color:#03C281;
    }
    .percent1,.percent2{
      font-size: 14px;
    }
    .el-progress__text{
      font-size: 12px !important;
    }
    .asc-icon{
      color:#FF0600;
    }
    .unit{
      font-size: 22px;
    }
  }
</style>
