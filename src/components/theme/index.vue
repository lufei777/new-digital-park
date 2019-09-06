<template>
    <div class="theme-color-list">
      <el-tag :color="item.color" v-for="(item,index) in colorList"
              :key="index"
              :title="item.key"
              @click="onChangeThemeColor(item,index)"
      ></el-tag>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return{
        colorList:[{
          key: '薄暮', color: '#F5222D',
        }, {
          key: '火山', color: '#FA541C',
        }, {
          key: '日暮', color: '#FAAD14',
        }, {
          key: '明青', color: '#13C2C2',
        }, {
          key: '极光绿', color: '#52C41A',
        }, {
          key: '拂晓蓝（默认）', color: '#1890FF',
        }, {
          key: '极客蓝', color: '#2F54EB',
        }, {
          key: '默认', color: '#013b4e',
        }]
      }
    },
    created(){
    },
    methods:{
      onChangeThemeColor(item){
        document.body.style.setProperty('--mainBg',item.color)
      }
    }
  }
</script>
<style lang="less">
  .theme-color-list{
    overflow: hidden;
    margin:100px 0 0 30px;
    position: fixed;
    right:20px;
    top:150px;
    z-index:999;
    .el-tag{
      padding:0 15px;
      &:hover{
        cursor: pointer;
      }
    }
  }
  :root{
    --mainBg:#013b4e;
  }
</style>
