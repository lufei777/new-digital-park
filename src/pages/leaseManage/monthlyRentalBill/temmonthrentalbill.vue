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
            <!-- 添加保存 -->
            <el-button
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
import LeaseManageApi from "@/service/api/leaseManage";
import CommonFun from "@/utils/commonFun";
let pageInfo = {
  pageNum: 1,
  pageSize: 10
};
export default {
  data() {
    return {
      // 区别模板的标题
      title: "新增租赁月账单",
      // 租户名称
      tentList: [],

      model: {},
      formData: {
        ref: "formData",
        size: "medium",
        labelWidth: "140",
        menuPosition: "right",
        menuBtn: false,
        textMode: false,
        forms: [
          // 租赁月账单编号
          {
            type: "input",
            prop: "billNumber",
            label: "账单编号",
            span: 8,
            offset: 4,
            disabled: true,
            rules: {
              required: true
            }
            // placeholder:'11111',
            // tip: "不可更改项",
            // tipPlacement: "top"
          },
          // 租户类型
          {
            type:'select',
            prop:'tenant',
            label:'租户类型',
            span:8,
            dicData:[
              {label:'内租户',value:1},
              {label:'外租户',value:2}
            ],
          },
          // 租户名称
          {
            type: "select",
            prop: "tenantNumber",
            dataType:'string',
            label: "租户名称",
            span: 8,
             offset: 4,
            props: {
              label: "tenantName",
              value: "tenantNumber"
            },
            // dicData:[
            //   {label:'内租户',value:'1'},
            //   {label:'外租户',value:'2'}
            // ],
            rules: {
              required: true
            }
            // offset:1,
            // disabled: true,
            // tip: "不可更改项",
            // tipPlacement: "top"
          },

          // 合同编号
          {
            type: "select",
            prop: "contractNumber",
            label: "合同名称",
            span: 8,
            // offset: 4,
            dataType:'string',
            rules: {
              required: true
            },
            props: {
              label: "contractName",
              value: "contractNumber"
            }
            // disabled: true,
            // tip: "不可更改项",
            // tipPlacement: "top"
          },

          // 账期
          {
            type: "month",
            prop: "billTime",
            label: "账期",
            span: 8,
             offset: 4,
            format: "yyyy-MM",
            valueFormat: "yyyy-MM",
            rules: {
              required: true
            },
            // offset:1,
          },

          // 核定金额
          // {
          //   type: "number",
          //   prop: "approvedAmount",
          //   label: "核定金额",
          //   span: 8,
          //   minRows: 0,
          //   // offset: 4
          // },

          // 上次预付款余额
          // {
          //   type: "number",
          //   prop: "lastPrepay",
          //   label: "账单金额合计",
          //   disabled:true,
          //   minRows: 0,
          //   span: 8,
          //    offset: 4,
          //   // append: "（元）"
          //   // offset:1,
          // },

          // 账单状态
          // {
          //   type: "input",
          //   prop: "billStatus",
          //   label: "账单状态",
          //   span: 8,
          //   offset: 4
          // },

          // 冲抵额（元）
          {
            type: "number",
            prop: "offsset",
            label: "冲抵额",
            span: 8,
            minRows: 0,
            // offset: 4
            // append: "（元）"
            // offset:1,
          },

          // 本次预存款余额
          {
            type: "number",
            prop: "prepay",
            label: "本次预存款余额",
            minRows: 0,
            span: 8,
            offset: 4,
            row:true,
            // offset: 4,
            // append: "（元）"
          },
          // 按钮
          {
            prop: "btn",
            formslot: true,
            span: 8,
            offset: 8
          }
        ]
      }
    };
  },
  methods: {
    submit(model, done) {
      LeaseManageApi.addMonthBill(model)
        .then(res => {
          this.$message({
            type: "success",
            message: "增加成功！"
          });
          this.$router.push("monthlyrentalbill");
        })
        .finally(() => {
          done();
        });
    },
    // 添加保存
    addSave(obj) {
      this.Form.submit();
    },

    // 返回
    back(obj) {
      this.$router.back();
    }
  },
  watch: {
    "model.tenantNumber": {
      handler(newval, oldval) {
        let arr = {};
        console.log("1", newval);
        if (typeof newval == "string") {
          this.tentList.forEach(item => {
            if (item.tenantNumber == newval) {
              arr = item;
              // 设置合同名称
              LeaseManageApi.queryContractByNumber({
                tenantId: item.tenantId
              }).then(res => {

                this.model.contractNumber = "";
                this.Form.setColumnByProp("contractNumber", {
                  dicData: res
                });
              });
            }
          });
        }
        console.log("2", oldval);
      },
      deep: true
    }
  },
  created() {
    // 合同编号
    // LeaseManageApi.queryContractByNumber().then(res => {});
    //  账单编号
    LeaseManageApi.createTenNum({ numType: 4 }).then(res => {
      this.model.billNumber = res;
    });
    // 租户名称
    LeaseManageApi.tenantList().then(res => {
      this.tentList = res;
      this.Form.setColumnByProp("tenantNumber", {
        // placeholder:res
        dicData: res
      });
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
