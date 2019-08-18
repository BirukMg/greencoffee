<template>
  <div>
      <mdb-navbar color="indigo" dark>
            <mdb-navbar-toggler>
            <mdb-navbar-nav>
                <mdb-nav-item to="/my web site/home" active>Home page</mdb-nav-item>
                <mdb-nav-item to="/my web site/about">About page</mdb-nav-item>
                <mdb-nav-item to="/my web site/contact">Contact page</mdb-nav-item>
            </mdb-navbar-nav>
            </mdb-navbar-toggler>
        </mdb-navbar>
        <router-view></router-view>
  </div>
</template>
<script>
  import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbDropdown, mdbDropdownMenu, mdbDropdownToggle, mdbInput, mdbDropdownItem } from 'mdbvue';
  export default {
    name: 'WebSetting',
    components: {
      mdbNavbar,
      mdbNavbarBrand,
      mdbNavbarToggler,
      mdbNavbarNav,
      mdbNavItem,
      mdbDropdown,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbDropdownItem,
      mdbInput
    },
    mounted() {
      this.$router.push({ path: '/my web site/home'})
    },
  }
</script>