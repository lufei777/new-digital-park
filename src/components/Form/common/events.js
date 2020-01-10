export default function () {
    return {
        methods: {
            handleFocus() {
                typeof this.focus === 'function' && this.focus(this)
            },
            handleBlur() {
                typeof this.blur === 'function' && this.blur(this)
            },
            getLabelText(item) {
                if (this.validatenull(item)) return ''
                if (typeof this.typeformat === 'function') {
                    return this.typeformat(item, this.labelKey, this.valueKey);
                }
                return item[this.labelKey]
            },
            handleClick() {
                const result = this.isString && this.multiple ? this.text.join(',') : this.text;
                if (typeof this.click === 'function') {
                    this.click({ value: result, column: this.column, _self: this });
                }
            },
            handleChange(value) {
                let result = value;
                this.text = result;

                if (this.isString || this.isNumber) {
                    if (this.multiple || ['checkbox', 'cascader', 'dynamic'].includes(this.type)) {
                        result = value.join(',')
                    } else if (this.isNumber) {
                        result = parseFloat(result);
                        if (isNaN(result)) {
                            result = undefined;
                        }
                    }
                }

                if (typeof this.change === 'function') {
                    this.change({ value: result, column: this.column, _self: this });
                }

                this.$emit('input', result);
                this.$emit('change', result);
            }
        }
    };
}
