<template>
  <div class="login">
  <div v-loading.fullscreen.lock=" loginStatus === 'Processing' " element-loading-text="Processing..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
   <div class="slider">
     <el-carousel height="100vh">
       <el-carousel-item>
         <img src="../assets/img/backgrounds/1.jpg" alt="">
       </el-carousel-item>
       <el-carousel-item>
         <img src="../assets/img/backgrounds/2.jpg" alt="">
       </el-carousel-item>
       <el-carousel-item>
         <img src="../assets/img/backgrounds/3.jpg" alt="">
       </el-carousel-item>
     </el-carousel>
     <div class="login-form">
       <div data-aos="zoom-in" data-aos-duration="5000">
         <el-row type="flex" justify="center">
           <el-col :xs="18" :sm="12" :md="6" :lg="6" :xl="6" class="frame">
             <div class="">
               <a href="/"><img src="../assets/img/uhc-client-logo-blue.png" class="max-80 logo" alt=""></a>
               <h3 class="txt-cen"><span class="fa fa-lock"></span> Login Details</h3>
               <div class="form txt-cen">
                 <form @submit.native="login()">
                   <p v-if="loginStatus" class="txt-cen error msg">{{loginStatus}}</p>
                   <div class="form-group">
                     <el-input placeholder="Username *" @keyup.enter.native="login" tabindex="0" v-model="formData.username">
                       <template slot="prepend"><span class="fa fa-user"></span></template>
                     </el-input>
                   </div>
                   <div class="form-group">
                     <el-input placeholder="Password *" tabindex="1" @keyup.enter.native="login" type="password" v-model="formData.password">
                       <template slot="prepend"><span class="fa fa-key"></span></template>
                     </el-input>
                   </div>
                   <div class="btn-block txt-cen">
                     <el-button @click.prevent="login" type="success">Login <span class="fa fa-long-arrow-right"></span></el-button>
                   </div>
                 </form>
               </div>
             </div>
           </el-col>
         </el-row>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
// import auth from '../services/authService.js'
import AOS from 'aos'
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      formData: {
        username: 'venkatsaisoft@gmail.com',
        password: '123456'
      },
      logInfo: {
        status: true,
      },
      logOff: {
        status: false,
        user_type: ''
      }
    }
  },
  created () {
    this.checkLoginStatus()
  },
  computed: mapState([
    'loginStatus'
  ]),
  methods: {
    login () {
      const {username, password} = this.formData
      this.$store.dispatch('login', {username, password})
        .then((resp) => {
          this.$router.push('/dashboard')
        })
    },
    checkLoginStatus (event) {
      if (this.$store.getters.isAuthenticated) {
        this.$router.push('/dashboard')
        this.$emit('change', this.logInfo)
      } else {
        this.$emit('change', this.logOff)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  font-weight: bold;
}
.img-70{
  max-width: 70%;
}
</style>
