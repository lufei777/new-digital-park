import { loadDic, loadCascaderDic } from './dic';
export default function (type) {
  const isCrud = type === 'crud'
  return {
    props: {
      options: {
        type: Object,
        required: true,
        default: () => {
          return {};
        }
      }
    },
    watch: {
      options: {
        handler() {
          this.init();
        },
        deep: true
      }
    },
    data() {
      return {
        DIC: {},
        cascaderDIC: {},
        tableOption: {},
        isMobile: '',
        initDicTimer: null
      };
    },
    created() {
      this.init();
    },
    computed: {
      menuType() {
        return this.tableOption.menuType || 'button';
      },
      isMediumSize() {
        return this.controlSize === 'medium' ? 'small' : this.controlSize;
      },
      controlSize() {
        if (isCrud) {
          return this.tableOption.uiConfig ? this.tableOption.uiConfig.size || 'medium' : 'medium';
        } else {
          return this.tableOption.size || 'medium';
        }
      }
    },
    methods: {
      getKey(item = {}, props = {}, key) {
        return item[
          props[key] || (this.parentOption.props || {})[key] || key
        ];
      },
      getIsMobile() {
        this.isMobile = window.document.body.clientWidth <= 768;
      },
      init() {
        if (isCrud) {
          this.tableOption = this.options;
          this.tableOption.forms = this.options.columnConfig;
        } else {
          this.tableOption = this.options;
        }
        this.getIsMobile();
        window.onresize = () => {
          this.getIsMobile();
        };
        // 规则初始化
        if (this.formRulesInit) {
          this.formRulesInit();
        }
        clearTimeout(this.initDicTimer);
        this.initDicTimer = setTimeout(() => {
          this.initDic();
        }, 10);
      },
      //检测本地字典
      initDic() {
        if (isCrud) {
          // 表格赋值
          this.propOption.forEach(ele => {
            if (Array.isArray(ele.dicData)) {
              this.$set(this.DIC, ele.prop, ele.dicData)
            }
          })
        } else {
          this.columnOption.forEach(ele => {
            (ele.forms || []).forEach(item => {
              if (Array.isArray(item.dicData)) {
                this.$set(this.DIC, item.prop, item.dicData)
              }
            })
          })
        }
      },
      // 加载字典
      handleLoadDic(option) {
        return new Promise((resolve) => {
          const dicFlag = this.vaildData(this.tableOption.dicFlag, true);
          // 初始化字典
          if (dicFlag) {
            loadDic(option || this.tableOption).then((res = {}) => {
              Object.keys(res).forEach(ele => {
                this.$set(this.DIC, ele, res[ele])
              });
              resolve();
            });
            // 加载传进来的字典
          } else {
            const dicData = this.tableOption.dicData || [];
            this.DIC = this.deepClone(dicData);
            resolve();
          }
        })
      },
      handleLoadCascaderDic(option, data) {
        loadCascaderDic(option || (isCrud ? this.propOption : this.columnOption), this.data || [data]).then(res => {
          if (option) {
            Object.keys(res).forEach(ele => {
              this.$set(this.cascaderDIC, ele, res)
            });
          } else {
            this.cascaderDIC = this.deepClone(res);
          }
        });
      }
    }
  };
}
