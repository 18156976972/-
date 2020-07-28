<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="规格属性" label-width="80px" v-for="(item,index) in attrArr" :key="index">
          <el-input v-model="item.value" autocomplete="off"></el-input>
          <el-button type="primary" v-if="index ==0" @click="addAttr()">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删 除</el-button>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
          <!-- :active-value="1"  让它激活时 值为1   切是number类型-->
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="add">添 加</el-button>
        <el-button type="primary" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { successAlert, warningAlert } from "../../../util/alert";
import { requestSpecAdd, requestSpecDetail } from "../../../util/request";

import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      roleList: "spec/list"
    })
  },
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr: [
        {
          value: ""
        }
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      
       requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
    }),
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },

    cancel() {
      this.info.show = false;
    },
    //置空
    empty() {
      this.form = {
        specsname: "",
        attrs: "",   //attrs是后端要的参数
        status: 1
      },
      this.attrArr = [
        {
          value: "",
        },
      ]
    },

    add() {
        //判断数组不能为空
      if (this.attrArr.some(item => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }
      //this.attrArr是的给一个小组，都是一个小的对象，我们只要value的值，不要key
      this.form.attrs = JSON.stringify(this.attrArr.map((item,index)=>{return item.value}));
      //转换数据类型
      requestSpecAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          //重新获取角色列表数据
           this.requestList();
          //重新获取总的数量 ，，更新页面
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    getDetail(id) {
        //add的时候 attrs 用JSON.stringify 转字符串
    
      requestSpecDetail({ id: id }).then(res => {
        this.form = res.data.list[0];
        //这时候 attrs 是"['白色','红色‘，’黄色‘]"
         //add的时候 attrs 用JSON.stringify 转字符串   ,,而展示的时候attrArr需要变成真数组
       this.attrArr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          value: item,
        }));

      });
    }
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.requestList();
    }
  }
};
</script>
<style scoped>
.add >>> .el-form-item__content {
  display: flex;
}
.add >>> .el-input__inner {
  flex: 1;
}
</style>