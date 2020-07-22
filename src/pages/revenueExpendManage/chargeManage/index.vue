<template>
  <div v-if="reload" class="panel-container">
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
        <template #operation="{size,row}">
          <el-button :size="size" type="text" @click="getDetail(row)">详情</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>
<script>
import revenueExpendManageApi from 'api/revenueExpendManage';
import { code } from '../config';

const {
  getIncomeRecordList: getListApi, /** 表格列表 */
  getNoticeType,/** 收费类型编码 */
  getIncomeDetailsElecId: getDetailsApi,/**收费详情 */
} = revenueExpendManageApi;

let tableSendData = {
  pageNum: 1,
  pageSize: 10
};

export default {
  data() {
    return {
      reload: true,
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
        operation: true,
        serverMode: {
          url: getListApi,
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
            prop: "startTime",
            width: 100
          },
          {
            label: "结束时间",
            prop: "endTime",
            width: 100
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
  created() {
    this.tableOptions.serverMode.data = Object.assign({}, tableSendData, { code: this.code });
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
    propertyDetail({ row }) {
      this.$router.push({
        name: "meterreadrecordsadd",
        query: { id: row.id, flag: "detail", row: JSON.stringify(row) }
      });
    },
    getDetail({ id, code, startTime }) {
      getDetailsApi({ id, code, startTime }).then(res => {
        console.log("getDetail -> res", res)
      })
    },
    refreshTable() {
      this.Table.refreshTable();
    },
    reloadPage() {
      this.reload = false;
      this.$nextTick(() => {
        this.model = {};
        this.reload = true;
      });
    },
  },
  computed: {
    Form() {
      return this.$refs[this.formOptions.ref];
    },
    Table() {
      return this.$refs[this.tableOptions.ref];
    },
    code() {
      return this.$route.query.code || ''
    }
  },
  watch: {
    code(val) {
      this.tableOptions.serverMode.data = Object.assign({}, tableSendData, { code: val });
      this.reloadPage();
    }
  }
};
</script>