<template>
  <div>
    <section class="header" v-if="showHeader">
      <carousel :autoplay="true" :autoplaySpeed ="2000" :nav="false" :items ="1" :loop ="true" :autoplayHoverPause ="true" v-if="showHeader">
        <div class="row main-header" v-for="header in headers" :key="header" :style="'background-image: url('+ server_address + header.img + ');'">
                <div class="col-lg-7">
                    <h1 class="text-white">
                        {{header.title}}				
                    </h1>
                    <h6 class="text-white text-uppercase">{{header.description}}</h6>
                    <a href="/products" class="primary-btn text-uppercase">Buy Now</a>
                </div>
            </div>
      </carousel>
    </section>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput } from 'mdbvue';
import axios from 'axios' 
export default {
  name: 'HomePage',
  components: {
    carousel, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput
  },
  data() {
    return {
      showHeader: false,
      headers: [],
      server_address: this.$store.state.server_address + '/api/containers/posts/download/',
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize(){
      axios.get(this.$store.state.server_address + '/api/home_page_headers')
      .then(res => {
        console.log(res)
        this.headers = res.data
        this.showHeader = true
      })
    },
  },
  
}
</script>
<style scoped>
  .header{
    width: 100%;
  }
  .header-item{
    width: 100%;
    height: 700px;
    background-size: 100% 700px;
  }
  .main-header{
        margin-top: 15px;
        height: 700px;
        width: 100%;
        padding: 15% 0 0 25%;
        background-size: 100% 700px
    }
</style>
