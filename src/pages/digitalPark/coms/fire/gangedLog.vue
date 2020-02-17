<template>
  <div class="ganged-log">
    <div class="my-chart ">
      <zTable :ref="tableConfig.ref" :options="tableConfig"></zTable>
    </div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: 'gangedLog',
    components: {
    },
    props:['moduleItem'],
    data () {
      return {
        tableConfig:{
          ref:'tableRef',
          data:[],
          columnConfig: [{
              prop: "causeAsset",
              label: "事件源"
            },{
              prop: "time",
              label: "时间"
            },{
              prop: "value",
              label: "事件"
            }],
          uiConfig: {
            // height: "auto",
            showIndex: {
              width: 50
            },
            // pagination: false
          }
        }
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      async getGangedLog(){
        let res = await CommonApi.getGangedLog({
          pageNum:1,
          pageCount:6,
          start:'',
          end:''
        })
        this.tableConfig.data=res
      }
    },
    mounted(){
      this.getGangedLog()
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
