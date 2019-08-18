<template>
    <div class="container">
        <section id="products" class=" wow fadeIn" data-wow-delay="0.3s">
            <h1 class="font-weight-bold text-center h1 my-5">Our Service</h1>
            <button type="button" class="btn btn-outline-info waves-effect btn-sm" @click="addServiceModal = true"><i class="fas fa-plus"></i> Add</button>
            <div class="row">
                <carousel style="width: 100%; margin-left: 50px" :autoplay="true" :autoplaySpeed ="2000" :nav="false" :items ="3" :autoplayTimeout ="3000" :loop ="true" :autoplayHoverPause ="true" v-if="showServices">
                    <div class="text-center" v-for="(service, index) in services" :key ="service">
                        <i :class="'fa fa-4x fa-' + service.icon + ' teal-text'"></i>
                        <h4 class="font-weight-bold my-4">{{service.title}}</h4>
                        <p class="grey-text">{{service.description}}</p>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-warning btn-sm waves-effect" @click="launcheditItemModal(service)"><i class="fas fa-pen"></i> Edit</button>
                            <button type="button" class="btn btn-outline-danger btn-sm waves-effect" @click="launchDeleteModal(service, index)"><i class="fas fa-times"></i> Remove</button>
                        </div>
                    </div>
                </carousel>
            </div>

            <mdb-modal size="lg" :show="addServiceModal" @close="addServiceModal = false">
                <mdb-modal-header>
                    <mdb-modal-title>Add</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body class="align-center">
                     <h5 :class="addMsg.styles">{{addMsg.title}}</h5>
                    <div class="row">
                        <div class="col-6">
                            <vue-icon-picker v-model="icon" height="300px"/>
                        </div>
                        <div class="col-6">
                            <mdb-input label="Title" v-model="addData.title" />
                            <mdb-input type="textarea" label="Description" :rows="2" v-model="addData.description"/>
                        </div>
                    </div>
                </mdb-modal-body>
                <mdb-modal-footer>
                    <mdb-btn size="sm"  outline="primary" @click="addService">Save</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>


            <mdb-modal size="lg" :show="editServiceModal" @close="editServiceModal = false">
                <mdb-modal-header>
                    <mdb-modal-title>Edit</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body class="align-center">
                     <h5 :class="editMsg.styles">{{editMsg.title}}</h5>
                    <div class="row">
                        <div class="col-6">
                            <vue-icon-picker v-model="editIcon" height="300px"/>
                        </div>
                        <div class="col-6">
                            <mdb-input label="Title" v-model="editData.title" />
                            <mdb-input type="textarea" label="Description" :rows="2" v-model="editData.description"/>
                        </div>
                    </div>
                </mdb-modal-body>
                <mdb-modal-footer>
                    <mdb-btn size="sm"  outline="primary" @click="editService">Save</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>

            <mdb-modal size="sm" v-if="deleteModal" @close="deleteModal = false">
                <mdb-modal-header class="cancel-modal-header">
                    <mdb-modal-title class="white-text font-weight-bold">Are you sure?</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body class="text-center">
                    <i class="fa fa-times fa-4x animated rotateIn" style="color:red"></i>
                </mdb-modal-body>
                <mdb-modal-footer>
                    <mdb-btn color="primary" outline="danger" size="sm" @click="deleteService">Yes</mdb-btn>
                    <mdb-btn color="danger" size="sm" @click="deleteModal = false">No</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>
        </section>
    </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput } from 'mdbvue';
import axios from 'axios'
import VueIconPicker from '../../../../../components/vue-icon-picker';
export default {
    name: 'Service',
    components: {
        carousel, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, VueIconPicker
    },
    data() {
        return {
            showServices: false,
            services:[],
            addServiceModal: false,
            editServiceModal: false,
            deleteModal: false,
            icon:null,
            editIcon: {
                name:"flag",type:"fontawesome"
            },
            addData: {
                icon: '',
                title: '',
                description: ''
            },
            addMsg: {
                show: false,
                title: '',
                styles:''
            },
            editData: {},
            editMsg: {
                show: false,
                title: '',
                styles:''
            },
            deleteData: {}

            
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
    initialize(){
      axios.get(this.$store.state.server_address + '/api/home_page_services')
      .then(res => {
        this.services = res.data
        this.showServices = true
      })
    },
    addService(){
      if (this.icon == null) {
        this.addMsg.show = true
        this.addMsg.title = "Please select an icon"
        this.addMsg.styles = "text-danger font-weight-bold animated bounceIn text-center"
      }else if (this.addData.title == '') {
        this.addMsg.show = true
        this.addMsg.title = "Title is empty"
        this.addMsg.styles = "text-danger font-weight-bold animated bounceIn text-center"
      }else if (this.addData.description == '') {
        this.addMsg.show = true
        this.addMsg.title = "Description is empty"
        this.addMsg.styles = "text-danger font-weight-bold animated bounceIn text-center"
      }else {
        this.addData.icon = this.icon.name
        axios.post(this.$store.state.server_address + '/api/home_page_services',this.addData, {
        onUploadProgress: uploadEvent => {
            this.addMsg.show = true
            this.addMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
            this.addMsg.styles = "text-success font-weight-bold"
        }
        }).then(res => {
            this.addMsg.show = true
            this.addMsg.title = "New service added successfully"
            this.addMsg.styles = "text-success font-weight-bold text-center"
            this.showServices = false
            this.initialize()
        })
      }
    },
    editService(){
        if (this.editData.title == '') {
            this.editMsg.show = true
            this.editMsg.title = "Title is empty"
            this.editMsg.styles = "text-danger font-weight-bold animated bounceIn text-center"
        }else if (this.editData.description == '') {
            this.editMsg.show = true
            this.editMsg.title = "Description is empty"
            this.editMsg.styles = "text-danger font-weight-bold animated bounceIn text-center"
        }else{
            this.editData.icon = this.editIcon.name
            axios.patch(this.$store.state.server_address + '/api/home_page_services/' + this.editData.id,this.editData, {
                onUploadProgress: uploadEvent => {
                this.editMsg.show = true
                this.editMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                this.editMsg.styles = "text-success font-weight-bold"
                }
            }).then(res => {
                this.editMsg.show = true
                this.editMsg.title = "Service updated successfully"
                this.editMsg.styles = "text-success font-weight-bold text-center"
                this.showServices = false
                this.editServiceModal = false
                this.initialize()
            })
        }
    },
    deleteService(){
        axios.delete(this.$store.state.server_address + '/api/home_page_services/' + this.deleteData.id)
        .then(res => {
            this.showServices = false
            this.initialize()
            this.deleteModal = false
        })
    },
    launchDeleteModal(item, index){
        this.deleteData.id = item.id
        this.deleteData.index = index
        this.deleteModal = true
    },
    launcheditItemModal(item){
        this.editMsg.show = false
        this.editServiceModal = true
        this.editData =  Object.assign({}, item)
        this.editIcon.name = item.icon 
    },
    isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }
  },
}
</script>
<style scoped>
    .post-img{
        
    }
    .post-img:hover{
        cursor: pointer;
    }
    .align-center{
        /* padding-left: 20% */
    }
    .inputs{
        width: 300px;
    }
    .cancel-modal-header{
        background-color: red;
        padding-left: 35%
    }
    .service-img{
        height: 20px;
        width: 20px;
    }
</style>
