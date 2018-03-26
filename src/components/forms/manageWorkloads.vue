<template>
  <div>
    <div class="input-group">
      <label for="">Academic Year</label><br>
      <el-select v-model="formData.year" placeholder="Select">
          <el-option
            v-for="item in years"
            :key="item.year"
            :label="item.label"
            :value="item.year">
          </el-option>
        </el-select>
    </div>
    <div class="input-group">
      <label for="">Semister</label><br>
      <el-select v-model="formData.semister" placeholder="Select">
          <el-option
            label="Semister 1"
            value="sem1">
          </el-option>
          <el-option
            label="Semister 2"
            value="sem2">
          </el-option>
        </el-select>
    </div>
    <div class="input-group">
      <label for="">First Year</label>
      <el-input placeholder="Please input" v-model="formData.first_year"></el-input>
    </div>
    <div class="input-group">
      <label for="">UG</label>
      <el-input placeholder="Please input" v-model="formData.ug"></el-input>
    </div>
    <div class="input-group">
      <label for="">PG</label>
      <el-input placeholder="Please input" v-model="formData.pg"></el-input>
    </div><br><br>
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
      this.$axios.post(this.$constants.api_urls.staff.workload, this.formData)
        .then((res) => {
          this.$notify({
            title: 'Success',
            message: res.data.message,
            type: 'success'
          })
          this.$emit('infoChanged')
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