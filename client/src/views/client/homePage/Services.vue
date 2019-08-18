<template>
    <div class="container">
        <section id="products" class=" wow fadeIn" data-wow-delay="0.3s">
            <h1 class="font-weight-bold text-center h1 my-5">Our Service</h1>
            <div class="row">
                <carousel style="width: 100%; margin-left: 50px" :autoplay="true" :autoplaySpeed ="2000" :nav="false" :items ="3" :autoplayTimeout ="3000" :loop ="true" :autoplayHoverPause ="true" :margin ="30" v-if="showServices">
                    <div class="text-center" v-for="(service, index) in services" :key ="service">
                        <i :class="'fa fa-4x fa-' + service.icon + ' teal-text'"></i>
                        <h4 class="font-weight-bold my-4">{{service.title}}</h4>
                        <p class="grey-text">{{service.description}}</p>
                    </div>
                </carousel>
            </div>
        </section>
    </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput } from 'mdbvue';
import axios from 'axios'
import VueIconPicker from '../../../components/vue-icon-picker';
export default {
    name: 'Service',
    components: {
        carousel, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, VueIconPicker
    },
    data() {
        return {
            showServices: false,
            services:[],
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
    initialize(){
      axios.get(this.$store.state.server_address + '/api/home_page_services')
      .then(res => {
        this.services = res.data
        this.showServices = true
      })
    }
  },
}
</script>
<style scoped>
    
</style>
