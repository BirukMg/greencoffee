<template>
    <div class="container main-body">
        <h4 class="text-center">Address</h4>
        <h5 :class="msg2.styles" v-if="msg2.show">{{msg2.title}}</h5>
        <div class="row">
            <div class="col-6">
                <div class="row">
                    <v-icon class="text-primary">fa-map-marker</v-icon>
                    <mdb-input label="Address" style="width: 400px; margin-left: 20px;" v-model="addData.address"/>
                </div>
                <div class="row">
                    <v-icon class="text-info">fa-phone</v-icon>
                    <mdb-input label="Phone number" style="width: 400px; margin-left: 20px;" v-model="addData.phone_number"/>
                </div>
            </div>
            <div class="col-6">
                <div class="row">
                    <v-icon class="text-default">fa fa-envelope</v-icon>
                    <mdb-input label="Email" style="width: 400px; margin-left: 20px;" v-model="addData.email"/>
                </div>
            </div>
        </div>
        <h4 class="text-center">Social Network</h4>
        <div class="row">
            <div class="col-6">
            <div class="row">
                <v-icon style="color:#3b5998">fab fa-facebook</v-icon>
                <mdb-input label="Facebook Address" style="width: 400px; margin-left: 20px;" placeholder="Have no account? leave empty" v-model="addData.facebook"/>
            </div>
            <div class="row">
                <v-icon style="color:#DD4B39">fab fa-google-plus</v-icon>
                <mdb-input label="Google+ Address" style="width: 400px; margin-left: 20px;" placeholder="Have no account? leave empty" v-model="addData.googleplus"/>
            </div>
            <div class="row">
                <v-icon style="color:#0077B5">fab fa-   </v-icon>
                <mdb-input label="LinkedIn Address" style="width: 400px; margin-left: 20px;" placeholder="Have no account? leave empty" v-model="addData.linkedin"/>
            </div>
        </div>
        <div class="col-6">
            <div class="row">
                <v-icon style="color:#1DA1F2">fab fa-twitter</v-icon>
                <mdb-input label="Twitter Address" style="width: 400px; margin-left: 20px;" placeholder="Have no account? leave empty" v-model="addData.twitter"/>
            </div>
            <div class="row">
                <v-icon style="color:#C13584">fab fa-instagram</v-icon>
                <mdb-input label="Instagram Address" style="width: 400px; margin-left: 20px;" placeholder="Have no account? leave empty" v-model="addData.instagram"/>
            </div>
            <div class="row">
                <v-icon style="color:#1DA1F2">fab fa-telegram</v-icon>
                <mdb-input label="Telegram Address" style="width: 400px; margin-left: 20px;" placeholder="Have no account? leave empty" v-model="addData.telegram"/>
            </div>
        </div>
        <button type="button" v-if="!msg.show" class="btn btn-outline-primary btn-sm" @click="saveAddress">Save Changes</button>
        <h5 :class="msg.styles" v-if="msg.show">{{msg.title}}</h5>
        </div>
    </div>
</template>
<script>
import {mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    name: 'SocialAddress',
    components: {
        mdbInput
    },
    data() {
        return {
            addData: {
                facebook: '',
                twitter: '',
                googleplus: '',
                instagram: '',
                linkedin: '',
                telegram: '',
                address: '',
                phone_number: '',
                email: ''
            },
            msg: {
                title: '',
                styles: '',
                show: false
            },
                msg2: {
                    title: '',
                    styles: '',
                    show: false
                }
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize(){
            axios.get(this.$store.state.server_address +'/api/social_addresses')
            .then(res => {
                if (res.data.length > 0 ) {
                    this.addData.facebook = res.data[0].facebook
                    this.addData.twitter = res.data[0].twitter
                    this.addData.googleplus = res.data[0].googleplus
                    this.addData.instagram = res.data[0].instagram
                    this.addData.linkedin = res.data[0].linkedin
                    this.addData.telegram = res.data[0].telegram
                    this.addData.address = res.data[0].address
                    this.addData.phone_number = res.data[0].phone_number
                    this.addData.email = res.data[0].email
                    this.addData.id = res.data[0].id
                }
            })
        },
        saveAddress(){
            if (this.addData.address == '') {
                this.msg2.show = true
                this.msg2.title = "Address is required"
                this.msg2.styles = "text-danger animated bounceIn font-weight-bold"
            }else if (this.addData.phone_number == '') {
                this.msg2.show = true
                this.msg2.title = "Phone number is required"
                this.msg2.styles = "text-danger animated bounceIn font-weight-bold"
            }else if (this.addData.email == '') {
                this.msg2.show = true
                this.msg2.title = "Email is required"
                this.msg2.styles = "text-danger animated bounceIn font-weight-bold"
            }else if (!this.validateEmail(this.addData.email)) {
                this.msg2.show = true
                this.msg2.title = "Invalid email"
                this.msg2.styles = "text-danger animated bounceIn font-weight-bold"
            }else {
                this.msg2.show = false
                axios.post(this.$store.state.server_address +'/api/social_addresses/replaceOrCreate', this.addData,{
              onUploadProgress: uploadEvent => {
                this.msg.show = true
                this.msg.title = "Please wait..."
                this.msg.styles = "text-primary font-weight-bold"
              }
            }).then(res => {
                this.initialize()
                this.msg.show = false
            }).catch(err => {
                this.msg.title = "Something went wrong"
                this.msg.styles = "text-danger font-weight-bold"
            })
            }
        },
        validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        },
    },
}
</script>

<style scoped>
    .main-body{

    }
</style>
