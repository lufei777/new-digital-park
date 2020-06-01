<template>
  <div class="alert-alarm-box">
    <!--<div class="alert-alarm" v-if="alarmMessage">{{alarmMessage}}</div>-->
    <!--<div class="alert-alarm" v-if="b1">{{b1}}</div>-->
    <!--<div class="alert-alarm" v-if="a1">{{a1}}</div>-->
    <!--<div v-for="(item,index) in showAlarmList" :key="index">-->
      <!--<div>{{item}}</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  let a,b
  export default {
    name: 'alertAlarm',
    components: {
    },
    props:['moduleItem'],
    data () {
      return {
        websock:'',
        alarmMessage:'',
        flag:true,
        num:0,
        hideTimer:'',
        a1:'',
        b1:''
        // alarmList:[],
        // showAlarmList:[]
      }
    },
    computed:{
      top() {
        return -this.curNewsIndex * 30 + 'px'
      },
    },
    watch:{
    },
    methods: {
      initWebSocket(){
        const wsuri = "ws://39.98.130.147:8008/websocket";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.webSocketOnMessage;
        this.websock.onopen = this.webSocketOnOpen;
        this.websock.onerror = this.webSocketOnError;
        this.websock.onclose = this.webSocketClose;
        console.log("websocket init")
      },
      webSocketOnMessage(e){

        let res = JSON.parse(e.data);

        // this.$message({
        //   type:'warning',
        //   message:res.path
        // })
        // console.log(e.data)
        // this.alarmList.push(res.path)
        // this.showAlarmList=this.alarmList.slice(this.alarmList.length-2)
        // this.num++
        // if(this.num<10){
        //   clearTimeout(this.hideTimer)
        //   this.hideTimer=''
        //   $(".alert-alarm-box").animate({bottom:"0px"},0)
        //   this.$nextTick(()=>{
        //     this.alarmMessage = res.path
        //     $(".alert-alarm-box").animate({bottom:"30px"},300)
        //   })
        //   this.hideTimer = setTimeout(()=>{
        //     console.log("lalala")
        //     this.alarmMessage=''
        //   },5000)
        // $(".alert-alarm-box").animate({bottom:"30px"},600)
        // b=a
        // a=res.path
        clearTimeout(this.hideTimer)
        this.hideTimer=''
        this.b1=this.a1
        this.a1=res.path
        let str = `<div class="alert-alarm alert-alarm1">${this.a1}</div>`
        // let str2 = `<div class="alert-alarm alert-alarm2">${this.b1}</div>`

        // $(".alert-alarm2").animate({bottom:"60px"},500)
        $(".alert-alarm-box").append($(str))
        $(".alert-alarm1").animate({bottom:"50px"},600)
        this.hideTimer = setTimeout(()=>{
          $(".alert-alarm-box").empty()
        },2000)


        // console.log("a",this.a1)
        // console.log("b",this.b1)
        // }
      },
      webSocketOnOpen(){ //连接建立之后执行send方法发送数据
        // console.log("open")
        let message = '61438531,0|1'
        this.webSocketSend(message);
      },
      webSocketOnError(){//连接建立失败重连
        // console.log("error")
        this.initWebSocket();
      },
      webSocketSend(Data){//数据发送
        // console.log("send")
        this.websock.send(Data);
      },
      webSocketClose(e){  //关闭
        // console.log('断开连接',e);
      },

    },
    mounted(){
      this.initWebSocket()
    },
    beforeDestroy(){
      this.websock.close();
    }
  }
</script>

<style lang="less">
  .alert-alarm-box{
    /*width:320px;*/
    /*position: absolute;*/
    /*left:50%;*/
    /*bottom:0;*/
    /*margin-left: -110px;*/
    /*height:30px;*/
    /*overflow: hidden;*/
    .alert-alarm{
      width:320px;
      position: absolute;
      left:50%;
      bottom:0;
      margin-left: -110px;
      height:30px;
      /*overflow: hidden;*/
      /*height:30px;*/
      background: #ED6C01;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      line-height: 30px;
      margin-bottom: 10px;
    }
  }
</style>
