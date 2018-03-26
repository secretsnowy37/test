<template>
  <div class="login">
    <div class="row">
      <div class="col-md-12">
        <ul class="r-list list-inline">
          <li><el-button type="text" @click="tab = 'staff'">: Staff</el-button></li>
          <li><el-button type="text" @click="tab = 'sub-admins'">: Role Admin Users</el-button></li>
        </ul>
      </div>
      <div class="col-md-12">
        <div v-if="tab === 'sub-admins'">
          <h3><span class="fa fa-users"></span> Sub Admins</h3>
          <table class="table table-bordered">
            <thead class="bg-primary">
              <th>S.No</th>
              <th>Role Name</th>
              <th>Role User</th>
              <th>User Status</th>
              <th>Actions</th>
            </thead>
            <tbody>
              <tr v-for="(item, index) in rolesList">
                <th>{{index + 1}}</th>
                <th>{{item.title}}</th>
                <th>{{item.staff_id}}</th>
                <th>{{item.status}}</th>
                <th><el-button type="success" size="mini" @click="openDialog(item, 'edit')">Edit</el-button></th>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="tab === 'staff'">
          <h3><span class="fa fa-users"></span> StaffList</h3>
          <table class="table table-bordered">
            <thead class="bg-primary">
              <th>Staff Id</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Qualification</th>
              <th>Email Address</th>
            </thead>
            <tbody>
              <tr v-for="item in staffList">
                <td>{{item.staffid}}</td>
                <td>{{item.name}}</td>
                <td>{{item.designation}}</td>
                <td>{{item.qualification}}</td>
                <td>{{item.email}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- el-dialog -->
    <el-dialog :title="formTitle" :visible.sync="dialogVisible" width="30%">
      <manage-role :form-title="formTitle" :staff-list="staffList" :form-data="formData" @InfoChanged="refershData()"></manage-role>
    </el-dialog>
  </div>
</template>

<script>
import manageRole from './manageRoles.vue'
export default {
  components: {
    manageRole
  },
  data () {
    return {
      tab: 'staff',
      name: '',
      rolesList: {},
      staffList: {},
      dialogVisible: false,
      formTitle: '',
      formData: {}
    }
  },
  created () {
    this.getRoles()
    this.getStaffList()
  },
  methods: {
    getRoles () {
      this.$axios.get(this.$constants.api_urls.admin.roles)
        .then((res) => {
          this.rolesList = res.data
        })
    },
    getStaffList () {
      this.$axios.get(this.$constants.api_urls.staffList)
        .then((res) => {
          this.staffList = res.data
        })
    },
    openDialog (data, event) {
      let formData = data
      if (event === 'edit') {
        this.formData = formData
        this.formTitle = 'Edit Role Info'
        this.dialogVisible = true
      }
    },
    refershData () {
      this.dialogVisible = false
      this.getRoles()
      this.getStaffList()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th{
  padding: 8px;
}
.r-list {
  padding: 0;
  margin:0;
}
.r-list li {
  padding: 0em 1em;
  overflow: hidden;
}
.r-list li button{
  font-weight: 700;

}
</style>
