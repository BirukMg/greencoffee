<template>
    <div class="container">
        <section id="products" class=" wow fadeIn" data-wow-delay="0.3s">
            <h1 class="font-weight-bold text-center h1 my-5">Certification</h1>
            <hr class="my-5">
            <div class="row">
                <carousel style="width: 100%; margin-left: 50px" :autoplay="true" :autoplaySpeed ="5000" :nav="false" :items ="3" :autoplayTimeout ="5000" :loop ="true" :autoplayHoverPause ="true" :margin ="0" v-if="showMember">
                    <div class="text-center img-logo" v-for="(member, index) in members" :key ="member">
                        <img :src="$store.state.server_address + '/api/containers/posts/download/' + member.img" class="logos" alt="">
                    </div>
                </carousel>
            </div>
            <hr class="my-5">
        </section>
    </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput } from 'mdbvue';
import axios from 'axios'
export default {
    name: 'Membership',
    components: {
        carousel, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput
    },
    data() {
        return {
            showMember: false,
            members: []
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize(){
            axios.get(this.$store.state.server_address + '/api/certificates')
            .then(res => {
                this.members = res.data
                this.showMember = true
            })
        }
    }
}
</script>
<style scoped>
    .img-logo{
        border-radius: 12px;
        cursor: pointer;
        width: 100px;
    }
    .logos{
        height: 100px;
    }
    .cancel-modal-header{
        background-color: red;
        padding-left: 35%
    }
</style>
