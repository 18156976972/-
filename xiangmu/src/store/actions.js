export default { 
    changeUser(context,obj){    //vuex保存了用户信息 //请求数据后把信息存在user里面（=list） 用obj 传res.data.list  参数
        context.commit('changeUser',obj)
    }
}