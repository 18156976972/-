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
          <el-menu-item index="/index/home">
            <i class="el-icon-setting"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/index/menu">菜单管理</el-menu-item>
            <el-menu-item index="/index/role">角色管理</el-menu-item>
            <el-menu-item index="/index/manage">管理员管理</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/index/cate">商品分类</el-menu-item>
            <el-menu-item index="/index/spec">商品规格</el-menu-item>
            <el-menu-item index="/index/goods">商品管理</el-menu-item>
            <el-menu-item index="/index/member">会员管理</el-menu-item>
            <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
            <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
          </el-submenu>
        </el-menu>

        <!-- 中间 -->
      </el-aside>

      <!-- 中间 -->
      <el-container>
        <!-- 中间的上面 -->
        <el-header>
          <div class="header-con">
            <span>admin</span>
            <el-button type="primary">退出</el-button>
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
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
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
</style>