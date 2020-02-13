import { DIC_HTTP_PROPS, DIC_PROPS } from "../global/variable";

const getKeyByName = (tableConfig, keyName) => {
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
                return getKeyByName(this.options, 'list');
            },
            // 第几页字段
            pageNumKey() {
                return getKeyByName(this.options, 'pageNum');
            },
            // 一页几条字段
            pageSizeKey() {
                return getKeyByName(this.options, 'pageSize');
            },
            // 总数量字段
            totalKey() {
                return getKeyByName(this.options, 'total');
            },
            // res返回结果字段
            resKey() {
                return getKeyByName(this.options, 'res');
            },
            // 降序字段
            descKey() {
                return getKeyByName(this.options, 'desc');
            },
            // 升序字段
            ascKey() {
                return getKeyByName(this.options, 'asc');
            },
            // 升降序类型字段
            orderTypeKey() {
                return getKeyByName(this.options, 'orderType');
            },
            // 根据什么属性排序字段
            orderPropKey() {
                return getKeyByName(this.options, 'orderBy');
            },
            rowKey() {
                return this.options.rowKey || DIC_PROPS.rowKey;
            }
        },
    }
}