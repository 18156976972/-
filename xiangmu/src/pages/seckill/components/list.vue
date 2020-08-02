<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
    
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status==1">启 用</el-button>
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

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import { requestSeckillDelete } from "../../../util/request";

export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    })
  },
  components: {},
  data() {
    return {
     
    };
  },
  methods: {
    ...mapActions({
     requestSeckillList: "seckill/requestList",
    }),

    edit(id){
        this.$emit('edit',id)
    },

     del(id) {
      requestSeckillDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.requestSeckillList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestSeckillList();
    return
  }
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>