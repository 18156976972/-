<template>
  <div>
       <el-button type="primary" @click="add">添加</el-button>

       <!-- 添加弹框 -->
    <v-add :info="info" ref="add"></v-add>

    <!-- 列表 -->
    <v-list @edit='edit'></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
      vAdd,
      vList
  },
  data() {
    return {
        info: {
        //弹框的出现状态
        show: false,
        title:"菜单添加",
        isAdd:true   //判断此时是添加还是修改 ,
      },
    };
  },
  methods: {
       add() {
      this.info.show = true;
      this.info.title="菜单添加"
      this.info.isAdd=true     //true 时 添加
    },
    edit(id){  //调用add里面的方法, id给收传的值
        this.info.show = true;
        this.info.title="菜单编辑"
        this.info.isAdd=false   //false 时 编辑
        this.$refs.add.getDetail(id)
        // console.log(id)
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>