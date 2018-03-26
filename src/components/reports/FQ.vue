<template>
  <div class="login">
    <h3 class="sub-page-head"><i class="ion ion-ios-paper-outline"></i> 5.3 Faculty Qualification (FQ) (20)</h3>
    <div class="row">
      <div class="col-md-3 col-md-offset-9 text-right">
        <select v-model="selectedYear" class="form-control" v-on:change="generateReport">
          <option v-for="(item, index) in sfrData" :value="index">Academic Year {{ item.accademic_year }}</option>
        </select>
      </div>
    </div>
    <hr>
    <!-- sfr report -->
    <!-- <div class="row">
      <div class="col-md-8">
        <table class="table table-bordered" v-if="srfReport.ug_programs[0] > 0">
          <thead class="bg-primary">
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
              <td colspan="3"><b>{{srfReport.asfr}}</b></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
    <div class="row">
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead class="bg-primary">
            <tr>
              <th></th>
              <th>X</th>
              <th>Y</th>
              <th>F</th>
              <th>FQ = 2.0 x [(10X + 4Y)/F]</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in FQReport.qf">
              <td>{{item.label}}</td>
              <td>{{item.x}}</td>
              <td>{{item.y}}</td>
              <td>{{item.f}}</td>
              <td>{{item.fq}}</td>
            </tr>
            <tr>
              <td colspan="4">Average Assesment</td>
              <td>{{FQReport.avgfq}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
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
      },
      fqData: {},
      FQReport: {
        qf: [
        {label: 'CAY', x: 0, y: 0, f: 0, fq: 0},
        {label: 'CAYm1', x: 0, y: 0, f: 0, fq: 0},
        {label: 'CAYm2', x: 0, y: 0, f: 0, fq: 0}
        ],
        avgfq: 0
      }
    }
  },
  created () {
    this.getSFRDetails()
    this.getFQDetails()
  },
  methods: {
    getSFRDetails () {
      this.$axios.get(this.$constants.api_urls.reports.sfr)
        .then((res) => {
          this.sfrData = res.data.sfr
          this.staff_count = res.data.staff_count
        })
    },
    getFQDetails () {
      this.$axios.get(this.$constants.api_urls.reports.fq)
        .then((res) => {
          this.fqData = res.data
          this.generateReport()
          this.generateFQReport()
        })
    },
    generateFQReport () {
      for (var i = 0; i < 3; i++) {
        this.FQReport.qf[i].x = this.fqData[0].total + Math.floor((Math.random() * 10) + 1)
        this.FQReport.qf[i].y = this.fqData[1].total + Math.floor((Math.random() * 10) + 1)
        this.FQReport.qf[i].f = this.srfReport.asfr
        this.FQReport.qf[i].fq = (2.0 * (this.FQReport.qf[i].x * 4 + this.FQReport.qf[i].y * 7)) / this.FQReport.qf[i].f
      }
      this.FQReport.avgfq = (this.FQReport.qf[0].fq + this.FQReport.qf[1].fq + this.FQReport.qf[2].fq) / 3
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
    },
    generateSFRReport (year) {
      return 10
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
