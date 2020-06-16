<template>
  <div class="alarm-list-table-coms">
    <div class="alarm-list-table-coms-inner">
      <div class="time-box">
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择日期时间"
          @change="onTimeChange"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
        <span>至</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间"
          @change="onTimeChange"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
        <el-button type="primary" class="search-btn" @click="onClickSearchBtn">搜索</el-button>
      </div>
      <div class="table-box">
        <z-table :ref="tableConfig.ref" :options="tableConfig"
                 @handle-pagination="handleCurrentChange"
        ></z-table>
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
  import moment from 'moment'

  export default {
    name: 'alarmListTable',
    components: {},
    props: ['moduleItem'],
    data() {
      let _this = this
      return {
        tableConfig: {
          ref: "tableRef",
          serverMode: {
            url: CommonApi.getAlarmMessageList,
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
            height:'auto',
            showIndex:{
              handler: function (index) {
                return  _this.setIndex(index);
              }
            },
            pagination:{
              pageSize:5
            }
          },
        },
        // startTime:moment().add(-15,'days').format('YYYY-MM-DD HH:MM:SS'),
        // endTime:moment().format('YYYY-MM-DD HH:MM:SS')
        //moment(new Date(new Date().getTime() - 3600 * 24 * 1000 * 15)).format('YYYY-MM-DD HH:mm:SS'),
        //moment(new Date()).format('YYYY-MM-DD HH:mm:SS')
        startTime:new Date(new Date().getTime()- 3600 * 24 * 1000 * 15),
        endTime:new Date(),
        curPage:1
      }
    },
    computed: {},
    watch: {},
    methods: {
      onTimeChange() {
        this.setTableData()
        // this.$refs[this.tableConfig.ref].refreshTable()
      },
      setTableData() {
        let params = {
          start:this.startTime && moment(this.startTime).format('YYYY-MM-DD HH:mm:SS') || '',
          end: this.endTime && moment(this.endTime).format('YYYY-MM-DD HH:mm:SS') || ''
        }
        this.tableConfig.serverMode.data = {...pageInfo, ...params}
      },
      onClickSearchBtn() {
        this.$refs[this.tableConfig.ref].setCurrentPage(1)
        this.setTableData()
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      setIndex(index){
        return pageInfo.pageCount*(this.curPage-1)+index+1
      },
      handleCurrentChange(size,page){
         this.curPage = page
      }
    },
    created() {
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

    .alarm-list-table-coms-inner {
      width: 100%;
      height: 100%;
    }

    .table-box {
      flex-grow: 1;
      margin-top: 20px;
      box-sizing: border-box;
    }

    .search-btn {
      margin-left: 20px;
    }

    .time-box{
      width:100%;
    }
  }
</style>
