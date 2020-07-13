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
import electricityManageApi from 'api/electricityManage';
import commonFun from "@/utils/commonFun.js";

const dateValueFormat = "yyyy-MM-dd";
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
            type: 'date',
            label: "开始时间",
            prop: "startTime",
            valueFormat: dateValueFormat,
            span: 6
          },
          {
            type: 'date',
            label: "结束时间",
            prop: "endTime",
            valueFormat: dateValueFormat,
            span: 6
          },
          {
            prop: "btn",
            span: 12,
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
          url: electricityManageApi.selectElecPriceList,
          data: {
            pageNum: 1,
            pageSize: 10
          }
        },
        columnConfig: [
          {
            label: "开始时间",
            prop: "startTime"
          },
          {
            label: "结束时间",
            prop: "endTime"
          },
          {
            label: "收费电价(元/千瓦时)",
            prop: "price"
          },
          {
            label: "尖峰电价(元/千瓦时)",
            prop: "peakPrice"
          },
          /* {
            label: "峰段电价(元/千瓦时)",
            prop: "endTime"
          }, */
          {
            label: "谷段电价(元/千瓦时)",
            prop: "valleyPrice"
          },
          {
            label: "平段电价(元/千瓦时)",
            prop: "flayPrice"
          },
          {
            label: "代征各项基金和附加费系数(元/度)",
            prop: "surcharge"
          },
          {
            label: "备注",
            prop: "remarks"
          },
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
        name: "elecpricemaintainadd",
        query: {
          flag: 'add'
        }
      });
    },
    deleteRow(ids) {
      electricityManageApi.deleteElecPrice(ids).then(res => {
        this.refreshTable();
      });
    },
    bulkDel(selectedData) {
      if (!selectedData.length) {
        commonFun.deleteTip(this, false, "请选择数据");
        return;
      }
      let ids = selectedData.map(item => item.id);
      commonFun.deleteTip(
        this,
        true,
        "确定要删除吗?",
        () => {
          this.deleteRow(ids);
        },
        () => { }
      );
    },
    propertyDel({ row }) {
      commonFun.deleteTip(
        this,
        true,
        "确定要删除吗?",
        () => {
          this.deleteRow([row.id]);
        },
        () => { }
      );
    },
    propertyEdit({ row }) {
      this.$router.push({
        name: "elecpricemaintainadd",
        query: { id: row.id, flag: "edit", row: JSON.stringify(row) }
      });
    },
    propertyDetail({ row }) {
      this.$router.push({
        name: "elecpricemaintainadd",
        query: { id: row.id, flag: "detail", row: JSON.stringify(row) }
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