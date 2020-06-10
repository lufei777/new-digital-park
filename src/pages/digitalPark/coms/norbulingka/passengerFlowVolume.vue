<template>
  <div class="passenger-flow-volume">
    <div class="module-item-top-name flex-align">
      <i class="module-item-top-icon"></i>
      <span>{{moduleItem.moduleName}}</span>
    </div>
    <div ref="myChart" class="my-chart"></div>
  </div>
</template>

<script>
  export default {
      name: 'passengerFlowVolume',
      components: {},
      props: ['moduleItem'],
      data() {
        return {}
      },
      computed: {},
      watch: {},
      methods: {
        initChart() {
          let myChart = this.$echarts.init(this.$refs.myChart);
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
            },
            toolbox: {
              show: true,
            },
            color: ['#486E97'],
            xAxis: {
              name:'时间',
              nameTextStyle:{
                color: this.moduleItem.type!=2?'#fff':''
              },
              axisLabel: {
                textStyle: {
                  color: this.moduleItem.type!=2?'#fff':''
                },
              },
              "axisLine": {
                "show": false
              },
              "axisTick": {
                "show": false
              },
              type: 'category',
              boundaryGap: false,
              data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
                '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
                '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
            },
            yAxis: {
              name:'人',
              nameTextStyle:{
                color: this.moduleItem.type!=2?'#fff':''
              },
              type: 'value',
              splitLine: {
                show: false
              },
              "axisLine": {       //y轴
                "show": false
              },
              "axisTick": {       //y轴刻度线
                "show": false
              },
              axisLabel: {
                textStyle: {
                  color: this.moduleItem.type!=2?'#fff':''
                },
              },
            },
            series: [
              {
                name: '报警',
                type: 'line',
                smooth: true,
                areaStyle: {},
                data: [0, 0, 0, 0, 0, 0, 0,40, 90, 120, 150,
                  146, 166, 170, 134, 98, 60, 54, 70, 40, 10,0,0 ,0],
                itemStyle : {
                  normal : {
                    // color:'#00FF00',
                    lineStyle:{
                      color:'#A74CFF'
                    }
                  }
                },
              }
            ]
          };
          $(window).resize(function () {
            myChart.resize()
          })
          myChart.setOption(option, true)
        },
      },
      mounted() {
        this.initChart()
      }
  }
</script>

<style lang="less">
</style>
