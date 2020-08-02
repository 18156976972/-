<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">

        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
        <!--  -->
        
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
          <!-- :active-value="1"  让它激活时 值为1   切是number类型-->
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { successAlert, warningAlert } from "../../../util/alert";
import { requestBannerAdd, requestBannerDetail,requestBannerUpdate} from "../../../util/request";

import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";

export default {
  computed: {
    ...mapGetters({
      //轮播图列表数据
      bannerList: "banner/list"
    })
  },
  props: ["info"],
  components: {},
  data() {
    return {
   
      //商品规格属性值
      imageUrl: "",
      form: {
        title:'',
        img:null,
        status:1,
      }
    };
  },
  methods: {
    ...mapActions({
      //获去轮播图列表
      requestBannerList: "banner/requestList"
    }),

    cancel() {
      this.info.show = false;
      this.empty()
    },
///////////图片的改变事件
    changeImg(e) {
      //
      console.log(e);
      if (e.seze > 4 * 1024 * 1024) {
        warningAlert("上传图片不能超过4M");
        return;
      }
      //
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!extArr.some(item => item === extname)) {
        warningAlert("上传文件必须时图片");
        return;
      }
      //file 是上传的文件
      var file = e.raw;
      //生成一个URL地址，赋值给imageUrl,展示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //置空
    empty() {
      //图片地址
      this.imageUrl = "";
      //提交给后端的数据
      this.form = {
         title:'',
        img:null,
        status:1,
      };
      this.editor.txt.html(""); //把编辑器清空，不然点击一次就多弹出一个
    },

    add() {
         if(this.form.title.length==0 || this.form.img==null){
           return   warningAlert('添加的内容不能留空');
        }

        // this.form.img = this.imageUrl;
      requestBannerAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          //重新获取商品列表数据
          this.requestBannerList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    getDetail(id) {
      //add的时候 attrs 用JSON.stringify 转字符串
      requestBannerDetail({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        //图片地址
        this.imageUrl = this.$imgPre + this.form.img;
      });
    },
    //创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description);
      //传description 值
    },

    //修改更新
    update() {
      requestBannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
         this.requestBannerList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // if (this.bannerList.length == 0) {
    //   this.requestBannerList();
    // }
  }
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
  border-color: #409eff !important;
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