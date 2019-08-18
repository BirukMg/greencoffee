<template>
    <div class="container" style="margin-top: 50px">
        <section id="team" class="section team-section pb-4 wow fadeIn" data-wow-delay="0.3s">
            <h2 class="font-weight-bold text-center h1 my-5">Who are we</h2>
            <p class="text-center grey-text mb-5 mx-auto w-responsive">{{addData.body}} <span class="p-2 m-2 fa-lg yt-ic" @click="modal = true"><i class="fa fa-pen text-warning"> </i></span></p>
        </section>

        <mdb-modal :show="modal" @close="modal = false">
            <mdb-modal-header>
                <mdb-modal-title>Who are we</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>
                <mdb-input type="textarea" label="We are..." :rows="5" v-model="addData.body"/>
            </mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn outline="primary" size="sm" @click="addParagraph">Save</mdb-btn>
            </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>
<script>
import {mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput} from 'mdbvue'
import axios from 'axios'
export default {
    name: 'About',
    components: {
        mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput
    },
    data() {
        return {
            modal: false,
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
        },
        addParagraph(){
            if (this.addData.body == '') {
                
            }else{
                axios.post(this.$store.state.server_address + '/api/about_pharagraphs/replaceOrCreate',this.addData)
                .then(res => {
                    console.log(res)
                    this.initialize()
                })
            }
        }
    },
}
</script>