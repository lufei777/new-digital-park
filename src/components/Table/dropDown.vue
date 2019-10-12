<template>
  <div>
    <el-dropdown @command="handleCommand">
      <span @click="dropDown.handler(carryData)" class="el-dropdown-link">
        <i v-if="dropDown.icon" :class="dropDown.icon"></i>
        {{dropDown.label}}
        <i
          v-if="typeof dropDown.showMore != 'undefined' ? dropDown.showMore : true"
          class="el-icon-arrow-down el-icon--right"
        ></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in dropDown.menus"
          :carryData="carryData"
          :key="item.label"
          :command="item.handler"
        >{{item.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    dropDown: {
      type: Object,
      required: true
    },
    carryData: {}
  },
  data() {
    return {};
  },
  methods: {
    //列操作下拉方法
    handleCommand(command, currentMenu) {
      //下拉回调执行
      command(currentMenu.$attrs);
    }
  }
};
</script>
<style lang='less' scoped>
</style>