<template>
  <div class="ganged-log">
    <div class="my-chart ">
      <zTable :ref="tableConfig.ref" :tableConfig="tableConfig"></zTable>
    </div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: 'gangedLog',
    components: {
    },
    data () {
      return {
        tableConfig:{
          data: [
            {
              zbrq: "2019.11.6",
              zbry: "李逵",
              zbdd: "A座",
              zbnr: "巡视",
              jjry: "宋江"
            },
            {
              zbrq: "2019.11.8",
              zbry: "宋江",
              zbdd: "B座",
              zbnr: "巡视",
              jjry: "李逵"
            }
          ],
          columnConfig: [{
              prop: "zbrq",
              label: "巡检日期",
            },
            {
              prop: "zbry",
              label: "值班人员"
            },
            {
              prop: "zbdd",
              label: "巡检地点"
            },
            {
              prop: "zbnr",
              label: "备注"
            }],
          uiConfig: {
            height: "auto"
          }
        }
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      async getSpectionData(){
        let res = await CommonApi.getHomeInterfaceMonitor({
          homeId:10
        })
        let tmp=[]
        for(let key in res){
          tmp.push({
            name:key,
            value:res[key]
          })
        }
        // this.initChart(tmp)
      },
    },
    mounted(){
      this.getSpectionData()
    }
  }
</script>

<style lang="less">
  .inspection-coms{
    .my-chart{
       margin-top:20px;
      background: @white;
    }
  }
</style>
