<template>
    <div class="container">
        <section id="products" class=" wow fadeIn" data-wow-delay="0.3s">
            <h1 class="font-weight-bold text-center h1 my-5">Our Destination</h1>
            <!-- <flags-dropdown class="browser-default custom-select" v-on:change="optionSelected" :selected="country"></flags-dropdown> -->
            <!-- <button type="button" class="btn btn-outline-info waves-effect btn-sm" @click="addServiceModal = true"><i class="fas fa-plus"></i> Add</button> -->
            <select class="browser-default custom-select select" @change="optionSelected" v-model="country_name">
                <option value="" disabled hidden>Select to add</option>
                <option v-for="(code) in country" :key="code">{{myjs[code]}}</option>
            </select>       
            <div class="container card card-image main-body">
                <div class="text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4" style="height: 400px; width: 100%">
                    <div class="row">
                        <div class="col-4 input-group" v-for="destination in destinations" :key="destination">
                            <country-flag :country ="destination.name" size='big'/>
                            <h4 class="font-weight-bolder text-white" style="margin: 20px 0 0 5px;">{{myjs[destination.name.toUpperCase()]}}</h4>
                            <span @click="remove(destination.id)" style="margin: 23px 0 0 5px; cursor: pointer;"><i class="fas fa-times text-danger"></i></span>
                        </div>
                    </div>
                </div>

                </div>
        </section>
    </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import Jsn from './country.json'
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
        optionSelected(){
            const name = Object.keys(this.myjs).find(key => this.myjs[key] === this.country_name);
            axios.post(this.$store.state.server_address + '/api/destinations', {
                name: name
            }).then(res => {
                this.initialize()
            })
        },
        remove(id){
            axios.delete(this.$store.state.server_address + '/api/destinations/' + id)
            .then(res => {
                this.initialize()
            })
        },
        extractKeyValue(obj, value) {
            return Object.keys(obj)[Object.values(obj).indexOf(value)];
        }
    },
}
</script>


<style scoped>
    .main-body{
        background-image: url('../../../../../assets/desback.jpg');
        background-size: 100% 400px;
        height: 400px;
    }
    .flags{
        width: 300px;
        height: 150px;
        /* width: 1000px; */

    }
    .select {width: 327 px}
</style>
