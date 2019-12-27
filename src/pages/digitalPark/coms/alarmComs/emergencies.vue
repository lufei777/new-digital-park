<template>
  <div class="emergencies">
    <miTable :ref="Emergencies.ref" :tableConfig="Emergencies"></miTable>
    <div style="margin-bottom:10px;">{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import miTable from "@/components/Table";
export default {
  name: "Emergencies",
  components: { miTable },
  props: ["moduleItem"],
  data() {
    return {
      Emergencies: {
        ref: "Emergencies",
        data: [
          {
            zbrq: "火灾",
            zbry: "2019.11.6",
            zbdd: "因厨房用火不当，导致火灾发生",
            zbnr: "已处理"
          },
          {
            zbrq: "入侵",
            zbry: "2019.11.5",
            zbdd: "园区东门发现人员入侵，疑似有计划有组织的入侵",
            zbnr: "待处理"
          },
          {
            zbrq: "火灾",
            zbry: "2019.11.6",
            zbdd: "因厨房用火不当，导致火灾发生",
            zbnr: "已处理"
          },
          {
            zbrq: "入侵",
            zbry: "2019.11.5",
            zbdd: "园区东门发现人员入侵，疑似有计划有组织的入侵",
            zbnr: "待处理"
          }
        ],
        columnConfig: [
          {
            prop: "zbrq",
            label: "事件类别"
          },
          {
            prop: "zbry",
            label: "事件时间",
            width: 95
          },
          {
            prop: "zbdd",
            label: "事件描述",
            width: 300
          },
          {
            prop: "zbnr",
            label: "处理结果"
          }
        ],
        uiConfig: {
          height: "260px"
        }
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .emergencies{
    /*overflow: auto;*/
   }
</style>
