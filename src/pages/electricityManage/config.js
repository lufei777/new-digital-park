import { electricityManageDic } from 'utils/dictionary';

export let meterColumnConfig = [
  {
    label: '编号',
    prop: 'id',
    hide: true
  },
  {
    label: '电表名称',
    prop: 'caption'
  },
  {
    label: '电表编号',
    prop: 'name'
  },
  {
    label: '楼层',
    prop: 'scaption'
  }
]

// 数据状态
export let status = {
  prop: "status",
  label: "数据状态",
  type: 'select',
  dicData: electricityManageDic.status
}

// 电表用途
export let useType = {
  prop: "useType",
  label: "电表用途",
  type: 'select',
  dicData: electricityManageDic.useType
}