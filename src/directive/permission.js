import { checkPermission } from 'utils/permission';

export default {
  inserted(el, binding, vNode) {
    const { value } = binding;

    if (!checkPermission(value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}