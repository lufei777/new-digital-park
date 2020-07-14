// 根据后台返回的路由获取拍平后的路由
export const flatMenus = (menu, menus, menupaths) => {
  let flatmenus = menus || [];
  let flatmenupaths = menupaths || [];
  // 挑选字段
  let { id, icon, name, routeAddress: path, clientType } = menu;
  // 放入集合
  flatmenus.push({ id, icon, name, path, clientType });
  flatmenupaths.push(path);
  // 递归处理
  if (Array.isArray(menu.childNode) && menu.childNode.length) {
    menu.childNode.forEach(childrenMenu => {
      flatMenus(childrenMenu, flatmenus, flatmenupaths);
    });
  }
  // 返回字段
  return { flatmenus, flatmenupaths };
}

// 根据铺平的路由格式化出菜单
export const formatRoutes = (flatmenupaths, routes) => {
  return routes.map(route => {
    /**
     * TODO
     * 暂时只能先检测最外层的path，不去处理子路由，因为可能会有 查看详情 修改 之类的路由
     * 后台返回的菜单中并没有
     */
    // 如果菜单中有当前路由项，则再检查子项
    if (flatmenupaths.includes(route.path) || flatmenupaths.includes(route.redirect)) {
      return route;
    }
    // 进行递归处理children
    /* if (route.children && route.children.length) {
      // 拼接子路由path，防止没有 / 的path
      route.children = route.children.map(item => {
        if (!item.path.startsWith('/')) {
          item.path = `${route.path}/${item.path}`;
        }
        return item;
      });
      // 子路由处理，拼接path
      route.children = formatRoutes(flatmenupaths, route.children);
      // 如果递归完还存在children，则重新赋值redirect再返回
      if (route.children && route.children.length) {
        // 检查菜单中是否有当前的重定向，如果没有，则需要更改重定向
        let firstIndex = flatmenupaths.indexOf(route.redirect);
        // 如果redirect不存在，则设为子级的第一项
        if (firstIndex === -1) {
          // 防止子路由没有 / 情况
          let firstPath = route.children[0].path;
          route.redirect = firstPath
        }
      }
      return route;
    } else {
      // 如果没有子节点，可能是子路由，则需要判断子路由
      if (flatmenupaths.includes(route.path) || flatmenupaths.includes(route.redirect)) {
        return route;
      }
      return false;
    } */
  }).filter(item => item);
}

// json转换成url 上参数
export function jsonToUrlString(data = {}) {
  let param = function (obj) {
    let query = ''
    let name, value, fullSubName, subName, subValue, innerObj, i
    for (name in obj) {
      value = obj[name]
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i]
          fullSubName = name + '[]'
          innerObj = {}
          innerObj[fullSubName] = subValue
          query += param(innerObj) + '&'
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName]
          fullSubName = name + '[' + subName + ']'
          innerObj = {}
          innerObj[fullSubName] = subValue
          query += param(innerObj) + '&'
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query
  }
  // 加上token
  //  data.accessToken = window.UserConst.accessToken
  // data.userId = store.get("ClassRoomUser") && store.get("ClassRoomUser").userId
  // 增加 去缓存时间戳
  data.noCache = new Date().getTime()
  return data.toString() === '[object Object]' ? param(data) : data
}