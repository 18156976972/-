<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    ><!-- 'children' 子节点 -->
      <el-table-column prop="id" label="菜单编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="菜单名称" width="180"></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
           <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>

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
import {requestCateDelete} from '../../../util/request'
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "cate/requestList" ///requestList 是actions下的方法
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
          requestCateDelete({id:id}).then(res=>{
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
img{
  width: 70px;
  height: 60px;
}
</style>