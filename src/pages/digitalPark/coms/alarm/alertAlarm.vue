<template>
  <div class="alert-alarm">
    {{alarmMessage}}
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  export default {
    name: 'alertAlarm',
    components: {
    },
    props:['moduleItem'],
    data () {
      return {
        alarmMessage:''
      }
    },
    computed:{
    },
    watch:{
    },

    methods: {
      initWebSocket(){
        const wsuri = "ws://192.168.1.130:8008/websocket";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.webSocketOnMessage;
        this.websock.onopen = this.webSocketOnOpen;
        this.websock.onerror = this.webSocketOnError;
        this.websock.onclose = this.webSocketClose;
      },
      webSocketOnMessage(e){
        console.log("e",e.data)
        let res = JSON.parse(e.data);
        this.alarmMessage = res
      },
      webSocketOnOpen(){ //连接建立之后执行send方法发送数据
        console.log("open")
        let message = '1,0|1'
        this.webSocketSend(message);
      },
      webSocketOnError(){//连接建立失败重连
        // this.initWebSocket();
      },
      webSocketSend(Data){//数据发送
        this.websock.send(Data);
      },
      webSocketClose(e){  //关闭
        console.log('断开连接',e);
      },
    },
    mounted(){
      this.initWebSocket()
    }
  }
</script>

<style lang="less">
  .alert-alarm{
    width:320px;
    position: absolute;
    left:50%;
    bottom:50px;
    margin-left: -110px;
    background: #ED6C01;
    padding:5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
