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
            <!-- 编辑保存 -->
            <el-button
              v-if="$route.query.mark == 'edit'"
              type='primary'
              @click="editSave(obj)"
            >保存</el-button>
            <!-- 添加保存 -->
            <el-button
              v-if="$route.query.mark == 'add'"
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
const topTitle = {
  add: {
    title: "添加  其他情况"
  },
  edit: {
    title: "编辑 其他情况"
  },
  detail: {
    title: "其他情况详细信息"
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
        //     label: "添加 其他情况",
        //     prop: "group",

        //   }
        // ]
        forms: [
          //  实测项目 	 projectName
          {
            label: "实测项目",
            prop: "projectName",
            type: "input",
            offset: 6,
            rules: [
              {
                required: true,
                message: "必填"
              }
            ]
          },
          // 描述 	 description
          {
            label: "描述",
            prop: "description",
            type: "text",
            offset: 6,
            rules: [
              {
                required: true,
                message: "必填"
              }
            ]
          },

          // 照片 	 photoFile
          {
            label: "照片",
            prop: "photo",
            type: "upload",
            offset: 6,
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
            tip: "只能上传jpg/png文件。",
            listType: "picture-card",
            dataType: "string",
            propsHttp: {
              name: "fileName",
              url: "fileUrl",
              res: "data"
            },
            rules: [
              {
                required: true,
                message: "添加照片"
              }
            ]
          },
          // 情况说明 	 description_
          {
            type: "textarea",
            label: "情况说明",
            prop: "details",
            clearable: true,
            maxlength: 255,
            minRows: 8,
            offset: 6,
            showWordLimit: true
          },
          {
            prop: "btn",
            formslot: true,
            span: 10,
            offset: 6
          }
        ]
      }
    };
  },
  methods: {
    submit(model, done) {
      norbulingka
        .insertOthers(model)
        .then(res => {
          this.$message({
            type: "success",
            message: "添加成功！"
          });
          this.$router.back();
        })
        .finally(res => {
          done();
        });
    },
    // 编辑保存
    editSave() {
      this.Form.getFormModel(res => {
        delete res.mark;
        norbulingka
          .updateOthers(res)
          .then(res => {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.$router.back();
          })
          .finally();
      });
    },
    // 添加保存
    addSave(obj) {
      this.Form.submit();
    },
    // 返回
    back(obj) {
      this.$router.back();
    },
    // 数据
    getFormData(arg) {
      norbulingka.queryOthersByPage({ id: arg }).then(res => {
        this.model = { ...this.model, ...res.list[0] };
        console.log("list", res.list);
      });
    }
  },
  created() {
    if (Object.keys(this.$route.query).length !== 0) {
      // var query = this.$route.query;
      let { id, flag } = this.$route.query;
      if (id) {
        this.getFormData(id);
      }
    }
    var query = this.$route.query;
    console.log(query);
    if (query.mark === "detail") {
      this.formData.textMode = true;
      // this.model = { ...query };
      this.title = topTitle[query.mark].title;
    } else {
      // this.model = { ...query };
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
.toptitle {
  span {
    padding: 0 15px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>