<template>
  <div>
    <section>
            <header style="background-color: #212121" class="fixed-top">
                    <div class="container">
                    <div class="row align-items-center justify-content-between d-flex">
                        <div id="logo">
                        <a href="index.html"><img src="../../assets/img/logo.png" alt="" title="" /></a>
                        </div>
                            <div class="nav-menu">
                                <navbar-item to="/home" class="font-weight-bold link-activ fa-md" waves-fixed>Home</navbar-item>
                                <navbar-item to="/products" class="font-weight-bold link-activ fa-md" waves-fixed>Products</navbar-item>
                                <navbar-item to="/some" class="font-weight-bold link-activ fa-md" waves-fixed>Some</navbar-item>
                                <navbar-item to="/about" class="font-weight-bold link-activ fa-md" waves-fixed>About us</navbar-item>
                                <navbar-item to="/contact" class="font-weight-bold link-activ fa-md" waves-fixed>Contact us</navbar-item>
                                <navbar-item to="/gallary" class="font-weight-bold link-activ fa-md" waves-fixed>Gallary</navbar-item>
                            </div>
                            <form>
          <input type="text" placeholder="Search, eg. Tepi" class="form-control" v-model="search_key" v-on:keyup.enter="search">
          <!-- <mdb-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves waves-fixed v-model="search_key" v-on:keyup.enter="search"/> -->
        </form>
                    </div>
                </div>
            </header>
        </section>
        <router-view></router-view>
        <main-footer />
  </div>
</template>
<script>
import axios from 'axios'
import { NavbarItem} from 'mdbvue';
import mainFooter from '../../components/Footer'

export default {
  name: 'NavigationPage',
  components: {
    NavbarItem,mainFooter
  },
  data() {
    return {
      search_key: ''
    }
  },
  mounted() {
    this.$router.push({ path: '/home' })
  },
  methods: {
    search(){
      let filter = {
        where: {
          area: {regexp: '/'+ this.search_key +'/i'}, 
          category: {regexp: '/'+ this.search_key +'/i'}
        }
      }
      axios.get(this.$store.state.server_address  + '/api/products?filter='+ JSON.stringify(filter))
      .then(res => {
        this.$router.push({ path: '/search/' + this.search_key})
      })
    }
  },
};
</script>