<template>
  <!-- 报警信息处理 -->
  <div class="message-device-manage panel-container">
    <!-- 上半部分 -->
    <div class=" p_top panel">
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
              @click="onClickSearchBtn(obj)"
            >保存</el-button>
            <el-button
              :disabled="obj.disabled"
              @click="clearForm(obj)"
            >返回</el-button>
          </div>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
// 导入配置的字典====根据需要导入自己的配置
import { WarningAlerm } from "utils/dictionary";
//导入字典中的定义的字段
// 报警级别
const alarmLevel = WarningAlerm.alarmLevel;
// 子系统
const subSystem = WarningAlerm.subSystem;
// 处理组名称
const grounpName = WarningAlerm.grounpName;
// 选择人员
const handingPerson = WarningAlerm.handingPerson;

export default {
  name: "areaManage",
  data() {
    return {
      off:false,
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        textMode:false,
        menuBtn: false,
        forms: [
          //   子系统
          {
            type: "select",
            label: "子系统",
            disabled:false,
            // span: 6,
            offset: 6,
            prop: "subSystem",
            multiple:true,
            multiple: true,
            // tip: "可多选",
            // tipPlacement: "right",
            dicData: subSystem
          },
          // 报警级别
          {
            type: "select",
            label: "报警级别",
            disabled:false,
            prop: "alarmLevel",
            // span: 6,
            offset: 6,
            dicData: alarmLevel,
            multiple: true,
            multiple:true,
            // tip: "可多选",
            // tipPlacement: "right"
          },
          //处理组名称
          {
            type: "input",
            label: "处理组名称",
            placeholder: "安保部处理组A",
            prop: "grounpName",
            disabled:false,
            offset: 6,
            // span: 6
          },
          //   选择人员
          {
            type: "select",
            label: "选择人员",
            prop: "handingPerson",
            disabled:false,
            // span: 6,
            offset: 6,
            dicData: handingPerson,
            multiple: true,
            // tip: "从人员信息中选择人员，可多选",
            // tipPlacement: "right"
          },
          {
            prop: "btn",
            span: 10,
            pull: 2,
            offset: 9,
            formslot: true
            // width: "34px"
          }
        ]
      }
    };
  },

  methods: {
    submit() {},
    resetChange() {},
    batchDels() {},
    addTenant() {}
  },
  mounted() {},
  created(){
    // 获取路由的参数
    var statue = this.$route.query
    if(statue.flag){
      this.model = {...statue}
      this.formData.textMode = statue.flag
    }else{
      this.model = {...statue}
    }
  }
};
</script>

<style lang="less">
.message-device-manage {
  .condition-box {
    padding-top: 20px;
    margin-bottom: 20px;
  }
  .p_top {
    padding-top: 50px;
  }
}
</style>
