<template>
  <span>
       <el-button type="danger" @click="del">删 除</el-button>
  </span>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
      del(){
         this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('comfirm') //出发，让父级去做删除
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      }); 
      }
  },
  mounted() {}
};
</script>
<style scoped>
</style>