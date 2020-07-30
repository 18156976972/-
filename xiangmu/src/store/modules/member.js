//引入角色列表请求数据的axios   直接用export 暴露，引用要加{}
import {requestMemberList} from '../../util/request'

const state ={
    list:[]
}

const mutations = {
    changeList(state,arr){  //arr 新的数组
        state.list=arr;
    }
}

const actions ={
    requestList(context){
        requestMemberList().then(res=>{
            context.commit('changeList',res.data.list)
        })
    }
}

const getters = {
    list(state){
      return  state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}