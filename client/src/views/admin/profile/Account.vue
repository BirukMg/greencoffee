<template>
    <div class="container">
        <h4 class="text-center">Account</h4>
        <h5 :class="msg.styles" v-if="msg.show">{{msg.title}}</h5>
        <div class="row">
            <div class="col-6">
                <div class="row">
                    <v-icon class="text-info">fa-user</v-icon>
                    <mdb-input label="Username"  style="width: 400px; margin-left: 20px;" v-model="accountData.username"/>
                </div>
                 <div class="row">
                    <v-icon class="text-info">fa-lock</v-icon>
                    <mdb-input type="password" label="New password or leave empty" style="width: 400px; margin-left: 20px;" v-model="accountData.password"/>
                </div>
        </div>
        <div class="col-6">
                 <div class="row">
                    <v-icon class="text-info">fa-envelope</v-icon>
                    <mdb-input label="Email"  style="width: 400px; margin-left: 20px;" v-model="accountData.email"/>
                </div>
        </div>
        </div>
        <button type="button" v-if="!msg2.show" class="btn btn-outline-primary btn-sm" @click="saveChanges">Save Changes</button>
        <h5 :class="msg2.styles" v-if="msg2.show">{{msg2.title}}</h5>
    </div>
</template>
<script>
import {mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    name: 'Account',
    components: {
        mdbInput
    },
    data() {
        return {
            accountData: {
                username: '',
                email: '',
                password: ''
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
            axios.get(this.$store.state.server_address +'/api/administrators/' + this.$store.state.userId)
            .then(res => {
                this.accountData = res.data
            })
        },
        saveChanges(){
            if (this.accountData.username == '') {
                this.msg.show = true
                this.msg.title = "Username is required"
                this.msg.styles = "text-danger animated bounceIn font-weight-bold"
            } else if (this.accountData.email == '') {
                this.msg.show = true
                this.msg.title = "Email is required"
                this.msg.styles = "text-danger animated bounceIn font-weight-bold"
            }else if (!this.validateEmail(this.accountData.email)) {
                this.msg.show = true
                this.msg.title = "Invalid email"
                this.msg.styles = "text-danger animated bounceIn font-weight-bold"
            } else {

                if (this.accountData.password == '') {
                    axios.patch(this.$store.state.server_address +'/api/administrators/' + accountData.id, {
                        username: this.accountData.username,
                        email: this.accountData.email
                    },{
                        onUploadProgress: uploadEvent => {
                            this.msg2.show = true
                            this.msg2.title = "Please wait..."
                            this.msg2.styles = "text-primary font-weight-bold"
                        }
                    }).then(res => {
                        this.initialize()
                        this.msg2.show = false
                    })
                }else{
                    axios.patch(this.$store.state.server_address +'/api/administrators/' + this.accountData.id, {
                        username: this.accountData.username,
                        email: this.accountData.email,
                        password: this.accountData.password
                    },{
                        onUploadProgress: uploadEvent => {
                            this.msg2.show = true
                            this.msg2.title = "Please wait..."
                            this.msg2.styles = "text-primary font-weight-bold"
                        }
                    }).then(res => {
                        this.initialize()
                        this.msg2.show = false
                    })
                }
            }
        },
        validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        }
    },
}
</script>
<style scoped>
    .align-center{
        align-content: center;
    }
</style>

