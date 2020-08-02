<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="changeFirstCateId()">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
            <!-- 后端要分类编号所以value的值传的的id -->
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="价格" label-width="80px">
          <el-input
            v-model="form.price"
            autocomplete="off"
            oninput="value=value.replace(/[^\d]/g,'')"
          ></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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
        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" @change="changeSpecsId()">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态组件 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="80px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in attrsArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否新品 -->
        <el-form-item label="是否新品 " label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <!-- 选中的值在label上 -->
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <!-- 是否热卖 -->
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <!-- 选中的值在label上 -->
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <!-- 商品描述 -->

        <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
        </el-form-item>

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
import {
  requestGoodsAdd,
  requestGoodsDetail,
  requestGoodsUpdate
} from "../../../util/request";

import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";

export default {
  computed: {
    ...mapGetters({
      //分类的一级列表
      cateList: "cate/list",
      //去规格列表数据
      specList: "spec/list"
    })
  },
  props: ["info"],
  components: {},
  data() {
    return {
      firstCateArr: {},
      //编辑器对象
      editor: null,
      //二级分类的数组
      secondCateArr: [],
      //商品规格属性值
      attrsArr: [],
      imageUrl: "",
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        specsid: "",
        specsattr: [], //可多选
        isnew: 1,
        ishot: 1,
        status: 1,
        description: ""
      }
    };
  },
  methods: {
    ...mapActions({
      //获取分类页表
      requestCateList: "cate/requestList",
      //获取规格列表
      requestSpecList: "spec/requestList",
      //获取商品总数
      requestGoodsCount: "goods/requestTotal",
      //获取商品列表
      requestGoodsList: "goods/requestList"
    }),
    //修改看一级分类时
    changeFirstCateId(bool) {
      let index = this.cateList.findIndex(
        item => item.id == this.form.first_cateid
        //item.id 得到所有行的里面的id信息
        //this.form.first_cateid  点击选择后得到具体的某一条的id
      );

      this.firstCateArr = this.cateList[index];
      console.log(this.firstCateArr);
      //把选中行的children 子数组，复制给二级分类
      this.secondCateArr = this.cateList[index].children;
      //传了true,second_cateid就不置空；没传就置空
      if (!bool) {
        //如果前面没传值（没点击切换是），置空，切换后，不置空
        this.form.second_cateid = "";
      }
    },
    /////商品规格发生了改变
    changeSpecsId(bool) {
      //得到点击的下标
      let index = this.specList.findIndex(item => item.id == this.form.specsid);
      this.attrsArr = this.specList[index].attrs; //把子数组赋值给它
      if (!bool) {
        this.form.specsattr = [];
      }
    },

    addAttr() {
      this.attrArr.push({ value: "" });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },

    cancel() {
      this.info.show = false;
      this.empty();
    },

    changeImg(e) {
      //
      console.log(e);
      if (e.seze > 2 * 1024 * 1024) {
        warningAlert("上传图片不能超过2M");
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
      //二级分类的数组
      this.secondCateArr = [];
      //商品规格属性值
      this.attrsArr = [];
      //图片地址
      this.imageUrl = "";
      //提交给后端的数据
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
        description: ""
      };
      this.editor.txt.html(""); //把编辑器清空，不然点击一次就多弹出一个
    },

    add() {
      /* console.log(this.form.first_cateid)
        console.log(this.form.second_cateid)
        console.log(this.form.goodsname.length)
        
        console.log(this.form.price.length)
        console.log(this.form.market_price.length)
        console.log(this.form.img)
        console.log(this.form.specsid)
        console.log(this.form.specsattr.length)
        console.log(this.form.description.length)
        
       console.log(this.form.first_cateid)
        console.log(this.form.second_cateid)
         console.log(this.form.specsid)
        // console.log(this.form.description)
      // console.log(this.form) */
      this.form.description = this.editor.txt.html();

      if (
        this.form.first_cateid == null ||
        this.form.second_cateid == null ||
        this.form.goodsname.length == 0 ||
        this.form.price.length == 0 ||
        this.form.market_price.length == 0 ||
        this.form.img == null ||
        this.form.specsid == null ||
        this.form.specsattr.length == 0 ||
        this.form.description == null
      ) {
        return warningAlert("添加的内容不能留空");
      }

      //this里面的变量都可以拿到
      // 这里要传description 参数的值

      //specsattr 是多选，是个数组，要转成字符串
      this.form.specsattr = JSON.stringify(this.form.specsattr);
      //转换数据类型
      requestGoodsAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          //重新获取商品列表数据
          this.requestGoodsList();
          //重新获取总的数量 ，，更新页面
          this.requestGoodsCount();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    getDetail(id) {
      //add的时候 attrs 用JSON.stringify 转字符串

      requestGoodsDetail({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        //图片地址
        this.imageUrl = this.$imgPre + this.form.img;

        this.form.specsattr = JSON.parse(this.form.specsattr);
        //二级分类是循环的数据，是根据一级分类发生改变而生效的，而一进页面一级分类，没发生改变，二级分类循环的数组就是空数组

        //根据一级分类计算出二级分类的数组 ,穿个值，作为置空的判断  ,先要转化数组的数据类型，不然不出数据
        this.changeFirstCateId(true);
        //根据商品规格计算出商品属性
        this.changeSpecsId(true);
      });
    },
    //创建编辑器
    createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description); ////
      //传description 值
    },

    //修改更新
    update() {
      this.form.description = this.editor.txt.html();
      this.form.specsattr = JSON.stringify(this.form.specsattr);

      requestGoodsUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.requestCateList();
    }
    this.requestSpecList(true);
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