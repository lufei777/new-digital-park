import { DIC_HTTP_PROPS } from "../global/variable";

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
            listKey() {
                return getKeyByName(this.tableConfig, 'list');
            },
            pageNumKey() {
                return getKeyByName(this.tableConfig, 'pageNum');
            },
            pageSizeKey() {
                return getKeyByName(this.tableConfig, 'pageSize');
            },
            totalKey() {
                return getKeyByName(this.tableConfig, 'total');
            },
            resKey() {
                return getKeyByName(this.tableConfig, 'res');
            }
        },
    }
}