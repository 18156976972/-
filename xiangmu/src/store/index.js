import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

//引入公共的
import {state,mutations,getters} from "./mutations"
import actions from "./actions"

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{}
})