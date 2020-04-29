<template>
  <div class="personal-information radius-shadow panel-container">
    <div class="form-box">
      <z-form :ref="formData.ref" :options="formData" v-model="formModel" @submit="submit">
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
import SystemManageApi from '@/service/api/systemManage'
import { CommonDic } from '@/utils/dictionary'
import { mapState } from 'vuex'
export default {
  name: 'PersonalInformation',
  data() {
    let validTelephone = (rule, value, callgoBack) => {
      let reg = /^1[3|4|5|7|8]\d{9}$/;
      if (reg.test(value) || value == "") {
        callgoBack();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    let validMail = (rule, value, callback) => {
      let reg = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱"));
      }
    };
    return {
      formModel: {
      },
      formData: {
        ref: "formRef",
        size: "medium",
        menuPosition: "left",
        emptyBtn: false,
        forms: [
          {
            type: "input",
            label: "姓名",
            prop: "name",
            clearable: true,
            span: 24,
            rules: {
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }
          },
          {
            type: "upload",
            listType: "picture-img",
            label: "头像",
            prop: "headUrl",
            span: 24,
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
            propsHttp: {
              name: "fileName",
              url: "fileUrl",
              res: "data"
            }
          },
          {
            type: "radio",
            label: "性别",
            prop: "sex",
            valueDefault: '1',
            span: 24,
            dicData: CommonDic.sexDic
          },
          {
            type: "input",
            label: "邮箱",
            prop: "mail",
            clearable: true,
            span: 24,
            rules: {
              validator: validMail,
              trigger: "blur"
            }
          },
          {
            type: "input",
            label: "手机号",
            prop: "phone",
            clearable: true,
            span: 24,
            rules: {
              validator: validTelephone,
              trigger: "blur",
            }
          }]
      }
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    async submit(model, hide) {
      await SystemManageApi.editPersonInformation(this.formModel)
        .then(res => {
          this.$message({
            type: "success",
            message: res
          });
          this.$store.dispatch('user/getUserInfo');
        }).finally(e => {
          hide()
        })
    },
    async getUserInfo() {
      let res = await this.$store.dispatch('user/getUserInfo');
      this.formModel = res
    },
    goBack() {
      if (Cookies.get('moduleType') == 2) {
        this.$router.push('/digitalPark/homePage')
      } else {
        this.$router.push('/digitalPark/dashboardHomePage')
      }
    }
  },
  mounted() {
  },
  created() {
    this.getUserInfo()
  },
}
</script>
<style lang="less">
.personal-information {
  .form-box {
    padding: 20px 0;
    width: 350px;
    margin: 0 auto;
  }
}
</style>
