<template>
  <div class="add">
    <!-- 头 -->
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <!-- 1 -->
        <el-form-item label="上级分类" label-width="80px">
          <el-select v-model="form.pid">
            <!-- 下拉框的值，要传给数据库中对应的key  所以这里是form.pid -->
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!--  :value="0"  加： 变成number的0 -->

            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
            <!-- 动态数据 -->
          </el-select>
        </el-form-item>

        <!-- 2 -->
        <el-form-item label="分类名称" label-width="80px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" label-width="80px" v-if="form.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 5状态 -->

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
          <!-- :active-value="1"  让它激活时 值为1   切是number类型-->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="updata()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//引入axios
import {
  requestCateAdd,
  requestCateDetail,
  requestCateUpdate
} from "../../../util/request";
//引入弹出的成功框  ，  警告框
import { successAlert, warningAlert } from "../../../util/alert";

import { mapGetters, mapActions } from "vuex";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  components: {},
  data() {
    return {
       //上传完成的时候图片的地址
      imageUrl: "",

      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      requestList: "cate/requestList"
    }),
    //模块消失
    cancel() {
      this.info.show = false;
      //当点击list 里面的修改时，isAdd =false
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //重置内容
    empty() {
       this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },
    //点击了添加按钮
    add() {
       if(this.form.catename.length==0){
           return   warningAlert('添加的内容不能留空');
       }
      if(this.form.pid !=0 &&( this.form.catename.length==0 || this.form.img==null )){
           return   warningAlert('添加的内容不能留空');
        }

      
     
      requestCateAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据（添加成功后）
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求list数据（axios里的）
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    changeImg(e){
      //
       console.log(e)
       if(e.seze>2*1024*1024){
         warningAlert('上传图片不能超过2M')
         return
       }
      //
      var extname = e.name.slice(e.name.lastIndexOf('.'));
      var extArr=['.png','.jpg','.gif','.jpeg']
      if(!extArr.some(item => item ===extname)){
        warningAlert('上传文件必须时图片')
        return
      }

      //file 是上传的文件
       var file = e.raw;
       //生成一个URL地址，赋值给imageUrl,展示出来
       this.imageUrl = URL.createObjectURL(file);
       this.form.img =file
    },



    getDetail(id) {
      requestCateDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },

    updata() {
      
      requestCateUpdate(this.form).then(res => {
        //  console.log(this.form)
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.requestList(); //这个方法需要从vuex中映入
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>

.add >>> .el-upload {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.add >>> .el-upload:hover {
    border-color: #409EFF !important;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>