<template>
  <div class="asset-use">
    <div class="asset-use-table-panel">
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary" @click="onClickMultiDelBtn">批量删除</el-button>
        <el-button type="primary" @click="onClickAddBtn">添加</el-button>
      </div>

      <zTable
        :ref="tableConfig.ref"
        :options="tableConfig"
        @row-update="rowUpdate"
        @row-edit="rowEdit"
        @row-edit-cancel="rowEditCancel"
      >
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="deleteRow(row)">删除</el-button>
        </template>
        <template slot="name" slot-scope="{isEdit,row,column,size}">
          <el-input
            :size="size"
            readonly
            v-model="row[column.prop]"
            @focus="chooseAsset(row,column,$event)"
            v-if="isEdit"
          ></el-input>
          <span v-if="!isEdit">{{row.name}}</span>
        </template>
      </zTable>

      <div class="time-line" v-if="stockDealId">
        <div class="tip">审批详情</div>
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in checkList"
            :key="index"
            :type="item.type"
            :color="item.color"
            :size="item.size"
            :timestamp="item.approvalTime"
            placement="top"
          >
            <el-card>
              <span>{{item.approvalUser}}</span>
              <span>{{item.pointName}}</span>
              <span>{{item.isPass?'通过':'不通过'}}</span>
              <div class="opinion">{{item.opinion}}</div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="submit-btn">
        <el-button type="primary" @click="onClickSubmitBtn">提交</el-button>
        <el-button @click="onClickCloseBtn" v-if="stockDealId">关闭</el-button>
      </div>
    </div>
    <SearchAssetModal :showSearchModal="showSearchModal" from-flag="2" />
  </div>
</template>

<script>
import AssetManageApi from '@/service/api/assetManage'
import SearchAssetModal from '../../stockManage/coms/searchAsset'
import SystemManageApi from '@/service/api/systemManage'
import moment from 'moment'
import CommonFun from '@/utils/commonFun'
import { mapState } from 'vuex';

export default {
  name: 'AssetOperator',
  components: {
    SearchAssetModal
  },
  data() {
    let _this = this
    let checkQuantity = (rule, value, callback) => {
      // console.log("value",_this.curDetail.actualQuantity,value)
      if ((value + "").trim() == "") {
        return callback({ message: "请输入领用数量" });
      } else if (value == 0) {
        return callback({ message: "最小领用数量为1" });
      } else if ((!Number(value) || value < 0)) {
        return callback({ message: "请输入正数" });
      } else if (_this.curDetail.actualQuantity && value > _this.curDetail.actualQuantity) {
        return callback({ message: "领用数量应小于等于入库数量" });
      }
      return callback();
    };
    return {
      tableConfig: {
        ref: 'tableRef',
        data: [],
        editBtn: true,
        props: {
          rowKey: 'id'
        },
        columnConfig: [{
          label: '申请日期',
          prop: 'applyTime',
        }, {
          label: '申请人',
          prop: 'applyUser'
        }, {
          label: '领用的资产',
          prop: 'name',
          cell: true,
          slot: true,
          // rules: {
          //   required: true,
          //   message:'请选择资产',
          // },
        }, {
          label: '规格型号',
          prop: 'specification'
        }, {
          label: '库存数量',
          prop: 'actualQuantity'
        }, {
          label: '领用人',
          prop: 'collarId',
          cell: true,
          type: "cascader",
          showAllLevels: false,
          props: {
            label: "name",
            value: "id",
            children: "childNode",
          },
          dicData: [],
        }, {
          label: '领用数量',
          prop: 'collarNum',
          cell: true,
          type: 'input',
          rules: {
            required: true,
            validator: checkQuantity,
          },
        }, {
          label: '备注',
          prop: 'description',
          cell: true
        }],
        customTop: true,
        operation: {
          width: 200
        },
        uiConfig: {
          height: "auto",
          selection: true,
          pagination: {
            handler: function (size, page) {
              _this.handleCurrentChange(page)
            },
          }
        }
      },
      curDetail: {},
      curRowIndex: 0,
      showSearchModal: false,
      deptTree: [],
      curPage: 1,
      deleteId: '',
      checkList: []
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    stockDealId() {
      return this.$route.query.id
    },
    stockApprovalList() {
      return JSON.parse(this.$route.query.stockApprovalList)
    }
  },
  methods: {
    async getDeptUserTree() {
      let res = await SystemManageApi.getDeptUserTree();
      this.deptTree = res[0].childNode

      // let list = this.insertNode(this.deptTree)
      // console.log("list",list)
      this.$refs['tableRef'].setColumnByProp("collarId", {
        dicData: this.deptTree
      });
    },
    async getUserList(id) {
      let deptId = id;
      let res = await SystemManageApi.listBy({
        deptId
      });
      console.log(res)
      res.map(item => {
        item.name = item.name;
        item.leaf = true;
      });
      this.userList = res
      return res;
    },
    insertNode(arr) {
      arr.map(async (item) => {
        if (item.childNode.length) {
          this.insertNode(item.childNode)
        } else {
          let res = await this.getUserList(item.id)
          item.childNode = res
        }
      })
      return arr;
    },
    async onClickAddBtn() {
      let obj = {
        id: _.uniqueId(),
        applyTime: moment(new Date()).format('YYYY-MM-DD'),
        applyUser: this.userInfo.name,
        name: '',
        collarId: '',
        specification: '',
        actualQuantity: '',
        collarNum: '',
        description: '',
        assetId: ''
      }
      // this.$refs['tableRef'].rowCellAdd(obj)
      // this.tableConfig.data.push(obj)
      await this.addAssetUseDetail(obj)
    },
    deleteRow(row) {
      // this.tableConfig.data.splice(index, 1);
      // CommonFun.deleteTip(this,true,"确定要删除吗")
      this.deleteId = row.id
      this.deleteAssetUseDetail()
    },
    onClickMultiDelBtn() {
      let delArr = this.$refs["tableRef"].getSelectedData();
      if (!delArr.length) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据'
        })
        return;
      }
      this.deleteId = delArr.map((item) => item.id).join(",")
      this.deleteAssetUseDetail()
    },
    chooseAsset(row, column, event) {
      console.log("focus", row.$index, this.tableConfig.data[row.$index])
      this.curDetail = this.tableConfig.data[row.$index]
      this.curRowIndex = row.$index
      this.showSearchModal = true
    },
    onGetAssetDetail(val) {
      let tmp = {
        id: this.curDetail.id,
        assetId: val.id || val.assetId,
        $cellEdit: true,
        collarNum: this.curDetail.collarNum
      }
      let obj = { ...this.curDetail, ...val, ...tmp }
      console.log("getDetail", this.curDetail, obj)
      this.tableConfig.data.splice(this.curRowIndex, 1, obj)
      this.curDetail = obj
      this.showSearchModal = false
    },
    async rowUpdate(data, index, callback) {
      console.log("baocun", data)
      if (data.collarId && data.collarId instanceof Array) {
        data.collarId = data.collarId[data.collarId.length - 1]
      }
      data.isEdit = 0
      await this.editAssetUseDetail(data)
      callback()
    },
    async rowEdit(obj, index) {
      console.log("edit", obj)
      this.curRowIndex = index
      this.curDetail = obj
      await this.editAssetUseDetail({ ...obj, ...{ isEdit: 1 } })
    },
    async rowEditCancel(obj, index) {
      await this.editAssetUseDetail({ ...obj.preDetail, ...{ isEdit: 0 } })
    },
    async getAssetUseList() {
      let res = await AssetManageApi.getAssetUseList({
        pageNum: this.curPage,
        pageSize: 10,
        stockDealId: this.stockDealId
      })
      if (res.list) {
        res.list.map((item) => {
          item.$cellEdit = item.isEdit ? true : false
          item.preDetail = { ...item }
          item.collarNum = item.collarNum == 0 ? '' : item.collarNum
        })
      } else {
        res.list = []
      }
      this.tableConfig.data = res.list
      this.tableConfig.uiConfig.pagination.total = res.total
    },
    async addAssetUseDetail(obj) {
      await AssetManageApi.addAssetUseDetail(obj)
      await this.getAssetUseList()
    },
    async deleteAssetUseDetail() {
      await AssetManageApi.deleteAssetUseDetail({
        ids: this.deleteId
      })
      this.getAssetUseList()
    },
    async editAssetUseDetail(obj) {
      await AssetManageApi.editAssetUseDetail(obj)
      this.getAssetUseList()
    },
    async onClickSubmitBtn() {
      let list = this.tableConfig.data
      let arr = list.filter((item) => {
        return !item.name || !item.collarId || !item.collarNum
      })
      if (!list.length) {
        this.$message({
          type: 'warning',
          message: '请先添加信息'
        })
        return;
      }
      if (arr.length) {
        this.$message({
          type: 'warning',
          message: '请将信息补充完整'
        })
        arr.map(async (item) => {
          item.isEdit = 1
          await this.editAssetUseDetail(item)
        })
        return;
      }
      let res = await AssetManageApi.addAssetUseApply({
        stockDealId: this.stockDealId
      })
      this.$message({
        type: 'success',
        message: "提交成功"
      })
      if (this.stockDealId) {
        this.$router.push('/todoList')
      } else {
        this.getAssetUseList()
      }
    },
    onClickCloseBtn() {
      this.$router.push('/todoList')
    },
    getCheckList() {
      this.checkList = this.stockApprovalList
      this.checkList.map((item) => {
        item.type = "primary";
        item.color = "#0bbd87";
        item.size = "large";
      })
    },
    handleCurrentChange(page) {
      this.curPage = page
      this.getAssetUseList()
    }
  },
  created() {

  },
  async mounted() {
    await this.getDeptUserTree()
    this.getAssetUseList()
    if (this.stockDealId) {
      this.getCheckList()
    }
  }
}
</script>

<style lang="less">
.asset-use {
  .asset-use-table-panel {
    overflow: hidden;
  }
  .submit-btn {
    margin: 20px 0;
    text-align: center;
  }
  .el-card {
    width: 80%;
  }
  .time-line {
    margin-top: 40px;
  }
  .opinion {
    margin: 20px 0;
  }
  .tip {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
  }
  .el-timeline {
    margin-left: 2px;
  }
}
</style>

