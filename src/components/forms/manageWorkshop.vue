<template>
  <div>
    <div class="input-group">
      <label for="">Title</label>
      <el-input placeholder="Title" v-model="formData.title"></el-input>
    </div>
    <div class="input-group">
      <label for="">Venue</label>
      <el-input placeholder="Venue " v-model="formData.venue"></el-input>
    </div>
    <div class="input-group">
      <label for="">From</label>
      <el-input placeholder="YYYY-MM-DD" v-model="formData.from"></el-input>
    </div>
    <div class="input-group">
      <label for="">To</label>
      <el-input placeholder="YYYY-MM-DD" v-model="formData.to"></el-input>
    </div>
    <div class="input-group">
      <label for="">Description</label>
      <el-input placeholder="description..." type="textarea" :rows="5" v-model="formData.description"></el-input>
    </div>
    <br>
    <div class="text-center">
      <el-button type="success" size="mini" @click="manageForm()">{{formTitle}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['formData', 'formTitle'],
  data () {
    return {
      msg: 'hi',
      years: {}
    }
  },
  created () {
    this.getYears()
  },
  methods: {
    manageForm () {
      this.$axios.post(this.$constants.api_urls.staff.workshop, this.formData)
        .then((res) => {
          if (res.data.success === true) {
            this.$notify({
              title: 'Success',
              message: res.data.message,
              type: 'success'
            })
            this.$emit('infoChanged')
          }
        })
    },
    getYears () {
      this.$axios.get('academicyears')
        .then((res) => {
          this.years = res.data
        })
    }
  }
}
</script>
<style scoped>
input {
  width: 100%;
}
</style>
