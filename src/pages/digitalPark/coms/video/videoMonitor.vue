<template>
  <div class="video-monitor-coms">

  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import DigitalParkApi from '@/service/api/digitalPark'
  export default {
    name: "videoMonitor",
    components: {},
    props: ["moduleItem"],
    data() {
      return {
        curDevice: 0,
        moduleData:{},
        videoModule:{},
        curUrl:''
      };
    },
    methods: {
      async getCameraList() {
        let res = await CommonApi.getCameraList({
          spaceId: 1,
          type: 2002,
          catalogIds: 2001,
          flag: 'device'
        })
        this.curDevice = res.list.rows[0].id
      },
      async getVideoUrl() {
        let res = await CommonApi.getVideoUrl({
          kind: 1,
          id: this.curDevice
        })
        let rtspUrlPattern = ''
        switch (res.data.typeName) {
          case "YC_DAHUA_Camera":
          case "DFWL_YuShi_Camera":
            if (res.data.port == '1000') {
              rtspUrlPattern = 'rtsp://' + res.data.username + ':' + res.data.password + '@' + res.data.host +
                '/cam/realmonitor?channel=' + res.data.valueList[1].value + '&subtype=0';
            } else {
              rtspUrlPattern = 'rtsp://' + res.data.username + ':' + res.data.password + '@' + res.data.host +
                ':' + res.data.port + '/cam/realmonitor?channel=' + res.data.valueList[1].value +
                '&subtype=0';
            }
            break;
          case "YC_HIK_Camera":
            rtspUrlPattern = 'rtsp://' + res.data.username + ':' + res.data.password + '@' + res.data.host +
              ':' +
              res.data.port + '/h264/ch' + res.data.valueList[1].value + '/main/av_stream';
            break;
          case "CiZing_Camera":
            rtspUrlPattern = res.data.rtspUrlPattern;
            break;
          default:
            break;
        }
        this.curUrl=rtspUrlPattern
        // console.log("url",rtspUrlPattern)
        this.getParams()
      },
      getParams(){
        if(this.videoModule && this.videoModule.moduleList.length){
          let dom = $(".item-id-"+this.videoModule.moduleList[0].id)
          // console.log(dom,this.videoModule)
          let offset = dom.offset().left
          let top =  dom.offset().top
          let width = dom.width()
          let height = dom.height()
          console.log(offset,top,width,height,this.curUrl)
          window.openVideoWin && window.openVideoWin(offset,top,width,height,this.curUrl)
        }

      },
      async getModuleList(){
        let res = await DigitalParkApi.getLargeScreenModule({
          width: document.body.offsetWidth,
          height: document.body.offsetHeight,
        })
        this.moduleData=res
        let tmp =  res.modules.find((item)=>item.moduleList[0] &&
                   item.moduleList[0].componentName=='videoMonitor')
        this.videoModule=tmp
      }
    },
    async mounted() {
      await this.getModuleList()
      await this.getCameraList()
      this.getVideoUrl()
    }
  };
</script>

<style lang="less">
  .real-time-status {
  }
</style>
