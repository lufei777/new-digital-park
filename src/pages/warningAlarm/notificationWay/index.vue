<template>
<!-- 报警规则处理 -->
  <div class="message-device-manage panel-container">
    <!-- 下半部分 -->
    <div class="warehouse-manage-table panel">
      <div class="operator-btn-box flex-row-reverse">
       <el-button>导入</el-button>
        <el-button >导出</el-button>
        <el-button @click="gonewAdd" type="primary">新增</el-button>
        
        
        
      </div>
      <!-- 表格部分 -->
      <z-table :ref="tableData.ref" :options="tableData">
      </z-table>
    </div>
  </div>
</template>

<script>
import commonFun from '../../../utils/commonFun';
  export default {
    name: "areaManage",
    data() {
      return {
        model: {},
        tableData: {
          ref: "tableData",
          customTop: true,
          data: [],
          columnConfig: [],
          uiConfig: {
            height: "auto", //"", //高度
            selection: true, //是否多选
            showIndex: false,
            pagination: {
              //是否分页，分页是否自定义
              layout: "total,->, prev, pager, next, jumper",
              pageSizes: [10, 20, 50],
              handler(pageSize, currentPage, table) {
                _this.handleCurrentChange(currentPage);
              }
            }
          },
          btnConfig: {
            prop: "operation",
            label: "操作",
            fixed: "right",
            width: 200,
            btns: [
              {
                label: "编辑",
                handler: function(row) {}
              },
              {
                label: "删除",
                handler: function(row) {}
              }
            ]
          }
        }
      };
    },

    methods: {
      // 新增按钮的事件
      gonewAdd(){
        // 去往新增页面
        this.$router.push('/newAdd')
      },
      submit() {},
      resetChange() {},
      getCleaningList() {
        // 来自CommonFun的模拟数据源 let res = CommonFun.messageDevice;
        // let res = CommonFun.messageDevice;
        let res = commonFun.notificationWay
        let labelList = [

          
          { label: "报警级别", prop: 'alarmLevel' },
          { label: "弹框类型", prop:'dialogType' },
          {label:'语音' ,      prop:'voice'},
          {label:'短信',       prop:'msg'}

        ];
        this.tableData.columnConfig = labelList;
        this.tableData.data = res;
      },
      batchDels() {},
      addTenant() {}
    },
    mounted() {
      this.getCleaningList();
    }
  };
</script>

<style lang="less">
  .message-device-manage {
    .condition-box{
      padding-top:20px;
      margin-bottom: 20px;
    }
  }
</style>
