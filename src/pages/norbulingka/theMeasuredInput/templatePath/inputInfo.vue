<template>


<!-- 搁置 逻辑出现错误 -->



      <div class='panel-container'>
    <!-- 实测录入清单的编辑详情模板 -->
    <div class="panel">
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
            <el-button
              type='primary'
              @click="save(obj)"
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
export default {
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        textMode: false,
        
        forms: [
          // 工程名称 	 projectName
          {
            label: "工程名称",
            prop: "projectName",
            type: "input",
            offset: 6
          },
          // 发掘次数 	 number
          {
            label: "发掘次数",
            prop: "number",
            type: "input",
            offset: 6
          },
          // 发掘面积 	 area
          {
            label: "发掘面积",
            prop: "area",
            type: "input",
            offset: 6
          },
          // 现场照片 	 photoFile
          {
            label: "现场照片",
            prop: "photoFile",
            type: "upload",
            offset: 6,
            accept: ["jpg", "jpeg", "png"],
            tip: "只能上传jpg/png文件。"
          },
          // 情况说明 	 description
          {
            type: "textarea",
            label: "情况说明",
            prop: "description",
            clearable: true,
            maxlength: 255,
            minRows: 8,
            offset: 6,
            showWordLimit: true
          },
          {
            prop: "btn",
            formslot: true,
            span: 6,
            offset: 9
          }
        ]
      }
    };
  },
  methods: {
    submit(obj) {
      console.log(obj);
    },
    // 保存
    save(obj) {
      console.log(obj);
      this.$router.back();
    },
    // 返回
    back(obj) {
      this.$router.back();
    }
  },
  created() {
    var query = this.$route.query;
    console.log(query);
    if (query.flag) {
      this.formData.textMode = true;
      this.model = { ...query };
    } else {
      this.model = { ...query };
    }
  },
  mounted() {},
  computed: {
    Form() {
      return this.$refs[this.formData.ref];
    }
  }
};
</script>

<style  scoped lang="less">
</style>
