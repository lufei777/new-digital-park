<template>
  <div>
        <div>
          <h3 class="table-tip" v-if="tableObj.tableTip">{{tableObj.tableTip}}</h3>
          <el-button v-if='tableObj.total && tableObj.total!=0&&showExportBtn' type="primary"
                     class="export-btn" @click="handleExport">
            导出表格
          </el-button>
        </div>
        <el-table  :data="tableObj.dataList" border
                   @sort-change='sortTable'
                   @row-click.self="rowClick"
                   @selection-change="handleSelectionChange"
        >
          <af-table-column v-for="(item,index) in tableObj.labelList"
                           :prop="item.prop"
                           :label="item.name"
                           :key="index"
                           :sortable="item.sort"
                           :formatter="formatSpecialCol"
                           :type="item.type"
          >
          </af-table-column>
          <el-table-column v-if="tableObj.showOperator" fixed="right"
                           label="操作" width="120" align="left">
            <template v-slot="myScope">
              <el-button size="small" type="text"
               @click.native.prevent="editRow(myScope.$index, tableObj.dataList)" >
                修改
              </el-button>
              <el-button size="small" type="text"
                         @click.native.prevent="deleteRow(myScope.$index, tableObj.dataList)" >
                删除
              </el-button>
            </template>
          </el-table-column>
          <slot name="special-operator"></slot>
        </el-table>
        <div class="page-box flex-align-between" v-if="tableObj.total && tableObj.total!=0">
          <span>共{{tableObj.total}}条信息</span>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="curPage"
            layout="total, prev, pager, next, jumper"
            :total="tableObj.total">
          </el-pagination>
        </div>
  </div>
</template>

<script>
  export default {
    name:'CommonTable',
    props:['tableObj','curPage','showExportBtn'],
    components: {
    },
    data () {
      return {}
    },
    computed: {
    },
    methods: {
      handleCurrentChange(val){
        this.$parent.handleCurrentChange(val)
      },
      sortTable(column){
        this.$parent.sortTable(column)
      },
      formatSpecialCol(row, column,cellValue){
         // console.log(row,column,cellValue)
        if(column.property=='tbzz'){
          return parseFloat(row.tbzz).toFixed(2)+"%"
        }else if(column.property=='hbzz'){
          return parseFloat(row.hbzz).toFixed(2)+"%"
        }else if(cellValue==null || cellValue==''){
          return '--'
        }else if(column.property=='meterType'){
            return row.meterType==0?'实表':'虚表'
        }else{
          return cellValue
        }
      },
      handleExport(){
        this.$parent.handleExport()
      },
      rowClick(row,col){
        this.$parent.rowClick && this.$parent.rowClick(row,col)
      },
      editRow(index,dataList){
        this.$parent.editRow(dataList[index])
      },
      deleteRow(index,dataList){
        this.$parent.deleteRow(dataList[index])
      },
      handleSelectionChange(val){
        this.$parent.handleSelectionChange(val)
      }
    },
    async mounted(){
    }
  }
</script>

<style lang="less">
  .page-box{
    /*float: right;*/
    /*margin:20px;*/
    width:97%;
    padding:5px 10px;
    margin:10px auto 0 auto;
    background: #F4F5F7;
    box-sizing: border-box;
  }
  .table-tip{
    float: left;
    margin-top: 15px;
  }
  .export-btn{
    float: right;
    margin: 10px 0;
  }
  .el-table td.is-right, .el-table th.is-right{
    text-align: left;
  }
</style>
