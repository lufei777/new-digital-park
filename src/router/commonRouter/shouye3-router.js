import Shouye3 from '../../pages/commonProject/testShouye3'
import Child1 from '../../pages/commonProject/child1'
import Child2 from '../../pages/commonProject/child2'

export default [{
  path:'/shouye3',
  name:'Shouye3',
  component:Shouye3,
  children:[{
    path:'/child1',
    name:'Child1',
    component:Child1,
  },{
    path:'/child2',
    name:'Child2',
    component:Child2,
  }]
}]
