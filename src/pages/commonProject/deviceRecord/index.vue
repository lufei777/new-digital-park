<template>
  <div class="device-record">
    <div class="common-tree-box monitor-tree radius-shadow">
      <el-select v-model="curEnergy" placeholder="请选择" @change="onEnergyChange">
        <el-option label="电" value="1002"></el-option>
        <el-option label="水" value="4000"></el-option>
      </el-select>
      <Tree :tree-list="meterList" :tree-config="meterTreeConfig"></Tree>
    </div>

    <div class="right-content" v-if="!showEdit && !showAdd && !showImport">
      <div class="search-box radius-shadow flex-align">
        <div class="item-group flex-align">
          <label>表名称：</label>
          <el-input v-model="meterName" class="meter-name"></el-input>
        </div>
        <div class="item-group">
          <label>表计：</label>
          <el-select v-model="meterTypes">
            <el-option label="全部" value="0,1"></el-option>
            <el-option label="实表" value="0"></el-option>
            <el-option label="虚表" value="1"></el-option>
          </el-select>
        </div>
        <el-button
          type="primary"
          icon="el-icon-search"
          class="search-btn"
          @click="onClickSearchBtn"
        >搜索</el-button>
      </div>
      <div class="table-box radius-shadow">
        <div class="operator-box">
          <z-upload
            v-if="checkPermission(['import'])"
            onlyButton
            v-model="fileList"
            buttonText="导入"
            :showFileList="false"
            :action="uploadAction"
            :accept="['xls', 'xlsx', 'csv']"
            :uploadAfter="uploadSuccess"
          ></z-upload>
          <!-- <el-button type="primary" class="" @click="onClickImportBtn">导入</el-button> -->
          <el-button type="primary"  @click="onClickMultipleDelBtn" v-if="checkPermission(['remove'])">删除</el-button>
          <el-button type="primary"  @click="onClickAddBtn" v-if="checkPermission(['add'])">添加</el-button>
        </div>
        <z-table :ref="tableConfig.ref" :options="tableConfig"></z-table>
      </div>

      <div class="item-row-detail-table radius-shadow">
        <div class="item-row-detail-tip">列表详情</div>
        <table>
          <tbody>
            <tr>
              <th>编号</th>
              <td>{{curTableData.id}}</td>
            </tr>
            <tr>
              <th>工程名称</th>
              <td>{{curTableData.name}}</td>
            </tr>
            <tr>
              <th>表名称</th>
              <td>{{curTableData.caption}}</td>
            </tr>
            <tr>
              <th>表类型</th>
              <td>{{curTableData.meterType==0?'实表':'虚表'}}</td>
            </tr>
            <tr>
              <th>分项类别</th>
              <td>{{curTableData.itemizeCaption}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CommonApi from "../../../service/api/common";
import EditMeter from "./editMeter";
import AddMeter from "./addMeter";
import ImportMeter from "./importMeter";
import Tree from "../../../components/tree/index";
import { checkPermission } from '@/utils/permission'

export default {
  name: "DeviceRecord",
  components: {
    EditMeter,
    AddMeter,
    ImportMeter,
    Tree
  },
  data() {
    let _this = this;
    return {
      curEnergy: "1002",
      meterName: "",
      meterTypes: "0,1",
      parentMeter: "",
      curPage: 1,
      tableConfig: {
        ref: "tableRef",
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto",
          selection: true,
          pagination: {
            layout: "total,->, prev, pager, next, jumper",
            handler(pageSize, val) {
              _this.handleCurrentChange(val);
            }
          }
        },
        btnConfig: {
          prop: "operation",
          label: "操作",
          fixed: "right",
          width: 150,
          btns: [
            {
              type: "basic",
              label: "编辑",
              handler: function (data) {
                _this.editRow(data.row);
              }
            },
            {
              type: "basic",
              label: "删除",
              handler: function (data) {
                _this.deleteRow(data.row);
              }
            }
          ]
        },
        tableMethods: {
          rowClick: _this.rowClick
        }
      },
      curTableData: {},
      showEdit: false,
      deleteId: "",
      showAdd: false,
      isEdit: false,
      showImport: false,
      meterList: [],
      meterTreeConfig: {
        nodeKey: "id",
        onClickTreeNodeCallBack: this.onClickTreeNodeCallBack,
        defaultExpandedkeys: []
      },
      fileList: [],
      uploadAction: "/vibe-web/energy/imEnergyMeter"
    };
  },
  computed: {
    ...mapState({
      menuIsCollapse: state => state.digitalPark.menuIsCollapse
    })
  },
  methods: {
    checkPermission(val){
      return checkPermission(val)
    },
    async getMeterTable() {
      let params = {
        catalogId: this.curEnergy,
        parentMeter: this.parentMeter,
        meterTypes: this.meterTypes,
        caption: this.meterName,
        page: this.curPage,
        size: 10
      };
      let res = await CommonApi.getMeterTable(params);
      this.tableConfig.columnConfig = [
        { label: "编号", prop: "id" },
        { label: "工程名称", prop: "name" },
        { label: "表名称", prop: "caption" },
        {
          label: "表类型",
          prop: "meterType",
          formatter: function (row, value) {
            return value ? "虚表" : "实表";
          }
        },
        { label: "分项类别", prop: "itemizeCaption" }
      ];
      if (res && res.rows) {
        this.tableConfig.data = res.rows;
        this.tableConfig.uiConfig.pagination.total = res.total;
        this.curTableData = res.rows[0] || {};
      }
    },
    onClickTreeNodeCallBack(val) {
      this.parentMeter = val.id;
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.getMeterTable();
    },
    onClickSearchBtn() {
      this.curPage = 1;
      this.$refs["tableRef"].setCurrentPage(1);
      this.getMeterTable();
    },
    rowClick(row) {
      this.curTableData = row;
    },
    editRow(data) {
      this.$router.push(`/editDevice?meterId=${data.id}`);
    },
    deleteRow(data) {
      console.log("data", data);
      this.deleteId = data.id;
      this.deleteTip();
    },
    async sureDelete() {
      await CommonApi.deleteMeter({
        ids: this.deleteId
      });
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.getMeterTable();
    },
    handleSelectionChange(val) {
      let tmp = val.map(item => item.id);
      this.deleteId = tmp;
    },
    deleteTip() {
      if (!this.deleteId) {
        this.$message({
          type: "warning",
          message: "请先选择节点！",
          duration: 1000
        });
        return;
      }
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.sureDelete();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onClickAddBtn() {
      this.$router.push("/addDevice");
    },
    onClickImportBtn() {
      this.$router.push("/importDevice");
    },
    onClickMultipleDelBtn() {
      let res = this.$refs[this.tableConfig.ref].getSelectedData();
      this.deleteId = res.map(item => item.id).join(",");
      this.deleteTip();
      console.log(res);
    },
    async getMeterTree() {
      let res = await CommonApi.getMeterTree({
        parentMeter: 0,
        catalogId: this.curEnergy
      });
      this.meterList = res;
      this.meterTreeConfig.defaultExpandedkeys = [res[0].id];
    },
    onEnergyChange(val) {
      this.curEnergy = val;
      this.getMeterTree();
      this.fixTree();
      $(window).resize(() => {
        this.fixTree();
      });
    },
    fixTree() {
      $(".common-tree-box").css({
        height: $(document).height() - 110 + "px"
      });
    },
    // 导入成功
    uploadSuccess(res, show, hide) {
      show();
      hide();
      this.getMeterTable();
    }
  },
  mounted() {
    this.getMeterTree();
    this.getMeterTable();
    this.fixTree();
    $(window).resize(() => {
      this.fixTree();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import "../less/dataDetailRow.less";
.device-record {
  /*margin-top: 50px;*/
  .search-box {
    padding: 20px 0 20px 20px;
    background: @white;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .item-group {
    label {
      flex-shrink: 0;
      text-align: right;
      margin-right: 5px;
    }
    .el-select {
      width: 100px;
      margin: 0;
    }
  }
  .search-btn {
    margin-left: 20px;
  }
  .table-box {
    padding: 20px;
    clear: both;
    background: @white;
    /*overflow: hidden;*/
  }
  .operator-box {
    background: @white;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row-reverse;
    .el-button {
      margin-left: 20px;
    }
  }
  .item-row-detail-table {
    margin-top: 20px;
    tr:nth-child(5) td {
      border-bottom: 1px solid #ebeef5;
    }
  }
  .item-row-detail-tip {
    color: @mainBgColor;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .monitor-tree {
    .el-select {
      width: 120px;
      margin: 0 0 20px 65px;
    }
  }
}
</style>
