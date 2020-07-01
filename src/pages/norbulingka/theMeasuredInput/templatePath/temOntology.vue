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
    title: "添加  本体情况"
  },
  edit: {
    title: "编辑 本体情况"
  },
  detail: {
    title: "本体情况 详情"
  }
};
export default {
  data() {
    return {
      // 区别模板的标题
      title: "模板",
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "140",
        menuPosition: "right",
        menuBtn: false,
        textMode: false,
        // group: [
        //   {
        //     label: "添加 本地情况",
        //     prop: "group",

        //   }
        // ]
        forms: [
          // 文物本体	parentId
          {
            label: "文物本体",
            prop: "parentId",
            type: "select",
            offset: 6,
            props: {
              label: "name",
              value: "id"
            },
            // dicData: Norbulingka.ontology,
            rules: [
              {
                required: true,
                message: "必填项",
                trigger: "blur"
              }
            ]
          },
          // 评估	evaluation
          {
            label: "评估",
            prop: "evaluation",
            type: "select",
            offset: 6,
            props: {
              label: "name",
              value: "id"
            }
          },
          // 遗产要素保存状态	protectStatus
          {
            label: "遗产要素保存状态",
            prop: "protectStatus",
            type: "select",
            offset: 6,
            props: {
              label: "name",
              value: "id"
            }
          },
          // 照片 : photoFile
          {
            label: "照片",
            prop: "photo",
            type: "upload",
            offset: 6,
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
            tip: "只能上传jpg/png文件。",
            dataType: "string",
            listType: "picture-card",
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
          // 情况说明 : description
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
    submit(model, done) {
      norbulingka
        .insertBuildingsPhoto(model)
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
    // 添加保存
    addSave(obj) {
      this.Form.submit();
    },
    // 编辑保存
    editSave(obj) {
      this.Form.getFormModel(res => {
        console.log("保存", res);
        let params = res;
        // 判断必填字段是否为空 没填情况下阻止跳转
        delete params.mark;
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
        norbulingka.updatBuildingsPhoto({ ...params }).then(res => {
          this.$message({
            type: "success",
            message: "编辑成功！"
          });
          this.$router.back();
        });
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

    //设置下拉框
    norbulingka
      .getSelectOptionOther({ catalogId: 17001, parentId: 0 })
      .then(res => {
        this.Form.setColumnByProp("parentId", {
          dicData: res
        });
        // this.Tables.setColumnByProp("parentId", {
        //   dicData: res
        // });
      });
    //   norbulingka.getSelectOption({ catalogId: 16001 }).then(res => {
    //   this.Form.setColumnByProp("checkType", {
    //     dicData: res
    //   });
    //   this.Tables.setColumnByProp("checkType", {
    //     dicData: res
    //   });
    // });

    // 评估状态
    norbulingka
      .getSelectOptionOther({ catalogId: 18001, parentId: 0 })
      .then(res => {
        this.Form.setColumnByProp("evaluation", {
          dicData: res
        });
        // this.Tables.setColumnByProp("evaluation", {
        //   dicData: res
        // });
      });
    // 保存状态
    norbulingka
      .getSelectOptionOther({ catalogId: 19001, parentId: 0 })
      .then(res => {
        this.Form.setColumnByProp("protectStatus", {
          dicData: res
        });
        // this.Tables.setColumnByProp("protectStatus", {
        //   dicData: res
        // });
      });
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
