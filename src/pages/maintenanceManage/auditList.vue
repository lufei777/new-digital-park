<template>
  <div class="audit-list panel-container">
    <CommonSearch />
    <z-table :ref="tableConfig.ref" :options="tableConfig" class="panel">
      <template slot="custom-top" slot-scope="{size}">
        <el-button type="primary" :size="size" @click="onClickAddBtn()">批量审核</el-button>
      </template>
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="audit(row)">审核</el-button>
        <el-button type="text" @click="auditDetail(row)">详情</el-button>
      </template>
    </z-table>
  </div>
</template>

<script>
let pageInfo = {
  pageSize: 10,
  pageNum: 1
};
import maintenanceManage from "../../service/api/maintenance-manage";
import CommonSearch from "./coms/commonSearch";
import CommonApi from "@/service/api/common";
export default {
  name: "AuditList",
  components: {
    CommonSearch
  },
  data() {
    return {
      tableConfig: {
        ref: "tableRef",
        serverMode: {
          url: CommonApi.getLogList,
          data: {
            ...pageInfo
          }
        },
        operation: {
          width: 200
        },
        propsHttp: {
          list: "list",
          total: "total",
          pageSize: "pageSize",
          pageNum: "pageNum"
        },
        columnConfig: [
          {
            label: "操作者",
            prop: "loginName"
          },
          {
            label: "操作内容",
            prop: "operatingContent"
          },
          {
            label: "日期时间",
            prop: "optDate"
          },
          {
            label: "结果",
            prop: "result"
          }
        ],
        uiConfig: {
          height: "auto",
          selection: true //是否多选
        }
      }
    };
  },
  methods: {
    getData(params) {
      console.log("params", params);
      this.selectParams = params;
      this.$refs[this.tableConfig.ref].setCurrentPage(1);
      this.tableConfig.serverMode.data = { ...params, ...pageInfo };
      this.$refs[this.tableConfig.ref].refreshTable();
    },
    audit(row) {
      console.log("row", row);
      this.$router.push({
        name: "MaintenanceAudit"
      });
    },
    auditDetail(row) {
      this.$router.push({
        name: "MaintenanceAudit"
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.audit-list {
}
</style>