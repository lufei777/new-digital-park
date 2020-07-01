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
    title: "添加  考古发现"
  },
  edit: {
    title: "编辑 考古发现"
  },
  detail: {
    title: "考古发现 详情"
  }
};
export default {
  data() {
    return {
      title: "模板名称",
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
        //     label: "添加 考古发现",
        //     prop: "group",

        //   }
        // ]
        forms: [
          //  工程名称 	 projectName
          {
            label: "工程名称",
            prop: "projectName",
            type: "input",
            offset: 6,
            rules: [
              {
                required: true,
                message: "请输入工程名称",
                trigger: "blur"
              }
            ]
          },
          // 发掘次数 	 number
          {
            label: "发掘次数",
            prop: "number",
            type: "number",
            minRows:0,
            offset: 6,
            rules: [
              {
                required: true,
                message: "请输入数字",
                trigger: "blur"
              }
            ]
          },
          // 发掘面积 	 area
          {
            label: "发掘面积",
            prop: "area",
            type: "number",
            minRows:0,
            offset: 6,
            rules: {
              required: true,
              message: "请输入数字",
              trigger: "blur"
            }
          },

          // 现场照片 	 photoFile
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
            span: 10,
            offset: 9
          }
        ]
      }
    };
  },
  methods: {
    submit(model,done) {
      norbulingka
        .insertArchaeology(model)
        .then(res => {
          this.$message({
            type: "success",
            message: "添加成功！"
          });
          this.$router.back();
        })
        .finally(() => {
          done();
        });
    },
    //  编辑保存
    editSave() {
      this.Form.getFormModel(res => {
        console.log("保存", res);
        let params = res;
        // 判断必填字段是否为空 没填情况下阻止跳转
        if (Object.keys(res).length === 0) {
          return false;
        } else {
          // delete params.mark;
          // let str = "";
          // if (params.photoFile && Object.values(params.photoFile).length >= 1) {
          //   params.photoFile.forEach(item => {
          //     let picurl = item.value;
          //     var index = picurl.lastIndexOf("/");
          //     picurl = picurl.substring(index + 1);
          //     str = str + picurl + ",";
          //   });
          // }
          // delete params.photoFile;
          // params["photo"] = str;
          norbulingka.updateArchaeology({ ...params }).then(res => {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.$router.back();
          });
        }
      });
    },
    // 添加保存
    addSave(obj) {
      this.Form.submit()
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
.toptitle {
  span {
    padding: 0 15px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
