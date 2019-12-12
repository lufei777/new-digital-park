import { DIC_HTTP_PROPS } from "../global/variable";

export default function () {
    return {
        data() { },
        computed: {
            listKey() {
                let propName = 'list';
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props[propName] || DIC_HTTP_PROPS[propName];
                    }
                    return DIC_HTTP_PROPS[propName];
                }
                return DIC_HTTP_PROPS[propName];
            },
            pageNumKey() {
                let propName = 'pageNum';
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props[propName] || DIC_HTTP_PROPS[propName];
                    }
                    return DIC_HTTP_PROPS[propName];
                }
                return DIC_HTTP_PROPS[propName];
            },
            pageSizeKey() {
                let propName = 'pageSize';
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props[propName] || DIC_HTTP_PROPS[propName];
                    }
                    return DIC_HTTP_PROPS[propName];
                }
                return DIC_HTTP_PROPS[propName];
            },
            totalKey() {
                let propName = 'total';
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props[propName] || DIC_HTTP_PROPS[propName];
                    }
                    return DIC_HTTP_PROPS[propName];
                }
                return DIC_HTTP_PROPS[propName];
            },
            resKey() {
                let propName = 'res';
                if (this.tableConfig.serverMode) {
                    let props = this.tableConfig.serverMode.props
                    if (props) {
                        return props[propName] || DIC_HTTP_PROPS[propName];
                    }
                    return DIC_HTTP_PROPS[propName];
                }
                return DIC_HTTP_PROPS[propName];
            }
        },
    }
}