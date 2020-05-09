<template>
  <div class="alarm-list-table-coms">
    <div class="alarm-list-table-coms-inner flex-wrap">
      <div class="time-box">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="开始时间">
        </el-date-picker>
        <span>至</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="结束时间">
        </el-date-picker>
      </div>
      <div class="table-box">
        <z-table :ref="tableConfig.ref" :options="tableConfig"></z-table>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  let pageInfo = {
    pageNum: 1,
    pageCount: 5
  }
  export default {
    name: 'alarmListTable',
    components: {},
    props: ['moduleItem'],
    data() {
      return {
        tableConfig: {
          ref: "tableRef",
          serverMode: {
            url:  CommonApi.getAlarmMessageList,
            data: {}
          },
          propsHttp: {
            list: "rows",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          columnConfig: [
            {label: "事件", prop: "caption"},
            {label: "开始时间", prop: "startTime"},
            {label: "报警描述", prop: "errorMessage"},
            {
              label: "状态", prop: "handled",
              formatter: function (row, column) {
                return row.handled == 1 ? '已处理' : '未处理'
              }
            }
          ],
          uiConfig: {
            height: "auto",
            showIndex: true,
          },
        },
        startTime:moment().add(-15,'days').format('YYYY-MM-DD HH:MM:SS'),
        endTime:moment().format('YYYY-MM-DD HH:MM:SS')
      }
    },
    computed: {},
    watch: {},
    methods: {
      onTimeChange(){
        this.setTableData()
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      setTableData(){
        let params = {
          start:this.startTime,
          end:this.endTime
        }
        this.tableConfig.serverMode.data = {...pageInfo,...params}
      }
    },
    created(){
       this.setTableData()
    },
    mounted() {

      // this.getAlarmMessageList()
    }
  }
</script>

<style lang="less">
  .alarm-list-table-coms {
    box-sizing: border-box;
    /*padding:10px;*/
    .alarm-list-table-coms-inner{
      width: 100% ;
      height: 100%;
    }
    .table-box{
      flex-grow: 1;
      margin-top: 20px;
      box-sizing: border-box;
    }
  }
</style>
