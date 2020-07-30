<template>
  <div>
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
        title:"会员修改",
        isAdd:true   //判断此时是添加还是修改 ,
      },
    };
  },
  methods: {
    edit(id){
        this.info.show = true;
       this.$refs.add.getDetail(id);
       this.info.isAdd=false;
    
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>