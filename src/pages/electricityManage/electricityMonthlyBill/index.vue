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
        <template slot="custom-top" slot-scope="{size}">
          <el-button :size="size" type="primary" @click="print">打印</el-button>
          <el-button :size="size" type="primary" @click="bulkExport">导出</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>
<script>
import { ElectricityManageDic } from "@/utils/dictionary";
import electricityManageApi from 'api/electricityManage';
import commonFun from "@/utils/commonFun.js";

const { detailsStatus } = ElectricityManageDic;
const dateValueFormat = "yyyy-MM-dd";
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
        menuBtn: false,
        forms: [
          {
            type: 'year',
            label: "年份",
            prop: "year",
            valueFormat: 'yyyy',
            span: 5
          },
          {
            type: 'month',
            label: "月份",
            prop: 'month',
            format: 'MM',
            valueFormat: 'MM',
            span: 5
          },
          {
            type: 'select',
            prop: 'number',
            label: "显示月度数",
            dicData: [
              {
                label: '显示3个月',
                value: 1
              },
              {
                label: '显示6个月',
                value: 2
              },
              {
                label: '显示9个月',
                value: 3
              },
              {
                label: '显示12个月',
                value: 4
              }
            ],
            span: 5
          },
          {
            prop: "btn",
            span: 9,
            noModel: true,
            formslot: true,
            width: 20
          }
        ]
      },
      tableOptions: {
        ref: "Table",
        customTop: true,
        serverMode: {
          url: electricityManageApi.getElecDetailsMonthList,
          data: {
            pageNum: 1,
            pageSize: 10
          }
        },
        columnConfig: [
          {
            label: 'id',
            prop: 'id',
            hide: true
          },
          {
            label: "年份",
            prop: "year"
          },
          {
            label: "月份",
            prop: "month"
          },
          {
            label: "租户名称",
            prop: "tenantName"
          },
          {
            label: "租户编号",
            prop: "tenantNumber",
            width: 200
          },
          {
            label: "合同编号",
            prop: "contractNumber",
            width: 200
          },
          {
            label: "核定金额(元)",
            prop: "billAmount"
          },
          {
            label: "创建时间",
            prop: "creatTime"
          }
        ],
        uiConfig: {
          height: "auto",
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
    // 打印
    print() { },
    bulkExport() {
      // 导出
      commonFun.exportMethod(
        {
          url: '/oaApi/readMeter/exportElecDetailsMonthList',
          params: this.model
        }
      )
    },
    propertyDetail({ row }) {
      this.$router.push({
        name: "meterreadrecordsadd",
        query: { id: row.id, flag: "detail", row: JSON.stringify(row) }
      });
    },
    checkDetail(model, done) {
      electricityManageApi.useElecExamine(model).then(res => {
        console.log("checkDetail -> res", res)
        this.checkDetailDialog = false;
      }).finally(() => {
        done()
      })
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