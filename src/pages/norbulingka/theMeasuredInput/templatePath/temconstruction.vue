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
    title: "添加  施工情况"
  },
  edit: {
    title: "编辑 施工情况"
  },
  detail: {
    title: "施工情况 详情"
  }
};
export default {
  data() {
    return {
      title: "模板标题",
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
        //     label:'添加 施工情况',
        //     prop:'group',

        //   }
        // ]
        forms: [
          // 项目名称 	 projectName
          {
            label: "项目名称",
            prop: "projectName",
            type: "input",
            offset: 6,
            rules:[
              {
                required:true,
                message:'必填'
              }
            ]
          },
          // 工程分类 	 projectType
          {
            label: "工程分类",
            prop: "projectType",
            type: "select",
            offset: 6,
            dicData: [
              { label: "文物维修", value: 0 },
              { label: "现场展示", value: 1 },
              { label: "环境整治", value: 2 }
            ]
          },
          // 开始时间 	 startTime
          {
            label: "开始时间",
            prop: "startTime",
            type: "date",
            offset: 6,
            rules:[
              {
                required:true,
                message:'必填'
              }
            ]
          },
          // 结束时间 	 endTime
          {
            label: "结束时间",
            prop: "endTime",
            type: "date",
            offset: 6,
            rules:[
              {
                required:true,
                message:'必填'
              }
            ]
          },
          // 照片 	     photoFile
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
.toptitle {
  span {
    padding: 0 15px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
