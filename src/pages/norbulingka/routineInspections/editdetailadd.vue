<template>
      <div class='panel-container'>
    <div class="panel">
      <!-- 标题 -->
      <div class="toptiltle">
        <span>{{title}}</span>
        <el-divider></el-divider>
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
            <el-button
            v-if="$route.query.mark !== 'detail'"
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
const topTitle = {
  add: {
    title: "添加 日常巡查"
  },
  edit: {
    title: "编辑 日常巡查"
  },
  detail: {
    title: "日常巡查 详情"
  }
};
export default {
  data() {
    return {
      title: "模板",
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "100",
        menuPosition: "right",
        menuBtn: false,
        textMode: false,
        // group: [
        //   {
        //     label: "添加日常巡查",
        //     prop: "group",

        //   }
        // ]
        forms: [
          // 类型 : checkType
          {
            label: "类型",
            prop: "checkType",
            type: "select",
            offset: 6,
            rules:[
                {
                  message:'必填',
                  required:true,
                }
            ],
            dicData: [
              { label: "安全事故记录", value: 0 },
              { label: "群体事件记录", value: 1 },
              { label: "保养与维护工程记录", value: 2 }
            ]
          },
          // 巡检人员 : person
          {
            label: "巡检人员",
            prop: "person",
            type: "select",
            offset: 6,
            rules:[
                {
                  message:'必填',
                  required:true,
                }
            ],
            dicData: [
              { label: "admine", value: 0 },
              { label: "访客", value: 1 },
              { label: "审计", value: 2 }
            ]
          },
          // 照片 : photoFile
          {
            label: "照片",
            prop: "photoFile",
            type: "upload",
            offset: 6,
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
            tip: "只能上传jpg/png文件。",
            rules:[
              {
                required:true,
                message:'必填'
              }
            ]
          },
          // 描述 : description
          {
            type: "textarea",
            label: "描述",
            prop: "description",
            clearable: true,
            maxlength: 255,
            minRows: 8,
            offset: 6,
            showWordLimit: true,
          },
          // 处理情况 : result
          {
            type: "textarea",
            label: "处理情况",
            prop: "result",
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
      // console.log(obj);
      this.Form.getFormModel(res => {
        // console.log("保存", res);
        // 判断必填字段是否为空 没填情况下阻止跳转
        if (Object.keys(res).length === 0) {
          return false;
        } else {
          this.$router.back();
        }
      });
    },
    // 返回
    back(obj) {
      this.$router.back();
    }
  },
  created() {
    var query = this.$route.query;
    // console.log(query);
    if (query.flag) {
      this.formData.textMode = true;
      this.model = { ...query };
      this.title = topTitle[query.mark].title;
    } else {
      this.model = { ...query };
      this.title = topTitle[query.mark].title;
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
<style lang="less" scoped>
.toptiltle {
  span {
    padding: 0 15px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
