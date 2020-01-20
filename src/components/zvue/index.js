import Table from './Table'
import Pagination from './Table/components/pagination.vue'
import Dropdown from './Table/components/dropdown.vue'

import Form from './Form'
import formTemp from "./Form/formtemp";
import Cascader from './Form/components/Cascader';
import Checkbox from './Form/components/checkbox';
import Date from './Form/components/date';
import Group from './Form/components/group';
import Input from './Form/components/input';
import InputNumber from './Form/components/input-number';
import Radio from './Form/components/radio';
import Select from './Form/components/select';
import Slider from './Form/components/slider';
import Switch from './Form/components/switch';
import Time from './Form/components/time';
import Tree from './Form/components/tree';
import Upload from './Form/components/upload';

// directive
import Clickout from "./directive/clickout"

const components = [
    Dropdown,
    Pagination,
    Table,
    Cascader,
    Checkbox,
    Date,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    Time,
    Tree,
    Upload,
    formTemp,
    Group,
    Form
]

const install = (Vue) => {
    Clickout(Vue);
    components.forEach(component => {
        Vue.component(component.name, component)
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    author: 'lxh',
    version: '1.0',
    Table,
    Cascader,
    Checkbox,
    Date,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    Time,
    Tree,
    Upload,
    formTemp,
    Group,
    Form,
    install
}