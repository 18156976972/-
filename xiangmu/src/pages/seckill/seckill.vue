<template>
<div>
    <el-button type="primary" @click="add">添 加</el-button>

    <v-add :info='info' ref="add"></v-add>
    <v-list @edit='edit' ></v-list>
</div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
import {mapActions,mapGetters} from 'vuex'

export default {
components:{
    vAdd,
    vList
},
data(){
return {
    info:{
        show:false,
        title:'秒杀活动列表添加',
        isAdd:true
    }
}
 },
 methods:{
     add(){
        this.info.show = true;
      this.info.title = "秒杀活动列表添加";
      this.info.isAdd=true
     },

     edit(id){
         this.info.show =true
          this.info.title = "秒杀活动列表修改";
         this.$refs.add.getDetail(id);
         this.info.isAdd=false
  
     }
 },
 mounted(){}
}
</script>
<style scoped>
</style>