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
        <!-- <template slot="custom-top" slot-scope="{size,selectedData}">
          <el-button :size="size" type="primary" @click="addedProperty">新增</el-button>
          <el-button
            :disabled="!selectedData.length"
            :size="size"
            type="primary"
            @click="bulkDel(selectedData)"
          >批量删除</el-button>
          <el-button :size="size" type="primary">修改电表用途</el-button>
        </template>-->
        <template slot="operation" slot-scope="{row}">
          <el-button type="text" @click="propertyDetail({row})">详情</el-button>
          <!-- @click="checkDetailDialog = true,checkDetailModel.id = row.id" -->
          <template v-if="hasCheck(row.detailsStatus)">
            <el-button type="text" @click="checkDetail({...row,detailsStatus:1})">生成账单</el-button>
          </template>
        </template>
      </z-table>
    </div>
    <el-dialog
      v-dialogDrag
      title="收费明细审核"
      :visible.sync="checkDetailDialog"
      width="30%"
      @close="checkDetailModel = {}"
    >
      <z-form v-model="checkDetailModel" :options="checkDetailForm" @submit="checkDetail"></z-form>
    </el-dialog>
  </div>
</template>
<script>
import { ElectricityManageDic } from "@/utils/dictionary";
import electricityManageApi from 'api/electricityManage';
import commonFun from "@/utils/commonFun.js";
import props from '../common/props';

import { status, checkStatus } from '../config';
const dateValueFormat = "yyyy-MM-dd";
let tableSendData = {
  pageNum: 1,
  pageSize: 10
};

export default {
  mixins: [props()],
  data() {
    return {
      checkDetailDialog: false,
      tenantElecId: '',
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
            prop: 'contractNumber',
            label: "合同编号",
            span: 5
          },
          {
            prop: 'tenantNumber',
            label: "租户编号",
            span: 5
          },
          {
            prop: "btn",
            span: 4,
            noModel: true,
            formslot: true,
            width: 20
          }
        ]
      },
      tableOptions: {
        ref: "Table",
        customTop: true,
        operation: {
          width: 150
        },
        serverMode: {
          url: electricityManageApi.getChargeDetailsList,
          data: {
            pageNum: 1,
            pageSize: 10
          }
        },
        columnConfig: [
          {
            ...status,
            prop: 'detailsStatus',
            label: '审核状态'
          },
          {
            label: "年度",
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
            label: "合同编号",
            prop: "contractNumber",
            width: 200
          },
          /* {
            label: "合同状态",
            prop: "contractStatus"
          }, */
          {
            label: "合同终止日期",
            prop: "expireTime",
            width: 100
          },
          {
            label: "办公月电量合计",
            prop: "useElecMonth"
          },
          {
            label: "办公月电费合计",
            prop: "elecFees"
          },
          {
            label: "月工日",
            prop: "diffNum"
          },
          {
            label: "分摊电费合计(元)",
            prop: "useElecMonth2"
          },
          {
            label: "电费合计(元)",
            prop: "remarks"
          }
        ],
        uiConfig: {
          height: "auto",
          selection: true,
          showIndex: true
        }
      },
      checkDetailModel: {},
      checkDetailForm: {
        itemSpan: 24,
        forms: [
          {
            ...checkStatus,
            type: 'radio',
            prop: 'detailsStatus',
            rules: {
              required: true
            },
            valueDefault: 2
          },
          {
            type: 'textarea',
            prop: 'examineIdea',
            label: '审核意见',
            rules: {
              required: true
            }
          }
        ]
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
    propertyDetail({ row }) {
      this.$router.push({
        name: "meterreadrecordsadd",
        query: { id: row.id, flag: "detail", row: JSON.stringify(row) }
      });
    },
    checkDetail(model, done) {
      electricityManageApi.useElecExamine(model).then(res => {
        this.checkDetailDialog = false;
        this.refreshTable();
      }).finally(() => {
        done && done();
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
