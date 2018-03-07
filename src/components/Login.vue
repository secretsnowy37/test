<template>
  <div class="login">
    <div class="cntainer-fluid">
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <form action="" method="POST" role="form">
            <legend><span class="fa fa-lock"></span> Login Details</legend>
          
            <div class="form-group">
              <label for="">Email Address</label>
              <input type="text" class="form-control" v-model="formData.email" placeholder="Email Address">
            </div>
            <div class="form-group">
              <label for="">Password</label>
              <input type="password" class="form-control" v-model="formData.password" placeholder="Password">
            </div>
            <button type="submit" @click.prevent="login()" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      formData: {
        email: 'venkatasaisoft@gmail.com',
        password: '123456'
      },
      logInfo: {
        status: true
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
      const {email, password} = this.formData
      this.$store.dispatch('login', {email, password})
        .then((resp) => {
          this.checkLoginStatus()
          // this.$router.push('/dashboard')
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
</style>
