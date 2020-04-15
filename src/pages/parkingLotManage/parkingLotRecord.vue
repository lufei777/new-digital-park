<template>
  <div class="panel-container">
    <div id="houseproperty-form" class="panel">
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
        <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="propertyDetail(obj)">详情</el-button>
          <el-button type="text" @click="propertyEdit(obj)">编辑</el-button>
          <el-button type="text" @click="propertyDel(obj)">删除</el-button>
          <el-button type="text" @click="propertyLocation(obj)">定位</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>
<script>
import parkingLotManageApi from "@/service/api/parkingLotManage";
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
            label: "停车场名称",
            prop: "parkName",
            placeholder: "请输入",
            width: 100,
            clearable: true,
            span: 4
          },
          {
            type: "number",
            label: "车位总数",
            prop: "totalLot",
            clearable: true,
            span: 4,
            minRows: 0
          },
          {
            type: "select",
            label: "可停车位数",
            prop: "idleLot",
            clearable: true,
            dicData: [
              { label: "10车位以上", value: 1 },
              { label: "30车位以上", value: 2 },
              { label: "50车位以上", value: 3 },
              { label: "100车位以上", value: 4 },
              { label: "1000车位以上", value: 5 }
            ],
            span: 4,
            width: 100
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
        serverMode: {
          url: parkingLotManageApi.getParkingLot,
          data: tableSendData
        },
        columnConfig: [
          {
            prop: "parkName",
            label: "停车场名称",
            fixed: "left"
          },
          {
            prop: "idleLot",
            label: "可停车位数",
            fixed: "left"
          },
          {
            prop: "usedLot",
            label: "已停车位",
            fixed: "left"
          },
          {
            prop: "totalLot",
            label: "车位总数",
            fixed: "left"
          },
          {
            prop: "entranceNum",
            label: "入口个数",
            fixed: "left"
          },
          {
            prop: "exitNum",
            label: "出口个数",
            fixed: "left"
          },
          {
            prop: "esidualScreenNum",
            label: "余位屏数"
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