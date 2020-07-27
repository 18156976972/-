import Vue from 'vue'
import Router from 'vue-router'

//懒加载
const login =()=>import("../pages/login/login.vue")
const index =()=>import("../pages/index/index.vue")
const home = ()=>()=>import("../pages/home/home.vue")
Vue.use(Router)

export default new Router({
  routes: [
    {
       path:'/login',
       component:login
    },
    {
      path:'/index',
      component:index,
      children:[
        {
          path:"home",
          component:home,
        }
      ]
   },
   {
     path:"*",
     redirect:'/login'
   }
  ]
})
