<template>
    <div class="dests">
        <section id="products" class=" wow fadeIn white-text text-center d-flex align-items-center rgba-black-strong py-5 px-4" data-wow-delay="0.3s">
            
            <div class="">
                <div class="" style="height: 400px; width: 100%">
                    <div class="container">
                        <h1 class="font-weight-bold text-center h1 my-5 text-white">Destinations</h1>
                        <div class="row">
                        <div class="col-4 input-group" v-for="destination in destinations" :key="destination">
                            <country-flag :country ="destination.name" size='big'/>
                            <h4 class="font-weight-bolder white-text" style="margin: 20px 0 0 5px;">{{myjs[destination.name.toUpperCase()]}}</h4>
                        </div>
                    </div>
                    </div>
                </div>

                </div>
        </section>
    </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import Jsn from '../../admin/management/web/homePage//country.json'
import axios from 'axios'
export default {
    components: {
        CountryFlag
    },
    data() {
        return {
            myjs: Jsn,
            country: Object.keys(Jsn).sort(),
            country_name: '',
            destinations: []
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize(){
            axios.get(this.$store.state.server_address + '/api/destinations')
            .then(res => {
                this.destinations = res.data
            })
        },
    },
}
</script>


<style scoped>
    .main-body{
        background-image: url('../../../assets/desback.jpg');
        background-size: 100% 400px;
        height: 400px;
    }
    .flags{
        width: 300px;
        height: 150px;
        /* width: 1000px; */

    }
    .select {width: 327px}
    .dests{
        /* background-color: rgb(250, 243, 234); */
        margin-top: 100px;
        padding: 50px 0;
        background-image: url('../../../assets/desback.jpg');
        background-size: 100% 600px
    }
</style>
