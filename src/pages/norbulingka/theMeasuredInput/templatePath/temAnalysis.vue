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
        @change="selectChanged"
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
// 导入接口
import norbulingka from "@/service/api/norbulingka";
import { Norbulingka } from "utils/dictionary";
const topTitle = {
  add: {
    title: "添加  病害分析"
  },
  edit: {
    title: "编辑 病害分析"
  },
  detail: {
    title: "病害分析 详情"
  }
};
let typeone = null;
export default {
  data() {
    return {
      // 病害类型
      diseasetypes: null,
      typeArr: [],
      title: "模板",
      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "180",
        menuPosition: "right",
        menuBtn: false,
        textMode: false,
        // group: [
        //   {
        //     label: "添加病害分析",
        //     prop: "group",

        //   }
        // ]
        forms: [
          // 病害位置 : damagePosition
          {
            label: "病害位置",
            prop: "damagePosition",
            type: "input",
            offset: 6,
            rules: [
              {
                required: true,
                message: "必填"
              }
            ]
          },
          // 病害分类 : damageType1
          {
            label: "病害分类",
            prop: "damageType1",
            type: "select",
            offset: 6,
            // ref: "inputone",
            // dicData: Norbulingka.diseasesSort,
            props: {
              label: "name",
              value: "id",
              children: "children"
            },
            handler: val => {
              console.log(val);
            }
          },
          // 病害类型 : damageType
          {
            label: "病害类型",
            prop: "damageType2",
            type: "select",
            offset: 6,
            props: {
              label: "name",
              value: "id"
            }
            // dicData: Norbulingka.diseaseType
          },
          // 病害状态图 : photoFile
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
        .insertDamage(model)
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
    addSave() {
      this.Form.submit();
    },
    // 编辑保存
    editSave() {
      this.Form.getFormModel(res => {
        console.log("编辑保存", res);
        let params = res;
        // 判断必填字段是否为空 没填情况下阻止跳转
        if (Object.keys(res).length === 0) {
          return false;
        } else {
          delete params.mark;
          norbulingka.updateDamage({ ...params }).then(res => {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.$router.back();
          });
        }
      });
    },
    // 保存
    save(obj) {
      // console.log(obj);
      // this.$router.back();
      this.Form.getFormModel(res => {
        if (Object.keys(res.photoFile).length === 0) {
          return false;
        } else {
          this.$router.back();
        }
      });
    },
    // 返回
    back(obj) {
      this.$router.back();
    },

    selectChanged(model) {
      var damageType1 = model.damageType1;
      // console.log(damageType1)
      let res = [];
      if (damageType1) {
        this.typeArr.forEach(item => {
          if (item.id === damageType1) {
            res = item;
            this.Form.setColumnByProp("damageType2", {
              // props:{},
              dicData: res.children
            });
          }
        });
      }
    },
    findObj(arr, val) {
      // debugger
      let objArr = null;
      arr.forEach(item => {
        if (item.id == val) {
          objArr = item;
        }
      });
      return objArr;
    },
    // 表格数据
    getFormData(arg) {
      norbulingka.queryDamageByPage({ id: arg }).then(res => {
        // 病害类型
        // debugger;
        this.diseasetypes = res.list[0].damageType1;
        // console.log("this.diseasetypes", this.diseasetypes);
        this.model = { ...this.model, ...res.list[0] };
        // console.log("list", res.list);
      });
      // this.selectList()
    },
    //下拉框的接口
    selectList() {
      norbulingka.getSelectOptionOther({ catalogId: 14001 }).then(res => {
        this.typeArr = res;
        // console.log(res);

        this.Form.setColumnByProp("damageType1", {
          dicData: res
        });
        // 获取病害分类的值 根据传递过来的值 为病害类型赋值
        // debugger
        console.log("this.diseasetypes", this.diseasetypes);

        console.log("this.diseasetypes", this.diseasetypes);
        if (this.diseasetypes != undefined && this.diseasetypes) {
          // console.log("this.typeArr", this.typeArr);
          var cc = this.findObj(this.typeArr, this.diseasetypes);
          console.log("cc", cc);
          console.log("this.diseasetypes", this.diseasetypes);
          this.Form.setColumnByProp("damageType2", {
            dicData: cc.children
          });
        }
      });
    }

  },
  created() {
    this.selectList()
    // 病害分类
    // debugger

    // var query = JSON.parse(this.$route.query);
    let info = JSON.parse(localStorage.getItem('ANALYSIS'))
    // console.log(JSON.parse(query.info));
    if (Object.keys(this.$route.query).length !== 0) {
      // var query = this.$route.query;
      let { id, flag } = this.$route.query;
      if (id) {
        this.getFormData(id);
        // console.log("this.diseasetypes", this.diseasetypes);
      }
    }
    var query = this.$route.query;
    if (query.mark === "detail") {
      this.formData.textMode = true;
      this.model = { ...info };
      this.title = topTitle[query.mark].title;
    } else {
      this.model = { ...info };
      this.title = topTitle[query.mark].title;
    }
    if(query.mark ==='add'){
      this.model ={ }
    }
    norbulingka.getSelectOptionOther({ catalogId: 14001 }).then(res => {
        this.typeArr = res;
        // console.log(res);

        this.Form.setColumnByProp("damageType1", {
          dicData: res
        });
        // 获取病害分类的值 根据传递过来的值 为病害类型赋值
        // debugger
        // console.log("this.diseasetypes", this.diseasetypes);

        // console.log("this.diseasetypes", this.diseasetypes);
        if (this.diseasetypes != undefined && this.diseasetypes) {
          // console.log("this.typeArr", this.typeArr);
          var cc = this.findObj(this.typeArr, info.damageType2);
          // console.log("cc", cc);
          
          // console.log("this.diseasetypes", this.diseasetypes);
          this.Form.setColumnByProp("damageType2", {
            dicData: cc.children
          });
        }
      });
    // this.$nextTick(() => {

    // });
  },
  watch: {
    "model.damageType1": {
      handler(val, old) {
        // console.log(typeof val);
        // console.log(typeof old);
        // console.log(val);
        // console.log(old);
        // console.log( old.length);
        // val != undefined && val != null
        // debugger
        if (typeof val === "number") {
          var child = null;
          this.typeArr.forEach(item => {
            if (item.id == val) {
              child = item;
              // this.model.damageType2 = "";
              this.Form.setColumnByProp("damageType2", {
                dicData: child.children
              });
            }
          });
        }
        if (typeof val == "string") {
          this.model.damageType2 = "";
          this.Form.setColumnByProp("damageType2", { dicData: [] });
        }
        if(val!==old){
          this.model.damageType2 = "";
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  computed: {
    // 获取表单
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
