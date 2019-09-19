<template>
  <div>
        <div>
          <h3 class="table-tip" v-if="tableObj.tableTip">{{tableObj.tableTip}}</h3>
          <el-button v-if='tableObj.total && tableObj.total!=0&&!tableObj.hideExportBtn' type="primary"
                     class="export-btn" @click="handleExport">
            导出表格
          </el-button>
        </div>
        <el-table  :data="tableObj.dataList" border
                   @sort-change='sortTable'
                   @row-click="rowClick"
                   @selection-change="handleSelectionChange"
        >
          <af-table-column v-for="(item,index) in tableObj.labelList"
                           :prop="item.prop"
                           :label="item.name"
                           :key="index"
                           :sortable="item.sort"
                           :formatter="formatSpecialCol"
                           :type="item.type"
                           align="right"
          >
          </af-table-column>
          <el-table-column v-if="tableObj.showOpertor" fixed="right" label="操作" width="120"  align="right">
            <template slot-scope="scope">
              <el-button size="small" type="text"
               @click.native.prevent="editRow(scope.$index, tableObj.dataList)" >
                修改
              </el-button>
              <el-button size="small" type="text"
                         @click.native.prevent="deleteRow(scope.$index, tableObj.dataList)" >
                删除
              </el-button>
            </template>
          </el-table-column>
          <slot name="special-operator"></slot>
          <!--<el-table-column v-if="tableObj.showRoleOperator" fixed="right" label="操作" width="120"  align="right">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button size="small" type="text"-->
                         <!--@click.native.prevent="editRow(scope.$index, tableObj.dataList)" >-->
                <!--编辑-->
              <!--</el-button>-->
              <!--<el-button size="small" type="text"-->
                         <!--@click.native.prevent="editRow(scope.$index, tableObj.dataList)" >-->
                <!--编辑权限-->
              <!--</el-button>-->
              <!--<el-button size="small" type="text"-->
                         <!--@click.native.prevent="deleteRow(scope.$index, tableObj.dataList)" >-->
                <!--删除-->
              <!--</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
        <div class="page-box" v-if="tableObj.total && tableObj.total!=0">
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
    float: right;
    margin:20px;
  }
  .table-tip{
    float: left;
    margin-top: 15px;
  }
  .export-btn{
    float: right;
    margin: 10px 0;
  }
</style>
