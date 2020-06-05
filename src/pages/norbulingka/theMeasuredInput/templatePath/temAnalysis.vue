<template>
      <div class='panel-container'>
    <div class="panel">
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
            rules:[
              {
                required:true,
                message:'必填'
              }
            ]
          },
          // 病害分类 : damageType1
          {
            label: "病害分类",
            prop: "damageType1",
            type: "select",
            offset: 6,
            dicData: Norbulingka.diseasesSort
          },
          // 病害类型 : damageType
          {
            label: "病害类型",
            prop: "damageType",
            type: "select",
            offset: 6,
            dicData: Norbulingka.diseaseType
          },
          // 病害状态图 : photoFile
          {
            label: "照片",
            prop: "photoFile",
            type: "upload",
            offset: 6,
            action:'/oaApi/image/upload',
            accept: ["jpg", "jpeg", "png"],
            tip: "只能上传jpg/png文件。",
            rules:[
              {
                required:true,
                message:'添加照片'
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
    submit(obj) {
      console.log(obj);
    },
    // 保存
    save(obj) {
      // console.log(obj);
      // this.$router.back();
      this.Form.getFormModel(res => {
        if(Object.keys(res.photoFile).length === 0){
            return false
        }else{
          this.$router.back();
        }
      })
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
      this.title = topTitle[query.mark].title
    } else {
      this.model = { ...query };
      this.title = topTitle[query.mark].title
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
.toptitle{
  span{
    padding: 0 15px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
