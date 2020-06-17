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
    if (flatmenupaths.includes(route.path) || flatmenupaths.includes(route.redirect)) {
      return route
    }
    // 进行递归处理children
    if (route.children && route.children.length) {
      route.children = formatRoutes(flatmenupaths, route.children);
      // 如果递归完还存在children，则重新赋值redirect再返回
      if (route.children && route.children.length) {
        let firstIndex = flatmenupaths.indexOf(route.redirect);
        // 如果不是redirect不存在，则设为子级的某项
        if (firstIndex === -1) {
          // 防止自己没有 / 情况
          let firstPath = route.children[0].path;
          if (!firstPath.startsWith('/')) {
            firstPath = `${route.path}/${firstPath}`;
          }
          route.redirect = firstPath
        }
        return route;
      }

      return false;
    }
  }).filter(item => item);
}