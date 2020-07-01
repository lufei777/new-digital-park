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
            <!-- 编辑的保存 -->
            <el-button
              type='primary'
              v-if="$route.query.mark == 'edit'"
              @click="editSave"
            >保存</el-button>
            <!-- 添加的保存 -->
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
// 导入接口
import norbulingka from "@/service/api/norbulingka";
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
            rules: [
              {
                message: "必填",
                required: true
              }
            ],
            dicUrl: norbulingka.getSelectOption,
            dicQuery: { catalogId: 16001 },
            props: {
              label: "name",
              value: "id"
            }
          },
          // 巡检人员 : person
          {
            label: "巡检人员",
            prop: "person",
            type: "input",
            offset: 6,
            rules: [
              {
                message: "必填",
                required: true
              }
            ],
            // dicUrl: norbulingka.userNameList,
            // props: {
            //   label: "name",
            //   value: "id"
            // }
          },
          // 照片 : photoFile
          {
            label: "照片",
            prop: "photo",
            type: "upload",
            offset: 6,
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
            dataType: "string",
            listType: "picture-card",
            propsHttp: {
              name: "fileName",
              url: "fileUrl",
              res: "data"
            },
            // props: {
            //   label: "contractPictureName",
            //   value: "contractPictureUrl"
            // },
            
            // tip: "只能上传jpg/png文件。",
            rules: [
              {
                required: true,
                message: "必填"
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
            minRows: 6,
            offset: 6,
            showWordLimit: true
          },
          // 处理情况 : result
          {
            type: "textarea",
            label: "处理情况",
            prop: "result",
            clearable: true,
            maxlength: 255,
            minRows: 6,
            offset: 6,
            showWordLimit: true
          },
          {
            prop: "btn",
            formslot: true,
            span: 10,
            offset: 7
          }
        ]
      }
    };
  },
  methods: {
    submit(model, done) {
      norbulingka
        .addDailyCheck(model)
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
    // 编辑保存
    editSave(obj) {
      this.Form.getFormModel(res => {
        console.log("保存", res);
        let params = res;
        // 判断必填字段是否为空 没填情况下阻止跳转
        if (Object.keys(res).length === 0) {
          return false;
        } else {
          delete params.mark;
          let str = "";
          if (params.photoFile && Object.values(params.photoFile).length >= 1) {
            params.photoFile.forEach(item => {
              let picurl = item.value;
              var index = picurl.lastIndexOf("/");
              picurl = picurl.substring(index + 1);
              str = str + picurl + ",";
            });
          }
          delete params.photoFile;
          params["photo"] = str;
          norbulingka.updateDailyCheck({ ...params }).then(res => {
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
    addSave() {
      this.Form.submit();
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
    // if(query.photo){
    //   this.$nextTick(() => {

    //   })
    // }
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
