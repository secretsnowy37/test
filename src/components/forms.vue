<template>
  <div>
    <h3>Forms</h3>
    <table class="table table-bordered">
      <thead class="bg-primary">
        <tr>
          <th>SNo</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list">
          <td>{{index +1}}</td>
          <td>{{item.label}}</td>
          <td><router-link :to="item.value">View</router-link></td>
        </tr>
      </tbody>
    </table>
    <!-- {{list}} -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {label: 'Workload', value: '/forms/workload'},
        {label: 'Workshop', value: '/forms/workshop'},
        {label: 'Publications', value: '/forms/publications'},
        {label: 'Academic Research', value: '/forms/academic-research'}
      ]
    }
  },
  created () {
    // this.getList()
  },
  methods: {
    getList () {
      this.$axios.get(this.constants.api_urls.staff.list)
        .then((res) => {
          if (res.data.success === true) {
            this.List = res.data
          }
        })
    }
  }
}
</script>
<style scoped>
</style>
