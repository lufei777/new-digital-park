<template>
  <div class="diagnose-trend">
    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      width="50%"
      >
      <div>
        <div  class="flex-row-reverse">
          <div class="flex-align-center  time-box">
            <el-button>上一日</el-button>
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期"
              class="choose-date"
            >
            </el-date-picker>
            <el-button>下一日</el-button>
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
    props: ["showModal"],
    data() {
      return {
        chartType:'1',
        date:''
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
    },
    methods: {
      onClickCancelBtn(){
        this.$parent.showTrendModal=false
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
