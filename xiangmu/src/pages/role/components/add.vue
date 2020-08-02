<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="80px">
          <!-- :default-checked-keys="[1,5]" 默认选中的数组 -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :default-checked-keys="arr"
            :props="defaultProps"
            ref="tree"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestRoleAdd,
  requestRoleDetail,
  requestRoleUpdate
} from "../../../util/request";
//引入弹出的成功框  ，  警告框
import { successAlert, warningAlert } from "../../../util/alert";

export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      menuList: "menu/list"
    })
  },
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1
      },
      //树形结构的数据  //这里是换值的
      defaultProps: {
        children: "children",
        label: "title" //这里是换值的
      },
      arr: []
    };
  },
  methods: {
    ...mapActions({
      requesMenutList: "menu/requestList",
      requestRoleList: "role/requestList"
    }),
    cancel() {
      this.info.show = false;
      this.empty();
      //当点击list 里面的修改时，isAdd =false
    },
    empty() {
      //清空内容
      this.form = {
        rolename: "",
        menus: "",
        status: 1
      };
      //将树形结构的数据，选中时将key置空
      this.$refs.tree.setCheckedKeys([]);
    },
    add() {
      //this.$refs.tree.getCheckedKeys()  选中的节点对应的key值 ，输出是一个数组
      // console.log(this.$refs.tree.getCheckedKeys())
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      if (this.form.rolename.length == 0) {
        console.log(this.form.menus);
        return warningAlert("添加的内容不能留空");
      }
      if (this.form.menus.length == 2) {
        return warningAlert("添加的内容不能留空");
      }

      requestRoleAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //清空
          this.empty();
          //弹框消失
          this.cancel();
          //重新获取角色列表数据
          this.requestRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    getDetail(id) {
      //   console.log(id)
      requestRoleDetail({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id; // 没有id 补id
        //因为要的是数组，而res.data.list.menus 角色权限，对应点击的key
        this.arr = JSON.parse(res.data.list.menus);
      });
    },

    update() {
      requestRoleUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestRoleList();
          this.empty();
          this.cancel();
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    //如果之前menu的list没有请求，就发请求，请求你过了，就不发了
    if (this.menuList.length === 0) {
      this.requesMenutList();
    }
  }
};
</script>
<style scoped>
</style>