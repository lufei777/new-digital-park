import { DIC_HTTP_PROPS } from "../global/variable";

export default function () {
    return {
        data() { },
        computed: {
            listKey() {
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props.list || DIC_HTTP_PROPS.list;
                    }
                    return DIC_HTTP_PROPS.list;
                }
                return DIC_HTTP_PROPS.list;
            },
            pageNumKey() {
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props.pageNum || DIC_HTTP_PROPS.pageNum;
                    }
                    return DIC_HTTP_PROPS.pageNum;
                }
                return DIC_HTTP_PROPS.pageNum;
            },
            pageSizeKey() {
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props.pageSize || DIC_HTTP_PROPS.pageSize;
                    }
                    return DIC_HTTP_PROPS.pageSize;
                }
                return DIC_HTTP_PROPS.pageSize;
            },
            totalKey() {
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props.total || DIC_HTTP_PROPS.total;
                    }
                    return DIC_HTTP_PROPS.total;
                }
                return DIC_HTTP_PROPS.total;
            },
            resKey() {
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props.res || DIC_HTTP_PROPS.res;
                    }
                    return DIC_HTTP_PROPS.res;
                }
                return DIC_HTTP_PROPS.res;
            }
        },
    }
}