<template>
  <div>
    <!-- 头 -->
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form" >
        <!-- 1 -->
        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 2 -->
        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid">
            <!-- 下拉框的值，要传给数据库中对应的key  所以这里是form.pid -->
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!--  :value="0"  加： 变成number的0 -->

            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
            <!-- 动态数据 -->
          </el-select>
        </el-form-item>

        <!-- 3.菜单类型 -->
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>


        <!-- 4.菜单图表 -->
        <el-form-item label="菜单图标" label-width="80px" v-if="form.type==1"><!-- 1是目录，让它出现 -->
          <el-select v-model="form.icon">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 4.菜单地址 -->
        <el-form-item label="菜单地址" label-width="80px" v-else>
          <!-- v-else 判断哪个出现，哪个消失，2是目录，让它出现 -->
          <el-select v-model="form.url">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>   <!-- 循环出数据 -->
          </el-select>
        </el-form-item>


        <!-- 5状态 -->

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch><!-- :active-value="1"  让它激活时 值为1   切是number类型-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="updata()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//引入axios
import {requestMenuAdd,requestMenuDetail,requestMenuUpdate} from "../../../util/request";
//引入弹出的成功框  ，  警告框
import { successAlert, warningAlert } from "../../../util/alert";

import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      //图标集合
      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid"
      ],
      //路由集合
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
        "/cate",
        "/spec",
        "/goods",
        "/banner",
        "/seckill",
        '/member',
      ],
      //和后端给的值保持一致
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      requestList: "menu/requestList",
    }),
      //模块消失
    cancel() {
      this.info.show = false; 
      //当点击list 里面的修改时，isAdd =false
      if(!this.info.isAdd){
        this.empty()
      }
    },
    //重置内容
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    //点击了添加按钮
    add() {
      requestMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据（添加成功后）
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求list数据（axios里的）
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
   //获取某一条数据( 在list 点击，让父级menu 反应, 父级使用add里面的方法，请求详细数据，赋值在 表单中，供编辑)
    getDetail(id){
      console.log(id)
      requestMenuDetail({id:id}).then(res=>{
         this.form = res.data.list;  //赋值给form
        this.form.id = id;       //点击修改传参时，form中缺少id ，补一个
                                 // 这里的id是从list里面传过来的
      })
    },

    updata(){
        requestMenuUpdate(this.form).then(res=>{
          //  console.log(this.form)
          if(res.data.code ==200){
            successAlert(res.data.msg)
            this.empty()
            this.requestList()  //这个方法需要从vuex中映入
            this.cancel()
          }else{
            warningAlert(res.data.msg)
          }
        })
    }
  },
  mounted() {
      
  }
};
</script>
<style scoped>
</style>