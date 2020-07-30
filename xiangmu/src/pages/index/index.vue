<template>
  <div>
    <el-container class="page">
      <!-- 左边 -->
      <el-aside width="200px">
        <!-- 导航开始 -->
        <!-- 
            router 路由模式
            index 是唯一标识，配置了路由，就改为自己的path
        -->

        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :unique-opened="true"
        >
          <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          
          <!-- 有目录的循环 -->
          <el-submenu v-show="hasChildren"  :index="item.id+''" v-for='item in user.menus' :key='item.id'>
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index='i.url' v-for='i in item.children' :key='i.id'>{{i.title}}</el-menu-item>
          </el-submenu>
          <!-- 无目录的循环 -->
          <el-menu-item  v-show="!hasChildren"  :index="i.url" v-for="(i) in user.menus" :key="i.title">
            <span slot="title">{{i.title}}</span>
          </el-menu-item>
          </el-menu>
<!-- <el-menu-item index="/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/manage">管理员管理</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/cate">商品分类</el-menu-item>
            <el-menu-item index="/spec">商品规格</el-menu-item>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/member">会员管理</el-menu-item>
            <el-menu-item index="/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/seckill">秒杀活动</el-menu-item>
          </el-submenu>
          </el-menu> -->
        <!-- 中间 -->

      </el-aside>

      <!-- 中间 -->
      <el-container>
        <!-- 中间的上面 -->
        <el-header>
          <div class="header-con">
            <span class="username">{{user.username}}</span>
            <el-button type="primary" @click="edit()">退出</el-button>
          </div>
        </el-header>
        <!-- 中间的主体 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  computed:{
    ...mapGetters({
      user:'user'
    }),
     //用来判断是否有目录,根据list (=user)的menu 下的第一页数组，有没有children,有就有目录
    hasChildren(){
      return this.user.menus[0].children?true:false
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      'changeUser':'changeUser'
    }),
    edit(){
      this.changeUser(null) //退出信息清空
      this.$router.push('/login')
      sessionStorage.removeItem("user")
    }

  },
  mounted() {}
};
</script>
<style scoped>
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
  overflow: hidden;
}
.page {
  height: 100vh;
}
.el-menu {
  width: 200px;
  border: none;
}
.header-con {
  float: right;
}
.header-con span {
  line-height: 60px;
  color: #ffffff;
}
.view {
  padding-top: 20px;
}

.username{
  margin-right: 10px;
  font-size: 20px;
}
</style>