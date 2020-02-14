import { DIC_HTTP_PROPS, DIC_PROPS } from "../global/variable";

const getHttpKeyByName = (tableConfig, keyName) => {
    if (tableConfig.serverMode) {
        let props = tableConfig.serverMode.props
        if (props) {
            return props[keyName] || DIC_HTTP_PROPS[keyName];
        }
        return DIC_HTTP_PROPS[keyName];
    }
    return DIC_HTTP_PROPS[keyName];
}

export default function () {
    return {
        data() { },
        computed: {
            // 列表list字段
            listKey() {
                return getHttpKeyByName(this.options, 'list');
            },
            // 第几页字段
            pageNumKey() {
                return getHttpKeyByName(this.options, 'pageNum');
            },
            // 一页几条字段
            pageSizeKey() {
                return getHttpKeyByName(this.options, 'pageSize');
            },
            // 总数量字段
            totalKey() {
                return getHttpKeyByName(this.options, 'total');
            },
            // res返回结果字段
            resKey() {
                return getHttpKeyByName(this.options, 'res');
            },
            // 降序字段
            descKey() {
                return getHttpKeyByName(this.options, 'desc');
            },
            // 升序字段
            ascKey() {
                return getHttpKeyByName(this.options, 'asc');
            },
            // 升降序类型字段
            orderTypeKey() {
                return getHttpKeyByName(this.options, 'orderType');
            },
            // 根据什么属性排序字段
            orderPropKey() {
                return getHttpKeyByName(this.options, 'orderBy');
            },
            rowKey() {
                return this.options.props ? this.options.props.rowKey || DIC_PROPS.rowKey : DIC_PROPS.rowKey;
            }
        },
    }
}