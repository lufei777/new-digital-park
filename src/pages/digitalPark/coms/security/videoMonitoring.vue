<template>
  <div class="video-monitoring">
    <z-charts :options="chartConfig" class="chart1"></z-charts>
  </div>
</template>

<script>
  export default {
    name: 'videoMonitoring',
    components: {
    },
    data () {
      return {
        chartConfig:{
          type:'ring',
          data: {
            columns: [
              "name",
              "value",
            ],
            rows: [{}]
          },
          legend:{
            textStyle:{
              color:'#8FD3FA',
              fontSize:14,
            },
            right:10,
            y:'40%',
            orient: 'vertical',
          },
          settings:{
            offsetY: 130,
            center:['10%','10%'],
            radius: ['50%', '70%'],
            label:{
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            }
          },
        }
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      getVideoData(){
        let res = [{id:1,name:'硬盘录像机',value:100},
                   {id:1,name:'摄像机',value:20},
                   {id:1,name:'矩阵',value:1}]
        this.chartConfig.data.rows=res
      }
    },
    mounted(){
      this.getVideoData()
    }
  }
</script>

<style lang="less">
</style>
