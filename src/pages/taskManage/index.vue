<template>
  <div class="task-manage-index">
    <commonIndex />
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";
export default {
  name: "TaskManage",
  components: {
    commonIndex
  },
  data() {
    return {
    };
  },
  watch: {},
  methods: {},
  created() {
  }
};
</script>

<style lang="less">
.task-manage-index {
    height: 100%;
}
</style>
