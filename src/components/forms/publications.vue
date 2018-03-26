<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h3 class="sub-page-head"><i class="ion ion-ios-paper-outline"></i> Workloads List</h3>
      </div>
      <div class="col-md-6 text-right">
        <el-button type="success" size="mini" @click="openDialog(null, 'new')">+ Add New Workload</el-button>
      </div>
    </div>
    <table class="table table-bordered">
      <thead class="bg-primary">
        <tr>
          <th>Academic Year</th>
          <th>Semister</th>
          <th>First Year</th>
          <th>UG</th>
          <th>PG</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in workloadList">
          <td>{{item.label}}</td>
          <td>{{item.semister}}</td>
          <td>{{item.first_year}}</td>
          <td>{{item.ug}}</td>
          <td>{{item.pg}}</td>
          <td><el-button size="mini" type="success" @click="openDialog(item, 'edit')">Edit</el-button><el-button size="mini" type="danger" @click="openDialog(item, 'delete')">Delete</el-button></td>
        </tr>
      </tbody>
    </table>
    <el-dialog
      :title="formTitle"
      :visible.sync="dialogVisible"
      width="40%">
        <manage-form :form-title="formTitle" :form-data="formData" @infoChanged="infoChanged"></manage-form>
      </el-dialog>
  </div>
</template>
<script>
import manageForm from './manageWorkloads.vue'
export default {
  components: {
    manageForm
  },
  data () {
    return {
      workloadList: {},
      formTitle: '',
      formData: {},
      dialogVisible: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$axios.get(this.$constants.api_urls.staff.workload)
        .then((res) => {
          this.workloadList = res.data
        })
    },
    openDialog (data, event) {
      if (event === 'edit') {
        this.formData = data
        this.formTitle = 'Edit Workload'
        this.dialogVisible = true
      }
      if (event === 'new') {
        this.formData.year = null
        this.formData.staff_id = this.$store.getters.getUserDetails.id
        this.formTitle = 'Add Workload'
        this.dialogVisible = true
      }
    },
    infoChanged () {
      this.dialogVisible = false
      this.getList()
    }
  }
}
</script>
<style scoped>
</style>
