import HelloWorld from '../pages/helloWorld/helloWorld.vue'
import Shouye1 from '../pages/helloWorld/coms/testShouye1.vue'
import Shouye2 from '../pages/helloWorld/coms/testShouye2.vue'
import CommonRouter from './commonRouter/index'
export default [{
  path:'/',
  redirect:'/helloWorld'
},{
  path: '/helloWorld',
  name: 'HelloWorld',
  component: HelloWorld,
  children:[{
    path: '/helloWorld/shouye1',
    name: 'Shouye1',
    component: Shouye1,
  },{
    path: '/helloWorld/shouye2',
    name: 'Shouye2',
    component: Shouye2,
  }].concat(CommonRouter)
}]
