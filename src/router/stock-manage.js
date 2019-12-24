// import StockManageIndex from '../pages/stockManage/index'
import StockInApply from '../pages/stockManage/stockIn/stockInApply'
import StockInCheck from '../pages/stockManage/stockIn/stockInCheck'
import StockOut from '../pages/stockManage/stockOut/index'
import BatchStockIn from '../pages/stockManage/batchStockIn'
import GoodsCheck from '../pages/stockManage/goodsCheck'
export default [{
    path: '/',
    redirect: '/stockInApply',
    meta: { title: '库存管理' },
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    children: [{
        path: '/stockInApply',
        name: 'StockInApply',
        component: StockInApply,
        meta: { title: '入库申请' },
    },{
      path: '/stockInCheck',
      name: 'StockInCheck',
      component: StockInCheck,
      meta: { title: '入库验收' },
    },{
      path: '/stockOut',
      name: 'StockOut',
      component: StockOut,
      meta: { title: '出库管理' },
    },{
      path: '/goodsCheck',
      name: 'GoodsCheck',
      component: GoodsCheck,
      meta: { title: '库存盘点' },
    },{
      path: '/batchStockIn',
      name: 'BatchStockIn',
      component: BatchStockIn,
      meta: { title: '批量入库' },
    }]
}]
