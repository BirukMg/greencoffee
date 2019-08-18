<template>
  <div>
    <header>
      <mdb-view>
        <mdb-mask class="d-flex justify-content-center align-items-center">
          <mdb-container>
              <mdb-row class="pt-lg-5 mt-lg-5">
                <mdb-col md="3" class="mb-5 mt-md-0 mt-5 white-text text-center text-md-left">
                </mdb-col>
                <mdb-col md="6" xl="5" class="mb-4">
                  <mdb-card>
                    <mdb-card-body class="z-depth-2">
                      <div class="text-center">
                        <h3 class="dark-grey-text">
                          <strong>Admin login</strong>
                        </h3>
                        <hr>
                      </div>
                      <div class="md-form">
                        <h5 :class ="msg.styles">{{msg.title}}</h5>
                        <mdb-input type="text" icon="user" iconClass="text-info" label="Username" v-model="loginData.username"/>
                        <mdb-input type="password" icon="lock" iconClass="text-info" label="Password" v-model="loginData.password"/>
                      </div>
                      <div class="text-center mt-3">
                        <mdb-btn color="indigo" @click="login">Login</mdb-btn>
                      </div>
                    </mdb-card-body>
                  </mdb-card>
                </mdb-col>
                 <mdb-col md="3" class="mb-5 mt-md-0 mt-5 white-text text-center text-md-left">
                </mdb-col>
              </mdb-row>
          </mdb-container>
        </mdb-mask>
      </mdb-view>
    </header>
  </div>
</template>

<script>
import { mdbNavbar, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbInput, mdbTextarea, mdbView, mdbMask, mdbRow, mdbCol, mdbContainer, mdbBtn, mdbCard, mdbCardBody, mdbNavbarBrand } from 'mdbvue';

export default {
  name: 'ContactFormPage',
  components: {
    mdbNavbar,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbInput,
    mdbTextarea,
    mdbView,
    mdbMask,
    mdbRow,
    mdbCol,
    mdbContainer,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbNavbarBrand
  },
  data() {
    return {
      msg: {
        styles: '',
        title: ''
      },
      loginData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login(){
      if (this.loginData.username == '') {
        this.msg.title = 'Username is empty'
        this.msg.styles = 'text-danger font-weight-bold animated bounceIn'
      }else if (this.loginData.password == '') {
        this.msg.title = 'Password is empty'
        this.msg.styles = 'text-danger font-weight-bold animated bounceIn'
      } else {
        this.$store.dispatch('login', this.loginData)
        .then(res => {
          this.$router.push({ path: '/admin'})
          this.msg.title = 'Done'
          this.msg.styles = 'text-success font-weight-bold animated bounceIn'
        }).catch(err => {
          if (err.response.status == 401) {
              this.msg.title = "Incorrect username/password"
              this.msg.styles = 'text-danger font-weight-bold animated bounceIn'
          }
        })
      }
    }
  },
};
</script>
<style scoped>
  .navbar {
  transition: 1s;
}
.navbar .md-form {
  margin: 0; 
}
.top-nav-collapse {
    background-color: #39448c !important;
}
@media (max-width: 990px){
  .navbar {
    background-color: #424f95 !important;
  }
}
.view {
  background-color: #17a2b8;
  /* background-repeat: no-repeat; */
  background-size: cover;
  /* background-position: center center; */
  height: calc(100vh - 0px);
}
h6 {
    line-height: 1.7;
}
</style>
