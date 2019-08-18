<template id="">
  <div class="container" style="margin-top: 100px;">
    <div class="row">
    <div class="col-12"> 
      <div style="margin: 20px 50px 0 0">
      <div class="row">
            <div class="col-4" v-for="product in products" :key="product">
                <div class="single-menu" @click="toDetail(product)" style="cursor: pointer">
                  <img :src="$store.state.server_address + '/api/containers/posts/download/' + product.img" width="100%" height="274px" class="card-img-top" alt="">
                    <h4>{{product.title}}</h4>
                    <p>
                        {{product.description | truncate(70)}}
                    </p>		
                    <p class="price float-right">
                      $ {{product.price}}
                    </p>
                    <h4>{{product.area}}</h4>
                </div>
            </div>
        </div>
    <!-- <div class="text-center">
      <mdb-pagination color="blue">
        <mdb-page-nav prev></mdb-page-nav>
        <mdb-page-item active>1</mdb-page-item>
        <mdb-page-item>2</mdb-page-item>
        <mdb-page-item>3</mdb-page-item>
        <mdb-page-item>4</mdb-page-item>
        <mdb-page-item>5</mdb-page-item>
        <mdb-page-nav next></mdb-page-nav>
      </mdb-pagination>
    </div> -->
  </div>
    </div>
  </div>
  </div>
</template>
<script>
  import { mdbPagination, mdbPageNav, mdbPageItem, mdbBtn, mdbBtnGroup } from 'mdbvue'
  import axios from 'axios'
  export default {
    name: 'Products',
    components: {
      mdbPagination, mdbPageNav, mdbPageItem, mdbBtn, mdbBtnGroup
    },
    data() {
      return {
        products: [],
        areas: [],
        status: 'all'
      }
    },
    mounted() {
      this.initialize()
    },
    watch: {
        '$route.params.search_key': function (search_key) {
            this.$forceUpdate()
            this.initialize()
        }
    },
    methods: {
      initialize(){
        let filter = {
          where : {
            area: {regexp: '/'+ this.$route.params.search_key +'/i'},
            active: true
          }
        }
        let filter2 = {
          where : {
            title: {regexp: '/'+ this.$route.params.search_key +'/i'},
            active: true
          }
        }
        axios.get(this.$store.state.server_address  + '/api/products?filter='+ JSON.stringify(filter))
        .then(res => {
          if (res.data.length <= 0) {
            axios.get(this.$store.state.server_address  + '/api/products?filter='+ JSON.stringify(filter2))
            .then(res => {
              this.products = res.data
              this.areas = []
            })
          } else {
            this.products = res.data
            this.areas = []
          }
        })
        
      },
      toDetail(product){
        this.$router.push({ path: '/productdetail/' + product.id})
      }
    },
  }
</script>
<style scoped>
  .area-list:hover{
    cursor: pointer;
    background-color: rgb(243, 226, 226)
  }
</style>
