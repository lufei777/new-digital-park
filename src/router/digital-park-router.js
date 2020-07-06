import DigitalHomePage from '../pages/digitalPark/home/index'
import DashBoardHomePage from '../pages/digitalPark/home/dashboardNew'
import ModuleConfigure from '../pages/digitalPark/moduleConfigure/index'
import Login from '../pages/digitalPark/login/index'
import HelloWorld from '../pages/helloWorld/helloWorld'
import Announcement from '../pages/digitalPark/carouselLink/announcement'
import News from '../pages/digitalPark/carouselLink/news'

export default [{
  path: '/',
  redirect: '/digitalPark/homePage'
},{
},{
  path: '/login',
  name: 'Login',
  meta:{
    loginCheck:false
  },
  component: Login,
},{
  path: '/digitalPark/homePage',
  name: 'DigitalHomePage',
  component: DigitalHomePage,
  meta:{
    keepAlive:true
  }
}, {
  path: '/digitalPark/dashboardHomePage',
  name: 'DashBoardHomePage',
  component: DashBoardHomePage,
}, {
  path: '/digitalPark/moduleConfigure',
  name: 'ModuleConfigure',
  component: ModuleConfigure,
},{
  path:'/test',
  name:'HelloWorld',
  component:HelloWorld
},{
  path:'/announcement',
  name:'Announcement',
  component:Announcement
},{
  path:'/news',
  name:'News',
  component:News
},{
  path:'/largeSizeScreen',
  name:'LargeSizeScreen',
  component:()=>import("@/pages/largeSizeScreen/index")
},{
  path:'/clientOverView',
  name:'ClientOverView',
  component:()=>import("@/pages/digitalPark/clientOverView/index")
},{
  path:'/historyVideo',
  name:'HistoryVideo',
  component:()=>import("@/pages/digitalPark/clientOverView/historyVideo")
}]
