<template>
  <div class="add-message-panel radius-shadow">
    <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
    <div class="form-box">
      <z-form :ref="formConfig.ref" :options="formConfig" v-model="formModel" @submit="submit">
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">返回</el-button>
        </template>
        <template slot="textContent">
          <div class="edit_container">
            <quill-editor v-model="formModel.textContent"
                          ref="myQuillEditor"
                          class="content-editor"
                          :options="editorOption" @ready="onEditorReady($event)">
            </quill-editor>
          </div>
        </template>
      </z-form>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import MessageManageApi from "@/service/api/MessageManage";
  import {isYD} from "@/utils/project";
  import moment from 'moment'
  export default {
    name: "AddMessage",
    data() {
      let _this = this
      let rePasswordVaild = (rule, value, callback) => {
        if (value.trim() == "") {
          callback(new Error("请再次输入新密码"));
        } else if (value != this.formModel.newPassword1) {
          callback(new Error("两次新密码不一致"));
        } else {
          callback();
        }
      };
      return {
        formModel: {},
        formConfig: {
          ref: "formRef",
          size: "medium",
          menuPosition: "center",
          labelWidth: 150,
          emptyBtn: false,
          forms: [
            {
              type: "input",
              label: "发布编号",
              prop: "releaseNumber",
              valueDefault:'FB-111',
              disabled:true,
              span: 12,
              rules: {
                required: true,
                message: "请输入原密码",
                trigger: "blur"
              }
            },
            {
              type: "datetime",
              label: "创建时间",
              prop: "releaseTime",
              span: 12,
              valueDefault:new Date(moment(new Date).format('YYYY-MM-DD HH:MM:SS')),
              rules: {
                required: true,
                trigger: "blur"
              }
            },
            {
              type: "input",
              label: "发布名称",
              prop: "releaseName",
              span: 12,
              rules: {
                required: true,
                // message: "请输入新密码",
                trigger: "blur"
              }
            },
            {
              type: "input",
              label: "显示设备",
              prop: "displayDevice",
              valueDefault:'设备一',
              disabled:true,
              span: 12,
              rules: {
                required: true,
                // validator: rePasswordVaild,
                trigger: "blur"
              }
            },
            // {
            //   type: "select",
            //   label: "显示设备",
            //   prop: "deviceId",
            //   props: {
            //     label: "name",
            //     value: "id"
            //   },
            //   dicData:[{
            //     name:'设备一',
            //     id:1
            //   }],
            //   valueDefault:1,
            //   span: 12,
            //   rules: {
            //     required: true,
            //     // validator: rePasswordVaild,
            //     trigger: "blur"
            //   }
            // },
            // {
            //   type: "select",
            //   label: "显示区域",
            //   prop: "displayArea",
            //   props: {
            //     label: "name",
            //     value: "id"
            //   },
            //   dicData:[{
            //     name:'系统首页banner位',
            //     id:1
            //   }],
            //   valueDefault:1,
            //   span: 12,
            //   rules: {
            //     required: true,
            //     // validator: rePasswordVaild,
            //     trigger: "blur"
            //   }
            // },
            {
              type: "input",
              label: "显示区域",
              prop: "displayArea",
              valueDefault:'系统首页banner',
              disabled:true,
              span: 12,
              rules: {
                required: true,
                // validator: rePasswordVaild,
                trigger: "blur"
              }
            },
            {
              type: "textarea",
              label: "备注",
              prop: "remark" ,
              // placeholder: "备注",
              span: 24,
              rules: {
                // required: true,
                // validator: rePasswordVaild,
                trigger: "blur"
              }
            },
            {
              type: "upload",
              listType: "picture",
              label: "选择封面",
              prop: "coverUrl" ,
              action: "/oaApi/image/upload",
              accept: ["jpg", "jpeg", "png"],
              limit:1,
              props: {
                label: "tenantPictureName",
                value: "tenantPictureUrl"
              },
              propsHttp: {
                name: "fileName",
                url: "fileUrl",
                res: "data"
              },
              span: 24,
              rules: {
                required:true,
                trigger: "blur"
              }
            },
            {
              type: "radio",
              label: "是否有链接内容",
              prop: "showLink" ,
              props: {
                label: "value",
                value: "id"
              },
              dicData:[{
                value:'是',
                id:"1"
              },{
                value:'否',
                id:"0"
              }],
              valueDefault:"0",
              span: 24,
              rules: {
                trigger: "blur"
              },
              'change':_this.onLinkRadioChange
            },
            {
              label: "内容",
              prop: "textContent",
              span: 24,
              formslot: true,
              rules:{
                trigger:'blur'
              }
            },
          ]
        },
        editorOption:{

        }
      };
    },
    computed:{
      isyd(){
        return isYD()
      }
    },
    methods: {
      async submit(model, hide) {
        console.log(this.formModel)
        await MessageManageApi.addMessage(this.formModel)
          .then(res => {
            this.$message({
              type: "success",
              message: res
            });
          })
          .finally(msg => {
            hide();
          });
      },
      goBack() {
        history.go(-1)
      },
      onEditorReady(){

      },
      onLinkRadioChange(obj){
        console.log(obj)
        this.$refs[this.formConfig.ref].setColumnByProp("textContent", {
          display: obj.value==1,
          rules:{
            required:true
          }
        });
      },
      async getReleaseCode(){
        let res = await MessageManageApi.getReleaseCode()
        this.formModel.releaseNumber = res
      }
    },
    created(){
    },
    mounted() {
      this.getReleaseCode()
      this.$refs[this.formConfig.ref].setColumnByProp("textContent", {
        display: this.formModel.showLink==1,
      });
    },
  };
</script>
<style lang="less">
  .add-message-panel {
    height: 100%;
    /*overflow: auto;*/
    .form-box {
      width: 50%;
      margin: 0 auto;
      padding: 20px 0;
    }
    .content-editor{
      height:500px;
      margin-bottom: 100px;
    }
  }
</style>
