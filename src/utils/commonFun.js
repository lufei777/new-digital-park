class commonFun {
  //this,删除的id,没有id时的提示信息，点击确定的回调函数
  deleteTip(that,deleteId,msgTip,callBack){
    if(!deleteId){
      that.$message({
        type: 'warning',
        message: msgTip,
        duration:1000
      });
      return;
    }
    that.$confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      callBack()
    }).catch(() => {
      that.$message({
        type: 'info',
        message: '已取消删除',
      });
    });
  }
}
export default new commonFun()
