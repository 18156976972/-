<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="商品编码" width="180"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
      <el-table-column  label="图片" width="180">
          <template slot-scope="scope">
           <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>

      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
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
import { requestGoodsDelete } from "../../../util/request";

export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size"
    })
  },
  components: {},
  data() {
    return {
     
    };
  },
  methods: {
    ...mapActions({
     requestGoodsList: "goods/requestList",
      requestTotal: "goods/requestTotal",
      changePage: "goods/changePage",
      
    }),

    edit(id){
        this.$emit('edit',id)
    },

    cPage(a){  //a 是当前页面的页码
        this.changePage(a)    //出发axios
        this.requestGoodsList()
    },
     del(id) {
      requestGoodsDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.requestTotal();
          this.requestGoodsList();
          
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestTotal();
    this.requestGoodsList();
  }
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>