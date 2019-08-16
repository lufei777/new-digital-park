<template>
  <div class="device-analysis">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>相关性分析</span>
    </div>
    <MonitorChoose />
    <MonitorModal />
  </div>
</template>

<script>
  import MonitorChoose from '../coms/monitorChoose'
  import MonitorModal from '../../../components/monitorModal/index'
  export default {
    name: 'DeviceAnalysis',
    components: {
      MonitorChoose,
      MonitorModal
    },
    data () {
      return {
        startTime:'',
        endTime:'',
      }
    },
    methods: {
    },
    mounted(){

    }
  }
</script>

<style lang="less">
  .device-analysis{
    margin-top: 85px;
    padding:0 20px;
    .tip{
      height: 66px;
      border-bottom: 1px solid #eaeaea;
      .icon {
        width: 2px;
        height: 24px;
        background: #01465c;
        border-radius: 2px;
        margin-right: 10px;
      }
      span{
        font-size: 24px;
        color:#01465c;
      }
    }
    .chart-box{
      width:80%;
      margin:20px auto;
    }
    .my-chart{
      height:500px;
    }
    .choose-box{
      padding:20px 0;
      border-bottom: 1px solid #eaeaea;
    }
    .block{
      margin:0 40px;
    }
    .choose-tip{
      margin-left: 100px;
      width:80px;
      text-align: right;
    }
    .el-button{
      margin:0 10px;
    }
  }
</style>
