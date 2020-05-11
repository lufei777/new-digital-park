<template>
  <div class="message-publish-manage panel-container">
    <div class="condition-box radius-shadow  flex-wrap">
      <div class="item-group">
        <label for="">发布编号：</label>
        <el-input type="text" />
      </div>
      <div class="item-group">
        <label for="">发布名称：</label>
        <el-input type="text" />
      </div>
      <div class="item-group">
        <label for="">发布日期：</label>
        <el-input type="text" />
      </div>
      <div class="item-group">
        <el-button  type="primary" @click="onClickSearchBtn(obj)">搜索</el-button>
        <el-button  @click="clearForm(obj)">重置</el-button>
      </div>
    </div>

    <div class="warehouse-manage-table panel">
      <div class="operator-btn-box flex-row-reverse">
        <el-button  type="primary">批量删除</el-button>
        <!--<el-button  type="primary">导出</el-button>-->
        <!--<el-button  type="primary">导入</el-button>-->
        <el-button  type="primary" @click="onClickAddBtn">新增</el-button>
      </div>
      <z-table :ref="tableConfig.ref" :options="tableConfig">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="dealAsset(row)">编辑</el-button>
          <el-button type="text" @click="dealAsset(row)">删除</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
  import CommonFun from "@/utils/commonFun";
  export default {
    name: "publishManage",
    data() {
      return {
        tableConfig: {
          ref: "tableConfig",
          data: [],
          columnConfig: [],
          operation:true,
          customTop: true,
          uiConfig: {
            height: "auto", //"", //高度
            selection: true, //是否多选
            pagination: {
              //是否分页，分页是否自定义
              layout: "total,->, prev, pager, next, jumper",
              pageSizes: [10, 20, 50],
              handler(pageSize, currentPage, table) {
                _this.handleCurrentChange(currentPage);
              }
            }
          },
        }
      };
    },
    methods: {
      submit() {},
      resetChange() {},
      getCleaningList() {
        let res = CommonFun.messageDevice;
        let labelList = [
          { label: "发布编号", prop: "id" },
          { label: "发布名称", prop: "name2" },
          { label: "信息类型", prop: "type" },
          { label: "发布日期", prop: "date1" },
          { label: "备注", prop: "remark" }
        ];
        this.tableConfig.columnConfig = labelList;
        this.tableConfig.data = res;
      },
      batchDels() {},
      addTenant() {},
      onClickAddBtn(){
        this.$router.push('/addMessage')
      }
    },
    mounted() {
      this.getCleaningList();
    }
  };
</script>

<style lang="less">
  .message-publish-manage {
    .condition-box{
      padding:20px 20px 0 20px;
      margin-bottom: 20px;
      /*display: flex;*/
      /*!*flex-direction: row;*!*/
      /*flex-wrap: wrap;*/
      .item-group{
       margin-bottom:20px;
      }
    }
  }
</style>
