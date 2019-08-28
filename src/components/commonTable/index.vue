<template>
  <div>
        <div class="flex-align-between" v-if="tableObj.tableTip">
          <h3 class="table-tip">{{tableObj.tableTip}}</h3>
          <el-button v-if='tableObj.total!=0&&!tableObj.hideExportBtn' type="primary"
                     class="export-btn" @click="handleExport">
            导出表格
          </el-button>
         </div>
        <el-table  :data="tableObj.dataList" border  @sort-change='sortTable'>
          <el-table-column v-for="(item,index) in tableObj.labelList"
                           :prop="item.prop"
                           :label="item.name"
                           :key="index"
                           :sortable="item.sort"
                           :formatter="formatSpecialCol"
                           align="right"
          >
          </el-table-column>
        </el-table>
        <div class="page-box" v-if="tableObj.total!=0">
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
    props:['tableObj','curPage'],
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
        }else if(cellValue==null){
          return '--'
        }else{
          return cellValue
        }
      },
      handleExport(){
        this.$parent.handleExport()
      }
    },
    async mounted(){
    }
  }
</script>

<style lang="less">
  .page-box{
    float: right;
    margin:20px;
  }
</style>
