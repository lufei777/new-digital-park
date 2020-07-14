<template>
      <div class='container'>
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
            @click="onClickSureBtn(obj)"
          >确认</el-button>
          <el-button
            :disabled="obj.disabled"
            @click="clearForm1(obj)"
          >重置</el-button>
        </div>
      </template>
    </z-form>
  </div>
</template>

<script>
import warningAlarm from "@/service/api/warningAlarm";
// 导入配置的字典====根据需要导入自己的配置
import CommonFun from "@/utils/commonFun";
//导入字典中的定义的字段
import { WarningAlerm } from "utils/dictionary";
const notificationWay = WarningAlerm.notificationWay;
export default {
    props:['relationIds'],
  data() {
    return {
      // 拼接的relationIds
      relationIds: "",
      // 保存的查询条件
      condition: {},
      // 开启表单的懒加载
      tableLoad: false,
      // 对话框的显示和隐藏
      dialogFormVisible: false,
      model: {},
      // 配置两个表单一个是基本的另一个是弹出框中的表单

      // 弹出框的表单

      formData: {
        ref: "formData2",
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
            span: 12,
            offset: 6,
            row: true,
            // dicData: alarmLevel
            dicUrl: warningAlarm.geteventRanks,
            dicMethod: "get",
            props: {
              label: "rankName",
              value: "rankId"
            }
          },
          // 通知方式 select
          {
            type: "select",
            label: "通知方式",
            prop: "notify",
            span: 12,
            offset: 6,
            row: true,
            tip: "字段暂时没有传",
            tipPlacement: "right",
            dicData: notificationWay
          },
          {
            prop: "btn",
            span: 18,
            pull: 2,
            offset: 8,
            formslot: true
            // width: "34px"
          }
        ]
      }
    };
  },
  methods: {
    // 批量编辑的确认按钮
    onClickSureBtn(obj) {
      this.$refs[this.formData.ref].getFormModel(res => {
        console.log(res);
        if (Object.keys(res).length === 0) {
          this.$message({
            message: "未选择任何操作",
            type: "warning"
          });
        } else {
          // 批量编辑的接口
          warningAlarm
            .updateAssetEventRank({
              rankId: res.eventRank,
              ids: this.relationIds
            })
            .then(res => {
              if (res) {
                // 修改成功后进行提示
                this.$message({
                  message: "修改成功！",
                  type: "success"
                });
                this.$emit('off',false)
                // // 关闭弹窗
                // this.dialogFormVisible = false;
                // //刷新页面
                // this.getTableData({}, { page: 1, rows: 10 });
              }
            });
        }
      });
    },
    clearForm1() {
      // 获取顶部form表单
      var zForm = this.$refs[this.formData.ref];
      // 单击重置按钮时候，重置表单 方法在已经封装好的文档中  名称：resetForm
      zForm.resetForm();
      // console.log(zForm)
    },
    submit() {},
    resetChange() {},
  }
};
</script>

<style  scoped lang="less">
</style>
