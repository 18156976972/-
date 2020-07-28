<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编码" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>

      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编 辑</el-button>
          <del-btn @comfirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
<!-- 分页 -->
    <el-pagination background layout="prev, pager, next" @current-change="cPage" :page-size="size" :total="total"></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { requestManageDelete } from "../../../util/request";

export default {
  computed: {
    ...mapGetters({
      list: "manage/list",
      total: "manage/total",
      size: "manage/size"
    })
  },
  components: {},
  data() {
    return {
     
    };
  },
  methods: {
    ...mapActions({
      requestList: "manage/requestList",
      requestTotal: "manage/requestTotal",
      changePage: "manage/changePage"
    }),

    edit(id){
        this.$emit('edit',id)
    },

    cPage(a){  //a 是当前页面的页码
        this.changePage(a)    //出发axios
        this.requestList()
    },
     del(id) {
      requestManageDelete({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.requestList();
          this.requestTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
      this.requestTotal();
    this.requestList();
  }
};
</script>
<style scoped>
</style>