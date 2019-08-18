<template>
    <div class="main-body">
        <section class="header">
            <home-header />
        </section>
        <section class="service">
            <service />
        </section>
        <section class="destination">
            <destination />
        </section>
        <section class="membership">
            <membership />
        </section>
        <section class="certification">
            <certification />
        </section>
    </div>
</template>
<script>
import HomeHeader from './Header'
import Service from './Services'
import Destination from './Destination'
import Membership from './Membership'
import Certification from './Certification'
import axios from 'axios'
export default {
    name: 'Header',
    components: {
        HomeHeader, Service, Destination, Membership, Certification
    },
    data() {
        return {
            
        }
    },
    created() {
        
    },
    methods: {
        
    },
}
</script>
<style scoped>
    .header{
        width: 100%;
        margin-top: 60px;
    }
    .header-item{
        width: 100%;
        height: 400px;
        background-size: 100%;
    }
    .main-body{
        height: auto;
    }
</style>
