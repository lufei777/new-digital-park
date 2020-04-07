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
        <template slot="operation" slot-scope="{row}">
          <el-button type="text" @click="propertyDetail(row)">详情</el-button>
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
            type: "input",
            label: "车牌号码",
            prop: "houseNumber",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            type: "datetime",
            label: "入场时间",
            prop: "houseName",
            clearable: true,
            span: 4
          },
          {
            type: "datetime",
            label: "出场时间",
            prop: "housePrice",
            clearable: true,
            span: 4
          },
          {
            type: "input",
            label: "停车场名称",
            prop: "houseStatus",
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
        operation: true,
        // serverMode: {
        //   url: "./static/mock/vehiclereRecord.json",
        //   data: tableSendData
        // },
        data: [
          {
            id: 1,
            carNum: "京A00000",
            parkingState: "停车",
            cardNum: 1657842564521,
            parkName: "数字园区1号停车场",
            userType: "个人",
            charge: 200,
            inMode: "刷卡",
            outMode: "刷卡",
            inTime: "2017-10-16 12:05",
            outTime: "2017-10-16 16:12",
            inChannelName: "一号闸"
          },
          {
            id: 2,
            carNum: "京P58486",
            parkingState: "停车",
            cardNum: 1284597564123,
            parkName: "数字园区6号停车场",
            userType: "个人",
            charge: 100,
            inMode: "刷卡",
            outMode: "刷卡",
            inTime: "2015-06-19 12:05",
            outTime: "2015-06-20 16:12",
            inChannelName: "二号闸"
          },
          {
            id: 3,
            carNum: "京B85949",
            parkingState: "停车",
            cardNum: 1578654986234,
            parkName: "数字园区8号停车场",
            userType: "个人",
            charge: 320,
            inMode: "刷卡",
            outMode: "刷卡",
            inTime: "2017-10-11 11:05",
            outTime: "2017-10-11 13:12",
            inChannelName: "一号闸"
          },
          {
            id: 4,
            carNum: "京B54793",
            parkingState: "停车",
            cardNum: 1589786543126,
            parkName: "数字园区3号停车场",
            userType: "个人",
            charge: 150,
            inMode: "刷卡",
            outMode: "刷卡",
            inTime: "2017-10-09 12:05",
            outTime: "2017-10-10 10:12",
            inChannelName: "一号闸"
          },
          {
            id: 5,
            carNum: "京B58467",
            parkingState: "停车",
            cardNum: 1584698723654,
            parkName: "数字园区2号停车场",
            userType: "个人",
            charge: 130,
            inMode: "刷卡",
            outMode: "刷卡",
            inTime: "2017-08-09 12:05",
            outTime: "2017-08-09 16:12",
            inChannelName: "三号闸"
          }
        ],
        columnConfig: [
          { id: "id", prop: "id信息" },
          {
            prop: "carNum",
            label: "车辆号码",
            fixed: "left"
          },
          {
            prop: "parkingState",
            label: "停车状态",
            fixed: "left"
          },
          {
            prop: "cardNum",
            label: "卡号",
            fixed: "left"
          },
          {
            prop: "parkName",
            label: "停车场名称",
            fixed: "left"
          },
          {
            prop: "userType",
            label: "用户类别",
            fixed: "left"
          },
          {
            prop: "charge",
            label: "停车场收费金额(元)",
            fixed: "left",
            width: 150
          },
          {
            prop: "inMode",
            label: "入场方式"
          },
          {
            prop: "outMode",
            label: "出场方式"
          },
          {
            prop: "inTime",
            label: "入场时间"
          },
          {
            prop: "outTime",
            label: "出场时间"
          },
          {
            prop: "inChannelName",
            label: "入场道闸通道名称",
            width: 150
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
    },
    propertyDetail(row) {
      this.$router.push({
        name: "parkingdetail",
        query: {
          flag: "accessRecord",
          model: JSON.stringify(row)
        }
      });
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


