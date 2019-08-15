<template>
  <div class="third-party-video">
    <object type='application/x-vlc-plugin' id='vlc' events='True' width="420" height="420">
      <param name='mrl' value='rtsp://admin:xzl123456@192.168.1.64/cam/realmonitor?channel=1&subtype=0' />
      <param name='volume' value='50' />
      <param name='autoplay' value='true' />
      <param name='loop' value='false' />
      <param name='fullscreen' value='false' />
    </object>
  </div>
</template>

<script>
  export default {
    name:'ThirdPartyVideo',
    components: {
    },
    props:['videoUrl'],
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .third-party-video{
  }
</style>
