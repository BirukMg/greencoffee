<template>
    <div>
        <section>
            <header style="background-color: #212121" class="fixed-top">
                    <div class="container">
                    <div class="row align-items-center justify-content-between d-flex">
                        <div id="logo">
                        <a href="index.html"><img src="../assets/img/logo.png" alt="" title="" /></a>
                        </div>
                            <div class="nav-menu">
                                <navbar-item to="/home" class="font-weight-bold link-activ fa-md" waves-fixed>Home</navbar-item>
                                <navbar-item to="/products" class="font-weight-bold link-activ fa-md" waves-fixed>Products</navbar-item>
                                <navbar-item to="/some" class="font-weight-bold link-activ fa-md" waves-fixed>Some</navbar-item>
                                <navbar-item to="/about" class="font-weight-bold link-activ fa-md" waves-fixed>About us</navbar-item>
                                <navbar-item to="/contact" class="font-weight-bold link-activ fa-md" waves-fixed>Contact us</navbar-item>
                                <navbar-item to="/gallary" class="font-weight-bold link-activ fa-md" waves-fixed>Gallary</navbar-item>
                            </div>
                    </div>
                </div>
            </header>
        </section>
        <section class="main-header animated fadeIn" v-if="show_header" :style="'background-image: url('+ $store.state.server_address + '/api/containers/posts/download/' + bg.img + ');'">	
			<div class="row">
                <div class="col-lg-7">
                    <h1 class="text-white">
                        {{bg.title}}				
                    </h1>
                    <h6 class="text-white text-uppercase">{{bg.description}}</h6>
                    <a href="/products" class="primary-btn text-uppercase">Buy Now</a>
                </div>
            </div>
		</section>
        <div class="best-seller">
            <div class="container">
            <div class="row">
                <div class="col-lg-4" v-for="i in 9" :key ="i">
                    <div class="single-menu">
                        <div class="title-div justify-content-between d-flex">
                            <h4>Cappuccino</h4>
                            <p class="price float-right">
                                $49
                            </p>
                        </div>
                        <p>
                            Usage of the Internet is becoming more common due to rapid advance.
                        </p>								
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import {NavbarNav,NavbarItem} from 'mdbvue'
import axios from 'axios'
export default {
    components: {
        NavbarNav, NavbarItem
    },
    data() {
        return {
            show_header: true,
            srs: 'header-bg.jpg',
            himg: [],
            style: 'main-header animated fadeIn',
            bg: {}
        }
    },
    mounted() {
        axios.get(this.$store.state.server_address + '/api/home_page_headers')
        .then(res => {
            console.log(res.data)
            this.himg = res.data
            this.bg = Object.assign({}, this.himg[Math.floor(Math.random() * this.himg.length)])
        })
        setInterval(() => {
          this.bg = Object.assign({}, this.himg[Math.floor(Math.random() * this.himg.length)])
        }, 3000)
    },
}
</script>

<style scoped>
    .best-seller{
        background-color: rgb(250, 243, 234);
        margin-top: 100px;
        padding: 5px 0
    }
    .link-activ:active{
        text-decoration: underline
    }
    .main-header{
        margin-top: 75px;
        height: 700px;
        padding: 15% 0 0 25%;
        background-size: 100% 700px
    }
</style>

