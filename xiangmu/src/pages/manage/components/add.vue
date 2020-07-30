<template>
  <div>
    <el-dialog title="管理员列表" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动区域" label-width="80px">
          <el-select v-model="form.roleid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
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
import { requestManageAdd, requestManageDetail ,requestManageUpdate} from "../../../util/request";

import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      roleList: "role/list"
    })
  },
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      requestRoleList: "role/requestList",
      requestManageList: "manage/requestList",
      requestTotal: "manage/requestTotal"  //获取总页数
    }),
    cancel() {
      this.info.show = false;
    },
    //置空
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password:"",
        status: 1,
      }
    },

    add() {
      //   this.form.roleid = Number(this.form.roleid);
      requestManageAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.requestManageList();
          
          this.requestTotal(); 
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    getDetail(id) {
      requestManageDetail({ uid: id }).then(res => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },

    //点击了修改
    update() {
     
      requestManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          this.requestManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

  },
  mounted() {
    if (this.roleList.length == 0) {
      this.requestRoleList();
    }
  }
};
</script>
<style scoped>
</style>