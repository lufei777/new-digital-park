<template>
  <div class="asset-use-index">
    <OperatorTab :label-list="['资产领用','领用记录']" :from-flag="1"/>
  </div>
</template>

<script>
  import OperatorTab from '../coms/operatorTab'
  export default {
    name: "AssetUse",
    components: {
      OperatorTab,
    },
    data() {
      return {
        activeTab:'0'
      };
    },
    computed:{

    },
    watch:{

    },
    methods: {
    },
    mounted() {
    }
  };
</script>

<style lang="less">
  .asset-use-index{
    height: 100%;
  }
</style>
