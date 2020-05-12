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
import parkingLotManageApi from "@/service/api/parkingLotManage";
import { parkingManageDic } from '@/utils/dictionary';
import commonFun from "@/utils/commonFun.js";

const dateValueFormat = "yyyy-MM-dd HH:mm:ss";
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
        // menuBtn: false,
        submitText: '搜索',
        labelWidth: 150,
        forms: [
          {
            type: "input",
            label: "车位名称或编号",
            prop: "lotName",
            clearable: true,
            span: 6
          },
          {
            type: "input",
            label: "车场编号",
            prop: "parkId",
            clearable: true,
            span: 6
          },
          {
            type: "select",
            label: "是否停车",
            prop: "isNull",
            clearable: true,
            dicData: parkingManageDic.isNull,
            span: 6
          },
          {
            type: "input",
            label: "车牌号",
            prop: "carNum",
            clearable: true,
            span: 6
          },
          {
            type: "datetime",
            label: "开始进入车位时间",
            prop: "inLotStartTime",
            valueFormat: dateValueFormat,
            clearable: true,
            span: 6
          },
          {
            type: "datetime",
            label: "结束进入车位时间",
            prop: "inLotEndTime",
            clearable: true,
            valueFormat: dateValueFormat,
            span: 6
          },
          {
            type: "datetime",
            label: "开始驶出车位时间",
            prop: "outLotStartTime",
            clearable: true,
            valueFormat: dateValueFormat,
            span: 6
          },
          {
            type: "datetime",
            label: "结束驶出车位时间",
            prop: "outLotEndTime",
            clearable: true,
            valueFormat: dateValueFormat,
            span: 6
          },
          /* {
            prop: "btn",
            span: 6,
            formslot: true,
            width: 60
          } */
        ]
      },
      tableOptions: {
        ref: "Table",
        serverMode: {
          url: parkingLotManageApi.getCarPlaceList,
          data: tableSendData
        },
        propsHttp: {
          list: 'rows'
        },
        columnConfig: [
          {
            prop: "id",
            label: "id",
            hide: true
          },
          {
            prop: "parkId",
            label: "车场编号"
          },
          {
            prop: "isNull",
            label: "是否停车",
            type: 'select',
            dicData: parkingManageDic.isNull
          },
          {
            prop: "lotName",
            label: "车位名称或编号"
          },
          {
            prop: "carNum",
            label: "车牌号"
          },
          {
            prop: "carNumColor",
            label: "车牌颜色",
            type: "select",
            dicData: parkingManageDic.carNumColor
          },
          {
            prop: "inLotTime",
            label: "进入车位时间"
          },
          {
            prop: "outLotTime",
            label: "驶出车位时间"
          },
          /*  {
             prop: "cameraId",
             label: "摄像机编号"
           },
           {
             prop: "cameraName",
             label: "摄像机名称"
           }, */
          {
            prop: "carType",
            label: "车辆类型",
            type: "select",
            dicData: parkingManageDic.carType
          },
          {
            prop: "carColor",
            label: "车辆颜色",
            type: "select",
            dicData: parkingManageDic.carColor
          },
          {
            prop: "carImgUrl",
            label: "车位图片",
            type: 'img'
          }
        ],
        uiConfig: {
          height: "auto",
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