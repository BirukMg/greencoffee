<template>
    <div class="container">
        <section id="products" class=" wow fadeIn" data-wow-delay="0.3s">
            <h1 class="font-weight-bold text-center h1 my-5">Membership</h1>
            <button type="button" class="btn btn-outline-info waves-effect btn-sm" @click="addModal = true"><i class="fas fa-plus"></i> Add</button>
            <div class="row">
                <carousel style="width: 100%; margin-left: 50px" :autoplay="true" :autoplaySpeed ="2000" :nav="false" :items ="3" :autoplayTimeout ="3000" :loop ="true" :autoplayHoverPause ="true" :margin ="0" v-if="showMember">
                    <div class="text-center img-logo" v-for="(member, index) in members" :key ="member">
                        <a :href="'//' + member.link" target="_blank"><img :src="$store.state.server_address + '/api/containers/posts/download/' + member.img" class="logos" alt=""></a>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-outline-warning btn-sm waves-effect" @click="launcheditItemModal(member)"><i class="fas fa-pen"></i> Edit</button>
                            <button type="button" class="btn btn-outline-danger btn-sm waves-effect" @click="launchDeleteModal(member, index)"><i class="fas fa-times"></i> Remove</button>
                        </div>
                    </div>
                </carousel>
            </div>

            <mdb-modal :show="addModal" @close="addModal = false">
                <mdb-modal-header>
                <mdb-modal-title>Add</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body class="align-center">
                <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg">
                <img :src="addImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
                <h5 :class="addMsg.styles">{{addMsg.title}}</h5>
                <div class="inputs">
                    <mdb-input label="Link" v-model="addData.link" />
                </div>
                </mdb-modal-body>
                <mdb-modal-footer>
                <mdb-btn size="sm"  outline="primary" @click="addMembership">Save</mdb-btn>
                </mdb-modal-footer>
            </mdb-modal>

            <mdb-modal :show="editModal" @close="editModal = false">
                <mdb-modal-header>
                <mdb-modal-title>Edit</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body class="align-center">
                <input type="file" style="display: none" @change="onEditImg" ref="pickAddImg">
                <img :src="editImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
                <h5 :class="editMsg.styles">{{editMsg.title}}</h5>
                <div class="inputs">
                    <mdb-input label="Link" v-model="editData.link" />
                </div>
                </mdb-modal-body>
                <mdb-modal-footer>
                <mdb-btn size="sm"  outline="primary" @click="editMembership">Save</mdb-btn>
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
                    <mdb-btn color="primary" outline="danger" size="sm" @click="deleteMembership">Yes</mdb-btn>
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
export default {
    name: 'Membership',
    components: {
        carousel, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput
    },
    data() {
        return {
            showMember: false,
            members: [],
            addModal: false,
            editModal: false,
            deleteModal: false,
            addData: {
                img: '',
                link: ''
            },
            addMsg: {
                show:false,
                title: '',
                styles: ''
            },
            editMsg: {
                show:false,
                title: '',
                styles: ''
            },
            addImgData: {
                selectedImg: null,
                progress: 0,
                msg:'Upload',
                ImgPreview: require('../../../../../assets/placeholder.jpg'),
                show: false
            },
            editImgData: {
                selectedImg: null,
                progress: 0,
                msg:'Upload',
                ImgPreview: require('../../../../../assets/placeholder.jpg'),
                show: false
            },
            editData: {},
            deleteData: {}
        }
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize(){
            axios.get(this.$store.state.server_address + '/api/memberships')
            .then(res => {
                this.members = res.data
                this.showMember = true
            })
        },
        addMembership(){
            if (this.addImgData.selectedImg == null) {
                this.addMsg.show = true
                this.addMsg.title = "Please select logo"
                this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
            } else {
                let formData = new FormData()
                formData.append('file',this.addImgData.selectedImg)
                axios.post(this.$store.state.server_address +'/api/containers/posts/upload',formData,{
                    onUploadProgress: uploadEvent => {
                        this.addMsg.show = true
                        this.addMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                        this.addMsg.styles = "text-success font-weight-bold"
                    }
                }).then(res => {
                    this.addData.img = res.data.result.files.file[0].name
                    axios.post(this.$store.state.server_address + '/api/memberships', this.addData, {
                        onUploadProgress: uploadEvent => {
                            this.addMsg.show = true
                            this.addMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                            this.addMsg.styles = "text-success font-weight-bold"
                        }
                    }).then(res => {
                        this.addMsg.show = true
                        this.addMsg.title = "New membership added successfully"
                        this.addMsg.styles = "text-success font-weight-bold"
                        this.showMember = false
                        this.initialize()
                    })
                })
            }
        },
        editMembership(){
            if (this.editImgData.selectedImg != null) {
                let formData = new FormData()
                formData.append('file',this.editImgData.selectedImg)
                axios.post(this.$store.state.server_address +'/api/containers/posts/upload',formData,{
                    onUploadProgress: uploadEvent => {
                        this.editMsg.show = true
                        this.editMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                        this.editMsg.styles = "text-success font-weight-bold"
                    }
                }).then(res => {
                    this.editData.img = res.data.result.files.file[0].name
                    axios.patch(this.$store.state.server_address + '/api/memberships/' + this.editData.id, this.editData,{
                        onUploadProgress: uploadEvent => {
                            this.editMsg.show = true
                            this.editMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                            this.editMsg.styles = "text-success font-weight-bold"
                        }
                    }).then(res => {
                        this.editMsg.show = true
                        this.editMsg.title = "Updated successfully"
                        this.editMsg.styles = "text-success font-weight-bold"
                        this.showMember = false
                        this.initialize()
                        this.editModal = false

                    })
                })
            } else {
                axios.patch(this.$store.state.server_address + '/api/memberships/' + this.editData.id, this.editData,{
                    onUploadProgress: uploadEvent => {
                        this.editMsg.show = true
                        this.editMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                        this.editMsg.styles = "text-success font-weight-bold"
                    }
                }).then(res => {
                    this.editMsg.show = true
                    this.editMsg.title = "Updated successfully"
                    this.editMsg.styles = "text-success font-weight-bold"
                    this.showMember = false
                    this.initialize()
                    this.editModal = false

                })
            }
        },
        deleteMembership(){
            axios.delete(this.$store.state.server_address + '/api/memberships/' + this.deleteData.id)
            .then(res => {
                this.showMember = false
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
            this.editImgData.ImgPreview = this.$store.state.server_address + '/api/containers/posts/download/' + item.img
            this.editModal = true
            this.editData =  Object.assign({}, item)
        },
        onAddImg(e){
            if (!this.isFileImage(e.target.files[0])) {
            this.addMsg.show = true
            this.addMsg.title = "Invalid image"
            this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
            }else{
            this.addMsg.show = true
            this.addMsg.title = e.target.files[0].name
            this.addMsg.styles = "text-success font-weight-bold animated bounceIn"
            this.addImgData.selectedImg = e.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = event => {
                this.addImgData.ImgPreview = event.target.result
            }
            }
        },
        onEditImg(e){
            if (!this.isFileImage(e.target.files[0])) {
                this.editMsg.show = true
                this.editMsg.title = "Invalid image"
                this.editMsg.styles = "text-danger font-weight-bold animated bounceIn"
            }else{
                this.editMsg.show = true
                this.editMsg.title = e.target.files[0].name
                this.editMsg.styles = "text-success font-weight-bold animated bounceIn"
                this.editImgData.selectedImg = e.target.files[0]
                let reader = new FileReader()
                reader.readAsDataURL(e.target.files[0])
                reader.onload = event => {
                    this.editImgData.ImgPreview = event.target.result
                }
            }
        },
        isFileImage(file) {
            return file && file['type'].split('/')[0] === 'image';
        }
    }
}
</script>
<style scoped>
    .img-logo{
        border-radius: 12px;
        cursor: pointer;
        width: 200px;
    }
    .logos{
        height: 200px;
    }
    .cancel-modal-header{
        background-color: red;
        padding-left: 35%
    }
</style>
