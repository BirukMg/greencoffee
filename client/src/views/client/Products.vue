<template id="">
  <div style="margin-top: 100px;">
    <div class="row">
    <div class="col-3" style="margin-top: 20px;">
      <mdb-btn-group style="margin-bottom: 10px;">
          <mdb-btn color="primary" @click.native="filter('all')" :active="status == 'all'">All</mdb-btn>
          <mdb-btn color="primary" @click.native="filter('washed')" :active="status == 'washed'">Washed</mdb-btn>
          <mdb-btn color="primary" @click.native="filter('unwashed')" :active="status == 'unwashed'">Unwashed</mdb-btn>
        </mdb-btn-group>
      <ul class="list-group">
        <li class="list-group-item area-list" v-for="area in areas" :key="area" @click="filterArea(area)">{{area}}</li>
        
      </ul>
    </div>
    <div class="col-9"> 
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
    <!-- <div class="text-center" style="margin: 20px">
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
      <div class="btn-toolbar">
        <div class="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" class="btn btn-default">&laquo;</button>
          <button type="button" class="btn btn-default">&raquo;</button>
        </div>
      </div>
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
    methods: {
      initialize(){
        let filter = {
          where : {
            active: true
          }
        }
        axios.get(this.$store.state.server_address  + '/api/products?filter='+ JSON.stringify(filter))
        .then(res => {
          this.products = res.data
          this.areas = []
          for (let index = 0; index < res.data.length; index++) {
            if (!this.areas.includes(res.data[index].area)) {
              this.areas.push(res.data[index].area) 
            }
          }
        })
      },
      filter(status){
        this.status = status
        if (status == 'all') {
          this.initialize()
        }else{
          let filter = {
            where : {
                status : status,
                active : true
            }
          }
          axios.get(this.$store.state.server_address +"/api/products?filter="+ JSON.stringify(filter))
          .then(res => {
            this.products = res.data
            this.areas = []
            for (let index = 0; index < res.data.length; index++) {
              if (!this.areas.includes(res.data[index].area)) {
                this.areas.push(res.data[index].area) 
              }
            }
          })
        }
      },
      filterArea(area){
        if (this.status == 'unwashed') {
          let filter = {
            where : {
                area : area,
                active : true,
                status : 'unwashed'
            }
          }
          axios.get(this.$store.state.server_address +"/api/products?filter="+ JSON.stringify(filter))
          .then(res => {
            this.products = res.data
          })
        }else if (this.status == 'washed') {
          let filter = {
            where : {
                area : area,
                active : true,
                status : 'washed'
            }
          }
          axios.get(this.$store.state.server_address +"/api/products?filter="+ JSON.stringify(filter))
          .then(res => {
            this.products = res.data
          })
        }else{
          let filter = {
            where : {
                area : area,
                active : true,
            }
          }
          axios.get(this.$store.state.server_address +"/api/products?filter="+ JSON.stringify(filter))
          .then(res => {
            this.products = res.data
          })
        }
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
    background-color: rgb(243, 226, 226);
  }
</style>
