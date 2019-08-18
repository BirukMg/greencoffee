<template>
    <div class="container">
        <section id="team" class="section team-section pb-4 wow fadeIn" data-wow-delay="0.3s">
                <h2 class="font-weight-bold text-center h1 my-5">Our amazing staff</h2>
                <p class="text-center grey-text mb-5 mx-auto w-responsive">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a pariatur accusamus veniam.</p>
                <mdb-btn outline="primary" size="sm" @click="addModal = true"><i class="fa fa-user"> </i> Add</mdb-btn>
                <div class="row mb-lg-4 text-center text-md-left">
                    <div class="col-lg-6 col-md-12 mb-4" v-for="member in teams" :key="member">
                        <div class="col-md-6 float-left">
                            <div class="avatar mx-auto mb-md-0 mb-3">
                                <img :src="$store.state.server_address + '/api/containers/posts/download/' + member.img" class="z-depth-1 member-img" alt="Second sample avatar image">
                            </div>
                        </div>
                        <div class="col-md-6 float-right">
                            <h4><strong>{{member.full_name}}</strong></h4>
                           <h6 class="font-weight-bold grey-text mb-4">{{member.position}}</h6>
                            <p class="grey-text">{{member.description}}</p>
                            <span class="p-2 m-2 fa-lg fb-ic" v-if="member.show" @click="showHide(member)"><i class="fa fa-eye text-success"> </i></span>
                            <span class="p-2 m-2 fa-lg fb-ic" v-if="!member.show" @click="showHide(member)"><i class="fa fa-eye-slash"> </i></span>
                            <span class="p-2 m-2 fa-lg yt-ic" @click="launcheditItemModal(member)"><i class="fa fa-pen text-warning"> </i></span>
                            <span class="p-2 m-2 fa-lg ins-ic" @click="launchDeleteModal(member)"><i class="fa fa-times text-danger"> </i></span>
                        </div>
                    </div>
                </div>

                <mdb-modal :show="addModal" @close="addModal = false">
                    <mdb-modal-header>
                        <mdb-modal-title>Add Stuff</mdb-modal-title>
                    </mdb-modal-header>
                    <mdb-modal-body>
                        <div class="row">
                            <div class="col-6">
                                <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg">
                                <img :src="addImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
                                <h5 :class="addMsg.styles">{{addMsg.title}}</h5>
                            </div>
                            <div class="col-6">
                                <mdb-input type="text" label="Full name" v-model="addData.full_name"/>
                                <mdb-input type="text" label="Position" v-model="addData.position"/>
                                <mdb-input type="textarea" :label="addData.full_name == '' ? 'Some about ...' : 'Some about ' + addData.full_name " v-model="addData.description"/>
                            </div>
                        </div>
                    </mdb-modal-body>
                    <mdb-modal-footer>
                        <mdb-btn outline="primary" size="sm" @click="add">Save</mdb-btn>
                    </mdb-modal-footer>
                </mdb-modal>

                <mdb-modal :show="editModal" @close="editModal = false">
                    <mdb-modal-header>
                        <mdb-modal-title>Edit Stuff</mdb-modal-title>
                    </mdb-modal-header>
                    <mdb-modal-body>
                        <div class="row">
                            <div class="col-6">
                                <input type="file" style="display: none" @change="onEditImg" ref="pickAddImg">
                                <img :src="editImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
                                <h5 :class="editMsg.styles">{{editMsg.title}}</h5>
                            </div>
                            <div class="col-6">
                                <mdb-input type="text" label="Full name" v-model="editData.full_name"/>
                                <mdb-input type="text" label="Position" v-model="editData.position"/>
                                <mdb-input type="textarea" :label="editData.full_name == '' ? 'Some about ...' : 'Some about ' + editData.full_name " v-model="editData.description"/>
                            </div>
                        </div>
                    </mdb-modal-body>
                    <mdb-modal-footer>
                        <mdb-btn outline="primary" size="sm" @click="edit">Save</mdb-btn>
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
                        <mdb-btn color="primary" outline="danger" size="sm" @click="deleteTeam">Yes</mdb-btn>
                        <mdb-btn color="danger" size="sm" @click="deleteModal = false">No</mdb-btn>
                    </mdb-modal-footer>
                </mdb-modal>
            </section>
    </div>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput } from 'mdbvue';
import axios from 'axios' 
export default {
  name: 'HomePage',
  components: {
    mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput
  },
  data() {
    return {
      addModal: false,
      editModal: false,
      deleteModal: false,
      teams: [],
      server_address: this.$store.state.server_address + '/api/containers/posts/download/',
      addMsg: {
        title: '',
        styles: '',
        show: false
      },
      editMsg: {
        title: '',
        styles: '',
        show: false
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
      addData: {
        full_name: '',
        position: '',
        description: '',
        img: null,
      },
      editData: {},
      deleteData: {}
    }
  },
  beforeMount() {
    this.initialize()
  },
  mounted() {
    
  },
  methods: {
    initialize(){
      axios.get(this.$store.state.server_address + '/api/teams')
      .then(res => {
        this.teams = res.data
      })
    },
    add(){
      if (this.addImgData.selectedImg == null) {
        this.addMsg.show = true
        this.addMsg.title = "Please select image"
        this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
      }else if (this.addData.full_name == '') {
        this.addMsg.show = true
        this.addMsg.title = "Full name is empty"
        this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
      }else if (this.addData.position == '') {
        this.addMsg.show = true
        this.addMsg.title = "Position is empty"
        this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
      }else if (this.addData.description == '') {
        this.addMsg.show = true
        this.addMsg.title = "Say something about " + this.addData. full_name
        this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
      }else {
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
          axios.post(this.$store.state.server_address + '/api/teams',this.addData, {
            onUploadProgress: uploadEvent => {
              this.addMsg.show = true
              this.addMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
              this.addMsg.styles = "text-success font-weight-bold"
            }
          }).then(res => {
            this.addMsg.show = true
            this.addMsg.title = "New stuff added successfully"
            this.addMsg.styles = "text-success font-weight-bold"
            this.showHeader = false
            this.initialize()
          })
        })
      }
    },
    showHide(member){
        axios.patch(this.$store.state.server_address + '/api/teams/' + member.id, {
            show: !member.show
        }).then(res => {
            this.initialize()
        })
    },
    edit(){
        if (this.editData.full_name == '') {
            this.editMsg.show = true
            this.editMsg.title = "Full name is empty"
            this.editMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.editData.position == '') {
            this.editMsg.show = true
            this.editMsg.title = "Position is empty"
            this.editMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.editData.description == '') {
            this.editMsg.show = true
            this.editMsg.title = "Say something about " + this.editData.full_name
            this.editMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
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
                    axios.patch(this.$store.state.server_address + '/api/teams/' + this.editData.id,this.editData, {
                        onUploadProgress: uploadEvent => {
                        this.editMsg.show = true
                        this.editMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                        this.editMsg.styles = "text-success font-weight-bold"
                        }
                    }).then(res => {
                        this.editMsg.show = true
                        this.editMsg.title = "Header updated successfully"
                        this.editMsg.styles = "text-success font-weight-bold"
                        this.showHeader = false
                        this.initialize()
                    })
                })
            } else {
                axios.patch(this.$store.state.server_address + '/api/teams/' + this.editData.id,this.editData, {
                    onUploadProgress: uploadEvent => {
                    this.editMsg.show = true
                    this.editMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                    this.editMsg.styles = "text-success font-weight-bold"
                    }
                }).then(res => {
                    this.editMsg.show = false
                    this.editMsg.title = "Header updated successfully"
                    this.editMsg.styles = "text-success font-weight-bold"
                    this.showHeader = false
                    this.initialize()
                })
            }
        }
    },
    deleteTeam(){
        axios.delete(this.$store.state.server_address + '/api/teams/' + this.deleteData.id)
        .then(res => {
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
  },
  
}
</script>
<style scoped>
    .member-img{
        height: 250px;
        width: 250px;
        border-radius: 2px;
    }
    .cancel-modal-header{
        background-color: red;
        padding-left: 35%
    }
</style>
