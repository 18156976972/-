<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编 辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {requestMemberDelete} from '../../../util/request'
import {successAlert,warningAlert} from '../../../util/alert'
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "member/list",
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
      requestMemberList: "member/requestList" 
    }),
    edit(id){
         this.$emit("edit",id)
    },

  },
  mounted() {  //请求数据
      this.requestMemberList()
  }
};
</script>
<style scoped>
</style>