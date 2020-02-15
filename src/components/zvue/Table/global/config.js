export default {
    topSlotName: "custom-top",
    operationSlotName: "operation",
    paginationSlotName: "tablePagination",
    editBtn: false,
    calcelBtn: true,
    rowStyle: { height: '50px' },
    cellStyle: { padding: '0px' },
    headerCellStyle: { padding: '0px', height: '50px' },
    selectionWidth: 37,
    indexWidth: 50,
    indexAlign: "center",
    indexLabel: "序号",
    btnAlign: "left",
    // 默认log
    LOG: {
        error: {
            tableData: {
                TypeError: "数组数据类型必须是数组"
            },
            pagination: {
                RequestError: "服务端分页请求错误"
            }
        }
    },
    //默认uiConfig
    defaultUiConfig: {
        /**
         * height: "300px" 设定按照设定值来规定table高度
         *         "auto"  根据内容自适应
         *          不设置  根据父级计算高度
         */
        size: "medium",
        pagination: {
            // sizes
            layout: "total, ->, prev, pager, next, jumper",
            pageSizes: [10],
            pageSize: 10,
            currentPage: 1
        }
    },
    // 默认btnConfig
    defaultBtnConfig: {
        prop: "operation",
        label: "操作",
        fixed: "right",
        width: 100
    },

}

