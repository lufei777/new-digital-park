<template>
  <div class="co2-monitoring-coms">
    <div class="my-chart">

    </div>
  </div>
</template>

<script>
  import CommonFun from '@/utils/commonFun'
  export default {
    name: 'CO2Monitoring',
    components: {},
    props: [],
    data() {
      return {

      }
    },
    computed: {},
    watch: {},
    methods: {
      initChart() {
        let myChart = this.$echarts.init(this.$refs.myChart);
        let res = [ {name:'第一季度',value:1000},
                    {name:'第二季度',value:700},
                    {name:'第三季度',value:1200},
                    {name:'第四季度',value:900}]
        let legendData = res.map((item)=>{item.legendData})
        let data={
          legendData,
          series:res
        }

      },
    },
    mounted() {
      this.initChart()
    }
}
</script>

<style lang="less">
</style>
