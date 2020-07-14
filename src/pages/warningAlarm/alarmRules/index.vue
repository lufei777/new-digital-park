<template>
  <!-- 报警规则处理 -->
  <div class="message-device-manage panel-container">
    <!-- 上半部分 -->
    <div class="condition-box radius-shadow">
      <z-form
        :ref="formData.ref"
        :options="formData"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
            <el-button
              :disabled="obj.disabled"
              type="primary"
              @click="onClickSearchBtn(obj)"
            >查询</el-button>
            <el-button
              :disabled="obj.disabled"
              @click="clearForm(obj)"
            >重置</el-button>
          </div>
        </template>
      </z-form>
      <!-- 批量编辑弹出来的额对话框 -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        :show-close='false'
      >
        <!-- 批量编辑  === 关闭按钮 -->
        <div class="edit">
          <strong style="font-size:16px;">批量编辑</strong>
          <el-button @click="closeDiolog">
            关闭
          </el-button>
        </div>
        <!-- 弹出框中的表单 -->
        <com-eldiolog @off='closeDialog' :relationIds = 'relationIds'></com-eldiolog>
      </el-dialog>
    </div>

    <!-- 下半部分 -->
    <div class="warehouse-manage-table panel">
      <div class="operator-btn-box flex-row-reverse">
      </div>
      <!-- 表格部分 -->
      <z-table
        :load="tableLoad"
        :ref="tableData.ref"
        :options="tableData"
      >
        <template
          slot="operation"
          slot-scope="obj"
        >
          <el-button
            type="text"
            @click="propertyDetail(obj)"
          >查看</el-button>
          <el-button
            type="text"
            @click="propertyEdit(obj)"
          >编辑</el-button>
          <el-button
            type="text"
            @click="propertyDel(obj)"
          >删除</el-button>
        </template>

        <template
          slot="custom-top"
          slot-scope="{size,disabled,selectedData}"
        >
          <el-button :disabled='!selectedData.length'>导出</el-button>
          <el-button
            @click="goAddBasic"
            type="primary"
          >新建</el-button>
          <el-button
            :disabled='!selectedData.length'
            @click="orderEdit(selectedData)"
          >批量编辑</el-button>
          <el-button
            @click="batchDels(selectedData)"
            :disabled='!selectedData.length'
          >批量删除</el-button>
          <el-button>导入</el-button>
        </template>
      </z-table>
    </div>
    
  </div>
</template>

<script>
// 导入接口
import warningAlarm from "@/service/api/warningAlarm";
// 导入配置的字典====根据需要导入自己的配置
import CommonFun from "@/utils/commonFun";
import ComDialog from './com-eldialog'
//导入字典中的定义的字段
import { WarningAlerm } from "utils/dictionary";
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 报警状态
const alarmStatus = WarningAlerm.alarmStatus;
// 子系统
const subSystem = WarningAlerm.subSystem;
// 设备类型
const deviceType = WarningAlerm.deviceType;
// 报警类型
const alarmType = WarningAlerm.alarmType;
// 录入类型
const inputType = WarningAlerm.inputType;
// 通知方式
const notificationWay = WarningAlerm.notificationWay;
export default {
  name: "areaManage",
  components:{
    'com-eldiolog':ComDialog
  },
  data() {
    return {
      // 拼接的relationIds
      relationIds: "",
      // 保存的查询条件
      condition: {},
      // 开启表单的懒加载
      tableLoad: false,
      // 对话框的显示和隐藏
      dialogFormVisible: false,
      model: {},
      // 配置两个表单一个是基本的另一个是弹出框中的表单

      // 页面显示的表单，

      formData: {
        ref: "formData",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        menuBtn: false,
        // labelPosition: "left",
        forms: [
          // 报警级别
          {
            type: "select",
            label: "报警级别",
            prop: "eventRank",
            span: 5,
            // dicUrl: warningAlarm.geteventRanks,
            // dicMethod: "get",
            props: {
              label: "rankName",
              value: "rankId"
            }
          },
          //   子系统
          {
            type: "select",
            label: "子系统",
            span: 5,
            offset: 1,
            disabled: true,
            tip: "暂时未提供",
            tipPlacement: "right",
            prop: "system",
            dicData: subSystem
          },
          //   设备类型
          {
            type: "cascader",
            label: "设备类型",
            span: 5,
            offset: 1,
            // prop: "catalogId",
            prop: "parentCatalogId",
            dicUrl: warningAlarm.getItemsTree,
            dicQuery: { catalogId: "2002" },
            props: {
              label: "text",
              value: "id",
              children: "nodes"
            }
            // dicData: deviceType
          },
          //   报警名称=====>设备名称
          {
            type: "input",
            label: "设备名称",
            prop: "parentCaption",
            // disabled:true,
            placeholder: "请输入关键字",
            clearable: true,
            span: 5,
            offset: 1
          },
          //  录入类型
          {
            type: "select",
            label: "录入类型",
            prop: "removed",
            span: 5,
            tip: "暂时未提供",
            tipPlacement: "right",
            disabled: true,
            minRows: 0,
            dicData: inputType
          },
          {
            prop: "btn",
            span: 6,
            pull: 2,
            offset: 13,
            formslot: true
            // width: "34px"
          }
        ]
      },

      tableData: {
        ref: "Table",
        customTop: true,
        data: [],
        customTopPosition: "right",
        operation: {
          width: 200
        },
        columnConfig: [],
        uiConfig: {
          height: "auto",
          selection: true,
          pagination: {
            layout: "total, ->, prev, pager, next, jumper",
            pageSizes: [5, 10, 20],
            pageSize: 10,
            currentPage: 1,
            handler: (pageSize, currentPage, table) => {
              //翻页操作
              // this.props = this.condition;
              // console.log(this.props)
              // if (Object.values(this.props)) {
              //   this.getTableData(
              //     { ...props },
              //     { rows: pageSize, page: currentPage }
              //   );
              // }
              this.getTableData(
                { ...this.condition },
                { rows: pageSize, page: currentPage }
              );
            }
          }
        }
      }
    };
  },

  methods: {
    closeDialog(){
      this.dialogFormVisible= false,
       this.getTableData({}, { page: 1, rows: 10 });
    },
    // 表格中的删除按钮
    propertyDel(obj) {
      console.log(obj);
      // 删除接口
      let res = obj.row;
      let pararms = [
        {
          id: res.warnId,
          warnCond: res.singleWarnCond,
          // rankId: res.eventRank.rankId,
          assetId: res.id
        }
      ];
      warningAlarm.deleteEventRank(pararms).then(res => {
        // 删除成功提示
        // debugger
        // console.log(res)
        if (res === "删除成功") {
          this.$message({
            message: "删除成功！",
            type: "success"
          });
          // 刷新页面
          // this.$refs[this.tableData.ref].refreshTable()
          // 重新请求数据
          this.getTableData({}, { page: 1, rows: 10 });
        }
      });
      // .finally(res => {});
    },
    // 表单中的查询按钮
    onClickSearchBtn(obj) {
      this.Form.getFormModel(res => {
        // parentCatalogId 返回的是有个数组，查询条件是取级联的最后一个值
        // console.log(res);
        if (res.parentCatalogId && res.parentCatalogId.length >= 2) {
          res.parentCatalogId =
            res.parentCatalogId[res.parentCatalogId.length - 1];
        }
        // 报警级别的传参形式 是 ==》 eventRank :{ rankId:res.eventRank } 需要进行处理
        res.eventRank = { rankId: res.eventRank };
        // 把查询条件保存下来，翻页的时候要携带
        this.condition = { ...res };
        // 根据查询条件重新新调取接口获得表格数据
        this.getTableData({ ...res }, { rows: 10, page: 1 });
      });
    },
    // 查看
    propertyDetail(obj) {
      // console.log(obj)
      let seeEdit = {
        path: "/warningalarm/seeedit",
        query: { flag: true, ...obj.row }
      };
      this.$router.push(seeEdit);
    },
    // 编辑
    propertyEdit(obj) {
      // console.log(obj)
      let seeEdit = {
        path: "/warningalarm/seeedit",
        query: { flag: false, ...obj.row }
      };
      this.$router.push(seeEdit);
    },
    // '新建'操作
    goAddBasic() {
      this.$router.push("/warningalarm/addBasicSettings");
    },
    // 批量编辑
    orderEdit(obj) {
      console.log(obj);
      let str = "";
      // let relationIdArr = []
      // 对选中的数据中的warnId 进行拼接
      obj.forEach(item => {
        str += item.warnId + ",";
        // relationIdArr.push(item.relationId)
      });
      this.relationIds = str;
      // console.log(arr)
      this.dialogFormVisible = true;
    },
    // 弹出框中的关闭按钮
    closeDiolog() {
      this.dialogFormVisible = false;
    },
    submit() {},
    resetChange() {},
    clearForm1() {
      // 获取顶部form表单
      var zForm = this.$refs[this.setForms[1].formData.ref];
      // 单击重置按钮时候，重置表单 方法在已经封装好的文档中  名称：resetForm
      zForm.resetForm();
      // console.log(zForm)
    },
    clearForm(obj) {
      // 获取顶部form表单
      var zForm = this.$refs[this.setForms[0].formData.ref];
      // 单击重置按钮时候，重置表单 方法在已经封装好的文档中  名称：resetForm
      zForm.resetForm();
      // console.log(zForm)
    },
    getCleaningList() {
      // 来自CommonFun的模拟数据源 let res = CommonFun.messageDevice;
      // let res = CommonFun.warningAlram;
      let labelList = [
        { label: "子系统", prop: "system" },
        { label: "设备类型", prop: "parentCatalogName" },
        { label: "设备名称", prop: "parentCaption" },
        { label: "点位类型", prop: "catalogName" },
        { label: "报警规则", prop: "singleWarnCond" },
        {
          label: "报警级别",
          prop: "eventRank.rankName"
        },
        {
          label: "通知方式",
          prop: "notify"
        },
        {
          label: "录入类型",
          prop: "removed",
          type: "select",
          dicData: [
            { label: "手动", value: 1 },
            { label: "自动", value: 0 }
          ]
        }
      ];
      this.tableData.columnConfig = labelList;
      // this.tableData.data = res;
    },
    // 表格中的批量删除
    batchDels(obj) {
      // console.log(obj);
      // 定义一个数组用来存放删除的参数
      let params = [],
        arr = obj;
      // 根据要求重新对数据进行编辑获取参数形式的数据
      arr.forEach(item => {
        params.push({
          id: item.warnId,
          warnCond: item.singleWarnCond,
          // rankId: res.eventRank.rankId,
          assetId: item.id
        });
      });
      console.log(params),
        warningAlarm.deleteEventRank(params).then(res => {
          if (res === "删除成功") {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            // 重新请求数据
            this.getTableData({}, { page: 1, rows: 10 });
          }
        });
    },
    addTenant() {},
    // 表格中的数据接口 Params
    getTableData(params = {}, query = { page: 1, rows: 10 }) {
      this.tableLoad = true;
      warningAlarm
        .queryAlarmRules(params, query)
        .then(res => {
          // console.log(res)
          this.$refs[this.tableData.ref].setData(res.rows);
          this.$refs[this.tableData.ref].setTotal(res.total);
          // debugger
        })
        .finally(() => {
          this.tableLoad = false;
        });
    }
  },
  created() {
    // 报警级别;
    warningAlarm.geteventRanks().then(res => {
      this.Form.setColumnByProp("eventRank", {
        dicData: res
      });
    });

    this.getTableData();
  },
  mounted() {
    this.getCleaningList();
  },

  computed: {
    Table() {
      return this.$refs[this.tableData.ref];
    },
    Form() {
      return this.$refs[this.setForms[0].formData.ref];
    }
  }
};
</script>

<style lang="less" scope="scoped">
.message-device-manage {
  .condition-box {
    padding-top: 20px;
    margin-bottom: 20px;
    .edit {
      display: flex;
      justify-content: space-between;
      padding: 15px 40px;
    }
  }
}
</style>
