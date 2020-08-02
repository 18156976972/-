<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="80px">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form-item>

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
          <el-select v-model="form.second_cateid" @change="change">
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

        <el-form-item label="三（商品）" label-width="80px">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value disabled></el-option>
            <!-- 动态数据 -->
            <el-option
              v-for="item in spArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
  requestSeckillAdd,
  requestSeckillDetail,
  requestSeckillUpdate,
  requestGoodsList
} from "../../../util/request";

import { mapGetters, mapActions } from "vuex";
import E from "wangeditor";

export default {
  computed: {
    ...mapGetters({
      //轮播图列表数据
      seckillList: "seckill/list",
      //一级分类
      cateList: "cate/list",
      //三级分类所需要的数据
      goodsList: "goods/list"
    })
  },
  props: ["info"],
  components: {},
  data() {
    return {
      //商品规格属性值
       value1: [, ],
      // 商品数组(3级)
      spArr: [],

      secondCateArr: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      //获去轮播图列表
      requestSeckillList: "seckill/requestList",
      requestCateillList: "cate/requestList",
      requestgoodsList: "goods/requestList"
    }),

    //修改看一级分类时
    changeFirstCateId(bool) {
      //确定点击的是谁
      let index = this.cateList.findIndex(
        item => item.id == this.form.first_cateid
        //item.id 得到所有行的里面的id信息
        //this.form.first_cateid  点击选择后得到具体的某一条的id
      );

      this.firstCate = this.cateList[index];
      //把选中行的children 子数组，存起来，给二级数组用
      this.secondCateArr = this.cateList[index].children;
      //传了true,second_cateid就不置空；没传就置空
      if (!bool) {
        //如果前面没传值（没点击切换是），置空，切换后，不置空
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    change(bool) {
      requestGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid
      }).then(res => {
        this.spArr = res.data.list;
      });
      if (!bool) {
        //如果前面没传值（没点击切换是），置空，切换后，不置空
        this.form.goodsid = "";
      }
    },

    cancel() {
      this.info.show = false;
      this.empty();
    },

    //置空
    empty() {
      //图片地址
      this.value1 = [,];
      //提交给后端的数据
      this.spArr = [],
        this.form = {
          title: "",
          begintime: "",
          endtime: "",
          first_cateid: "",
          second_cateid: "",
          goodsid: "",
          status: 1
        };
    },

    add() {
       if(Number(this.value1) ==0){
         return warningAlert('添加的内容不能留空')
       }
       
      console.log(Number(this.value1))
      // this.form.begintime = Date.parse(this.value1[0]);
      // this.form.endtime = Date.parse(this.value1[1]);
      console.log(this.form.title.length)
      console.log(Date.parse(this.value1[0]))
      console.log( Date.parse(this.value1[1]))
      console.log( this.value1.length)
      console.log(Number(this.form.first_cateid))
      console.log(this.form.second_cateid)
      console.log(this.form.goodsid)

      if(this.value1.length==1){
           return   warningAlert('添加的内容不能留空');
        }
      if(this.form.title.length==0 ||Number(this.form.first_cateid)==0 ||Number(this.form.second_cateid)==0 ||Number(this.form.goodsid)==0){
        return   warningAlert('添加的内容不能留空');
      }




      // if(this.form.title.length==0 || this.form.pid==0 || this.form.icon.length==0){
      //      return   warningAlert('添加的内容不能留空');
      //   }
      requestSeckillAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          //重新获取商品列表数据
          this.requestSeckillList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      requestSeckillDetail({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        //时间戳变具体时间
        this.value1=[new Date( Number(res.data.list.begintime)),new Date( Number(res.data.list.endtime))]
       
        this.changeFirstCateId(true);
        //根据商品规格计算出商品属性
        this.change(true);
      });
    },

    //修改更新
    update() {
      requestSeckillUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestSeckillList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (this.seckillList.length == 0) {
      this.requestSeckillList();
    }
    if (this.cateList.length == 0) {
      this.requestCateillList();
    }
    if (this.goodsList.length == 0) {
      this.requestgoodsList();
    }
  }
};
</script>
<style scoped>
</style>