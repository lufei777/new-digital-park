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
        urlList:[]
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
        res.list.rows.map(async(item,index)=>{
          if(index<4){
            this.curDevice = item.id
            let tmp = await this.getVideoUrl()
            // console.log('tmp',tmp)
            this.urlList.push(tmp)
          }
        })
      },
      async getVideoUrl() {
        let res = await CommonApi.getVideoUrl({
          kind: 1,
          id: this.curDevice
        })
        return res.data.rtspUrlPattern
      },
      getParams(){
          let dom = $(".item-id-"+this.moduleItem.id)
          if(dom && dom.length){
            let offset = dom.offset().left
            let top =  dom.offset().top
            let width = dom.width()
            let height = dom.height()
            console.log(offset,top,width,height,this.urlList)
            setTimeout(()=>{
              window.openVideoWin && window.openVideoWin(offset,top,width,height,this.urlList.join(","))
            },2000)
          }
      },
    },
    async mounted() {
      await this.getCameraList()
      await this.getParams()
      // this.getVideoUrl()
    }
  };
</script>

<style lang="less">
  .real-time-status {
  }
</style>
