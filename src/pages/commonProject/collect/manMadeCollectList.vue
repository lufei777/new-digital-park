<template>
  <div>
    <div class="man-made-list" v-if="!showAdd" >
      <div class="flex condition-box radius-shadow">
        <div class="block">
          <span class="demonstration">开始时间</span>
          <el-date-picker
            v-model="startTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="onTimeChange(-1)"
            :clearable="false"
          >
          </el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">结束时间</span>
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="onTimeChange(-1)"
            :clearable="false"
          >
          </el-date-picker>
        </div>
        <el-button type="primary" @click="getManMadeCollectList">确定</el-button>
      </div>
      <div class="table-box radius-shadow">
        <Table  :ref="tableConfig.ref" :table-config="tableConfig"/>
      </div>
      <div class="operator-box">
        <el-button type="primary" icon="el-icon-delete">删除记录</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加记录</el-button>
      </div>
    </div>
    <AddCollect v-if="showAdd" />
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import Table from '../../../components/Table/index'
  import AddCollect from './addCollect'

  export default {
    name: 'ManMadeCollectList',
    components: {
      Table,
      AddCollect
    },
    data () {
      let _this = this
      return {
       startTime:'',
       endTime:'',
       curPage:1,
       tableConfig:{
        ref: "tableRef",
        data:[],
        columnConfig:[],
        uiConfig: {
          height: "auto",
          selection: true,
          pagination: {
            layout: "total,->, prev, pager, next, jumper",
          }
        },
        tableMethods: {
        }
       },
       showAdd: false
      }
    },
    methods: {
      onTimeChange(flag){

      },
      async getManMadeCollectList(){
        let params={
          start:this.startTime,
          end:this.endTime,
          page:this.curPage,
          rows:10
        }
        let res = await CommonApi.getManMadeCollectList(params)
        this.tableConfig.columnConfig=[
          {label:'监测器名称',prop:'monitorStr'},
          {label:'录入时间',prop:'lookTime'},
          {label:'用户名',prop:''},
          {label:'表值',prop:'value'}]
        this.tableConfig.data=res.value
        this.tableConfig.uiConfig.pagination.total=res.total
      },
      onClickAddBtn(){
         this.showAdd= true
      }
    },
    mounted(){
      this.getManMadeCollectList()
    }
  }
</script>

<style lang="less">
  .man-made-list{
    .condition-box{
      padding:20px;
      background: @white;
      margin-bottom:20px;
    }
    .block{
      margin-right:40px;
    }
    .demonstration{
      margin-right: 5px;
    }
    .operator-box{
      clear: both;
      padding:10px 0;
      .el-button{
        margin-right: 20px;
      }
    }
    .table-box{
      padding:20px;
      background: @white;
    }
  }
</style>
