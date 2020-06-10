<template>
  <!-- 报警信息处理 -->
  <div class="message-device-manage panel-container">
    <!-- 上半部分 -->
    <div class="p_top panel">
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
              :disabled="obj.disabled"
              type="primary"
              @click="onClickSearchBtn"
            >确认</el-button>
            <el-button
              :disabled="obj.disabled"
              @click="goBack"
            >返回</el-button>
          </div>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
// 导入配置的字典====根据需要导入自己的配置
// 导入接口
import warningAlarm from "@/service/api/warningAlarm";

import CommonFun from "@/utils/commonFun";
import { WarningAlerm } from "utils/dictionary";
import { get } from 'http';
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
// 设备名称
const deviceName = WarningAlerm.deviceName;
// 设备点位
const equipmentSite = WarningAlerm.equipmentSite;
export default {
  name: "areaManage",
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        width: "70%",
        size: "medium",
        menuPosition: "right",
        menuBtn: false,
        // labelPosition: "left",
        forms: [
          //   子系统
          {
            type: "select",
            label: "子系统",
            prop: "system",
            disabled:true,
            offset: 10,
            dicData: subSystem
          },
          // 设备名称
          {
            type: "select",
            label: "设备名称",
            prop: "deviceName",
            offset: 10,
            dicData: deviceName
          },
          //设备点位
          {
            type: "select",
            label: "设备点位",
            offset: 10,
            // hide:true,
            prop: "monitorName",
            dicData: equipmentSite
          },
          //   报警名称
          {
            type: "input",
            label: "报警名称",
            offset: 10,
            prop: "caption",
            placeholder: "请输入关键字",
            clearable: true,
            minRows: 0
          },
          //  开始时间
          {
            type: "datetime",
            label: "开始时间",
            clearable: true,
            offset: 10,
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            format: "yyyy-MM-dd HH:mm:ss",
            prop: "startTime",
            minRows: 0
          },
          // 报警描述
          {
            type: "input",
            offset: 10,
            label: "报警描述",
            clearable: true,
            prop: "errorMessage",
            minRows: 0
          },
          // 报警级别
          {
            type: "select",
            label: "报警级别",
            offset: 10,
            dicData: alarmLevel,
            prop: "eventRank",
            dicUrl: warningAlarm.geteventRanks,
            dicMethod: "get",
            props: {
              label: "rankName",
              value: "rankId"
            }
          },
          //报警类型
          {
            type: "select",
            label: "报警类型",
            //   offset:1,
            prop: "state",
            offset: 10,
            dicData: alarmType
          },
          {
            prop: "btn",
            offset: 12,
            formslot: true
          }
        ]
      }
    };
  },
  computed: {
    Form() {
      return this.$refs[this.formData.ref]
    },
  },
  methods: {
    // 确认
    onClickSearchBtn(obj) {
      // this.$router.push('/warningalarm/monitorAlarm')
      // console.log(obj);
      this.Form.getFormModel(res => {
        console.log(res)
       this.$router.back();
      })
     
    },
    // 返回
    goBack() {
      // this.$router.push('/warningalarm/monitorAlarm')
      this.$router.back();
    },
    submit() {},
    resetChange() {},
    batchDels() {},
    addTenant() {},
  },
  mounted() {},
  created(){
    // 报警级别
    warningAlarm.geteventRanks().then(res => {
      this.Form.setColumnByProp("eventRank", {
        dicData: res
      });
    });
  }
};
</script>

<style lang="less">
.message-device-manage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .condition-box {
    padding-top: 20px;
    margin-bottom: 20px;
  }
  .p_top {
    padding-top: 50px;
  }
}
</style>
