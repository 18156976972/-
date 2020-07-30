export const state={
  /* user:null */
  user:sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):null
}
export const mutations={
  changeUser(state,user){
      state.user=user;

      if(state.user){  //本地存的数据都是字符串
        sessionStorage.setItem("user",JSON.stringify(state.user))
      }
      
  }
}

export const getters={
  user(state){
      return state.user
  }
}