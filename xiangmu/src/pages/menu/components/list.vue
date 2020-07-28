<template>
  <div>
    <!--     lazy  :load="load"   //不需要 -->
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    ><!-- 'children' 子节点 -->
      <el-table-column prop="id" label="菜单编号" width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>

      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <!-- scope当前一整行的数据 -->
          <i :class="scope.row.icon"></i>
  
          <!-- i 放图标 -->
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <!--  -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!--  -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {requestMenuDelete} from '../../../util/request'
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "menu/requestList" ///requestList 是actions下的方法
      // 辅助函数，注册actions 下的方法
    }),
    edit(id){
       this.$emit("edit", id);
    },
    del(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          requestMenuDelete({id:id}).then(res=>{
              if(res.data.code==200){
                  successAlert(res.data.msg);
              this.requestList()
              }else{
                  warningAlert(res.data.msg)
              }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     }
  },
  mounted() {
    //一进页面就加载， 触发vuex的actions里的方法
    this.requestList();
  }
};
</script>
<style scoped>
</style>