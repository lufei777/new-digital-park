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
        <template slot="custom-top" slot-scope="{size,selectedData}">
          <el-button :size="size" type="primary" @click="addedProperty">新增</el-button>
          <el-button
            :disabled="!selectedData.length"
            :size="size"
            type="primary"
            @click="bulkDel(selectedData)"
          >批量删除</el-button>
        </template>
        <template slot="operation" slot-scope="{row}">
          <el-button type="text" @click="propertyEdit({row})">编辑</el-button>
          <el-button type="text" @click="propertyDel({row})">删除</el-button>
          <el-button type="text" @click="propertyDetail({row})">详情</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>
<script>
import { ElectricityManageDic } from "@/utils/dictionary";
import commonApi from "api/common";
import electricityManageApi from 'api/electricityManage';
import commonFun from "@/utils/commonFun.js";
import { floorsTree } from "utils/formsItem";
import { useType } from '../config';

const dateValueFormat = "yyyy-MM-dd HH:mm:ss";
let tableSendData = {
  pageNum: 1,
  pageSize: 10
};

export default {
  data() {
    return {
      tenantElecId: '',
      model: {},
      formOptions: {
        ref: "Form",
        menuBtn: false,
        forms: [
          {
            ...useType,
            span: 4
          },
          {
            type: 'input',
            label: "电表号",
            prop: "monitorNum",
            span: 5
          },
          {
            type: 'input',
            label: "电表名称",
            prop: "monitorName",
            span: 5
          },
          {
            type: "tree",
            label: "供电区域",
            prop: "spaceId",
            clearable: true,
            ...floorsTree,
            span: 5
          },
          {
            prop: "btn",
            span: 5,
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
          width: 250
        },
        serverMode: {
          url: electricityManageApi.selectMeterElecList,
          data: {
            pageNum: 1,
            pageSize: 10
          }
        },
        columnConfig: [
          {
            prop: "monitorNum",
            label: "电表号",
            width: 150
          },
          {
            prop: "monitorName",
            label: "电表名称",
            width: 150
          },
          useType,
          {
            prop: "floorName",
            label: "安装位置"
          },
          {
            prop: "spaceName",
            label: "供电区域"
          },
          {
            prop: 'mileage',
            label: '里程'
          },
          {
            prop: 'mulPower',
            label: '倍率'
          },
          {
            prop: 'remarks',
            label: '备注'
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
    addedProperty({ row }) {
      this.$router.push({
        name: "tenantelectricitymeteradd",
        query: {
          flag: 'add'
        }
      });
    },
    deleteRow(ids) {
      electricityManageApi.deleteMeterElec(ids).then(res => {
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
        name: "tenantelectricitymeteradd",
        query: { id: row.id, flag: "edit" }
      });
    },
    propertyDetail({ row }) {
      this.$router.push({
        name: "tenantelectricitymeteradd",
        query: { id: row.id, flag: "detail" }
      });
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
