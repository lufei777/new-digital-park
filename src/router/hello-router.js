import HelloWorld from '../pages/helloWorld/helloWorld.vue'
import Test from '../pages/helloWorld/test.vue'
export default [{
  path:'/',
  redirect:'/helloWorld'
},{
  path: '/helloWorld',
  name: 'HelloWorld',
  component: HelloWorld,
},{
  path: '/test',
  name: 'Test',
  component: Test,
}]
