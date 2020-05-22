<template>
  <!--配置表单 -->
  <div class="setform">
    <z-form
      :ref="formData.ref"
      :options="formData"
      v-model="model"
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
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 抑制
const restrain = WarningAlerm.restrain;
export default {
  data() {
    return {
      // 步骤条激活状态
      active: 1,
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
            offset: 8,
          },
          // 上限input
          {
            type: "input",
            label: "上限",
            prop: "deviceType",
            span: 6,
            offset: 8,
          },
          // 下线input
          {
            type: "input",
            label: "下限",
            prop: "deviceName",
            span: 6,
            offset: 8,

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
            placeholder:'5',
            span: 3,
          }
        ]
      }
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
