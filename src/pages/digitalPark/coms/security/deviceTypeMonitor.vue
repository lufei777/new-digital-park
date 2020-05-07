<template>
  <div class="device-type-monitor-coms">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="device-box flex-align-around my-chart">
      <div class="progress-box flex-colum-center progress-box1">
        <el-progress type="circle" :percentage="deviceData.ball.percent"
                     :stroke-width="12" :width="150" :color="deviceData.ball.progressColor">
        </el-progress>
        <div class="text-box">
          <div>球机：{{deviceData.ball.total}}个</div>
          <div>运行：{{deviceData.ball.run}}个</div>
        </div>

      </div>
      <div class="progress-box flex-colum-center  progress-box2">
        <el-progress type="circle" :percentage="deviceData.bolt.percent"
                     :stroke-width="12" :width="150" :color="deviceData.bolt.progressColor">
        </el-progress>
        <div class="text-box">
          <div>球机：{{deviceData.bolt.total}}个</div>
          <div>运行：{{deviceData.bolt.total}}个</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import EnergyApi from "@/service/api/energy";
  export default {
    name: "deviceTypeMonitor",
    components: {},
    props: ["moduleItem"],
    data() {
      return {
        deviceData:{
          ball:{
            total:230,
            run:290,
            percent:91,
            progressColor:'#A994F2'
          },
          bolt:{
            total:230,
            run:190,
            percent:59,
            progressColor:'#369BC6'
          }
        }
      };
    },
    computed:{
    },
    methods: {
       getData(){
         $(".progress-box1 .el-progress__text").html(`
                <div class="ball-run-num">${this.deviceData.ball.percent}%</div><br /><span>运行设备</span>`)
         $(".progress-box2 .el-progress__text").html(`
               <div class="bolt-run-num">${this.deviceData.bolt.percent}%</div><br /><span>运行设备</span>`)

       }

    },
    mounted() {
      this.getData()
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .device-type-monitor-coms {
    width:100%;
    height:100%;
    .device-box{
      width:100%;
    }
    .progress-box{
      width: 50% ;
      /*height:100% ;*/
    }
    .progress-box{
      width:50%;
      text-align: center;
    }
    .text-box{
      text-align: left;
      font-size:14px;
      font-weight:400;
      color:@white;
      margin-top:20px;
    }
    .ball-run-num,.bolt-run-num{
      font-size: 16px;
    }
    .ball-run-num{
      color:#A994F2;
    }
    .bolt-run-num{
      color:#369BC6;
    }
    .el-progress__text span{
      color:@white;
      font-size: 16px;
    }
  }
</style>
