<template>
    <div class="best-seller">
            <div class="container">
            <h1 class="font-weight-bold text-center h1 my-5">Best seller</h1>
            <div class="row">
                <div class="col-lg-4" v-for="best in bests" :key ="best" @click="toDetail(best)">
                    <div class="single-menu">
                        <div class="title-div justify-content-between d-flex">
                            <h4>{{best.title}}</h4>
                            <p class="price float-right">
                                $ {{best.price}}
                            </p>
                        </div>
                        <p>
                            {{best.description | truncate(70)}}
                        </p>								
                    </div> 
                </div>
            </div>
        </div>
        </div>
</template>

<script> 
import axios from 'axios'
export default {
    name: 'BestSeller',
    data() {
        return {
            bests: []
        }
    },
    mounted() {
        let filter = {
            where: {
                show_home: true
            }
        }
        axios.get(this.$store.state.server_address +"/api/products?filter="+ JSON.stringify(filter))
        .then(res => {
            this.bests = res.data
        })
    },
    methods: {
        toDetail(product){
            this.$router.push({ path: '/productdetail/' + product.id})
        }
    },
}
</script>

<style scoped>
  .best-seller{
        background-color: rgb(250, 243, 234);
        margin-top: 100px;
        padding: 5px 0
    }
</style>
