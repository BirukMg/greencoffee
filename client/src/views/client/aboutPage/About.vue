<template>
    <div class="container" style="margin-top: 50px">
        <section id="team" class="section team-section pb-4 wow fadeIn" data-wow-delay="0.3s">
            <h2 class="font-weight-bold text-center h1 my-5">Who are we</h2>
            <p class="text-center grey-text mb-5 mx-auto w-responsive">{{addData.body}} </p>
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'About',
    components: {
        
    },
    data() {
        return {
            addData: {
                body: ''
            }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize(){
            axios.get(this.$store.state.server_address + '/api/about_pharagraphs')
            .then(res => {
                if (res.data.length > 0) {
                    this.addData.body = res.data[0].body
                    this.addData.id = res.data[0].id
                }
            })
        }
    },
}
</script>