var Clickoutside = {
  bind(el, binding, vnode) {
    if (binding.value) {
      setTimeout(() => {
        window.top.document.body.append(el)
      }, 0);
    }
  }
};
export default (Vue) => {
  Vue.directive('append-to-body', Clickoutside)
}