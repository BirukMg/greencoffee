<template>
  <div class="container" style="margin-top: 50px">
      <mdb-btn size="sm" outline="primary" @click.native="modal = true">Add</mdb-btn>
    <div class="row" v-if="false">
      <div class="col-md-12 mb-3">
        <img :src="$store.state.server_address + '/api/containers/gallary/download/' + images[0].name" class="img-fluid z-depth-1 top-gallary-img" alt="Gallery image">
      </div>
    </div>
    <h5 v-if="images.length <= 0" class="text-info font-weight-bold animated bounceIn">No image(s) to show</h5>

    <div class="row">
      <div class="col-lg-4 col-md-12 mb-3" v-for="(image, index) in images" :key="image">
        <img :src="$store.state.server_address + '/api/containers/gallary/download/' + image.name" class="img-fluid z-depth-1 image-list" alt="Gallery image" @click="showImg(image.name)">
        <div class="btn-group">
            <span @click="showHide(image)" v-if="image.show"><i class="fas fa-eye text-success icons"></i></span>
            <span @click="showHide(image)" v-if="!image.show"><i class="fas fa-eye-slash text-warning icons"></i></span>
            <span @click="removeFromGallery(image)"><i class="fas fa-times text-danger icons"></i></span>
        </div>
      </div>
    </div>
    <mdb-modal :show="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title>New Image</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
            <input type="file" style="display: none" @change="onAddImg" ref="pickAddImg">
            <img :src="addImgData.ImgPreview" alt="post image" class="img-thumbnail post-img" @click="$refs.pickAddImg.click()">
            <h5 :class="addMsg.styles">{{addMsg.title}}</h5>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn size="sm" outline="primary" @click="addToGallery">Save</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <mdb-modal size="fluid" :show="singleImgModal" @close="singleImgModal = false">
          <img :src="$store.state.server_address + '/api/containers/gallary/download/' + singleImgName" class="img-fluid z-depth-1 single-img" alt="Responsive image">
    </mdb-modal>
  </div>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn } from 'mdbvue';
import axios from 'axios'
export default {
  name: 'Gallery',
  components: {
     mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn
  },
  data() {
    return {
        modal: false,
        singleImgModal: false,
        images: [],
        singleImgName: '',
        addMsg: {
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
        
    }
  },
  mounted() {
    this.initialize()
  },
  methods: {
    initialize(){
        axios.get(this.$store.state.server_address + '/api/galleries')
        .then(res => {
            this.images = res.data
        })
    },
    showImg(name){
      this.singleImgModal = true
      this.singleImgName = name
    },
    showHide(img){
        axios.patch(this.$store.state.server_address + '/api/galleries/' + img.id,{
            show: !img.show
        }).then(res => {
            this.initialize()
        })
    },
    removeFromGallery(image){
      axios.delete(this.$store.state.server_address + '/api/containers/gallary/files/' + image.name)
      .then(res => {
        axios.delete(this.$store.state.server_address + '/api/galleries/' + image.id)
        .then(res => {
          this.initialize()
        })
      })
    },
    addToGallery(){
        if (this.addImgData.selectedImg == null) {
            this.addMsg.show = true
            this.addMsg.title = "Image is not selected"
            this.addMsg.styles = "text-danger font-weight-bold animated bounceIn"
        } else {
            let formData = new FormData()
            formData.append('file',this.addImgData.selectedImg)
            axios.post(this.$store.state.server_address +'/api/containers/gallary/upload',formData,{
                onUploadProgress: uploadEvent => {
                    this.addMsg.show = true
                    this.addMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                    this.addMsg.styles = "text-success font-weight-bold"
                }
            }).then(res => {
                // this.addData.img = res.data.result.files.file[0].name
                axios.post(this.$store.state.server_address + '/api/galleries', {name: res.data.result.files.file[0].name}, {
                    onUploadProgress: uploadEvent => {
                        this.addMsg.show = true
                        this.addMsg.title = "Please wait..." + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + "%"
                        this.addMsg.styles = "text-success font-weight-bold"
                    }
                }).then(res => {
                    this.addMsg.show = true
                    this.addMsg.title = "New image added successfully"
                    this.addMsg.styles = "text-success font-weight-bold"
                    // this.showMember = false
                    this.initialize()
                })
            })
        }
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
    isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }
  },
}
</script>
<style scoped>
    .post-img{
        width: 100%;
        height: 320px;
        cursor: pointer;
    }
    .top-gallary-img{
        width: 100%;
        height: 490px;
    }
    .image-list{
        height: 242px;
    }
    .icons{
        margin-left: 5px;
        cursor: pointer;
    }
    .single-img{
      height: 700px;
      cursor: pointer;
    }
</style>
