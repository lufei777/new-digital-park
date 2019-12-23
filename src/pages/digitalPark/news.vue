<template>
  <div class="news">
    <div class="nav-style">
      <NavOperator :showGoback="true" class="nav-operator" />
    </div>
    <div class="news-content">
      <div class="content-title">
        <div>中钢集团信访工作人员联系方式</div>
        <span>发布时间：2019年12月10日</span>
      </div>
      <div class="content">
        <p>12月12日，中国中钢集团有限公司与北京歌华传媒集团有限责任公司签订战略合作框架协议。北京市委宣传部副巡视员、北京市文化创意产业促进中心主任梅松，国务院国资委宣传工作局宣传处处长熊卫松，中国传媒大学传媒博物馆、校史馆、图书馆馆长潘力受邀出席签约仪式。中钢集团董事长、党委书记徐思伟，歌华传媒集团党委副书记、总经理戴维在签约仪式上致辞。中钢集团党委副书记张经华，纪委书记李荣庭，歌华文化党委书记、总经理李丹阳等参加签约仪式。张经华、戴维代表双方签署协议。</p>
        <p>签约前，嘉宾一行参观了中钢集团展厅并进行会谈交流。梅松表示，北京是全国文化中心，吸引、聚集着众多优质文化资源，希望中钢集团和歌华传媒集团进一步加强交流合作，共同推动文化传承、创新和发展，为首都文化繁荣兴盛做出努力和贡献。熊卫松表示，中央企业要深度挖掘蕴含的红色基因和红色资源，发挥各类爱国主义教育基地的作用，充分聚集各类资源和力量，为全社会营造新时代爱国主义教育浓厚氛围做出更大贡献。</p>
        <p>徐思伟在签约仪式上致辞并表示，今年中钢与歌华在企业红色文化主题教育基地建设方面取得了较好的合作成果。希望双方加强务实合作、打造品牌工程，在推动企业文化建设和产业发展跨界融合的同时，为中央和地方国资系统经济、文化等多领域建设，做出有益探索和积极贡献。戴维在致辞中表示，歌华传媒集团将继续秉承开放合作的理念与中钢集团深化合作，进一步探索实体经济企业和文化企业转型升级的模式与路径，共同为推动国家文化建设谋篇布局、贡献力量。</p>
        <p>根据协议，双方将充分发挥各自优势，实现资源互惠共享，形成协同效应，共同研发和推动文化会展、文创产业园区开发运营、文创IP产品、文化活动等相关项目的有效落地，并加强文化创意产业相关投资和宣传推广项目合作。</p>
        <p>歌华传媒集团办公室、歌华文化、创新中心、歌华设计公司，中钢集团办公室、企业发展部、党群工作部负责人参加签约仪式。</p>
         <img class="news-img" src="../../../static/image/digitalPark/news.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
import NavOperator from "@/pages/digitalPark/coms/navOperator";
export default {
  name: "News",
  components: {
    NavOperator
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
.news {
  width: 100%;
  height: 100%;
  .nav-style {
    padding: 0 20px;
    height: 70px;
    background-color: #fff;
    position: fixed;
    box-sizing: border-box;
    z-index: 99;
    overflow: hidden;
    left: 0px;
    right: 0;
    top: 0;
    .nav-operator {
      float: right;
      line-height: 70px;
    }
  }
  .news-content {
    width: 67%;
    margin: 70px auto 0 auto;
    // margin-top: 70px;
    .content-title {
      height: 75px;
      text-align: center;
      border-bottom: 1px solid #666666;
      color: #333333;
      font-size: 12px;
      div {
        font-size: 16px;
        line-height: 46px;
      }
    }
  }
  .content {
    line-height: 30px;
    // text-indent: 2%;
    .news-img {
        // width: 50%;
        // height: 50%;
        // margin: 0 auto;
        margin-left: 23%;
    }
  }
}
</style>