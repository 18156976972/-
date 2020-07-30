<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestMemberDetail,
  requestMemberUpdate
} from "../../../util/request";
//引入弹出的成功框  ，  警告框
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      memberList: "member/list"
    })
  },
  data() {
    return {
      form: {
        phone: "",
        nickname: "",
        password: "",
        status: 1
      }
    };
  },
  methods: {
    ...mapActions({
      requestMemberList: "member/requestList"
    }),
    cancel() {
      this.info.show = false;
      this.empty();
    },
    empty() {
      //清空内容
      this.form = {
        phone: "",
        nickname: "",
        password: "",
        status: 1
      };
    },
    getDetail(id) {
      requestMemberDetail({ uid: id }).then(res => {
        this.form = res.data.list;
        this.form.password = ''
        this.form.id = id; // 没有id 补id
      });
    },

    update() {
      requestMemberUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestMemberList();
          this.empty();
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (this.memberList.length === 0) {
      this.requestMemberList();
    }
  }
};
</script>
<style scoped>
</style>