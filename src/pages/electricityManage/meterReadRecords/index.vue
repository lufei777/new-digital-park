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
      <z-table
        :ref="tableOptions.ref"
        :options="tableOptions"
        :selectable="row => isCurrentUser(row.operator) && hasRejected(row.status)"
      >
        <template slot="custom-top" slot-scope="{size,selectedData}">
          <el-button :size="size" type="primary" @click="addedProperty">新增</el-button>
          <el-button
            :disabled="!selectedData.length"
            :size="size"
            type="primary"
            @click="bulkDel(selectedData)"
          >批量删除</el-button>
        </template>
        <template slot="operation" slot-scope="{size,row}">
          <!-- 发起人不能编辑，删除 -->
          <template v-if="isCurrentUser(row.operator)">
            <!-- 驳回后，发起人才可删除编辑 -->
            <template v-if="hasRejected(row.status)">
              <el-button :size="size" type="text" @click="propertyEdit({row})">编辑</el-button>
              <el-button :size="size" type="text" @click="propertyDel({row})">删除</el-button>
            </template>
          </template>
          <!-- 审核人 -->
          <template v-else>
            <!-- 待审核才有审核 -->
            <template v-if="hasCheck(row.status)">
              <el-button :size="size" type="text" @click="propertyCheck({row})">审核</el-button>
            </template>
          </template>
          <el-button :size="size" type="text" @click="propertyDetail({row})">详情</el-button>
        </template>
      </z-table>
    </div>

    <el-dialog
      v-dialogDrag
      title="抄表记录审核"
      :visible.sync="checkDialog"
      width="30%"
      @close="checkModel = {}"
    >
      <z-form v-model="checkModel" :options="checkFormOptions" @submit="checkSubmit"></z-form>
    </el-dialog>
  </div>
</template>
<script>
import electricityManageApi from 'api/electricityManage';
import commonFun from "@/utils/commonFun.js";
import { status, useType, checkStatus } from '../config';
import props from '../common/props';

const dateValueFormat = "yyyy-MM-dd";
let tableSendData = {
  pageNum: 1,
  pageSize: 10
};

export default {
  mixins: [props()],
  data() {
    return {
      tenantElecId: '',
      model: {},
      formOptions: {
        ref: "Form",
        menuBtn: false,
        forms: [
          {
            ...status,
            span: 5
          },
          {
            prop: 'monitorNum',
            label: "电表号",
            span: 5
          },
          {
            type: 'date',
            label: "年度月份",
            prop: "endTime",
            valueFormat: dateValueFormat,
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
        operation: {
          width: 200
        },
        serverMode: {
          url: electricityManageApi.selectReadMeterRecord,
          data: {
            pageNum: 1,
            pageSize: 10
          }
        },
        columnConfig: [
          status,
          {
            label: "年度",
            prop: "year"
          },
          {
            label: "月份",
            prop: "month"
          },
          {
            label: "抄表日期",
            prop: "readTime",
            width: 100
          },
          {
            label: "电表号",
            prop: "monitorNum",
            width: 150
          },
          {
            label: "电表名称",
            prop: "monitorName",
            width: 150
          },
          {
            ...useType,
            cell: true,
          },
          {
            label: "倍率",
            prop: "mulPower"
          },
          {
            label: "上次表示数",
            prop: "lastIndication"
          },
          {
            label: "本次表示数",
            prop: "indication"
          },
          {
            label: "抄表见量",
            prop: "diffNum"
          },
          {
            label: "月用见量",
            prop: "useElecMonth"
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
      },
      checkDialog: false,
      checkModel: {},
      checkFormOptions: {
        itemSpan: 24,
        forms: [
          {
            ...checkStatus,
            type: 'radio',
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
    addedProperty({ row }) {
      this.$router.push({
        name: "meterreadrecordsadd",
        query: {
          flag: 'add'
        }
      });
    },
    deleteRow(ids) {
      electricityManageApi.deleteReadMeterRecord(ids).then(res => {
        this.refreshTable();
      });
    },
    bulkDel(selectedData) {
      if (!selectedData.length) {
        commonFun.confirmTip(false, "请选择数据");
        return;
      }
      let ids = selectedData.map(item => item.id);
      commonFun.confirmTip(
        true,
        "",
        "确定要删除吗?",
        () => {
          this.deleteRow(ids);
        },
        () => { }
      );
    },
    propertyDel({ row }) {
      commonFun.confirmTip(
        true,
        "",
        "确定要删除吗?",
        () => {
          this.deleteRow([row.id]);
        },
        () => { }
      );
    },
    propertyEdit({ row }) {
      this.$router.push({
        name: "meterreadrecordsadd",
        query: { id: row.id, flag: "edit", row: JSON.stringify(row) }
      });
    },
    propertyDetail({ row }) {
      this.$router.push({
        name: "meterreadrecordsadd",
        query: { id: row.id, flag: "detail", row: JSON.stringify(row) }
      });
    },
    propertyCheck({ row }) {
      this.checkModel.recordId = row.recordId;
      this.checkDialog = true;
    },
    checkSubmit(model, done) {
      electricityManageApi.readMeterToExamine(model).then(res => {
        this.checkDialog = false;
        this.refreshTable();
      }).finally(() => {
        done();
      })
    },
    refreshTable() {
      return this.Table.refreshTable();
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
