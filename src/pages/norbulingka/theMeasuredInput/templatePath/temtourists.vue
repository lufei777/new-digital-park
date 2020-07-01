<template>
      <div class='panel-container'>
    <div class= 'panel'>
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
import { del } from '../../../../service/axios/ApiDecorator';
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
            minRows:0,
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
            minRows:0,
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
            prop: "photo",
            type: "upload",
            offset: 6,
            accept: ["jpg", "jpeg", "png"],
             action:'/oaApi/image/upload',
            tip: "只能上传jpg/png文件。",
            dataType:'string',
            listType:'picture-card',
            propsHttp:{
              name:'fileName',
              url:'fileUrl',
              res:'data'
            },
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
            span: 10,
            offset: 6
          }
        ]
      }
    };
  },
  methods: {
    submit(model,done) {
     norbulingka.insertTourist(model).then(res =>{
        this.$message({
          type:'success',
          message:'添加成功！'
        })
        this.$router.back()
     }).finally(res => {
       done()
     })
    },
    // 编辑保存
    editSave() {
      this.Form.getFormModel(res => {
        delete res.mark
         norbulingka.updateTourist(res).then(res => {
            this.$message({
              type: "success",
              message: "编辑成功！"
            });
            this.$router.back();
          });
      })
     
    },
    //添加保存
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
