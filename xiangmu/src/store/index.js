import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

//引入公共的
import {state,mutations,getters} from "./mutations"
import actions from "./actions"

//引入 menu
import menu from "./modules/menu"
//引入 role
import role from './modules/role'

import manage from "./modules/manage"

import cate from './modules/cate'

import spec from './modules/spec'

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        manage,
        cate,
        spec
    }
})