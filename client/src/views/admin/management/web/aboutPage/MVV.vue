<template>
    <div class="container">
        <section id="products" class="text-center wow fadeIn" data-wow-delay="0.3s">
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-bullseye pink-text"></i>
                        <h4 class="font-weight-bold my-4">Mission</h4>
                        <p class="grey-text">{{addData.mission}}</p>
                        <span class="p-2 m-2 fa-lg yt-ic" @click="launchModal('mission')"><i class="fa fa-pen text-warning"> </i></span>
                    </div>
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-eye cyan-text"></i>
                        <h4 class="font-weight-bold my-4">Vision</h4>
                        <p class="grey-text">{{addData.vision}}</p>
                        <span class="p-2 m-2 fa-lg yt-ic" @click="launchModal('vision')"><i class="fa fa-pen text-warning"> </i></span>
                    </div>
                    <div class="col-md-4 mb-4">
                        <i class="fa fa-4x fa-check indigo-text"></i>
                        <h4 class="font-weight-bold my-4">Value</h4>
                        <p class="grey-text">{{addData.value}}</p>
                        <span class="p-2 m-2 fa-lg yt-ic" @click="launchModal('value')"><i class="fa fa-pen text-warning"> </i></span>
                    </div>
                </div>

            </section>

            <mdb-modal :show="modal" @close="modal = false">
                <mdb-modal-header>
                    <mdb-modal-title>Mission, Vision, Value</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body>
                    <mdb-input type="textarea" :label="title" :rows="5" v-model="body"/>
                </mdb-modal-body>
                <mdb-modal-footer>
                    <mdb-btn outline="primary" size="sm" @click="addMvv">Save</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>
    </div>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput } from 'mdbvue';
import axios from 'axios'
export default {
    name: 'Mvv',
    components: {
        mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput
    },
    data() {
        return {
            modal: false,
            addData: {
                mission: '',
                vision: '',
                value: ''
            },
            body: '',
            title: ''
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
        },
        launchModal(title){
            this.body = this.addData[title]
            this.title = title
            this.modal = true
        },
        addMvv(){
            if (this.body == '') {
                
            }else{
                this.addData[this.title] = this.body
                axios.post(this.$store.state.server_address + '/api/mvvs/replaceOrCreate',this.addData)
                .then(res => {
                    this.initialize()
                    this.modal = false
                })
            }
        }
    },
}
</script>
