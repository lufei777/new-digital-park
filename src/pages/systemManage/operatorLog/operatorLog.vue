<template>
  <div class="operator-log panel-container">
    <div class="choose-box flex-align radius-shadow panel">
      <div class="item-group flex-align-center">
        <label>操作者：</label>
        <el-input v-model="searchParams.loginName"/>
      </div>
      <div class="item-group flex-align-center">
        <label>操作内容：</label>
        <el-input v-model="searchParams.operatingContent"/>
      </div>
      <div class="item-group flex-align-center">
        <label>开始时间：</label>
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
      <div class="item-group flex-align-center">
        <label>结束时间：</label>
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
      <div class="item-group operator-box">
        <el-button type="primary" @click="onClickSearchBtn">搜索</el-button>
        <el-button @click="onClickResetBtn">重置</el-button>
      </div>
    </div>
    <z-table :ref="tableConfig.ref" :options="tableConfig" class="panel">
    </z-table>
  </div>
</template>

<script>
  let pageInfo = {
    pageSize: 10,
    pageNum: 1
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
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
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

<style lang="less" scoped>
  .operator-log {
    .choose-box {
      overflow: hidden;
      padding: 20px;
      background: @white;
      margin-bottom: 20px;
    }
    .operator-box{
      .el-button{
        margin-right: 10px;
      }
    }
  }
</style>
