<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
         <del-btn @comfirm='del(scope.row.id)'></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {requestRoleDelete} from '../../../util/request'
import {successAlert,warningAlert} from '../../../util/alert'
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  components: {},
  data() {
    return {
        // list:[]
    };
  },
  methods: {
      ...mapActions({
      requestList: "role/requestList" 
    }),
    edit(id){
         this.$emit("edit",id)
    },

    del(id){
      requestRoleDelete({id:id}).then(res=>{
        if(res.data.code ==200){
          successAlert(res.data.msg)
          //
          this.requestList()
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {  //请求数据
      this.requestList()
  }
};
</script>
<style scoped>
</style>