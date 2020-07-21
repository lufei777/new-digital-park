import store from '@/vuex/store'

/**
 * @param {Array} value
 * @param {Array} pageRoles
 * @returns {Boolean}
 */
export function checkPermission(value, pageRoles = store.getters && store.getters.pageRoles) {

  if (value && value instanceof Array && value.length > 0) {
    const permissionRoles = value;
    let roles = pageRoles;
    // 如果只是对象，则校验当前页面权限，否则是校验用户角色权限
    // 获取当前hash路由
    if (typeof roles === 'object' && !(roles instanceof Array)) {
      const hash = location.hash;
      const first = hash.indexOf('#') + 1;
      const last = hash.indexOf('?');
      const currentPath = hash.substring(first, last === -1 ? undefined : last);
      roles = roles[currentPath];
    }

    // 从pageRoles中去除当前路由的roles
    let list = (roles.list|| []).map(item => item.permissionFlag)
    const hasPermission = list.some(role => {
      return permissionRoles.includes(role)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}

/**
 * 设置用户当前页面权限
 * @param {Array} roles
 */
const rolesKey = 'roles';

export function setRoles(roles) {
  sessionStorage.setItem(rolesKey, JSON.stringify(roles));
}

export function getRoles() {
  return JSON.parse(rolesKey.getItem(pageRolesKey));
}

export function removeRoles() {
  sessionStorage.removeItem(rolesKey);
}

/**
 * 设置用户当前页面权限
 * @param {Array} roles
 */
const pageRolesKey = 'pageRoles';

export function setPageRoles(roles) {
  sessionStorage.setItem(pageRolesKey, JSON.stringify(roles));
}

export function getPageRoles() {
  return JSON.parse(sessionStorage.getItem(pageRolesKey));
}

export function removePageRoles() {
  sessionStorage.removeItem(pageRolesKey);
}
