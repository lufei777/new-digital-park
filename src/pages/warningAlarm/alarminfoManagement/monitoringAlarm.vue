<template>
  <!-- 报警信息处理 -->
  <div class="message-device-manage panel-container">
    <!-- 上半部分 -->
    <div class="condition-box radius-shadow">
      <z-form
        :ref="formData.ref"
        :options="formData"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
            <el-button
              type="primary"
              @click="onClickSearchBtn(obj)"
            >查询</el-button>
            <el-button @click="clearForm(obj)">重置</el-button>
          </div>
        </template>
      </z-form>
    </div>

    <!-- 下半部分 -->
    <div class="warehouse-manage-table panel">
      <div class="operator-btn-box flex-row-reverse">
      </div>
      <z-table
        :ref="tableData.ref"
        :options="tableData"
      >
        <template
          slot="custom-top"
          slot-scope="{size,disabled,selectedData}"
        >
          <el-button
            @click="toNewInceased()"
            type="primary"
          >新建</el-button>
          <el-button :disabled="!selectedData.length">导出</el-button>
        </template>

        <template
          slot="operation"
          slot-scope="obj"
        >
          <el-button
            type="text"
            @click="propertyDetail(obj)"
          >查看</el-button>
          <el-button
            type="text"
            @click="propertyEdit(obj)"
          >应答</el-button>
          <el-button
            type="text"
            @click="propertyDel(obj)"
          >关闭</el-button>
          <el-button
            type="text"
            @click="propertyLocation(obj)"
          >定位</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
// 导入接口
import warningAlarm from "@/service/api/warningAlarm";
// 导入配置的字典====根据需要导入自己的配置

import commonApi from "@/service/api/common";
// import CommonFun from "@/utils/commonFun";
// import CommonFun from "@/utils/commonFun";
import { WarningAlerm } from "utils/dictionary";

//导入字典中的定义的字段
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 报警状态
const alarmStatus = WarningAlerm.alarmStatus;
// 子系统
const subSystem = WarningAlerm.subSystem;
// 设备类型
const deviceType = WarningAlerm.deviceType;
// 报警类型
const alarmType = WarningAlerm.alarmType;
export default {
  name: "warningAlarm",
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        menuBtn: false,
        // labelPosition: "left",
        forms: [
          // 报警级别
          {
            type: "select",
            label: "报警级别",
            prop: "eventRank",
            span: 5,
            remote: true,
            // dicData: alarmLevel,
            dicUrl: warningAlarm.geteventRanks,
            dicMethod: "get",
            props: {
              label: "rankName",
              value: "rankId",
            }
          },
          //   报警状态
          {
            type: "select",
            label: "报警状态",
            valueDefault: "已创建",
            offset: 1,
            prop: "handled",
            span: 5,
            dicData: alarmStatus
          },
          //   子系统
          {
            type: "select",
            label: "子系统",
            valueDefault: "门禁管理",
            span: 5,
            // readonly:true,
            disabled: true,
            offset: 1,
            prop: "subSystem",
            dicData: subSystem
          },
          //   设备类型
          {
            // placeholder: '请选择 设备分类',
            label: "设备类型",
            type: "tree",
            span: 5,
            prop: "catalogId",
            clearable: true,
            // commonApi.getEnergyListAll  '/vibe-web/getItemsTree',
            dicUrl: warningAlarm.getItemsTree,
            dicQuery: { catalogId: "2002" },
            props: {
              label: "text",
              value: "id",
              children: "nodes"
            }
          },
          //报警类型
          {
            type: "select",
            label: "报警类型",
            span: 5,
            valueDefault: "设备离线报警",
            prop: "state",
            dicData: alarmType
          },
          //   报警名称
          {
            type: "input",
            label: "报警名称",
            prop: "caption",
            placeholder: "请输入关键字",
            clearable: true,

            span: 5,
            offset: 1,
            minRows: 0
          },
          //  开始时间
          {
            type: "time",
            label: "开始时间",
            prop: "startTime",
            span: 5,
            offset: 1,
            minRows: 0
          },
          {
            prop: "btn",
            span: 6,
            pull: 2,
            offset: 1,
            formslot: true
            // width: "34px"
          }
        ]
      },
      tableData: {
        ref: "Table",
        customTop: true,
        data: [
          {
            caption: "asdu",
            startTime: "2015-09-03",
            errorMessage: "sahdif",
            eventRank: "普通",
            handled: "已创建",
            state: "设备离线报警",
            system: "",
            catalogId: "门禁",
            deviceName: "交换机",
            devicePoint: "xxxx"
          }
        ],
        // serverMode: {
        //   // url: warningAlarm.getAlarmMessageList,
        //   data: {
        //     pageNum: 1,
        //     pageSize: 10
        //     },
        // },
        customTopPosition: "right",

        operation: {
          width: 200
        },
        columnConfig: [],
        uiConfig: {
          height: "auto",
          selection: true,
          pagination: {
            layout: "total, ->, prev, pager, next, jumper",
            pageSizes: [5, 10, 20],
            pageSize: 10,
            currentPage: 1,
            handler(pageSize, currentPage, table) {
              console.log({ pageSize, currentPage }, table);
            }
          }
        }
      }
    };
  },

  computed: {
    Form() {
      return this.$refs[this.formData.ref];
    }
  },

  methods: {
    // 查询
    onClickSearchBtn(obj) {
      console.log(obj);
      this.Form.submit();
    },

    // '查看' 按钮
    propertyDetail(obj) {
      // console.log('当前行的信息',obj.row)
      var seeDetail = {
        path: "/warningalarm/seeDetails",
        query: { flag: true, ...obj.row }
      };
      this.$router.push(seeDetail);
    },
    // '重置' 按钮
    clearForm(obj) {
      var zform = this.$refs[this.formData.ref];
      zform.resetForm();
    },
    // '应答',按钮
    propertyEdit() {
      // 去往查看详情的页面
      this.$router.push({
        path: "/warningalarm/seeDetails",
        query: { flag: true, mark: "response" }
      });
    },
    submit() {},
    resetChange() {},
    getCleaningList() {
      // 来自CommonFun的模拟数据源 let res = CommonFun.monitorAlarm;
      // let res = CommonFun.monitorAlarm;
      let labelList = [
        { label: "报警名称", prop: "caption" },
        { label: "开始时间", prop: "startTime" },
        { label: "报警描述", prop: "errorMessage" },
        { label: "报警级别", prop: "eventRank" },
        { label: "报警状态", prop: "handled" },
        { label: "报警类型", prop: "state" },
        { label: "子系统", prop: "system" }, //待定
        { label: "设备类型", prop: "catalogId" },
        { label: "设备名称", prop: "deviceName" },
        { label: "设备点位", prop: "devicePoint" } //未改
      ];
      this.tableData.columnConfig = labelList;
      // this.tableData.data = res;
      // this.tableData.data = res
    },
    batchDels() {},
    addTenant() {},
    //单击新建按钮的的点击事件
    toNewInceased() {
      console.log(222);
      this.$router.push("/warningAlarm/newIncreased");
    }
  },
  mounted() {
    this.getCleaningList();
  },
  created() {
    // commonApi
    //   .getAlarmMessageList({ pageNum: 1, pageCount: 10, start: "", end: "" })
    //   .then(res => {
    //     // console.log(res)
    //     this.tableData.data = res.rows;
    //   });
  }
};
</script>

<style lang="less" scoped >
.message-device-manage {
  .condition-box {
    padding-top: 20px;
    margin-bottom: 20px;
    display: inline-block;
    /deep/.el-input__inner {
      border: 1px solid #ccc;
    }
  }
}
</style>
 