<template>
  <div class="operator-log panel-container">
    <div class="choose-box flex-align radius-shadow panel">
      <div class="block flex-align-center">
        <span>操作者:</span>
        <el-input v-model="searchParams.loginName"/>
      </div>
      <div class="block flex-align-center">
        <span>操作内容:</span>
        <el-input v-model="searchParams.operatingContent"/>
      </div>
      <div class="block flex-align-center">
        <span>开始时间:</span>
        <el-date-picker
          v-model="searchParams.startTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div class="block flex-align-center">
        <span>结束时间:</span>
        <el-date-picker
          v-model="searchParams.endTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" @click="onClickSearchBtn">搜索</el-button>
      <el-button @click="onClickResetBtn">重置</el-button>
    </div>
    <z-table :ref="tableConfig.ref" :options="tableConfig" class="panel">
    </z-table>
  </div>
</template>

<script>
  let pageInfo = {
    rows: 10,
    page: 1
  }
  import moment from 'moment'
  import CommonApi from '@/service/api/common'

  export default {
    name: 'OperatorLog',
    components: {
    },
    data() {
      return {
        searchParams: {
          startTime: '',
          lastTime: '',
          operatingContent: '',
          loginName: "",
        },
        tableConfig: {
          ref: "tableRef",
          serverMode: {
            url: CommonApi.getLogList,
            data: {
             ...pageInfo
            }
          },
          propsHttp: {
            list: "rows",
            total: "total",
            pageSize: "rows",
            pageNum: "page"
          },
          columnConfig: [{
            label: '操作者',
            prop: 'loginName'
          }, {
            label: '操作内容',
            prop: 'operatingContent'
          }, {
            label: '日期时间',
            prop: 'optDate'
          }, {
            label: '结果',
            prop: 'result'
          }],

          uiConfig: {
            height: "auto",
            selection: true,
          },
        },
      }
    },
    methods: {
      onClickResetBtn() {
        this.searchParams = {
          startTime: '',
          lastTime: '',
          operatingContent: '',
          loginName: "",
          endTime:''
        }
        this.getData()
      },
      onClickSearchBtn() {
        this.getData()
      },
      getData(){
        let tmp = this.searchParams.endTime
        this.searchParams.lastTime = tmp?tmp:moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        this.$refs[this.tableConfig.ref].setCurrentPage(1)
        this.tableConfig.serverMode.data = {...this.searchParams,...pageInfo}
        this.$refs[this.tableConfig.ref].refreshTable()
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less">
  .operator-log {
    .choose-box {
      overflow: hidden;
      padding: 20px;
      background: @white;
      margin-bottom: 20px;
    }

    .block {
      margin-right: 40px;
      display: flex;

      span {
        flex-shrink: 0;
        margin-right: 10px;
      }
    }

    .choose-tip {
      margin-left: 100px;
      width: 80px;
      text-align: right;
    }
  }
</style>
