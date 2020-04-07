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
            prop: "id",
            label: "id信息",
            hide: true
          },
          {
            type: "input",
            label: "车牌号码",
            prop: "houseNumber",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          /* {
            type: "datetime",
            label: "抓拍时间",
            prop: "houseName",
            clearable: true,
            span: 4
          }, */
          {
            type: "input",
            label: "行车方向",
            prop: "carDirection",
            clearable: true,
            span: 4
          },
          {
            type: "input",
            label: "停车场名称",
            prop: "parkName",
            placeholder: "请输入",
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
        serverMode: {
          url: "./static/mock/vehiclereRecord.json",
          data: tableSendData
        },
        columnConfig: [
          {
            prop: "carNum",
            label: "车辆号码",
            fixed: "left"
          },
          {
            prop: "carColor",
            label: "车辆颜色",
            fixed: "left"
          },
          /* {
            prop: "kh",
            label: "抓拍时间",
            fixed: "left"
          }, */
          {
            prop: "carDirection",
            label: "行车方向",
            fixed: "left"
          },
          {
            prop: "carInAndOut",
            label: "车辆进出类型",
            fixed: "left"
          },
          {
            prop: "parkName",
            label: "停车场名称"
          },
          {
            prop: "laneNum",
            label: "车道号"
          },
          {
            prop: "channelName",
            label: "卡口相机通道名称"
          },
          {
            prop: "deviceName",
            label: "设备名称"
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

