//  用vm 替代this
import Vue from "vue"
var vm=new Vue();
//成功弹框
export const successAlert = (msg)=>{
    vm.$message({
        message: msg,
        type: 'success'
    });
}

//警告弹框
export const warningAlert = (msg)=>{
    vm.$message({
        message: msg,
        type: 'warning'
    });
}

//错误弹框
export const errorAlert = (msg)=>{
    vm.$message.error(msg);
}

/*   //确认删除框
 import {requestMenuDelete} from '../util/request'

export const delAlert =(id)=>{
    vm.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        requestMenuDelete({id:id}).then(res=>{
          if(res.data.code==200){
              successAlert(res.data.msg);
          this.requestList()
          }else{
              warningAlert(res.data.msg)
          }
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
}  */
 