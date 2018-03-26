<template>
  <div class="login">
  <h3 class="sub-page-head"><i class="ion ion-ios-paper-outline"></i> Reports List</h3>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead class="bg-primary">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in reports">
              <td>{{ item.index }}</td>
              <td>{{ item.name }}</td>
              <td><router-link :to="item.url" class="report">View Report</router-link></td>
            </tr>
          </tbody>
        </table>
        <!-- <ul class="reports-list">
          <li v-for="item in reports">
            <router-link :to="item.url" class="report"><i class="ion ion-ios-paper-outline"></i> {{item.name}}</router-link>
          </li>
        </ul> -->
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
        {index: '5.1', name: 'Student Faculty Ratio SRF (20)', url: '/reports/SFRReport'},
        {index: '5.2', name: 'Faculty Cadre Proportion (20)', url: '/reports/SFRReport'},
        {index: '5.3', name: 'Faculty Qualification (20)', url: '/reports/faculty-qualification'},
        {index: '5.4', name: 'Faculty Retention (10)', url: '/reports/SFRReport'},
        {index: '5.5', name: 'Faculty competencies in correlation to Program Specific Criteria (10)', url: '/reports/SFRReport'},
        {index: '5.6', name: 'Innovation by the Faculty in Teaching and Learning (10)', url: '/reports/SFRReport'},
        {index: '5.7', name: 'Faculty as participants in Faculty development/training activities/STTPs (15)', url: '/reports/SFRReport'},
        {index: '5.8', name: 'Research and Development (75)', url: '/reports/SFRReport'},
        {index: '5.8.1', name: 'Academic Research (20)', url: '/reports/SFRReport'},
        {index: '5.8.2', name: 'Sponsored Research (20)', url: '/reports/SFRReport'},
        {index: '5.8.3', name: 'Development activities (15)', url: '/reports/SFRReport'},
        {index: '5.8.4', name: 'Consultancy (from Industry) (20)', url: '/reports/SFRReport'},
        {index: '5.9', name: 'Faculty Performance Appraisal and Development System (FPADS) (10)', url: '/reports/SFRReport'},
        {index: '5.10', name: 'Visiting/Adjunct/Emeritus Faculty etc. (10)', url: '/reports/SFRReport'}
      ]
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  font-weight: bold;
  padding-left: 0;
}
.table {
  font-size: 0.9em;
}
thead {
  /*background-color: blue;*/
  color: white;
}
</style>
