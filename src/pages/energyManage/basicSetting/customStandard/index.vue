<template>
  <div class="standard-setting panel-container">
    <div class="radius-shadow operator-box flex panel">
      <div class="flex item-group">
        <label for="">周期类型：</label>
        <el-select v-model="searchParams.dateTypeCode">
          <el-option v-for="item in dateTypeList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="flex item-group">
        <label for="">指标类型：</label>
        <el-select v-model="searchParams.energyType">
          <el-option v-for="item in energyList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="flex item-group">
        <label for="">空间位置：</label>
        <el-input v-model="searchParams.spaceName" @focus="onShowModal"/>
      </div>
      <div class="flex item-group btn-box">
        <el-button type="primary" @click="onClickSearchBtn">确定</el-button>
        <!--<el-button>重置</el-button>-->
      </div>
    </div>
    <TreeModal :tree-modal-config="treeModalConfig"/>
    <div class="panel">
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary" @click="onClickMultiDealBtn">批量处理</el-button>
      </div>
      <z-table class="custom-table"
               :ref="tableConfig.ref" :options="tableConfig"
               @row-update="rowUpdate"
               @row-edit="rowEdit"
               @row-edit-cancel="rowEditCancel"
      ></z-table>
    </div>

  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import EnergyApi from '@/service/api/energy'
  import {isZG} from '@/utils/project';
  import TreeModal from '@/components/treeModal/index'

  let pageInfo = {
    pageCount: 10
  }
  export default {
    name: "standardSetting",
    components: {
      TreeModal
    },
    data() {
      let _this = this
      let checkQuantity = (rule, value, callback) => {
        if ((!Number(value) || value < 0) &&
          (value + '').trim() != '' && value !== null &&
          value!=0
        ) {
          return callback({message: "请输入正数"});
        }
        return callback();
      };
      return {
        dateTypeList: [{
          value: 1,
          label: '全天'
        }, {
          value: 2,
          label: '夜间'
        }],
        energyList: [],
        treeModalConfig: {
          treeList: [],
          treeConfig: {
            treeProps: {
              label: "floor",
              children: 'nodes'
            },
            nodeKey:'floorId',
            defaultExpandedkeys: [],
          },
          showModal: false,
          onClickSureBtnCallback: this.onClickModalSureBtn,
          onClickCancelBtnCallback: this.onClickModalCancelBtn
        },
        tableConfig: {
          ref: "tableRef",
          editBtn: true,
          operation: {
            width: 100
          },
          customTop: true,
          data: [],
          props: {
            rowKey: 'spaceId'
          },
          columnConfig: [{
            label: '指标名称',
            prop: 'reckonName'
          }, {
            label: '类型',
            prop: 'codeName'
          }, {
            label: '空间位置',
            prop: 'spaceName'
          }, {
            label: '周期',
            prop: 'dateType'
          }, {
            label: '自定义标杆值',
            prop: 'reckonValue',
            cell: true,
            rules: {
              validator: checkQuantity,
            },
          }],
          uiConfig: {
            height: "auto",
            selection: true,
            showIndex: {
              handler: function (index) {
                return _this.setIndex(index);
              }
            },
            pagination: {
              handler(pageSize, currentPage, table) {
                _this.handleCurrentChange(currentPage)
              }
            },
          },
          tableMethods: {
            selectionChange: _this.selectionChange
          }
        },
        curPage: 1,
        searchParams: {
          dateTypeCode: 1,
          energyType: '',
          spaceId: '',
          spaceName: ''
        }
      };
    },
    computed: {},
    methods: {
      async getEnergyList() {
        let res = await CommonApi.getEnergyListByGroup();
        if (isZG()) {
          this.energyList = res
        } else {
          let tmp = []
          res.map((item) => {
            tmp.push(item)
            item.energyType && item.energyType.map((child) => {
              tmp.push(child)
            })
          })
          this.energyList = tmp
        }
        this.searchParams.energyType = res[0].id
        this.setColumnUnit(res[0])
      },
      async getAllFloorOfA3() {
        let res = await CommonApi.getAllFloorOfA3()
        this.treeModalConfig.treeList = res
        this.treeModalConfig.treeConfig.defaultExpandedkeys = [res[0].floorId]
        this.searchParams.spaceName = res[0].floor
        this.searchParams.spaceId = res[0].floorId
      },
      onShowModal() {
        this.treeModalConfig.showModal = true
      },
      onClickModalSureBtn(val) {
        this.searchParams.spaceId = val.floorId
        this.searchParams.spaceName = val.floor
        this.treeModalConfig.showModal = false
      },
      onClickModalCancelBtn() {
        this.treeModalConfig.showModal = false
      },
      async getSpaceStandardTree() {
        let params = {
          ...{
            pageNum: this.curPage
          }, ...this.searchParams
        }
        let res = await EnergyApi.getSpaceStandardTree(params)
        this.tableConfig.data = res.list
        this.tableConfig.uiConfig.pagination.total = res.total
      },
      setIndex(index) {
        return pageInfo.pageCount * (this.curPage - 1) + index + 1
      },
      async rowUpdate(data, index, callback) {
        console.log("baocun", data)
        callback()
      },
      async rowEdit(obj, index) {
        console.log("edit", obj)
        // this.curRowIndex = index
        // this.curDetail = obj
        // await this.editAssetUseDetail({ ...obj, ...{ isEdit: 1 } })
      },
      async rowEditCancel(obj, index) {
        // await this.editAssetUseDetail({ ...obj.preDetail, ...{ isEdit: 0 } })
      },
      selectionChange(data) {
        console.log(data)
        console.log(this.tableConfig.data)
        this.tableConfig.data.map((item) => {
          item.$cellEdit = false
        })
        data.map((item) => {
          item.$cellEdit = true
        })
      },
      onClickMultiDealBtn() {
        let tmp = this.$refs[this.tableConfig.ref].getSelectedData()
        if (!tmp.length) {
          this.$message({
            type: 'warning',
            message: '请至少选择一条数据'
          })
          return;
        }
        console.log("tmp", tmp)
        tmp.map((item) => {
          item.$cellEdit = false
        })
      },
      handleCurrentChange(page) {
        this.curPage = page
      },
      onClickSearchBtn() {
        let tmp = this.energyList.find((item)=>{
          return item.id==this.searchParams.energyType
        })
        this.setColumnUnit(tmp)
        this.getSpaceStandardTree()
      },
      async setStandardValue() {
        await EnergyApi.setStandardValue()
      },
      setColumnUnit(obj){
        let tmp = this.tableConfig.columnConfig
        tmp[tmp.length-1].label ='自定义标杆值 '+ obj.unit
      },

    },
    async mounted() {
      await this.getEnergyList()
      await this.getAllFloorOfA3()
      this.getSpaceStandardTree()
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .standard-setting {
    .operator-box {
      padding: 20px;
    }

    .btn-box {
      .el-button {
        margin-right: 10px;
      }
    }
  }
</style>
