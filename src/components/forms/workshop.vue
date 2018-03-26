<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h3 class="sub-page-head"><i class="ion ion-ios-paper-outline"></i> Workshops List</h3>
      </div>
      <div class="col-md-6 text-right">
        <el-button type="success" size="mini" @click="openDialog(null, 'new')">+ Add New Workshop</el-button>
      </div>
    </div>
    <table class="table table-bordered">
      <thead class="bg-primary">
        <tr>
          <th>Title</th>
          <th>Venue</th>
          <th>From</th>
          <th>To</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in workshopsList">
          <td>{{item.title}}</td>
          <td>{{item.venue}}</td>
          <td>{{item.from}}</td>
          <td>{{item.to}}</td>
          <td>{{item.status}}</td>
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
import manageForm from './manageWorkshop.vue'
export default {
  components: {
    manageForm
  },
  data () {
    return {
      workshopsList: {},
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
      this.$axios.get(this.$constants.api_urls.staff.workshop)
        .then((res) => {
          this.workshopsList = res.data
        })
    },
    openDialog (data, event) {
      if (event === 'edit') {
        this.formData = data
        this.formTitle = 'Edit Workshop'
        this.dialogVisible = true
      }
      if (event === 'new') {
        this.formData = {}
        this.formData.title = ''
        this.formData.from = ''
        this.formData.to = ''
        this.formData.description = ''
        this.formData.staff_id = this.$store.getters.getUserDetails.id
        this.formTitle = 'Add Workshop'
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
