<template>
  <div class="man-made-list">
    <div class="flex condition-box radius-shadow">
      <div class="block">
        <span class="">能源：</span>
        <el-select  v-model="curEnergy" placeholder="请选择">
          <el-option label="电" value="34"></el-option>
          <el-option label="水" value="37"></el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="demonstration">开始时间：</span>
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
        <span class="demonstration">结束时间：</span>
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
      <el-button type="primary" @click="getAutoCollectList">确定</el-button>
    </div>
    <div class="table-box radius-shadow">
      <Table  :ref="tableConfig.ref" :table-config="tableConfig"/>
    </div>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import Table from '../../../components/Table/index'
  export default {
    name: 'AutoCollectList',
    components: {
      Table
    },
    data () {
      let _this = this
      return {
        startTime:'',
        endTime:'',
        curPage:1,
        tableData:{},
        curEnergy:'34',
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
      }
    },
    methods: {
      onTimeChange(flag){

      },
      async getAutoCollectList(){
        let params={
          catalog:this.curEnergy,
          startTime:this.startTime,
          endTime:this.endTime,
          page:this.curPage,
          size:10
        }
        let res = await CommonApi.getAutoCollectList(params)
        this.tableConfig.columnConfig=[{label:'序号',prop:'xulie'},
                       {label:'时间',prop:'time'},
                       {label:'表名称',prop:'name'},
                       {label:'数值',prop:'value'},
                       {label:'所属空间',prop:'caption'}]
        this.tableConfig.data=res.value
        this.tableConfig.uiConfig.pagination.total=res.total
      },
      handleCurrentChange(val){
        this.curPage=val
        this.getAutoCollectList()
      },
      handleExport(){
        let sendUrl ='/vibe-web/energyCount/energy/getBaseRepresentationNumberExcel?catalog='
          +this.curEnergy+'&startTime='+this.startTime+'&endTime='+this.endTime+'&page='+this.curPage+'&size=10'
        location.href=sendUrl
      }
    },
    mounted(){
      this.getAutoCollectList()
    }
  }
</script>

<style lang="less">
  .man-made-list{
    .condition-box{
      padding:20px;
      background: @white;
      margin-bottom: 20px;
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
