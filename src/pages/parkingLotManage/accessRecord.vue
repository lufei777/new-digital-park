<template>
  <div class="panel-container">
    <div class="panel">
      <z-form :ref="formOptions.ref" :options="formOptions" v-model="model" @submit="submit">
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="search(obj)">搜索</el-button>
            <el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
      </z-form>
    </div>

    <div class="table panel">
      <z-table :ref="tableOptions.ref" :options="tableOptions">
        <template slot="operation" slot-scope="{row}">
          <el-button type="text" @click="propertyDetail(row)">详情</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>
<script>
import leaseManageApi from "@/service/api/leaseManage";
import commonFun from "@/utils/commonFun.js";

let tableSendData = {
  pageNum: 1,
  pageSize: 10
};
export default {
  data() {
    return {
      model: {},
      formOptions: {
        ref: "Form",
        size: "small",
        menuPosition: "right",
        menuBtn: false,
        forms: [
          {
            type: "input",
            label: "车牌号码",
            prop: "houseNumber",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            type: "datetime",
            label: "入场时间",
            prop: "houseName",
            clearable: true,
            span: 4
          },
          {
            type: "datetime",
            label: "出场时间",
            prop: "housePrice",
            clearable: true,
            span: 4
          },
          {
            type: "input",
            label: "停车场名称",
            prop: "houseStatus",
            placeholder: "请输入",
            clearable: true,
            width: 100,
            span: 4
          },
          {
            prop: "btn",
            span: 4,
            formslot: true,
            width: 55
          }
        ]
      },
      tableOptions: {
        ref: "Table",
        operation: true,
        serverMode: {
          url: "./static/mock/accessRecord.json",
          data: tableSendData
        },
        columnConfig: [
          { id: "id", prop: "id信息", hide: true },
          {
            prop: "carNum",
            label: "车辆号码",
            fixed: "left"
          },
          {
            prop: "parkingState",
            label: "停车状态",
            fixed: "left"
          },
          {
            prop: "cardNum",
            label: "卡号",
            fixed: "left"
          },
          {
            prop: "parkName",
            label: "停车场名称",
            fixed: "left"
          },
          {
            prop: "userType",
            label: "用户类别",
            fixed: "left"
          },
          {
            prop: "charge",
            label: "停车场收费金额(元)",
            fixed: "left",
            width: 150
          },
          {
            prop: "inMode",
            label: "入场方式"
          },
          {
            prop: "outMode",
            label: "出场方式"
          },
          {
            prop: "inTime",
            label: "入场时间"
          },
          {
            prop: "outTime",
            label: "出场时间"
          },
          {
            prop: "inChannelName",
            label: "入场道闸通道名称",
            width: 150
          }
        ],
        uiConfig: {
          height: "auto",
          customTopPosition: "right",
          selection: true,
          showIndex: true
        }
      }
    };
  },
  methods: {
    search(...args) {
      this.Form.submit();
    },
    submit(model, hide) {
      hide();
      this.tableOptions.serverMode.data = Object.assign(
        _.cloneDeep(tableSendData),
        model
      );
      this.refreshTable();
    },
    clearForm() {
      this.Form.resetForm();
    },
    refreshTable() {
      this.Table.refreshTable();
    },
    propertyDetail(row) {
      this.$router.push({
        name: "parkingdetail",
        query: {
          flag: "accessRecord",
          model: JSON.stringify(row)
        }
      });
    }
  },
  computed: {
    Form() {
      return this.$refs[this.formOptions.ref];
    },
    Table() {
      return this.$refs[this.tableOptions.ref];
    }
  }
};
</script>


