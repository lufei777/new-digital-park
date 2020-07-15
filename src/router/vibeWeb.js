import layout from '../pages/vibeWeb'

export default [{
  name: "vibe-web",
  path: "/vibe-web",
  // component: layout
  component: () => import('@/pages/commonProject/coms/commonIndex'),
/*  children:[{}]*/
}]
