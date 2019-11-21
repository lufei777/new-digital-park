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
  }

</style>
