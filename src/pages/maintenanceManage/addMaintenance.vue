<template>
  <div class="add-maintenance panel-container">
    <div class="panel">
      <div class="add-maintenance-box">
        <z-form
          :ref="addMaintenanceForm.ref"
          :options="addMaintenanceForm"
          v-model="model"
          @reset-change="resetChange"
        ></z-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddMaintenance",
  data() {
    return {
      model: {
        taskType: "1",
        urgent: "1"
      },
      addMaintenanceForm: {
        ref: "formRef",
        labelWidth: "120",
        labelPosition: "right",
        menuPosition: "left",
        emptyBtn: false,
        size: "medium",
        menuBtn: false,
        forms: [
          {
            type: "input",
            label: "工单名称",
            prop: "taskName",
            clearable: true,
            span: 10,
            rules: {
              required: true,
              message: "请输入工单名称",
              trigger: "change"
            }
          },
          {
            type: "select",
            label: "关联设备",
            prop: "taskName",
            clearable: true,
            span: 10,
            rules: {
              required: true,
              message: "请输入工单名称",
              trigger: "change"
            }
          }
        ]
      }
    };
  },
  methods: {
    resetChange() {}
  }
};
</script>

<style lang="less">
.add-maintenance {
  height: 100%;
  .add-maintenance-box {
    width: 50%;
    margin: 0 auto;
    padding: 20px 0;
  }
}
</style>