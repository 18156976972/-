<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- v-add 的出现消失，具体是传给子组件内部自己做的判断 -->
    <v-add :info='info' ref="add"></v-add>
    <v-list  @edit="edit($event)"></v-list>
  </div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
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
        this.info.isAdd=true ;
        this.info.title ='添加角色'
    },
    edit(id){
        this.info.show = true;
       this.$refs.add.getDetail(id);
       this.info.isAdd=false;
       this.info.title ='编辑角色'
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>