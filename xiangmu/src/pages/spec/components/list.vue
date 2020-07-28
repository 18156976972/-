<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编码" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column  label="规格属性" width="180">
          <template slot-scope="scope">
        <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>


      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <del-btn @comfirm="del(scope.row.id)"></del-btn>
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
import { requestSpecDelete } from "../../../util/request";

export default {
  computed: {
    ...mapGetters({
      list: "spec/list",
      total: "spec/total",
      size: "spec/size"
    })
  },
  components: {},
  data() {
    return {
     
    };
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
      changePage: "spec/changePage"
    }),

    edit(id){
        this.$emit('edit',id)
    },

    cPage(a){  //a 是当前页面的页码
        this.changePage(a)    //出发axios
        this.requestList()
    },
     del(id) {
      requestSpecDelete({ id: id }).then((res) => {
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