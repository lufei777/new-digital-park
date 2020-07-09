export default {
  install(Vue) {
    const modulesFiles = require.context('./', true, /\.js$/)

    modulesFiles.keys().forEach(path => {
      const name = path.replace(/^\.\/(.*)\.\w+$/, '$1')
      if (name != 'index') {
        const directive = modulesFiles(path).default;
        Vue.directive(name, directive);
      }
    });
  }
}

