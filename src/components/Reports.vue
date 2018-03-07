<template>
  <div class="login">
  <h1>Reports</h1>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <ul class="reports-list">
          <li v-for="item in reports">
            <router-link :to="item.url">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  
  </div>
</template>

<script>
export default {
  data () {
    return {
      loadingFullScreen: false,
      reports: [
        {name: 'Student Faculty Ratio', url: '/reports/SFRReport'},
        {name: 'Student Faculty Ratio', url: '/reports/SFRReport'},
        {name: 'Student Faculty Ratio', url: '/reports/SFRReport'},
        {name: 'Student Faculty Ratio', url: '/reports/SFRReport'},
        {name: 'Student Faculty Ratio', url: '/reports/SFRReport'},
        {name: 'Student Faculty Ratio', url: '/reports/SFRReport'}
      ]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.reports-list {
  display: inline-block;
  width: 100%;
  margin:0px;
  padding:0px;
}
.reports-list li {
  text-align: center;
  float: left;
  width: 25%;
  padding: 1em;
  overflow: hidden;
}
.reports-list>li>a {
  font-weight: bold;
}
</style>
