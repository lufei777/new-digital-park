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
          <el-button type="text" @click="propertyDetail({row})">详情</el-button>
          <el-button type="text" @click="propertyEdit({row})">编辑</el-button>
          <el-button type="text" @click="bindingMeter({row})">电表绑定</el-button>
          <el-button type="text" @click="unbinding({row})">电表解绑</el-button>
        </template>
      </z-table>
    </div>
    <el-dialog
      title="绑定电表"
      destroy-on-close
      :style="{height:'100%'}"
      :visible.sync="bindingMeterDialog"
      width="80%"
    >
      <select-meter @confirm="bindingSuccess"></select-meter>
    </el-dialog>
    <el-dialog
      title="解绑电表"
      destroy-on-close
      :style="{height:'100%'}"
      :visible.sync="unbindingMeterDialog"
      width="30%"
      @close="unbindingModel = {}"
    >
      <z-form
        v-model="unbindingModel"
        :ref="unbindingForm.ref"
        :options="unbindingForm"
        @submit="unbindingSubmit"
      ></z-form>
    </el-dialog>
  </div>
</template>
<script>
import { LeaseManageDic } from "@/utils/dictionary";
import leaseManageApi from "@/service/api/leaseManage";
import commonFun from "@/utils/commonFun.js";
import electricityManageApi from 'api/electricityManage';
import selectMeter from '../common/selectMeter';

const dateValueFormat = "yyyy-MM-dd HH:mm:ss";
let tableSendData = {
  pageNum: 1,
  pageSize: 10
};

export default {
  components: {
    selectMeter
  },
  data() {
    return {
      unbindingMeterDialog: false,
      bindingMeterDialog: false,
      tenantElecId: '',
      model: {},
      formOptions: {
        ref: "Form",
        menuPosition: "right",
        menuBtn: false,
        forms: [
          /* {
            type: 'table',
            label: "合同编号",
            prop: "contractNumber",
            clearable: true,
            span: 6,
            children: {
              serverMode: {
                url: leaseManageApi.contractList,
                data: tableSendData
              },
              columnConfig: [
                {
                  label: '合同名称',
                  prop: 'contractName'
                },
                {
                  label: '合同编号',
                  prop: 'contractNumber'
                }
              ]
            },
            props: {
              label: 'contractNumber',
              value: 'contractNumber'
            }
          }, */
          /* {
            type: 'table',
            label: "租户名称",
            prop: "tenantNumber",
            clearable: true,
            span: 6,
            children: {
              serverMode: {
                url: leaseManageApi.tenantList,
                data: tableSendData
              },
              columnConfig: [
                {
                  label: '租户名称',
                  prop: 'tenantName'
                },
                {
                  label: '所租房产',
                  prop: 'houseName'
                },
                {
                  label: '联系方式',
                  prop: 'telephone'
                }
              ]
            },
            props: {
              label: 'tenantName',
              value: 'tenantNumber'
            }
          }, */
          {
            label: "合同编号",
            prop: "contractNumber",
            span: 6
          },
          {
            label: "租户名称",
            prop: "tenantNumber",
            span: 6
          },
          {
            prop: "btn",
            noModel: true,
            formslot: true,
            width: 20
          }
        ]
      },
      tableOptions: {
        ref: "Table",
        customTop: true,
        customTopPosition: "right",
        operation: {
          width: 250
        },
        serverMode: {
          url: electricityManageApi.selectTenantUseElecList,
          data: {
            pageNum: 1,
            pageSize: 10
          }
        },
        columnConfig: [
          {
            prop: "tenantName",
            label: "客户名称"
          },
          {
            prop: "contractTime",
            label: "起始日期"
          },
          {
            prop: "expireTime",
            label: "结束日期"
          },
          {
            prop: "elecMeter",
            label: "对应电表号",
            type: 'array',
            showOverflowTooltip: false,
            props: {
              label: 'monitorName'
            }
          },
          {
            prop: "spaceName",
            label: "所在楼层"
          },
          {
            prop: 'proportion',
            label: '分摊楼层公共电量比例(%)'
          }
        ],
        uiConfig: {
          height: "auto",
          selection: true,
          showIndex: true
        }
      },
      unbindingModel: {},
      unbindingForm: {
        ref: 'unbindingForm',
        itemSpan: 24,
        emptyBtn: false,
        forms: [
          {
            label: '客户名称',
            prop: 'tenantName',
            textMode: true,
            row: true
          },
          {
            label: '电表号',
            prop: 'monitors',
            type: 'select',
            multiple: true,
            props: {
              label: 'monitorName',
              value: 'monitor'
            },
            dicData: []
          }
        ]
      }
    };
  },
  mounted() {
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
    deleteRow(ids) {
      electricityManageApi.deleteTenantUseElec(ids).then(res => {
        this.refreshTable();
      });
    },
    addedProperty({ row }) {
      this.$router.push({
        name: "tenantelectricityadd",
        query: {
          flag: 'add'
        }
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
    propertyDetail({ row }) {
      this.$router.push({
        name: "tenantelectricityadd",
        query: { id: row.id, flag: "detail" }
      });
    },
    propertyEdit({ row }) {
      this.$router.push({
        name: "tenantelectricityadd",
        query: { id: row.id, flag: "edit" }
      });
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
    bindingMeter({ row }) {
      this.tenantElecId = row.id;
      this.bindingMeterDialog = true;
      // console.log(obj);
    },
    refreshTable() {
      this.Table.refreshTable();
    },
    bindingSuccess(selectedData) {
      electricityManageApi.bindingTenantOfElec({}, {
        id: this.tenantElecId,
        monitors: selectedData.map(item => item.id).join(',')
      }).then(res => {
        this.bindingMeterDialog = false;
        this.refreshTable();
      })
    },
    unbinding({ row: { elecMeter, tenantName, id } }) {
      if (elecMeter && elecMeter.length) {
        this.unbindingMeterDialog = true;
        this.unbindingModel = { tenantName, id };
        this.$nextTick(() => {
          this.$refs[this.unbindingForm.ref].setColumnByProp('monitors', {
            dicData: elecMeter
          })
        })
      } else {
        this.$message.warning('未绑定电表');
      }
    },
    unbindingSubmit(model, done) {
      model.monitors = model.monitors.join(',');
      electricityManageApi.relieveTenantOfElec({}, model).then(res => {
        this.unbindingMeterDialog = false;
      }).finally(() => {
        done();
        this.refreshTable();
      })
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
