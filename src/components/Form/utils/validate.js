export const validatenull = (value) => {
    return _.isEmpty(value) && !_.isNumber(value) && !_.isDate(value) && !_.isBoolean(value) && !_.isFunction(value);
}