<template>
  <div class="permission-manage panel-container">
    <!--<div class="flex-align panel">-->
      <!--<div class="item-group flex-align-center">-->
        <!--<label>菜单名称：</label>-->
        <!--<el-input v-model="searchParams.name"/>-->
      <!--</div>-->
      <!--<div class="item-group flex-align-center">-->
        <!--<label>是否可见：</label>-->
        <!--<el-select v-model="searchParams.isHidden">-->
          <!--<el-option-->
            <!--v-for="(item,index) in hiddenDic"-->
             <!--:key="index"-->
             <!--:label="item.label"-->
             <!--:value="item.value"-->
          <!--&gt;</el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <!--<div class="item-group operator-box">-->
        <!--<el-button type="primary" @click="onClickSearchBtn">搜索</el-button>-->
        <!--<el-button @click="onClickResetBtn">重置</el-button>-->
      <!--</div>-->
    <!--</div>-->
    <div class="panel">
      <div class="flex-row-reverse operator-btn-box">
        <el-button type="primary" @click="onClickExportBtn">导出</el-button>
        <el-button type="primary" @click="onClickImportBtn">导入</el-button>
      </div>
      <z-table :ref="tableConfig.ref" :options="tableConfig" >
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="editRow(row)">编辑</el-button>
          <!--<el-button type="text" @click="deleteRow(row)">删除</el-button>-->
        </template>
      </z-table>
    </div>
  </div>

</template>

<script>
  import SystemManageApi from '@/service/api/systemManage'
  import {SystemDic} from "@/utils/dictionary";
  import CommonFun from '@/utils/commonFun'
  let searchParams = {
    name:'',
    isHidden:null
  }

  let pageInfo = {
    pageNum:1,
    pageSize:10
  }
  export default {
    name: 'menuManage',
    components: {},
    props: [],
    data() {
      return {
        tableConfig: {
          ref: "tableRef",
          serverMode:{
            url:SystemManageApi.getPermissionList,
            data:{
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
            label: '权限名称',
            prop: 'name'
          }, {
            label: '权限描述',
            prop: 'pDesc'
          }],
          operation: {
            width: 150
          },
          uiConfig: {
            height: "auto",
          },
          customTop: true,
          tableMethods: {},
        },
      }
    },
    computed: {
    },
    watch: {},
    methods: {
      onClickExportBtn(){},
      onClickImportBtn(){}
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  .permission-manage{

  }
</style>
