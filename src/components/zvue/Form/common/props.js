import { initVal } from '../utils/dataformat';
import { validatenull } from '../utils/validate'
import { DIC_PROPS, DIC_HTTP_PROPS } from '../global/variable';
export default function () {
    return {
        data() {
            return {
                name: '',
                text: undefined,
                propsHttpDefault: DIC_HTTP_PROPS,
                propsDefault: DIC_PROPS
            };
        },
        props: {
            blur: Function,
            focus: Function,
            change: Function,
            click: Function,
            value: {},
            button: {
                type: Boolean,
                default: false
            },
            border: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            column: {
                type: Object,
                default: () => { }
            },
            dic: {
                type: Array,
                default: () => []
            },
            disabled: {
                type: Boolean,
                default: false
            },
            dataType: {
                type: String
            },
            group: {
                type: Boolean,
                default: false
            },
            listType: {
                type: String,
                default: 'text'
            },
            label: {
                type: String,
                default: ''
            },
            min: {
                type: Number
            },
            max: {
                type: Number
            },
            multiple: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
                default: ''
            },
            propsHttp: {
                type: Object,
                default: () => DIC_HTTP_PROPS
            },
            props: {
                type: Object,
                default: () => DIC_PROPS
            },
            readonly: {
                type: Boolean,
                default: false
            },
            rules: {
                type: Array
            },
            row: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: ''
            },
            tip: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: ''
            },
            typeformat: Function,
            typeslot: {
                type: Boolean,
                default: false
            },

            dicData: {
                type: Array,
                default: () => []
            },
            dicUrl: {
                // type: String || Function,
                default: ''
            },
            dicMethod: {
                type: String,
                default: ''
            },
            dicQuery: {
                type: Object,
                default: () => {
                    return {}
                }
            },
        },
        watch: {
            value: {
                handler(val) {
                    this.initVal();
                },
                immediate: true
            }
        },
        computed: {
            componentName() {
                const type = 'el';
                const result = `${type}-${this.name}${this.button ? '-button' : ''}`
                return result
            },
            required() {
                return !validatenull(this.rules);
            },
            isArray() {
                return this.dataType === 'array';
            },
            isString() {
                return this.dataType === 'string';
            },
            isNumber() {
                return this.dataType === 'number';
            },
            nameKey: function () {
                return this.propsHttp.name || this.propsHttpDefault.name;
            },
            urlKey: function () {
                return this.propsHttp.url || this.propsHttpDefault.url;
            },
            resKey: function () {
                return this.propsHttp.res || this.propsHttpDefault.res;
            },
            groupsKey: function () {
                return this.props.groups || this.propsDefault.groups;
            },
            valueKey: function () {
                return this.props.value || this.propsDefault.value;
            },
            labelKey: function () {
                return this.props.label || this.propsDefault.label;
            },
            childrenKey: function () {
                return this.props.children || this.propsDefault.children;
            },
            disabledKey: function () {
                return this.props.disabled || this.propsDefault.disabled;
            },
            idKey: function () {
                return this.props.id || this.propsDefault.id;
            }
        },
        methods: {
            initVal() {
                this.text = initVal({
                    type: this.type,
                    listType: this.listType,
                    multiple: this.multiple,
                    dataType: this.dataType,
                    value: this.value,
                    "curentForm": this
                });
            }
        }
    };
}
