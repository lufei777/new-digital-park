<template>
  <div class="monitor-choose">
    <div class="flex-align choose-box">
      <span class="choose-tip">时间</span>
      <div class="block">
        <span class="demonstration">开始时间</span>
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="onTimeChange(1)"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">结束时间</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="onTimeChange(-1)"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="flex-align choose-box">
      <span class="choose-tip">监测器选择</span>
      <div class="block">
        <span>B-ALE-1-a 照明</span>
        <el-button @click="onClickShowBtn(1)">请选择</el-button>
      </div>
      <div class="block">
        <span>B-ALE-1-a 照明</span>
        <el-button @click="onClickShowBtn(2)">请选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import MonitorModal from '../../../components/monitorModal/index'
  export default {
    name: 'DeviceAnalysis',
    components: {
      MonitorModal
    },
    data () {
      return {
        startTime:new Date(new Date().getTime()-5*24*60*60*1000),
        endTime:new Date(),
      }
    },
    computed:{
    },
    methods: {
      onClickShowBtn(flag){
        this.$store.commit('analysis/curSelect',flag)
        this.$store.commit('analysis/showDialog',true)
      },
      onTimeChange(flag){
        // if(flag==1){
        //   this.$store.commit('analysis/startTime',this.startTime)
        // }else{
        //   this.$store.commit('analysis/endTime',this.endTime)
        // }
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less">
  .monitor-choose{
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
