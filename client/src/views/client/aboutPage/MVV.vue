<template>
    <div class="container">
        <section id="products" class="text-center wow fadeIn" data-wow-delay="0.3s">
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-bullseye pink-text"></i>
                        <h4 class="font-weight-bold my-4">Mission</h4>
                        <p class="grey-text">{{addData.mission}}</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-eye cyan-text"></i>
                        <h4 class="font-weight-bold my-4">Vision</h4>
                        <p class="grey-text">{{addData.vision}}</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-check indigo-text"></i>
                        <h4 class="font-weight-bold my-4">Value</h4>
                        <p class="grey-text">{{addData.value}}</p>
                    </div>
                </div>
            </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Mvv',
    components: {
        
    },
    data() {
        return {
            addData: {
                mission: '',
                vision: '',
                value: ''
            }
        }
    },
    mounted(){
        this.initialize()
    },
    methods: {
        initialize(){
            axios.get(this.$store.state.server_address + '/api/mvvs')
            .then(res => {
                if (res.data.length > 0) {
                    this.addData.mission = res.data[0].mission
                    this.addData.vision = res.data[0].vision
                    this.addData.value = res.data[0].value
                    this.addData.id = res.data[0].id
                }
            })
        }
    },
}
</script>
