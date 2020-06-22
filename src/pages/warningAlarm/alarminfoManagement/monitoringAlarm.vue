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
              :disabled='obj.disabled'
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
        :load="tableLoad"
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
            @click="propertyClose(obj)"
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
      tableLoad: false,
      model: {},
      // 表单数组
      queryArry: {},
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
            span: 5,
            // remote: true,
            // dicData: alarmLevel,
            prop: "eventRank",
            props: {
              label: "rankName",
              value: "rankId"
            }
          },
          //   报警状态
          {
            type: "select",
            label: "报警状态",
            // valueDefault: "已创建",
            offset: 1,
            prop: "handled",
            span: 5,
            dicData: alarmStatus
          },
          //   子系统
          {
            type: "select",
            label: "子系统",
            hide: true,
            span: 5,
            // readonly:true,
            disabled: true,
            offset: 1,
            prop: "system",
            dicData: subSystem
          },
          //   设备类型
          {
            // placeholder: '请选择 设备分类',
            label: "设备类型",
            type: "cascader",
            span: 5,
            offset:1,
            clearable: true,
            // commonApi.getEnergyListAll  '/vibe-web/getItemsTree',
            prop: "catalogId",
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
            offset:1,
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
            minRows: 0
          },
          //  开始时间
          {
            type: "datetime",
            label: "开始时间",
            prop: "startTime",
            span: 5,
            offset: 1,
            minRows: 0,
            valueFormat: "yyyy-MM-dd HH:mm:ss"
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
        data: [],
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
            handler: (pageSize, currentPage, table) => {
              // console.log({ pageSize, currentPage }, table);
              let props = this.queryArry; //获取的是查询时的字段
              this.fetchTableList(
                { ...props },
                { rows: pageSize, page: currentPage }
              );
            }
          }
        }
      }
    };
  },

  computed: {
    Form() {
      return this.$refs[this.formData.ref];
    },
    Table() {
      return this.$refs[this.tableData.ref];
    }
  },

  methods: {
    // 查询
    onClickSearchBtn(obj) {
      // this.$nextTick(()=>{
      //   this.props ={...res}
      // })

      var that = this;
      this.Form.getFormModel(res => {
        // 需要加一个处理。。。。。
        console.log(res);
        res.eventRank = { rankId: res.eventRank };
        // res.catalogId = res.catalogId[1]
        if(res.catalogId && res.catalogId.length>=2 ){
          res.catalogId = res.catalogId[res.catalogId.length-1]
        }       
        that.queryArry = { ...res };
        that.fetchTableList({ ...res }, { rows: 10, page: 1 });
      });
    },
    // 表格中的关闭
    propertyClose(obj){ },
    // 表格中的 '定位' 按钮
    propertyLocation(obj){ },
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
    propertyEdit(obj) {
      // 去往查看详情的页面
      this.$router.push({
        path: "/warningalarm/seeDetails",
        query: { flag: true, mark: "response", ...obj.row }
      });
    },
    submit(hide, model) {
      hide();
    },
    resetChange() {},
    getCleaningList() {
      // 来自CommonFun的模拟数据源 let res = CommonFun.monitorAlarm;
      // let res = CommonFun.monitorAlarm;
      let labelList = [
        { label: "报警名称", prop: "caption" },
        { label: "开始时间", prop: "startTime" },
        { label: "报警描述", prop: "errorMessage" },
        {
          label: "报警级别",
          prop: "eventRank",
          props: {
            label: "rankName",
            value: "rankId"
          }
        },
        {
          label: "报警状态",
          prop: "handled",
          type: "select",
          dicData: alarmStatus
        },
        {
          label: "报警类型",
          prop: "state",
          type: "select",
          dicData: alarmType
        },
        { label: "子系统", prop: "system" }, //待定
        {
          label: "设备类型",
          prop: "catalogId",
          type:'select',
          props: {
            label: "text",
            value: "id",
            children: "nodes"
          }
        },
        { label: "设备名称", prop: "deviceName" },
        { label: "设备点位", prop: "monitorName" } //未改
      ];
      this.tableData.columnConfig = labelList;
      // this.tableData.data = res;
      // this.tableData.data = res
    },
    batchDels() {},
    addTenant() {},
    //单击新建按钮的的点击事件
    toNewInceased() {
      // console.log(222);
      this.$router.push("/warningAlarm/newIncreased");
    },
    // 第一个参数是body 中的参数，第二个参数是拼在地址栏中的参数
    fetchTableList(searchParams = {}, pageParams = { page: 1, rows: 10 }) {
      this.tableLoad = true;
      warningAlarm
        .queryAlarmMessages(searchParams, pageParams)
        .then(res => {
          // console.log("dte",res)
          this.$refs[this.tableData.ref].setData(res.rows);
          this.$refs[this.tableData.ref].setTotal(res.total);
        })
        .finally(() => {
          this.tableLoad = false;
        });
    }
  },
  mounted() {
    this.getCleaningList();
  },
  created() {
    // 报警级别
    warningAlarm.geteventRanks().then(res => {
      this.Form.setColumnByProp("eventRank", {
        dicData: res
      });
      this.Table.setColumnByProp("eventRank", {
        dicData: res
      });
    });
    // 设备类型
    warningAlarm.getItemsTree({ catalogId: "2002"}).then(res => {
      // console.table(res)
      this.Form.setColumnByProp("catalogId",{
        dicData: res
      })
      this.Table.setColumnByProp("catalogId", {
        dicData: res
      });

    })
    this.fetchTableList();
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
 