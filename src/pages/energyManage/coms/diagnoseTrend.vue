<template>
  <div class="diagnose-trend">
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="50%"
      >
      <div>
        <div  class="flex-row-reverse">
          <div class="flex-align-center  time-box">
            <el-button @click="onClickPreBtn">上一日</el-button>
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期"
              class="choose-date"
            >
            </el-date-picker>
            <el-button @click="onClickNextBtn">下一日</el-button>
          </div>
          <el-select v-model="chartType" >
            <el-option value="1" label="曲线图"></el-option>
            <el-option value="2" label="柱状图"></el-option>
          </el-select>
        </div>
        <div class="chart-box"></div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {isZG} from '@/utils/project';

  export default {
    name: "diagnoseTrend",
    components: {
    },
    props: ["showModal","trendDate",'searchParams'],
    data() {
      return {
        chartType:'1',
        date:""
      }
    },
    computed: {
      showDialog:{
        get(){
          return this.showModal
        },
        set(){
          this.onClickCancelBtn()
        }
      },
      title(){
        return `${this.searchParams.dateType==1?'全天':'夜间'}${this.searchParams.energyName}浪费诊断趋势图`
      }
    },
    watch:{
      trendDate(){
        this.date = this.trendDate
      },
      date(){
        this.getTrendData()
      }
    },
    methods: {
      onClickCancelBtn(){
        this.$parent.showTrendModal=false
      },
      onClickPreBtn(){
        this.date = moment(this.date).subtract(1,'days').format()
      },
      onClickNextBtn(){
        this.date = moment(this.date).subtract(-1,'days').format()
      },
      getTrendData(){
         let params = {...this.searchParams,...{dateTime:this.date}}
         console.log('parm',params)
      }
    },
    async created() {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .diagnose-trend {
    .time-box{
      margin-left: 40px;
    }
    .choose-date{
      margin:0 10px;
    }
  }
</style>
