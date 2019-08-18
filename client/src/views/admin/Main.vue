<template>
  <div class="flexible-content">
    <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <mdb-navbar-brand to="/home" target="_blank" class="tetx-success for-mobile">GREEN Coffee</mdb-navbar-brand>
      <mdb-navbar-toggler>
        <mdb-navbar-nav left class="for-mobile">
          <mdb-nav-item to="/product management" waves-fixed>Products</mdb-nav-item>
          <mdb-nav-item to="/web management" waves-fixed>My website</mdb-nav-item>
          <mdb-nav-item to="/gallery" waves-fixed>Gallery</mdb-nav-item>
          <mdb-nav-item to="/some" waves-fixed>Some</mdb-nav-item>
          <mdb-nav-item to="/profile" waves-fixed>Profile</mdb-nav-item>
        </mdb-navbar-nav>
        <mdb-navbar-nav right>
          <mdb-nav-item waves-fixed class="border border-light rounded mr-1" target="_blank" @click="logout"><mdb-icon icon="sign-out-alt" class="mr-2"/>Logout</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->
    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed">
      <a class="logo-wrapper" @click="$router.push({ path: '/home'})"><img alt="" class="img-fluid" src="../../assets/logo-mdb-vue-small.png"/></a>
      <mdb-list-group class="list-group-flush">
        <router-link to="/product management" @click.native="activeItem = 1">
          <mdb-list-group-item :action="true" :class="activeItem === 1 && 'active'"><mdb-icon icon="cubes" class="mr-3"/>Products</mdb-list-group-item>
        </router-link>
        <router-link to="/web management" @click.native="activeItem = 2">
          <mdb-list-group-item :action="true" :class="activeItem === 2 && 'active'"><mdb-icon icon="globe" class="mr-3"/>My website</mdb-list-group-item>
        </router-link>
        <router-link to="/gallery" @click.native="activeItem = 3">
          <mdb-list-group-item :action="true" :class="activeItem === 3 && 'active'"><mdb-icon icon="image" class="mr-3"/>Gallery</mdb-list-group-item>
        </router-link>
        <router-link to="/blog" @click.native="activeItem = 4">
          <mdb-list-group-item :action="true" :class="activeItem === 4 && 'active'"><mdb-icon icon="info" class="mr-3"/>Blog</mdb-list-group-item>
        </router-link>
        <router-link to="/profile"  @click.native="activeItem = 5">
          <mdb-list-group-item :action="true" :class="activeItem === 5 && 'active'"><mdb-icon icon="user" class="mr-3"/>Profile</mdb-list-group-item>
        </router-link>
      </mdb-list-group>
    </div>
    <!-- /Sidebar  -->
    <main>
      <div class="mt-5 p-5">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { mdbContainer, mdbNavbar, mdbNavbarBrand, mdbNavItem, mdbNavbarNav, mdbNavbarToggler, mdbBtn, mdbIcon, mdbListGroup, mdbListGroupItem, mdbCardBody, waves } from 'mdbvue'
// import Dashboard from './components/Dashboard'
// import Profile from './components/Profile'

export default {
  name: 'AdminTemplate',
  components: {
    mdbContainer,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbBtn,
    mdbListGroup,
    mdbListGroupItem,
    mdbIcon,
    mdbCardBody,
  },
  data () {
    return {
      activeItem: 1
    }
  },
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push({ path: '/product management'})
    } else {
      this.$router.push({ path: '/login'})
    }
  },
  beforeMount () {
    this.activeItem = this.$route.matched[0].props.default.page
    
  },
  methods: {
    logout(){
        this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err))
    }
  },
  mixins: [waves]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  background-color: #EDEDEE;
}

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 270px;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}
.for-mobile{
  display: none
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #fff;
  padding: 1.5rem;
  padding-top: 0;
}

.sidebar-fixed .logo-wrapper img{
  width: 100%;
  padding: 2.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .for-mobile{
    display: block
  }
  .flexible-content {
    padding-left: 0;
  }
  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>
<style>
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
</style>
