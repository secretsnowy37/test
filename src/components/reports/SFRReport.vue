<template>
  <div class="login">
    <h1>Student Faculty Ration (SRF) (20)</h1>
    <div class="row">
      <div class="col-md-3 col-md-offset-9 text-right">
        <select v-model="selectedYear" class="form-control" v-on:change="generateReport">
          <option v-for="(item, index) in sfrData" :value="index">Academic Year {{ item.accademic_year }}</option>
        </select>
      </div>
    </div>
    <hr>
    <!-- sfr report -->
    <div class="row">
      <div class="col-md-8">
        <table class="table table-striped" v-if="srfReport.ug_programs[0] > 0">
          <thead>
            <tr>
              <th>Year</th>
              <th>CAY</th>
              <th>CAYm1</th>
              <th>CAYm2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>UG</td>
              <td v-for="item in srfReport.ug_programs">{{item}}</td>
            </tr>
            <tr>
              <td>PG</td>
              <td v-for="item in srfReport.pg_programs">{{item}}</td>
            </tr>
            <tr>
              <td>Total No of Students in the Department (<b>S</b>)</td>
              <td v-for="item in srfReport.s">{{item}}</td>
            </tr>
            <tr>
              <td>No of Faculty in the Department (<b>F</b>)</td>
              <td v-for="item in srfReport.f">{{item}}</td>
            </tr>
            <tr>
              <td>Student Faculty Ration (<b>SFR</b>)</td>
              <td v-for="item in srfReport.sfr">{{item}}</td>
              <td></td>
            </tr>
            <tr>
              <td>Average <b>SFR</b></td>
              <td><b>{{srfReport.asfr}}</b></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <!-- sfrData -->
    <div class="row">
      <div class="col-md-12">
        <h3>Complete Student Faculty Ratio Data - ({{sfrData.length}} years)</h3>
        <table class="table table-striped" v-if="sfrData">
          <thead>
            <tr>
              <th>Academic Year</th>
              <th>UG Programs</th>
              <th>PG Programs</th>
              <th>UG2 Students</th>
              <th>UG3 Students</th>
              <th>UG4 Students</th>
              <th>PG1 Students</th>
              <th>PG2 Students</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sfrData">
              <td>{{item.accademic_year}}</td>
              <td>{{item.ug_programs}}</td>
              <td>{{item.pg_programs}}</td>
              <td>{{item.ug2_students}}</td>
              <td>{{item.ug3_students}}</td>
              <td>{{item.ug4_students}}</td>
              <td>{{item.pg1_students}}</td>
              <td>{{item.pg2_students}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loadingFullScreen: false,
      sfrData: {},
      staff_count: 0,
      selectedYear: 4,
      srfReport: {
        ug_programs: [0, 0, 0],
        pg_programs: [0, 0, 0],
        f: [30, 32, 33],
        s: [0, 0, 0],
        sfr: [0, 0, 0],
        asfr: 0
      }
    }
  },
  created () {
    this.getSFRDetails()
  },
  methods: {
    getSFRDetails () {
      this.$axios.get(this.$constants.api_urls.reports.sfr)
        .then((res) => {
          this.sfrData = res.data.sfr
          this.staff_count = res.data.staff_count
          this.generateReport()
        })
    },
    generateReport () {
      if (this.selectedYear > 1) {
        for (var i = 0; i < 3; i++) {
          // count ug
          this.srfReport.ug_programs[i] = this.sfrData[this.selectedYear - i].ug2_students + this.sfrData[this.selectedYear - i].ug3_students + this.sfrData[this.selectedYear - i].ug4_students
          // count pg
          this.srfReport.pg_programs[i] = this.sfrData[this.selectedYear - i].pg1_students + this.sfrData[this.selectedYear - i].pg2_students
          // count s
          this.srfReport.s[i] = this.srfReport.ug_programs[i] + this.srfReport.pg_programs[i]
          // count sfr
          this.srfReport.sfr[i] = this.srfReport.s[i] / this.srfReport.f[i]
          this.srfReport.asfr = this.srfReport.sfr[i]
        }
        this.srfReport.esfr = this.srfReport.esfr / 3
      } else {
        this.selectedYear = 2
        this.$notify({
          title: 'Report Generation Failed',
          message: 'Atleast 3 Years Data Needed',
          type: 'error'
        })
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
tbody tr:hover {
  color: orange;
}
</style>
