import { RevenueExpendManageDic } from 'utils/dictionary';
import revenueExpendManageApi from 'api/revenueExpendManage';

export const code = {
  type: 'select',
  prop: 'code',
  label: '收费类型',
  props: {
    label: 'codeName',
    value: 'code'
  }
}