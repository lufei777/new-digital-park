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
    title: "添加  游客情况"
  },
  edit: {
    title: "编辑 游客情况"
  },
  detail: {
    title: "游客情况 详情"
  }
};
export default {
  data() {
    return {
      title:'模板',
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
        //     label: "添加 游客情况",
        //     prop: "group",

        //   }
        // ]
        forms: [
          //  日游客量 	 dailyCount
          {
            label: "日游客量",
            prop: "dailyCount",
            type: "number",
            offset: 6,
            rules:[
              {
                required:true,
                message:'必填日游客量'
              }
            ]
          },
          // 瞬时游客量 	 tempCount
          {
            label: "瞬时游客量",
            prop: "tempCount",
            type: "number",
            offset: 6,
            rules:[
              {
                required:true,
                message:'必填瞬时游客量'
              }
            ]
          },

          // 客流高峰时段现场照片 	 photoFile
          {
            label: "客流高峰时段现场照片",
            prop: "photoFile",
            type: "upload",
            offset: 6,
            accept: ["jpg", "jpeg", "png"],
             action:'/oaApi/image/upload',
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
        if(Object.keys(res).length === 0){
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
       this.title = topTitle[query.mark].title;
      this.model = { ...query };
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
