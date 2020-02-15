import { DIC_HTTP_PROPS, DIC_PROPS } from "../global/variable";

export default function () {
    return {
        data() { },
        computed: {
            // 列表list字段
            listKey() {
                return this.propsHttp.list || DIC_HTTP_PROPS.list;
            },
            // 第几页字段
            pageNumKey() {
                return this.propsHttp.pageNum || DIC_HTTP_PROPS.pageNum;
            },
            // 一页几条字段
            pageSizeKey() {
                return this.propsHttp.pageSize || DIC_HTTP_PROPS.pageSize;
            },
            // 总数量字段
            totalKey() {
                return this.propsHttp.total || DIC_HTTP_PROPS.total;
            },
            // res返回结果字段
            resKey() {
                return this.propsHttp.res || DIC_HTTP_PROPS.res;
            },
            // 降序字段
            descKey() {
                return this.propsHttp.desc || DIC_HTTP_PROPS.desc;
            },
            // 升序字段
            ascKey() {
                return this.propsHttp.asc || DIC_HTTP_PROPS.asc;
            },
            // 升降序类型字段
            orderTypeKey() {
                return this.propsHttp.orderType || DIC_HTTP_PROPS.orderType;
            },
            // 根据什么属性排序字段
            orderPropKey() {
                return this.propsHttp.orderBy || DIC_HTTP_PROPS.orderBy;
            },
            rowKey() {
                return this.options.props ? this.options.props.rowKey || DIC_PROPS.rowKey : DIC_PROPS.rowKey;
            }
        },
    }
}