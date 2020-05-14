<template>
  <div class="message-publish-manage panel-container">
    <div class="condition-box radius-shadow  flex-wrap">
      <div class="item-group">
        <label for="">发布编号：</label>
        <el-input type="text" v-model="searchParams.releaseNumber"/>
      </div>
      <div class="item-group">
        <label for="">发布名称：</label>
        <el-input type="text" v-model="searchParams.releaseName"/>
      </div>
      <div class="item-group">
        <label for="">发布日期：</label>
        <el-date-picker
          v-model="searchParams.releaseTime"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="item-group">
        <el-button type="primary" @click="onClickSearchBtn">搜索</el-button>
        <el-button @click="onClickResetBtn">重置</el-button>
      </div>
    </div>

    <div class="warehouse-manage-table panel">
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary" @click="onClickMultiDelBtn">批量删除</el-button>
        <!--<el-button  type="primary">导出</el-button>-->
        <!--<el-button  type="primary">导入</el-button>-->
        <el-button type="primary" @click="onClickAddBtn">新增</el-button>
      </div>
      <z-table :ref="tableConfig.ref" :options="tableConfig">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="onClickEditBtn(row)">编辑</el-button>
          <el-button type="text" @click="onClickDelBtn(row)">删除</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
  import MessageManageApi from "@/service/api/messageManage";
  import CommonFun from '@/utils/commonFun'
  let pageInfo = {
    pageNum: 1,
    pageCount: 10
  }
  export default {
    name: "publishManage",
    data() {
      return {
        tableConfig: {
          ref: "tableConfig",
          serverMode: {
            url: MessageManageApi.getReleaseList,
            data: pageInfo
          },
          propsHttp: {
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          columnConfig: [
            {label: "发布编号", prop: "releaseNumber"},
            {label: "发布名称", prop: "releaseName"},
            {
              label: "信息类型", prop: "type",
              formatter:function () {
                 return "文字"
              }
            },
            {label: "发布日期", prop: "releaseTime"},
            {label: "备注", prop: "remark"}
          ],
          operation: true,
          customTop: true,
          uiConfig: {
            height: "auto", //"", //高度
            selection: true, //是否多选
          },
        },
        searchParams: {
          releaseNumber: '',
          releaseName: '',
          releaseTime: ''
        },
        curId:''
      };
    },
    computed:{
      params(){
        return {...pageInfo, ...this.searchParams}
      }
    },
    watch:{
      params(){
        this.tableConfig.serverMode.data = this.params
      }
    },
    methods: {
      onClickAddBtn() {
        this.$router.push('/addMessage')
      },
      setTableData() {
        this.tableConfig.serverMode.data = {...pageInfo, ...this.searchParams}
      },
      onClickSearchBtn() {
        this.searchParams.releaseTime=  this.searchParams.releaseTime +' 00:00:00'
        this.setTableData()
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      onClickResetBtn() {
        this.searchParams = {
          releaseNumber: '',
          releaseName: '',
          releaseTime: ''
        }
        this.setTableData()
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      onClickDelBtn(row){
        this.curId = row.id;
        this.showDeleteTip();
      },
      onClickMultiDelBtn(){
        let tmp = this.$refs[this.tableConfig.ref].getSelectedData()
        this.curId = tmp.map((item)=>item.id).join(",")
        CommonFun.deleteTip(this, this.curId, "请至少选择一条信息！", this.sureDelete);
      },
      showDeleteTip() {
        CommonFun.deleteTip(this, this.curId, "请至少选择一条信息！", this.sureDelete);
      },
      async sureDelete(){
        await MessageManageApi.delRelease({
          id:this.curId
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.curId = ''
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      onClickEditBtn(row){
        this.$router.push(`/addMessage?id=${row.id}`)
      }
    },
    created() {
      // this.setTableData()
    },
    mounted() {
    }
  };
</script>

<style lang="less">
  .message-publish-manage {
    .condition-box {
      padding: 20px 20px 0 20px;
      margin-bottom: 20px;
      /*display: flex;*/
      /*!*flex-direction: row;*!*/
      /*flex-wrap: wrap;*/

      .item-group {
        margin-bottom: 20px;
      }
    }
  }
</style>
