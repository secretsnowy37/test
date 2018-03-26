<template>
  <div>
    <label for="">Title</label>
    <el-input type="input" v-model="formData.title"></el-input><br><br>
    <label for="">Admin</label><br>
    <el-select v-model="formData.staff_id" placeholder="Select">
      <el-option
        v-for="item in staffList"
        :key="item.staffid"
        :label="item.name"
        :value="item.staffid">
      </el-option>
    </el-select><br><br>
    <label for="">Status</label><br>
    <el-select v-model="formData.status" placeholder="Select">
      <el-option :label="'Active'" :value="'active'"></el-option>
      <el-option :label="'InActive'" :value="'InActive'"></el-option>
    </el-select>
    <br><br>
    <div class="text-center">
      <el-button type="success" size="mini" @click="manageRole()">{{formTitle}}</el-button>
      {{response}}
    </div>
  </div>
</template>
<script>
export default {
  props: ['formTitle', 'formData', 'staffList'],
  data () {
    return {
      response: ''
    }
  },
  methods: {
    manageRole () {
      this.$axios.post(this.$constants.api_urls.admin.roles, this.formData)
        .then((res) => {
          if (res.data.success === true) {
            this.$notify({
              title: 'Success',
              message: res.data.message,
              type: 'success'
            })
            this.$emit('InfoChanged')
          }
        })
    }
  }
}
</script>