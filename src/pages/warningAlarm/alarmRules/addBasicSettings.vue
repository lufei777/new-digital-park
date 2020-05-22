<template>
  <!--配置表单 -->
  <div class="setform">
    <z-form
      :ref="settingForms[0].formData.ref"
      :options="settingForms[0].formData"
      v-model="settingForms[0].model"
      @submit="submit"
      @reset-change="resetChange"
    >
    </z-form>
  </div>
  </div>
</template>

<script>
// import CommonFun from "@/utils/commonFun";
import { WarningAlerm } from "utils/dictionary";
// 子系统
const subSystem = WarningAlerm.subSystem;
// 设备类别
const deviceType = WarningAlerm.deviceType;
// 设备名称
const deviceName = WarningAlerm.deviceName;
// 点位类型
const pointType = WarningAlerm.pointType;
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 抑制
const restrain = WarningAlerm.restrain;

export default {
  data() {
    return {
      // 步骤条激活状态
      active: 1,
      //
      settingForms: [
        //基本设置
        {
          model: {},
          formData: {
            ref: "formData",
            labelWidth: "100",
            size: "medium",
            size: "medium",
            menuPosition: "right",
            menuBtn: false,
            // display:false,
            forms: [
              // 子系统
              {
                type: "select",
                label: "子系统",
                prop: "subSystem",
                span: 6,
                offset: 8,
                dicData: subSystem
              },
              // 设备类别
              {
                type: "select",
                label: "设备类别",
                prop: "deviceType",
                span: 6,
                offset: 8,
                dicData: deviceType
              },

              // 设备名称
              {
                type: "select",
                label: "设备名称",
                prop: "deviceName",
                span: 6,
                offset: 8,
                dicData: deviceName
              },
              // 点位类型
              {
                type: "select",
                label: "点位类型",
                prop: "pointType",
                span: 6,
                offset: 8,
                // display:false,
                dicData: pointType
              }
            ]
          }
        },
        // 参数设置
        {
          model: {},
          formData: {
            ref: "formData",
            labelWidth: "100",
            size: "medium",
            size: "medium",
            menuPosition: "right",
            menuBtn: false,
            forms: [
              // 温度监测 input
              {
                type: "input",
                label: "温度监测",
                prop: "subSystem",
                span: 6,
                offset: 8
              },
              // 上限input
              {
                type: "input",
                label: "上限",
                prop: "deviceType",
                span: 6,
                offset: 8
              },
              // 下线input
              {
                type: "input",
                label: "下限",
                prop: "deviceName",
                span: 6,
                offset: 8
              },
              // 报警级别select
              {
                type: "select",
                label: "报警级别",
                prop: "alarmLevel",
                span: 6,
                offset: 8,
                dicData: alarmLevel
              },
              // 抑制select
              {
                type: "select",
                label: " 抑制",
                prop: "restrain",
                span: 6,
                offset: 8,
                dicData: restrain
              },
              //   分钟
              {
                type: "input",
                label: "分钟",
                prop: "minute",
                placeholder: "5",
                span: 3
              }
            ]
          }
        },
        // 通知方式
      ]
      // model: {},
      // formData: {
      //   ref: "formData",
      //   labelWidth: "100",
      //   size: "medium",
      //   size: "medium",
      //   menuPosition: "right",
      //   menuBtn: false,
      //   // display:false,
      //   forms: [
      //     // 子系统
      //     {
      //       type: "select",
      //       label: "子系统",
      //       prop: "subSystem",
      //       span: 6,
      //       offset: 8,
      //       dicData: subSystem
      //     },
      //     // 设备类别
      //     {
      //       type: "select",
      //       label: "设备类别",
      //       prop: "deviceType",
      //       span: 6,
      //       offset: 8,
      //       dicData: deviceType
      //     },

      //     // 设备名称
      //     {
      //       type: "select",
      //       label: "设备名称",
      //       prop: "deviceName",
      //       span: 6,
      //       offset: 8,
      //       dicData: deviceName
      //     },
      //     // 点位类型
      //     {
      //       type: "select",
      //       label: "点位类型",
      //       prop: "pointType",
      //       span: 6,
      //       offset: 8,
      //       // display:false,
      //       dicData: pointType
      //     }
      //   ]
      // }
    };
  },
  methods: {
    submit() {},
    clearForm(obj) {},
    resetChange() {}
  }
};
</script>

<style  scoped lang="less">
.step {
  width: 70%;
  margin-top: 40px;
}
.setform {
  margin-top: 100px;
}
.btn {
  margin-top: 4%;
}
</style>
