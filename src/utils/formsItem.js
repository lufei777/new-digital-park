import commonApi from 'api/common';

// 获取空间信息
export let floorsTree = {
  dicUrl: commonApi.getAllFloorOfA3,
  props: {
    label: 'floor',
    nodeKey: 'floorId',
    value: 'floorId',
    children: 'nodes'
  }
}