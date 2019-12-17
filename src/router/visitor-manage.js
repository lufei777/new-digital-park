import FaceRecognition from '../pages/visitorManage/faceRecognition'

export default [{
    path: '/',
    redirect: '/faceRecognition',
},{
    path: '/faceRecognition',
    name: 'FaceRecognition',
    component: FaceRecognition,
  }]
