<template>
  <div>
    <section class="header">
      <button type="button" class="btn btn-outline-info waves-effect btn-sm" @click="addHeaderModal = true"><i class="fas fa-plus"></i> Add</button>
      <carousel :autoplay="true" :autoplaySpeed ="2000" :nav="false" :items ="1" :loop ="true" :autoplayHoverPause ="true">
        <div class="card card-image header-item" v-for="i in headers.length" :key="i" :style="'background-image: url('+ server_address + i.img + ');'" >
          <div class="text-white text-center d-flex align-items-center rgba-black-light py-5 px-4">
              <div style="height: 700px; padding-top: 15%">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-warning waves-effect"><i class="fas fa-pen"></i> Edit</button>
                <button type="button" class="btn btn-outline-danger waves-effect"><i class="fas fa-times"></i> Remove</button>
              </div>
              <h3 class="card-title pt-2"><strong>{{i.title}}</strong></h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat fugiat, laboriosam, voluptatem,
                  optio vero odio nam sit officia accusamus minus error nisi architecto nulla ipsum dignissimos.
                  Odit sed qui, dolorum!.</p>
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
      headers: [],
      server_address: this.$store.state.server_address + '/api/containers/posts/download/',
      addHeaderMsg: {
        show:false,
        title: '',
        styles: ''
      },
      addImgData: {
        selectedImg: null,
        progress: 0,
        msg:'Upload',
        ImgPreview: require('../../../../assets/placeholder.jpg'),
        show: false
      },
      addData: {
        img: null,
        title: '',
        description: ''
      }
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
            console.log(res)
          })
        })
      }
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
    background-size: 100%;
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
</style>
