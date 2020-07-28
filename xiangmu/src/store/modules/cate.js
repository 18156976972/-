
//引入 一个获取数据的axios
import {requestCateList} from "../../util/request"
//1
const state={
    //列表数据
    list:[]
}
//2
const mutations={
    //修改list
    changeList(state,arr){
        state.list=arr;
    }
}
//3
const actions={
    requestList(context){ //触发
        
        requestCateList({istree:true}).then(res=>{  //istree:true  是否让它展现树形结构  
            context.commit("changeList",res.data.list)
        })
    }
}
//4
const getters={
    list(state){
        return state.list
    }
}

//5
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}