<template>
  <div>
    <section class="header">
      <button type="button" class="btn btn-outline-info waves-effect btn-sm" @click="addHeaderModal = true"><i class="fas fa-plus"></i> Add</button>
      <carousel :autoplay="true" :autoplaySpeed ="2000" :nav="false" :items ="1" :loop ="true" :autoplayHoverPause ="true" v-if="showHeader">
        <div class="card card-image header-item" v-for="(header, index) in headers" :key="header" :style="'background-image: url('+ server_address + header.img + ');'" >
          <div class="text-white text-center d-flex align-items-center rgba-black-light py-5 px-4">
              <div style="height: 700px; padding-top: 15%">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-warning waves-effect" @click="launcheditItemModal(header)"><i class="fas fa-pen"></i> Edit</button>
                <button type="button" class="btn btn-outline-danger waves-effect" @click="launchDeleteModal(header, index)"><i class="fas fa-times"></i> Remove</button>
              </div>
              <h3 class="card-title pt-2"><strong>{{header.title}}</strong></h3>
              <p>{{header.description}}</p>
              </div>
          </div>
        </div>
      </carousel>
      <mdb-modal :show="addHeaderModal" @close="addHeaderModal = false">
        <mdb-modal-header>
          <mdb-modal-title>Add</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body class="align-center">
          <input type="file" style="display: none" @change="onAddHeaderImg" ref="pickAddImg">
          <img :src="addImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
          <h5 :class="addHeaderMsg.styles">{{addHeaderMsg.title}}</h5>
          <div class="inputs">
            <mdb-input label="Title" v-model="addData.title" />
            <mdb-input type="textarea" label="Description" :rows="2" v-model="addData.description"/>
          </div>
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn size="sm"  outline="primary" @click="addHeader">Save</mdb-btn>
        </mdb-modal-footer>
      </mdb-modal>

      <mdb-modal :show="editHeaderModal" @close="editHeaderModal = false">
        <mdb-modal-header>
          <mdb-modal-title>Edit</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body class="align-center">
          <input type="file" style="display: none" @change="onEditHeaderImg" ref="pickAddImg">
          <img :src="editImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
          <h5 :class="editHeaderMsg.styles">{{editHeaderMsg.title}}</h5>
          <div class="inputs">
            <mdb-input label="Title" v-model="editData.title" />
            <mdb-input type="textarea" label="Description" :rows="2" v-model="editData.description"/>
          </div>
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn size="sm"  outline="primary" @click="editHeader">Save</mdb-btn>
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
        <mdb-btn color="primary" outline="danger" size="sm" @click="deleteHeader">Yes</mdb-btn>
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
  name: 'HomePage',
  components: {
    carousel, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput
  },
  data() {
    return {
      addHeaderModal: false,
      editHeaderModal: false,
      deleteModal: false,
      showHeader: false,
      headers: [],
      server_address: this.$store.state.server_address + '/api/containers/posts/download/',
      addHeaderMsg: {
        show:false,
        title: '',
        styles: ''
      },
      editHeaderMsg: {
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
      addData: {
        img: null,
        title: '',
        description: ''
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
      axios.get(this.$store.state.server_address + '/api/home_page_headers')
      .then(res => {
        this.headers = res.data
        this.showHeader = true
      })
    },
    addHeader(){
      if (this.addImgData.selectedImg == null) {
        this.addHeaderMsg.show = true
        this.addHeaderMsg.title = "Please select image"
        this.addHeaderMsg.styles = "text-danger font-weight-bold animated bounceIn"
      }else if (this.addData.title == '') {
        this.addHeaderMsg.show = true
        this.addHeaderMsg.title = "Title is empty"
        this.addHeaderMsg.styles = "text-danger font-weight-bold animated bounceIn"
      }else if (this.addData.description == '') {
        this.addHeaderMsg.show = true
        this.addHeaderMsg.title = "Description is empty"
        this.addHeaderMsg.styles = "text-danger font-weight-bold animated bounceIn"
      }else {
        let formData = new FormData()
        formData.append('file',this.addImgData.selectedImg)
        axios.post(this.$store.state.server_address +'/api/containers/posts/upload',formData,{
          onUploadProgress: uploadEvent => {
            this.addHeaderMsg.show = true
            this.addHeaderMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
            this.addHeaderMsg.styles = "text-success font-weight-bold"
          }
        }).then(res => {
          this.addData.img = res.data.result.files.file[0].name
          axios.post(this.$store.state.server_address + '/api/home_page_headers',this.addData, {
            onUploadProgress: uploadEvent => {
              this.addHeaderMsg.show = true
              this.addHeaderMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
              this.addHeaderMsg.styles = "text-success font-weight-bold"
            }
          }).then(res => {
            this.addHeaderMsg.show = true
            this.addHeaderMsg.title = "New header added successfully"
            this.addHeaderMsg.styles = "text-success font-weight-bold"
            this.showHeader = false
            this.initialize()
          })
        })
      }
    },
    editHeader(){
        if (this.editData.title == '') {
            this.editHeaderMsg.show = true
            this.editHeaderMsg.title = "Title is empty"
            this.editHeaderMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else if (this.editData.description == '') {
            this.editHeaderMsg.show = true
            this.editHeaderMsg.title = "Description is empty"
            this.editHeaderMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
            if (this.editImgData.selectedImg != null) {
                let formData = new FormData()
                formData.append('file',this.editImgData.selectedImg)
                axios.post(this.$store.state.server_address +'/api/containers/posts/upload',formData,{
                    onUploadProgress: uploadEvent => {
                        this.editHeaderMsg.show = true
                        this.editHeaderMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                        this.editHeaderMsg.styles = "text-success font-weight-bold"
                    }
                }).then(res => {
                    this.editData.img = res.data.result.files.file[0].name
                    axios.patch(this.$store.state.server_address + '/api/home_page_headers/' + this.editData.id,this.editData, {
                        onUploadProgress: uploadEvent => {
                        this.editHeaderMsg.show = true
                        this.editHeaderMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                        this.editHeaderMsg.styles = "text-success font-weight-bold"
                        }
                    }).then(res => {
                        this.editHeaderMsg.show = true
                        this.editHeaderMsg.title = "Header updated successfully"
                        this.editHeaderMsg.styles = "text-success font-weight-bold"
                        this.showHeader = false
                        this.initialize()
                    })
                })
            } else {
                axios.patch(this.$store.state.server_address + '/api/home_page_headers/' + this.editData.id,this.editData, {
                    onUploadProgress: uploadEvent => {
                    this.editHeaderMsg.show = true
                    this.editHeaderMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                    this.editHeaderMsg.styles = "text-success font-weight-bold"
                    }
                }).then(res => {
                    this.editHeaderMsg.show = false
                    this.editHeaderMsg.title = "Header updated successfully"
                    this.editHeaderMsg.styles = "text-success font-weight-bold"
                    this.showHeader = false
                    this.initialize()
                })
            }
        }
    },
    deleteHeader(){
        axios.delete(this.$store.state.server_address + '/api/home_page_headers/' + this.deleteData.id)
        .then(res => {
            this.showHeader = false
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
        this.editHeaderMsg.show = false
        this.editImgData.ImgPreview = this.$store.state.server_address + '/api/containers/posts/download/' + item.img
        this.editHeaderModal = true
        this.editData =  Object.assign({}, item)
    },
    onAddHeaderImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.addHeaderMsg.show = true
          this.addHeaderMsg.title = "Invalid image"
          this.addHeaderMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
          this.addHeaderMsg.show = true
          this.addHeaderMsg.title = e.target.files[0].name
          this.addHeaderMsg.styles = "text-success font-weight-bold animated bounceIn"
          this.addImgData.selectedImg = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(e.target.files[0])
          reader.onload = event => {
            this.addImgData.ImgPreview = event.target.result
          }
        }
      },
      onEditHeaderImg(e){
        if (!this.isFileImage(e.target.files[0])) {
          this.editHeaderMsg.show = true
          this.editHeaderMsg.title = "Invalid image"
          this.editHeaderMsg.styles = "text-danger font-weight-bold animated bounceIn"
        }else{
          this.editHeaderMsg.show = true
          this.editHeaderMsg.title = e.target.files[0].name
          this.editHeaderMsg.styles = "text-success font-weight-bold animated bounceIn"
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
  .header{
    width: 100%;
    margin-top: 60px;
  }
  .header-item{
    width: 100%;
    height: 400px;
    background-size: 100% 400px;
  }
  .post-img{
    width: 300px;
    height: 200px;
  }
  .post-img:hover{
    cursor: pointer;
  }
  .align-center{
    padding-left: 20%
  }
  .inputs{
    width: 300px;
  }
  .cancel-modal-header{
      background-color: red;
      padding-left: 35%
  }
  
</style>
