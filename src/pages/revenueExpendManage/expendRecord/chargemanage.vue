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
      <z-table :ref="tableOptions.ref" :options="tableOptions"></z-table>
    </div>
  </div>
</template>
<script>
import revenueExpendManageApi from 'api/revenueExpendManage';
import { code } from '../config';

const {
  getIncomeRecordList, /** 表格列表 */
  getNoticeType/** 收费类型编码 */
} = revenueExpendManageApi;
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
            ...code,
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
          url: getIncomeRecordList,
          data: tableSendData
        },
        columnConfig: [
          {
            label: 'id',
            prop: 'id',
            hide: true
          },
          {
            ...code
          },
          {
            label: "开始时间",
            prop: "startTime"
          },
          {
            label: "结束时间",
            prop: "endTime"
          },
          {
            label: "电费",
            prop: "codeName"
          },
          {
            label: "合同编号",
            prop: "contractNumber",
            width: 200
          },
          {
            label: "冲抵金额",
            prop: "offset"
          },
          {
            label: "核定金额(元)",
            prop: "billAmount"
          },
          {
            label: "备注",
            prop: "remarks"
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
  mounted() {
    // 设置收费类型
    getNoticeType().then(res => {
      this.Form.setColumnByProp(code.prop, {
        dicData: res
      })
      this.Table.setColumnByProp(code.prop, {
        dicData: res
      })
    })
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