<template>
      <div class='panel-container'>
    <div class='panel'>
      <!-- 区分标题 -->
      <div class="toptitle">
        <span>{{title}}</span>
        <el-divider content-position="left"></el-divider>
      </div>
      <z-Form
        :ref='formData.ref'
        :options='formData'
        v-model="model"
        @submit="submit"
      >
        <template
          slot='btn'
          slot-scope="obj"
        >
          <div>
            <!-- 添加保存 -->
            <el-button
              type='primary'
              @click="addSave(obj)"
            >保存</el-button>
            <el-button
              type='danger'
              @click="back(obj)"
            >返回</el-button>
          </div>
        </template>
      </z-Form>

    </div>
  </div>
</template>

<script>
import { Norbulingka } from "utils/dictionary";
// 导入接口
import norbulingka from "@/service/api/norbulingka";
// const topTitle = {
//   add: {
//     title: "添加  本体情况"
//   },
//   edit: {
//     title: "编辑 本体情况"
//   },
//   detail: {
//     title: "本体情况 详情"
//   }
// };
export default {
  data() {
    return {
      // 区别模板的标题
      title: "新增租赁管理",
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "140",
        menuPosition: "right",
        menuBtn: false,
        textMode: false,
        forms: [
          // 租赁月账单编号
          {
            type: "input",
            prop: "1",
            label: "租赁月账单编号",
            span: 8,
            offset: 4,
            disabled: true,
            tip: "不可更改项",
            tipPlacement: "top"
          },

          // 租户
          {
            type: "input",
            prop: "2",
            label: "租户",
            span: 8,
            // offset:1,
            disabled: true,
            tip: "不可更改项",
            tipPlacement: "top"
          },

          // 合同名称
          {
            type: "input",
            prop: "3",
            label: "合同名称",
            span: 8,
            offset: 4,
            disabled: true,
            tip: "不可更改项",
            tipPlacement: "top"
          },

          // 账期
          {
            type: "input",
            prop: "4",
            label: "账期",
            span: 8
            // offset:1,
          },

          // 收费项目数
          {
            type: "input",
            prop: "5",
            label: "收费项目数",
            span: 8,
            offset: 4
          },

          // 账单金额合计（元）
          {
            type: "input",
            prop: "6",
            label: "账单金额合计",
            span: 8,
            append: "（元）"
            // offset:1,
          },

          // 账单状态
          {
            type: "input",
            prop: "7",
            label: "账单状态",
            span: 8,
            offset: 4
          },

          // 本次冲抵额（元）
          {
            type: "input",
            prop: "8",
            label: "本次冲抵额",
            span: 8,
            append: "（元）"
            // offset:1,
          },

          // 租户
          {
            type: "input",
            prop: "9",
            label: "租户",
            span: 8,
            offset: 4
          },
          // 按钮
          {
            prop: "btn",
            formslot: true,
            span: 8,
            offset: 8
          }
        ]
      }
    };
  },
  methods: {
    submit(model, done) {},
    // 添加保存
    addSave(obj) {
      // this.Form.submit()
    },

    // 返回
    back(obj) {
      this.$router.back();
    }
  },
  created() {},
  mounted() {},
  computed: {
    Form() {
      return this.$refs[this.formData.ref];
    }
  }
};
</script>
<style lang="less" scoped>
.toptitle {
  span {
    padding: 0 15px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
