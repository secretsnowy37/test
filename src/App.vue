  <template>
  <div id="app">
      <router-view @change="onLoginChange" @hideNav="hideNav"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      loginStatus: {
      },
      head: true,
      mNav: false
    }
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'getUserDetails'
    ])
  },
  methods: {
    onLoginChange (value) {
      if (value.status === true) {
        this.loginStatus = value
      }
    },
    hideNav () {
      this.head = false
    },
    changeNav () {
      this.mNav = !this.mNav
    },
    changeRoot (url) {
      this.$router.push(url)
      this.changeNav()
    }
  },
  created () {
    // console.log(this.$store.getters.isAuthenticated)
    // console.log(this.$store.state.loginStatus)
    // console.log(this.$store.state.userDetails)
    // console.log(this.$store.state.userType)
  }
}
</script>

<style>
.min-100 {
  min-height: 100vh;
}
/*sidenav form mobile*/
  .sidenav {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
  }
  .mobile-nav {
    margin:0em;
    padding: 1em 0em 0em;
    display: inline-block;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
  }
  .mobile-nav li {
    overflow: hidden;
    padding: 1em;
    width: 100%;
    text-align: center;
  }
  .mobile-nav>li>a {
    font-size: 1.1em;
    letter-spacing: 1px;
  }
  .burger-icon {
    font-size: 1.7em;
    margin-right: 0.7em;
  }
  .show {
    display: block;
  }
  .close-nav {
    font-weight: bold;
    color: red;
    font-size: 2em;
    padding: 0.5em;
  }
  @media only screen and (max-width: 784px) {
    .hidden-xs {
      display: none!important;
    }
  }
</style>
