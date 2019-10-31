/**
 * 扁平化无限嵌套数组
 * 传入一个多维数组，返回一维数组
 * @param {无限嵌套数组} arr 
 */
exports.flattenDeep = function flattenDeep(arr) {
  return arr.reduce((acc, cur) => {
    if (cur instanceof Array) {
      var curFlat = flattenDeep(cur)
      return acc.concat(curFlat);
    } else {
      return acc.concat(cur);
    }
  }, [])
}
//获取当前网址函数
exports.getRootPath = function () {
  //获取当前网址，如： http://localhost:8088/test/test.jsp
  var curPath = window.document.location.href;
  //获取主机地址之后的目录，如： test/test.jsp
  var pathName = window.document.location.pathname;
  var pos = curPath.indexOf(pathName);
  //获取主机地址，如： http://localhost:8088
  var localhostPath = curPath.substring(0, pos);
  //获取带"/"的项目名，如：/test
  var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
  return (localhostPath + projectName); //发布前用此
}
