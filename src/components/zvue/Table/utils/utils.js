import { KEY_COMPONENT_NAME } from '../global/variable';

export const getComponent = (type) => {
    return KEY_COMPONENT_NAME + type;
};

// 设置默认值
export const _objKeysForeach = (obj, cb) => {
    Object.keys(obj).forEach((key, index) => {
        cb(key, obj[key], index);
    });
};
export const setDefaultValue = (defaultOptions, options) => {
    _objKeysForeach(defaultOptions, (key, value, index) => {
        if (!options.hasOwnProperty(key)) {
            options[key] = _.cloneDeep(value);
        } else {
            if (typeof value === "object") {
                setDefaultValue(value, options[key]);
            }
        }
    });
};