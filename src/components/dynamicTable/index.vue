<template>
  <div class="dynamic-table-box">
    <div class="table-box">
      <div class="flex-align-between">
        <h3 class="table-tip">{{tableTip}}</h3>
        <el-button v-if='tableData.total!=0 &&!hideExportBtn' type="primary"
                   class="export-btn" @click="handleExport">
          导出表格
        </el-button>
      </div>
      <div v-if="tableData.total!=0">
        <div style="overflow-x:auto">
          <table width="100%" class="dynamic-table">
            <thead>
            <th v-for="(item,index) in tableData.title" :key="index">
              {{item}}
              <!--<span class="caret-wrapper">-->
              <!--<i class="sort-caret ascending"></i>-->
              <!--<i class="sort-caret descending"></i>-->
              <!--</span>-->
            </th>
            </thead>
            <tbody>
            <tr v-for="(item,index) in tableData.value" :key="index">
              <td v-for="(val,i) in item" :key="i" :class="val>parseFloat(item[1])&&styleLabel?'styleRed':''">{{val}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="page-box">
          <!--<span>共&nbsp;{{tableData.total}}&nbsp;条</span>-->
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="curPage"
            layout="total,prev, pager, next, jumper"
            :total="tableData.total">
          </el-pagination>
        </div>
      </div>
      <div v-if="tableData.total==0" class="no-data">暂无数据</div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'DynamicTable',
    components: {
    },
    props:['tableTip','tableData','curPage','hideExportBtn','styleLabel'],
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
      handleCurrentChange(value){
        this.$parent.handleCurrentChange(value)
      },
      handleExport(){
        this.$parent.handleExport()
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .dynamic-table-box{
    .table-box{
      /*border-radius: 10px;*/
      /*border:1px solid #ccc;*/
      /*margin-top: 30px;*/
      padding:5px;
      background: @white;
      overflow: hidden;
      .table-tip{
        padding-left:10px;
        text-align: left;
        color: #0f0f0f;
        width:70%;
        float: left;
      }
      .dynamic-table{
        border-spacing:0;
        font-size: 14px;
        clear: both;
        th,td{
          font-weight: normal;
          border-left:0.5px solid @tableBorder;
          border-top:0.5px solid @tableBorder;
          padding:12px 0;
        }
        tr:last-child td{
          border-bottom:0.5px solid @tableBorder;
        }
        .caret-wrapper {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          height: 34px;
          width: 24px;
          vertical-align: middle;
          cursor: pointer;
          overflow: initial;
          position: relative;
        }
        .sort-caret{
          width: 0;
          height: 0;
          border: 5px solid transparent;
          position: absolute;
          left: 7px;
        }
        .sort-caret.ascending {
          border-bottom-color: #c0c4cc;
          top: 5px;
        }
        .sort-caret.descending {
          border-top-color: #c0c4cc;
          bottom: 7px;
        }
        th{
          /*text-align: right;*/
          padding-right: 10px;
          font-weight: 600;
          color:#909399;
          background: #E5EAF2;
        }
        tbody td{
          text-align: right;
          padding-right: 10px;
          box-sizing: border-box;
        }
        .styleRed {
          color: red
        }
      }
      .page-box{
        margin:20px 5px;
        color: #606266;
        font-size: 13px;
        float: right;
      }
      .no-data{
        line-height: 60px;
        width: 100%;
        color: #909399;
        text-align: center;
        border:1px solid @tableBorder;
      }
      .export-btn{
        margin: 10px 10px 10px 0;
      }
    }
    .table-tip{
      margin-top:15px;
    }
  }

</style>
