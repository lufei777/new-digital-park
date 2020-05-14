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
                            class="content-editor ql-editor"
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
  import MessageManageApi from "@/service/api/messageManage";
  import {isYD} from "@/utils/project";
  import moment from 'moment'

  export default {
    name: "AddMessage",
    data() {
      let _this = this
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
              disabled: true,
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
              valueDefault: new Date(),
              valueFormat: 'yyyy-MM-dd hh:mm:ss',
              format:"yyyy-MM-dd hh:mm:ss",
              span: 12,
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
              valueDefault: '设备一',
              disabled: true,
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
              valueDefault: '系统首页banner',
              disabled: true,
              span: 12,
              rules: {
                required: true,
                trigger: "blur"
              }
            },
            {
              type: "textarea",
              label: "备注",
              prop: "remark",
              span: 24,
              maxlength: 10,
              showWordLimit: true,
              rules: {
                trigger: "blur"
              }
            },
            {
              type: "upload",
              listType: "picture-img",
              label: "选择封面",
              prop: "coverUrl",
              action: "/oaApi/image/upload",
              accept: ["jpg", "jpeg", "png"],
              tip: "推荐大小：1920*360",
              propsHttp: {
                name: "fileName",
                url: "fileUrl",
                res: "data"
              },
              span: 24,
              rules: {
                required: true,
                trigger: "blur"
              }
            },
            {
              type: "radio",
              label: "是否有链接内容",
              prop: "showLink",
              props: {
                label: "value",
                value: "id"
              },
              dicData: [{
                value: '是',
                id: "1"
              }, {
                value: '否',
                id: "0"
              }],
              valueDefault: "0",
              span: 24,
              rules: {
                trigger: "blur"
              },
              'change': _this.onLinkRadioChange
            },
            {
              label: "内容",
              prop: "textContent",
              span: 24,
              formslot: true,
              rules: {
                trigger: 'blur'
              }
            },
          ]
        },
        editorOption: {},
        value3: new Date()
      };
    },
    computed: {
      isyd() {
        return isYD()
      },
      curId() {
        return this.$route.query.id
      }
    },
    methods: {
      async submit(model, hide) {
        console.log(this.formModel)
        if (this.formModel.showLink == 0) {
          this.formModel.textContent = ''
        }
        this.formModel.releaseTime = moment(this.formModel.releaseTime).format('YYYY-MM-DD HH:mm:SS')
        if (this.curId) {
          await MessageManageApi.editMessage(this.formModel)
            .then(res => {
              this.$message({
                type: "success",
                message: "修改成功！"
              });
            })
            .finally(msg => {
              hide();
            });
        } else {
          await MessageManageApi.addMessage(this.formModel)
            .then(res => {
              this.$message({
                type: "success",
                message: "发布成功！"
              });
            })
            .finally(msg => {
              hide();
            });
        }
        this.$router.push("/publishManage")
      },
      goBack() {
        history.go(-1)
      },
      onEditorReady() {

      },
      onLinkRadioChange(obj) {
        console.log(obj)
        this.$refs[this.formConfig.ref].setColumnByProp("textContent", {
          display: obj.value == 1,
          rules: {
            required: true
          }
        });
      },
      async getReleaseCode() {
        let res = await MessageManageApi.getReleaseCode()
        this.formModel.releaseNumber = res
      },
      async getMessageDetail() {
        let res = await MessageManageApi.getMessageDetail({
          id: this.curId
        })
        this.formModel = res
        this.formModel.showLink = res.textContent ? '1' : '0'
        this.$refs[this.formConfig.ref].setColumnByProp("textContent", {
          display: this.formModel.showLink == 1,
        });
      }
    },
    created() {
    },
    mounted() {
      if (this.curId) {
        this.getMessageDetail()
      } else {
        this.getReleaseCode()
        this.$refs[this.formConfig.ref].setColumnByProp("textContent", {
          display: this.formModel.showLink == 1,
        });
      }
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

    .content-editor {
      height: 500px;
      margin-bottom: 100px;
    }

    .zvue-form-wrapper .zvue-form-upload .picture-list .el-upload {
      border: none;
    }

    .zvue-form-wrapper .zvue-form-upload .avatar {
      width: 100%;
      /*height:100%;*/
    }
  }
</style>
