<template>
    <div>
        <footer class="page-footer font-small unique-color-dark darken-3">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 py-5">
                        <div class="mb-5 flex-center">
                            <a v-if="addressData.facebook != ''" :href="'//' + addressData.facebook">
                                <v-icon class="white-text fa-lg white-text mr-md-5 mr-3 fa-2x">fab fa-facebook</v-icon>
                            </a>
                            <a v-if="addressData.twitter != ''" :href="'//' + addressData.twitter">
                                <v-icon class="white-text fa-lg white-text mr-md-5 mr-3 fa-2x">fab fa-twitter</v-icon>
                            </a>
                            <a v-if="addressData.googleplus != ''" :href="'//' + addressData.googleplus">
                                <v-icon class="white-text fa-lg white-text mr-md-5 mr-3 fa-2x">fab fa-google-plus</v-icon>
                            </a>
                            <a v-if="addressData.linkedin != ''" :href="'//' + addressData.linkedin">
                                <v-icon class="white-text fa-lg white-text mr-md-5 mr-3 fa-2x">fab fa-linkedin</v-icon>
                            </a>
                            <a v-if="addressData.instagram != ''" :href="'//' + addressData.instagram">
                                <v-icon class="white-text fa-lg white-text mr-md-5 mr-3 fa-2x">fab fa-instagram</v-icon>
                            </a>
                            <a v-if="addressData.telegram != ''" :href="'//' + addressData.telegram">
                                <v-icon class="white-text fa-lg white-text mr-md-5 mr-3 fa-2x">fab fa-telegram</v-icon>
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-copyright text-center py-3">© {{new Date().getFullYear()}} Copyright:
                <a href="https://mdbootstrap.com/education/bootstrap/"> greencoffeeai.com</a>
            </div>
        </footer>
    </div>
</template>
<script>
import {mdbIcon} from 'mdbvue'
import axios from 'axios'
export default {
    name: 'Footer',
    components:{
        mdbIcon
    },
    data() {
        return {
            addressData: {}
        }
    },
    mounted() {
        axios.get(this.$store.state.server_address +'/api/social_addresses')
        .then(res => {
            this.addressData = res.data[0]
        })
    },
    methods: {
        
    },
}
</script>

