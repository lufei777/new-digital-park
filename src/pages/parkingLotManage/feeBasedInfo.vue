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
            label: "收费时间",
            prop: "houseName",
            clearable: true,
            span: 4
          },
          {
            type: "select",
            label: "收费类型",
            prop: "housePrice",
            clearable: true,
            dicData: [
              {
                label: "类型1",
                value: 1
              },
              {
                label: "类型2",
                value: 2
              }
            ],
            span: 4
          },
          {
            type: "input",
            label: "收费员",
            prop: "houseStatus",
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
          url: "./static/mock/feeBasedInfo.json",
          data: tableSendData
        },
        columnConfig: [
          {
            prop: "id",
            label: "id信息",
            hide: true
          },
          {
            prop: "carNum",
            label: "车辆号码",
            fixed: "left"
          },
          {
            prop: "cardNum",
            label: "卡号",
            fixed: "left"
          },
          {
            prop: "carInTime",
            label: "入场时间"
          },
          {
            prop: "carOutTime",
            label: "出场时间"
          },
          {
            prop: "timeLength",
            label: "停车时长"
          },
          {
            prop: "amountReceived",
            label: "实收金额(元)",
            fixed: "left"
          },
          {
            prop: "feeRule",
            label: "收费规则"
          },
          {
            prop: "feeType",
            label: "收费类型"
          },
          {
            prop: "discount",
            label: "优惠金额(元)"
          },
          {
            prop: "feeTime",
            label: "收费时间",
            width: 150
          },
          {
            prop: "remark",
            label: "备注",
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
          flag: "feeBasedInfo",
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


